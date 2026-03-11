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

export default function App() {
  return (
    <ScenarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          <Route path="/auth/cgu" element={<CGUPage />} />
          <Route path="/auth/inactive" element={<InactivePage />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>

        <ScenarioSwitcher />
      </BrowserRouter>
    </ScenarioProvider>
  );
}
