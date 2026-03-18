import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, CreditCard, Receipt, QrCode, ArrowRight, ArrowLeft, Check, Star,
  AlertTriangle, Clock, ExternalLink, RefreshCw, Phone, Mail, Ban,
  Building, ChevronRight, Sparkles, ShieldCheck, Gift, BookOpen, Headphones,
  Download, CheckCircle, XCircle, Minus, Plus as PlusIcon,
} from 'lucide-react';
import { useScenario } from '../context/ScenarioContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusBanner } from '../components/ui/StatusBanner';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { clsx } from 'clsx';

// ─── PRICING DATA ────────────────────────────────────────────
function getPricing(nbUnits: number) {
  let base1 = 399, base2 = 699, base3 = 949;
  if (nbUnits > 50) { base1 = 599; base2 = 1049; base3 = 1399; }
  else if (nbUnits > 10) { base1 = 499; base2 = 879; base3 = 1199; }

  return [
    {
      id: '1an',
      duration: '1 an',
      regular: base1,
      current: Math.round(base1 * 0.85),
      savings: Math.round(base1 * 0.15),
      services: ['Outils de gestion', 'Calculateur de loyer', 'Support technique'],
      bonus: null,
      highlight: false,
    },
    {
      id: '2ans',
      duration: '2 ans',
      regular: base2,
      current: Math.round(base2 * 0.78),
      savings: Math.round(base2 * 0.22),
      services: ['Tout du 1 an', 'Modèles de lettres', 'Rabais partenaires', 'Support juridique'],
      bonus: 'Consultation juridique gratuite',
      highlight: true,
    },
    {
      id: '3ans',
      duration: '3 ans',
      regular: base3,
      current: Math.round(base3 * 0.70),
      savings: Math.round(base3 * 0.30),
      services: ['Tout du 2 ans', 'Formations exclusives', 'Priorité support', 'Événements VIP'],
      bonus: 'Carte membre premium + consultation juridique',
      highlight: false,
    },
  ];
}

