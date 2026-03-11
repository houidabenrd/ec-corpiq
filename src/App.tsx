import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Crown, Receipt, Wrench, Star, Calendar, Headphones } from 'lucide-react';
import { ScenarioProvider } from './context/ScenarioContext';
import { ScenarioSwitcher } from './components/ScenarioSwitcher';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { VerifyEmailPage } from './components/auth/VerifyEmailPage';
import { CGUPage } from './components/auth/CGUPage';
import { InactivePage } from './components/auth/InactivePage';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { PrototypeHub } from './pages/PrototypeHub';

export default function App() {
  return (
    <ScenarioProvider>
      <BrowserRouter>
        <ScenarioSwitcher />

        <Routes>
          <Route path="/" element={<PrototypeHub />} />

          <Route path="/auth/login" element={<div className="pt-10"><LoginPage /></div>} />
          <Route path="/auth/register" element={<div className="pt-10"><RegisterPage /></div>} />
          <Route path="/auth/forgot-password" element={<div className="pt-10"><ForgotPasswordPage /></div>} />
          <Route path="/auth/verify-email" element={<div className="pt-10"><VerifyEmailPage /></div>} />
          <Route path="/auth/cgu" element={<div className="pt-10"><CGUPage /></div>} />
          <Route path="/auth/inactive" element={<div className="pt-10"><InactivePage /></div>} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/adhesion" element={<PlaceholderPage title="Mon adhésion" icon={<Crown size={28} />} />} />
            <Route path="/factures" element={<PlaceholderPage title="Mes factures" icon={<Receipt size={28} />} />} />
            <Route path="/outils" element={<PlaceholderPage title="Mes outils" icon={<Wrench size={28} />} />} />
            <Route path="/avantages" element={<PlaceholderPage title="Avantages" icon={<Star size={28} />} />} />
            <Route path="/evenements" element={<PlaceholderPage title="Événements & formations" icon={<Calendar size={28} />} />} />
            <Route path="/support" element={<PlaceholderPage title="Support" icon={<Headphones size={28} />} />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ScenarioProvider>
  );
}
