import { CreditCard, Plus, ExternalLink, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';
import { useScenario } from '../../context/ScenarioContext';

function CardDisplay({
  type,
  brand,
  last4,
  expiry,
  status,
}: {
  type: 'Primaire' | 'Secondaire';
  brand: string;
  last4: string;
  expiry: string;
  status: 'ok' | 'expiring' | 'expired';
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-14 h-9 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-lg flex items-center justify-center shadow-sm">
          <CreditCard size={16} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">Carte {type}</p>
            <span className="text-xs text-gray-400 font-medium">{brand}</span>
            {status === 'expiring' && <Badge variant="warning" dot>Expire bientôt</Badge>}
            {status === 'expired' && <Badge variant="danger" dot>Expirée</Badge>}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">
            •••• •••• •••• {last4} — Exp. {expiry}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" icon={<ExternalLink size={13} />}>
        Mettre à jour
      </Button>
    </div>
  );
}

export function BillingSection() {
  const { scenario } = useScenario();

  if (!scenario.billing_available || scenario.role !== 'owner') return null;

  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';

  return (
    <Card>
      <CardHeader
        title="Informations bancaires"
        subtitle="Cartes bancaires enregistrées dans l'EC"
        badge={isExpired ? <Badge variant="danger" dot>Attention requise</Badge> : undefined}
        icon={<CreditCard size={18} />}
      />

      {isExpired && (
        <StatusBanner
          variant="warning"
          title={scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          message="Carte expirée — Veuillez mettre à jour vos informations de paiement."
          className="mb-5"
        />
      )}

      <p className="text-xs text-gray-400 mb-4">
        La saisie de carte ne se fait jamais dans le portail. Flow : EC → backend → Moneris.
      </p>

      <div className="space-y-3">
        {scenario.has_primary_card ? (
          <CardDisplay
            type="Primaire"
            brand="Visa"
            last4="4532"
            expiry="12/27"
            status="ok"
          />
        ) : (
          <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
            <CreditCard size={24} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-600">Aucune carte enregistrée</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">Ajoutez une carte pour gérer votre adhésion</p>
            <Button size="sm" icon={<Plus size={14} />}>Ajouter une carte primaire</Button>
          </div>
        )}

        {scenario.has_primary_card && scenario.has_secondary_card ? (
          <CardDisplay
            type="Secondaire"
            brand="Mastercard"
            last4="8901"
            expiry="03/26"
            status={isExpired ? 'expired' : 'expiring'}
          />
        ) : scenario.has_primary_card ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="flex items-center gap-3">
              <AlertTriangle size={15} className="text-gray-400" />
              <p className="text-sm text-gray-500">Aucune carte secondaire enregistrée (optionnelle)</p>
            </div>
            <Button variant="outline" size="sm" icon={<Plus size={13} />}>Ajouter</Button>
          </div>
        ) : null}
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100">
        <Button fullWidth icon={<ExternalLink size={15} />}>
          Mettre à jour mes informations bancaires
        </Button>
        <p className="text-[11px] text-gray-400 mt-2 text-center">
          Redirection vers Moneris (session sécurisée)
        </p>
      </div>
    </Card>
  );
}
