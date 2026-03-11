import { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { useScenario } from '../context/ScenarioContext';
import { scenarioPresets } from '../data/scenarios';

export function ScenarioSwitcher() {
  const { presetIndex, setPresetIndex, scenario, setScenario } = useScenario();
  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currentPreset = scenarioPresets[presetIndex];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {expanded && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-corpiq-blue to-corpiq-blue-light p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Sélecteur de scénarios</h3>
                <p className="text-white/70 text-xs mt-0.5">Prototype EC CORPIQ</p>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          <div className="p-3 max-h-[60vh] overflow-y-auto">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide px-2 mb-2">
              Profils prédéfinis
            </p>
            <div className="space-y-1">
              {scenarioPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPresetIndex(idx)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all',
                    idx === presetIndex
                      ? 'bg-corpiq-blue-50 border border-corpiq-blue-100'
                      : 'hover:bg-gray-50'
                  )}
                >
                  <span className={clsx('w-3 h-3 rounded-full flex-shrink-0', preset.color)} />
                  <div className="min-w-0">
                    <p className={clsx(
                      'text-sm font-medium truncate',
                      idx === presetIndex ? 'text-corpiq-blue' : 'text-gray-700'
                    )}>
                      {preset.label}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{preset.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-3 py-2 mt-3 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span>Options avancées</span>
              {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showAdvanced && (
              <div className="px-3 pb-2 space-y-2 animate-fade-in">
                {([
                  ['cgu_accepted', 'CGU acceptées'],
                  ['user_active', 'Utilisateur actif'],
                  ['is_primary_member', 'Membre principal'],
                  ['has_password_auth', 'Mot de passe'],
                  ['google_linked', 'Google lié'],
                  ['microsoft_linked', 'Microsoft lié'],
                  ['has_organization', 'Organisation'],
                  ['organization_editable', 'Org. modifiable'],
                  ['billing_available', 'Section bancaire'],
                  ['has_primary_card', 'Carte primaire'],
                  ['has_secondary_card', 'Carte secondaire'],
                  ['ams_available', 'AMS disponible'],
                ] as const).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between py-1.5 cursor-pointer group"
                  >
                    <span className="text-xs text-gray-600 group-hover:text-gray-900">{label}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setScenario({ ...scenario, [key]: !scenario[key] });
                      }}
                      className={clsx(
                        'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                        scenario[key] ? 'bg-corpiq-blue' : 'bg-gray-300'
                      )}
                    >
                      <span
                        className={clsx(
                          'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform',
                          scenario[key] ? 'translate-x-4.5' : 'translate-x-0.5'
                        )}
                      />
                    </button>
                  </label>
                ))}

                <div className="pt-2">
                  <label className="text-xs text-gray-600 mb-1 block">État membre</label>
                  <select
                    value={scenario.membership_state}
                    onChange={(e) => setScenario({ ...scenario, membership_state: e.target.value as any })}
                    className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-corpiq-blue/20"
                  >
                    <option value="NON_MEMBER">Non-membre</option>
                    <option value="MEMBER_ACTIVE">Membre actif</option>
                    <option value="MEMBER_IN_PROGRESS">En renouvellement</option>
                    <option value="MEMBER_EXPIRED">Expiré</option>
                    <option value="MEMBER_GRACE_PERIOD">Période de grâce</option>
                  </select>
                </div>

                <button
                  onClick={() => setPresetIndex(presetIndex)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <RotateCcw size={12} />
                  Réinitialiser au preset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          'flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all',
          expanded
            ? 'bg-corpiq-blue text-white'
            : 'bg-white border border-gray-200 text-gray-700 hover:shadow-xl'
        )}
      >
        <Settings size={18} className={expanded ? 'animate-spin' : ''} style={expanded ? { animationDuration: '3s' } : {}} />
        <span className="text-sm font-medium">
          {expanded ? 'Fermer' : currentPreset.label}
        </span>
        <span className={clsx('w-2.5 h-2.5 rounded-full', currentPreset.color)} />
      </button>
    </div>
  );
}