// ─── NON-MEMBER: ADHESION TUNNEL ─────────────────────────────
function NonMemberView() {
  const [step, setStep] = useState<'units' | 'offers' | 'tunnel' | 'success'>('units');
  const [nbUnits, setNbUnits] = useState(1);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const { setPresetIndex } = useScenario();
  const navigate = useNavigate();

  const offers = getPricing(nbUnits);

  function handlePayment() {
    setStep('success');
    setTimeout(() => {
      setPresetIndex(1);
      navigate('/adhesion');
    }, 4000);
  }

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue chez CORPIQ !</h2>
        <p className="text-gray-500 mb-6">Votre adhésion est maintenant active. Un courriel de confirmation vous a été envoyé avec vos informations de membre, votre numéro de carte et votre contrat.</p>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left space-y-2 mb-6">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Membre</span><span className="font-semibold text-gray-900">Jean Tremblay</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">N° membre</span><span className="font-mono font-semibold text-gray-900">CORP-2026-04521</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">N° carte</span><span className="font-mono font-semibold text-gray-900">4521-7890-1234</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Offre</span><span className="font-semibold text-gray-900">{offers.find(o => o.id === selectedOffer)?.duration}</span></div>
        </div>
        <p className="text-xs text-gray-400">Redirection automatique vers votre espace membre...</p>
      </div>
    );
  }

  if (step === 'tunnel') {
    const offer = offers.find(o => o.id === selectedOffer)!;
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <button onClick={() => setStep('offers')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Retour aux offres
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Finaliser votre adhésion</h2>
        <p className="text-sm text-gray-500 mb-6">Offre {offer.duration} — {offer.current} $</p>

        <Card className="mb-4">
          <CardHeader title="Récapitulatif" icon={<Receipt size={18} />} />
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Adhésion {offer.duration}</span><span className="font-semibold">{offer.current} $</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Frais d'ouverture de dossier</span><span className="font-semibold">50 $</span></div>
            <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-2"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-corpiq-blue text-lg">{offer.current + 50} $</span></div>
          </div>
        </Card>

        <Card className="mb-4">
          <CardHeader title="Vos informations" icon={<Building size={18} />} />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Prénom" defaultValue="Jean" readOnly />
              <Input label="Nom" defaultValue="Tremblay" readOnly />
            </div>
            <Input label="Courriel" defaultValue="jean.tremblay@email.com" readOnly icon={<Mail size={16} />} />
            <Input label="Nombre de logements" value={String(nbUnits)} readOnly />
          </div>
        </Card>

        <Card className="mb-6">
          <CardHeader title="Paiement" icon={<CreditCard size={18} />} />
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-3">Redirection vers la plateforme sécurisée Moneris</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={13} />
              <span>Paiement 100% sécurisé — Aucune donnée stockée</span>
            </div>
          </div>
        </Card>

        <Button fullWidth size="lg" onClick={handlePayment} icon={<CreditCard size={16} />}>
          Procéder au paiement — {offer.current + 50} $
        </Button>
      </div>
    );
  }

  if (step === 'offers') {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setStep('units')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Modifier le nombre de logements
        </button>
        <div className="text-center mb-8">
          <Badge variant="info">{nbUnits} logement{nbUnits > 1 ? 's' : ''}</Badge>
          <h2 className="text-xl font-bold text-gray-900 mt-3 mb-1">Choisissez votre offre</h2>
          <p className="text-sm text-gray-500">Tarifs adaptés à votre volume de logements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={clsx(
                'relative rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer group',
                offer.highlight
                  ? 'border-corpiq-blue bg-white shadow-lg ring-4 ring-corpiq-blue/10 scale-[1.02]'
                  : selectedOffer === offer.id
                    ? 'border-corpiq-blue bg-corpiq-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              )}
              onClick={() => setSelectedOffer(offer.id)}
            >
              {offer.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-corpiq-blue text-white text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} /> Populaire
                </div>
              )}

              <p className="text-lg font-bold text-gray-900 mb-1">{offer.duration}</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-corpiq-blue">{offer.current} $</span>
                <span className="text-sm text-gray-400 line-through">{offer.regular} $</span>
              </div>
              <Badge variant="success">Économisez {offer.savings} $</Badge>

              <ul className="mt-4 space-y-2">
                {offer.services.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>

              {offer.bonus && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <Gift size={13} className="text-violet-500" />
                  <span className="text-xs font-semibold text-violet-600">{offer.bonus}</span>
                </div>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); setSelectedOffer(offer.id); setStep('tunnel'); }}
                className={clsx(
                  'w-full mt-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                  offer.highlight || selectedOffer === offer.id
                    ? 'bg-corpiq-blue text-white hover:bg-corpiq-blue-light shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                Sélectionner
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center animate-fade-in">
      <div className="w-16 h-16 mx-auto bg-corpiq-blue-50 rounded-2xl flex items-center justify-center mb-6">
        <Crown size={28} className="text-corpiq-blue" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Adhérer à CORPIQ</h2>
      <p className="text-sm text-gray-500 mb-8">Indiquez votre nombre de logements pour découvrir nos offres adaptées</p>

      <Card>
        <CardHeader title="Nombre de logements" subtitle="Ce nombre détermine votre tranche tarifaire" icon={<Building size={18} />} />
        <div className="flex items-center justify-center gap-4 py-4">
          <button
            onClick={() => setNbUnits(Math.max(1, nbUnits - 1))}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min={1}
            value={nbUnits}
            onChange={(e) => setNbUnits(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 text-center text-3xl font-bold text-corpiq-blue border-0 focus:outline-none bg-transparent"
          />
          <button
            onClick={() => setNbUnits(nbUnits + 1)}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all"
          >
            <PlusIcon size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mb-4">
          Tranche : {nbUnits <= 10 ? '1–10 logements' : nbUnits <= 50 ? '11–50 logements' : '50+ logements'}
        </p>
        <Button fullWidth size="lg" onClick={() => setStep('offers')} icon={<ArrowRight size={16} />}>
          Voir les offres
        </Button>
      </Card>
    </div>
  );
}

// ─── ACTIVE MEMBER VIEW ──────────────────────────────────────
function ActiveMemberView() {
  const navigate = useNavigate();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Mon adhésion" icon={<Crown size={18} />} badge={<Badge variant="success" dot>Active</Badge>} />
          <div className="space-y-3">
            <Row label="Membre" value="Jean Tremblay" />
            <Row label="N° membre" value="CORP-2026-04521" mono />
            <Row label="N° carte" value="4521-7890-1234" mono />
            <Row label="Statut" value={<Badge variant="success">Membre actif</Badge>} />
            <Row label="Offre" value="2 ans — Premium" />
            <Row label="Date de fin" value="15 mars 2028" />
          </div>
        </Card>

        <Card>
          <CardHeader title="Carte membre" icon={<QrCode size={18} />} />
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-corpiq-blue to-corpiq-blue-dark p-5 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">CORPIQ</span>
                </div>
                <span className="text-[10px] font-bold text-white/40">MEMBRE</span>
              </div>
              <p className="font-bold text-lg mb-0.5">Jean Tremblay</p>
              <p className="text-sm text-white/60 font-mono">CORP-2026-04521</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Valide jusqu'au</p>
                  <p className="text-sm font-semibold">03/2028</p>
                </div>
                <button
                  onClick={() => setQrModalOpen(true)}
                  className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <QrCode size={28} className="text-corpiq-blue" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" fullWidth icon={<QrCode size={14} />} onClick={() => setQrModalOpen(true)}>
              Voir QR code
            </Button>
            <Button variant="outline" size="sm" fullWidth icon={<Download size={14} />}>
              Carte physique
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Renouvellement automatique" icon={<RefreshCw size={18} />} badge={<Badge variant="success" dot>Actif</Badge>} />
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Renouvellement auto</p>
              <p className="text-xs text-gray-400 mt-0.5">Votre adhésion se renouvelle automatiquement</p>
            </div>
            <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-not-allowed">
              <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md" />
            </div>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2.5">
            <AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-800">Modification non disponible en libre-service</p>
              <p className="text-[11px] text-amber-600 mt-0.5">Contactez votre chargé de compte CORPIQ pour modifier cette option.</p>
            </div>
          </div>
          <div className="mt-3">
            <Button variant="outline" size="sm" fullWidth icon={<Headphones size={14} />} onClick={() => setContactModalOpen(true)}>
              Contacter mon chargé de compte
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Moyen de paiement" icon={<CreditCard size={18} />} />
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-3">
            <div className="w-14 h-9 bg-gradient-to-br from-[#1a1f71] to-[#2c3e9e] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-[10px] font-bold italic">VISA</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Visa •••• 4532</p>
              <p className="text-xs text-gray-400">Expire 12/27</p>
            </div>
          </div>
          <Button variant="outline" size="sm" fullWidth icon={<ExternalLink size={14} />} onClick={() => navigate('/profile')}>
            Mettre à jour ma carte
          </Button>
          <p className="text-[11px] text-gray-400 mt-2 text-center">Modification via Profil → Facturation</p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" fullWidth icon={<Receipt size={14} />} onClick={() => navigate('/factures')}>
              Voir mes factures
            </Button>
          </div>
        </Card>
      </div>

      <Modal open={qrModalOpen} onClose={() => setQrModalOpen(false)} title="QR Code — Carte membre" size="sm">
        <div className="text-center py-4">
          <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-4">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={clsx('w-6 h-6 rounded-sm', Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white')} />
              ))}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-900">Jean Tremblay</p>
          <p className="text-xs text-gray-400 font-mono">CORP-2026-04521</p>
        </div>
      </Modal>

      <Modal open={contactModalOpen} onClose={() => setContactModalOpen(false)} title="Contacter mon chargé de compte" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Pour modifier vos options de renouvellement, contactez votre chargé de compte.</p>
          <div className="space-y-3">
            <Input label="Objet" defaultValue="Modification du renouvellement automatique" readOnly />
            <div>
              <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Message</label>
              <textarea
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-corpiq-blue/10 focus:border-corpiq-blue h-24 resize-none"
                placeholder="Décrivez votre demande..."
              />
            </div>
          </div>
          <Button fullWidth icon={<Mail size={15} />}>Envoyer</Button>
        </div>
      </Modal>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={clsx('text-sm font-semibold text-gray-900', mono && 'font-mono')}>{value}</span>
    </div>
  );
}

