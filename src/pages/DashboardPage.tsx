import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Crown, Wrench, Star, Calendar, Headphones,
  ArrowRight, Lock, CheckCircle, XCircle, Receipt, UserCircle,
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

export function DashboardPage() {
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const isNonMember = scenario.membership_state === 'NON_MEMBER';
  const isActive = scenario.membership_state === 'MEMBER_ACTIVE';
  const isRenewal = scenario.membership_state === 'MEMBER_IN_PROGRESS';
  const isExpired = scenario.membership_state === 'MEMBER_EXPIRED';
  const isGrace = scenario.membership_state === 'MEMBER_GRACE_PERIOD';

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

      {isRenewal && (
        <StatusBanner variant="warning" title="Renouvellement en cours" message="Votre adhésion arrive à échéance. Accès complet maintenu." className="mb-6" />
      )}
      {isExpired && (
        <StatusBanner variant="error" title="Adhésion expirée" message="Renouvelez pour retrouver l'accès aux outils premium et avantages." className="mb-6" />
      )}
      {isGrace && (
        <StatusBanner variant="error" title="Période de grâce" message="Régularisez votre paiement pour retrouver l'accès complet." className="mb-6" />
      )}

      {isNonMember ? (
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
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => navigate('/adhesion')} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-left group">
              <div className="w-10 h-10 bg-corpiq-blue-50 rounded-xl flex items-center justify-center mb-3 text-corpiq-blue">
                <Crown size={20} />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">Mon adhésion</p>
              <p className="text-xs text-gray-400">Consulter et gérer</p>
              <ArrowRight size={14} className="text-gray-300 mt-2 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {(isActive || isRenewal) && (
              <button onClick={() => navigate('/factures')} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-left group">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mb-3 text-violet-600">
                  <Receipt size={20} />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-0.5">Mes factures</p>
                <p className="text-xs text-gray-400">Historique et téléchargement</p>
                <ArrowRight size={14} className="text-gray-300 mt-2 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            <button onClick={() => navigate('/profile')} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-left group">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3 text-emerald-600">
                <UserCircle size={20} />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">Mon profil</p>
              <p className="text-xs text-gray-400">Informations et sécurité</p>
              <ArrowRight size={14} className="text-gray-300 mt-2 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <Card>
            <CardHeader title="Accès par statut" icon={<CheckCircle size={18} />} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { label: 'Outils publics', ok: true },
                { label: 'Outils premium', ok: isActive || isRenewal },
                { label: 'Paiement', ok: !isGrace || true },
                { label: 'Factures', ok: isActive || isRenewal },
                { label: 'Avantages', ok: isActive || isRenewal },
                { label: 'Support juridique', ok: isActive || isRenewal },
              ].map((item) => (
                <div key={item.label} className={clsx(
                  'flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium',
                  item.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-400'
                )}>
                  {item.ok ? <CheckCircle size={13} /> : <XCircle size={13} />}
                  {item.label}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
