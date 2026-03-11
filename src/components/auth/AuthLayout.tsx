import { Building2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-corpiq-blue-50 via-white to-corpiq-bordeaux-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-corpiq-blue relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-corpiq-blue via-corpiq-blue-dark to-corpiq-bordeaux opacity-90" />
        <div className="relative z-10 px-12 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Building2 size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">EC CORPIQ</h1>
              <p className="text-white/70 text-sm">Espace Client</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            Votre portail propriétaire intelligent
          </h2>
          <p className="text-white/80 leading-relaxed">
            Gérez vos propriétés, accédez à vos outils et restez informé des dernières
            actualités du marché immobilier québécois.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {['Outils', 'Formations', 'Avantages'].map((item) => (
              <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-corpiq-blue rounded-xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-corpiq-blue">EC CORPIQ</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
