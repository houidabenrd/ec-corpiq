import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useScenario } from '../context/ScenarioContext';
import { scenarioPresets } from '../data/scenarios';

export function ScenarioSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { presetIndex, setPresetIndex, setIsAuthenticated } = useScenario();
  const [open, setOpen] = useState(false);

  if (location.pathname === '/') return null;

  const current = scenarioPresets[presetIndex];

  function switchTo(index: number) {
    setPresetIndex(index);
    setIsAuthenticated(true);
    setOpen(false);
    if (location.pathname.startsWith('/auth')) {
      navigate('/dashboard');
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
          >
            <Home size={14} />
            Hub
          </button>

          <div className="h-4 w-px bg-white/20" />

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
            >
              <span className={clsx('w-2 h-2 rounded-full', current.color)} />
              {current.label}
              <ChevronDown size={12} className={clsx('transition-transform', open && 'rotate-180')} />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50 animate-fade-in">
                  {scenarioPresets.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => switchTo(i)}
                      className={clsx(
                        'w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs transition-colors',
                        i === presetIndex ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'
                      )}
                    >
                      <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', p.color)} />
                      <div>
                        <p className="font-medium">{p.label}</p>
                        <p className="text-gray-500 text-[10px]">{p.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <span className="px-2 py-0.5 bg-white/10 rounded">PROTOTYPE</span>
          <span>EC CORPIQ</span>
        </div>
      </div>
    </div>
  );
}
