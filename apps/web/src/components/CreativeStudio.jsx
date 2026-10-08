import Reveal from '@/components/Reveal';
import MediaBackdrop from '@/components/MediaBackdrop';

export default function CreativeStudio() {
  return (
    <section id="sobre" className="studio-scene media-scene" aria-labelledby="studio-title">
      <MediaBackdrop src="/images/sobre.png" />
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-content scene-center">
        <Reveal delay={.08}><h2 id="studio-title">Marcas com alma.<br />Conteúdo com <span className="text-gradient">presença.</span></h2></Reveal>
        <Reveal delay={.16}><p>Da primeira ideia ao próximo movimento. Criamos universos visuais que conectam sua marca às pessoas.</p></Reveal>
      </div>
    </section>
  );
}
