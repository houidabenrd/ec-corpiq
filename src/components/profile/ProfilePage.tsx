import { useState } from 'react';
import { ArrowLeft, Building, Shield, Bell, CreditCard, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { useScenario } from '../../context/ScenarioContext';
import { ContactSection } from './ContactSection';
import { SecuritySection } from './SecuritySection';
import { PreferencesSection } from './PreferencesSection';
import { BillingSection } from './BillingSection';
import { StatusBanner } from '../ui/StatusBanner';
import { clsx } from 'clsx';
import type { MembershipState, UserRole } from '../../types';

function getStateBadge(state: MembershipState) {
  switch (state) {
    case 'MEMBER_ACTIVE': return <Badge variant="success" dot>Membre actif</Badge>;
    case 'MEMBER_IN_PROGRESS': return <Badge variant="warning" dot>Renouvellement en cours</Badge>;
    case 'MEMBER_EXPIRED': return <Badge variant="danger" dot>Expiré</Badge>;
    case 'MEMBER_GRACE_PERIOD': return <Badge variant="danger" dot>Période de grâce</Badge>;
    default: return <Badge variant="neutral">Non-membre</Badge>;
  }
}

function getRoleLabel(role: UserRole, state: MembershipState) {
  if (state === 'NON_MEMBER') return 'Non-membre';
  switch (role) {
    case 'owner': return 'Propriétaire';
    case 'admin': return 'Administrateur';
    case 'delegate': return 'Délégué';
  }
}

type Tab = 'contact' | 'security' | 'preferences' | 'billing';

const tabs: { id: Tab; label: string; icon: React.ReactNode; requiresOwner?: boolean }[] = [
  { id: 'contact', label: 'Contact', icon: <User size={16} /> },
  { id: 'security', label: 'Sécurité', icon: <Shield size={16} /> },
  { id: 'preferences', label: 'Préférences', icon: <Bell size={16} /> },
  { id: 'billing', label: 'Facturation', icon: <CreditCard size={16} />, requiresOwner: true },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const [activeTab, setActiveTab] = useState<Tab>('contact');

  const isOwner = scenario.role === 'owner';
  const showBilling = scenario.billing_available && isOwner;
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';

  const visibleTabs = tabs.filter(t => !t.requiresOwner || showBilling);

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 animate-fade-in">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-5"
        >
          <ArrowLeft size={16} />
          Retour au tableau de bord
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-2xl flex items-center justify-center shadow-lg shadow-corpiq-blue/20">
            <span className="text-white text-lg font-bold">JT</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
              {getStateBadge(scenario.membership_state)}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {getRoleLabel(scenario.role, scenario.membership_state)} — Jean Tremblay
            </p>
          </div>
        </div>
      </div>

      {isExpired && (
        <StatusBanner
          variant="error"
          title={scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          message="Votre adhésion est expirée. Renouvelez pour retrouver l'accès complet."
          className="mb-6"
        />
      )}

      {scenario.membership_state === 'MEMBER_IN_PROGRESS' && (
        <StatusBanner
          variant="warning"
          title="Renouvellement en cours"
          message="Votre renouvellement est en traitement. Accès complet maintenu."
          className="mb-6"
        />
      )}

      <div className="flex gap-1 mb-8 bg-gray-100/80 p-1 rounded-xl overflow-x-auto">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <span className={clsx(
              'transition-colors',
              activeTab === tab.id ? 'text-corpiq-blue' : 'text-gray-400'
            )}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'contact' && <ContactSection />}
        {activeTab === 'security' && <SecuritySection />}
        {activeTab === 'preferences' && <PreferencesSection />}
        {activeTab === 'billing' && showBilling && <BillingSection />}

        {activeTab === 'billing' && !showBilling && scenario.has_organization && scenario.role !== 'owner' && (
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CreditCard size={22} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-600">Section réservée au propriétaire</p>
            <p className="text-xs text-gray-400 mt-1">
              Seul le propriétaire de l'organisation peut gérer les informations bancaires.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
