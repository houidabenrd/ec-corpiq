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
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center">
          <Ban size={28} className="text-gray-400" />
        </div>

        <div className="space-y-2">
          <p className="text-gray-700 text-base font-semibold">
            Votre compte a été désactivé
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Veuillez contacter le support CORPIQ pour plus d'informations sur l'état de votre compte.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Aucun accès aux modules n'est disponible lorsque le compte est désactivé.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            icon={<Headphones size={16} />}
          >
            Contacter le support
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={() => navigate('/auth/login')}
            icon={<ArrowLeft size={15} />}
          >
            Retour à la connexion
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
