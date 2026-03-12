import { useState } from 'react';
import { Building, User, MapPin, Phone, Mail, Home, Save, Info, UserPlus, X, Send } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StatusBanner } from '../ui/StatusBanner';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { useScenario } from '../../context/ScenarioContext';
import type { UserRole } from '../../types';

function getRoleBadge(role: UserRole) {
  switch (role) {
    case 'owner': return <Badge variant="success">Propriétaire</Badge>;
    case 'admin': return <Badge variant="info">Admin</Badge>;
    case 'delegate': return <Badge variant="neutral">Délégué</Badge>;
  }
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case 'owner': return 'Propriétaire';
    case 'admin': return 'Admin';
    case 'delegate': return 'Délégué';
  }
}

const DEMO_USERS = [
  { name: 'Jean Tremblay', email: 'jean.tremblay@email.com', role: 'owner' as UserRole },
  { name: 'Marie Gagnon', email: 'marie.gagnon@email.com', role: 'admin' as UserRole },
  { name: 'Pierre Dubois', email: 'pierre.dubois@email.com', role: 'delegate' as UserRole },
];

export function ContactSection() {
  const { scenario } = useScenario();
  const [useOrgAddress, setUseOrgAddress] = useState(false);
  const [orgSaved, setOrgSaved] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'delegate'>('delegate');
  const [inviteSent, setInviteSent] = useState(false);

  const showOrganization = scenario.has_organization;
  const canEditOrg = scenario.role === 'owner' || scenario.role === 'admin';
  const canInvite = scenario.role === 'owner' || scenario.role === 'admin';

  function handleInvite() {
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteOpen(false);
      setInviteEmail('');
      setInviteRole('delegate');
    }, 2000);
  }

  return (
    <div className="space-y-6">
      {showOrganization && (
        <Card>
          <CardHeader
            title="Organisation"
            subtitle={canEditOrg ? 'Informations de votre organisation membre' : undefined}
            badge={!canEditOrg ? <Badge variant="neutral">Lecture seule</Badge> : undefined}
            icon={<Building size={18} />}
          />

          {!canEditOrg && (
            <div className="mb-5">
              <StatusBanner
                variant="info"
                message="Seuls le propriétaire et les administrateurs peuvent modifier les informations de l'organisation."
              />
            </div>
          )}

          {!scenario.ams_available && (
            <div className="mb-5">
              <StatusBanner
                variant="warning"
                title="Service temporairement indisponible"
                message="Certaines informations de votre organisation sont temporairement indisponibles."
              />
            </div>
          )}

          {orgSaved && (
            <div className="mb-5 animate-fade-in">
              <StatusBanner variant="success" message="Vos informations ont été mises à jour." />
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Nom de l'organisation"
              defaultValue={scenario.ams_available ? 'Immeubles Tremblay Inc.' : ''}
              placeholder={!scenario.ams_available ? 'Non renseigné' : ''}
              readOnly={!canEditOrg}
              icon={<Building size={16} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Courriel de l'organisation"
                type="email"
                defaultValue={scenario.ams_available ? 'contact@immeubles-tremblay.ca' : ''}
                placeholder={!scenario.ams_available ? 'Non renseigné' : ''}
                readOnly={!canEditOrg}
                icon={<Mail size={16} />}
              />
              <Input
                label="Téléphone de l'organisation"
                type="tel"
                defaultValue={scenario.ams_available ? '(514) 555-0123' : ''}
                placeholder={!scenario.ams_available ? 'Non renseigné' : ''}
                readOnly={!canEditOrg}
                icon={<Phone size={16} />}
              />
            </div>
            <Input
              label="Adresse de facturation"
              defaultValue={scenario.ams_available ? '1234 Rue Saint-Denis, Montréal, QC H2X 3J8' : ''}
              placeholder={!scenario.ams_available ? 'Non renseigné' : ''}
              readOnly={!canEditOrg}
              icon={<MapPin size={16} />}
              hint="Adresse saisie via Google Places"
            />
            <Input
              label="Nombre d'unités"
              type="number"
              defaultValue={scenario.ams_available ? '42' : ''}
              placeholder={!scenario.ams_available ? 'Non renseigné' : ''}
              readOnly
              icon={<Home size={16} />}
              hint="Ce champ n'est pas modifiable"
            />

            {canEditOrg && (
              <div className="flex items-center justify-between pt-2">
                {canInvite && (
                  <Button
                    variant="outline"
                    icon={<UserPlus size={15} />}
                    onClick={() => setInviteOpen(true)}
                  >
                    Inviter un utilisateur
                  </Button>
                )}
                <div className={canInvite ? '' : 'ml-auto'}>
                  <Button icon={<Save size={15} />} onClick={() => { setOrgSaved(true); setTimeout(() => setOrgSaved(false), 3000); }}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            )}

            {canInvite && showOrganization && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Utilisateurs de l'organisation</p>
                <div className="space-y-2">
                  {DEMO_USERS.map((u) => (
                    <div key={u.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white text-[10px] font-bold">
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                      {getRoleBadge(u.role)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card>
        <CardHeader
          title="Utilisateur"
          subtitle="Vos informations personnelles"
          icon={<User size={18} />}
          badge={getRoleBadge(scenario.role)}
        />

        {userSaved && (
          <div className="mb-5 animate-fade-in">
            <StatusBanner variant="success" message="Vos informations ont été mises à jour." />
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Prénom" defaultValue="Jean" icon={<User size={16} />} />
            <Input label="Nom" defaultValue="Tremblay" />
          </div>

          <Input
            label="Téléphone cellulaire"
            type="tel"
            defaultValue="(514) 555-9876"
            icon={<Phone size={16} />}
          />

          {showOrganization && (
            <label className="flex items-center gap-3 cursor-pointer select-none p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100/80 transition-all">
              <input
                type="checkbox"
                checked={useOrgAddress}
                onChange={(e) => setUseOrgAddress(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 font-medium">Utiliser la même adresse que l'organisation</span>
            </label>
          )}

          <Input
            label="Adresse"
            defaultValue={useOrgAddress ? '1234 Rue Saint-Denis, Montréal, QC H2X 3J8' : '5678 Avenue du Parc, Montréal, QC H2V 4E6'}
            readOnly={useOrgAddress}
            icon={<MapPin size={16} />}
            hint="Adresse saisie via Google Places"
          />

          <div className="flex items-start gap-2 text-xs text-gray-400 pt-1">
            <Info size={13} className="flex-shrink-0 mt-0.5" />
            <span>Modifiable par : propriétaire, admin, délégué</span>
          </div>

          <div className="flex justify-end pt-2">
            <Button icon={<Save size={15} />} onClick={() => { setUserSaved(true); setTimeout(() => setUserSaved(false), 3000); }}>
              Enregistrer
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        open={inviteOpen}
        onClose={() => { setInviteOpen(false); setInviteSent(false); setInviteEmail(''); }}
        title="Inviter un utilisateur"
        size="sm"
      >
        <div className="space-y-5">
          {inviteSent ? (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-14 h-14 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                <Send size={24} className="text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Invitation envoyée</p>
              <p className="text-xs text-gray-500 mt-1">Un courriel a été envoyé à {inviteEmail}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                Invitez un utilisateur à rejoindre votre organisation par courriel.
              </p>

              <Input
                label="Adresse courriel"
                type="email"
                placeholder="utilisateur@email.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                icon={<Mail size={16} />}
              />

              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-2.5 tracking-wide">
                  Rôle attribué
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInviteRole('admin')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      inviteRole === 'admin'
                        ? 'border-corpiq-blue bg-corpiq-blue-50 ring-2 ring-corpiq-blue/10'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className={`text-sm font-semibold ${inviteRole === 'admin' ? 'text-corpiq-blue' : 'text-gray-700'}`}>
                      Admin
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Peut modifier l'organisation et inviter</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInviteRole('delegate')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      inviteRole === 'delegate'
                        ? 'border-corpiq-blue bg-corpiq-blue-50 ring-2 ring-corpiq-blue/10'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className={`text-sm font-semibold ${inviteRole === 'delegate' ? 'text-corpiq-blue' : 'text-gray-700'}`}>
                      Délégué
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Profil personnel uniquement</p>
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5">
                  <Info size={11} />
                  Le rôle propriétaire est unique et ne peut pas être attribué par invitation.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" fullWidth onClick={() => setInviteOpen(false)} icon={<X size={15} />}>
                  Annuler
                </Button>
                <Button fullWidth onClick={handleInvite} disabled={!inviteEmail.trim()} icon={<Send size={15} />}>
                  Envoyer l'invitation
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
