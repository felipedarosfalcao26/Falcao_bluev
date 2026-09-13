import { Lead, LeadType } from '@/lib/types';

/**
 * Persists a lead. Today this just logs server-side; wire it to a DB insert
 * and/or forward it to `LEADS_WEBHOOK_URL` (CRM, email, WhatsApp API) once
 * those integrations exist.
 */
export async function createLead(input: {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string;
  payload: Record<string, unknown>;
}): Promise<Lead> {
  const lead: Lead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      console.error('Failed to forward lead to webhook', error);
    }
  } else {
    console.log('[lead:new]', lead);
  }

  return lead;
}
