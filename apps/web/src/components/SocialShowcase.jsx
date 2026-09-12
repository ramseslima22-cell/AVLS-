import React, { useRef } from 'react';
import { ArrowUpRight, Play, Heart, Bookmark, MoveRight } from 'lucide-react';
import useCinematic, { gsap } from '@/hooks/use-cinematic';

const CONCEPTS = [
	{ id: 'brand', format: 'Post / Branding', title: 'Sua marca.\nOutra dimensão.', variant: 'brand' },
	{ id: 'reel', format: 'Reel / Motion', title: 'Feito para\nser sentido.', variant: 'reel' },
	{ id: 'type', format: 'Carrossel / Design', title: 'IDEIAS\nEM ALTA.', variant: 'type' },
	{ id: 'campaign', format: 'Case / Campanha', title: 'Conexões\nque ficam.', variant: 'campaign' },
];

// A local cover and a title can replace each concept without changing the scroll scene.
export function SocialCard({ format, title, variant = 'brand', cover, concept = true }) {
	return (
		<article className={`social-card social-card--${variant}`}>
			<div className="social-card-top"><span>AVLS®</span><span>{format}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
			<div className="social-card-art">
				{cover ? <img src={cover} alt={title} loading="lazy" /> : <div className="social-card-shape" aria-hidden="true" />}
				<h3>{title}</h3>
				{variant === 'reel' && <span className="social-card-play" aria-hidden="true"><Play size={22} fill="currentColor" /></span>}
			</div>
			<div className="social-card-bottom"><span>{concept ? 'ESTUDO CRIATIVO' : format}</span><span aria-hidden="true"><Heart size={16} /><Bookmark size={16} /></span></div>
		</article>
	);
}

function animateSocial(section, { desktop }) {
	if (!desktop) return;
	const track = section.querySelector('.social-track');
	const viewport = section.querySelector('.social-viewport');
	const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: section, start: 'top 80px', end: () => `+=${distance() + 320}`,
			pin: true, scrub: 0.8, invalidateOnRefresh: true,
		},
	});
	timeline.to(track, { x: () => -distance(), ease: 'none' }, 0)
		.to('.social-word-media', { xPercent: -12, ease: 'none' }, 0)
		.fromTo('.social-scroll-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
	const onKeyDown = (event) => {
		if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
		event.preventDefault();
		const trigger = timeline.scrollTrigger;
		const progress = event.key === 'Home' ? 0 : event.key === 'End' ? 1
			: gsap.utils.clamp(0, 1, trigger.progress + (event.key === 'ArrowRight' ? 0.35 : -0.35));
		window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: 'instant' });
	};
	viewport.addEventListener('keydown', onKeyDown);
	return () => viewport.removeEventListener('keydown', onKeyDown);
}

export default function SocialShowcase() {
	const ref = useRef(null);
	useCinematic(ref, animateSocial);
	return (
		<section ref={ref} className="social-showcase" aria-labelledby="social-title">
			<div className="social-intro"><p className="studio-eyebrow">CONTEÚDO QUE OCUPA ESPAÇO</p><span>CRIAÇÃO / CONEXÃO / CULTURA</span></div>
			<h2 id="social-title" className="social-title"><span>SOCIAL</span><span className="social-word-media">MEDIA<span className="social-title-star" aria-hidden="true">✳</span></span></h2>
			<div className="social-viewport" tabIndex={0} role="region" aria-label="Estudos criativos de social media; deslize ou use as setas para explorar">
				<div className="social-track">{CONCEPTS.map((concept) => <SocialCard key={concept.id} {...concept} />)}</div>
			</div>
			<div className="social-caption"><p>Explorações visuais. Espaço para as próximas grandes histórias.</p><span>EXPLORE <MoveRight size={18} aria-hidden="true" /></span></div>
			<div className="social-progress" aria-hidden="true"><div className="social-scroll-progress" /></div>
		</section>
	);
}
