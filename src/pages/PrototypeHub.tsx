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
  Shield,
  Navigation,
  UserCircle,
} from 'lucide-react';
import { useScenario } from '../context/ScenarioContext';

const personas = [
  {
    presetIndex: 0,
    icon: <UserX size={22} />,
    color: 'from-slate-500 to-slate-600',
    iconBg: 'bg-slate-100 text-slate-600',
    tag: 'Non-membre',
    title: 'Non-membre',
    description: 'Utilisateur sans adhésion CORPIQ. Accès découverte limité aux outils publics.',
    details: [
      'Tableau de bord en mode découverte',
      'Menu restreint (outils publics uniquement)',
      'CTA « Adhérer maintenant » visible',
      'Profil : informations personnelles seulement',
    ],
  },
  {
    presetIndex: 1,
    icon: <UserCheck size={22} />,
    color: 'from-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-100 text-emerald-600',
    tag: 'Propriétaire',
    title: 'Propriétaire (owner)',
    description: 'Membre principal unique. Accès complet : organisation, facturation, invitations.',
    details: [
      'Menu complet (factures, avantages, outils)',
      'Organisation modifiable + section bancaire',
      'Peut inviter des admins et délégués',
      'Rôle unique par organisation',
    ],
  },
  {
    presetIndex: 2,
    icon: <Shield size={22} />,
    color: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100 text-blue-600',
    tag: 'Admin',
    title: 'Administrateur',
    description: 'Même accès organisation que le propriétaire, sans la section bancaire.',
    details: [
      'Organisation modifiable + invitations',
      'Pas de section informations bancaires',
      'Peut inviter des admins et délégués',
      'Profil personnel modifiable',
    ],
  },
  {
    presetIndex: 3,
    icon: <Users size={22} />,
    color: 'from-teal-500 to-teal-600',
    iconBg: 'bg-teal-100 text-teal-600',
    tag: 'Délégué',
    title: 'Délégué',
    description: 'Rattaché à une organisation. Accès limité au profil personnel.',
    details: [
      'Organisation en lecture seule',
      'Pas de bancaire, pas d\'invitation',
      'Profil personnel modifiable',
    ],
  },
  {
    presetIndex: 4,
    icon: <RefreshCw size={22} />,
    color: 'from-amber-500 to-amber-600',
    iconBg: 'bg-amber-100 text-amber-600',
    tag: 'En renouvellement',
    title: 'En renouvellement',
    description: 'Renouvellement en cours. Accès complet maintenu sans restriction.',
    details: [
      'Badge « Renouvellement en cours » visible',
      'CTA « Finaliser le renouvellement »',
      'Accès complet maintenu (aucun blocage)',
    ],
  },
  {
    presetIndex: 5,
    icon: <AlertTriangle size={22} />,
    color: 'from-red-500 to-red-600',
    iconBg: 'bg-red-100 text-red-600',
    tag: 'Expiré',
    title: 'Expiré',
    description: 'Adhésion expirée. Accès restreint, services premium masqués.',
    details: [
      'Badge « Adhésion expirée » visible',
      'Factures, avantages masqués',
      'CTA « Renouveler / Payer »',
    ],
  },
  {
    presetIndex: 6,
    icon: <Clock size={22} />,
    color: 'from-orange-500 to-orange-600',
    iconBg: 'bg-orange-100 text-orange-600',
    tag: 'Période de grâce',
    title: 'Période de grâce',
    description: 'Même comportement que expiré. Accès limité au renouvellement.',
    details: [
      'Même restrictions que « Expiré »',
      'Badge « Période de grâce »',
      'CTA « Renouveler / Payer »',
    ],
  },
  {
    presetIndex: 7,
    icon: <Ban size={22} />,
    color: 'from-gray-600 to-gray-800',
    iconBg: 'bg-gray-100 text-gray-600',
    tag: 'Inactif',
    title: 'Utilisateur inactif',
    description: 'Compte désactivé. Aucun accès aux modules.',
    details: [
      'Menu entièrement désactivé',
      'Message « Compte désactivé »',
      'Redirection vers page de support',
    ],
  },
];

const modules = [
  { icon: <Shield size={18} />, t: 'Inscription & Connexion', d: '6 workflows : inscription, connexion classique/SSO, mot de passe oublié, vérification courriel' },
  { icon: <Navigation size={18} />, t: 'Menu de navigation', d: 'Menu dynamique selon état membre et rôle (propriétaire, admin, délégué)' },
  { icon: <UserCircle size={18} />, t: 'Profil utilisateur', d: '4 sections : contact, sécurité, préférences, facturation — droits par rôle' },
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
    <div className="min-h-screen bg-corpiq-light">
      <header className="glass border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-corpiq-blue rounded-xl flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-corpiq-blue text-base leading-tight">EC CORPIQ</h1>
              <p className="text-[11px] text-gray-400 font-medium">Prototype — Espace Client</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setIsAuthenticated(false); navigate('/auth/login'); }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-corpiq-blue bg-corpiq-blue-50 rounded-xl hover:bg-corpiq-blue-100 active:scale-[0.98] transition-all"
            >
              <LogIn size={15} />
              <span className="hidden sm:inline">Connexion</span>
            </button>
            <button
              onClick={() => { setIsAuthenticated(false); navigate('/auth/register'); }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-corpiq-blue rounded-xl hover:bg-corpiq-blue-light active:scale-[0.98] transition-all shadow-sm"
            >
              <UserPlus size={15} />
              <span className="hidden sm:inline">Inscription</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-corpiq-blue-50 text-corpiq-blue text-xs font-semibold rounded-lg mb-4">
            <span className="w-1.5 h-1.5 bg-corpiq-blue rounded-full animate-pulse-soft" />
            Prototype interactif
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-balance">
            Sélectionnez un profil utilisateur
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-[15px] leading-relaxed">
            Chaque carte représente un type d'utilisateur. Cliquez pour explorer le menu de navigation et le profil adaptés.
          </p>
        </div>

        <div className="mb-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-card animate-fade-in">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">3 modules du prototype</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {modules.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-corpiq-blue-50 text-corpiq-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  {m.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{m.t}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((p, idx) => (
            <div
              key={p.presetIndex}
              className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}
            >
              <div className={`bg-gradient-to-r ${p.color} px-5 py-4 flex items-center gap-3 text-white`}>
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  {p.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    {p.tag}
                  </span>
                  <h3 className="font-bold text-[15px] leading-tight">{p.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{p.description}</p>

                <ul className="space-y-2 mb-5">
                  {p.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-500">
                      <span className="w-1 h-1 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPersona(p.presetIndex)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  }}
                >
                  <span className={`bg-gradient-to-r ${p.color} bg-clip-text text-transparent`} style={{ color: 'white' }}>
                    Voir l'expérience
                  </span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
