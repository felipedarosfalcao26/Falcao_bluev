import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BatteryCharging, Clock, Gauge, MapPin, Plug, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { VehicleGallery } from '@/components/vehicles/VehicleGallery';
import { VehicleActions } from '@/components/vehicles/VehicleActions';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { formatCurrencyBRL, formatKm } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';
import { getVehicleBySlug, getRelatedVehicles } from '@/services/vehicles.service';

// Listings are created/edited after deploy (admin panel + public "anunciar veículo" form),
// so these pages must always be rendered per-request rather than statically prerendered.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) return {};

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${formatCurrencyBRL(vehicle.price)}`;
  const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year}, ${formatKm(vehicle.mileageKm)}, em ${vehicle.city} - ${vehicle.state}. ${vehicle.description}`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function VehicleDetailsPage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) notFound();

  const related = await getRelatedVehicles(vehicle);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${vehicle.brand} ${vehicle.model}`,
    vehicleModelDate: vehicle.year,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: vehicle.mileageKm, unitCode: 'KMT' },
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/veiculos/${vehicle.slug}`,
    },
  };

  const specs = [
    { icon: BatteryCharging, label: 'Autonomia', value: `${vehicle.autonomyKm} km` },
    { icon: Zap, label: 'Bateria', value: `${vehicle.batteryKwh} kWh` },
    { icon: Gauge, label: 'Potência', value: `${vehicle.powerHp} cv` },
    { icon: Clock, label: 'Tempo de recarga', value: vehicle.chargeTimeHours > 0 ? `${vehicle.chargeTimeHours}h` : '—' },
    { icon: Plug, label: 'Conector', value: vehicle.connector },
    { icon: MapPin, label: 'Localização', value: `${vehicle.city} - ${vehicle.state}` },
  ];

  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <VehicleGallery vehicle={vehicle} />

            <div className="mt-10">
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                {vehicle.brand} {vehicle.model} {vehicle.year}
              </h1>
              <p className="mt-1 text-sm text-white/50">
                {formatKm(vehicle.mileageKm)} · {vehicle.city} - {vehicle.state} · {vehicle.sellerType}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <spec.icon size={18} className="text-blue-400" />
                    <p className="mt-2 text-xs text-white/50">{spec.label}</p>
                    <p className="text-sm font-medium text-white">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white">Descrição</h2>
                <p className="mt-2 leading-relaxed text-white/70">{vehicle.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white">Equipamentos e características</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-3xl font-semibold text-white">{formatCurrencyBRL(vehicle.price)}</p>
              <p className="mt-1 text-sm text-white/50">Anunciado por {vehicle.sellerName}</p>
              <div className="mt-6">
                <VehicleActions vehicle={vehicle} />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-semibold text-white">Veículos relacionados</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((v, index) => (
                <VehicleCard key={v.id} vehicle={v} index={index} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
