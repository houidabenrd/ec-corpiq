import { CreditCard, Plus, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';
import { useScenario } from '../../context/ScenarioContext';

function CardDisplay({
  type,
  last4,
  expiry,
  isExpired,
}: {
  type: 'Primaire' | 'Secondaire';
  last4: string;
  expiry: string;
  isExpired: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-8 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-md flex items-center justify-center">
          <CreditCard size={18} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">Carte {type}</p>
            {isExpired && <Badge variant="danger" dot>Expirée</Badge>}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            •••• •••• •••• {last4} — Exp. {expiry}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" icon={<RefreshCw size={14} />}>
          Mettre à jour
        </Button>
        {type === 'Secondaire' && (
          <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} className="text-red-500 hover:text-red-700 hover:bg-red-50">
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );
}

export function BillingSection() {
  const { scenario } = useScenario();

  if (!scenario.billing_available || !scenario.is_primary_member) {
    return null;
  }

  const isExpiredOrGrace =
    scenario.membership_state === 'MEMBER_EXPIRED' ||
    scenario.membership_state === 'MEMBER_GRACE_PERIOD';

  return (
    <Card>
      <CardHeader
        title="Informations bancaires"
        subtitle="Gérez vos cartes de paiement"
        badge={
          isExpiredOrGrace ? (
            <Badge variant="danger" dot>Attention requise</Badge>
          ) : undefined
        }
      />

      {isExpiredOrGrace && (
        <div className="mb-6">
          <StatusBanner
            variant="warning"
            title={scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
            message="Votre adhésion est expirée ou en période de grâce. Veuillez mettre à jour vos informations de paiement."
            action={
              <Button size="sm" variant="secondary">
                Renouveler
              </Button>
            }
          />
        </div>
      )}

      <div className="space-y-4">
        {scenario.has_primary_card ? (
          <CardDisplay
            type="Primaire"
            last4="4532"
            expiry="12/27"
            isExpired={false}
          />
        ) : (
          <div className="p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
            <CreditCard size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600">Aucune carte enregistrée</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">Ajoutez une carte pour gérer votre adhésion</p>
            <Button size="sm" icon={<Plus size={14} />}>
              Ajouter une carte primaire
            </Button>
          </div>
        )}

        {scenario.has_primary_card && scenario.has_secondary_card ? (
          <CardDisplay
            type="Secondaire"
            last4="8901"
            expiry="03/26"
            isExpired={isExpiredOrGrace}
          />
        ) : scenario.has_primary_card ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="flex items-center gap-3">
              <AlertTriangle size={16} className="text-gray-400" />
              <p className="text-sm text-gray-500">Aucune carte secondaire enregistrée</p>
            </div>
            <Button variant="outline" size="sm" icon={<Plus size={14} />}>
              Ajouter une carte secondaire
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
