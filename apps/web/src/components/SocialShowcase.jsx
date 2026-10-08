import Reveal from '@/components/Reveal';
import MediaBackdrop from '@/components/MediaBackdrop';


export default function SocialShowcase() {
  return (
    <section className="social-scene media-scene" aria-labelledby="social-title">
      <MediaBackdrop src="/videos/video-2.png" />
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-content scene-center">
        <Reveal><p className="film-eyebrow">Conteúdo que ocupa espaço / Criação · Conexão · Cultura</p></Reveal>
        <Reveal delay={.08}><h2 id="social-title">SOCIAL<br /><span className="social-outline">MEDIA</span></h2></Reveal>
        <Reveal delay={.16}><p>Explorações visuais. Espaço para as próximas grandes histórias.</p></Reveal>
      </div>
    </section>
  );
}
