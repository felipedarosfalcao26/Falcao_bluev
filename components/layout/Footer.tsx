import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 pb-10 pt-16 text-white/70">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white">
                <Zap size={18} strokeWidth={2.5} />
              </span>
              <span className="text-lg font-semibold text-white">BlueV</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Soluções em eletromobilidade. Conectamos carregadores, motoristas, veículos elétricos e empresas em um
              único ecossistema de infraestrutura para o Brasil.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Navegação</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/termos" className="hover:text-white">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/privacidade#lgpd" className="hover:text-white">
                  LGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} BlueV. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
