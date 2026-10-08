import { useState } from 'react';
import { ArrowRight, ArrowDown, Pause, Play } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MediaBackdrop from '@/components/MediaBackdrop';
import { WHATSAPP_URL } from '@/lib/whatsapp';

export default function Hero() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="inicio" className="cinema-hero media-scene" aria-labelledby="hero-title">
      <MediaBackdrop src="/videos/video-1.png" videoSrc="/videos/avls-hero.mp4" paused={paused} priority />
      <div className="scene-shade" aria-hidden="true" />
      <div className="hero-center scene-content">
        <Reveal><p className="film-eyebrow">AVLS / Agência de Marketing Digital</p></Reveal>
        <Reveal delay={.08}><h1 id="hero-title">Estratégia<br />que gera <span className="text-gradient">resultados.</span></h1></Reveal>
        <Reveal delay={.16}><p className="hero-description">Sites, tráfego pago, redes sociais e automação para empresas que querem crescer de verdade.</p></Reveal>
        <Reveal delay={.24} className="film-actions">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="film-button">Quero um orçamento <ArrowRight size={17} aria-hidden="true" /></a>
          <a href="#trabalhos" className="film-button film-button--outline">Ver nossos trabalhos</a>
        </Reveal>
      </div>
      <div className="hero-footnote">
        <p>Do ideal ao real.</p>
        <a href="#trabalhos">Explore <ArrowDown size={16} aria-hidden="true" /></a>
        <span>Estratégia. Criação. Resultados.</span>
        <button type="button" className="hero-video-toggle" onClick={() => setPaused(current => !current)} aria-label={paused ? "Reproduzir vídeo de fundo" : "Pausar vídeo de fundo"}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>
      </div>
    </section>
  );
}
