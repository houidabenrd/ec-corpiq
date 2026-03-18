import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, CreditCard, Receipt, QrCode, ArrowRight, ArrowLeft, Check, Star,
  AlertTriangle, Clock, ExternalLink, RefreshCw, Phone, Mail, Ban, Lock,
  Building, ChevronRight, Sparkles, ShieldCheck, Gift, BookOpen, Headphones,
  Download, CheckCircle, XCircle, Minus, Plus as PlusIcon, MapPin, User,
  CalendarClock, Wallet, Info, Zap, Timer, UserCheck, FileText, Eye,
} from 'lucide-react';
import { useScenario } from '../context/ScenarioContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusBanner } from '../components/ui/StatusBanner';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { clsx } from 'clsx';
import type { UserRole } from '../types';

function getRoleLabel(role: UserRole) {
  switch (role) {
    case 'owner': return 'Propriétaire';
    case 'admin': return 'Administrateur';
    case 'delegate': return 'Délégué';
  }
}

function getRoleBadge(role: UserRole) {
  switch (role) {
    case 'owner': return <Badge variant="info">Propriétaire</Badge>;
    case 'admin': return <Badge variant="purple">Admin</Badge>;
    case 'delegate': return <Badge variant="neutral">Délégué</Badge>;
  }
}

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

// ─── REUSABLE ROW ────────────────────────────────────────────
function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={clsx('text-sm font-semibold text-gray-900', mono && 'font-mono tracking-wide')}>{value}</span>
    </div>
  );
}

// ─── NON-MEMBER: ADHESION TUNNEL ─────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={clsx('h-1.5 rounded-full transition-all duration-500', i < current ? 'w-8 bg-corpiq-blue' : 'w-4 bg-gray-200')} />
        ))}
      </div>
      <span className="text-xs text-gray-400 ml-2">Étape {current} / {total}</span>
    </div>
  );
}

