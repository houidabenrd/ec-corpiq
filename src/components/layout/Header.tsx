import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, Globe, ChevronDown, UserCircle, Settings, LogOut, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useScenario } from '../../context/ScenarioContext';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

export function Header({ onToggleMobileMenu, mobileMenuOpen }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useScenario();
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [avatarOpen, setAvatarOpen] = useState(false);

  const isInsideApp = !location.pathname.startsWith('/auth') && location.pathname !== '/';

  function handleLogout() {
    setIsAuthenticated(false);
    setAvatarOpen(false);
    navigate('/auth/login');
  }

  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 lg:px-6 sticky top-10 z-30">
      <div className="flex items-center gap-3 flex-shrink-0">
        {isInsideApp && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <button
          onClick={() => isInsideApp ? navigate('/dashboard') : navigate('/')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-corpiq-blue rounded-lg flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <span className="font-bold text-corpiq-blue hidden sm:block">EC CORPIQ</span>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <button
          onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Globe size={16} />
          <span>{lang}</span>
        </button>

        {isInsideApp && (
          <div className="relative">
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-corpiq-blue-50 rounded-full flex items-center justify-center">
                <UserCircle size={20} className="text-corpiq-blue" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Jean T.</span>
              <ChevronDown size={14} className={clsx('text-gray-400 transition-transform', avatarOpen && 'rotate-180')} />
            </button>

            {avatarOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Jean Tremblay</p>
                    <p className="text-xs text-gray-400">jean.tremblay@email.com</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/profile'); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserCircle size={16} className="text-gray-400" />
                      Profil
                    </button>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/profile'); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={16} className="text-gray-400" />
                      Préférences
                    </button>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
