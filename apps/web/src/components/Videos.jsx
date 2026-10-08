import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MediaLightbox from '@/components/MediaLightbox';
import { videos, heroVideo } from '@/data/videos';
import './Videos.css';

export default function Videos() {
  const [index, setIndex] = useState(videos.indexOf(heroVideo));
  const [selected, setSelected] = useState(null);
  const video = videos[index];
  const go = direction => setIndex(current => (current + direction + videos.length) % videos.length);
  return (
    <section id="videos" className="video-feature media-scene" aria-labelledby="video-title">
      <div className="feature-image" key={video.id} aria-hidden="true"><img src={video.thumbnail} alt="" loading="lazy" decoding="async" /></div>
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-content scene-center">
        <Reveal><p className="film-eyebrow">Vídeos / Produção audiovisual</p><h2 id="video-title">Conteúdo em<br /><span className="text-gradient">movimento.</span></h2><p>Produção audiovisual e motion graphics que dão vida às marcas nas telas.</p></Reveal>
        <button className="feature-play film-button film-button--outline" type="button" onClick={event => setSelected({ ...video, trigger: event.currentTarget })} aria-label={'Assistir ' + video.title}><Play size={18} fill="currentColor" aria-hidden="true" /> Assistir projeto</button>
      </div>
      <div className="feature-bottom film-container">
        <div aria-live="polite"><span className="film-eyebrow">Produção audiovisual / Motion</span><h3>{video.title}</h3><p>{video.description}</p></div>
        <div className="feature-navigation"><span>{String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}</span><button type="button" onClick={() => go(-1)} aria-label="Projeto anterior"><ChevronLeft /></button><button type="button" onClick={() => go(1)} aria-label="Próximo projeto"><ChevronRight /></button></div>
      </div>
      <MediaLightbox item={selected} open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }} />
    </section>
  );
}
