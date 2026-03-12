import { clsx } from 'clsx';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  danger: 'bg-red-50 text-red-700 ring-red-600/10',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  neutral: 'bg-gray-50 text-gray-600 ring-gray-500/10',
  purple: 'bg-violet-50 text-violet-700 ring-violet-600/10',
};

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-gray-400',
  purple: 'bg-violet-500',
};

export function Badge({ variant = 'neutral', children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md ring-1 ring-inset',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
