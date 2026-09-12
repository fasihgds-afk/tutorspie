import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ProtectedRoute } from "./auth/authGuard";
import { ROUTES } from "./constants/routeConstants";
import { seoRoutes } from "./config/seoRoutes";
import SiteLayout from "./layouts/SiteLayout";

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
        {/* ── Marketing layout ───────────────────────────────────────────────
            SiteLayout renders the correct header + <Outlet /> + footer once,
            based on siteConfig.variant. Pages inside must NOT render their
            own header/footer. */}
        <Route element={<SiteLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.TERMS} element={<TermsPage />} />

          {/* Dynamic SEO routes (configured in seoRoutes.js) */}
          {seoRoutes
            .filter((route) => route.path !== "/") // Exclude main homepage
            .map((route) => (
              <Route key={route.path} path={route.path} element={<SeoPage />} />
            ))}
        </Route>

        {/* ── Compact-header routes ──────────────────────────────────────────
            AuthPanel / DashboardPanel / OrderDetailsPanel / ConfirmOrderPanel
            each self-contain <SiteHeader compact /> + <SiteFooter compact />.
            Kept outside SiteLayout to avoid a double header. */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
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
