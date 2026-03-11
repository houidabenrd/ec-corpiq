import { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';

export function PreferencesSection() {
  const [saved, setSaved] = useState(false);

  const preferences = [
    { id: 'comm', label: 'Communications CORPIQ', desc: 'Recevoir les communications officielles de CORPIQ', checked: true },
    { id: 'newsletter', label: 'Infolettre', desc: 'Recevoir l\'infolettre périodique', checked: true },
    { id: 'partners', label: 'Partenaires', desc: 'Recevoir les offres de nos partenaires', checked: false },
    { id: 'admin', label: 'Notifications administratives', desc: 'Recevoir les notifications liées à votre compte', checked: true },
  ];

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Préférences de communication"
          subtitle="Synchronisées avec Mailchimp via le backend"
          badge={<Badge variant="purple">Loi 25</Badge>}
        />

        {saved && (
          <StatusBanner variant="success" message="Vos informations ont été mises à jour." className="mb-5" />
        )}

        <div className="space-y-3">
          {preferences.map((pref) => (
            <label
              key={pref.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <input
                type="checkbox"
                defaultChecked={pref.checked}
                className="mt-0.5 rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{pref.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 mt-4">
          Le front gère : affichage, édition, sauvegarde. La synchronisation avec Mailchimp est gérée par le backend.
        </p>

        <div className="flex justify-end pt-4">
          <Button icon={<Save size={16} />} onClick={handleSave}>
            Enregistrer mes préférences
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Conditions générales d'utilisation"
          badge={<Badge variant="success">Acceptées</Badge>}
        />
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Version</p>
              <p className="text-sm text-gray-900 mt-1">2.1</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Date d'acceptation</p>
              <p className="text-sm text-gray-900 mt-1">15 janvier 2026</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-corpiq-accent hover:text-corpiq-accent-light font-medium transition-colors">
              Consulter les CGU complètes
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
