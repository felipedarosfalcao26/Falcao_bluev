import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { whatsappLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a BlueV: WhatsApp, e-mail, telefone e formulário de contato para dúvidas, orçamentos e parcerias.',
};

const CONTACT_ITEMS = [
  { icon: MessageCircle, label: 'WhatsApp', value: 'Fale agora', href: whatsappLink('Olá! Gostaria de falar com a BlueV.') },
  { icon: Mail, label: 'E-mail', value: 'contato@bluev.com.br', href: 'mailto:contato@bluev.com.br' },
  { icon: Phone, label: 'Telefone', value: '(11) 4000-0000', href: 'tel:+551140000000' },
  { icon: MapPin, label: 'Endereço', value: 'Av. Brg. Faria Lima, 3900 - São Paulo, SP', href: undefined },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-12">
        <SectionHeading eyebrow="Contato" title="Fale com a BlueV" light />
      </Container>

      <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {CONTACT_ITEMS.map((item) => {
            const content = (
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <item.icon size={20} />
                </span>
                <div>
                  <p className="text-xs text-white/50">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <ContactForm />
      </Container>
    </div>
  );
}
