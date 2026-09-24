import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const reduceMotion = useReducedMotion();
  return <motion.div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand-gradient" style={{ scaleX: reduceMotion ? scrollYProgress : smooth }} />;
}
