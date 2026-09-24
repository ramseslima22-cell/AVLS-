// Número e mensagem padrão do WhatsApp da AVLS.
// Todos os CTAs do site abrem a conversa com esta mensagem.
export const WHATSAPP_NUMBER = '5521965024096';
export const WHATSAPP_DISPLAY = '+55 21 96502-4096';
export const WHATSAPP_DEFAULT_MESSAGE =
	'Olá! Vim pelo site da AVLS e gostaria de saber mais sobre os serviços.';

export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl();
