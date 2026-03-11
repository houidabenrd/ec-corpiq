import { Shield, Key, Link2, Link2Off, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';
import { useScenario } from '../../context/ScenarioContext';

export function SecuritySection() {
  const { scenario } = useScenario();

  const linkedCount =
    (scenario.has_password_auth ? 1 : 0) +
    (scenario.google_linked ? 1 : 0) +
    (scenario.microsoft_linked ? 1 : 0);

  const isLastMethod = linkedCount <= 1;

  return (
    <Card>
      <CardHeader
        title="Sécurité & connexions"
        subtitle="Gérez vos méthodes de connexion"
        badge={<Badge variant="info"><Shield size={12} /> Sécurité</Badge>}
      />

      {!scenario.has_password_auth && (
        <div className="mb-6">
          <StatusBanner
            variant="info"
            message="Connexion via fournisseur externe uniquement. Aucun mot de passe n'est associé à ce compte."
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
              <Key size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Mot de passe</p>
              <p className="text-xs text-gray-500">
                {scenario.has_password_auth ? 'Mot de passe défini' : 'Aucun mot de passe'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {scenario.has_password_auth ? (
              <>
                <Badge variant="success" dot>Actif</Badge>
                <Button variant="outline" size="sm">
                  Changer mon mot de passe
                </Button>
              </>
            ) : (
              <Badge variant="neutral">Non défini</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
              <svg width="20" height="20" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Google</p>
              <p className="text-xs text-gray-500">
                {scenario.google_linked ? 'Compte Google lié' : 'Non lié'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {scenario.google_linked ? (
              <>
                <Badge variant="success" dot>Lié</Badge>
                {isLastMethod && scenario.google_linked ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled icon={<Link2Off size={14} />}>
                      Dissocier
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" icon={<Link2Off size={14} />}>
                    Dissocier
                  </Button>
                )}
              </>
            ) : (
              <>
                <Badge variant="neutral">Non lié</Badge>
                <Button variant="outline" size="sm" icon={<Link2 size={14} />}>
                  Associer Google
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
              <svg width="20" height="20" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Microsoft</p>
              <p className="text-xs text-gray-500">
                {scenario.microsoft_linked ? 'Compte Microsoft lié' : 'Non lié'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {scenario.microsoft_linked ? (
              <>
                <Badge variant="success" dot>Lié</Badge>
                {isLastMethod && scenario.microsoft_linked ? (
                  <Button variant="outline" size="sm" disabled icon={<Link2Off size={14} />}>
                    Dissocier
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" icon={<Link2Off size={14} />}>
                    Dissocier
                  </Button>
                )}
              </>
            ) : (
              <>
                <Badge variant="neutral">Non lié</Badge>
                <Button variant="outline" size="sm" icon={<Link2 size={14} />}>
                  Associer Microsoft
                </Button>
              </>
            )}
          </div>
        </div>

        {isLastMethod && (
          <div className="mt-2">
            <StatusBanner
              variant="warning"
              message="Vous devez conserver au moins une méthode de connexion. Ajoutez une autre méthode avant de pouvoir dissocier celle-ci."
            />
          </div>
        )}
      </div>
    </Card>
  );
}
