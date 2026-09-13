# BlueV — Plataforma de Eletromobilidade

Site institucional e comercial da BlueV: instalação de carregadores, mapa de recarga interativo,
marketplace de veículos elétricos, blog (BlueV Insights) e geração de leads comerciais.

Stack: **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · React Hook Form + Zod ·
Mapbox GL (react-map-gl)**.

## 1. Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18.18+ instalado (este projeto foi desenvolvido sem acesso a
Node/npm no ambiente de geração de código — instale-o antes do primeiro `npm install`).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## 2. Estrutura do projeto

```
app/                 Rotas (App Router): páginas, layouts, API routes, sitemap, robots
components/
  ui/                 Primitivos de interface (Button, Container, Badge, ...)
  layout/             Header, Footer, WhatsApp flutuante, cookie consent, analytics
  home/               Seções da Home
  map/                 Mapa de carregadores, filtros, painel de detalhes
  vehicles/            Marketplace: cards, filtros, galeria, ações
  blog/                Blog: cards, explorador, compartilhamento
  forms/               Formulários (instalação, anúncio de veículo, contato)
lib/                  Tipos, constantes, utilitários, validação (zod), analytics
data/                 Dados mockados (carregadores, veículos, blog, estatísticas)
services/             Camada de acesso a dados — hoje lê de `data/`, pronta para
                      ser substituída por chamadas a banco de dados/API
hooks/                Hooks reutilizáveis (geolocalização, debounce)
```

A camada `services/` é o único lugar que deveria mudar ao conectar um banco de dados real: todas
as páginas já chamam funções como `listVehicles()`, `listChargers()`, `getBlogPostBySlug()` etc.,
nunca os arrays de `data/` diretamente.

## 3. Configurando o mapa (Mapbox)

1. Crie uma conta gratuita em https://account.mapbox.com/
2. Gere um "Default public token"
3. Cole em `.env.local`:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxxxxxx
```

Sem o token, a página `/mapa-de-recarga` funciona normalmente em modo lista (o painel de mapa mostra um
aviso e a busca/filtros continuam ativos).

## 4. Configurando o WhatsApp

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

Apenas dígitos, com código do país. Usado no botão flutuante, nos CTAs de veículos e no fluxo de
instalação — não é necessário alterar nenhum componente para trocar o número.

## 5. Configurando Analytics

```
NEXT_PUBLIC_GA_ID=G-XXXXXXX        # Google Analytics 4
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX     # Google Tag Manager
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXX  # Meta Pixel
```

Os scripts só são injetados quando a variável correspondente existe (ver
`components/layout/AnalyticsScripts.tsx`). Eventos customizados já disparados pelo código:
`whatsapp_click`, `quote_request`, `charger_search`, `charger_view`, `vehicle_view`,
`vehicle_interest_click`, `vehicle_listing_created`, `lead_created` (ver `lib/analytics.ts`).

## 6. Banco de dados (próximo passo)

O projeto está estruturado para receber um banco de dados relacional sem refatoração de páginas:

1. Escolha um provedor (sugestão: **Postgres via Supabase**, ou Prisma + qualquer Postgres gerenciado).
2. Modele as tabelas a partir das interfaces em `lib/types.ts` (`Charger`, `Vehicle`, `VehicleImage`,
   `BlogPost`, `Lead`, etc.).
3. Defina `DATABASE_URL` em `.env.local`.
4. Substitua o corpo das funções em `services/*.service.ts` por consultas reais (Prisma Client,
   Supabase client, etc.), mantendo as mesmas assinaturas.

## 7. CMS do blog (opcional)

`services/blog.service.ts` está isolado para permitir a troca dos dados mockados por um CMS headless
(Sanity, Strapi ou WordPress headless). Defina `CMS_API_URL` / `CMS_API_TOKEN` em `.env.local` e
implemente as chamadas dentro desse arquivo.

## 8. Leads (formulários)

Todos os formulários (instalação, anúncio de veículo, contato, "tenho interesse") enviam para
`POST /api/leads`, que valida com Zod e persiste via `services/leads.service.ts`. Defina
`LEADS_WEBHOOK_URL` para encaminhar automaticamente cada lead a um CRM, Zapier, Make ou endpoint de
e-mail/WhatsApp — sem essa variável, os leads apenas são logados no console do servidor.

## 9. Deploy

Otimizado para [Vercel](https://vercel.com/):

1. Importe o repositório na Vercel.
2. Configure as mesmas variáveis de `.env.example` em Project Settings → Environment Variables.
3. Deploy automático a cada push.

O projeto não usa nenhuma API exclusiva da Vercel, então também roda em qualquer host que suporte
Next.js (Node 18+): Netlify, Railway, Render, AWS Amplify, ou um servidor Node próprio (`npm run build && npm start`).

## 10. Dados mockados

Todos os dados de demonstração (15 carregadores, 20 veículos, 10 artigos, 10 clientes, estatísticas)
ficam centralizados em `data/`. Substitua por dados reais alterando apenas esses arquivos (ou, uma vez
conectado o banco, apagando-os e apontando `services/` para as consultas reais).

## 11. Status do projeto / limitações conhecidas

- **Sem imagens reais**: os cards de veículos, carregadores e blog usam `MediaPlaceholder`
  (gradiente + ícone) no lugar de fotos, para não depender de bancos de imagem de terceiros. Basta
  trocar por `next/image` apontando para URLs reais quando houver fotos.
- **Painel administrativo**: `/admin` é um placeholder de arquitetura (mostra os dados existentes),
  não um CRUD autenticado — depende de autenticação + banco real (ver seção 6).
- **Upload de fotos no anúncio de veículo**: ainda não implementado; o formulário orienta o usuário a
  enviar fotos pelo WhatsApp após o envio.
