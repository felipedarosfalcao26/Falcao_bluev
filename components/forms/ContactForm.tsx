'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { ContactLeadForm as ContactLeadFormType, contactLeadSchema } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactLeadFormType>({ resolver: zodResolver(contactLeadSchema) });

  async function onSubmit(data: ContactLeadFormType) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contato', data }),
      });
      if (!res.ok) throw new Error('Falha ao enviar');
      trackEvent('lead_created', { source: 'contato' });
      setSubmitted(true);
    } catch {
      setServerError('Não foi possível enviar sua mensagem agora. Tente novamente em instantes.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <CheckCircle2 size={40} className="text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Mensagem enviada!</h3>
        <p className="max-w-sm text-sm text-white/60">Nossa equipe vai te responder em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">Nome</label>
        <input className={inputClasses} {...register('name')} />
        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">E-mail</label>
          <input className={inputClasses} {...register('email')} />
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Telefone</label>
          <input className={inputClasses} {...register('phone')} />
          {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">Mensagem</label>
        <textarea rows={5} className={inputClasses} {...register('message')} />
        {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Fale com a BlueV'}
      </Button>
    </form>
  );
}
