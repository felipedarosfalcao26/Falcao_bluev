'use server';

import { revalidatePath } from 'next/cache';
import { deleteLead } from '@/services/leads.service';

export async function deleteLeadAction(id: string) {
  await deleteLead(id);
  revalidatePath('/admin/leads');
}
