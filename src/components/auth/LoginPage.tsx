import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useScenario } from '../../context/ScenarioContext';
import { SSOButtons } from './SSOButtons';

export function LoginPage() {
  const navigate = useNavigate();
  const { scenario, setIsAuthenticated } = useScenario();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!scenario.user_active) { navigate('/auth/inactive'); return; }
    if (!scenario.cgu_accepted) { navigate('/auth/cgu'); return; }
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  function handleSSO() {
    if (!scenario.cgu_accepted) { navigate('/auth/cgu'); return; }
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  return (
    <AuthLayout title="Connexion" subtitle="Accédez à votre espace client CORPIQ">
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="Adresse courriel"
          type="email"
          placeholder="votre@courriel.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={16} />}
          required
        />

        <Input
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer select-none hover:text-gray-800 transition-colors group">
            <input type="checkbox" className="rounded accent-corpiq-blue" />
            <span className="font-medium">Se souvenir de moi</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/auth/forgot-password')}
            className="text-sm font-semibold text-corpiq-accent hover:text-corpiq-accent-light transition-colors"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <Button type="submit" fullWidth size="lg">
          Se connecter
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-corpiq-light text-gray-400 font-medium">ou continuer avec</span>
        </div>
      </div>

      <SSOButtons onSuccess={handleSSO} />

      <p className="text-center text-sm text-gray-500 mt-8">
        Pas encore de compte ?{' '}
        <button
          onClick={() => navigate('/auth/register')}
          className="font-semibold text-corpiq-accent hover:text-corpiq-accent-light transition-colors"
        >
          Créer mon compte
        </button>
      </p>
    </AuthLayout>
  );
}
