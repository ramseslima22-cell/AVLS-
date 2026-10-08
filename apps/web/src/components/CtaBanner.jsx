import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MediaBackdrop from '@/components/MediaBackdrop';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/whatsapp';

export default function CtaBanner() {
  return (
    <section className="cta-scene media-scene" aria-label="Chamada para contato">
      <MediaBackdrop src="/videos/video-3.png" />
      <div className="scene-shade" aria-hidden="true" />
      <Reveal className="scene-content scene-center">
        <h2>Vamos conversar<br />sobre o seu <span className="text-gradient">projeto?</span></h2>
        <p>Fale com a nossa equipe e descubra como podemos gerar resultados para você.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="film-button"><WhatsAppIcon className="h-4 w-4" /> Falar no WhatsApp <ArrowRight size={17} aria-hidden="true" /></a>
      </Reveal>
    </section>
  );
}
