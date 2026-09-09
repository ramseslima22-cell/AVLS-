import React from 'react';
import {
	Globe,
	BarChart3,
	Instagram,
	Workflow,
	PenTool,
	TrendingUp,
	ArrowUpRight,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { WHATSAPP_URL } from '@/lib/whatsapp';

const SERVICES = [
	{
		icon: Globe,
		title: 'Criação de Sites',
		description: 'Sites modernos, rápidos e otimizados para resultados.',
	},
	{
		icon: BarChart3,
		title: 'Tráfego Pago',
		description: 'Campanhas no Google e Meta para atrair mais clientes.',
	},
	{
		icon: Instagram,
		title: 'Redes Sociais',
		description: 'Conteúdo estratégico que fortalece sua marca.',
	},
	{
		icon: Workflow,
		title: 'Automação',
		description: 'Processos inteligentes para economizar tempo e vender mais.',
	},
	{
		icon: PenTool,
		title: 'Identidade Visual',
		description: 'Uma marca forte, profissional e memorável.',
	},
	{
		icon: TrendingUp,
		title: 'Consultoria',
		description: 'Estratégia personalizada para o crescimento do seu negócio.',
	},
];

export default function Services() {
	return (
		<section id="servicos" className="py-20 sm:py-28">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<div className="grid gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
					<SectionHeader
						eyebrow="Nossos serviços"
						title={
							<>
								Tudo o que sua empresa precisa para{' '}
								<span className="text-gradient">evoluir.</span>
							</>
						}
					/>

					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{SERVICES.map((service, index) => (
							<Reveal key={service.title} delay={index * 0.06}>
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-[0_24px_48px_-24px_rgba(20,20,30,0.35)]"
								>
									<div className="flex items-start justify-between">
										<span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
											<service.icon className="h-5 w-5" strokeWidth={1.8} />
										</span>
										<ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
									</div>
									<h3 className="mt-5 font-display text-lg font-semibold text-foreground">
										{service.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										{service.description}
									</p>
								</a>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
