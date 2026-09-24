import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export default function usePointerDepth(strength = 5) {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 130, damping: 24, mass: .7 });
  const smoothY = useSpring(y, { stiffness: 130, damping: 24, mass: .7 });
  const rotateX = useTransform(smoothY, [-1, 1], [strength, -strength]);
  const rotateY = useTransform(smoothX, [-1, 1], [-strength, strength]);
  const lightX = useTransform(smoothX, [-1, 1], ['0%', '100%']);
  const lightY = useTransform(smoothY, [-1, 1], ['0%', '100%']);
  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) { x.set(0); y.set(0); }
  }, [enabled, x, y]);

  function reset() { x.set(0); y.set(0); }
  function onPointerMove(event) {
    if (!enabled || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    x.set(Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2)));
    y.set(Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2)));
  }
  return {
    enabled, reduceMotion, rotateX, rotateY, lightX, lightY,
    pointerEvents: { onPointerMove, onPointerLeave: reset, onPointerCancel: reset },
  };
}
