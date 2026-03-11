import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ScenarioProvider>
  );
}
