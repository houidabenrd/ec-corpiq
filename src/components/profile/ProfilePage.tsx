import { ArrowLeft, Building, Shield, Bell, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { useScenario } from '../../context/ScenarioContext';
import { ContactSection } from './ContactSection';
import { SecuritySection } from './SecuritySection';
import { PreferencesSection } from './PreferencesSection';
import { BillingSection } from './BillingSection';
import { StatusBanner } from '../ui/StatusBanner';
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
    case 'admin': return 'Admin';
    case 'delegate': return 'Délégué';
  }
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { scenario } = useScenario();

  const isOwner = scenario.role === 'owner';
  const showBilling = scenario.billing_available && isOwner;
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">JT</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-gray-900">Mon profil</h1>
              {getStateBadge(scenario.membership_state)}
            </div>
            <p className="text-sm text-gray-500">
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

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center">
              <Building size={16} className="text-corpiq-blue" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Contact</h2>
          </div>
          <ContactSection />
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-corpiq-blue" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Sécurité & connexions</h2>
          </div>
          <SecuritySection />
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center">
              <Bell size={16} className="text-corpiq-blue" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Préférences & consentements</h2>
          </div>
          <PreferencesSection />
        </section>

        {showBilling && (
          <section>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center">
                <CreditCard size={16} className="text-corpiq-blue" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Informations bancaires</h2>
            </div>
            <BillingSection />
          </section>
        )}

        {!showBilling && scenario.has_organization && scenario.role !== 'owner' && (
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              {scenario.role === 'admin'
                ? 'Section informations bancaires masquée pour les administrateurs. Seul le propriétaire peut gérer les cartes de paiement.'
                : 'Section informations bancaires masquée pour les délégués. Seul le propriétaire peut gérer les cartes de paiement.'}
            </p>
          </div>
        )}

        {!showBilling && !scenario.has_organization && (
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Section informations bancaires masquée pour les non-membres.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
