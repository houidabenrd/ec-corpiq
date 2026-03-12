import { clsx } from 'clsx';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

type BannerVariant = 'info' | 'warning' | 'error' | 'success';

interface StatusBannerProps {
  variant: BannerVariant;
  title?: string;
  message: string;
  action?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BannerVariant, string> = {
  info: 'bg-blue-50 border-blue-100 text-blue-800',
  warning: 'bg-amber-50 border-amber-100 text-amber-800',
  error: 'bg-red-50 border-red-100 text-red-800',
  success: 'bg-emerald-50 border-emerald-100 text-emerald-800',
};

const iconStyles: Record<BannerVariant, string> = {
  info: 'text-blue-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
  success: 'text-emerald-500',
};

const icons: Record<BannerVariant, React.ReactNode> = {
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <XCircle size={18} />,
  success: <CheckCircle size={18} />,
};

export function StatusBanner({ variant, title, message, action, className }: StatusBannerProps) {
  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-xl border animate-fade-in',
        variantStyles[variant],
        className
      )}
    >
      <div className={clsx('flex-shrink-0 mt-0.5', iconStyles[variant])}>{icons[variant]}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm">{title}</p>}
        <p className={clsx('text-sm', title ? 'opacity-80 mt-0.5' : '')}>{message}</p>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
