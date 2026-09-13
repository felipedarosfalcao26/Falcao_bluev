'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';

export function DeleteButton({ action, confirmMessage }: { action: () => Promise<void>; confirmMessage: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-white/60">Confirmar?</span>
        <button
          onClick={() =>
            startTransition(async () => {
              await action();
              router.refresh();
            })
          }
          className="rounded-md bg-red-500/20 px-2 py-1 font-medium text-red-300 hover:bg-red-500/30"
        >
          {pending ? <Loader2 size={12} className="animate-spin" /> : 'Sim, excluir'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-white/50 hover:text-white">
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      title={confirmMessage}
      onClick={() => setConfirming(true)}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-red-500/10 hover:text-red-400"
    >
      <Trash2 size={15} />
    </button>
  );
}
