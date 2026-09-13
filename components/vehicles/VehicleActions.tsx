'use client';

import { useState } from 'react';
import { MessageCircle, Share2, User } from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { whatsappLink } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export function VehicleActions({ vehicle }: { vehicle: Vehicle }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({ title: `${vehicle.brand} ${vehicle.model}`, url });
        return;
      } catch {
        // user cancelled share sheet, fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  async function handleInterest() {
    trackEvent('vehicle_interest_click', { vehicleId: vehicle.id });
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'veiculo-interesse',
        data: {
          name: 'Lead do site',
          email: 'nao-informado@bluev.com.br',
          phone: 'nao-informado',
          vehicleId: vehicle.id,
          message: `Interesse em ${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
        },
      }),
    }).catch(() => undefined);
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        href={whatsappLink(
          `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year} (código ${vehicle.code}) anunciado na BlueV.`
        )}
        size="lg"
        onClick={handleInterest}
      >
        <MessageCircle size={18} /> Tenho interesse
      </Button>
      <Button
        href={whatsappLink(
          `Olá! Gostaria de falar com o vendedor do ${vehicle.brand} ${vehicle.model} (código ${vehicle.code}) anunciado na BlueV.`
        )}
        variant="secondary"
        size="lg"
      >
        <User size={18} /> Falar com vendedor
      </Button>
      <Button variant="ghost" size="md" onClick={handleShare}>
        <Share2 size={16} /> {copied ? 'Link copiado!' : 'Compartilhar anúncio'}
      </Button>
    </div>
  );
}
