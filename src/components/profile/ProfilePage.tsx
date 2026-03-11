import { ArrowLeft, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { useScenario } from '../../context/ScenarioContext';
import { ContactSection } from './ContactSection';
import { SecuritySection } from './SecuritySection';
import { PreferencesSection } from './PreferencesSection';
import { BillingSection } from './BillingSection';
import { StatusBanner } from '../ui/StatusBanner';

function getMembershipBadge(state: string) {
  switch (state) {
    case 'MEMBER_ACTIVE':
      return <Badge variant="success" dot>Membre actif</Badge>;
    case 'MEMBER_IN_PROGRESS':
      return <Badge variant="warning" dot>Renouvellement en cours</Badge>;
    case 'MEMBER_EXPIRED':
      return <Badge variant="danger" dot>Adhésion expirée</Badge>;
    case 'MEMBER_GRACE_PERIOD':
      return <Badge variant="danger" dot>Période de grâce</Badge>;
    default:
      return <Badge variant="neutral">Non-membre</Badge>;
  }
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { scenario } = useScenario();

  const showBilling = scenario.billing_available && scenario.is_primary_member;

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-corpiq-blue-50 rounded-full flex items-center justify-center">
              <UserCircle size={28} className="text-corpiq-blue" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
                {getMembershipBadge(scenario.membership_state)}
              </div>
              <p className="text-sm text-gray-500">
                {scenario.is_primary_member ? 'Membre principal' : scenario.has_organization ? 'Délégué' : 'Utilisateur'} — Jean Tremblay
              </p>
            </div>
          </div>
        </div>
      </div>

      {(scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD') && (
        <div className="mb-6">
          <StatusBanner
            variant="error"
            title={scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
            message="Votre adhésion est expirée. Veuillez renouveler pour retrouver l'accès complet à tous les services."
          />
        </div>
      )}

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center text-corpiq-blue text-sm font-bold">A</span>
            Contact
          </h2>
          <ContactSection />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center text-corpiq-blue text-sm font-bold">B</span>
            Sécurité & connexions
          </h2>
          <SecuritySection />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center text-corpiq-blue text-sm font-bold">C</span>
            Préférences & consentements
          </h2>
          <PreferencesSection />
        </section>

        {showBilling && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-corpiq-blue-50 rounded-lg flex items-center justify-center text-corpiq-blue text-sm font-bold">D</span>
              Informations bancaires
            </h2>
            <BillingSection />
          </section>
        )}
      </div>
    </div>
  );
}
