'use client';

import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Olá! Quero saber mais sobre as soluções da BlueV.')}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
      className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
