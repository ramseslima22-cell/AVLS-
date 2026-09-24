import DepthSurface from '@/components/DepthSurface';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FolderOpen, Grid2X2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import MediaLightbox from '@/components/MediaLightbox';
import Folder from '@/components/Folder';
import { projects, projectCategories } from '@/data/projects';
import { cn } from '@/lib/utils';

const FOLDER_COLORS = ['#8b684a', '#687359', '#a46b49', '#766456'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [view, setView] = useState('folders');
  const [selected, setSelected] = useState(null);
  const reduceMotion = useReducedMotion();
  const filtered = useMemo(() => activeCategory === 'Todos' ? projects : projects.filter(project => project.category === activeCategory), [activeCategory]);
  const groups = useMemo(() => projectCategories.filter(category => category !== 'Todos').map((category, index) => ({
    category, color: FOLDER_COLORS[index % FOLDER_COLORS.length],
    projects: filtered.filter(project => project.category === category),
  })).filter(group => group.projects.length), [filtered]);
  return (
    <section id="trabalhos" className="portfolio-section py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader eyebrow="Portfólio / AVLS" title={<>Boas ideias.<br /><span className="text-gradient">Projetos reais.</span></>}
            description="Abra uma pasta, descubra os detalhes e encontre inspiração para o seu próximo projeto." />
          <div className="flex shrink-0 rounded-full border border-border bg-card p-1.5" role="group" aria-label="Visualização do portfólio">
            {[['folders', FolderOpen, 'Pastas'], ['grid', Grid2X2, 'Em grade']].map(([value, Icon, label]) => (
              <button key={value} type="button" aria-pressed={view === value} onClick={() => setView(value)}
                className={cn('inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-semibold transition-colors', view === value ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Categorias do portfólio">
          {projectCategories.map(category => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}
              className={cn('rounded-full border px-4 py-2 text-xs font-semibold transition-colors', activeCategory === category ? 'border-foreground bg-foreground text-background' : 'border-border bg-card/70 text-muted-foreground hover:border-foreground/40')}>
              {category}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">{filtered.length} projetos selecionados · {view === 'folders' ? 'Clique na pasta e depois na prévia para ampliar.' : 'Clique em um projeto para ver os detalhes.'}</p>
        <AnimatePresence mode="wait">
          <motion.div key={view + activeCategory} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .3 }}>
            {view === 'folders' ? (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {groups.map(group => (
                  <DepthSurface key={group.category} strength={3} surfaceClassName="rounded-3xl">
                  <article className="portfolio-folder-panel rounded-3xl border border-border/80 px-3 pb-7 sm:px-8">
                    <Folder color={group.color} size={3.2} label={group.category} items={group.projects.slice(0, 3).map(project => (
                      <button key={project.id} type="button" onClick={() => setSelected(project)} aria-label={`Abrir projeto ${project.title}`}>
                        <img src={project.cover} alt="" loading="lazy" /><span>{project.title}</span>
                      </button>
                    ))} />
                    <div className="flex items-center justify-between gap-4 border-t border-border/70 px-3 pt-5">
                      <h3 className="font-display text-lg font-semibold">{group.category}</h3>
                      <button type="button" onClick={() => { setActiveCategory(group.category); setView('grid'); }} className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
                        Ver {group.projects.length === 1 ? 'projeto' : `os ${group.projects.length} projetos`}<ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                  </DepthSurface>
                ))}
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, index) => (
                  <Reveal key={project.id} delay={index * .04}>
                    <DepthSurface strength={4} surfaceClassName="rounded-2xl">
                    <button type="button" onClick={() => setSelected(project)} className="group block w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-xl" aria-label={`Abrir projeto ${project.title}`}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={project.cover} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
                        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground"><ArrowUpRight className="h-5 w-5" /></span>
                      </div>
                      <div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">{project.category}</p><h3 className="mt-2 font-display text-base font-semibold">{project.title}</h3></div>
                    </button>
                    </DepthSurface>
                  </Reveal>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <MediaLightbox item={selected} open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }} />
    </section>
  );
}
