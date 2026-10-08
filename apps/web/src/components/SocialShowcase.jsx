import Reveal from '@/components/Reveal';
import MediaBackdrop from '@/components/MediaBackdrop';
import { ArrowUpRight } from 'lucide-react';

const MESSAGES = ['Sua marca. Outra dimensão.', 'Feito para ser sentido.', 'IDEIAS EM ALTA.', 'Conexões que ficam.'];

export default function SocialShowcase() {
  return (
    <section className="social-scene media-scene" aria-labelledby="social-title">
      <MediaBackdrop src="/videos/video-2.png" />
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-content scene-center">
        <Reveal><p className="film-eyebrow">Conteúdo que ocupa espaço / Criação · Conexão · Cultura</p></Reveal>
        <Reveal delay={.08}><h2 id="social-title">SOCIAL<br /><span className="social-outline">MEDIA</span></h2></Reveal>
        <Reveal delay={.16}><p>Explorações visuais. Espaço para as próximas grandes histórias.</p></Reveal>
        <Reveal delay={.22}><a className="film-link" href="#trabalhos">Explore <ArrowUpRight size={18} aria-hidden="true" /></a></Reveal>
      </div>
      <div className="social-statements film-container">{MESSAGES.map((message, index) => <Reveal key={message} delay={index * .04}><p>{message}</p></Reveal>)}</div>
    </section>
  );
}
