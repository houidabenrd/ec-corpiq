import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Crown, Wrench, Star, Calendar, Headphones,
  ArrowRight, Lock, CreditCard, Receipt, UserCircle, Ban,
  CheckCircle, XCircle,
} from 'lucide-react';
import { useScenario } from '../context/ScenarioContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatusBanner } from '../components/ui/StatusBanner';
import { clsx } from 'clsx';
import type { MembershipState } from '../types';

function getStateBadge(state: MembershipState) {
  switch (state) {
    case 'MEMBER_ACTIVE': return <Badge variant="success" dot>Membre actif</Badge>;
    case 'MEMBER_IN_PROGRESS': return <Badge variant="warning" dot>En renouvellement</Badge>;
    case 'MEMBER_EXPIRED': return <Badge variant="danger" dot>Expiré</Badge>;
    case 'MEMBER_GRACE_PERIOD': return <Badge variant="danger" dot>Période de grâce</Badge>;
    default: return <Badge variant="neutral">Non-membre</Badge>;
  }
}

// ─── NON-MEMBRE ──────────────────────────────────────────────
function NonMemberDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-corpiq-blue-100 bg-gradient-to-br from-corpiq-blue-50/50 to-white">
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto bg-corpiq-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Crown size={28} className="text-corpiq-blue" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Devenez membre CORPIQ</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Accédez à des outils exclusifs, des rabais partenaires, du support juridique et bien plus encore.
          </p>
          <Button size="lg" icon={<ArrowRight size={16} />} onClick={() => navigate('/adhesion')}>
            Adhérer maintenant
          </Button>
        </div>
      </Card>

      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Vos accès actuels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { label: 'Outils publics', desc: 'Accès aux outils de base', icon: <Wrench size={18} />, ok: true, path: '/outils' },
          { label: 'Profil', desc: 'Gérer vos informations', icon: <UserCircle size={18} />, ok: true, path: '/profile' },
          { label: 'Événements & formations', desc: 'Découvrir les événements', icon: <Calendar size={18} />, ok: true, path: '/evenements' },
          { label: 'Support technique', desc: 'Aide et assistance', icon: <Headphones size={18} />, ok: true, path: '/support/technique' },
          { label: 'Outils premium', desc: 'Réservé aux membres', icon: <Star size={18} />, ok: false },
          { label: 'Avantages & rabais', desc: 'Réservé aux membres', icon: <Star size={18} />, ok: false },
          { label: 'Factures', desc: 'Réservé aux membres', icon: <Receipt size={18} />, ok: false },
          { label: 'Support juridique', desc: 'Réservé aux membres', icon: <Headphones size={18} />, ok: false },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => item.ok && item.path ? navigate(item.path) : undefined}
            disabled={!item.ok}
            className={clsx(
              'flex items-center gap-3 p-4 rounded-xl border transition-all text-left',
              item.ok
                ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                : 'bg-gray-50/50 border-gray-100 cursor-not-allowed opacity-60'
            )}
          >
            <div className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              item.ok ? 'bg-corpiq-blue-50 text-corpiq-blue' : 'bg-gray-100 text-gray-400'
            )}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={clsx('text-sm font-semibold', item.ok ? 'text-gray-900' : 'text-gray-500')}>{item.label}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            {item.ok ? (
              <ArrowRight size={14} className="text-gray-300" />
            ) : (
              <Lock size={14} className="text-gray-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── EXPIRÉ / GRÂCE ─────────────────────────────────────────
function ExpiredDashboard() {
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const isGrace = scenario.membership_state === 'MEMBER_GRACE_PERIOD';
  const isOwner = scenario.role === 'owner';

  return (
    <div className="space-y-6">
      <StatusBanner
        variant="error"
        title={isGrace ? 'Période de grâce' : 'Adhésion expirée'}
        message={isGrace
          ? 'Votre paiement doit être régularisé. Accès limité au paiement, profil et support technique.'
          : 'Votre adhésion est expirée. Renouvelez ou réadhérez pour retrouver l\'accès complet.'
        }
      />

      <Card className="border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-white">
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-4">
            <CreditCard size={28} className="text-red-500" />
          </div>
          {isOwner ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isGrace ? 'Régularisez votre paiement' : 'Renouvelez votre adhésion'}
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                {isGrace
                  ? 'Complétez votre paiement pour retrouver l\'accès complet à tous les services CORPIQ.'
                  : 'Votre adhésion a expiré. Renouvelez pour retrouver l\'accès aux outils premium, avantages et support juridique.'
                }
              </p>
              <Button size="lg" icon={<ArrowRight size={16} />} onClick={() => navigate('/adhesion')}>
                {isGrace ? 'Régulariser mon paiement' : 'Renouveler / Réadhérer'}
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isGrace ? 'Paiement en attente' : 'Adhésion expirée'}
              </h2>
              <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                Le paiement et le renouvellement sont gérés par le membre principal (propriétaire) de votre organisation.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-500">
                <Lock size={12} />
                Paiement réservé au propriétaire
              </div>
            </>
          )}
        </div>
      </Card>

      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Accès actuels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { label: 'Profil', desc: 'Gérer vos informations', icon: <UserCircle size={18} />, ok: true, path: '/profile' },
          { label: 'Support technique', desc: 'Aide et assistance', icon: <Headphones size={18} />, ok: true, path: '/support/technique' },
          { label: 'Outils publics', desc: isGrace ? 'Bloqué en période de grâce' : 'Accès aux outils de base', icon: <Wrench size={18} />, ok: !isGrace, path: '/outils' },
          { label: 'Adhésion', desc: isOwner ? 'Renouveler ou payer' : 'Consulter le statut', icon: <Crown size={18} />, ok: true, path: '/adhesion' },
          { label: 'Outils premium', desc: 'Accès bloqué', icon: <Star size={18} />, ok: false },
          { label: 'Avantages & rabais', desc: 'Accès bloqué', icon: <Star size={18} />, ok: false },
          { label: 'Factures', desc: 'Accès bloqué', icon: <Receipt size={18} />, ok: false },
          { label: 'Support juridique', desc: 'Accès bloqué', icon: <Headphones size={18} />, ok: false },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => item.ok && item.path ? navigate(item.path) : undefined}
            disabled={!item.ok}
            className={clsx(
              'flex items-center gap-3 p-4 rounded-xl border transition-all text-left',
              item.ok
                ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                : 'bg-gray-50/50 border-gray-100 cursor-not-allowed opacity-60'
            )}
          >
            <div className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              item.ok ? 'bg-corpiq-blue-50 text-corpiq-blue' : 'bg-gray-100 text-gray-400'
            )}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={clsx('text-sm font-semibold', item.ok ? 'text-gray-900' : 'text-gray-500')}>{item.label}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            {item.ok ? <ArrowRight size={14} className="text-gray-300" /> : <Lock size={14} className="text-gray-300" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MEMBRE ACTIF / RENOUVELLEMENT (placeholder) ─────────────
function MemberDashboard() {
  const { scenario } = useScenario();

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-card">
      <div className="text-center px-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4">
          <LayoutDashboard size={28} />
        </div>
        <p className="text-gray-500 font-bold text-base">Tableau de bord</p>
        <p className="text-sm text-gray-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Ce module sera disponible dans une prochaine version du prototype.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────
export function DashboardPage() {
  const { scenario } = useScenario();

  const isNonMember = scenario.membership_state === 'NON_MEMBER';
  const isExpiredOrGrace = scenario.membership_state === 'MEMBER_EXPIRED' || scenario.membership_state === 'MEMBER_GRACE_PERIOD';

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-corpiq-blue-50 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} className="text-corpiq-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tableau de bord</h1>
            <p className="text-sm text-gray-500">Bienvenue, Jean Tremblay</p>
          </div>
        </div>
        {getStateBadge(scenario.membership_state)}
      </div>

      {isNonMember && <NonMemberDashboard />}
      {isExpiredOrGrace && <ExpiredDashboard />}
      {!isNonMember && !isExpiredOrGrace && <MemberDashboard />}
    </div>
  );
}
