'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'bluev-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(value: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-white/10 bg-ink-900/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-white/80">
            Usamos cookies para melhorar sua experiência e analisar o uso da plataforma, conforme nossa{' '}
            <Link href="/privacidade" className="underline hover:text-white">
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <Button variant="secondary" size="md" onClick={() => decide('declined')}>
              Recusar
            </Button>
            <Button size="md" onClick={() => decide('accepted')}>
              Aceitar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
