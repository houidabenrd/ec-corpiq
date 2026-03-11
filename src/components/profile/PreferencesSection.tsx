import { Settings, FileText, Save } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function PreferencesSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Préférences Loi 25"
          subtitle="Gestion de vos préférences de confidentialité"
          badge={<Badge variant="purple"><Settings size={12} /> Loi 25</Badge>}
        />

        <div className="space-y-4">
          <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Communications marketing</p>
              <p className="text-xs text-gray-500 mt-1">
                J'accepte de recevoir des communications marketing et promotionnelles de CORPIQ
              </p>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Notifications par courriel</p>
              <p className="text-xs text-gray-500 mt-1">
                Recevoir des notifications par courriel concernant mes services et mon compte
              </p>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              className="mt-0.5 rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Partage avec partenaires</p>
              <p className="text-xs text-gray-500 mt-1">
                J'accepte le partage de mes données avec les partenaires sélectionnés de CORPIQ
              </p>
            </div>
          </label>

          <div className="flex justify-end pt-2">
            <Button icon={<Save size={16} />}>
              Enregistrer mes préférences
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Conditions générales d'utilisation"
          subtitle="Version acceptée de vos CGU"
          badge={<Badge variant="success"><FileText size={12} /> Acceptées</Badge>}
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
