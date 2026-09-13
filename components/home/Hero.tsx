'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink-950 pt-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(11,127,255,0.35),_transparent_60%)]" />
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] animate-float" />
        <div
          className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-volt-500/10 blur-[140px] animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <Container className="relative z-10 grid items-center gap-16 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>
              <Zap size={13} className="text-blue-400" /> Ecossistema de eletromobilidade
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]"
          >
            O futuro da mobilidade começa onde você recarrega.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            Soluções completas em infraestrutura para veículos elétricos, conectando pessoas, empresas e mobilidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/carregadores#instalar" size="lg">
              Instalar um carregador <ArrowRight size={18} />
            </Button>
            <Button href="/mapa-de-recarga" variant="secondary" size="lg">
              <MapPin size={18} /> Encontrar um carregador
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-20px_rgba(11,127,255,0.45)]">
            <Image
              src="/images/hero-charging.jpg"
              alt="Carro elétrico recarregando à noite"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-ink-950/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
