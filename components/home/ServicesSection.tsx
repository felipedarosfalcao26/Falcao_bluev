'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Building, Building2, Car, Fuel, Home as HomeIcon, Warehouse } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const services = [
  {
    icon: HomeIcon,
    title: 'Residencial',
    description: 'Instalação de carregadores em casas e condomínios, com projeto elétrico sob medida.',
  },
  {
    icon: Building,
    title: 'Comercial',
    description: 'Soluções para empresas, estacionamentos, hotéis e estabelecimentos comerciais.',
  },
  {
    icon: Warehouse,
    title: 'Corporativo',
    description: 'Infraestrutura de recarga para frotas elétricas corporativas de qualquer porte.',
  },
  {
    icon: Fuel,
    title: 'Postos de recarga',
    description: 'Projetos de infraestrutura para redes públicas e privadas de recarga rápida.',
  },
  {
    icon: Building2,
    title: 'Condomínios',
    description: 'Projeto, instalação e gestão completa da infraestrutura de recarga compartilhada.',
  },
  {
    icon: Car,
    title: 'Empresas e frotas',
    description: 'Soluções completas para eletrificação de frotas, do planejamento à operação.',
  },
];

export function ServicesSection() {
  return (
    <section className="bg-ink-900/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Soluções"
          title="Soluções para todos os tipos de recarga"
          description="Da vaga da garagem à rede pública: a BlueV projeta e opera a infraestrutura completa de recarga elétrica."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <service.icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{service.description}</p>
              <Link
                href="/carregadores#instalar"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300"
              >
                Solicitar orçamento <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
