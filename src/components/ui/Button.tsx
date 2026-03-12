import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'google' | 'microsoft';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-corpiq-blue text-white hover:bg-corpiq-blue-light shadow-sm hover:shadow-md active:shadow-sm',
  secondary:
    'bg-corpiq-bordeaux text-white hover:bg-corpiq-bordeaux-light shadow-sm hover:shadow-md active:shadow-sm',
  outline:
    'border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 shadow-sm',
  ghost:
    'text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-150',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md active:shadow-sm',
  google:
    'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
  microsoft:
    'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-[13px] gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-5 py-3 text-[15px] gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-corpiq-blue/20 focus-visible:ring-offset-2',
        'active:scale-[0.98]',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </button>
  );
}
