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

    if (!scenario.user_active) {
      navigate('/auth/inactive');
      return;
    }

    if (!scenario.cgu_accepted) {
      navigate('/auth/cgu');
      return;
    }

    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  function handleSSO() {
    if (!scenario.cgu_accepted) {
      navigate('/auth/cgu');
      return;
    }
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accédez à votre espace client CORPIQ"
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="Adresse courriel"
          type="email"
          placeholder="votre@courriel.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          required
        />

        <div>
          <Input
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            style={{ position: 'relative', float: 'right', marginTop: '-36px', marginRight: '8px' }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue" />
            Se souvenir de moi
          </label>
          <button
            type="button"
            onClick={() => navigate('/auth/forgot-password')}
            className="text-sm font-medium text-corpiq-accent hover:text-corpiq-accent-light transition-colors"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <Button type="submit" fullWidth size="lg">
          Se connecter
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">ou continuer avec</span>
        </div>
      </div>

      <SSOButtons onSuccess={handleSSO} />

      <p className="text-center text-sm text-gray-500 mt-8">
        Pas encore de compte ?{' '}
        <button
          onClick={() => navigate('/auth/register')}
          className="font-medium text-corpiq-accent hover:text-corpiq-accent-light transition-colors"
        >
          Créer mon compte
        </button>
      </p>
    </AuthLayout>
  );
}
