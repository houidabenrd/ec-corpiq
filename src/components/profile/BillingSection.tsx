import { CreditCard, Plus, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';
import { useScenario } from '../../context/ScenarioContext';
import { clsx } from 'clsx';

function VisualCard({
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
  const gradients: Record<string, string> = {
    Visa: 'from-[#1a1f71] to-[#2c3e9e]',
    Mastercard: 'from-[#1a1a2e] to-[#434370]',
  };

  return (
    <div className="relative group">
      <div className={clsx(
        'relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5',
        gradients[brand] || 'from-gray-700 to-gray-900'
      )}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              Carte {type}
            </span>
            <div className="flex items-center gap-2">
              {status === 'expiring' && (
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Expire bientôt
                </span>
              )}
              {status === 'expired' && (
                <span className="text-[10px] font-bold bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-400/30">
                  Expirée
                </span>
              )}
              {brand === 'Visa' ? (
                <span className="text-lg font-bold italic tracking-tight text-white/80">VISA</span>
              ) : (
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 bg-red-500 rounded-full opacity-90" />
                  <div className="w-5 h-5 bg-amber-500 rounded-full opacity-90" />
                </div>
              )}
            </div>
          </div>

          <p className="text-lg font-mono tracking-[0.2em] text-white/90 mb-5">
            •••• •••• •••• {last4}
          </p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Titulaire</p>
              <p className="text-sm font-semibold text-white/80">Jean Tremblay</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Expiration</p>
              <p className={clsx(
                'text-sm font-semibold',
                status === 'expired' ? 'text-red-300' : status === 'expiring' ? 'text-amber-300' : 'text-white/80'
              )}>
                {expiry}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-end">
        <Button variant="outline" size="sm" icon={<ExternalLink size={13} />}>
          Mettre à jour
        </Button>
      </div>
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
        subtitle="Cartes enregistrées dans votre espace client"
        badge={isExpired ? <Badge variant="danger" dot>Attention requise</Badge> : undefined}
        icon={<CreditCard size={18} />}
      />

      {isExpired && (
        <StatusBanner
          variant="warning"
          title={scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          message="Veuillez mettre à jour vos informations de paiement pour continuer."
          className="mb-5"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {scenario.has_primary_card ? (
          <VisualCard
            type="Primaire"
            brand="Visa"
            last4="4532"
            expiry="12/27"
            status="ok"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <CreditCard size={22} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-600">Aucune carte primaire</p>
            <p className="text-xs text-gray-400 mt-1 mb-4 text-center">Ajoutez une carte pour gérer votre adhésion</p>
            <Button size="sm" icon={<Plus size={14} />}>Ajouter une carte</Button>
          </div>
        )}

        {scenario.has_primary_card && scenario.has_secondary_card ? (
          <VisualCard
            type="Secondaire"
            brand="Mastercard"
            last4="8901"
            expiry="03/26"
            status={isExpired ? 'expired' : 'expiring'}
          />
        ) : scenario.has_primary_card ? (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <Plus size={22} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-600">Carte secondaire</p>
            <p className="text-xs text-gray-400 mt-1 mb-4 text-center">Optionnelle — carte de secours</p>
            <Button variant="outline" size="sm" icon={<Plus size={14} />}>Ajouter</Button>
          </div>
        ) : null}
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
        <Button fullWidth icon={<ExternalLink size={15} />}>
          Mettre à jour mes informations bancaires
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={13} />
          <span>Redirection sécurisée vers Moneris — Aucune donnée bancaire stockée sur notre plateforme</span>
        </div>
      </div>
    </Card>
  );
}
