import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Keep setup functions outside the component so ordinary renders do not restart scroll scenes.
export default function useCinematic(scope, setup) {
	useLayoutEffect(() => {
		const media = gsap.matchMedia();
		media.add({
			desktop: '(min-width: 1024px) and (min-height: 700px)',
			motion: '(prefers-reduced-motion: no-preference)',
		}, (context) => {
			if (!context.conditions.motion) return;
			return setup(scope.current, context.conditions);
		}, scope);
		return () => media.revert();
	}, [scope, setup]);
}

export { gsap, ScrollTrigger };
