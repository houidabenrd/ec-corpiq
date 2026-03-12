import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { useScenario } from '../../context/ScenarioContext';
import { Ban, Headphones } from 'lucide-react';
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
          <div className="bg-white rounded-2xl shadow-card p-8 max-w-md w-full text-center space-y-6 animate-fade-in-up border border-gray-100">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center">
              <Ban size={28} className="text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Compte désactivé</h2>
              <p className="text-gray-500 mt-2 text-sm">
                Veuillez contacter le support CORPIQ pour plus d'informations.
              </p>
            </div>
            <p className="text-xs text-gray-400">Aucun accès aux modules.</p>
            <Button fullWidth icon={<Headphones size={16} />}>Contacter le support</Button>
            <Button variant="ghost" fullWidth onClick={() => navigate('/auth/login')}>
              Retour à la connexion
            </Button>
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
