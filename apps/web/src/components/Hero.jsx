import React, { useRef } from 'react';
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useReducedMotion,
} from 'framer-motion';
import { ArrowRight, BarChart3, Users, Target, Zap } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/whatsapp';

const VALUE_PROPS = [
	{ icon: BarChart3, label: 'Mais visibilidade' },
	{ icon: Users, label: 'Mais clientes' },
	{ icon: Target, label: 'Mais vendas' },
	{ icon: Zap, label: 'Crescimento contínuo' },
];

// Tela do notebook: mini-site AVLS em CSS puro.
function LaptopScreen() {
	return (
		<div className="hero-display-surface relative flex h-full flex-col overflow-hidden bg-[var(--avls-screen)] p-5 text-white">
			<div
				className="hero-display-art absolute -right-10 top-6 h-44 w-44 opacity-90"
				style={{
					background: 'linear-gradient(135deg,#2f6bff 0%,#8b3fe4 55%,#e83e9c 100%)',
					clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
				}}
				aria-hidden="true"
			/>
			<div
				className="hero-display-art absolute -right-4 top-16 h-44 w-44 opacity-60 blur-2xl"
				style={{ background: 'linear-gradient(135deg,#2f6bff,#e83e9c)' }}
				aria-hidden="true"
			/>
			<div className="hero-display-ui relative flex items-center justify-between text-[10px] font-medium tracking-wide text-white/70">
				<span className="font-display text-xs font-bold text-white">
					AVL<span className="text-gradient">I</span>S
				</span>
				<span className="hidden gap-3 sm:flex">
					<span>Início</span>
					<span>Serviços</span>
					<span>Cases</span>
					<span>Sobre</span>
				</span>
			</div>
			<div className="hero-display-ui relative mt-auto">
				<p className="font-display text-2xl font-bold leading-tight sm:text-3xl">
					Do ideal
					<br />
					ao real.
				</p>
				<p className="mt-2 text-[10px] text-white/60">Estratégia. Criação. Resultados.</p>
				<span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-black">
					Começar agora <ArrowRight className="h-3 w-3" />
				</span>
			</div>
		</div>
	);
}

function PhoneScreen() {
	return (
		<div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[var(--avls-screen)] p-3 text-center text-white">
			<div
				className="absolute inset-x-0 bottom-0 h-1/2 opacity-70 blur-xl"
				style={{ background: 'linear-gradient(180deg,transparent,#8b3fe4)' }}
				aria-hidden="true"
			/>
			<span className="relative font-display text-sm font-bold">
				AVL<span className="text-gradient">I</span>S
			</span>
			<p className="relative mt-3 font-display text-[11px] font-semibold leading-snug">
				Sua marca
				<br />
				mais longe.
			</p>
			<span className="relative mt-3 block h-0.5 w-8 bg-brand-gradient" aria-hidden="true" />
		</div>
	);
}

export default function Hero() {
	const sectionRef = useRef(null);
	const reduceMotion = useReducedMotion();

	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, { stiffness: 55, damping: 16 });
	const sy = useSpring(my, { stiffness: 55, damping: 16 });
	const laptopX = useTransform(sx, (v) => v * 16);
	const laptopY = useTransform(sy, (v) => v * 10);
	const phoneX = useTransform(sx, (v) => v * -22);
	const phoneY = useTransform(sy, (v) => v * -14);

	function handleMouseMove(event) {
		if (reduceMotion || !sectionRef.current || window.scrollY > 24) return;
		const rect = sectionRef.current.getBoundingClientRect();
		mx.set((event.clientX - rect.left) / rect.width - 0.5);
		my.set((event.clientY - rect.top) / rect.height - 0.5);
	}

	return (
		<section
			id="inicio"
			ref={sectionRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => { mx.set(0); my.set(0); }}
			className="hero-cinematic relative overflow-hidden pt-28 sm:pt-32"
		>
			<div
				className="pointer-events-none absolute -top-40 right-[-15%] h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
				style={{ background: 'linear-gradient(135deg,#2f6bff,#8b3fe4,#e83e9c)' }}
				aria-hidden="true"
			/>

			<div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24">
				<div className="hero-copy">
					<div data-hero-part>
<motion.p
						initial={reduceMotion ? false : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
					>
						<span className="inline-block h-px w-10 bg-brand-gradient" aria-hidden="true" />
						Agência de Marketing Digital
					</motion.p>
</div>

					<div data-hero-part>
<motion.h1
						initial={reduceMotion ? false : { opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
						className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.4rem]"
					>
						Estratégia
						<br />
						que gera
						<br />
						<span className="text-gradient">resultados.</span>
					</motion.h1>
</div>

					<div data-hero-part>
<motion.p
						initial={reduceMotion ? false : { opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
						className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
					>
						Sites, tráfego pago, redes sociais e automação para empresas que querem
						crescer de verdade.
					</motion.p>
</div>

					<div data-hero-part>
<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
						className="mt-8 flex flex-wrap items-center gap-4"
					>
						<a
							href={WHATSAPP_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(20,20,25,0.6)] active:translate-y-0"
						>
							Quero um orçamento
							<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
						<a
							href="#trabalhos"
							className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98]"
						>
							Ver nossos trabalhos
						</a>
					</motion.div>
</div>

					<div data-hero-part>
<motion.ul
						initial={reduceMotion ? false : { opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.34, ease: 'easeOut' }}
						className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
					>
						{VALUE_PROPS.map((item) => (
							<li key={item.label} className="flex flex-col gap-2">
								<item.icon className="h-5 w-5 text-foreground" strokeWidth={1.8} />
								<span className="text-xs font-medium leading-tight text-muted-foreground">
									{item.label}
								</span>
							</li>
						))}
					</motion.ul>
</div>
				</div>

				<div className="relative">
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
						className="relative mx-auto max-w-xl"
					>
						<div className="hero-laptop-zoom">
						<motion.div style={reduceMotion ? undefined : { x: laptopX, y: laptopY }}>
							<div>
								<div className="rounded-t-2xl border border-black/60 bg-[#141419] p-2 shadow-[0_40px_80px_-30px_rgba(20,20,30,0.55)]">
									<div className="hero-display relative aspect-[16/10] overflow-hidden rounded-lg">
										<LaptopScreen />
									</div>
								</div>
								<div className="mx-auto h-3.5 w-[110%] -translate-x-[4.5%] rounded-b-2xl rounded-t-sm bg-gradient-to-b from-[#33333b] to-[#17171c]" />
							</div>
						</motion.div>
						</div>

						<div className="hero-phone-scroll absolute -bottom-10 right-0 w-24 sm:-right-6 sm:w-32">
						<motion.div
							style={reduceMotion ? undefined : { x: phoneX, y: phoneY }}
							className="relative"
						>
							<motion.div
								initial={reduceMotion ? false : { opacity: 0, y: 35, rotate: 6 }}
								animate={{ opacity: 1, y: 0, rotate: 0 }}
								transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
								className="overflow-hidden rounded-[1.6rem] border border-black/60 bg-[#141419] p-1.5 shadow-[0_30px_60px_-24px_rgba(20,20,30,0.6)]"
							>
								<div className="aspect-[9/19] overflow-hidden rounded-[1.2rem]">
									<PhoneScreen />
								</div>
							</motion.div>
						</motion.div>
						</div>

					</motion.div>
				</div>
			</div>
		</section>
	);
}
