import { z } from 'zod';

export const installLeadSchema = z.object({
  audience: z.enum(['Pessoa fisica', 'Empresa', 'Condominio', 'Hotel', 'Posto', 'Frota']),
  location: z.enum(['Casa', 'Condominio', 'Empresa', 'Estacionamento', 'Posto', 'Outro']),
  chargerCount: z.coerce.number().min(1, 'Informe ao menos 1 carregador'),
  desiredPower: z.enum(['7.4 kW', '11 kW', '22 kW', '50 kW+', 'Nao sei']),
  city: z.string().min(2, 'Informe a cidade'),
  state: z.string().min(2, 'Informe o estado'),
  name: z.string().min(3, 'Informe seu nome completo'),
  whatsapp: z.string().min(10, 'Informe um WhatsApp válido'),
  email: z.string().email('E-mail inválido'),
});
export type InstallLeadForm = z.infer<typeof installLeadSchema>;

export const contactLeadSchema = z.object({
  name: z.string().min(3, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Informe um telefone válido'),
  message: z.string().min(10, 'Conte um pouco mais (mínimo 10 caracteres)'),
});
export type ContactLeadForm = z.infer<typeof contactLeadSchema>;

export const vehicleListingSchema = z.object({
  name: z.string().min(3, 'Informe seu nome'),
  whatsapp: z.string().min(10, 'Informe um WhatsApp válido'),
  email: z.string().email('E-mail inválido'),
  brand: z.string().min(2, 'Informe a marca'),
  model: z.string().min(1, 'Informe o modelo'),
  year: z.coerce.number().min(2010).max(new Date().getFullYear() + 1),
  mileageKm: z.coerce.number().min(0),
  price: z.coerce.number().min(1000, 'Informe um preço válido'),
  city: z.string().min(2, 'Informe a cidade'),
  state: z.string().min(2, 'Informe o estado'),
  autonomyKm: z.coerce.number().min(0),
  type: z.enum(['100% eletrico', 'Hibrido plug-in', 'Hibrido']),
  description: z.string().min(20, 'Descreva o veículo com mais detalhes'),
});
export type VehicleListingForm = z.infer<typeof vehicleListingSchema>;
