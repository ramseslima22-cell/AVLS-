import React, { useRef } from 'react';
import { ArrowUpRight, MousePointer2, Play, Heart, AudioLines, MoveUpRight } from 'lucide-react';
import useCinematic, { gsap } from '@/hooks/use-cinematic';
import StudioEquipment from '@/components/StudioEquipment';

function animateStudio(section, { desktop }) {
	if (!desktop) {
		gsap.from(section.querySelectorAll('[data-studio-reveal]'), {
		y: 32, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
		scrollTrigger: { trigger: section, start: 'top 78%', once: true },
		});
		return;
	}
	const intro = section.closest('.cinematic-intro');
	section.querySelectorAll('[data-float]').forEach((element, index) => {
		gsap.to(element, {
			y: -16 - index * 7, rotation: index % 2 ? 2 : -2, ease: 'none',
			scrollTrigger: { trigger: intro, start: 'bottom bottom', end: 'bottom top', scrub: true },
		});
	});
	section.querySelectorAll('[data-equipment-depth]').forEach((element, index) => {
		gsap.to(element, { x: index ? -24 : 32, y: index ? -75 : -40, opacity: 0.2, ease: 'none',
			scrollTrigger: { trigger: intro, start: 'bottom 85%', end: 'bottom 15%', scrub: true },
		});
	});
}

export default function CreativeStudio() {
	const ref = useRef(null);
	useCinematic(ref, animateStudio);
	return (
		<section ref={ref} className="creative-studio" aria-labelledby="studio-title">
			<div className="studio-glow" aria-hidden="true" />
			<div className="studio-topline" data-studio-reveal>
				<p className="studio-eyebrow">AVLS CREATIVE STUDIO</p>
				<span className="studio-record" aria-hidden="true"><i /> REC <span>00:00:24:01</span></span>
			</div>
			<div className="studio-composition">
				<div className="studio-heading" data-studio-reveal>
					<span className="studio-eyebrow">ESTRATÉGIA ENCONTRA EXPRESSÃO</span>
					<h2 id="studio-title">Marcas com alma.<br />Conteúdo com <span className="text-gradient">presença.</span></h2>
					<p>Da primeira ideia ao próximo movimento. Criamos universos visuais que conectam sua marca às pessoas.</p>
				</div>
				<div className="studio-art" aria-hidden="true" data-studio-reveal>
					<div className="equipment-depth equipment-depth--tripod" data-equipment-depth><StudioEquipment kind="tripod" /></div>
					<div className="equipment-depth equipment-depth--rig" data-equipment-depth><StudioEquipment kind="rig" /></div>
					<div className="studio-frame" data-float>
						<div className="studio-window-bar"><span>AVLS / BRAND EXPLORATION</span><ArrowUpRight size={14} /></div>
						<div className="studio-brand-mark"><span>AV</span><span>LS<span className="studio-mark-dot">®</span></span></div>
						<div className="studio-swatches"><i /><i /><i /><span>Do ideal ao real.</span></div>
					</div>
					<div className="studio-reel" data-float>
						<div className="studio-window-bar"><span>REELS / 9:16</span><i className="studio-live-dot" /></div>
						<div className="studio-orbit" /><Play className="studio-play" fill="currentColor" size={30} />
						<strong>MAKE<br />IT MOVE.</strong>
						<div className="studio-reel-footer"><Heart size={17} /><AudioLines size={24} /><span>00:15</span></div>
					</div>
					<div className="studio-cursor" data-float><MousePointer2 fill="#8b3fe4" /><span>Design em movimento</span></div>
					<div className="studio-metrics" data-float><MoveUpRight size={20} /><span>Ideias que<br /><b>ganham alcance.</b></span><div className="studio-bars"><i /><i /><i /><i /><i /></div></div>
					<span className="studio-corner studio-corner-a" /><span className="studio-corner studio-corner-b" />
				</div>
			</div>
			<div className="studio-disciplines" data-studio-reveal>
				{['Social Media', 'Branding', 'Reels', 'Design', 'Ads', 'Web', 'Motion'].map((label, index) => <span key={label}><i>0{index + 1}</i>{label}</span>)}
			</div>
		</section>
	);
}
