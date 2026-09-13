'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { chargers } from '@/data/chargers';

export function MapPreviewSection() {
  const preview = chargers.slice(0, 6);

  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <SectionHeading eyebrow="Mapa de recarga" title="Nunca fique sem carga." light />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-900"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
          {preview.map((c, i) => (
            <motion.div
              key={c.id}
              className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/40"
              style={{
                left: `${15 + ((i * 37) % 70)}%`,
                top: `${18 + ((i * 53) % 60)}%`,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            >
              <MapPin size={16} />
            </motion.div>
          ))}
        </motion.div>

        <div className="lg:col-span-2">
          <p className="max-w-xl text-white/60">
            Encontre carregadores próximos, veja potência, conectores e disponibilidade em tempo real, e trace a rota
            direto para o Google Maps ou Waze.
          </p>
          <Button href="/mapa-de-recarga" size="lg" className="mt-8">
            Explorar mapa de carregadores <ArrowRight size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
