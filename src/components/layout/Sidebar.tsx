import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Crown,
  Receipt,
  Wrench,
  Star,
  Calendar,
  Headphones,
  LogOut,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useScenario } from '../../context/ScenarioContext';
import { Badge } from '../ui/Badge';
import type { MembershipState } from '../../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: React.ReactNode;
}

function getVisibleNav(state: MembershipState, isPrimary: boolean): NavItem[] {
  const isFull = state === 'MEMBER_ACTIVE' || state === 'MEMBER_IN_PROGRESS';
  const isExpired = state === 'MEMBER_EXPIRED' || state === 'MEMBER_GRACE_PERIOD';
  const isNonMember = state === 'NON_MEMBER';

  const items: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
      badge: isNonMember
        ? <Badge variant="neutral">Découverte</Badge>
        : isExpired
          ? <Badge variant="danger">Limité</Badge>
          : undefined,
    },
    {
      id: 'membership',
      label: 'Mon adhésion',
      icon: <Crown size={20} />,
      path: '/dashboard',
      badge: isNonMember
        ? <Badge variant="info">Adhérer</Badge>
        : isExpired
          ? <Badge variant="danger">Renouveler</Badge>
          : state === 'MEMBER_IN_PROGRESS'
            ? <Badge variant="warning" dot>En cours</Badge>
            : undefined,
    },
  ];

  if (isFull) {
    items.push({
      id: 'invoices',
      label: 'Mes factures',
      icon: <Receipt size={20} />,
      path: '/dashboard',
    });
  }

  items.push({
    id: 'tools',
    label: 'Mes outils',
    icon: <Wrench size={20} />,
    path: '/dashboard',
    badge: isFull
      ? <Badge variant="success">Tous</Badge>
      : <Badge variant="neutral">Publics</Badge>,
  });

  if (isFull) {
    items.push({
      id: 'benefits',
      label: 'Mes avantages membres',
      icon: <Star size={20} />,
      path: '/dashboard',
    });
  }

  items.push(
    {
      id: 'events',
      label: 'Événements & formations',
      icon: <Calendar size={20} />,
      path: '/dashboard',
    },
    {
      id: 'support',
      label: 'Support',
      icon: <Headphones size={20} />,
      path: '/dashboard',
    },
  );

  return items;
}

function getRoleName(state: MembershipState, isPrimary: boolean) {
  if (state === 'NON_MEMBER') return 'Non-membre';
  if (!isPrimary) return 'Délégué';
  return 'Membre principal';
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scenario, setIsAuthenticated } = useScenario();

  const navItems = getVisibleNav(scenario.membership_state, scenario.is_primary_member);

  const isFull = scenario.membership_state === 'MEMBER_ACTIVE' || scenario.membership_state === 'MEMBER_IN_PROGRESS';
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';
  const isNonMember = scenario.membership_state === 'NON_MEMBER';

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-40px)] sticky top-10">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-corpiq-blue rounded-xl flex items-center justify-center">
            <Building2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-corpiq-blue">EC CORPIQ</h1>
            <p className="text-xs text-gray-400">Espace Client</p>
          </div>
        </div>
      </div>

      {scenario.membership_state === 'MEMBER_IN_PROGRESS' && (
        <div className="mx-4 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs font-medium text-yellow-800">Renouvellement en cours</p>
          <p className="text-xs text-yellow-600 mt-0.5">Accès complet maintenu</p>
          <button className="text-xs text-yellow-700 font-semibold underline underline-offset-2 mt-1.5 hover:text-yellow-900">
            Finaliser le renouvellement
          </button>
        </div>
      )}

      {isExpired && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs font-medium text-red-800">
            {scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          </p>
          <p className="text-xs text-red-600 mt-0.5">Accès restreint aux services publics</p>
          <button className="text-xs text-red-700 font-semibold underline underline-offset-2 mt-1.5 hover:text-red-900">
            Renouveler maintenant
          </button>
        </div>
      )}

      {isNonMember && (
        <div className="mx-4 mt-4 p-3 bg-corpiq-blue-50 border border-corpiq-blue-100 rounded-lg">
          <p className="text-xs font-medium text-corpiq-blue">Services réservés aux membres</p>
          <p className="text-xs text-gray-500 mt-0.5">Certaines fonctionnalités sont masquées</p>
          <button className="text-xs text-corpiq-accent font-semibold underline underline-offset-2 mt-1.5 hover:text-corpiq-accent-light">
            Adhérer maintenant
          </button>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            (item.id === 'dashboard' && location.pathname === '/dashboard') ||
            (item.id === 'profile' && location.pathname === '/profile');

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'dashboard') navigate('/dashboard');
              }}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group',
                isActive
                  ? 'bg-corpiq-blue text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <span className={clsx('flex-shrink-0', isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600')}>
                {item.icon}
              </span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge || (
                <ChevronRight size={14} className={clsx(
                  'flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity',
                  isActive ? 'text-white/60' : 'text-gray-300'
                )} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={() => navigate('/profile')}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group',
            location.pathname === '/profile' ? 'bg-corpiq-blue-50' : 'hover:bg-gray-50'
          )}
        >
          <div className="w-8 h-8 bg-corpiq-blue-50 rounded-full flex items-center justify-center">
            <UserCircle size={18} className="text-corpiq-blue" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900">Jean Tremblay</p>
            <p className="text-xs text-gray-400">{getRoleName(scenario.membership_state, scenario.is_primary_member)}</p>
          </div>
          <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-400" />
        </button>

        <button
          onClick={() => { setIsAuthenticated(false); navigate('/auth/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors mt-1"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
