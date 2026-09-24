import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
	return (
		<motion.a
			href={WHATSAPP_URL}
			target="_blank"
			rel="noopener noreferrer"
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
			className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_16px_36px_-12px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
			aria-label="Falar no WhatsApp"
		>
			<span
				className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 motion-safe:animate-ping"
				aria-hidden="true"
			/>
			<WhatsAppIcon className="relative h-6 w-6" />
		</motion.a>
	);
}
