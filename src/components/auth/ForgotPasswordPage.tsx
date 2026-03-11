import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout
        title="Courriel envoyé"
        subtitle="Vérifiez votre boîte de réception"
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-green-50 rounded-2xl flex items-center justify-center">
            <CheckCircle size={36} className="text-green-600" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              Si un compte existe avec l'adresse <strong className="text-gray-900">{email}</strong>,
              vous recevrez un courriel contenant les instructions pour réinitialiser votre mot de passe.
            </p>
            <p className="text-sm text-gray-500">
              Ce courriel est envoyé par Firebase Authentication.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              Un seul message est affiché, que le courriel existe ou non dans notre système,
              pour des raisons de sécurité.
            </p>
          </div>

          <Button
            variant="ghost"
            fullWidth
            onClick={() => navigate('/auth/login')}
            icon={<ArrowLeft size={16} />}
          >
            Retour à la connexion
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Entrez votre adresse courriel pour recevoir un lien de réinitialisation"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Adresse courriel"
          type="email"
          placeholder="votre@courriel.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          required
        />

        <Button type="submit" fullWidth size="lg" icon={<Send size={18} />}>
          Envoyer le lien de réinitialisation
        </Button>
      </form>

      <button
        onClick={() => navigate('/auth/login')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-6 mx-auto transition-colors"
      >
        <ArrowLeft size={16} />
        Retour à la connexion
      </button>
    </AuthLayout>
  );
}
