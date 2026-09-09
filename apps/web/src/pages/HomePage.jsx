import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Videos from '@/components/Videos';
import Process from '@/components/Process';
import About from '@/components/About';
import CtaBanner from '@/components/CtaBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Seo from '@/components/Seo';

export default function HomePage() {
	return (
		<>
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
				<Hero />
				<Services />
				<Portfolio />
				<Videos />
				<Process />
				<About />
				<CtaBanner />
				<Contact />
			</main>
			<Footer />
			<WhatsAppFloat />
		</>
	);
}