// ─── IN RENEWAL VIEW ─────────────────────────────────────────
function InRenewalView() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fade-in">
      <StatusBanner
        variant="warning"
        title="Renouvellement en cours"
        message="Votre adhésion arrive bientôt à échéance. Votre accès complet est maintenu pendant le processus."
      />

      <Card>
        <CardHeader title="Mon adhésion" icon={<Crown size={18} />} badge={<Badge variant="warning" dot>En renouvellement</Badge>} />
        <div className="space-y-3">
          <Row label="Membre" value="Jean Tremblay" />
          <Row label="N° membre" value="CORP-2026-04521" mono />
          <Row label="Offre actuelle" value="2 ans — Premium" />
          <Row label="Date de fin" value="15 avril 2026" />
          <Row label="Statut" value={<Badge variant="warning" dot>En renouvellement</Badge>} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Prochain prélèvement" icon={<CreditCard size={18} />} />
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-2">
          <Row label="Date du prélèvement" value="1er avril 2026" />
          <Row label="Montant" value={<span className="text-lg font-bold text-amber-700">545 $</span>} />
          <Row label="Carte utilisée" value="Visa •••• 4532" />
        </div>
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
          <Mail size={12} />
          Un courriel de rappel sera envoyé avant le prélèvement
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button fullWidth size="lg" icon={<RefreshCw size={16} />}>
          Renouveler mon adhésion maintenant
        </Button>
        <Button variant="outline" fullWidth size="lg" icon={<Receipt size={16} />} onClick={() => navigate('/factures')}>
          Voir mes factures
        </Button>
      </div>
    </div>
  );
}

