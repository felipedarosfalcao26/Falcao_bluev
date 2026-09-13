import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLead } from '@/services/leads.service';
import { installLeadSchema, contactLeadSchema, vehicleListingSchema } from '@/lib/validations';

const requestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('instalacao'), data: installLeadSchema }),
  z.object({ type: z.literal('contato'), data: contactLeadSchema }),
  z.object({ type: z.literal('anuncio-veiculo'), data: vehicleListingSchema }),
  z.object({
    type: z.literal('veiculo-interesse'),
    data: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(8),
      vehicleId: z.string(),
      message: z.string().optional(),
    }),
  }),
]);

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.flatten() }, { status: 400 });
  }

  const { type, data } = parsed.data;
  const name = 'name' in data ? data.name : '';
  const email = 'email' in data ? data.email : '';
  const phone = 'whatsapp' in data ? data.whatsapp : 'phone' in data ? data.phone : '';

  const lead = await createLead({
    type,
    name,
    email,
    phone,
    message: 'message' in data ? data.message : undefined,
    source: `/api/leads (${type})`,
    payload: data,
  });

  return NextResponse.json({ ok: true, leadId: lead.id });
}
