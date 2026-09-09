import React from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/whatsapp';

const LOGO_URL =
	'https://horizons-cdn.hostinger.com/d0306d77-181b-4f01-a502-a7623b688350/634fe033e69c594372c7d6ef55f3cf4c.jpg';

const NAV_LINKS = [
	{ label: 'Início', href: '#inicio' },
	{ label: 'Serviços', href: '#servicos' },
	{ label: 'Trabalhos', href: '#trabalhos' },
	{ label: 'Sobre', href: '#sobre' },
	{ label: 'Contato', href: '#contato' },
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
				<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
					<div className="max-w-xs">
						<img
							src={LOGO_URL}
							alt="AVLS — Agência de Marketing Digital"
							className="h-12 w-auto mix-blend-multiply"
							width="160"
							height="48"
							loading="lazy"
						/>
						<p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
							Soluções digitais
							<br />
							que geram resultados
						</p>
					</div>

					<nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Links do rodapé">
						{NAV_LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.label}
							</a>
						))}
					</nav>

					<a
						href={WHATSAPP_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
					>
						<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white">
							<WhatsAppIcon className="h-4 w-4" />
						</span>
						{WHATSAPP_DISPLAY}
					</a>
				</div>

				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
					<p className="text-xs text-muted-foreground">
						© {year} AVLS — Agência de Marketing Digital. Todos os direitos reservados.
					</p>
					<p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
						Do ideal ao real.
						<span className="inline-block h-0.5 w-10 bg-brand-gradient" aria-hidden="true" />
					</p>
				</div>
			</div>
		</footer>
	);
}
