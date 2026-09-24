import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/whatsapp';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = delay => ({ initial: { opacity: 0, y: reduceMotion ? 0 : 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduceMotion ? 0 : .8, delay: reduceMotion ? 0 : delay } });
  return (
    <section id="inicio" className="hero-scene relative isolate overflow-hidden text-foreground">
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-ambient-light" aria-hidden="true" />
      <div className="mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
        <div className="hero-copy-panel">
        <motion.p {...enter(.05)} className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.3em] text-[#6351a2] sm:text-xs">
          <span className="h-px w-9 bg-current" /> Estratégia. Design. Presença.
        </motion.p>
        <motion.h1 {...enter(.15)} className="hero-depth-title mt-7 max-w-3xl font-display text-[clamp(2.25rem,6.4vw,6rem)] font-semibold leading-[1.06] tracking-[-.055em]">
          Do ideal<br />ao <span className="hero-accent">extraordinário.</span>
        </motion.h1>
        <motion.p {...enter(.3)} className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Estratégia que gera resultados. Criamos sites, marcas e experiências digitais para levar seu negócio mais longe.
        </motion.p>
        <motion.div {...enter(.45)} className="mt-9 flex flex-wrap gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hero-primary inline-flex items-center gap-4 rounded-full px-7 py-4 text-sm font-semibold">
            Vamos criar juntos <ArrowUpRight className="h-5 w-5" />
          </a>
          <a href="#trabalhos" className="inline-flex items-center gap-4 rounded-full border border-black/15 bg-white/60 px-7 py-4 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/90">
            Explore o portfólio <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
        <motion.div {...enter(.6)} className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[.22em] text-muted-foreground">
          <span className="hero-status-dot h-2 w-2 rounded-full bg-[#7765b5]" /> Ideias com propósito. Design com personalidade.
        </motion.div>
        </div>
      </div>
      <div className="hero-glass-note" aria-hidden="true"><span className="hero-glass-line" /><span>Estratégia + criação</span><strong>Uma nova perspectiva<br />para sua marca.</strong></div>
      <div className="hero-bottom-label absolute bottom-6 right-8 hidden text-[10px] uppercase tracking-[.28em] text-muted-foreground lg:block">AVLS / Estúdio digital</div>
    </section>
  );
}
