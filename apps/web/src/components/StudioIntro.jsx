import React, { useLayoutEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import CreativeStudio from '@/components/CreativeStudio';
import { gsap } from '@/hooks/use-cinematic';

function animateIntro(intro, { desktop, motion }) {
	const root = document.documentElement;
	const stage = intro.querySelector('.intro-stage');
	const hero = intro.querySelector('.hero-cinematic');
	const laptop = intro.querySelector('.hero-laptop-zoom');
	const studio = intro.querySelector('.creative-studio');
	const display = intro.querySelector('.hero-display');
	const rootStyles = getComputedStyle(root);
	const theme = {};
	const tokens = ['background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
		'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
		'accent', 'accent-foreground', 'border', 'input', 'ring'];
	for (const token of tokens) theme['--' + token] = rootStyles.getPropertyValue('--avls-dark-' + token).trim();
	const screenColor = getComputedStyle(intro.querySelector('.hero-display-surface')).backgroundColor;
	root.classList.add('avls-scroll-theme');
	const cleanup = () => {
		root.classList.remove('avls-scroll-theme');
		intro.classList.remove('intro-enhanced');
	};

	// Reduced motion keeps natural flow and only blends the theme with scroll.
	if (!motion) {
		gsap.to(root, { ...theme, ease: 'none', scrollTrigger: {
			trigger: hero, start: 'top top', end: 'bottom center', scrub: true, invalidateOnRefresh: true,
		} });
		return cleanup;
	}
	if (desktop) intro.classList.add('intro-enhanced');
	gsap.set(studio, { backgroundColor: screenColor });
	const centerOffset = (axis) => {
		let position = 0;
		for (let element = display; element && element !== hero; element = element.offsetParent) {
			position += axis === 'x' ? element.offsetLeft : element.offsetTop;
		}
		const centerY = desktop ? hero.clientHeight / 2 : hero.clientHeight - window.innerHeight / 2;
		return axis === 'x' ? hero.clientWidth / 2 - position - display.offsetWidth / 2
			: centerY - position - display.offsetHeight / 2;
	};
	if (desktop) gsap.set(studio, { autoAlpha: 0, clipPath: 'inset(5% 5% 5% 5% round 28px)' });
	else gsap.set(studio, { autoAlpha: 0, marginTop: 'calc(80px - 100vh)', zIndex: 2 });
	const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
		id: 'hero-notebook', trigger: desktop ? intro : hero, pin: desktop ? stage : hero,
		start: desktop ? 'top top' : 'bottom bottom', end: () => '+=' + window.innerHeight * 0.48,
		scrub: true, invalidateOnRefresh: true, refreshPriority: 10,
	} });
	intro.querySelectorAll('[data-hero-part]').forEach((element, index) => {
		timeline.to(element, { autoAlpha: 0, y: -12 - index * 3, duration: 0.08 }, index * 0.012);
	});
	timeline.to('.hero-phone-scroll', { y: -42, autoAlpha: 0, duration: 0.12 }, 0.02)
		.to('.hero-side-words', { autoAlpha: 0, duration: 0.08 }, 0)
		.to(laptop, {
			scale: () => Math.max(hero.clientWidth / display.offsetWidth, window.innerHeight / display.offsetHeight) * 1.12,
			x: () => centerOffset('x'), y: () => centerOffset('y'),
			duration: 0.42, ease: 'power1.in',
		}, 0.02)
		.to('.hero-display-ui', { opacity: 0, duration: 0.12 }, 0.14)
		.to(display, { borderRadius: 0, duration: 0.12 }, 0.26)
		.to(root, { ...theme, duration: 0.14 }, 0.2)
		.to(hero.querySelector(':scope > [aria-hidden]'), { opacity: 0, duration: 0.14 }, 0.2)
		.to('.hero-display-art', { opacity: 0, duration: 0.14 }, 0.2);
	if (desktop) {
		timeline.to(studio, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.16, ease: 'power1.inOut' }, 0.44)
			.fromTo('.studio-heading', { y: 22 }, { y: 0, duration: 0.16 }, 0.46)
			.to(hero, { autoAlpha: 0, duration: 0.08 }, 0.54);
		intro.querySelectorAll('[data-equipment]').forEach((element, index) => {
			timeline.fromTo(element, { x: index ? 70 : -60, y: 30, rotation: index ? 7 : -7, opacity: 0, scale: 0.94 },
				{ x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.16 }, 0.46 + index * 0.03);
		});
	} else {
		// The tall mobile studio stays in normal flow so none of its content is clipped.
		timeline.to(laptop, { autoAlpha: 0, duration: 0.1 }, 0.44)
			.to(studio, { autoAlpha: 1, duration: 0.1 }, 0.44);
	}
	return cleanup;
}

export default function StudioIntro() {
	const ref = useRef(null);
	useLayoutEffect(() => {
		const media = gsap.matchMedia();
		media.add({ desktop: '(min-width: 1024px) and (min-height: 700px)',
			motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)',
		}, context => animateIntro(ref.current, context.conditions), ref);
		return () => media.revert();
	}, []);
	return <div ref={ref} className="cinematic-intro"><div className="intro-stage"><Hero /><CreativeStudio /></div></div>;
}
