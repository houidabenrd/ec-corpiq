import { Building2, Shield, BarChart3, BookOpen } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-40px)] bg-corpiq-light flex">
      <div className="hidden lg:flex lg:w-[45%] bg-corpiq-blue relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-corpiq-blue via-corpiq-blue-dark to-corpiq-bordeaux opacity-90" />

        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 px-12 text-white max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center ring-1 ring-white/20 shadow-lg">
              <Building2 size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">EC CORPIQ</h1>
              <p className="text-white/50 text-xs font-medium">Espace Client</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
            Votre portail propriétaire intelligent
          </h2>
          <p className="text-white/60 leading-relaxed text-[15px]">
            Gérez vos propriétés, accédez à vos outils et restez informé des dernières
            actualités du marché immobilier québécois.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { icon: <Shield size={16} />, label: 'Outils' },
              { icon: <BookOpen size={16} />, label: 'Formations' },
              { icon: <BarChart3 size={16} />, label: 'Avantages' },
            ].map((item) => (
              <div key={item.label} className="bg-white/[0.07] ring-1 ring-white/10 rounded-xl p-3 text-center space-y-1.5">
                <div className="w-8 h-8 mx-auto bg-white/10 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-xs font-medium text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/[0.03] rounded-full" />
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/[0.03] rounded-full" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-corpiq-blue rounded-xl flex items-center justify-center shadow-sm">
              <Building2 size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-corpiq-blue">EC CORPIQ</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-1.5 text-[15px]">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
