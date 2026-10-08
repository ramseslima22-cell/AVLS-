import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MediaBackdrop from '@/components/MediaBackdrop';

export default function CreativeStudio() {
  return (
    <section id="sobre" className="studio-scene media-scene" aria-labelledby="studio-title">
      <MediaBackdrop src="/images/sobre.png" />
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-content scene-center">
        <Reveal><p className="film-eyebrow">AVLS Creative Studio / Estratégia encontra expressão</p></Reveal>
        <Reveal delay={.08}><h2 id="studio-title">Marcas com alma.<br />Conteúdo com <span className="text-gradient">presença.</span></h2></Reveal>
        <Reveal delay={.16}><p>Da primeira ideia ao próximo movimento. Criamos universos visuais que conectam sua marca às pessoas.</p></Reveal>
        <Reveal delay={.22}><a href="#servicos" className="film-link">Design em movimento <ArrowUpRight size={18} aria-hidden="true" /></a></Reveal>
      </div>
      <Reveal className="studio-values"><span>Mais visibilidade</span><span>Mais clientes</span><span>Mais vendas</span><span>Crescimento contínuo</span></Reveal>
      <p className="scene-note">Ideias que ganham alcance.</p>
    </section>
  );
}
