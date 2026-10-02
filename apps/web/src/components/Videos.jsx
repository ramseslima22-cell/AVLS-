import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import MediaLightbox from '@/components/MediaLightbox';
import { videos } from '@/data/videos';
import './Videos.css';

const wrapIndex = (index) => (index + videos.length) % videos.length;

export default function Videos() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selected, setSelected] = useState(null);
	const [previewId, setPreviewId] = useState(null);
	const pointer = useRef(null);
	const suppressClick = useRef(false);
	const activeVideo = videos[activeIndex];

	const goTo = (index) => {
		setActiveIndex(wrapIndex(index));
		setPreviewId(null);
	};

	const handlePointerDown = (event) => {
		if (!event.isPrimary || event.button !== 0) return;
		pointer.current = { id: event.pointerId, x: event.clientX, lastX: event.clientX, dragged: false };
	};

	const handlePointerMove = (event) => {
		if (!pointer.current || pointer.current.id !== event.pointerId) return;
		pointer.current.lastX = event.clientX;
		if (!pointer.current.dragged && Math.abs(event.clientX - pointer.current.x) > 8) {
			pointer.current.dragged = true;
			event.currentTarget.setPointerCapture(event.pointerId);
		}
	};

	const handlePointerUp = (event) => {
		if (!pointer.current || pointer.current.id !== event.pointerId) return;
		const distance = event.clientX - pointer.current.x;
		if (pointer.current.dragged && Math.abs(distance) > 45) {
			suppressClick.current = true;
			goTo(activeIndex + (distance < 0 ? 1 : -1));
			window.setTimeout(() => { suppressClick.current = false; }, 0);
		}
		pointer.current = null;
	};

	const handlePointerCancel = () => {
		pointer.current = null;
	};

	const handleCardClick = (event, index) => {
		if (suppressClick.current) {
			event.preventDefault();
			return;
		}
		if (index !== activeIndex) {
			goTo(index);
			return;
		}
		setSelected(videos[index]);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goTo(activeIndex - 1);
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			goTo(activeIndex + 1);
		}
	};

	return (
		<section id="videos" className="showreel-section bg-[#101014] py-20 text-white sm:py-28">
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

				<div className="showreel-stage mt-12" onKeyDown={handleKeyDown}>
					<div
						className="showreel-track"
						role="region"
						aria-label="Carrossel de projetos audiovisuais"
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerCancel}
					>
						{videos.map((video, index) => {
							const offset = (index - activeIndex + videos.length) % videos.length;
							const position = offset === 0 ? 'active' : offset === 1 ? 'next' : offset === videos.length - 1 ? 'previous' : 'hidden';
							const isActive = position === 'active';
							const shouldPreview = isActive && previewId === video.id;
							const distance = Math.min(offset, videos.length - offset);

							return (
								<button
									key={video.id}
									type="button"
									className={`showreel-slide showreel-slide--${position}`}
									onClick={(event) => handleCardClick(event, index)}
									onMouseEnter={() => {
										if (isActive) setPreviewId(video.id);
									}}
									onMouseLeave={() => {
										if (isActive) setPreviewId(null);
									}}
									onPointerMove={(event) => {
										if (!isActive || event.pointerType !== 'mouse') return;
										const bounds = event.currentTarget.getBoundingClientRect();
										const x = (event.clientX - bounds.left) / bounds.width - 0.5;
										const y = (event.clientY - bounds.top) / bounds.height - 0.5;
										event.currentTarget.style.setProperty('--tilt-x', `${y * -3}deg`);
										event.currentTarget.style.setProperty('--tilt-y', `${x * 3}deg`);
									}}
									onPointerLeave={(event) => {
										event.currentTarget.style.setProperty('--tilt-x', '0deg');
										event.currentTarget.style.setProperty('--tilt-y', '0deg');
									}}
									aria-label={isActive ? `Assistir ${video.title}` : `Selecionar ${video.title}`}
									aria-current={isActive ? 'true' : undefined}
									tabIndex={position === 'hidden' ? -1 : 0}
								>
									<span className="showreel-card">
										<img
											src={video.thumbnail}
											alt=""
											draggable="false"
											loading={distance <= 1 ? 'eager' : 'lazy'}
										/>
										{shouldPreview ? (
											<video
												src={video.media.src}
												muted
												loop
												autoPlay
												playsInline
												preload="none"
												aria-hidden="true"
												onError={() => setPreviewId(null)}
											/>
										) : null}
										<span className="showreel-card-shade" aria-hidden="true" />
										<span className="showreel-play" aria-hidden="true">
											<Play fill="currentColor" />
										</span>
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className="showreel-details">
					<div className="showreel-caption" key={activeVideo.id} aria-live="polite">
						<p className="showreel-category">Produção audiovisual <span aria-hidden="true">/</span> Motion</p>
						<h3>{activeVideo.title}</h3>
						<p className="showreel-description">{activeVideo.description}</p>
					</div>
					<div className="showreel-controls">
						<div className="showreel-progress" aria-label={`Projeto ${activeIndex + 1} de ${videos.length}`}>
							<span className="showreel-count">
								<span>{String(activeIndex + 1).padStart(2, '0')}</span>
								<span className="showreel-count-divider">/</span>
								<span>{String(videos.length).padStart(2, '0')}</span>
							</span>
							<span className="showreel-progress-track" aria-hidden="true">
								<span style={{ width: `${((activeIndex + 1) / videos.length) * 100}%` }} />
							</span>
						</div>
						<div className="showreel-arrows">
							<button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Projeto anterior">
								<ChevronLeft aria-hidden="true" />
							</button>
							<button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Próximo projeto">
								<ChevronRight aria-hidden="true" />
							</button>
						</div>
					</div>
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
