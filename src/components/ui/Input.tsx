import { type InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, trailing, className, disabled, readOnly, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-[13px] font-semibold text-gray-600 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-corpiq-blue">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 transition-all duration-150',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-corpiq-blue/10 focus:border-corpiq-blue focus:shadow-input-focus',
              error
                ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                : 'border-gray-200 hover:border-gray-300',
              icon && 'pl-11',
              trailing && 'pr-11',
              (disabled || readOnly) && 'bg-gray-50 text-gray-500 cursor-not-allowed hover:border-gray-200',
              className
            )}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
          {trailing && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {trailing}
            </div>
          )}
        </div>
        {error && <p className="text-xs font-medium text-red-600 flex items-center gap-1">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
