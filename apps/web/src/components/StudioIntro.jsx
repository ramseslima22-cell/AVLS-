import React, { useRef } from 'react';
import Hero from '@/components/Hero';
import CreativeStudio from '@/components/CreativeStudio';
import useCinematic, { gsap } from '@/hooks/use-cinematic';

function animateIntro(intro, { desktop }) {
	const stage = intro.querySelector('.intro-stage');
	const hero = intro.querySelector('.hero-cinematic');
	const laptop = intro.querySelector('.hero-laptop-zoom');
	if (!desktop) {
		gsap.to(laptop, { y: -18, scale: 1.04, ease: 'none', scrollTrigger: {
			trigger: laptop, start: 'top 70%', end: 'bottom top', scrub: true,
		} });
		return;
	}
	intro.classList.add('intro-enhanced');
	const studio = intro.querySelector('.creative-studio');
	const display = intro.querySelector('.hero-display');
	const centerOffset = (axis) => {
		let position = 0;
		for (let element = display; element && element !== hero; element = element.offsetParent) {
			position += axis === 'x' ? element.offsetLeft : element.offsetTop;
		}
		return axis === 'x' ? hero.clientWidth / 2 - position - display.offsetWidth / 2
			: hero.clientHeight / 2 - position - display.offsetHeight / 2;
	};
	gsap.set(studio, { autoAlpha: 0, clipPath: 'inset(5% 5% 5% 5% round 28px)' });
	// Each copy wrapper owns only scroll transforms; its child retains the Framer entrance.
	const timeline = gsap.timeline({ scrollTrigger: {
		trigger: intro, pin: stage, start: 'top top', end: () => `+=${window.innerHeight * 1.85}`,
		scrub: true, invalidateOnRefresh: true, refreshPriority: 10,
	} });
	intro.querySelectorAll('[data-hero-part]').forEach((element, index) => {
		timeline.to(element, { autoAlpha: 0, y: -12 - index * 3, duration: 0.13, ease: 'power1.in' }, index * 0.035);
	});
	timeline.to('.hero-phone-scroll', { y: -42, autoAlpha: 0, duration: 0.2 }, 0.09)
		.to('.hero-side-words', { autoAlpha: 0, duration: 0.12 }, 0.03)
		.to(laptop, {
			scale: () => Math.max(hero.clientWidth / display.offsetWidth, hero.clientHeight / display.offsetHeight) * 1.12,
			x: () => centerOffset('x'), y: () => centerOffset('y'),
			duration: 0.62, ease: 'power2.inOut',
		}, 0.08)
		.to('.hero-display-ui', { opacity: 0, duration: 0.18 }, 0.36)
		.to('.hero-display', { borderRadius: 0, duration: 0.15 }, 0.54)
		.to('.hero-display-surface', { backgroundColor: '#f5f3ef', duration: 0.2 }, 0.6)
		.to('.hero-display-art', { opacity: 0, duration: 0.2 }, 0.6)
		.to(studio, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.24, ease: 'power1.inOut' }, 0.68)
		.fromTo('.studio-heading', { y: 22 }, { y: 0, duration: 0.2 }, 0.7)
		.to(hero, { autoAlpha: 0, duration: 0.12 }, 0.82);
	intro.querySelectorAll('[data-equipment]').forEach((element, index) => {
		timeline.fromTo(element, { x: index ? 70 : -60, y: 30, rotation: index ? 7 : -7, opacity: 0, scale: 0.94 },
			{ x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.2 }, 0.74 + index * 0.06);
	});
	// A still interval lets the studio settle before the pin is released.
	timeline.to({}, { duration: 0.16 });
	return () => intro.classList.remove('intro-enhanced');
}

export default function StudioIntro() {
	const ref = useRef(null);
	useCinematic(ref, animateIntro);
	return <div ref={ref} className="cinematic-intro"><div className="intro-stage"><Hero /><CreativeStudio /></div></div>;
}
