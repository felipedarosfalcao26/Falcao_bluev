import { Resend } from 'resend';
import { Lead } from '@/lib/types';

const LEAD_TYPE_LABEL: Record<Lead['type'], string> = {
  instalacao: 'Pedido de orçamento — instalação de carregador',
  contato: 'Contato pelo site',
  'veiculo-interesse': 'Interesse em veículo',
  'anuncio-veiculo': 'Anúncio de veículo enviado',
};

function formatPayload(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#667085;">${key}</td><td style="padding:4px 0;color:#0b1220;font-weight:500;">${String(value)}</td></tr>`)
    .join('');
}

export async function sendLeadNotificationEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  const subject = `${LEAD_TYPE_LABEL[lead.type]} — ${lead.name}`;

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#0b1220;">${LEAD_TYPE_LABEL[lead.type]}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;color:#667085;">Nome</td><td style="padding:4px 0;color:#0b1220;font-weight:500;">${lead.name}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#667085;">E-mail</td><td style="padding:4px 0;color:#0b1220;font-weight:500;">${lead.email}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#667085;">Telefone</td><td style="padding:4px 0;color:#0b1220;font-weight:500;">${lead.phone}</td></tr>
        ${lead.message ? `<tr><td style="padding:4px 12px 4px 0;color:#667085;">Mensagem</td><td style="padding:4px 0;color:#0b1220;font-weight:500;">${lead.message}</td></tr>` : ''}
        ${formatPayload(lead.payload)}
      </table>
      <p style="margin-top:24px;color:#667085;font-size:13px;">Recebido pelo site BlueV em ${new Date(lead.createdAt).toLocaleString('pt-BR')}. Veja todos os leads em /admin/leads.</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'BlueV Site <onboarding@resend.dev>',
      to,
      replyTo: lead.email,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send lead notification email', error);
  }
}
