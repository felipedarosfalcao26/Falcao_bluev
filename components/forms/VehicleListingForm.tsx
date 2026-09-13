'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, UploadCloud } from 'lucide-react';
import { VehicleListingForm as VehicleListingFormType, vehicleListingSchema } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/80">{label}</label>
      {children}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500';

export function VehicleListingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleListingFormType>({ resolver: zodResolver(vehicleListingSchema) });

  async function onSubmit(data: VehicleListingFormType) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'anuncio-veiculo', data }),
      });
      if (!res.ok) throw new Error('Falha ao enviar');
      trackEvent('vehicle_listing_created', { brand: data.brand, model: data.model });
      setSubmitted(true);
    } catch {
      setServerError('Não foi possível enviar seu anúncio agora. Tente novamente em instantes.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <CheckCircle2 size={40} className="text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Anúncio recebido!</h3>
        <p className="max-w-sm text-sm text-white/60">
          Sua solicitação de anúncio foi enviada para moderação. Nossa equipe entrará em contato para confirmar os
          dados e publicar seu veículo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Seus dados</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Nome" error={errors.name?.message}>
            <input className={inputClasses} {...register('name')} />
          </Field>
          <Field label="WhatsApp" error={errors.whatsapp?.message}>
            <input className={inputClasses} placeholder="(11) 99999-9999" {...register('whatsapp')} />
          </Field>
          <Field label="E-mail" error={errors.email?.message}>
            <input className={inputClasses} {...register('email')} />
          </Field>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Dados do veículo</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Marca" error={errors.brand?.message}>
            <input className={inputClasses} {...register('brand')} />
          </Field>
          <Field label="Modelo" error={errors.model?.message}>
            <input className={inputClasses} {...register('model')} />
          </Field>
          <Field label="Ano" error={errors.year?.message}>
            <input type="number" className={inputClasses} {...register('year', { valueAsNumber: true })} />
          </Field>
          <Field label="Quilometragem (km)" error={errors.mileageKm?.message}>
            <input type="number" className={inputClasses} {...register('mileageKm', { valueAsNumber: true })} />
          </Field>
          <Field label="Preço (R$)" error={errors.price?.message}>
            <input type="number" className={inputClasses} {...register('price', { valueAsNumber: true })} />
          </Field>
          <Field label="Autonomia (km)" error={errors.autonomyKm?.message}>
            <input type="number" className={inputClasses} {...register('autonomyKm', { valueAsNumber: true })} />
          </Field>
          <Field label="Cidade" error={errors.city?.message}>
            <input className={inputClasses} {...register('city')} />
          </Field>
          <Field label="Estado" error={errors.state?.message}>
            <input className={inputClasses} {...register('state')} />
          </Field>
          <Field label="Tipo" error={errors.type?.message}>
            <select className={inputClasses} {...register('type')} defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option value="100% eletrico">100% elétrico</option>
              <option value="Hibrido plug-in">Híbrido plug-in</option>
              <option value="Hibrido">Híbrido</option>
            </select>
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Descrição" error={errors.description?.message}>
            <textarea rows={4} className={inputClasses} {...register('description')} />
          </Field>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-white/15 p-5 text-sm text-white/50">
          <UploadCloud size={20} />
          Upload de fotos disponível em breve — por enquanto, envie as fotos pelo WhatsApp após o envio do formulário.
        </div>
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Enviar anúncio para moderação'}
      </Button>
    </form>
  );
}
