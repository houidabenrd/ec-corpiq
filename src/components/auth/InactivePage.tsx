import { useNavigate } from 'react-router-dom';
import { Ban, ArrowLeft, Headphones } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export function InactivePage() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Compte désactivé"
      subtitle=""
    >
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
          <Ban size={36} className="text-gray-500" />
        </div>

        <div className="space-y-2">
          <p className="text-gray-600 text-lg font-medium">
            Votre compte a été désactivé
          </p>
          <p className="text-gray-500">
            Veuillez contacter le support CORPIQ pour plus d'informations sur l'état de votre compte.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            Aucun accès aux modules n'est disponible lorsque le compte est désactivé.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            icon={<Headphones size={18} />}
          >
            Contacter le support
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={() => navigate('/auth/login')}
            icon={<ArrowLeft size={16} />}
          >
            Retour à la connexion
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
