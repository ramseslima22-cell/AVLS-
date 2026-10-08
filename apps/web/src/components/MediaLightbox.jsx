import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Lightbox reutilizável para projetos e vídeos.
// `item` deve ter: title, category?, description?, media { type: 'image' | 'video', src }, cover?
export default function MediaLightbox({ item, open, onOpenChange }) {
	const opener = useRef(null);
	if (!item || !open) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent onOpenAutoFocus={() => { opener.current = item.trigger || document.activeElement; }}
				onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }} className="avls-lightbox max-h-[90dvh] overflow-y-auto w-[94vw] max-w-6xl border-border bg-card p-0 overflow-x-hidden">
				<div className="bg-black">
					{item.media?.type === 'video' ? (
						<video
							key={item.media.src}
							src={item.media.src}
							poster={item.cover || item.thumbnail}
							preload="none"
							controls
							autoPlay
							playsInline
							className="mx-auto max-h-[65dvh] w-auto max-w-full object-contain"
						>
							Seu navegador não suporta a reprodução de vídeo.
						</video>
					) : (
						<img
							src={item.media?.src || item.cover}
							alt={item.title}
							className="max-h-[70vh] w-full object-contain"
						/>
					)}
				</div>
				<div className="p-6">
					{item.category ? (
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
							{item.category}
						</p>
					) : null}
					<DialogTitle className="mt-1 font-display text-xl font-bold text-foreground">
						{item.title}
					</DialogTitle>
					{item.description ? (
						<DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
							{item.description}
						</DialogDescription>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	);
}
