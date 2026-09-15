import { createClient } from '@/lib/supabase/server';
import { mapLead } from '@/lib/supabase/mappers';
import { Lead, LeadType } from '@/lib/types';
import { sendLeadNotificationEmail } from '@/lib/email';

const EMAIL_NOTIFIED_TYPES: LeadType[] = ['instalacao', 'contato'];

export async function createLead(input: {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string;
  payload: Record<string, unknown>;
}): Promise<Lead> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('leads')
    .insert({
      type: input.type,
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      source: input.source,
      payload: input.payload,
    })
    .select('*')
    .single();
  if (error) throw error;

  const lead = mapLead(data);

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (webhookError) {
      console.error('Failed to forward lead to webhook', webhookError);
    }
  }

  if (EMAIL_NOTIFIED_TYPES.includes(lead.type)) {
    await sendLeadNotificationEmail(lead);
  }

  return lead;
}

export async function listLeads(filters: { type?: LeadType } = {}): Promise<Lead[]> {
  const supabase = createClient();
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (filters.type) query = query.eq('type', filters.type);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapLead);
}

export async function deleteLead(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}
