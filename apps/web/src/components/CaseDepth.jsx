import React, { useRef } from 'react';
import useCinematic, { gsap } from '@/hooks/use-cinematic';

function animateCase(element, { desktop }) {
	gsap.from(element, {
		y: desktop ? 48 : 20, opacity: 0, duration: 0.85, ease: 'power3.out',
		scrollTrigger: { trigger: element, start: 'top 94%', once: true },
	});
	if (!desktop) return;
	const image = element.querySelector('img');
	gsap.fromTo(image, { yPercent: -3, scale: 1.08 }, {
		yPercent: 3, scale: 1.08, ease: 'none',
		scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
	});
}

export default function CaseDepth({ children }) {
	const ref = useRef(null);
	useCinematic(ref, animateCase);
	return <div ref={ref} className="case-depth">{children}</div>;
}
