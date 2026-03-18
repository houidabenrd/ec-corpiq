import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { useScenario } from '../../context/ScenarioContext';
import { Ban, Headphones, Phone, RefreshCw, Receipt, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function Layout() {
  const { scenario } = useScenario();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (!scenario.user_active) {
    return (
      <div className="min-h-screen flex flex-col bg-corpiq-light">
        <Header onToggleMobileMenu={() => {}} mobileMenuOpen={false} />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center space-y-6 animate-fade-in-up border border-gray-100">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-gray-200/30 rounded-2xl animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Ban size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Compte désactivé</h2>
              <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">
                Votre compte est actuellement désactivé. Pour une réactivation ou une réadhésion complète, contactez un chargé de compte CORPIQ.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-left">
              <p className="text-xs font-bold text-gray-700 mb-2">Processus de réactivation</p>
              <ul className="text-xs text-gray-500 space-y-1.5">
                <li className="flex items-start gap-2"><UserCheck size={12} className="text-gray-400 mt-0.5 flex-shrink-0" /> Vérification de votre identité</li>
                <li className="flex items-start gap-2"><Receipt size={12} className="text-gray-400 mt-0.5 flex-shrink-0" /> Règlement des soldes impayés</li>
                <li className="flex items-start gap-2"><RefreshCw size={12} className="text-gray-400 mt-0.5 flex-shrink-0" /> Réadhésion accompagnée</li>
              </ul>
            </div>
            <div className="space-y-3 pt-2">
              <Button fullWidth icon={<Phone size={16} />}>Contacter un chargé de compte</Button>
              <Button variant="ghost" fullWidth onClick={() => navigate('/auth/login')}>
                Retour à la connexion
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-corpiq-light">
      <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} mobileMenuOpen={mobileMenuOpen} />

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-24">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 h-full bg-white shadow-elevated animate-slide-in-left">
            <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
