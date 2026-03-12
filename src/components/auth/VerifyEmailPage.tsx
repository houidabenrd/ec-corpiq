import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export function VerifyEmailPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Vérifiez votre courriel"
      subtitle="Un courriel de vérification vous a été envoyé"
    >
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="w-16 h-16 mx-auto bg-corpiq-blue-50 rounded-2xl flex items-center justify-center">
          <Mail size={28} className="text-corpiq-blue" />
        </div>

        <div className="space-y-2">
          <p className="text-gray-600 text-sm leading-relaxed">
            Nous avons envoyé un courriel de vérification à votre adresse.
            Veuillez cliquer sur le lien dans le courriel pour activer votre compte.
          </p>
          <p className="text-xs text-gray-400">
            Vérifiez également votre dossier de courrier indésirable.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Courriels envoyés</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              <span className="text-gray-700">Vérification du courriel <span className="text-gray-400">(Firebase)</span></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
              <span className="text-gray-700">Confirmation de création de compte <span className="text-gray-400">(Mandrill)</span></span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => navigate('/auth/cgu')}
            icon={<ArrowRight size={16} />}
          >
            J'ai vérifié mon courriel
          </Button>
          <Button
            variant="ghost"
            fullWidth
            icon={<RefreshCw size={15} />}
          >
            Renvoyer le courriel
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
