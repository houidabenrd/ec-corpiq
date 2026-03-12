import { useState } from 'react';
import { Save, Bell, Mail, Newspaper, Handshake, ShieldCheck, ExternalLink } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBanner } from '../ui/StatusBanner';
import { clsx } from 'clsx';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out',
        checked ? 'bg-corpiq-blue' : 'bg-gray-200'
      )}
    >
      <span
        className={clsx(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out mt-0.5',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

export function PreferencesSection() {
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({
    comm: true,
    newsletter: true,
    partners: false,
  });

  const preferences = [
    {
      id: 'comm' as const,
      label: 'Communications CORPIQ',
      desc: 'Recevoir les communications officielles de CORPIQ',
      icon: <Mail size={18} />,
      color: 'text-corpiq-blue bg-corpiq-blue-50',
    },
    {
      id: 'newsletter' as const,
      label: 'Infolettre',
      desc: 'Recevoir l\'infolettre périodique avec les actualités du marché',
      icon: <Newspaper size={18} />,
      color: 'text-violet-600 bg-violet-50',
    },
    {
      id: 'partners' as const,
      label: 'Offres partenaires',
      desc: 'Recevoir les offres exclusives de nos partenaires',
      icon: <Handshake size={18} />,
      color: 'text-amber-600 bg-amber-50',
    },
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
          subtitle="Gérez vos préférences de communication"
          badge={<Badge variant="purple">Loi 25</Badge>}
          icon={<Bell size={18} />}
        />

        {saved && (
          <StatusBanner variant="success" message="Vos préférences ont été mises à jour." className="mb-5 animate-fade-in" />
        )}

        <div className="space-y-3">
          {preferences.map((pref) => (
            <div
              key={pref.id}
              className={clsx(
                'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
                prefs[pref.id]
                  ? 'bg-white border-gray-200 shadow-sm'
                  : 'bg-gray-50/50 border-gray-100'
              )}
            >
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', pref.color)}>
                {pref.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={clsx(
                  'text-sm font-semibold transition-colors',
                  prefs[pref.id] ? 'text-gray-900' : 'text-gray-500'
                )}>
                  {pref.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{pref.desc}</p>
              </div>
              <Toggle
                checked={prefs[pref.id]}
                onChange={(v) => setPrefs({ ...prefs, [pref.id]: v })}
              />
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5">
          <ShieldCheck size={12} />
          Synchronisation Mailchimp gérée par le backend
        </p>

        <div className="flex justify-end pt-4">
          <Button icon={<Save size={15} />} onClick={handleSave}>
            Enregistrer mes préférences
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Conditions générales d'utilisation"
          badge={<Badge variant="success">Acceptées</Badge>}
        />
        <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Version</p>
              <p className="text-lg text-gray-900 mt-1 font-bold">2.1</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Acceptées le</p>
              <p className="text-lg text-gray-900 mt-1 font-bold">15 jan. 2026</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm text-corpiq-accent hover:text-corpiq-accent-light font-semibold transition-colors inline-flex items-center gap-1.5">
              Consulter les CGU complètes
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
