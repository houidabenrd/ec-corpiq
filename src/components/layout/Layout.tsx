import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useScenario } from '../../context/ScenarioContext';
import { Ban, Headphones } from 'lucide-react';
import { Button } from '../ui/Button';

export function Layout() {
  const { scenario } = useScenario();
  const navigate = useNavigate();

  if (!scenario.user_active) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-soft p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
            <Ban size={36} className="text-gray-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Compte désactivé</h2>
            <p className="text-gray-500 mt-2">
              Votre compte est actuellement désactivé. Veuillez contacter le support pour plus d'informations.
            </p>
          </div>
          <div className="space-y-3">
            <Button fullWidth icon={<Headphones size={18} />}>
              Contacter le support
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                navigate('/auth/login');
              }}
            >
              Retour à la connexion
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-corpiq-light">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
