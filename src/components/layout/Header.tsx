import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, Globe, ChevronDown, UserCircle, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
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

  function navTo(path: string) {
    setAvatarOpen(false);
    navigate(path);
  }

  return (
    <header className="glass border-b border-gray-200/60 h-14 flex items-center px-4 lg:px-6 sticky top-10 z-30">
      <div className="flex items-center gap-3 flex-shrink-0">
        {isInsideApp && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <button
          onClick={() => isInsideApp ? navigate('/dashboard') : navigate('/')}
          className="flex items-center gap-2.5 hover:opacity-80 active:opacity-70 transition-opacity"
        >
          <div className="w-8 h-8 bg-corpiq-blue rounded-lg flex items-center justify-center shadow-sm">
            <Building2 size={17} className="text-white" />
          </div>
          <span className="font-bold text-corpiq-blue text-sm hidden sm:block">EC CORPIQ</span>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <button
          onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
        >
          <Globe size={15} />
          <span className="min-w-[20px] text-center text-xs font-semibold">{lang}</span>
        </button>

        {isInsideApp && (
          <>
            <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <div className="relative ml-1">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className={clsx(
                  'flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all',
                  avatarOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
                )}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-corpiq-blue to-corpiq-blue-light rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  <span className="text-white text-xs font-bold">JT</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Jean T.</span>
                <ChevronDown size={14} className={clsx('text-gray-400 transition-transform duration-200', avatarOpen && 'rotate-180')} />
              </button>

              {avatarOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-dropdown border border-gray-100 overflow-hidden z-50 animate-scale-in">
                    <div className="px-4 py-3.5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">Jean Tremblay</p>
                      <p className="text-xs text-gray-400 mt-0.5">jean.tremblay@email.com</p>
                    </div>
                    <div className="py-1.5 px-1.5">
                      <button
                        onClick={() => navTo('/profile')}
                        className={clsx(
                          'w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all',
                          location.pathname === '/profile' ? 'text-corpiq-blue bg-corpiq-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        <UserCircle size={16} className={location.pathname === '/profile' ? 'text-corpiq-blue' : 'text-gray-400'} />
                        Mon profil
                      </button>
                      <button
                        onClick={() => navTo('/preferences')}
                        className={clsx(
                          'w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all',
                          location.pathname === '/preferences' ? 'text-corpiq-blue bg-corpiq-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        <Settings size={16} className={location.pathname === '/preferences' ? 'text-corpiq-blue' : 'text-gray-400'} />
                        Préférences
                      </button>
                    </div>
                    <div className="border-t border-gray-100 py-1.5 px-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
                      >
                        <LogOut size={16} />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
