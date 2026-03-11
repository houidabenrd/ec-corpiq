import { type InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, disabled, readOnly, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 transition-all duration-200',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-corpiq-blue/20 focus:border-corpiq-blue',
              error
                ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                : 'border-gray-300',
              icon && 'pl-10',
              (disabled || readOnly) && 'bg-gray-50 text-gray-500 cursor-not-allowed',
              className
            )}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
