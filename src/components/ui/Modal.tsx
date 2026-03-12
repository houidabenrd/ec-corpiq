import { clsx } from 'clsx';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
  closable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, children, title, closable = true, size = 'md' }: ModalProps) {
  if (!open) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        onClick={closable ? onClose : undefined}
      />
      <div
        className={clsx(
          'relative bg-white rounded-2xl shadow-elevated w-full animate-scale-in',
          sizeStyles[size]
        )}
      >
        {(title || closable) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {closable && onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
}
