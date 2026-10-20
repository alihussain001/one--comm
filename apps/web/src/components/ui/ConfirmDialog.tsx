/**
 * ConfirmDialog — simple modal dialog for destructive actions.
 * Blocks interaction until the user confirms or cancels.
 */
import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="m-auto max-w-sm w-full rounded-[18px] border border-[#e7e7ef] bg-white p-6 shadow-[0_24px_60px_rgba(30,28,67,0.18)] backdrop:bg-[rgba(30,28,67,0.3)] backdrop:backdrop-blur-sm"
    >
      <h2 className="mb-2 text-[18px] font-bold text-[#1e1b35]">{title}</h2>
      <p className="mb-6 text-sm leading-relaxed text-[#68677a]">{message}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-[10px] border border-[#d9d8e4] bg-white text-sm font-bold text-[#201e31] transition-colors hover:border-[#674ad1] hover:text-[#674ad1]"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`inline-flex h-10 flex-1 items-center justify-center rounded-[10px] text-sm font-bold text-white transition-all ${
            danger
              ? 'bg-red-600 hover:bg-red-700 shadow-[0_6px_14px_rgba(220,38,38,0.22)]'
              : 'bg-[#674ad1] hover:bg-[#5639bf] shadow-[0_9px_18px_rgba(103,74,209,0.22)]'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
