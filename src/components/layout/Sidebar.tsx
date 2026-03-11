import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Crown,
  Receipt,
  Wrench,
  Star,
  Calendar,
  Headphones,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useScenario } from '../../context/ScenarioContext';
import { Badge } from '../ui/Badge';
import type { MembershipState } from '../../types';

type ItemState = 'visible' | 'grayed' | 'hidden';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  states: Record<'nonMember' | 'active' | 'delegate' | 'inProgress' | 'expired', ItemState>;
  badge?: (state: MembershipState) => React.ReactNode | null;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
  },
  {
    id: 'adhesion',
    label: 'Mon adhésion',
    icon: <Crown size={20} />,
    path: '/adhesion',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
    badge: (s) =>
      s === 'NON_MEMBER' ? <Badge variant="info">Adhérer</Badge> :
      s === 'MEMBER_IN_PROGRESS' ? <Badge variant="warning" dot>En cours</Badge> :
      s === 'MEMBER_EXPIRED' || s === 'MEMBER_GRACE_PERIOD' ? <Badge variant="danger" dot>Expiré</Badge> :
      null,
  },
  {
    id: 'factures',
    label: 'Mes factures',
    icon: <Receipt size={20} />,
    path: '/factures',
    states: { nonMember: 'hidden', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'hidden' },
  },
  {
    id: 'outils',
    label: 'Mes outils',
    icon: <Wrench size={20} />,
    path: '/outils',
    states: { nonMember: 'grayed', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'grayed' },
    badge: (s) =>
      s === 'NON_MEMBER' || s === 'MEMBER_EXPIRED' || s === 'MEMBER_GRACE_PERIOD'
        ? <Badge variant="neutral">Publics</Badge>
        : null,
  },
  {
    id: 'avantages',
    label: 'Avantages',
    icon: <Star size={20} />,
    path: '/avantages',
    states: { nonMember: 'hidden', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'hidden' },
  },
  {
    id: 'evenements',
    label: 'Événements & formations',
    icon: <Calendar size={20} />,
    path: '/evenements',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
    badge: () => <Badge variant="purple">À venir</Badge>,
  },
  {
    id: 'support',
    label: 'Support',
    icon: <Headphones size={20} />,
    path: '/support',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
  },
];

function getStateKey(membership: MembershipState, isPrimary: boolean): keyof NavItem['states'] {
  if (membership === 'NON_MEMBER') return 'nonMember';
  if (membership === 'MEMBER_EXPIRED' || membership === 'MEMBER_GRACE_PERIOD') return 'expired';
  if (membership === 'MEMBER_IN_PROGRESS') return 'inProgress';
  if (!isPrimary) return 'delegate';
  return 'active';
}

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scenario } = useScenario();

  const stateKey = getStateKey(scenario.membership_state, scenario.is_primary_member);
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';
  const isNonMember = scenario.membership_state === 'NON_MEMBER';

  function handleNav(path: string) {
    navigate(path);
    onClose?.();
  }

  return (
    <aside className={clsx(
      'bg-white border-r border-gray-200 flex flex-col',
      mobile ? 'w-full h-full' : 'w-64 h-[calc(100vh-96px)] sticky top-24'
    )}>
      {scenario.membership_state === 'MEMBER_IN_PROGRESS' && (
        <div className="mx-3 mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
          <p className="text-xs font-semibold text-yellow-800">Renouvellement en cours</p>
          <p className="text-[11px] text-yellow-600 mt-0.5">Accès membre maintenu</p>
          <button
            onClick={() => handleNav('/adhesion')}
            className="mt-2 w-full text-xs font-semibold text-white bg-yellow-600 hover:bg-yellow-700 rounded-md py-1.5 transition-colors active:scale-[0.98]"
          >
            Finaliser le renouvellement
          </button>
        </div>
      )}

      {isExpired && (
        <div className="mx-3 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
          <p className="text-xs font-semibold text-red-800">
            {scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          </p>
          <p className="text-[11px] text-red-600 mt-0.5">Accès restreint — paiement seulement</p>
          <button
            onClick={() => handleNav('/adhesion')}
            className="mt-2 w-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md py-1.5 transition-colors active:scale-[0.98]"
          >
            Renouveler / Payer
          </button>
        </div>
      )}

      {isNonMember && (
        <div className="mx-3 mt-3 p-3 bg-corpiq-blue-50 border border-corpiq-blue-100 rounded-lg animate-fade-in">
          <p className="text-xs font-semibold text-corpiq-blue">Accès découverte</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Certains services sont réservés aux membres</p>
          <button
            onClick={() => handleNav('/adhesion')}
            className="mt-2 w-full text-xs font-semibold text-white bg-corpiq-blue hover:bg-corpiq-blue-light rounded-md py-1.5 transition-colors active:scale-[0.98]"
          >
            Adhérer maintenant
          </button>
        </div>
      )}

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-none">
        {navItems.map((item) => {
          const state = item.states[stateKey];
          if (state === 'hidden') return null;

          const isActive = location.pathname === item.path;
          const isGrayed = state === 'grayed';
          const badge = item.badge?.(scenario.membership_state);

          return (
            <button
              key={item.id}
              onClick={() => !isGrayed && handleNav(item.path)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative',
                isActive && !isGrayed && 'bg-corpiq-blue text-white shadow-sm',
                !isActive && !isGrayed && 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100',
                isGrayed && 'text-gray-400 cursor-not-allowed opacity-50',
              )}
            >
              {isActive && !isGrayed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/40 rounded-r-full" />
              )}
              <span className={clsx(
                'flex-shrink-0 transition-colors duration-200',
                isActive && !isGrayed ? 'text-white' : isGrayed ? 'text-gray-300' : 'text-gray-400 group-hover:text-corpiq-blue'
              )}>
                {item.icon}
              </span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {isGrayed && <Lock size={12} className="text-gray-300" />}
              {badge && !isGrayed && <span className="flex-shrink-0">{badge}</span>}
              {!badge && !isGrayed && !isActive && (
                <ChevronRight size={14} className="flex-shrink-0 text-gray-300 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-200" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
