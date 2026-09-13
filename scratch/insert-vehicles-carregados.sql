-- 20 veículos importados do Carregados (mesma empresa) para o marketplace BlueV.
-- Rode no Supabase Dashboard -> SQL Editor -> New query -> Run.
-- As fotos já foram enviadas para o Storage (bucket media/vehicles/carregados/).

do $$
declare
  v_id uuid;
  base_url text := 'https://dmprerwcewlvnsdkqxgi.supabase.co/storage/v1/object/public/media/vehicles/carregados/';
begin

  -- 1. BYD Seal 2024 - Maceió/AL
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-seal-2024-cg01', 'BYD', 'Seal', 2024, 10000, 225000, 'Maceió', 'AL', '100% eletrico', 372, 82, 313, 8, 'CCS2',
    'BYD Seal 2024, na cor preta, com 10.000 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões realizadas em concessionária. Bateria em bom estado.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado'],
    'onlythebrave', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v01-1.webp', 0), (v_id, base_url || 'v01-2.webp', 1), (v_id, base_url || 'v01-3.webp', 2);

  -- 2. BMW iX M40 2023 - Mauá/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('bmw-ix-m40-2023-cg02', 'BMW', 'iX M40', 2023, 14700, 329000, 'Mauá', 'SP', '100% eletrico', 425, 76, 326, 8, 'CCS2',
    'BMW iX M40 2023, na cor azul, com 14.700 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado'],
    'ricardospindola', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v02-1.webp', 0), (v_id, base_url || 'v02-2.webp', 1), (v_id, base_url || 'v02-3.webp', 2);

  -- 3. Omoda E5 2025 - Batatais/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('omoda-e5-2025-cg03', 'Omoda', 'E5', 2025, 5200, 182000, 'Batatais', 'SP', '100% eletrico', 430, 61, 204, 6, 'CCS2',
    'Omoda E5 2025, na cor branca, com 5.200 km rodados. Veículo em bom estado geral.',
    ARRAY[]::text[],
    'otavio', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v03-1.webp', 0), (v_id, base_url || 'v03-2.webp', 1), (v_id, base_url || 'v03-3.webp', 2);

  -- 4. Ford Mustang Mach-E GT 2023 - São Paulo/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('ford-mustang-mach-e-gt-2023-cg04', 'Ford', 'Mustang Mach-E GT', 2023, 19000, 289000, 'São Paulo', 'SP', '100% eletrico', 379, 91, 480, 10, 'CCS2',
    'Ford Mustang Mach-E GT 2023, na cor preta, com 19.000 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado, carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'aig1987', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v04-1.webp', 0), (v_id, base_url || 'v04-2.webp', 1), (v_id, base_url || 'v04-3.webp', 2);

  -- 5. Tesla Model Y Performance 2021 - Itapema/SC
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('tesla-model-y-performance-2021-cg05', 'Tesla', 'Model Y Performance', 2021, 43000, 229000, 'Itapema', 'SC', '100% eletrico', 526, 75, 455, 9, 'CCS2',
    'Tesla Model Y Performance 2021, na cor preta, com 43.000 km rodados. IPVA pago, garantia de fábrica ativa, revisões em concessionária, bateria em bom estado e carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'captesla', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v05-1.webp', 0), (v_id, base_url || 'v05-2.webp', 1), (v_id, base_url || 'v05-3.webp', 2);

  -- 6. Chevrolet Bolt EUV 2023 - Mogi-Guaçu/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('chevrolet-bolt-euv-2023-cg06', 'Chevrolet', 'Bolt EUV', 2023, 46000, 145000, 'Mogi-Guaçu', 'SP', '100% eletrico', 377, 66, 200, 8, 'CCS2',
    'Chevrolet Bolt EUV 2023, na cor branca, com 46.000 km rodados. IPVA pago, garantia de fábrica ativa, revisões em concessionária, bateria em bom estado e carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'rennan40', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v06-1.webp', 0), (v_id, base_url || 'v06-2.webp', 1), (v_id, base_url || 'v06-3.webp', 2);

  -- 7. Tesla Model 3 Mid Range 2019 - Balneário Camboriú/SC
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('tesla-model-3-mid-range-2019-cg07', 'Tesla', 'Model 3 Mid Range', 2019, 8336, 297000, 'Balneário Camboriú', 'SC', '100% eletrico', 418, 62, 283, 8, 'CCS2',
    'Tesla Model 3 Mid Range 2019, na cor cinza, com 8.336 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado, carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'ibruno', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v07-1.webp', 0), (v_id, base_url || 'v07-2.webp', 1), (v_id, base_url || 'v07-3.webp', 2);

  -- 8. BYD Song Plus DM-i 2027 (híbrido plug-in) - Americana/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-song-plus-dm-i-2027-cg08', 'BYD', 'Song Plus DM-i', 2027, 250, 242900, 'Americana', 'SP', 'Hibrido plug-in', 200, 8, 245, 2, 'Tipo 2',
    'BYD Song Plus DM-i 2027, híbrido plug-in, na cor cinza, com 250 km rodados. Único dono, garantia de fábrica ativa, bateria em bom estado e carregador original incluso.',
    ARRAY['Garantia de fábrica ativa','Único dono','Bateria em bom estado','Carregador original incluso'],
    'gubruno', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v08-1.webp', 0), (v_id, base_url || 'v08-2.webp', 1), (v_id, base_url || 'v08-3.webp', 2);

  -- 9. BYD Song Pro DM-i 2025 (híbrido plug-in) - Tubarão/SC
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-song-pro-dm-i-2025-cg09', 'BYD', 'Song Pro DM-i', 2025, 34400, 164000, 'Tubarão', 'SC', 'Hibrido plug-in', 71, 18, 218, 3, 'Tipo 2',
    'BYD Song Pro DM-i 2025, híbrido plug-in, na cor cinza, com 34.400 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado, carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'vilmar_bressan', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v09-1.webp', 0), (v_id, base_url || 'v09-2.webp', 1), (v_id, base_url || 'v09-3.webp', 2);

  -- 10. Volvo XC40 Recharge P6 2023 - Vinhedo/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('volvo-xc40-recharge-2023-cg10', 'Volvo', 'XC40 Recharge P6', 2023, 40000, 215000, 'Vinhedo', 'SP', '100% eletrico', 438, 78, 408, 8, 'CCS2',
    'Volvo XC40 Recharge P6 2023, na cor preta, com 40.000 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado, carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'silvialima', 'Particular', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v10-1.webp', 0), (v_id, base_url || 'v10-2.webp', 1), (v_id, base_url || 'v10-3.webp', 2);

  -- 11. Chery iCar EQ1 2023 - Sobral/CE
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('chery-icar-2023-cg11', 'Chery', 'iCar EQ1', 2023, 7550, 10900, 'Sobral', 'CE', '100% eletrico', 282, 30, 95, 5, 'CCS2',
    'Chery iCar EQ1 2023, na cor branca, com 7.550 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado, carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'fernandorodrigues', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v11-1.webp', 0), (v_id, base_url || 'v11-2.webp', 1), (v_id, base_url || 'v11-3.webp', 2);

  -- 12. BYD Seal AWD 2025 - Brasília/DF
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-seal-awd-2025-cg12', 'BYD', 'Seal AWD', 2025, 21222, 245000, 'Brasília', 'DF', '100% eletrico', 372, 82, 530, 8, 'CCS2',
    'BYD Seal AWD 2025, na cor preta, com 21.222 km rodados. Único dono, carregador original incluso.',
    ARRAY['Único dono','Carregador original incluso'],
    'luizveras22', 'Particular', true, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v12-1.webp', 0), (v_id, base_url || 'v12-2.webp', 1), (v_id, base_url || 'v12-3.webp', 2);

  -- 13. GWM Ora 03 Skin 2024 - Porto Belo/SC
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('gwm-ora-03-2024-cg13', 'GWM', 'Ora 03 Skin', 2024, 36000, 124900, 'Porto Belo', 'SC', '100% eletrico', 232, 48, 171, 6, 'CCS2',
    'GWM Ora 03 Skin 2024, na cor preta, com 36.000 km rodados. Único dono, IPVA pago, garantia de fábrica ativa e revisões em concessionária. Bateria em bom estado, carregador original incluso.',
    ARRAY['IPVA pago','Garantia de fábrica ativa','Único dono','Revisões na concessionária','Bateria em bom estado','Carregador original incluso'],
    'bernardobozz', 'Particular', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v13-1.webp', 0), (v_id, base_url || 'v13-2.webp', 1), (v_id, base_url || 'v13-3.webp', 2);

  -- 14. Geely EX2 Pro 2026 (0km) - Caruaru/PE
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('geely-ex2-pro-2026-cg14', 'Geely', 'EX2 Pro', 2026, 0, 134000, 'Caruaru', 'PE', '100% eletrico', 289, 39.4, 204, 5, 'CCS2',
    'Geely EX2 Pro 2026 0 km, na cor prata. Veículo novo, disponível para pronta entrega.',
    ARRAY['0 km','Pronta entrega'],
    'Concessionária Geely', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v14-1.webp', 0), (v_id, base_url || 'v14-2.webp', 1), (v_id, base_url || 'v14-3.webp', 2);

  -- 15. BYD Dolphin GS 2027 (0km) - Maceió/AL
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-dolphin-2027-cg15', 'BYD', 'Dolphin GS', 2027, 0, 123900, 'Maceió', 'AL', '100% eletrico', 405, 45, 95, 6, 'CCS2',
    'BYD Dolphin GS 2027 0 km, na cor branca. Veículo novo, disponível para pronta entrega.',
    ARRAY['0 km','Pronta entrega'],
    'Concessionária BYD', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v15-1.webp', 0), (v_id, base_url || 'v15-2.webp', 1), (v_id, base_url || 'v15-3.webp', 2);

  -- 16. Toyota RAV4 EV 2026 (0km) - São José dos Campos/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('toyota-rav4-ev-2026-cg16', 'Toyota', 'RAV4 EV', 2026, 0, 317190, 'São José dos Campos', 'SP', '100% eletrico', 200, 41, 204, 6, 'Tipo 2',
    'Toyota RAV4 EV 2026 0 km, na cor cinza. Veículo novo, disponível para pronta entrega.',
    ARRAY['0 km','Pronta entrega'],
    'Concessionária Toyota', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v16-1.webp', 0), (v_id, base_url || 'v16-2.webp', 1), (v_id, base_url || 'v16-3.webp', 2);

  -- 17. BYD Yuan Pro GS 2026 (0km) - Barueri/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-yuan-pro-2026-cg17', 'BYD', 'Yuan Pro GS', 2026, 0, 182990, 'Barueri', 'SP', '100% eletrico', 250, 45, 163, 6, 'CCS2',
    'BYD Yuan Pro GS 2026 0 km, na cor preta. Veículo novo, disponível para pronta entrega.',
    ARRAY['0 km','Pronta entrega'],
    'Concessionária BYD', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v17-1.webp', 0), (v_id, base_url || 'v17-2.webp', 1), (v_id, base_url || 'v17-3.webp', 2);

  -- 18. BYD Dolphin GS 2027 (80km) - Juiz de Fora/MG
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('byd-dolphin-2027-jf-cg18', 'BYD', 'Dolphin GS', 2027, 80, 121900, 'Juiz de Fora', 'MG', '100% eletrico', 405, 45, 95, 6, 'CCS2',
    'BYD Dolphin GS 2027, na cor azul, com 80 km rodados. Veículo seminovo, disponível para pronta entrega.',
    ARRAY['Pronta entrega'],
    'Concessionária BYD', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v18-1.webp', 0), (v_id, base_url || 'v18-2.webp', 1), (v_id, base_url || 'v18-3.webp', 2);

  -- 19. Geely EX2 Pro 2026 (0km) - Linhares/ES
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('geely-ex2-pro-2026-es-cg19', 'Geely', 'EX2 Pro', 2026, 0, 136990, 'Linhares', 'ES', '100% eletrico', 289, 39.4, 204, 5, 'CCS2',
    'Geely EX2 Pro 2026 0 km, na cor branca. Veículo novo, disponível para pronta entrega.',
    ARRAY['0 km','Pronta entrega'],
    'Concessionária Geely', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v19-1.webp', 0), (v_id, base_url || 'v19-2.webp', 1), (v_id, base_url || 'v19-3.webp', 2);

  -- 20. Toyota RAV4 EV 2026 (0km) - São Paulo/SP
  insert into public.vehicles (slug, brand, model, year, mileage_km, price, city, state, type, autonomy_km, battery_kwh, power_hp, charge_time_hours, connector, description, features, seller_name, seller_type, featured, status)
  values ('toyota-rav4-ev-2026-sp-cg20', 'Toyota', 'RAV4 EV', 2026, 0, 319620, 'São Paulo', 'SP', '100% eletrico', 200, 41, 204, 6, 'Tipo 2',
    'Toyota RAV4 EV 2026 0 km, na cor preta. Veículo novo, disponível para pronta entrega.',
    ARRAY['0 km','Pronta entrega'],
    'Concessionária Toyota', 'Concessionaria', false, 'Disponivel')
  returning id into v_id;
  insert into public.vehicle_images (vehicle_id, url, sort_order) values
    (v_id, base_url || 'v20-1.webp', 0), (v_id, base_url || 'v20-2.webp', 1), (v_id, base_url || 'v20-3.webp', 2);

end $$;
