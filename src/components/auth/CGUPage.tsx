import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, LogOut } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';
import { useScenario } from '../../context/ScenarioContext';

export function CGUPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useScenario();
  const [accepted, setAccepted] = useState(false);

  function handleAccept() {
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  function handleRefuse() {
    setIsAuthenticated(false);
    navigate('/auth/login');
  }

  return (
    <AuthLayout
      title="Conditions générales d'utilisation"
      subtitle="Veuillez lire et accepter les CGU pour continuer"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-corpiq-blue-50 rounded-xl">
          <Shield size={24} className="text-corpiq-blue flex-shrink-0" />
          <p className="text-sm text-corpiq-blue">
            L'acceptation des CGU est obligatoire pour accéder à l'espace client.
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">CGU — Version 2.1</span>
            <span className="text-xs text-gray-400 ml-auto">Mise à jour : 15 janvier 2026</span>
          </div>
          <div className="p-4 h-64 overflow-y-auto text-sm text-gray-600 space-y-4 leading-relaxed">
            <p className="font-medium text-gray-900">1. Objet</p>
            <p>
              Les présentes conditions générales d'utilisation (CGU) régissent l'accès et l'utilisation
              de la plateforme EC CORPIQ, ci-après dénommée "le Portail", mise à disposition par la
              Corporation des propriétaires immobiliers du Québec (CORPIQ).
            </p>
            <p className="font-medium text-gray-900">2. Acceptation des conditions</p>
            <p>
              L'utilisation du Portail implique l'acceptation pleine et entière des présentes CGU.
              Si vous n'acceptez pas ces conditions, vous ne pourrez pas accéder aux services proposés.
            </p>
            <p className="font-medium text-gray-900">3. Services proposés</p>
            <p>
              Le Portail offre un ensemble de services en ligne destinés aux propriétaires immobiliers,
              incluant mais non limité à : la gestion de profil, l'accès aux outils de calcul, la
              consultation d'événements et formations, et la gestion de l'adhésion.
            </p>
            <p className="font-medium text-gray-900">4. Protection des données personnelles</p>
            <p>
              CORPIQ s'engage à protéger les données personnelles de ses utilisateurs conformément à
              la Loi 25 sur la protection des renseignements personnels. Les données collectées sont
              utilisées uniquement dans le cadre des services offerts.
            </p>
            <p className="font-medium text-gray-900">5. Responsabilité</p>
            <p>
              L'utilisateur est responsable de la confidentialité de ses identifiants de connexion
              et de toute activité effectuée sous son compte.
            </p>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
            J'ai lu et j'accepte les conditions générales d'utilisation de la plateforme EC CORPIQ
          </span>
        </label>

        <div className="flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleRefuse}
            icon={<LogOut size={16} />}
          >
            Refuser et quitter
          </Button>
          <Button
            fullWidth
            disabled={!accepted}
            onClick={handleAccept}
          >
            Accepter et continuer
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
