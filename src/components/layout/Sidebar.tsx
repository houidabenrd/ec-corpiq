import { useState } from 'react';
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
  ChevronDown,
  Lock,
  Percent,
  Calculator,
  FileText,
  MonitorSmartphone,
  Scale,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useScenario } from '../../context/ScenarioContext';
import { Badge } from '../ui/Badge';
import type { MembershipState, UserRole } from '../../types';

type ItemState = 'visible' | 'grayed' | 'hidden';
type StateMap = Record<'nonMember' | 'active' | 'delegate' | 'inProgress' | 'expired', ItemState>;

interface SubItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  states: StateMap;
  badge?: (state: MembershipState) => React.ReactNode | null;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: <LayoutDashboard size={18} />,
    path: '/dashboard',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
  },
  {
    id: 'adhesion',
    label: 'Mon adhésion',
    icon: <Crown size={18} />,
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
    icon: <Receipt size={18} />,
    path: '/factures',
    states: { nonMember: 'hidden', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'hidden' },
  },
  {
    id: 'outils',
    label: 'Mes outils',
    icon: <Wrench size={18} />,
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
    icon: <Star size={18} />,
    path: '/avantages',
    states: { nonMember: 'hidden', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'hidden' },
    children: [
      { id: 'rabais', label: 'Rabais partenaire', icon: <Percent size={15} />, path: '/avantages/rabais' },
      { id: 'calculateur', label: 'Calculateur de loyer', icon: <Calculator size={15} />, path: '/avantages/calculateur' },
      { id: 'modeles', label: 'Modèles de lettre', icon: <FileText size={15} />, path: '/avantages/modeles' },
    ],
  },
  {
    id: 'evenements',
    label: 'Événements & formations',
    icon: <Calendar size={18} />,
    path: '/evenements',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
    badge: () => <Badge variant="purple">À venir</Badge>,
  },
  {
    id: 'support',
    label: 'Support',
    icon: <Headphones size={18} />,
    path: '/support',
    states: { nonMember: 'visible', active: 'visible', delegate: 'visible', inProgress: 'visible', expired: 'visible' },
    children: [
      { id: 'support-technique', label: 'Support technique', icon: <MonitorSmartphone size={15} />, path: '/support/technique' },
      { id: 'support-juridique', label: 'Support juridique', icon: <Scale size={15} />, path: '/support/juridique' },
    ],
  },
];

