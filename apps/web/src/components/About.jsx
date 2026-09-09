import React from 'react';
import { Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const PILLARS = [
	'Estratégia antes da execução',
	'Design com identidade própria',
	'Foco em resultado real',
];

export default function About() {
	return (
		<section id="sobre" className="py-20 sm:py-28">
			<div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
				<Reveal className="relative order-2 lg:order-1">
					<div
						className="absolute -bottom-5 -left-5 h-full w-full rounded-3xl bg-brand-gradient opacity-90"
						aria-hidden="true"
					/>
					<img
						src="/images/sobre.png"
						alt="Equipe da AVLS trabalhando em projetos digitais"
						loading="lazy"
						className="relative aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-[0_32px_64px_-32px_rgba(20,20,30,0.5)]"
					/>
					<p className="relative mt-6 pl-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
						Do ideal ao real.
						<span className="ml-3 inline-block h-0.5 w-10 bg-brand-gradient align-middle" />
					</p>
				</Reveal>

				<div className="order-1 lg:order-2">
					<SectionHeader
						eyebrow="Sobre a AVLS"
						title={
							<>
								Uma agência feita de{' '}
								<span className="text-gradient">ideias que viram resultado.</span>
							</>
						}
					/>
					<Reveal delay={0.1}>
						<p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
							A AVLS é uma agência de marketing digital que une estratégia, criação e
							tecnologia para tirar projetos do papel. Cada entrega — do site à campanha —
							nasce de um plano claro e de um design pensado para a sua marca.
						</p>
						<p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
							Trabalhamos lado a lado com cada cliente, do diagnóstico à escala, para que
							presença digital deixe de ser custo e vire crescimento.
						</p>
					</Reveal>
					<Reveal delay={0.18}>
						<ul className="mt-8 space-y-3">
							{PILLARS.map((pillar) => (
								<li key={pillar} className="flex items-center gap-3">
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-white">
										<Check className="h-3.5 w-3.5" strokeWidth={3} />
									</span>
									<span className="text-sm font-medium text-foreground">{pillar}</span>
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
