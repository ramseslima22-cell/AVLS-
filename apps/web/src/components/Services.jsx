import React, { useRef } from 'react';
import useCinematic, { gsap } from '@/hooks/use-cinematic';
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

const ORDERED_SERVICES = [
	{ ...SERVICES[2], title: 'Social Media' },
	SERVICES[1],
	{ ...SERVICES[0], title: 'Web Design' },
	SERVICES[3], SERVICES[4], SERVICES[5],
];

function animateServices(section, { desktop }) {
	section.querySelectorAll('.service-scene').forEach((row) => {
		gsap.from(row, { y: desktop ? 45 : 20, opacity: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: row, start: 'top 90%', once: true },
		});
		gsap.fromTo(row.querySelector('.service-rule'), { scaleX: 0 }, { scaleX: 1, ease: 'none',
			scrollTrigger: { trigger: row, start: 'top 80%', end: 'center 45%', scrub: 0.7 },
		});
	});
}

export default function Services() {
	const ref = useRef(null);
	useCinematic(ref, animateServices);
	return (
		<section ref={ref} id="servicos" className="cinematic-services py-20 sm:py-28">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<div className="grid gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
					<div className="services-heading"><SectionHeader
						eyebrow="Nossos serviços"
						title={
							<>
								Tudo o que sua empresa precisa para{' '}
								<span className="text-gradient">evoluir.</span>
							</>
						}
					/></div>

					<div className="service-sequence">
						{ORDERED_SERVICES.slice(0, 4).map((service, index) => (
							<a key={service.title} className="service-scene" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
								<span className="service-number">0{index + 1}</span>
								<div><service.icon className="service-icon" size={25} strokeWidth={1.4} aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p></div>
								<ArrowUpRight className="service-arrow" aria-hidden="true" />
								<span className="service-rule" aria-hidden="true" />
							</a>
						))}
						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							{ORDERED_SERVICES.slice(4).map((service) => <Reveal key={service.title}>
								<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/40">
									<service.icon size={22} strokeWidth={1.5} aria-hidden="true" />
									<h3 className="mt-4 font-display text-lg font-semibold">{service.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
								</a>
							</Reveal>)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
