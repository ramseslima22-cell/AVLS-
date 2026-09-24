import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

// Lightbox reutilizável para projetos e vídeos.
// `item` deve ter: title, category?, description?, media { type: 'image' | 'video', src }, cover?
export default function MediaLightbox({ item, open, onOpenChange }) {
	if (!item) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-3xl border-border bg-card p-0 overflow-hidden">
				<div className="bg-black">
					{item.media?.type === 'video' ? (
						<video
							src={item.media.src}
							poster={item.cover || item.thumbnail}
							controls
							autoPlay
							playsInline
							className="aspect-video w-full object-contain"
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
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
							{item.description}
						</p>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	);
}
