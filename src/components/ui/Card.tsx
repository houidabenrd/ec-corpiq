import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, padding = 'md' }: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-gray-100 shadow-card',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, badge, icon }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 bg-corpiq-blue-50 rounded-xl flex items-center justify-center text-corpiq-blue flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {badge}
          </div>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
