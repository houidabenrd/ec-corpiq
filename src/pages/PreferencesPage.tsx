import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PreferencesSection } from '../components/profile/PreferencesSection';

export function PreferencesPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 animate-fade-in">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-5"
        >
          <ArrowLeft size={16} />
          Retour au tableau de bord
        </button>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Préférences</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez vos préférences de communication et consultez les CGU</p>
      </div>

      <PreferencesSection />
    </div>
  );
}
