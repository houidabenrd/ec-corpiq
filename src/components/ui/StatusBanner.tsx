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
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
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
        'flex items-start gap-3 p-4 rounded-lg border',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[variant]}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium text-sm">{title}</p>}
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
