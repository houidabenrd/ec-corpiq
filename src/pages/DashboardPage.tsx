import {
  TrendingUp,
  Users,
  Home,
  Calendar,
  ArrowRight,
  Crown,
  Wrench,
  Star,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatusBanner } from '../components/ui/StatusBanner';
import { useScenario } from '../context/ScenarioContext';

function StatCard({ label, value, icon, trend }: { label: string; value: string; icon: React.ReactNode; trend?: string }) {
  return (
    <Card className="hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp size={12} /> {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-corpiq-blue-50 rounded-lg flex items-center justify-center text-corpiq-blue">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function DashboardPage() {
  const { scenario } = useScenario();
  const navigate = useNavigate();

  const isFull = scenario.membership_state === 'MEMBER_ACTIVE' || scenario.membership_state === 'MEMBER_IN_PROGRESS';
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';
  const isNonMember = scenario.membership_state === 'NON_MEMBER';

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            {isNonMember && <Badge variant="neutral">Découverte</Badge>}
            {isFull && scenario.membership_state === 'MEMBER_IN_PROGRESS' && <Badge variant="warning" dot>Renouvellement en cours</Badge>}
            {isExpired && <Badge variant="danger" dot>{scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Expiré'}</Badge>}
            {scenario.membership_state === 'MEMBER_ACTIVE' && <Badge variant="success" dot>Actif</Badge>}
          </div>
          <p className="text-gray-500 mt-1">
            Bienvenue, Jean Tremblay — {
              isNonMember ? 'Non-membre' :
              !scenario.is_primary_member ? 'Délégué' :
              'Membre principal'
            }
          </p>
        </div>
        {isNonMember && (
          <Button variant="secondary" icon={<Crown size={18} />}>Adhérer maintenant</Button>
        )}
        {isExpired && (
          <Button variant="danger" icon={<Crown size={18} />}>Renouveler maintenant</Button>
        )}
      </div>

      {isNonMember && (
        <StatusBanner
          variant="info"
          title="Accès découverte"
          message="Vous accédez à une version limitée. Les outils premium, factures et avantages membres sont masqués. Devenez membre pour un accès complet."
          className="mb-6"
        />
      )}

      {isExpired && (
        <StatusBanner
          variant="error"
          title={scenario.membership_state === 'MEMBER_GRACE_PERIOD' ? 'Période de grâce' : 'Adhésion expirée'}
          message="Votre accès aux services premium est restreint. Renouvelez pour retrouver l'accès complet."
          className="mb-6"
        />
      )}

      {scenario.membership_state === 'MEMBER_IN_PROGRESS' && (
        <StatusBanner
          variant="warning"
          title="Renouvellement en cours"
          message="Votre renouvellement est en traitement. Accès complet maintenu en attendant."
          action={<Button size="sm" variant="outline">Finaliser</Button>}
          className="mb-6"
        />
      )}

      {isFull ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Logements gérés" value="42" icon={<Home size={20} />} trend="+3 ce mois" />
          <StatCard label="Locataires actifs" value="38" icon={<Users size={20} />} />
          <StatCard label="Événements à venir" value="3" icon={<Calendar size={20} />} />
          <StatCard label="Outils disponibles" value="12" icon={<Wrench size={20} />} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Outils publics" value="4" icon={<Wrench size={20} />} />
          <StatCard label="Événements publics" value="2" icon={<Calendar size={20} />} />
          <StatCard label="Ressources" value="6" icon={<BookOpen size={20} />} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès rapide</h3>
          <div className="space-y-3">
            {[
              { label: 'Calculateur de loyer', desc: 'Calculez l\'augmentation selon le TAL', available: true, icon: <Wrench size={18} /> },
              { label: 'Modèles de baux', desc: 'Modèles conformes et à jour', available: isFull, icon: <BookOpen size={18} /> },
              { label: 'Avantages partenaires', desc: 'Rabais et offres exclusives', available: isFull, icon: <Star size={18} /> },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  item.available ? 'border-gray-100 hover:border-corpiq-blue-100 hover:bg-corpiq-blue-50/30' : 'border-gray-100 bg-gray-50 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.available ? 'bg-corpiq-blue-50 text-corpiq-blue' : 'bg-gray-100 text-gray-400'}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                {item.available ? (
                  <ArrowRight size={16} className="text-gray-300" />
                ) : (
                  <Badge variant="neutral">Premium</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profil & compte</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-corpiq-blue-100 hover:bg-corpiq-blue-50/30 transition-all text-left"
            >
              <div className="w-10 h-10 bg-corpiq-blue-50 rounded-lg flex items-center justify-center text-corpiq-blue">
                <Users size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Mon profil</p>
                <p className="text-xs text-gray-500">Gérer mes informations et préférences</p>
              </div>
              <ArrowRight size={16} className="text-gray-300" />
            </button>

            {isNonMember && (
              <div className="p-5 bg-gradient-to-r from-corpiq-blue to-corpiq-blue-light rounded-xl text-white">
                <h4 className="font-semibold">Devenez membre CORPIQ</h4>
                <p className="text-white/80 text-sm mt-1 mb-3">Accédez à tous les outils, avantages et formations exclusifs.</p>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  En savoir plus
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
