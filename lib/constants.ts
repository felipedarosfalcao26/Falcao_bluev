export const SITE_NAME = 'BlueV';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bluev.com.br';
export const SITE_DESCRIPTION =
  'BlueV é a plataforma de eletromobilidade que conecta motoristas, carregadores, veículos elétricos e empresas em um único ecossistema.';

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Carregadores', href: '/carregadores' },
  { label: 'Mapa de recarga', href: '/mapa-de-recarga' },
  { label: 'Veículos elétricos', href: '/veiculos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre a BlueV', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
] as const;

export const NAV_CTA = { label: 'Instale seu carregador', href: '/carregadores#instalar' };

export const FOOTER_LINKS = [
  { label: 'Carregadores', href: '/carregadores' },
  { label: 'Mapa', href: '/mapa-de-recarga' },
  { label: 'Veículos', href: '/veiculos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/bluev' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/bluev' },
  { label: 'YouTube', href: 'https://youtube.com/@bluev' },
];

export const VEHICLE_BRANDS = [
  'BYD',
  'GWM',
  'Tesla',
  'Volvo',
  'BMW',
  'Mercedes-Benz',
  'JAC',
  'Porsche',
  'Audi',
  'Kia',
  'Ford',
  'Chevrolet',
  'Chery',
  'Toyota',
  'Geely',
  'Omoda',
  'Outras',
] as const;
