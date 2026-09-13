export type ConnectorType = 'Tipo 2' | 'CCS2' | 'CHAdeMO' | 'Outros';
export type ChargerCurrent = 'AC' | 'DC';
export type ChargerSpeed = 'Padrao' | 'Rapido' | 'Ultrarrapido';
export type ChargerStatus = 'Disponivel' | 'Ocupado' | 'Manutencao' | 'Offline';
export type ChargerLocationType =
  | 'Shopping'
  | 'Posto'
  | 'Hotel'
  | 'Restaurante'
  | 'Supermercado'
  | 'Condominio'
  | 'Empresa'
  | 'Rodovia'
  | 'Publico';

export interface Charger {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  power: number;
  current: ChargerCurrent;
  speed: ChargerSpeed;
  connectors: ConnectorType[];
  points: number;
  status: ChargerStatus;
  operator: string;
  locationType: ChargerLocationType;
  price: string | null;
  hours: string;
  rating: number;
  image: string;
}

export type VehicleType = '100% eletrico' | 'Hibrido plug-in' | 'Hibrido';
export type VehicleStatus = 'Disponivel' | 'Reservado' | 'Vendido' | 'Pendente moderacao';

export interface VehicleImage {
  id: string;
  vehicleId: string;
  url: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  price: number;
  city: string;
  state: string;
  type: VehicleType;
  autonomyKm: number;
  batteryKwh: number;
  powerHp: number;
  chargeTimeHours: number;
  connector: ConnectorType;
  description: string;
  features: string[];
  images: VehicleImage[];
  sellerName: string;
  sellerType: 'Particular' | 'Concessionaria' | 'BlueV Certificado';
  featured: boolean;
  createdAt: string;
  status: VehicleStatus;
}

export type BlogCategory =
  | 'Carros eletricos'
  | 'Infraestrutura'
  | 'Carregadores'
  | 'Baterias'
  | 'Tecnologia'
  | 'Mercado'
  | 'Legislacao'
  | 'Sustentabilidade'
  | 'Energia'
  | 'Novidades';

export type BlogPostStatus = 'draft' | 'published' | 'scheduled';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  readMinutes: number;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  status?: BlogPostStatus;
}

export interface CompanyStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  segment: string;
}

export type InstallerAudience =
  | 'Pessoa fisica'
  | 'Empresa'
  | 'Condominio'
  | 'Hotel'
  | 'Posto'
  | 'Frota';

export type InstallLocation =
  | 'Casa'
  | 'Condominio'
  | 'Empresa'
  | 'Estacionamento'
  | 'Posto'
  | 'Outro';

export type DesiredPower = '7.4 kW' | '11 kW' | '22 kW' | '50 kW+' | 'Nao sei';

export interface InstallLeadInput {
  audience: InstallerAudience;
  location: InstallLocation;
  chargerCount: number;
  desiredPower: DesiredPower;
  city: string;
  state: string;
  name: string;
  whatsapp: string;
  email: string;
}

export interface ContactLeadInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface VehicleListingInput {
  name: string;
  whatsapp: string;
  email: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  price: number;
  city: string;
  state: string;
  autonomyKm: number;
  type: VehicleType;
  description: string;
}

export type LeadType = 'instalacao' | 'contato' | 'veiculo-interesse' | 'anuncio-veiculo';

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string;
  createdAt: string;
  payload: Record<string, unknown>;
}
