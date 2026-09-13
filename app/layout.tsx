import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { AnalyticsScripts } from '@/components/layout/AnalyticsScripts';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Plataforma de Eletromobilidade`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'carregador para carro elétrico',
    'instalação de carregador elétrico',
    'carregador residencial',
    'carregador para condomínio',
    'carregador para empresa',
    'estação de recarga',
    'carro elétrico',
    'carros elétricos usados',
    'veículos elétricos',
    'eletromobilidade',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Plataforma de Eletromobilidade`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Plataforma de Eletromobilidade`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={cn('min-h-screen bg-ink-950 font-sans antialiased')}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
