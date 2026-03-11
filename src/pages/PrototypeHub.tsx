import { useNavigate } from 'react-router-dom';
import {
  Building2,
  UserX,
  UserCheck,
  RefreshCw,
  AlertTriangle,
  Clock,
  Users,
  Ban,
  ArrowRight,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useScenario } from '../context/ScenarioContext';

const personas = [
  {
    presetIndex: 0,
    icon: <UserX size={24} />,
    color: 'from-gray-500 to-gray-600',
    border: 'border-gray-200 hover:border-gray-400',
    tag: 'Non-membre',
    title: 'Non-membre',
    description: 'Utilisateur sans adhésion CORPIQ. Accès découverte limité aux outils publics.',
    details: [
      'Tableau de bord en mode découverte',
      'Menu restreint (outils publics uniquement)',
      'CTA "Adhérer maintenant" visible partout',
      'Profil : informations personnelles seulement',
      'Pas de section organisation ni facturation',
    ],
  },
  {
    presetIndex: 1,
    icon: <UserCheck size={24} />,
    color: 'from-green-500 to-green-600',
    border: 'border-green-200 hover:border-green-400',
    tag: 'Membre actif',
    title: 'Membre actif (principal)',
    description: 'Membre principal avec adhésion valide. Accès complet à tous les services.',
    details: [
      'Menu complet (factures, avantages, outils premium)',
      'Profil : organisation modifiable + facturation',
      'Cartes bancaires visibles et modifiables',
      'Aucun badge ni restriction',
    ],
  },
  {
    presetIndex: 2,
    icon: <Users size={24} />,
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-200 hover:border-emerald-400',
    tag: 'Délégué',
    title: 'Délégué',
    description: 'Rattaché à une organisation, mais pas le membre principal.',
    details: [
      'Menu complet comme le membre actif',
      'Profil : organisation en lecture seule',
      '"Seul le membre principal peut modifier"',
      'Pas de section informations bancaires',
    ],
  },
  {
    presetIndex: 3,
    icon: <RefreshCw size={24} />,
    color: 'from-yellow-500 to-amber-500',
    border: 'border-yellow-200 hover:border-yellow-400',
    tag: 'En renouvellement',
    title: 'En renouvellement',
    description: 'Renouvellement en cours. Accès complet maintenu sans restriction.',
    details: [
      'Badge "Renouvellement en cours" visible',
      'CTA "Finaliser le renouvellement"',
      'Accès complet maintenu (aucun blocage)',
      'Profil complet avec facturation',
    ],
  },
  {
    presetIndex: 4,
    icon: <AlertTriangle size={24} />,
    color: 'from-red-500 to-red-600',
    border: 'border-red-200 hover:border-red-400',
    tag: 'Expiré',
    title: 'Expiré',
    description: 'Adhésion expirée. Accès restreint, services premium masqués.',
    details: [
      'Badge "Adhésion expirée" visible',
      'Factures, avantages et outils premium masqués',
      'CTA "Renouveler / Payer"',
      'Profil : facturation visible pour mise à jour',
    ],
  },
  {
    presetIndex: 5,
    icon: <Clock size={24} />,
    color: 'from-orange-500 to-orange-600',
    border: 'border-orange-200 hover:border-orange-400',
    tag: 'Période de grâce',
    title: 'Période de grâce',
    description: 'Même comportement que expiré. Accès limité au renouvellement.',
    details: [
      'Même restrictions que "Expiré"',
      'Badge "Période de grâce"',
      'CTA "Renouveler / Payer"',
      'Profil : facturation visible pour mise à jour',
    ],
  },
  {
    presetIndex: 6,
    icon: <Ban size={24} />,
    color: 'from-gray-700 to-gray-900',
    border: 'border-gray-300 hover:border-gray-500',
    tag: 'Inactif',
    title: 'Utilisateur inactif',
    description: 'Compte désactivé. Aucun accès aux modules.',
    details: [
      'Menu entièrement désactivé',
      'Message "Compte désactivé"',
      'Redirection vers page de support',
    ],
  },
];

export function PrototypeHub() {
  const navigate = useNavigate();
  const { setPresetIndex, setIsAuthenticated } = useScenario();

  function handleSelectPersona(presetIndex: number) {
    setPresetIndex(presetIndex);
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-corpiq-blue-50 via-white to-gray-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-corpiq-blue rounded-xl flex items-center justify-center shadow-sm">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-corpiq-blue text-lg">EC CORPIQ</h1>
              <p className="text-xs text-gray-400">Prototype visuel — Espace Client</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setIsAuthenticated(false); navigate('/auth/login'); }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-corpiq-blue bg-corpiq-blue-50 rounded-lg hover:bg-corpiq-blue-100 active:bg-corpiq-blue/10 transition-all"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Voir la connexion</span>
            </button>
            <button
              onClick={() => { setIsAuthenticated(false); navigate('/auth/register'); }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-corpiq-blue rounded-lg hover:bg-corpiq-blue-light active:bg-corpiq-blue-dark transition-all shadow-sm"
            >
              <UserPlus size={16} />
              <span className="hidden sm:inline">Voir l'inscription</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900">Sélectionnez un profil utilisateur</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Chaque carte représente un type d'utilisateur. Cliquez pour voir le menu de navigation
            et le profil adaptés à ce cas.
          </p>
        </div>

        <div className="mb-8 bg-white rounded-xl border border-gray-200 p-5 shadow-card animate-fade-in">
          <h3 className="font-semibold text-gray-900 mb-3">3 modules du prototype</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: '1', t: 'Inscription & Connexion', d: '6 workflows : inscription membre/non-membre, connexion classique/SSO, mot de passe oublié, CGU' },
              { n: '2', t: 'Menu de navigation', d: '5 scénarios : non-membre, membre actif, en renouvellement, expiré/grâce, inactif' },
              { n: '3', t: 'Profil', d: '12 scénarios : contact, sécurité, préférences, facturation selon le rôle' },
            ].map((m) => (
              <div key={m.n} className="flex items-start gap-3 p-3 bg-corpiq-blue-50/50 rounded-lg">
                <span className="w-7 h-7 bg-corpiq-blue text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">{m.n}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{m.t}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {personas.map((p, idx) => (
            <div
              key={p.presetIndex}
              className={`bg-white rounded-xl border-2 ${p.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up`}
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'backwards' }}
            >
              <div className={`bg-gradient-to-r ${p.color} p-4 rounded-t-[10px] flex items-center gap-3 text-white`}>
                <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  {p.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                    {p.tag}
                  </span>
                  <h3 className="font-bold mt-1">{p.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{p.description}</p>

                <ul className="space-y-2 mb-5">
                  {p.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPersona(p.presetIndex)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${p.color} hover:opacity-90 active:opacity-80 transition-all active:scale-[0.98] shadow-sm`}
                >
                  Voir l'expérience
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
