import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { vehicleListingSchema } from '@/lib/validations';
import { createVehicle } from '@/services/vehicles.service';
import { createLead } from '@/services/leads.service';

const requestSchema = z.object({
  data: vehicleListingSchema,
  images: z.array(z.string().url()).max(12).default([]),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.flatten() }, { status: 400 });
  }

  const { data, images } = parsed.data;

  const vehicle = await createVehicle(
    {
      brand: data.brand,
      model: data.model,
      year: data.year,
      mileageKm: data.mileageKm,
      price: data.price,
      city: data.city,
      state: data.state,
      type: data.type,
      autonomyKm: data.autonomyKm,
      batteryKwh: 0,
      powerHp: 0,
      chargeTimeHours: 0,
      connector: 'Tipo 2',
      description: data.description,
      features: [],
      sellerName: data.name,
      sellerType: 'Particular',
      featured: false,
      status: 'Pendente moderacao',
    },
    images
  );

  await createLead({
    type: 'anuncio-veiculo',
    name: data.name,
    email: data.email,
    phone: data.whatsapp,
    message: `Anúncio enviado: ${data.brand} ${data.model} ${data.year} - vehicle_id ${vehicle.id}`,
    source: '/api/vehicle-listings',
    payload: { ...data, vehicleId: vehicle.id },
  });

  return NextResponse.json({ ok: true, vehicleId: vehicle.id });
}