function NonMemberView() {
  const [step, setStep] = useState<'units' | 'offers' | 'contract' | 'payment' | 'success'>('units');
  const [nbUnits, setNbUnits] = useState(1);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('Jean Tremblay');
  const [saveCard, setSaveCard] = useState(true);
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
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-emerald-200/30 rounded-3xl animate-ping" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg">
            <CheckCircle size={44} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Bienvenue chez CORPIQ !</h2>
        <p className="text-gray-500 mb-8 leading-relaxed max-w-sm mx-auto">Votre adhésion est maintenant active. Un courriel de confirmation vous a été envoyé avec vos informations de membre et votre contrat.</p>
        <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 text-left space-y-3 mb-6 shadow-sm">
          <Row label="Membre" value="Jean Tremblay" />
          <Row label="N° membre" value="CORP-2026-04521" mono />
          <Row label="N° carte" value="4521-7890-1234" mono />
          <Row label="Offre" value={offers.find(o => o.id === selectedOffer)?.duration} />
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-8 text-left">
          <div className="flex items-start gap-3">
            <CreditCard size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-emerald-800">Carte enregistrée dans votre profil</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">Votre carte de paiement a été sauvegardée et sera utilisée pour les prochains renouvellements. Vous pouvez la gérer dans Profil → Facturation.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Redirection automatique vers votre espace membre...
        </div>
      </div>
    );
  }

  // ── STEP 4: Payment ──
  if (step === 'payment') {
    const offer = offers.find(o => o.id === selectedOffer)!;
    const cardValid = cardNumber.length >= 16 && cardExpiry.length >= 4 && cardCvc.length >= 3;

    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <button onClick={() => setStep('contract')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-corpiq-blue transition-colors mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Retour au contrat
        </button>

        <StepIndicator current={4} total={4} />
        <h2 className="text-xl font-bold text-gray-900 mb-1">Paiement sécurisé</h2>
        <p className="text-sm text-gray-500 mb-8">Offre {offer.duration} — Total : <span className="font-bold text-corpiq-blue">{offer.current + 50} $</span></p>

        <Card className="mb-4 overflow-hidden">
          <CardHeader title="Récapitulatif" icon={<Receipt size={18} />} />
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Adhésion {offer.duration}</span><span className="font-semibold">{offer.current} $</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Frais d'ouverture de dossier</span><span className="font-semibold">50 $</span></div>
            <div className="flex justify-between text-sm border-t border-gray-100 pt-3 mt-3">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-corpiq-blue text-xl">{offer.current + 50} $</span>
            </div>
          </div>
        </Card>

        <Card className="mb-4">
          <CardHeader title="Carte de crédit" icon={<CreditCard size={18} />} />

          {/* Simulated card preview */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black p-5 text-white mb-5 shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Credit</span>
              </div>
              <p className="font-mono text-lg tracking-[0.2em] mb-4">
                {cardNumber ? cardNumber.replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30">Titulaire</p>
                  <p className="text-sm font-semibold">{cardName || '—'}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30">Expire</p>
                  <p className="text-sm font-semibold font-mono">{cardExpiry || '••/••'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Input
              label="Numéro de carte"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              icon={<CreditCard size={16} />}
            />
            <Input
              label="Titulaire de la carte"
              value={cardName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
              icon={<User size={16} />}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Expiration"
                placeholder="MM/AA"
                value={cardExpiry}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
              <Input
                label="CVC"
                placeholder="123"
                value={cardCvc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="sr-only peer" />
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:border-corpiq-blue peer-checked:bg-corpiq-blue transition-all flex items-center justify-center">
                  {saveCard && <Check size={12} className="text-white" />}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Enregistrer cette carte dans mon profil</p>
                <p className="text-xs text-gray-400 mt-0.5">Sera utilisée pour les prochains renouvellements automatiques</p>
              </div>
            </label>
          </div>
        </Card>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 justify-center">
          <ShieldCheck size={13} />
          <span>Paiement sécurisé via Moneris — Aucune donnée stockée sur nos serveurs</span>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={handlePayment}
          icon={<CreditCard size={16} />}
          className={clsx('shadow-lg transition-all', cardValid ? 'hover:shadow-xl' : 'opacity-60 cursor-not-allowed')}
        >
          Payer {offer.current + 50} $ et adhérer
        </Button>
      </div>
    );
  }

  // ── STEP 3: Contract acceptance ──
  if (step === 'contract') {
    const offer = offers.find(o => o.id === selectedOffer)!;

    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <button onClick={() => setStep('offers')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-corpiq-blue transition-colors mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Retour aux offres
        </button>

        <StepIndicator current={3} total={4} />
        <h2 className="text-xl font-bold text-gray-900 mb-1">Contrat d'adhésion</h2>
        <p className="text-sm text-gray-500 mb-8">Veuillez lire et accepter le contrat pour continuer</p>

        <Card className="mb-4">
          <CardHeader title="Votre offre" icon={<Crown size={18} />} />
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Offre</span><span className="font-semibold">{offer.duration} — Premium</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Montant</span><span className="font-semibold">{offer.current} $</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Frais de dossier</span><span className="font-semibold">50 $</span></div>
            <div className="flex justify-between text-sm border-t border-gray-100 pt-2"><span className="font-bold">Total</span><span className="font-bold text-corpiq-blue">{offer.current + 50} $</span></div>
          </div>
        </Card>

        <Card className="mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-corpiq-blue-50 rounded-xl flex items-center justify-center">
                <FileText size={18} className="text-corpiq-blue" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Contrat CORPIQ — {offer.duration}</p>
                <p className="text-xs text-gray-400">Document contractuel obligatoire</p>
              </div>
            </div>
            <Badge variant="neutral">Obligatoire</Badge>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 max-h-[280px] overflow-y-auto scrollbar-thin mb-5 text-xs text-gray-600 leading-relaxed space-y-3">
            <p className="font-bold text-gray-800 text-sm">Contrat d'adhésion CORPIQ</p>

            <div>
              <p className="font-bold text-gray-800">Article 1 — Parties</p>
              <p>Le présent contrat est conclu entre la Corporation des propriétaires immobiliers du Québec (CORPIQ) et le membre soussigné.</p>
            </div>

            <div>
              <p className="font-bold text-gray-800">Article 2 — Durée et tarif</p>
              <p>L'adhésion est consentie pour une durée de <strong>{offer.duration}</strong>, au tarif de <strong>{offer.current + 50} $</strong> (incluant les frais d'ouverture de dossier de 50 $).</p>
            </div>

            <div>
              <p className="font-bold text-gray-800">Article 3 — Services inclus</p>
              <ul className="list-disc ml-4 space-y-0.5">
                {offer.services.map((s, i) => <li key={i}>{s}</li>)}
                {offer.bonus && <li className="font-semibold text-violet-600">{offer.bonus}</li>}
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-800">Article 4 — Renouvellement automatique</p>
              <p>L'adhésion se renouvelle automatiquement à la date d'échéance. La carte de crédit fournie lors de l'adhésion sera utilisée pour les prélèvements futurs. Toute modification doit être communiquée au chargé de compte.</p>
            </div>

            <div>
              <p className="font-bold text-gray-800">Article 5 — Carte de paiement</p>
              <p>La carte de crédit utilisée pour le paiement initial sera <strong>enregistrée dans l'espace membre</strong> (section Profil → Facturation) et servira pour les renouvellements automatiques. Le membre peut mettre à jour sa carte à tout moment via son profil.</p>
            </div>

            <div>
              <p className="font-bold text-gray-800">Article 6 — Résiliation</p>
              <p>Le membre peut résilier en contactant son chargé de compte. Aucun remboursement pour la période restante. Au-delà de 90 jours après expiration, une réadhésion complète avec frais de dossier sera requise.</p>
            </div>

            <p className="text-gray-400 italic pt-2 border-t border-gray-200">Document contractuel — Version mars 2026</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-corpiq-blue transition-colors">
            <div className="relative mt-0.5">
              <input type="checkbox" checked={contractAccepted} onChange={(e) => setContractAccepted(e.target.checked)} className="sr-only peer" />
              <div className={clsx(
                'w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center',
                contractAccepted ? 'border-corpiq-blue bg-corpiq-blue' : 'border-gray-300'
              )}>
                {contractAccepted && <Check size={12} className="text-white" />}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 group-hover:text-corpiq-blue transition-colors">
                J'ai lu et j'accepte le contrat d'adhésion CORPIQ
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Vous devez accepter le contrat pour procéder au paiement</p>
            </div>
          </label>
        </Card>

        <Button
          fullWidth
          size="lg"
          onClick={() => contractAccepted && setStep('payment')}
          icon={<ArrowRight size={16} />}
          className={clsx('shadow-lg transition-all', contractAccepted ? 'hover:shadow-xl' : 'opacity-50 cursor-not-allowed')}
        >
          Continuer vers le paiement
        </Button>
      </div>
    );
  }

  if (step === 'offers') {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setStep('units')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-corpiq-blue transition-colors mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Modifier le nombre de logements
        </button>

        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <StepIndicator current={2} total={4} />
          </div>
          <Badge variant="info" className="mb-3">{nbUnits} logement{nbUnits > 1 ? 's' : ''}</Badge>
          <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-1.5 tracking-tight">Choisissez votre offre</h2>
          <p className="text-sm text-gray-500">Tarifs adaptés à votre volume de logements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offers.map((offer, idx) => (
            <div
              key={offer.id}
              className={clsx(
                'relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer group',
                offer.highlight
                  ? 'border-corpiq-blue bg-white shadow-xl ring-4 ring-corpiq-blue/10 scale-[1.03] hover:shadow-2xl'
                  : selectedOffer === offer.id
                    ? 'border-corpiq-blue bg-corpiq-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:-translate-y-1'
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => setSelectedOffer(offer.id)}
            >
              {offer.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-corpiq-blue to-corpiq-blue-light text-white text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles size={10} /> Populaire
                </div>
              )}

              <p className="text-lg font-bold text-gray-900 mb-1">{offer.duration}</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-corpiq-blue tracking-tight">{offer.current} $</span>
                <span className="text-sm text-gray-400 line-through">{offer.regular} $</span>
              </div>
              <Badge variant="success">Économisez {offer.savings} $</Badge>

              <ul className="mt-5 space-y-2.5">
                {offer.services.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                    <Check size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>

              {offer.bonus && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2.5">
                  <Gift size={14} className="text-violet-500" />
                  <span className="text-xs font-semibold text-violet-600">{offer.bonus}</span>
                </div>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); setSelectedOffer(offer.id); setStep('contract'); }}
                className={clsx(
                  'w-full mt-5 py-3 rounded-xl text-sm font-bold transition-all duration-200',
                  offer.highlight || selectedOffer === offer.id
                    ? 'bg-gradient-to-r from-corpiq-blue to-corpiq-blue-light text-white hover:opacity-90 shadow-md'
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
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 bg-corpiq-blue/10 rounded-2xl animate-pulse" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-2xl flex items-center justify-center shadow-lg">
          <Crown size={32} className="text-white" />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <StepIndicator current={1} total={4} />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Adhérer à CORPIQ</h2>
      <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">Indiquez votre nombre de logements pour découvrir nos offres adaptées</p>

      <Card className="shadow-lg">
        <CardHeader title="Nombre de logements" subtitle="Ce nombre détermine votre tranche tarifaire" icon={<Building size={18} />} />
        <div className="flex items-center justify-center gap-5 py-6">
          <button
            onClick={() => setNbUnits(Math.max(1, nbUnits - 1))}
            className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            min={1}
            value={nbUnits}
            onChange={(e) => setNbUnits(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-28 text-center text-4xl font-bold text-corpiq-blue border-0 focus:outline-none bg-transparent"
          />
          <button
            onClick={() => setNbUnits(nbUnits + 1)}
            className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
          >
            <PlusIcon size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className={clsx('px-3 py-1 rounded-lg text-xs font-semibold transition-all', nbUnits <= 10 ? 'bg-corpiq-blue-50 text-corpiq-blue' : 'bg-gray-50 text-gray-400')}>1–10</div>
          <div className={clsx('px-3 py-1 rounded-lg text-xs font-semibold transition-all', nbUnits > 10 && nbUnits <= 50 ? 'bg-corpiq-blue-50 text-corpiq-blue' : 'bg-gray-50 text-gray-400')}>11–50</div>
          <div className={clsx('px-3 py-1 rounded-lg text-xs font-semibold transition-all', nbUnits > 50 ? 'bg-corpiq-blue-50 text-corpiq-blue' : 'bg-gray-50 text-gray-400')}>50+</div>
        </div>
        <Button fullWidth size="lg" onClick={() => setStep('offers')} icon={<ArrowRight size={16} />} className="shadow-md">
          Voir les offres
        </Button>
      </Card>
    </div>
  );
}

// ─── MEMBER VIEW (Active + In Renewal) ──────────────────────
function MemberView({ isRenewal }: { isRenewal?: boolean }) {
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [physicalCardModalOpen, setPhysicalCardModalOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<'org' | 'personal'>('org');
  const [cardRequested, setCardRequested] = useState(false);
  const isOwner = scenario.role === 'owner';

  const statusBadge = isRenewal
    ? <Badge variant="warning" dot>En renouvellement</Badge>
    : <Badge variant="success" dot>Active</Badge>;

  return (
    <div className="space-y-6 animate-fade-in">
      {isRenewal && (
        <StatusBanner
          variant="warning"
          title="Renouvellement en cours"
          message="Votre adhésion arrive bientôt à échéance. Votre accès complet est maintenu pendant le processus."
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Infos adhésion ── */}
        <Card className="group hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader title="Mon adhésion" icon={<Crown size={18} />} badge={statusBadge} />
          <div className="space-y-1">
            <Row label="Membre" value="Jean Tremblay" />
            <Row label="Rôle" value={getRoleBadge(scenario.role)} />
            <Row label="N° membre" value="CORP-2026-04521" mono />
            <Row label="N° carte" value="4521-7890-1234" mono />
            <Row label="Statut" value={isRenewal ? <Badge variant="warning" dot>En renouvellement</Badge> : <Badge variant="success">Membre actif</Badge>} />
            <Row label="Offre" value="2 ans — Premium" />
            <Row label="Date de fin" value="15 mars 2028" />
          </div>

          {/* ── Contrat d'adhésion ── */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-corpiq-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-corpiq-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">Contrat d'adhésion</p>
                <p className="text-xs text-gray-400 mt-0.5">Contrat CORPIQ — 2 ans Premium · Signé le 15 mars 2026</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setContractOpen(true)}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-corpiq-blue hover:border-corpiq-blue-100 hover:bg-corpiq-blue-50/50 transition-all"
                  title="Consulter"
                >
                  <Eye size={15} />
                </button>
                <button
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-corpiq-blue hover:border-corpiq-blue-100 hover:bg-corpiq-blue-50/50 transition-all"
                  title="Télécharger PDF"
                >
                  <Download size={15} />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Carte membre ── */}
        <Card className="group hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader title="Carte membre" icon={<QrCode size={18} />} />
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-corpiq-blue via-corpiq-blue-dark to-[#0a1628] p-6 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Crown size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">CORPIQ</span>
                </div>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Membre</span>
              </div>
              <p className="font-bold text-xl mb-0.5 tracking-wide">Jean Tremblay</p>
              <p className="text-sm text-white/50 font-mono tracking-wider">CORP-2026-04521</p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 mb-0.5">Valide jusqu'au</p>
                  <p className="text-base font-bold tracking-wide">03/2028</p>
                </div>
                <button
                  onClick={() => setQrModalOpen(true)}
                  className="w-14 h-14 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
                >
                  <QrCode size={30} className="text-corpiq-blue" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" fullWidth icon={<QrCode size={14} />} onClick={() => setQrModalOpen(true)}>
              Voir QR code
            </Button>
            <Button variant="outline" size="sm" fullWidth icon={<MapPin size={14} />} onClick={() => setPhysicalCardModalOpen(true)}>
              Demander carte physique
            </Button>
          </div>
        </Card>
      </div>

      <div className={clsx('grid grid-cols-1 gap-6', isOwner && 'md:grid-cols-2')}>
        {/* ── Renouvellement auto ── */}
        <Card className="group hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader title="Renouvellement automatique" icon={<RefreshCw size={18} />} badge={<Badge variant="success" dot>Actif</Badge>} />
          <div className="space-y-1 mb-4">
            <Row label="Renouvellement auto" value={
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-semibold text-xs">Activé</span>
                <div className="w-9 h-5 bg-emerald-500 rounded-full relative cursor-not-allowed">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all" />
                </div>
              </div>
            } />
            <Row label="Date de renouvellement" value={<span className="text-corpiq-blue font-bold">15 mars 2028</span>} />
            <Row label="Prochain prélèvement" value={isRenewal ? '1er avril 2026' : '15 mars 2028'} />
          </div>
          <div className="p-3.5 bg-amber-50/80 border border-amber-100 rounded-xl flex items-start gap-2.5 mb-3">
            <Info size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-800">Lecture seule</p>
              <p className="text-[11px] text-amber-600 mt-0.5 leading-relaxed">Contactez votre chargé de compte CORPIQ pour modifier le renouvellement automatique.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" fullWidth icon={<Headphones size={14} />} onClick={() => setContactModalOpen(true)}>
            Contacter mon chargé de compte
          </Button>
        </Card>

        {/* ── Paiement (owner only) ── */}
        {isOwner ? (
          <Card className="group hover:shadow-card-hover transition-shadow duration-300">
            <CardHeader title="Moyen de paiement" icon={<Wallet size={18} />} />
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 mb-4">
              <div className="w-16 h-10 bg-gradient-to-br from-[#1a1f71] to-[#2c3e9e] rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-[11px] font-bold italic tracking-wide">VISA</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Visa •••• 4532</p>
                <p className="text-xs text-gray-400">Expire 12/27</p>
              </div>
              <Badge variant="success" className="ml-auto">Valide</Badge>
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
        ) : (
          <Card>
            <CardHeader title="Paiement & facturation" icon={<CreditCard size={18} />} />
            <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 text-center mb-4">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <Lock size={20} className="text-gray-300" />
              </div>
              <p className="text-sm font-bold text-gray-500">Carte bancaire réservée au propriétaire</p>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
                La gestion de la carte de paiement est réservée au membre principal.
              </p>
            </div>
            <Button variant="outline" size="sm" fullWidth icon={<Receipt size={14} />} onClick={() => navigate('/factures')}>
              Voir mes factures
            </Button>
          </Card>
        )}
      </div>

      {/* ── Renewal-specific: payment details (owner only) ── */}
      {isRenewal && isOwner && (
        <Card className="border-amber-100 bg-gradient-to-br from-amber-50/30 to-white animate-fade-in">
          <CardHeader title="Prochain prélèvement" icon={<CalendarClock size={18} />} badge={<Badge variant="warning">Prélèvement à venir</Badge>} />
          <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1 mb-4">
            <Row label="Date du prélèvement" value={<span className="font-bold text-amber-800">1er avril 2026</span>} />
            <Row label="Montant" value={<span className="text-xl font-bold text-amber-700">545 $</span>} />
            <Row label="Carte utilisée" value="Visa •••• 4532" />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Mail size={13} />
            <span>Un courriel de rappel sera envoyé avant le prélèvement</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button fullWidth size="lg" icon={<RefreshCw size={16} />} className="shadow-md">
              Renouveler maintenant
            </Button>
            <Button variant="outline" fullWidth size="lg" icon={<Receipt size={16} />} onClick={() => navigate('/factures')}>
              Voir mes factures
            </Button>
          </div>
        </Card>
      )}

      {/* ── Modals ── */}
      <Modal open={qrModalOpen} onClose={() => setQrModalOpen(false)} title="QR Code — Carte membre" size="sm">
        <div className="text-center py-6">
          <div className="w-52 h-52 mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={clsx('w-5 h-5 rounded-[2px] transition-colors', Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white')} />
              ))}
            </div>
          </div>
          <p className="text-base font-bold text-gray-900">Jean Tremblay</p>
          <p className="text-sm text-gray-400 font-mono tracking-wider">CORP-2026-04521</p>
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
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-corpiq-blue/10 focus:border-corpiq-blue h-24 resize-none transition-all"
                placeholder="Décrivez votre demande..."
              />
            </div>
          </div>
          <Button fullWidth icon={<Mail size={15} />}>Envoyer</Button>
        </div>
      </Modal>

      <Modal open={physicalCardModalOpen} onClose={() => { setPhysicalCardModalOpen(false); setCardRequested(false); }} title="Demander une carte physique" size="sm">
        {cardRequested ? (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-2">Demande envoyée !</p>
            <p className="text-sm text-gray-500 leading-relaxed">Votre carte physique sera envoyée à l'adresse sélectionnée. Délai de réception : 10 à 15 jours ouvrables.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-gray-500">Sélectionnez l'adresse de livraison pour votre carte membre physique.</p>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedAddress('org')}
                className={clsx(
                  'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                  selectedAddress === 'org'
                    ? 'border-corpiq-blue bg-corpiq-blue-50/50 ring-2 ring-corpiq-blue/10'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                    selectedAddress === 'org' ? 'bg-corpiq-blue text-white' : 'bg-gray-100 text-gray-400'
                  )}>
                    <Building size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Adresse de l'organisation</p>
                    <p className="text-xs text-gray-500 mt-0.5">123 rue Sainte-Catherine, Montréal, QC H2X 1L4</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedAddress('personal')}
                className={clsx(
                  'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                  selectedAddress === 'personal'
                    ? 'border-corpiq-blue bg-corpiq-blue-50/50 ring-2 ring-corpiq-blue/10'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                    selectedAddress === 'personal' ? 'bg-corpiq-blue text-white' : 'bg-gray-100 text-gray-400'
                  )}>
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Adresse personnelle</p>
                    <p className="text-xs text-gray-500 mt-0.5">456 avenue du Parc, Montréal, QC H2V 4E6</p>
                  </div>
                </div>
              </button>
            </div>

            <Button fullWidth icon={<MapPin size={15} />} onClick={() => setCardRequested(true)}>
              Confirmer et envoyer
            </Button>
          </div>
        )}
      </Modal>

      <Modal open={contractOpen} onClose={() => setContractOpen(false)} title="Contrat d'adhésion" size="lg">
        <div className="space-y-5">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-corpiq-blue-50 to-white rounded-xl border border-corpiq-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-corpiq-blue rounded-xl flex items-center justify-center">
                <FileText size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Contrat CORPIQ — 2 ans Premium</p>
                <p className="text-xs text-gray-400">Signé le 15 mars 2026 · PDF · 2 pages</p>
              </div>
            </div>
            <Badge variant="info">Lecture seule</Badge>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 max-h-[400px] overflow-y-auto scrollbar-thin">
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Contrat d'adhésion CORPIQ</h4>

            <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
              <div>
                <p className="font-bold text-gray-800 mb-1">Article 1 — Parties</p>
                <p>Le présent contrat est conclu entre la Corporation des propriétaires immobiliers du Québec (CORPIQ) et le membre identifié ci-dessous :</p>
                <div className="mt-2 p-3 bg-white rounded-lg border border-gray-100 space-y-1">
                  <p><span className="text-gray-400">Nom :</span> <span className="font-semibold text-gray-900">Jean Tremblay</span></p>
                  <p><span className="text-gray-400">N° membre :</span> <span className="font-mono font-semibold text-gray-900">CORP-2026-04521</span></p>
                  <p><span className="text-gray-400">Organisation :</span> <span className="font-semibold text-gray-900">Immeubles Tremblay Inc.</span></p>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">Article 2 — Durée et tarif</p>
                <p>L'adhésion est consentie pour une durée de <strong>2 ans</strong>, soit du <strong>15 mars 2026</strong> au <strong>15 mars 2028</strong>, au tarif de <strong>545 $</strong> (incluant les frais d'ouverture de dossier de 50 $).</p>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">Article 3 — Services inclus</p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Accès aux outils de gestion immobilière</li>
                  <li>Calculateur de loyer et modèles de lettres</li>
                  <li>Rabais partenaires et avantages exclusifs</li>
                  <li>Support technique et juridique</li>
                  <li>Consultation juridique gratuite (offre Premium)</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">Article 4 — Renouvellement</p>
                <p>L'adhésion se renouvelle automatiquement à la date d'échéance, sauf avis contraire communiqué au chargé de compte au moins 30 jours avant la date de fin.</p>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">Article 5 — Résiliation</p>
                <p>Le membre peut résilier son adhésion en contactant son chargé de compte. Aucun remboursement n'est accordé pour la période restante. En cas de non-renouvellement au-delà de 90 jours après expiration, une réadhésion complète avec frais de dossier sera requise.</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-gray-400 italic">Document généré automatiquement — Version du contrat : mars 2026</p>
              </div>
            </div>
          </div>

          <Button fullWidth variant="outline" icon={<Download size={15} />}>
            Télécharger le contrat (PDF)
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── GRACE PERIOD VIEW ───────────────────────────────────────
function GracePeriodView() {
  const { scenario } = useScenario();
  const isOwner = scenario.role === 'owner';

  return (
    <div className="space-y-6 animate-fade-in">
      <StatusBanner
        variant="error"
        title="Période de grâce — Action requise"
        message="Votre paiement doit être régularisé. L'accès est limité au paiement, profil et support technique uniquement."
      />

      <Card className="overflow-hidden">
        <CardHeader title="Régularisation requise" icon={<Timer size={18} />} badge={<Badge variant="danger" dot>Urgent</Badge>} />
        <div className="space-y-1 mb-5">
          <Row label="N° membre" value="CORP-2026-04521" mono />
          <Row label="Rôle" value={getRoleBadge(scenario.role)} />
          <Row label="Date d'expiration" value="15 mars 2026" />
          <Row label="Statut" value={<Badge variant="danger">Période de grâce</Badge>} />
        </div>

        {/* Warning about consequences */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">Attention — Délai limité</p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Si vous ne renouvelez pas maintenant, votre adhésion passera en statut <strong>expiré</strong> et nécessitera une <strong>réadhésion complète</strong> avec des <strong>frais d'ouverture de dossier de 50 $</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-red-50/80 border border-red-100 rounded-xl mb-5">
          <div className="flex items-start gap-3">
            <Ban size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-800">Accès restreint</p>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {[
                  { label: 'Outils premium', ok: false },
                  { label: 'Factures', ok: false },
                  { label: 'Avantages', ok: false },
                  { label: 'Support juridique', ok: false },
                  { label: 'Paiement (propriétaire)', ok: true },
                  { label: 'Profil', ok: true },
                  { label: 'Support technique', ok: true },
                  { label: 'Adhésion', ok: true },
                ].map(item => (
                  <div key={item.label} className={clsx('flex items-center gap-1.5 text-[11px] font-medium py-1', item.ok ? 'text-emerald-700' : 'text-red-600')}>
                    {item.ok ? <CheckCircle size={11} /> : <XCircle size={11} />}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isOwner ? (
          <>
            <Button fullWidth size="lg" icon={<CreditCard size={16} />} className="shadow-lg hover:shadow-xl transition-shadow">
              Régulariser mon paiement maintenant
            </Button>
            <p className="text-[11px] text-gray-400 mt-2.5 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} /> Redirection sécurisée vers Moneris
            </p>
          </>
        ) : (
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <Lock size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-bold text-gray-500">Paiement réservé au propriétaire</p>
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              Contactez le membre principal de votre organisation pour régulariser le paiement.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── EXPIRED VIEW ────────────────────────────────────────────
function ExpiredView() {
  const { scenario } = useScenario();
  const isOwner = scenario.role === 'owner';
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
          : `Votre adhésion a expiré il y a ${daysSinceExpiry} jours. Renouvelez maintenant pour éviter des frais supplémentaires.`
        }
      />

      <Card className="overflow-hidden">
        <CardHeader
          title={isReadhesion ? 'Réadhésion requise' : 'Renouvellement'}
          icon={<Crown size={18} />}
          badge={<Badge variant="danger" dot>Expiré · {daysSinceExpiry}j</Badge>}
        />
        <div className="space-y-1 mb-5">
          <Row label="N° membre" value="CORP-2026-04521" mono />
          <Row label="Rôle" value={getRoleBadge(scenario.role)} />
          <Row label="Date d'expiration" value="25 janvier 2026" />
          <Row label="Jours depuis expiration" value={<span className="font-bold text-red-600">{daysSinceExpiry} jours</span>} />
          <Row label="Type" value={isReadhesion ? <Badge variant="danger">Réadhésion</Badge> : <Badge variant="warning">Renouvellement</Badge>} />
        </div>

        {/* Frais de dossier notice */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Receipt size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Frais applicables</p>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                {isReadhesion
                  ? 'La réadhésion inclut le prix de l\'offre choisie + les frais d\'ouverture de dossier de 50 $.'
                  : 'Le renouvellement inclut le prix de votre offre actuelle + les frais de renouvellement de dossier de 50 $.'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-5">
          <p className="text-xs font-bold text-gray-700 mb-3">Règle de délai</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className={clsx('w-2.5 h-2.5 rounded-full ring-2 transition-all', daysSinceExpiry <= 90 ? 'bg-amber-500 ring-amber-200' : 'bg-gray-300 ring-gray-200')} />
              <p className={clsx('text-xs leading-relaxed', daysSinceExpiry <= 90 ? 'text-gray-900 font-semibold' : 'text-gray-400')}>
                ≤ 90 jours — Renouvellement + frais de dossier (50 $)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={clsx('w-2.5 h-2.5 rounded-full ring-2 transition-all', daysSinceExpiry > 90 ? 'bg-red-500 ring-red-200' : 'bg-gray-300 ring-gray-200')} />
              <p className={clsx('text-xs leading-relaxed', daysSinceExpiry > 90 ? 'text-gray-900 font-semibold' : 'text-gray-400')}>
                {'>'} 90 jours — Réadhésion complète + frais de dossier (50 $)
              </p>
            </div>
          </div>
        </div>

        {isOwner ? (
          <div className="space-y-3">
            <Button fullWidth size="lg" icon={isReadhesion ? <ArrowRight size={16} /> : <RefreshCw size={16} />} className="shadow-lg hover:shadow-xl transition-shadow">
              {isReadhesion ? 'Commencer la réadhésion' : 'Renouveler mon adhésion'}
            </Button>

            <div className="p-3.5 bg-amber-50/80 border border-amber-100 rounded-xl">
              <p className="text-xs font-bold text-amber-800 mb-1">Réadhésion bloquée ?</p>
              <p className="text-[11px] text-amber-600 mb-2.5 leading-relaxed">En cas de facture impayée, dossier en collection ou situation sensible, la réadhésion nécessite une validation humaine.</p>
              <Button variant="outline" size="sm" fullWidth icon={<Headphones size={13} />} onClick={() => setShowBlockedModal(true)}>
                Contacter le support
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <Lock size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-bold text-gray-500">Paiement réservé au propriétaire</p>
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              Le renouvellement ou la réadhésion doivent être effectués par le membre principal de l'organisation.
            </p>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader title="Accès actuels" icon={<ShieldCheck size={18} />} />
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Outils publics', ok: true },
            { label: 'Outils premium', ok: false },
            { label: 'Paiement (propriétaire)', ok: true },
            { label: 'Factures', ok: false },
            { label: 'Profil', ok: true },
            { label: 'Avantages', ok: false },
          ].map((item) => (
            <div key={item.label} className={clsx(
              'flex items-center gap-2 p-3 rounded-xl text-xs font-semibold transition-colors',
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
              <p className="text-sm font-bold text-amber-900">Cas bloquants possibles</p>
              <ul className="text-xs text-amber-700 mt-1.5 space-y-1">
                <li>• Facture impayée</li>
                <li>• Dossier en collection / finance</li>
                <li>• Dossier sensible nécessitant une revue</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500">Une intervention humaine est nécessaire pour débloquer votre situation.</p>
          <Button fullWidth icon={<Phone size={15} />}>Contacter CORPIQ</Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── CANCELLED / DEACTIVATED VIEW ────────────────────────────
function CancelledView() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-gray-200">
        <div className="text-center py-6">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gray-200/50 rounded-2xl animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Ban size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Compte désactivé</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed mb-6">
            Votre compte a été désactivé. Pour une réactivation ou une réadhésion complète, vous devez contacter un chargé de compte CORPIQ.
          </p>

          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-left mb-6 max-w-sm mx-auto">
            <p className="text-xs font-bold text-gray-700 mb-2">Pourquoi contacter un chargé de compte ?</p>
            <ul className="text-xs text-gray-500 space-y-1.5">
              <li className="flex items-start gap-2"><UserCheck size={12} className="text-gray-400 mt-0.5 flex-shrink-0" /> Vérification de votre identité</li>
              <li className="flex items-start gap-2"><Receipt size={12} className="text-gray-400 mt-0.5 flex-shrink-0" /> Règlement des soldes impayés</li>
              <li className="flex items-start gap-2"><RefreshCw size={12} className="text-gray-400 mt-0.5 flex-shrink-0" /> Processus de réadhésion accompagné</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Button fullWidth icon={<Phone size={15} />} onClick={() => setContactOpen(true)}>
              Contacter un chargé de compte
            </Button>
            <Button variant="outline" fullWidth icon={<Headphones size={15} />}>
              Support technique
            </Button>
          </div>
        </div>
      </Card>

      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Contacter un chargé de compte" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Un chargé de compte CORPIQ pourra vous accompagner dans le processus de réactivation ou de réadhésion.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <Phone size={16} className="text-corpiq-blue" />
              <div>
                <p className="text-xs text-gray-400">Téléphone</p>
                <p className="text-sm font-bold text-gray-900">1-800-CORPIQ</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <Mail size={16} className="text-corpiq-blue" />
              <div>
                <p className="text-xs text-gray-400">Courriel</p>
                <p className="text-sm font-bold text-gray-900">comptes@corpiq.com</p>
              </div>
            </div>
          </div>
          <Input label="Votre message (optionnel)" />
          <Button fullWidth icon={<Mail size={15} />}>Envoyer une demande</Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────
export function AdhesionPage() {
  const { scenario } = useScenario();
  const isInactive = !scenario.user_active;

  const subtitles: Record<string, string> = {
    NON_MEMBER: 'Découvrez nos offres et adhérez à CORPIQ',
    MEMBER_ACTIVE: 'Gérez votre adhésion et votre carte membre',
    MEMBER_IN_PROGRESS: 'Votre renouvellement est en cours',
    MEMBER_GRACE_PERIOD: 'Régularisez votre paiement',
    MEMBER_EXPIRED: 'Renouvelez pour retrouver vos accès',
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-gradient-to-br from-corpiq-blue-50 to-corpiq-blue/10 rounded-xl flex items-center justify-center shadow-sm">
          <Crown size={22} className="text-corpiq-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mon adhésion</h1>
          <p className="text-sm text-gray-500">
            {isInactive ? 'Votre compte est désactivé' : subtitles[scenario.membership_state]}
          </p>
        </div>
      </div>

      {isInactive && <CancelledView />}
      {!isInactive && scenario.membership_state === 'NON_MEMBER' && <NonMemberView />}
      {!isInactive && scenario.membership_state === 'MEMBER_ACTIVE' && <MemberView />}
      {!isInactive && scenario.membership_state === 'MEMBER_IN_PROGRESS' && <MemberView isRenewal />}
      {!isInactive && scenario.membership_state === 'MEMBER_GRACE_PERIOD' && <GracePeriodView />}
      {!isInactive && scenario.membership_state === 'MEMBER_EXPIRED' && <ExpiredView />}
    </div>
  );
}
