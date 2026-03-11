import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserScenario } from '../types';
import { scenarioPresets } from '../data/scenarios';

interface ScenarioContextValue {
  scenario: UserScenario;
  setScenario: (s: UserScenario) => void;
  presetIndex: number;
  setPresetIndex: (i: number) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
}

const ScenarioContext = createContext<ScenarioContextValue | null>(null);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [presetIndex, setPresetIndex] = useState(0);
  const [scenario, setScenario] = useState<UserScenario>(scenarioPresets[0].scenario);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handlePresetChange(index: number) {
    setPresetIndex(index);
    setScenario(scenarioPresets[index].scenario);
  }

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        setScenario,
        presetIndex,
        setPresetIndex: handlePresetChange,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error('useScenario must be used within ScenarioProvider');
  return ctx;
}
