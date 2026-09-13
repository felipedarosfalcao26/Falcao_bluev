-- Substitui as capas ilustradas (SVG) dos 5 artigos por fotos reais do Envato Elements.
-- Rode no Supabase Dashboard -> SQL Editor -> New query -> Run.

update public.blog_posts set image = 'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/photo-1-custo-recarga.jpg'
where slug = 'quanto-custa-carregar-carro-eletrico-em-casa-guia-completo';

update public.blog_posts set image = 'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/photo-2-bateria.jpg'
where slug = 'bateria-do-eletrico-degrada-rapido-mito-ou-verdade';

update public.blog_posts set image = 'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/photo-3-melhores-eletricos.jpg'
where slug = 'melhores-eletricos-para-comprar-em-2026-guia-de-compra';

update public.blog_posts set image = 'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/photo-4-viagem.jpg'
where slug = 'viagem-longa-carro-eletrico-como-planejar-sem-medo';

update public.blog_posts set image = 'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/blog/photo-5-vale-a-pena.jpg'
where slug = 'carro-eletrico-vale-a-pena-custo-total-de-propriedade';