// ─── GRACE PERIOD VIEW ───────────────────────────────────────
function GracePeriodView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <StatusBanner
        variant="error"
        title="Période de grâce"
        message="Votre paiement doit être régularisé. L'accès est limité au paiement, profil et support technique uniquement."
      />

      <Card>
        <CardHeader title="Régularisation requise" icon={<AlertTriangle size={18} />} badge={<Badge variant="danger" dot>Paiement requis</Badge>} />
        <div className="space-y-3 mb-4">
          <Row label="N° membre" value="CORP-2026-04521" mono />
          <Row label="Date d'expiration" value="15 mars 2026" />
          <Row label="Statut" value={<Badge variant="danger">Période de grâce</Badge>} />
        </div>

        <div className="p-4 bg-red-50 border border-red-100 rounded-xl mb-4">
          <div className="flex items-start gap-3">
            <Ban size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Accès restreint</p>
              <ul className="text-xs text-red-600 mt-1 space-y-1">
                <li className="flex items-center gap-1.5"><XCircle size={11} /> Outils premium — bloqués</li>
                <li className="flex items-center gap-1.5"><XCircle size={11} /> Factures — bloquées</li>
                <li className="flex items-center gap-1.5"><XCircle size={11} /> Avantages — bloqués</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={11} className="text-emerald-500" /> Paiement — autorisé</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={11} className="text-emerald-500" /> Profil — autorisé</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={11} className="text-emerald-500" /> Support technique — autorisé</li>
              </ul>
            </div>
          </div>
        </div>

        <Button fullWidth size="lg" icon={<CreditCard size={16} />}>
          Régulariser mon paiement
        </Button>
        <p className="text-[11px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck size={12} /> Redirection sécurisée vers Moneris
        </p>
      </Card>
    </div>
  );
}

