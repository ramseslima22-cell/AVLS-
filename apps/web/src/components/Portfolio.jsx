import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CaseDepth from '@/components/CaseDepth';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import MediaLightbox from '@/components/MediaLightbox';
import { projects, projectCategories } from '@/data/projects';
import { cn } from '@/lib/utils';

export default function Portfolio() {
	const [activeCategory, setActiveCategory] = useState('Todos');
	const [selected, setSelected] = useState(null);

	const filtered = useMemo(
		() =>
			activeCategory === 'Todos'
				? projects
				: projects.filter((project) => project.category === activeCategory),
		[activeCategory]
	);

	return (
		<section id="trabalhos" className="cinematic-portfolio py-20 sm:py-28">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeader
						eyebrow="Portfólio"
						title={
							<>
								Trabalhos que falam <span className="text-gradient">por si.</span>
							</>
						}
						description="Uma seleção de projetos criados para marcas que querem crescer com estratégia e design."
					/>

					<Reveal delay={0.1} className="flex flex-wrap gap-2">
						{projectCategories.map((category) => (
							<button
								key={category}
								type="button"
								onClick={() => setActiveCategory(category)}
								className={cn(
									'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 active:scale-[0.97]',
									activeCategory === category
										? 'border-foreground bg-foreground text-background'
										: 'border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'
								)}
							>
								{category}
							</button>
						))}
					</Reveal>
				</div>

				<motion.div layout className="case-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<AnimatePresence mode="popLayout">
						{filtered.map((project, index) => (
							<motion.article
								layout
								key={project.id}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.96 }}
								transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
							>
								<CaseDepth><button
									type="button"
									onClick={() => setSelected(project)}
									className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_18px_40px_-28px_rgba(20,20,30,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_64px_-28px_rgba(20,20,30,0.5)]"
									aria-label={`Abrir projeto ${project.title}`}
								>
									<div className="relative aspect-[4/3] overflow-hidden">
										<img
											src={project.cover}
											alt={project.title}
											loading="lazy"
											className="h-full w-full object-cover"
										/>
										<div
											className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
											aria-hidden="true"
										/>
										<span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
											<span className="text-sm font-semibold">Ver projeto</span>
											<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
												<ArrowUpRight className="h-4 w-4" />
											</span>
										</span>
									</div>
									<div className="flex items-center justify-between gap-3 p-5">
										<div>
											<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
												{project.category}
											</p>
											<h3 className="mt-1 font-display text-base font-semibold text-foreground">
												{project.title}
											</h3>
										</div>
										<span
											className="hidden h-0.5 w-8 bg-brand-gradient sm:block"
											aria-hidden="true"
										/>
									</div>
								</button></CaseDepth>
							</motion.article>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			<MediaLightbox
				item={selected}
				open={Boolean(selected)}
				onOpenChange={(open) => {
					if (!open) setSelected(null);
				}}
			/>
		</section>
	);
}
