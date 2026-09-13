'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function InstallCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-ink-950 py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-3xl font-semibold text-white sm:text-4xl md:text-5xl"
        >
          Pronto para eletrificar seu espaço?
        </motion.h2>
        <p className="max-w-xl text-white/80">
          Fale com um especialista BlueV e receba um orçamento sob medida para o seu perfil: residencial, empresa,
          condomínio, hotel, posto ou frota.
        </p>
        <Button href="/carregadores#instalar" variant="secondary" size="lg" className="bg-white text-blue-700 hover:bg-white/90">
          Quero instalar um carregador <ArrowRight size={18} />
        </Button>
      </Container>
    </section>
  );
}
