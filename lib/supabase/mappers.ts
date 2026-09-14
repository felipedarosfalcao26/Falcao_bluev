import { BlogPost, Charger, Lead, Vehicle, VehicleImage } from '@/lib/types';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function mapCharger(row: any): Charger {
  return {
    id: row.id,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    address: row.address,
    city: row.city,
    state: row.state,
    power: Number(row.power),
    current: row.current,
    speed: row.speed,
    connectors: row.connectors ?? [],
    points: row.points,
    status: row.status,
    operator: row.operator,
    locationType: row.location_type,
    price: row.price,
    hours: row.hours,
    rating: Number(row.rating),
    image: row.image,
  };
}

export function mapVehicleImage(row: any): VehicleImage {
  return { id: row.id, vehicleId: row.vehicle_id, url: row.url };
}

export function mapVehicle(row: any): Vehicle {
  return {
    id: row.id,
    code: row.code,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    mileageKm: row.mileage_km,
    price: Number(row.price),
    city: row.city,
    state: row.state,
    type: row.type,
    autonomyKm: row.autonomy_km,
    batteryKwh: Number(row.battery_kwh),
    powerHp: row.power_hp,
    chargeTimeHours: Number(row.charge_time_hours),
    connector: row.connector,
    description: row.description,
    features: row.features ?? [],
    images: (row.vehicle_images ?? []).map(mapVehicleImage),
    sellerName: row.seller_name,
    sellerType: row.seller_type,
    featured: row.featured,
    hidden: row.hidden,
    createdAt: row.created_at,
    status: row.status,
  };
}

export function mapBlogPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? [],
    image: row.image,
    category: row.category,
    author: row.author,
    publishedAt: row.published_at ?? row.created_at,
    readMinutes: row.read_minutes,
    seoTitle: row.seo_title ?? row.title,
    seoDescription: row.seo_description ?? row.excerpt,
    tags: row.tags ?? [],
    status: row.status,
  };
}

export function mapLead(row: any): Lead {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message ?? undefined,
    source: row.source,
    createdAt: row.created_at,
    payload: row.payload ?? {},
  };
}
