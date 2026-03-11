import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'google' | 'microsoft';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-corpiq-blue text-white hover:bg-corpiq-blue-light active:bg-corpiq-blue-dark shadow-sm',
  secondary:
    'bg-corpiq-bordeaux text-white hover:bg-corpiq-bordeaux-light active:opacity-90 shadow-sm',
  outline:
    'border-2 border-corpiq-blue text-corpiq-blue hover:bg-corpiq-blue-50 active:bg-corpiq-blue-100',
  ghost:
    'text-corpiq-blue hover:bg-corpiq-blue-50 active:bg-corpiq-blue-100',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
  google:
    'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm',
  microsoft:
    'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-corpiq-blue/30 focus:ring-offset-2',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
