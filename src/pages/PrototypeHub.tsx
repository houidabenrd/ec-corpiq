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
  Sparkles,
} from 'lucide-react';
import { useScenario } from '../context/ScenarioContext';
import { clsx } from 'clsx';

const personas = [
  {
    presetIndex: 0,
    icon: <UserX size={22} />,
    color: 'from-slate-500 to-slate-600',
    ring: 'ring-slate-500/20',
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
    ring: 'ring-emerald-500/20',
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
    ring: 'ring-blue-500/20',
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
    ring: 'ring-teal-500/20',
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
    ring: 'ring-amber-500/20',
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
    ring: 'ring-red-500/20',
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
    ring: 'ring-orange-500/20',
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
    ring: 'ring-gray-500/20',
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
  { icon: <Shield size={20} />, t: 'Inscription & Connexion', d: '6 workflows : inscription, connexion classique/SSO, mot de passe oublié, vérification courriel', color: 'from-blue-500 to-blue-600' },
  { icon: <Navigation size={20} />, t: 'Menu de navigation', d: 'Menu dynamique selon état membre et rôle (propriétaire, admin, délégué)', color: 'from-violet-500 to-violet-600' },
  { icon: <UserCircle size={20} />, t: 'Profil utilisateur', d: '4 sections : contact, sécurité, préférences, facturation — droits par rôle', color: 'from-emerald-500 to-emerald-600' },
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
            <div className="w-9 h-9 bg-corpiq-blue rounded-xl flex items-center justify-center shadow-lg shadow-corpiq-blue/20">
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
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-corpiq-blue bg-corpiq-blue-50 rounded-xl hover:bg-corpiq-blue-100 active:scale-[0.98] transition-all"
            >
              <LogIn size={15} />
              <span className="hidden sm:inline">Connexion</span>
            </button>
            <button
              onClick={() => { setIsAuthenticated(false); navigate('/auth/register'); }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-corpiq-blue rounded-xl hover:bg-corpiq-blue-light active:scale-[0.98] transition-all shadow-lg shadow-corpiq-blue/20"
            >
              <UserPlus size={15} />
              <span className="hidden sm:inline">Inscription</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-corpiq-blue-50 text-corpiq-blue text-xs font-semibold rounded-full mb-5">
            <Sparkles size={13} />
            Prototype interactif
          </div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Sélectionnez un profil
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Chaque carte représente un type d'utilisateur. Cliquez pour explorer le menu et le profil adaptés.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          {modules.map((m, i) => (
            <div key={i} className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
              <div className={clsx('w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center text-white shadow-sm mb-3', m.color)}>
                {m.icon}
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{m.t}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p, idx) => (
            <button
              key={p.presetIndex}
              onClick={() => handleSelectPersona(p.presetIndex)}
              className={clsx(
                'group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-left animate-fade-in-up overflow-hidden',
                `ring-0 hover:ring-4 ${p.ring}`
              )}
              style={{ animationDelay: `${idx * 40}ms`, animationFillMode: 'backwards' }}
            >
              <div className={clsx('bg-gradient-to-r px-4 py-3.5 flex items-center gap-3 text-white', p.color)}>
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 block">
                    {p.tag}
                  </span>
                  <h3 className="font-bold text-[13px] leading-tight truncate">{p.title}</h3>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{p.description}</p>

                <ul className="space-y-1.5 mb-4">
                  {p.details.slice(0, 3).map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                      <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                      <span className="line-clamp-1">{d}</span>
                    </li>
                  ))}
                </ul>

                <div className={clsx(
                  'flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r text-white shadow-sm transition-all group-hover:shadow-md',
                  p.color
                )}>
                  Voir l'expérience
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
