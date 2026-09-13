import { Vehicle } from '@/lib/types';
import { slugify } from '@/lib/utils';

interface RawVehicle {
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  price: number;
  city: string;
  state: string;
  type: Vehicle['type'];
  autonomyKm: number;
  batteryKwh: number;
  powerHp: number;
  chargeTimeHours: number;
  connector: Vehicle['connector'];
  description: string;
  features: string[];
  sellerName: string;
  sellerType: Vehicle['sellerType'];
  featured: boolean;
  daysAgo: number;
}

const raw: RawVehicle[] = [
  { brand: 'BYD', model: 'Dolphin', year: 2025, mileageKm: 8000, price: 149900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 340, batteryKwh: 44.9, powerHp: 95, chargeTimeHours: 6.5, connector: 'Tipo 2', description: 'Hatch elétrico compacto, ideal para uso urbano, com ótimo custo-benefício e baixo consumo.', features: ['Piloto automático adaptativo', 'Central multimídia 12,8"', 'Câmera 360°', 'Bancos em couro sintético'], sellerName: 'BlueV Seminovos', sellerType: 'BlueV Certificado', featured: true, daysAgo: 2 },
  { brand: 'BYD', model: 'Song Plus', year: 2024, mileageKm: 15000, price: 219900, city: 'São Paulo', state: 'SP', type: 'Hibrido plug-in', autonomyKm: 520, batteryKwh: 18.3, powerHp: 245, chargeTimeHours: 3, connector: 'Tipo 2', description: 'SUV híbrido plug-in espaçoso, com autonomia elétrica estendida e conforto premium.', features: ['Teto solar panorâmico', 'Tração nas 4 rodas', 'Assistente de permanência em faixa'], sellerName: 'Concessionária Blue Motors', sellerType: 'Concessionaria', featured: true, daysAgo: 5 },
  { brand: 'Tesla', model: 'Model 3', year: 2023, mileageKm: 32000, price: 259900, city: 'Rio de Janeiro', state: 'RJ', type: '100% eletrico', autonomyKm: 491, batteryKwh: 60, powerHp: 283, chargeTimeHours: 8, connector: 'CCS2', description: 'Sedã premium com Autopilot, acabamento minimalista e desempenho esportivo.', features: ['Autopilot', 'Tela central 15"', 'Atualizações over-the-air', 'Som premium 14 alto-falantes'], sellerName: 'Carlos Medeiros', sellerType: 'Particular', featured: true, daysAgo: 10 },
  { brand: 'Tesla', model: 'Model Y', year: 2024, mileageKm: 18000, price: 329900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 533, batteryKwh: 75, powerHp: 331, chargeTimeHours: 9, connector: 'CCS2', description: 'SUV elétrico de alta performance, porta-malas amplo e tecnologia de ponta.', features: ['Tração integral', 'Piloto automático completo (opcional)', 'Porta-malas frontal e traseiro'], sellerName: 'BlueV Seminovos', sellerType: 'BlueV Certificado', featured: true, daysAgo: 1 },
  { brand: 'GWM', model: 'Ora 03', year: 2024, mileageKm: 6000, price: 179900, city: 'Curitiba', state: 'PR', type: '100% eletrico', autonomyKm: 400, batteryKwh: 45, powerHp: 143, chargeTimeHours: 7, connector: 'Tipo 2', description: 'Design retrô-futurista, ótimo acabamento interno e ótima autonomia para o segmento.', features: ['Bancos aquecidos', 'HUD (head-up display)', 'Carregamento sem fio para celular'], sellerName: 'Concessionária GWM Sul', sellerType: 'Concessionaria', featured: false, daysAgo: 3 },
  { brand: 'Volvo', model: 'EX30', year: 2025, mileageKm: 3000, price: 259900, city: 'Belo Horizonte', state: 'MG', type: '100% eletrico', autonomyKm: 344, batteryKwh: 51, powerHp: 272, chargeTimeHours: 5.5, connector: 'CCS2', description: 'SUV compacto premium com design escandinavo e segurança de referência.', features: ['Sistema de som Harman Kardon', 'Assistente de estacionamento', 'Interior 100% vegano'], sellerName: 'BlueV Seminovos', sellerType: 'BlueV Certificado', featured: true, daysAgo: 0 },
  { brand: 'BMW', model: 'iX1', year: 2024, mileageKm: 12000, price: 389900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 438, batteryKwh: 64.7, powerHp: 313, chargeTimeHours: 7, connector: 'CCS2', description: 'SUV compacto de luxo, com tração integral xDrive e acabamento refinado.', features: ['Painel curvo BMW Live Cockpit', 'Tração xDrive', 'Assistente de condução Plus'], sellerName: 'BMW Premium Select', sellerType: 'Concessionaria', featured: false, daysAgo: 7 },
  { brand: 'Mercedes-Benz', model: 'EQA', year: 2023, mileageKm: 25000, price: 329900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 420, batteryKwh: 66.5, powerHp: 190, chargeTimeHours: 8, connector: 'CCS2', description: 'SUV compacto elétrico com o luxo característico da Mercedes-Benz.', features: ['MBUX com tela dupla', 'Assistente de condução', 'Bancos com ajuste elétrico'], sellerName: 'Mercedes Estrela Sul', sellerType: 'Concessionaria', featured: false, daysAgo: 12 },
  { brand: 'JAC', model: 'e-JS1', year: 2023, mileageKm: 20000, price: 99900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 300, batteryKwh: 33.5, powerHp: 61, chargeTimeHours: 8, connector: 'Tipo 2', description: 'Compacto elétrico de entrada, ótimo primeiro carro elétrico e para uso urbano.', features: ['Central multimídia com Android Auto', 'Sensor de estacionamento', 'Ar condicionado digital'], sellerName: 'João Ferreira', sellerType: 'Particular', featured: false, daysAgo: 8 },
  { brand: 'Porsche', model: 'Taycan', year: 2022, mileageKm: 28000, price: 899900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 431, batteryKwh: 93.4, powerHp: 476, chargeTimeHours: 9, connector: 'CCS2', description: 'Esportivo elétrico de alta performance, aceleração impressionante e dirigibilidade Porsche.', features: ['Suspensão pneumática adaptativa', 'Modo Launch Control', 'Freios cerâmicos'], sellerName: 'Porsche Approved SP', sellerType: 'Concessionaria', featured: true, daysAgo: 4 },
  { brand: 'Audi', model: 'Q4 e-tron', year: 2024, mileageKm: 9000, price: 419900, city: 'Rio de Janeiro', state: 'RJ', type: '100% eletrico', autonomyKm: 484, batteryKwh: 82, powerHp: 286, chargeTimeHours: 8.5, connector: 'CCS2', description: 'SUV elétrico premium com tecnologia Audi virtual cockpit e ótimo espaço interno.', features: ['Audi virtual cockpit plus', 'Bang & Olufsen sound', 'Tração quattro'], sellerName: 'Audi Center Barra', sellerType: 'Concessionaria', featured: false, daysAgo: 6 },
  { brand: 'Kia', model: 'EV6', year: 2023, mileageKm: 22000, price: 349900, city: 'Curitiba', state: 'PR', type: '100% eletrico', autonomyKm: 528, batteryKwh: 77.4, powerHp: 229, chargeTimeHours: 7, connector: 'CCS2', description: 'Elétrico de design arrojado, com carregamento ultrarrápido de até 350 kW.', features: ['Carregamento 800V ultrarrápido', 'Head-up display aumentado', 'Bancos relax'], sellerName: 'Kia Motors Sul', sellerType: 'Concessionaria', featured: true, daysAgo: 9 },
  { brand: 'BYD', model: 'Yuan Plus', year: 2024, mileageKm: 11000, price: 189900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 430, batteryKwh: 60.5, powerHp: 204, chargeTimeHours: 8, connector: 'Tipo 2', description: 'SUV compacto elétrico com ótimo custo-benefício e tecnologia de bordo completa.', features: ['Central giratória 12,8"', 'Assistente de frenagem autônoma', 'Carregador sem fio'], sellerName: 'BlueV Seminovos', sellerType: 'BlueV Certificado', featured: false, daysAgo: 1 },
  { brand: 'Volvo', model: 'XC40 Recharge', year: 2022, mileageKm: 35000, price: 289900, city: 'Porto Alegre', state: 'RS', type: '100% eletrico', autonomyKm: 418, batteryKwh: 78, powerHp: 408, chargeTimeHours: 8, connector: 'CCS2', description: 'SUV elétrico robusto e seguro, com desempenho de tração integral.', features: ['Tração integral dupla motorização', 'Google integrado nativo', 'Pilot Assist'], sellerName: 'Volvo Select RS', sellerType: 'Concessionaria', featured: false, daysAgo: 15 },
  { brand: 'GWM', model: 'Haval H6 HEV', year: 2024, mileageKm: 14000, price: 219900, city: 'São Paulo', state: 'SP', type: 'Hibrido', autonomyKm: 900, batteryKwh: 1.7, powerHp: 244, chargeTimeHours: 0, connector: 'Outros', description: 'SUV híbrido com excelente economia de combustível e espaço para a família.', features: ['Sistema híbrido inteligente', 'Bancos em couro Nappa', 'Teto solar panorâmico'], sellerName: 'GWM Center SP', sellerType: 'Concessionaria', featured: false, daysAgo: 3 },
  { brand: 'BMW', model: 'i4', year: 2023, mileageKm: 19000, price: 449900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 481, batteryKwh: 83.9, powerHp: 340, chargeTimeHours: 8.5, connector: 'CCS2', description: 'Gran coupé elétrico esportivo com excelente equilíbrio entre luxo e performance.', features: ['Modo M Sport', 'Curved Display', 'Harman Kardon Surround'], sellerName: 'BMW Premium Select', sellerType: 'Concessionaria', featured: false, daysAgo: 11 },
  { brand: 'Mercedes-Benz', model: 'EQS', year: 2022, mileageKm: 40000, price: 799900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 685, batteryKwh: 107.8, powerHp: 333, chargeTimeHours: 10, connector: 'CCS2', description: 'Sedã de luxo com a maior autonomia da categoria e conforto de referência mundial.', features: ['MBUX Hyperscreen', 'Suspensão a ar adaptativa', 'Bancos com massagem'], sellerName: 'Mercedes Estrela Sul', sellerType: 'Concessionaria', featured: true, daysAgo: 20 },
  { brand: 'Kia', model: 'Niro EV', year: 2023, mileageKm: 24000, price: 249900, city: 'Belo Horizonte', state: 'MG', type: '100% eletrico', autonomyKm: 460, batteryKwh: 64.8, powerHp: 204, chargeTimeHours: 7.5, connector: 'CCS2', description: 'Crossover elétrico versátil e eficiente, com bom espaço interno.', features: ['Assistente de ponto cego', 'Central 10,25"', 'Piloto automático adaptativo'], sellerName: 'Kia Motors MG', sellerType: 'Concessionaria', featured: false, daysAgo: 6 },
  { brand: 'JAC', model: 'e-JS4', year: 2024, mileageKm: 7000, price: 149900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 400, batteryKwh: 50, powerHp: 156, chargeTimeHours: 7, connector: 'Tipo 2', description: 'SUV elétrico com boa autonomia e preço competitivo para uso familiar.', features: ['Central multimídia 14,6"', 'Assistente de partida em rampa', 'Sensores dianteiros e traseiros'], sellerName: 'JAC Motors Zona Sul', sellerType: 'Concessionaria', featured: false, daysAgo: 2 },
  { brand: 'Outras', model: 'Chery iCar', year: 2025, mileageKm: 1500, price: 139900, city: 'São Paulo', state: 'SP', type: '100% eletrico', autonomyKm: 350, batteryKwh: 41.9, powerHp: 156, chargeTimeHours: 6, connector: 'Tipo 2', description: 'Elétrico compacto com design jovem, ótimo para primeira compra de EV.', features: ['Painel digital 10,2"', 'Central multimídia com IA', 'Modo pet'], sellerName: 'Chery Motors SP', sellerType: 'Concessionaria', featured: false, daysAgo: 0 },
];

export const vehicles: Vehicle[] = raw.map((v, index) => {
  const id = `veh-${String(index + 1).padStart(3, '0')}`;
  const createdAt = new Date(Date.now() - v.daysAgo * 24 * 60 * 60 * 1000).toISOString();
  return {
    id,
    slug: `${slugify(`${v.brand}-${v.model}`)}-${v.year}-${id}`,
    brand: v.brand,
    model: v.model,
    year: v.year,
    mileageKm: v.mileageKm,
    price: v.price,
    city: v.city,
    state: v.state,
    type: v.type,
    autonomyKm: v.autonomyKm,
    batteryKwh: v.batteryKwh,
    powerHp: v.powerHp,
    chargeTimeHours: v.chargeTimeHours,
    connector: v.connector,
    description: v.description,
    features: v.features,
    images: [
      { id: `${id}-img-1`, vehicleId: id, url: 'placeholder-1' },
      { id: `${id}-img-2`, vehicleId: id, url: 'placeholder-2' },
      { id: `${id}-img-3`, vehicleId: id, url: 'placeholder-3' },
    ],
    sellerName: v.sellerName,
    sellerType: v.sellerType,
    featured: v.featured,
    createdAt,
    status: 'Disponivel',
  };
});
