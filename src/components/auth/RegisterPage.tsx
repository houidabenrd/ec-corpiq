import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, CreditCard, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { StatusBanner } from '../ui/StatusBanner';
import { SSOButtons } from './SSOButtons';

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState('');
  const [step, setStep] = useState<'form' | 'validating' | 'done'>('form');

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (isMember && !cardNumber.trim()) {
      setCardError('Le numéro de carte membre est requis');
      return;
    }
    if (isMember) {
      setStep('validating');
      setTimeout(() => { setStep('done'); navigate('/auth/verify-email'); }, 1500);
    } else {
      navigate('/auth/verify-email');
    }
  }

  return (
    <AuthLayout title="Créer un compte" subtitle="Rejoignez l'espace client CORPIQ">
      {step === 'validating' && (
        <div className="mb-6 animate-fade-in">
          <StatusBanner variant="info" message="Validation de votre carte membre en cours via AMS..." />
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Prénom" placeholder="Jean" icon={<User size={16} />} required />
          <Input label="Nom" placeholder="Tremblay" required />
        </div>

        <Input
          label="Adresse courriel"
          type="email"
          placeholder="votre@courriel.com"
          icon={<Mail size={16} />}
          required
        />

        <Input
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          placeholder="Minimum 8 caractères"
          icon={<Lock size={16} />}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          required
        />

        <div className="pt-2">
          <label className="block text-[13px] font-semibold text-gray-600 mb-3 tracking-wide">
            Êtes-vous membre CORPIQ ?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setIsMember(true); setCardError(''); }}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                isMember === true
                  ? 'border-corpiq-blue bg-corpiq-blue-50 text-corpiq-blue ring-2 ring-corpiq-blue/10'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Oui, je suis membre
            </button>
            <button
              type="button"
              onClick={() => { setIsMember(false); setCardError(''); setCardNumber(''); }}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                isMember === false
                  ? 'border-corpiq-blue bg-corpiq-blue-50 text-corpiq-blue ring-2 ring-corpiq-blue/10'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Non, pas encore
            </button>
          </div>
        </div>

        {isMember && (
          <div className="animate-fade-in">
            <Input
              label="Numéro de carte membre"
              placeholder="Ex: CORP-2024-XXXXX"
              value={cardNumber}
              onChange={(e) => { setCardNumber(e.target.value); setCardError(''); }}
              icon={<CreditCard size={16} />}
              error={cardError}
              hint="Votre numéro figure sur votre carte membre ou dans votre courriel de bienvenue"
            />
          </div>
        )}

        {isMember === false && (
          <div className="animate-fade-in">
            <StatusBanner variant="info" message="Vous pourrez découvrir nos services et adhérer à tout moment depuis votre espace." />
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" fullWidth size="lg" disabled={isMember === null} loading={step === 'validating'}>
            {step === 'validating' ? 'Validation en cours...' : 'Créer mon compte'}
          </Button>
        </div>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-corpiq-light text-gray-400 font-medium">ou continuer avec</span>
        </div>
      </div>

      <SSOButtons onSuccess={() => navigate('/auth/cgu')} />

      <p className="text-center text-sm text-gray-500 mt-8">
        Déjà un compte ?{' '}
        <button
          onClick={() => navigate('/auth/login')}
          className="font-semibold text-corpiq-accent hover:text-corpiq-accent-light transition-colors"
        >
          Se connecter
        </button>
      </p>
    </AuthLayout>
  );
}
