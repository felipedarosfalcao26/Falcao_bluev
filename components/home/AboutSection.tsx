import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { companyStats } from '@/data/stats';

export function AboutSection() {
  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="A BlueV"
            title="Construindo a infraestrutura que move o Brasil elétrico."
            description="Somos uma plataforma de infraestrutura e mobilidade elétrica: projetamos, instalamos e operamos carregadores para residências, empresas, condomínios e redes públicas — e conectamos tudo isso a motoristas em busca do próximo ponto de recarga."
            light
          />
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {companyStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-4xl font-semibold text-white sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
