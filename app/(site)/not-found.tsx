import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 pt-20">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Erro 404</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Página não encontrada</h1>
        <p className="max-w-md text-white/60">
          O conteúdo que você procura pode ter sido movido ou não existe mais.
        </p>
        <Button href="/" size="lg" className="mt-4">
          Voltar para a Home
        </Button>
      </Container>
    </div>
  );
}
