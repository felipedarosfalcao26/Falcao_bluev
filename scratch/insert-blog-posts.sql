-- BlueV Insights — 5 novos artigos com conteúdo original e capas ilustradas.
-- Rode este arquivo no Supabase Dashboard -> SQL Editor -> New query -> Run.

insert into public.blog_posts
  (slug, title, excerpt, content, image, category, author, status, published_at, read_minutes, seo_title, seo_description, tags)
values
(
  'quanto-custa-carregar-carro-eletrico-em-casa-guia-completo',
  'Quanto custa carregar um carro elétrico em casa? O guia completo',
  'Fizemos as contas: veja quanto você realmente gasta para carregar um elétrico em casa e como isso se compara a abastecer na bomba.',
  ARRAY[
    'Antes de trocar o carro a combustão por um elétrico, quase todo mundo faz a mesma pergunta: quanto vai custar carregar isso em casa, todo santo dia? A resposta é mais simples do que parece, e o resultado costuma ser uma boa surpresa para quem está acostumado com o preço da gasolina.',
    'A conta básica é: capacidade da bateria (em kWh) multiplicada pela tarifa de energia da sua distribuidora (em R$/kWh). Um BYD Dolphin, por exemplo, tem bateria de cerca de 44,9 kWh. Com uma tarifa residencial média de R$ 0,75/kWh, uma recarga completa do zero a 100% custaria em torno de R$ 33 — para cerca de 340 km de autonomia. Isso dá menos de R$ 0,10 por quilômetro rodado.',
    'Compare com um carro flex popular, que consome em média 1 litro a cada 10-12 km na cidade: com a gasolina na faixa de R$ 6, o custo por quilômetro fica entre R$ 0,50 e R$ 0,60 — cinco a seis vezes mais caro que o elétrico equivalente.',
    'Vale lembrar que o preço da energia elétrica varia pela bandeira tarifária (verde, amarela ou vermelha) e, em alguns estados, existe a chamada tarifa branca, que fica mais barata em horários de baixa demanda (geralmente à noite). Programar a recarga para começar depois da meia-noite pode reduzir ainda mais o custo mensal.',
    'Outro fator que muda a conta é a eficiência do carregador. Carregadores residenciais de 7,4 kW ou 11 kW têm perdas de energia muito baixas (geralmente abaixo de 10%), enquanto uma tomada comum de 110V ou 220V sem um carregador dedicado carrega mais devagar e pode ser menos eficiente — outro motivo para investir em uma instalação correta em vez de improvisar.',
    'Quem tem painéis solares em casa consegue zerar praticamente esse custo: a energia gerada durante o dia pode ser usada para carregar o carro à noite, dependendo do sistema de compensação da distribuidora local. É uma combinação que está se tornando cada vez mais comum entre proprietários de elétricos no Brasil.',
    'No fim das contas, mesmo sem otimizações, carregar em casa costuma custar entre 4 e 6 vezes menos por quilômetro do que abastecer um carro a combustão. Se você está pensando em instalar um carregador residencial e quer entender qual potência faz sentido para o seu caso, a equipe da BlueV pode te ajudar a fazer essa conta com precisão.'
  ],
  'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/cover-1-custo-recarga.svg',
  'Carregadores',
  'Equipe BlueV',
  'published',
  now() - interval '2 days',
  7,
  'Quanto custa carregar um carro elétrico em casa? | BlueV',
  'Fizemos as contas: veja o custo real de carregar um carro elétrico em casa e como ele se compara à gasolina.',
  ARRAY['custo de recarga', 'carregador residencial', 'economia', 'tarifa de energia']
),
(
  'bateria-do-eletrico-degrada-rapido-mito-ou-verdade',
  'Bateria do carro elétrico degrada rápido? Separamos mito de verdade',
  'É a dúvida número um de quem pensa em comprar um elétrico usado ou zero km. Veja o que a ciência e os dados de uso real mostram.',
  ARRAY[
    'Poucas perguntas geram tanta insegurança em quem está considerando comprar um carro elétrico quanto esta: "e se a bateria degradar rápido e eu tiver que trocar ela em poucos anos, gastando uma fortuna?". É uma preocupação legítima, mas os dados reais de uso ao redor do mundo contam uma história bem mais tranquilizadora.',
    'Estudos com frotas de táxis, veículos de aplicativo e amostras de milhares de carros elétricos em uso mostram que, na maioria dos casos, as baterias mantêm entre 70% e 90% da capacidade original mesmo depois de 8 a 10 anos de uso ou 200 mil km rodados. Isso é resultado direto da evolução da química das células e, principalmente, do trabalho do sistema de gerenciamento de bateria (BMS, na sigla em inglês).',
    'O BMS é um componente eletrônico que monitora temperatura, tensão e estado de carga de cada célula da bateria em tempo real, evitando situações que aceleram o desgaste, como sobrecarga, superaquecimento e descarga excessiva. É graças a ele que a degradação acontece de forma muito mais lenta do que em uma bateria de celular comum, por exemplo.',
    'Isso não quer dizer que nada afeta a vida útil. Os três fatores que mais aceleram a degradação real são: exposição constante a calor extremo, uso frequente e exclusivo de carregamento ultrarrápido DC, e manter a bateria sempre em 100% de carga por longos períodos parada. Nenhum desses hábitos é obrigatório no dia a dia — são situações fáceis de evitar.',
    'A boa prática recomendada pelos fabricantes é simples: para o uso diário, mantenha a carga entre 20% e 80% sempre que possível, reservando os 100% apenas para viagens longas. Isso reduz o estresse químico nas células e prolonga a vida útil da bateria significativamente.',
    'Outro ponto que traz segurança é a garantia: praticamente todos os fabricantes oferecem entre 8 anos e 160.000 km de garantia específica para a bateria, com cláusula de reposição caso a capacidade caia abaixo de um limite (geralmente 70%). Ou seja, o próprio mercado já assume esse risco por você durante o período mais crítico de uso.',
    'Resumindo: degradação existe, mas na prática é lenta, previsível e coberta por garantia na maior parte da vida útil relevante do carro. O mito de "bateria que vira sucata em poucos anos" não se sustenta nos dados reais de uso — inclusive em climas quentes como o brasileiro.'
  ],
  'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/cover-2-bateria.svg',
  'Baterias',
  'Equipe BlueV',
  'published',
  now() - interval '5 days',
  8,
  'Bateria do carro elétrico degrada rápido? Mito ou verdade | BlueV',
  'Entenda com dados reais se a bateria dos carros elétricos realmente degrada rápido, e como prolongar a vida útil dela.',
  ARRAY['degradação de bateria', 'garantia', 'autonomia', 'vida útil', 'BMS']
),
(
  'melhores-eletricos-para-comprar-em-2026-guia-de-compra',
  'Os elétricos mais procurados para comprar em 2026: guia de compra',
  'O mercado brasileiro de elétricos amadureceu. Veja como escolher o modelo certo para o seu perfil de uso e orçamento.',
  ARRAY[
    'O mercado brasileiro de veículos elétricos deixou de ser nicho. Hoje há opções em praticamente todas as faixas de preço e uso, o que é ótimo — mas também torna a escolha mais difícil. Este guia organiza os critérios que realmente importam na hora de decidir.',
    'O primeiro critério não é o preço, é a autonomia real de uso, que costuma ser 10% a 20% menor que a anunciada, especialmente em cidades com trânsito, ar-condicionado ligado e temperaturas altas. Antes de escolher, pense na sua rotina: quantos quilômetros você roda por dia, e com que frequência faz viagens mais longas.',
    'O segundo critério é a infraestrutura de recarga disponível na sua região — em casa, no trabalho e nas rotas que você mais faz. Um carro com autonomia menor, mas que você consegue carregar todas as noites em casa, muitas vezes é mais prático do que um com autonomia maior e recarga mais difícil de encontrar.',
    'Por segmento, o mercado brasileiro hoje oferece: hatches compactos urbanos como o BYD Dolphin, ideais para cidade e primeiro carro elétrico; SUVs familiares como BYD Song Plus e GWM Haval H6, com mais espaço e autonomia estendida (muitos híbridos plug-in); e modelos premium como Tesla Model Y e BMW iX1, focados em tecnologia e desempenho.',
    'Uma dúvida comum é: híbrido plug-in ou 100% elétrico? Se você tem onde carregar todos os dias e faz poucas viagens de mais de 300 km, o 100% elétrico tende a ser mais simples e barato de manter. Se a recarga é incerta ou você viaja com frequência para regiões sem boa infraestrutura, um híbrido plug-in oferece a segurança do motor a combustão como reserva.',
    'Na hora de comprar, vale considerar também veículos seminovos certificados, que passam por inspeção da saúde da bateria antes da venda — um ponto que gera insegurança em compradores de primeira viagem, mas que hoje já tem processo padronizado em plataformas como a BlueV.',
    'No fim, não existe "o melhor elétrico" de forma genérica — existe o melhor elétrico para o seu uso, seu orçamento e a infraestrutura da sua região. Definir isso antes de visitar a primeira loja evita decisões por impulso e economiza tempo de pesquisa.'
  ],
  'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/cover-3-melhores-eletricos.svg',
  'Carros eletricos',
  'Equipe BlueV',
  'published',
  now() - interval '1 days',
  8,
  'Os elétricos mais procurados para comprar em 2026 | BlueV',
  'Guia completo para escolher o carro elétrico certo para o seu perfil de uso, orçamento e infraestrutura de recarga.',
  ARRAY['comprar carro elétrico', 'melhores elétricos 2026', 'guia de compra', 'SUV elétrico']
),
(
  'viagem-longa-carro-eletrico-como-planejar-sem-medo',
  'Viagem longa de carro elétrico: como planejar sem medo de ficar sem bateria',
  'A chamada "ansiedade de autonomia" é real, mas totalmente resolvida com um planejamento simples. Veja o passo a passo.',
  ARRAY[
    'Se tem uma coisa que assusta quem está pensando em fazer uma viagem longa de carro elétrico pela primeira vez é o medo de ficar parado na estrada sem bateria. É a chamada "ansiedade de autonomia" — e a boa notícia é que ela desaparece rápido depois da primeira viagem bem planejada.',
    'O primeiro passo é simples: mapeie a rota inteira antes de sair de casa, identificando os pontos de recarga ao longo do caminho. Ferramentas como o mapa de carregadores da BlueV mostram potência, tipo de conector e status de cada ponto em tempo real, o que elimina boa parte da incerteza.',
    'O segundo passo é entender a regra dos 20-80%: em uma viagem longa, o ideal é carregar rapidamente até 80% em pontos de recarga DC, e não esperar chegar a 100% — porque a velocidade de carregamento cai bastante entre 80% e 100%, então esperar isso só aumenta o tempo parado sem necessidade.',
    'O terceiro ponto que pega muita gente de surpresa: temperatura e velocidade afetam o consumo de energia mais do que se imagina. Frio intenso, uso constante do ar-condicionado/aquecedor e velocidades acima de 110 km/h reduzem a autonomia real em 15% a 25% comparado ao consumo urbano. Planeje as paradas considerando essa margem, não a autonomia máxima anunciada.',
    'O quarto passo é ter sempre um plano B: verifique se existe mais de uma rede de recarga na sua rota, e tenha os aplicativos das principais operadoras instalados e com pagamento configurado antes de sair de casa — evita perder tempo criando conta na hora com sinal de internet ruim na estrada.',
    'Na prática, uma viagem como São Paulo–Rio de Janeiro (cerca de 430 km) costuma exigir só uma ou duas paradas de recarga rápida de 20 a 30 minutos, tempo parecido com uma parada normal para descanso, banheiro e café — a diferença é que, no elétrico, essa parada também carrega o carro.',
    'Com o mapa certo, uma margem de segurança realista e um plano B, viajar de elétrico deixa de ser um desafio logístico e vira só mais uma viagem — com a vantagem de custar bem menos em energia do que em combustível.'
  ],
  'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/cover-4-viagem.svg',
  'Infraestrutura',
  'Equipe BlueV',
  'published',
  now() - interval '8 days',
  9,
  'Viagem longa de carro elétrico: como planejar sem medo | BlueV',
  'Passo a passo para planejar uma viagem longa de carro elétrico sem ansiedade de autonomia, com dicas práticas de recarga.',
  ARRAY['viagem de carro elétrico', 'autonomia', 'planejamento de rota', 'ansiedade de autonomia']
),
(
  'carro-eletrico-vale-a-pena-custo-total-de-propriedade',
  'Carro elétrico vale a pena? Comparamos o custo total com um carro a combustão',
  'Preço de compra maior, mas manutenção e "combustível" muito mais baratos. Fizemos a conta completa para você decidir.',
  ARRAY[
    'É a pergunta mais buscada por quem está decidindo entre comprar um carro elétrico ou continuar com um carro a combustão: no fim das contas, vale a pena financeiramente? A resposta depende de quanto você roda, mas os números ajudam bastante a enxergar o quadro completo.',
    'Vamos começar pelo ponto mais óbvio: o preço de compra de um carro elétrico ainda costuma ser mais alto do que o de um equivalente a combustão, embora essa diferença esteja diminuindo rápido com a chegada de novas marcas e o aumento da produção local de baterias.',
    'É no dia a dia que a conta começa a virar a favor do elétrico. O custo por quilômetro rodado com energia elétrica costuma ficar entre R$ 0,08 e R$ 0,12, contra R$ 0,50 a R$ 0,60 de um carro flex abastecido com gasolina. Para quem roda 1.500 km por mês, isso representa uma economia mensal de R$ 600 a R$ 700 só em "combustível".',
    'Na manutenção, a diferença também é significativa: carros elétricos têm muito menos peças móveis, não precisam de troca de óleo, filtro de combustível ou velas, e o desgaste de freios é menor graças à frenagem regenerativa. Isso costuma reduzir o custo de manutenção anual em 30% a 50% comparado a um carro a combustão equivalente.',
    'Outro fator que pesa a favor: em diversos estados brasileiros, carros elétricos têm isenção total ou parcial de IPVA, além de descontos em pedágios e estacionamentos em algumas cidades — incentivos que reduzem ainda mais o custo total de posse ao longo dos anos.',
    'O ponto de atenção fica na depreciação e no valor de revenda, que ainda é uma incógnita maior no mercado brasileiro por ser um segmento mais novo — embora a tendência observada em mercados mais maduros mostre estabilização à medida que a demanda por elétricos usados cresce.',
    'Juntando tudo: quanto mais você roda, mais rápido o elétrico compensa o preço de compra mais alto através da economia em energia e manutenção. Para quem roda pouco (menos de 500 km/mês), o retorno é mais lento; para quem roda bastante ou usa o carro para trabalho, o breque geralmente acontece entre 2 e 4 anos de uso — e, a partir daí, é economia líquida no bolso.'
  ],
  'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/cover-5-vale-a-pena.svg',
  'Mercado',
  'Equipe BlueV',
  'published',
  now() - interval '12 days',
  8,
  'Carro elétrico vale a pena? Custo total comparado à combustão | BlueV',
  'Comparamos o custo total de propriedade de um carro elétrico com um a combustão: compra, energia, manutenção e impostos.',
  ARRAY['custo total de propriedade', 'vale a pena', 'comparação', 'economia', 'IPVA']
);
