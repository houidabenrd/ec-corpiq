import { useState } from 'react';
import { Key, Link2, Link2Off, AlertTriangle, ShieldCheck, ShieldAlert, CheckCircle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';
import { Modal } from '../ui/Modal';
import { useScenario } from '../../context/ScenarioContext';
import { clsx } from 'clsx';

function MethodCard({
  icon,
  name,
  subtitle,
  linked,
  isLastMethod,
  onLink,
  onUnlink,
}: {
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  linked: boolean;
  isLastMethod: boolean;
  onLink?: () => void;
  onUnlink?: () => void;
}) {
  return (
    <div className={clsx(
      'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
      linked ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50/50 border-gray-100'
    )}>
      <div className={clsx(
        'w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm flex-shrink-0',
        linked ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-100'
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          {linked ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              <CheckCircle size={10} />
              Actif
            </span>
          ) : (
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              Non lié
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex-shrink-0">
        {linked ? (
          <Button
            variant="outline"
            size="sm"
            icon={<Link2Off size={13} />}
            disabled={isLastMethod}
            onClick={onUnlink}
          >
            Dissocier
          </Button>
        ) : (
          <Button variant="outline" size="sm" icon={<Link2 size={13} />} onClick={onLink}>
            Associer
          </Button>
        )}
      </div>
    </div>
  );
}

export function SecuritySection() {
  const { scenario } = useScenario();
  const [confirmDisconnect, setConfirmDisconnect] = useState<string | null>(null);

  const linkedCount =
    (scenario.has_password_auth ? 1 : 0) +
    (scenario.google_linked ? 1 : 0) +
    (scenario.microsoft_linked ? 1 : 0);

  const isLastMethod = linkedCount <= 1;

  return (
    <>
      <Card>
        <CardHeader
          title="Sécurité & connexions"
          subtitle="Gérez vos méthodes de connexion"
          icon={<ShieldCheck size={18} />}
        />

        {!scenario.has_password_auth && (
          <StatusBanner
            variant="info"
            message="Connexion via fournisseur externe uniquement. Aucun mot de passe associé à ce compte."
            className="mb-5"
          />
        )}

        {isLastMethod && (
          <StatusBanner
            variant="warning"
            message="Vous devez conserver au moins une méthode de connexion active."
            className="mb-5"
          />
        )}

        <div className="space-y-3">
          <div className={clsx(
            'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
            scenario.has_password_auth ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50/50 border-gray-100'
          )}>
            <div className={clsx(
              'w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm flex-shrink-0',
              scenario.has_password_auth ? 'bg-corpiq-blue-50 border-corpiq-blue-100' : 'bg-gray-100 border-gray-100'
            )}>
              <Key size={18} className={scenario.has_password_auth ? 'text-corpiq-blue' : 'text-gray-400'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">Mot de passe</p>
                {scenario.has_password_auth ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <CheckCircle size={10} />
                    Actif
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                    Non défini
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {scenario.has_password_auth ? 'Dernière modification il y a 30 jours' : 'Aucun mot de passe défini'}
              </p>
            </div>
            {scenario.has_password_auth && (
              <Button variant="outline" size="sm">Changer</Button>
            )}
          </div>

          <MethodCard
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            }
            name="Google"
            subtitle={scenario.google_linked ? 'Compte Google associé' : 'Associer votre compte Google'}
            linked={scenario.google_linked}
            isLastMethod={isLastMethod}
            onUnlink={() => setConfirmDisconnect('Google')}
          />

          <MethodCard
            icon={
              <svg width="18" height="18" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
            }
            name="Microsoft"
            subtitle={scenario.microsoft_linked ? 'Compte Microsoft associé' : 'Associer votre compte Microsoft'}
            linked={scenario.microsoft_linked}
            isLastMethod={isLastMethod}
            onUnlink={() => setConfirmDisconnect('Microsoft')}
          />
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
          <ShieldAlert size={13} />
          <span>Interdiction de dissocier la dernière méthode de connexion</span>
        </div>
      </Card>

      <Modal
        open={!!confirmDisconnect}
        onClose={() => setConfirmDisconnect(null)}
        title="Confirmer la dissociation"
        size="sm"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Dissocier {confirmDisconnect} ?
              </p>
              <p className="text-sm text-amber-700 mt-1">
                Vous ne pourrez plus utiliser ce compte pour vous connecter à votre espace client.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setConfirmDisconnect(null)}>
              Annuler
            </Button>
            <Button variant="danger" fullWidth onClick={() => setConfirmDisconnect(null)}>
              Confirmer la dissociation
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
