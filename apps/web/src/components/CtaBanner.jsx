import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/whatsapp';

export default function CtaBanner() {
	return (
		<section className="py-10 sm:py-14" aria-label="Chamada para contato">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<Reveal>
					<div className="relative overflow-hidden rounded-3xl bg-[#101014] px-7 py-12 sm:px-12 sm:py-16">
						<div
							className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
							style={{
								background: 'linear-gradient(135deg,#2f6bff,#8b3fe4,#e83e9c)',
							}}
							aria-hidden="true"
						/>
						<div
							className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full opacity-25 blur-3xl"
							style={{ background: 'linear-gradient(135deg,#8b3fe4,#e83e9c)' }}
							aria-hidden="true"
						/>
						<div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
							<div className="max-w-xl">
								<h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
									Vamos conversar sobre o seu{' '}
									<span className="text-gradient">projeto?</span>
								</h2>
								<p className="mt-4 text-base leading-relaxed text-white/70">
									Fale com a nossa equipe e descubra como podemos gerar resultados para
									você.
								</p>
							</div>
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(255,255,255,0.4)] active:translate-y-0"
							>
								<WhatsAppIcon className="h-4 w-4" />
								Falar no WhatsApp
								<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
							</a>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