function getStateKey(membership: MembershipState, role: UserRole): keyof StateMap {
  if (membership === 'NON_MEMBER') return 'nonMember';
  if (membership === 'MEMBER_EXPIRED' || membership === 'MEMBER_GRACE_PERIOD') return 'expired';
  if (membership === 'MEMBER_IN_PROGRESS') return 'inProgress';
  if (role === 'delegate') return 'delegate';
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

  const stateKey = getStateKey(scenario.membership_state, scenario.role);
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';
  const isNonMember = scenario.membership_state === 'NON_MEMBER';

  const initialOpen: string[] = [];
  for (const item of navItems) {
    if (item.children?.some((c) => location.pathname === c.path)) {
      initialOpen.push(item.id);
    }
  }

  const [openSections, setOpenSections] = useState<string[]>(initialOpen);

  function toggleSection(id: string) {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleNav(path: string) {
    navigate(path);
    onClose?.();
  }

  function isChildActive(item: NavItem) {
    return item.children?.some((c) => location.pathname === c.path) ?? false;
  }

  return (
    <aside className={clsx(
      'bg-white flex flex-col',
      mobile ? 'w-full h-full' : 'w-60 h-[calc(100vh-96px)] sticky top-24 border-r border-gray-100'
    )}>
      {scenario.membership_state === 'MEMBER_IN_PROGRESS' && (
        <div className="mx-3 mt-3 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl animate-fade-in">
          <p className="text-xs font-bold text-amber-800">Renouvellement en cours</p>
          <p className="text-[11px] text-amber-600 mt-0.5">Accès membre maintenu</p>
          <button
            onClick={() => handleNav('/adhesion')}
            className="mt-2.5 w-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg py-2 transition-all active:scale-[0.98] shadow-sm"
          >
            Finaliser le renouvellement
          </button>
        </div>
      )}

      {isExpired && (
        <div className="mx-3 mt-3 p-3.5 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-xl animate-fade-in">
          <p className="text-xs font-bold text-red-800">
            {scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          </p>
          <p className="text-[11px] text-red-600 mt-0.5">Accès restreint — paiement seulement</p>
          <button
            onClick={() => handleNav('/adhesion')}
            className="mt-2.5 w-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg py-2 transition-all active:scale-[0.98] shadow-sm"
          >
            Renouveler / Payer
          </button>
        </div>
      )}

      {isNonMember && (
        <div className="mx-3 mt-3 p-3.5 bg-gradient-to-r from-corpiq-blue-50 to-blue-50 border border-corpiq-blue-100 rounded-xl animate-fade-in">
          <p className="text-xs font-bold text-corpiq-blue">Accès découverte</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Certains services sont réservés aux membres</p>
          <button
            onClick={() => handleNav('/adhesion')}
            className="mt-2.5 w-full text-xs font-bold text-white bg-gradient-to-r from-corpiq-blue to-corpiq-blue-light hover:opacity-90 rounded-lg py-2 transition-all active:scale-[0.98] shadow-sm"
          >
            Adhérer maintenant
          </button>
        </div>
      )}

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-none">
        {navItems.map((item) => {
          const state = item.states[stateKey];
          if (state === 'hidden') return null;

          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openSections.includes(item.id);
          const isActive = location.pathname === item.path && !hasChildren;
          const isParentActive = hasChildren && isChildActive(item);
          const isGrayed = state === 'grayed';
          const badge = item.badge?.(scenario.membership_state);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (isGrayed) return;
                  if (hasChildren) {
                    toggleSection(item.id);
                  } else {
                    handleNav(item.path);
                  }
                }}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150 group relative',
                  (isActive || isParentActive) && !isGrayed && 'bg-corpiq-blue text-white font-semibold shadow-sm',
                  !(isActive || isParentActive) && !isGrayed && 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  isGrayed && 'text-gray-400 cursor-not-allowed opacity-40',
                )}
              >
                <span className={clsx(
                  'flex-shrink-0 transition-colors duration-150',
                  (isActive || isParentActive) && !isGrayed ? 'text-white' : isGrayed ? 'text-gray-300' : 'text-gray-400 group-hover:text-corpiq-blue'
                )}>
                  {item.icon}
                </span>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {isGrayed && <Lock size={11} className="text-gray-300" />}
                {badge && !isGrayed && !hasChildren && <span className="flex-shrink-0">{badge}</span>}
                {hasChildren && !isGrayed && (
                  <ChevronDown
                    size={14}
                    className={clsx(
                      'flex-shrink-0 transition-transform duration-200',
                      (isActive || isParentActive) ? 'text-white/50' : 'text-gray-400',
                      isOpen && 'rotate-180'
                    )}
                  />
                )}
                {!badge && !isGrayed && !hasChildren && !isActive && (
                  <ChevronRight size={14} className="flex-shrink-0 text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                )}
              </button>

              {hasChildren && isOpen && !isGrayed && (
                <div className="ml-5 pl-3 border-l-2 border-gray-100 mt-0.5 mb-1 space-y-0.5 animate-fade-in">
                  {item.children!.map((child) => {
                    const isChildItemActive = location.pathname === child.path;
                    return (
                      <button
                        key={child.id}
                        onClick={() => handleNav(child.path)}
                        className={clsx(
                          'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-all duration-150 group',
                          isChildItemActive
                            ? 'bg-corpiq-blue-50 text-corpiq-blue font-semibold'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        )}
                      >
                        <span className={clsx(
                          'flex-shrink-0 transition-colors',
                          isChildItemActive ? 'text-corpiq-blue' : 'text-gray-400 group-hover:text-gray-500'
                        )}>
                          {child.icon}
                        </span>
                        <span className="flex-1 text-left">{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-[10px] font-bold">JT</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">Jean Tremblay</p>
            <p className="text-[10px] text-gray-400 truncate">jean.tremblay@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
