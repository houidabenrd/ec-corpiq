import { useScenario } from '../context/ScenarioContext';
import { Badge } from '../components/ui/Badge';
import type { MembershipState } from '../types';

interface PlaceholderPageProps {
  title: string;
  icon: React.ReactNode;
}

function getStateBadge(state: MembershipState) {
  switch (state) {
    case 'MEMBER_ACTIVE': return <Badge variant="success" dot>Membre actif</Badge>;
    case 'MEMBER_IN_PROGRESS': return <Badge variant="warning" dot>En renouvellement</Badge>;
    case 'MEMBER_EXPIRED': return <Badge variant="danger" dot>Expiré</Badge>;
    case 'MEMBER_GRACE_PERIOD': return <Badge variant="danger" dot>Période de grâce</Badge>;
    default: return <Badge variant="neutral">Non-membre</Badge>;
  }
}

export function PlaceholderPage({ title, icon }: PlaceholderPageProps) {
  const { scenario } = useScenario();

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center gap-2.5 mb-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
        {getStateBadge(scenario.membership_state)}
      </div>
      <p className="text-sm text-gray-400 mb-8">Module à venir</p>

      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-card">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4">
            {icon}
          </div>
          <p className="text-gray-500 font-bold text-base">{title}</p>
          <p className="text-sm text-gray-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Ce module sera disponible dans une prochaine version du prototype.
          </p>
        </div>
      </div>
    </div>
  );
}
