import React from 'react';
import { MotionConfig } from 'framer-motion';
import StudioIntro from '@/components/StudioIntro';
import SocialShowcase from '@/components/SocialShowcase';
import '@/cinematic.css';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Videos from '@/components/Videos';
import CtaBanner from '@/components/CtaBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Seo from '@/components/Seo';

export default function HomePage() {
	return (
		<MotionConfig reducedMotion="user">
			<div className="avls-cinema">
			<Helmet>
				<title>AVLS — Agência de Marketing Digital | Estratégia que gera resultados</title>
				<meta
					name="description"
					content="A AVLS é uma agência de marketing digital especializada em criação de sites, tráfego pago, redes sociais, automação, identidade visual e consultoria. Do ideal ao real."
				/>
			</Helmet>
			<Seo
				title="AVLS — Agência de Marketing Digital"
				description="Sites, tráfego pago, redes sociais e automação para empresas que querem crescer de verdade."
				siteName="AVLS"
			/>
			<Header />
			<main>
				<StudioIntro />
				<SocialShowcase />
				<Portfolio />
				<Videos />
				<CtaBanner />
				<Contact />
			</main>
			<Footer />
			<WhatsAppFloat />
		</div>
		</MotionConfig>
	);
}
