import { cn } from '@/lib/utils';
import {
  BatteryCharging,
  Building2,
  Car,
  Fuel,
  Hotel,
  LucideIcon,
  MapPin,
  Newspaper,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  shopping: ShoppingBag,
  posto: Fuel,
  condominio: Building2,
  hotel: Hotel,
  rodovia: MapPin,
  supermercado: ShoppingBag,
  empresa: Building2,
  publico: MapPin,
  restaurante: UtensilsCrossed,
  residencial: Zap,
  infraestrutura: Building2,
  tecnologia: Sparkles,
  baterias: BatteryCharging,
  mercado: Newspaper,
  legislacao: Newspaper,
  sustentabilidade: Sparkles,
  energia: Zap,
  'guia-compra': Car,
  novidades: Sparkles,
  vehicle: Car,
  charger: BatteryCharging,
};

const GRADIENTS = [
  'from-blue-700 via-blue-900 to-ink-950',
  'from-ink-900 via-blue-900 to-blue-700',
  'from-blue-800 via-ink-900 to-ink-950',
  'from-blue-900 via-ink-950 to-blue-800',
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 997;
  }
  return hash;
}

export function MediaPlaceholder({
  seed,
  kind = 'vehicle',
  className,
  iconClassName,
}: {
  seed: string;
  kind?: string;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = ICONS[kind] ?? Car;
  const gradient = GRADIENTS[hashString(seed) % GRADIENTS.length];

  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden bg-gradient-to-br', gradient, className)}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 35%)',
        }}
      />
      <Icon className={cn('relative text-white/70', iconClassName)} strokeWidth={1.2} />
    </div>
  );
}
