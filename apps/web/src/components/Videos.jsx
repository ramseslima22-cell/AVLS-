import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import MediaLightbox from '@/components/MediaLightbox';
import { videos } from '@/data/videos';

export default function Videos() {
	const [selected, setSelected] = useState(null);

	return (
		<section id="videos" className="bg-[#101014] py-20 text-white sm:py-28">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<SectionHeader
					dark
					eyebrow="Vídeos"
					title={
						<>
							Conteúdo em <span className="text-gradient">movimento.</span>
						</>
					}
					description="Produção audiovisual e motion graphics que dão vida às marcas nas telas."
				/>

				<div className="mt-12 grid gap-5 md:grid-cols-3">
					{videos.map((video, index) => (
						<Reveal key={video.id} delay={index * 0.08}>
							<button
								type="button"
								onClick={() => setSelected(video)}
								className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.8)]"
								aria-label={`Assistir ${video.title}`}
							>
								<div className="relative aspect-video overflow-hidden">
									<img
										src={video.thumbnail}
										alt={video.title}
										loading="lazy"
										className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
									/>
									<div
										className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
										aria-hidden="true"
									/>
									<span className="absolute inset-0 flex items-center justify-center">
										<span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
											<Play className="ml-0.5 h-5 w-5" fill="currentColor" />
										</span>
									</span>
								</div>
								<div className="flex items-center justify-between gap-3 bg-white/[0.04] p-5">
									<div>
										<h3 className="font-display text-base font-semibold">{video.title}</h3>
										<p className="mt-1 text-xs leading-relaxed text-white/60">
											{video.description}
										</p>
									</div>
									<span className="h-0.5 w-8 shrink-0 bg-brand-gradient" aria-hidden="true" />
								</div>
							</button>
						</Reveal>
					))}
				</div>
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
