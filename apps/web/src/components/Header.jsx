import React, { useEffect, useState } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

const LOGO_URL =
	'/images/logo.jpg';

const NAV_LINKS = [
	{ label: 'Início', href: '#inicio' },
	{ label: 'Serviços', href: '#servicos' },
	{ label: 'Trabalhos', href: '#trabalhos' },
	{ label: 'Sobre', href: '#sobre' },
	{ label: 'Contato', href: '#contato' },
];

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-50 transition-all duration-300',
				scrolled
					? 'border-b border-border/70 bg-background/85 shadow-[0_8px_30px_-18px_rgba(20,20,25,0.35)] backdrop-blur-xl'
					: 'bg-transparent'
			)}
		>
			<div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
				<a href="#inicio" className="flex items-center" aria-label="AVLS — voltar ao início">
					<img
						src={LOGO_URL}
						alt="AVLS — Agência de Marketing Digital"
						className="h-11 w-auto mix-blend-multiply"
						width="160"
						height="44"
					/>
				</a>

				<nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
						>
							{link.label}
							<span
								className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand-gradient transition-all duration-300 group-hover:w-full"
								aria-hidden="true"
							/>
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<a
						href={WHATSAPP_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="group hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(20,20,25,0.55)] active:translate-y-0 sm:inline-flex"
					>
						<WhatsAppIcon className="h-4 w-4" />
						Falar no WhatsApp
						<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
					</a>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<button
								type="button"
								className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-foreground lg:hidden"
								aria-label="Abrir menu"
							>
								<Menu className="h-5 w-5" />
							</button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[85vw] max-w-sm bg-background p-0">
							<SheetTitle className="sr-only">Menu de navegação</SheetTitle>
							<div className="flex h-full flex-col px-7 pb-8 pt-20">
								<nav className="flex flex-col gap-1" aria-label="Menu móvel">
									{NAV_LINKS.map((link, index) => (
										<a
											key={link.href}
											href={link.href}
											onClick={() => setOpen(false)}
											className="group flex items-center justify-between border-b border-border/70 py-4 font-display text-2xl font-semibold text-foreground transition-colors hover:text-transparent hover:[background:linear-gradient(92deg,#2f6bff,#8b3fe4,#e83e9c)] hover:[-webkit-background-clip:text] hover:[background-clip:text]"
										>
											{link.label}
											<span className="text-xs font-medium text-muted-foreground">
												0{index + 1}
											</span>
										</a>
									))}
								</nav>
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background"
								>
									<WhatsAppIcon className="h-4 w-4" />
									Falar no WhatsApp
								</a>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
