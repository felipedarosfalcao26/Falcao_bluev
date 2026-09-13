'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { InstallLeadForm, installLeadSchema } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const AUDIENCES: InstallLeadForm['audience'][] = ['Pessoa fisica', 'Empresa', 'Condominio', 'Hotel', 'Posto', 'Frota'];
const LOCATIONS: InstallLeadForm['location'][] = ['Casa', 'Condominio', 'Empresa', 'Estacionamento', 'Posto', 'Outro'];
const POWERS: InstallLeadForm['desiredPower'][] = ['7.4 kW', '11 kW', '22 kW', '50 kW+', 'Nao sei'];

const STEPS: { title: string; fields: (keyof InstallLeadForm)[] }[] = [
  { title: 'Perfil', fields: ['audience'] },
  { title: 'Local', fields: ['location'] },
  { title: 'Potência', fields: ['chargerCount', 'desiredPower'] },
  { title: 'Localização', fields: ['city', 'state'] },
  { title: 'Contato', fields: ['name', 'whatsapp', 'email'] },
];

function OptionCard({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
        selected ? 'border-blue-500 bg-blue-500/15 text-white' : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/5'
      )}
    >
      {label}
    </button>
  );
}

export function InstallChargerForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<InstallLeadForm>({
    resolver: zodResolver(installLeadSchema),
    defaultValues: { chargerCount: 1 },
  });

  const values = watch();
  const isLastStep = step === STEPS.length - 1;

  async function goNext() {
    const valid = await trigger(STEPS[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: InstallLeadForm) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'instalacao', data }),
      });
      if (!res.ok) throw new Error('Falha ao enviar');
      trackEvent('quote_request', { audience: data.audience, location: data.location });
      setSubmitted(true);
    } catch {
      setServerError('Não foi possível enviar sua solicitação agora. Tente novamente em instantes.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <CheckCircle2 size={40} className="text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Solicitação enviada!</h3>
        <p className="max-w-sm text-sm text-white/60">
          Um especialista BlueV vai entrar em contato em breve pelo WhatsApp ou e-mail informado para preparar seu
          orçamento.
        </p>
      </div>
    );
  }

  return (
    <div id="instalar" className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.title} className={cn('h-1.5 flex-1 rounded-full', i <= step ? 'bg-blue-500' : 'bg-white/10')} />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="mb-4 text-lg font-semibold text-white">Você é:</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {AUDIENCES.map((a) => (
                    <OptionCard key={a} label={a} selected={values.audience === a} onClick={() => setValue('audience', a)} />
                  ))}
                </div>
                {errors.audience && <p className="mt-3 text-sm text-red-400">{errors.audience.message}</p>}
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="mb-4 text-lg font-semibold text-white">Onde será instalado?</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {LOCATIONS.map((l) => (
                    <OptionCard key={l} label={l} selected={values.location === l} onClick={() => setValue('location', l)} />
                  ))}
                </div>
                {errors.location && <p className="mt-3 text-sm text-red-400">{errors.location.message}</p>}
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Quantos carregadores?</label>
                  <input
                    type="number"
                    min={1}
                    className="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                    {...register('chargerCount', { valueAsNumber: true })}
                  />
                  {errors.chargerCount && <p className="mt-2 text-sm text-red-400">{errors.chargerCount.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Potência desejada</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {POWERS.map((p) => (
                      <OptionCard key={p} label={p} selected={values.desiredPower === p} onClick={() => setValue('desiredPower', p)} />
                    ))}
                  </div>
                  {errors.desiredPower && <p className="mt-2 text-sm text-red-400">{errors.desiredPower.message}</p>}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Cidade</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                    {...register('city')}
                  />
                  {errors.city && <p className="mt-2 text-sm text-red-400">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Estado</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                    {...register('state')}
                  />
                  {errors.state && <p className="mt-2 text-sm text-red-400">{errors.state.message}</p>}
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Nome completo</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                    {...register('name')}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">WhatsApp</label>
                    <input
                      className="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                      placeholder="(11) 99999-9999"
                      {...register('whatsapp')}
                    />
                    {errors.whatsapp && <p className="mt-2 text-sm text-red-400">{errors.whatsapp.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">E-mail</label>
                    <input
                      className="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                      {...register('email')}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
                  </div>
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {serverError && <p className="mt-4 text-sm text-red-400">{serverError}</p>}

        <div className="mt-8 flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={goBack} className={cn(step === 0 && 'invisible')}>
            Voltar
          </Button>
          {isLastStep ? (
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Solicitar orçamento'}
            </Button>
          ) : (
            <Button type="button" onClick={goNext}>
              Continuar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
