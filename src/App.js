import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ProtectedRoute } from "./auth/authGuard";
import { ROUTES } from "./constants/routeConstants";
import { seoRoutes } from "./config/seoRoutes";

import HomePage from "./pages/HomePage";
import SeoPage from "./pages/SeoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import OrderPage from "./pages/OrderPage";
import ConfirmOrderPage from "./pages/ConfirmOrderPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Main Homepage (uses site config) */}
        <Route path={ROUTES.HOME} element={<HomePage />} />

        {/* Dynamic SEO Routes (configured in seoRoutes.js) */}
        {seoRoutes
          .filter(route => route.path !== "/") // Exclude main homepage
          .map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={<SeoPage />} 
            />
          ))
        }

        {/* Public Marketing & Legal Routes */}
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        <Route path={ROUTES.TERMS} element={<TermsPage />} />

        {/* Auth Routes — AuthPanel handles session-active state internally */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        {/* Protected Student Routes */}
        <Route
          path={ROUTES.ACCOUNT}
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDER}
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDER_CONFIRM}
          element={
            <ProtectedRoute>
              <ConfirmOrderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