// ─── EXPIRED VIEW ────────────────────────────────────────────
function ExpiredView() {
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const daysSinceExpiry = 45;
  const isReadhesion = daysSinceExpiry > 90;

  return (
    <div className="space-y-6 animate-fade-in">
      <StatusBanner
        variant="error"
        title="Adhésion expirée"
        message={isReadhesion
          ? 'Votre adhésion a expiré depuis plus de 90 jours. Un parcours de réadhésion est nécessaire.'
          : `Votre adhésion a expiré il y a ${daysSinceExpiry} jours. Vous pouvez renouveler pour retrouver l'accès complet.`
        }
      />

      <Card>
        <CardHeader
          title={isReadhesion ? 'Réadhésion' : 'Renouvellement'}
          icon={<Crown size={18} />}
          badge={<Badge variant="danger" dot>Expiré depuis {daysSinceExpiry}j</Badge>}
        />
        <div className="space-y-3 mb-4">
          <Row label="N° membre" value="CORP-2026-04521" mono />
          <Row label="Date d'expiration" value="25 janvier 2026" />
          <Row label="Jours depuis expiration" value={<span className="font-bold text-red-600">{daysSinceExpiry} jours</span>} />
          <Row label="Type" value={isReadhesion ? <Badge variant="danger">Réadhésion requise</Badge> : <Badge variant="warning">Renouvellement possible</Badge>} />
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Règle de délai</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={clsx('w-2 h-2 rounded-full', daysSinceExpiry <= 90 ? 'bg-amber-500' : 'bg-gray-300')} />
              <p className={clsx('text-xs', daysSinceExpiry <= 90 ? 'text-gray-900 font-semibold' : 'text-gray-400')}>
                ≤ 90 jours : simple renouvellement — historique conservé
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={clsx('w-2 h-2 rounded-full', daysSinceExpiry > 90 ? 'bg-red-500' : 'bg-gray-300')} />
              <p className={clsx('text-xs', daysSinceExpiry > 90 ? 'text-gray-900 font-semibold' : 'text-gray-400')}>
                {'>'} 90 jours : réadhésion — même compte, nouveau parcours
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button fullWidth size="lg" icon={isReadhesion ? <ArrowRight size={16} /> : <RefreshCw size={16} />}>
            {isReadhesion ? 'Commencer la réadhésion' : 'Renouveler mon adhésion'}
          </Button>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs font-semibold text-amber-800 mb-1">Réadhésion bloquée ?</p>
            <p className="text-[11px] text-amber-600 mb-2">En cas de facture impayée, dossier en collection ou situation sensible, la réadhésion nécessite une validation humaine.</p>
            <Button variant="outline" size="sm" fullWidth icon={<Headphones size={13} />} onClick={() => setShowBlockedModal(true)}>
              Contacter le support
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Accès actuels" icon={<ShieldCheck size={18} />} />
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Outils publics', ok: true },
            { label: 'Outils premium', ok: false },
            { label: 'Paiement / renouvellement', ok: true },
            { label: 'Factures', ok: false },
            { label: 'Profil', ok: true },
            { label: 'Avantages', ok: false },
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

      <Modal open={showBlockedModal} onClose={() => setShowBlockedModal(false)} title="Réadhésion bloquée" size="sm">
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Cas bloquants possibles</p>
              <ul className="text-xs text-amber-700 mt-1 space-y-1">
                <li>• Facture impayée</li>
                <li>• Dossier en collection / finance</li>
                <li>• Dossier sensible nécessitant une revue</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500">Une intervention humaine est nécessaire pour débloquer votre situation. Veuillez contacter le support.</p>
          <Button fullWidth icon={<Phone size={15} />}>Contacter CORPIQ</Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────
export function AdhesionPage() {
  const { scenario } = useScenario();

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-corpiq-blue-50 rounded-xl flex items-center justify-center">
          <Crown size={20} className="text-corpiq-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mon adhésion</h1>
          <p className="text-sm text-gray-500">
            {scenario.membership_state === 'NON_MEMBER' && 'Découvrez nos offres et adhérez à CORPIQ'}
            {scenario.membership_state === 'MEMBER_ACTIVE' && 'Gérez votre adhésion et votre carte membre'}
            {scenario.membership_state === 'MEMBER_IN_PROGRESS' && 'Votre renouvellement est en cours'}
            {scenario.membership_state === 'MEMBER_GRACE_PERIOD' && 'Régularisez votre paiement'}
            {scenario.membership_state === 'MEMBER_EXPIRED' && 'Renouvelez pour retrouver vos accès'}
          </p>
        </div>
      </div>

      {scenario.membership_state === 'NON_MEMBER' && <NonMemberView />}
      {scenario.membership_state === 'MEMBER_ACTIVE' && <ActiveMemberView />}
      {scenario.membership_state === 'MEMBER_IN_PROGRESS' && <InRenewalView />}
      {scenario.membership_state === 'MEMBER_GRACE_PERIOD' && <GracePeriodView />}
      {scenario.membership_state === 'MEMBER_EXPIRED' && <ExpiredView />}
    </div>
  );
}
