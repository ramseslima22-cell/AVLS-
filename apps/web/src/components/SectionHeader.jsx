import React from 'react';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

// Cabeçalho padrão das seções: eyebrow em caixa alta + título display.
export default function SectionHeader({ eyebrow, title, description, dark = false, className }) {
	return (
		<Reveal className={cn('max-w-2xl', className)}>
			<p
				className={cn(
					'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em]',
					dark ? 'text-white/60' : 'text-muted-foreground'
				)}
			>
				<span className="inline-block h-px w-8 bg-brand-gradient" aria-hidden="true" />
				{eyebrow}
			</p>
			<h2
				className={cn(
					'mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl',
					dark ? 'text-white' : 'text-foreground'
				)}
			>
				{title}
			</h2>
			{description ? (
				<p
					className={cn(
						'mt-4 text-base leading-relaxed sm:text-lg',
						dark ? 'text-white/70' : 'text-muted-foreground'
					)}
				>
					{description}
				</p>
			) : null}
		</Reveal>
	);
}
