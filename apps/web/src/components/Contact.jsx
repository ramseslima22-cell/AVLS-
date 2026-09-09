import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/whatsapp';

const SERVICE_OPTIONS = [
	'Criação de Sites',
	'Tráfego Pago',
	'Redes Sociais',
	'Automação',
	'Identidade Visual',
	'Consultoria',
	'Outro',
];

const inputClass =
	'w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#8b3fe4]';

export default function Contact() {
	const [form, setForm] = useState({ nome: '', telefone: '', servico: '', mensagem: '' });
	const [sent, setSent] = useState(false);

	function updateField(field) {
		return (event) => {
			setForm((current) => ({ ...current, [field]: event.target.value }));
			setSent(false);
		};
	}

	function handleSubmit(event) {
		event.preventDefault();
		const lines = [
			'Olá! Vim pelo site da AVLS e gostaria de saber mais sobre os serviços.',
			'',
			`Nome: ${form.nome}`,
			form.telefone ? `Telefone: ${form.telefone}` : null,
			form.servico ? `Serviço de interesse: ${form.servico}` : null,
			form.mensagem ? `Mensagem: ${form.mensagem}` : null,
		].filter(Boolean);
		window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
		setSent(true);
	}

	return (
		<section id="contato" className="py-20 sm:py-28">
			<div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
				<div>
					<SectionHeader
						eyebrow="Contato"
						title={
							<>
								Conte para a gente o seu{' '}
								<span className="text-gradient">próximo passo.</span>
							</>
						}
						description="Preencha o formulário e continue a conversa direto no WhatsApp. Responderemos o quanto antes."
					/>
					<Reveal delay={0.12}>
						<div className="mt-10 space-y-4">
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_20px_40px_-24px_rgba(20,20,30,0.4)]"
							>
								<span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white">
									<WhatsAppIcon className="h-5 w-5" />
								</span>
								<span>
									<span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
										WhatsApp
									</span>
									<span className="mt-0.5 block font-display text-base font-semibold text-foreground">
										{WHATSAPP_DISPLAY}
									</span>
								</span>
							</a>
							<p className="pl-1 text-sm leading-relaxed text-muted-foreground">
								Atendimento direto, sem intermediários: você fala com quem vai tirar o seu
								projeto do papel.
							</p>
						</div>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<form
						onSubmit={handleSubmit}
						className="rounded-3xl border border-border bg-card p-6 shadow-[0_28px_56px_-32px_rgba(20,20,30,0.35)] sm:p-8"
					>
						<div className="grid gap-5 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<label htmlFor="nome" className="text-sm font-medium text-foreground">
									Nome
								</label>
								<input
									id="nome"
									name="nome"
									type="text"
									required
									autoComplete="name"
									placeholder="Seu nome"
									value={form.nome}
									onChange={updateField('nome')}
									className={inputClass}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="telefone" className="text-sm font-medium text-foreground">
									Telefone
								</label>
								<input
									id="telefone"
									name="telefone"
									type="tel"
									autoComplete="tel"
									placeholder="(21) 90000-0000"
									value={form.telefone}
									onChange={updateField('telefone')}
									className={inputClass}
								/>
							</div>
						</div>

						<div className="mt-5 flex flex-col gap-2">
							<label htmlFor="servico" className="text-sm font-medium text-foreground">
								Serviço de interesse
							</label>
							<select
								id="servico"
								name="servico"
								value={form.servico}
								onChange={updateField('servico')}
								className={inputClass}
							>
								<option value="" disabled>
									Selecione um serviço
								</option>
								{SERVICE_OPTIONS.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>

						<div className="mt-5 flex flex-col gap-2">
							<label htmlFor="mensagem" className="text-sm font-medium text-foreground">
								Mensagem
							</label>
							<textarea
								id="mensagem"
								name="mensagem"
								rows={4}
								placeholder="Conte um pouco sobre o seu projeto..."
								value={form.mensagem}
								onChange={updateField('mensagem')}
								className={`${inputClass} resize-none`}
							/>
						</div>

						<button
							type="submit"
							className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(20,20,25,0.6)] active:translate-y-0"
						>
							Enviar pelo WhatsApp
							<Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</button>

						{sent ? (
							<p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
								<CheckCircle2 className="h-4 w-4 text-[#25d366]" />
								Abrimos o WhatsApp com a sua mensagem pronta para envio.
							</p>
						) : null}
					</form>
				</Reveal>
			</div>
		</section>
	);
}
