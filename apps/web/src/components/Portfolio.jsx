import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MediaLightbox from '@/components/MediaLightbox';
import { projects, projectCategories } from '@/data/projects';
import './Portfolio.css';

export default function Portfolio() {
  const [category, setCategory] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const reduced = useReducedMotion();
  const filtered = category === 'Todos' ? projects : projects.filter(project => project.category === category);
  return (
    <section id="trabalhos" className="portfolio-editorial" aria-labelledby="portfolio-title">
      <div className="film-container">
        <Reveal className="portfolio-heading"><p className="film-eyebrow">Portfólio / AVLS</p><h2 id="portfolio-title">Boas ideias.<br /><span className="text-gradient">Projetos reais.</span></h2></Reveal>
        <div className="portfolio-toolbar">
          <p>Descubra os detalhes e encontre inspiração para o seu próximo projeto.</p>
          <div className="portfolio-filters" role="group" aria-label="Categorias do portfólio">
            {projectCategories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
        </div>
        <p className="portfolio-count" aria-live="polite">{filtered.length} projetos selecionados · Clique em um projeto para ver os detalhes.</p>
        <div className="project-grid" key={category}>
          {filtered.map((project, index) => (
            <motion.article key={project.id} className="project-cell"
              initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .55, delay: index % 2 * .06 }}>
              <button type="button" onClick={event => setSelected({ ...project, trigger: event.currentTarget })} className="project-card" aria-label={'Assistir ' + project.title}>
                <img src={project.cover} alt="" loading="lazy" decoding="async" width="405" height="720" />
                <span className="project-shade" aria-hidden="true" />
                <span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} / AVLS</span>
                <span className="project-play" aria-hidden="true"><Play size={20} fill="currentColor" /></span>
                <span className="project-caption"><span className="film-eyebrow">{project.category}</span><span className="project-name">{project.title}</span><span className="project-watch">Assistir projeto <ArrowUpRight size={16} aria-hidden="true" /></span></span>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
      <MediaLightbox item={selected} open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }} />
    </section>
  );
}
