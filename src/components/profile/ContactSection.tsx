import { useState } from 'react';
import { Building, User, MapPin, Phone, Mail, Home, Save, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StatusBanner } from '../ui/StatusBanner';
import { Badge } from '../ui/Badge';
import { useScenario } from '../../context/ScenarioContext';

export function ContactSection() {
  const { scenario } = useScenario();
  const [useOrgAddress, setUseOrgAddress] = useState(false);

  const showOrganization = scenario.has_organization;
  const orgReadOnly = !scenario.organization_editable;

  return (
    <div className="space-y-6">
      {showOrganization && (
        <Card>
          <CardHeader
            title="Informations de l'organisation"
            subtitle={
              orgReadOnly
                ? 'Seul le membre principal peut modifier ces informations'
                : 'Détails de votre organisation membre'
            }
            badge={
              orgReadOnly ? (
                <Badge variant="neutral">Lecture seule</Badge>
              ) : undefined
            }
          />

          {!scenario.ams_available && (
            <div className="mb-6">
              <StatusBanner
                variant="warning"
                title="Service temporairement indisponible"
                message="Certaines informations de votre organisation sont temporairement indisponibles."
              />
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Nom de l'organisation"
              defaultValue={scenario.ams_available ? 'Immeubles Tremblay Inc.' : ''}
              placeholder={scenario.ams_available ? '' : 'Non renseigné'}
              readOnly={orgReadOnly}
              icon={<Building size={18} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Courriel de l'organisation"
                type="email"
                defaultValue={scenario.ams_available ? 'contact@immeubles-tremblay.ca' : ''}
                placeholder={scenario.ams_available ? '' : 'Non renseigné'}
                readOnly={orgReadOnly}
                icon={<Mail size={18} />}
              />
              <Input
                label="Téléphone de l'organisation"
                type="tel"
                defaultValue={scenario.ams_available ? '(514) 555-0123' : ''}
                placeholder={scenario.ams_available ? '' : 'Non renseigné'}
                readOnly={orgReadOnly}
                icon={<Phone size={18} />}
              />
            </div>

            <Input
              label="Adresse de facturation"
              defaultValue={scenario.ams_available ? '1234 Rue Saint-Denis, Montréal, QC H2X 3J8' : ''}
              placeholder={scenario.ams_available ? '' : 'Non renseigné'}
              readOnly={orgReadOnly}
              icon={<MapPin size={18} />}
              hint="Adresse validée via Google Places"
            />

            <Input
              label="Nombre de logements"
              type="number"
              defaultValue={scenario.ams_available ? '42' : ''}
              placeholder={scenario.ams_available ? '' : 'Non renseigné'}
              readOnly={orgReadOnly}
              icon={<Home size={18} />}
            />

            {!orgReadOnly && (
              <div className="flex justify-end pt-2">
                <Button icon={<Save size={16} />}>
                  Enregistrer les modifications
                </Button>
              </div>
            )}

            {orgReadOnly && (
              <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                <AlertTriangle size={14} />
                <span>Seul le membre principal peut modifier les informations de l'organisation.</span>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card>
        <CardHeader
          title="Informations personnelles"
          subtitle="Vos coordonnées personnelles"
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              defaultValue="Jean"
              icon={<User size={18} />}
            />
            <Input
              label="Nom"
              defaultValue="Tremblay"
            />
          </div>

          <Input
            label="Téléphone cellulaire"
            type="tel"
            defaultValue="(514) 555-9876"
            icon={<Phone size={18} />}
          />

          {showOrganization && (
            <label className="flex items-center gap-3 cursor-pointer select-none group p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={useOrgAddress}
                onChange={(e) => setUseOrgAddress(e.target.checked)}
                className="rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                Utiliser la même adresse que l'organisation
              </span>
            </label>
          )}

          <Input
            label="Adresse"
            defaultValue={useOrgAddress ? '1234 Rue Saint-Denis, Montréal, QC H2X 3J8' : '5678 Avenue du Parc, Montréal, QC H2V 4E6'}
            readOnly={useOrgAddress}
            icon={<MapPin size={18} />}
            hint="Adresse validée via Google Places"
          />

          <div className="flex justify-end pt-2">
            <Button icon={<Save size={16} />}>
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
