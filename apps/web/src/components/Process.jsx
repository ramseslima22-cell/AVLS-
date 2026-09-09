import React from 'react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const STEPS = [
	{
		number: '01',
		title: 'Diagnóstico',
		description: 'Entendemos seu negócio e seus objetivos.',
	},
	{
		number: '02',
		title: 'Estratégia',
		description: 'Criamos um plano personalizado.',
	},
	{
		number: '03',
		title: 'Execução',
		description: 'Colocamos tudo em prática com foco em resultados.',
	},
	{
		number: '04',
		title: 'Escala',
		description: 'Acompanhamos e otimizamos para você crescer mais.',
	},
];

export default function Process() {
	return (
		<section id="processo" className="py-20 sm:py-28">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<SectionHeader
					eyebrow="Como funciona"
					title={
						<>
							Do planejamento ao <span className="text-gradient">crescimento.</span>
						</>
					}
				/>

				<ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
					{STEPS.map((step, index) => (
						<Reveal key={step.number} delay={index * 0.1} as="li" className="relative">
							<div className="flex items-center gap-4">
								<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(139,63,228,0.6)]">
									{step.number}
								</span>
								{index < STEPS.length - 1 ? (
									<span
										className="hidden h-px flex-1 bg-border lg:block"
										aria-hidden="true"
									/>
								) : null}
							</div>
							<h3 className="mt-5 font-display text-lg font-semibold text-foreground">
								{step.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								{step.description}
							</p>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
