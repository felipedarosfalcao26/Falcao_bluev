import { ClientLogo, CompanyStat } from '@/lib/types';

export const companyStats: CompanyStat[] = [
  { label: 'Carregadores instalados', value: 480, suffix: '+' },
  { label: 'Estados atendidos', value: 14 },
  { label: 'Empresas atendidas', value: 65, suffix: '+' },
  { label: 'Anos de experiência', value: 9 },
];

export const clientLogos: ClientLogo[] = [
  { id: 'cl-01', name: 'Grupo Faria Lima Towers', segment: 'Corporativo' },
  { id: 'cl-02', name: 'Rede Iguatemi', segment: 'Shopping' },
  { id: 'cl-03', name: 'Fasano Hotéis', segment: 'Hotelaria' },
  { id: 'cl-04', name: 'Raízen Mobility', segment: 'Postos' },
  { id: 'cl-05', name: 'Condomínio Jardins Blue', segment: 'Residencial' },
  { id: 'cl-06', name: 'Correios Log Frotas', segment: 'Frotas' },
  { id: 'cl-07', name: 'Pão de Açúcar', segment: 'Varejo' },
  { id: 'cl-08', name: 'Prefeitura de São Paulo', segment: 'Público' },
  { id: 'cl-09', name: 'Vista Verde Restaurantes', segment: 'Alimentação' },
  { id: 'cl-10', name: 'BH Diamond Mall', segment: 'Shopping' },
];
