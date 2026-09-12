import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ROUTES } from "@/constants/routeConstants";
import { getSafeInternalRedirect } from "@/utils/redirect";

/**
 * Route guard for routes that require an authenticated student (e.g. /account)
 */
export function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="account-loading" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        Loading your workspace…
      </div>
    );
  }

  if (!user) {
    const currentPath = location.pathname + location.search + location.hash;
    const redirectUrl = `${ROUTES.LOGIN}?next=${encodeURIComponent(currentPath)}`;
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
}

/**
 * Route guard for guest-only routes (e.g. /login, /signup).
 * If student is already logged in, redirect them to /account or their requested safe 'next' page.
 */
export function PublicOnlyRoute({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="account-loading" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        Loading…
      </div>
    );
  }

  if (user) {
    const searchParams = new URLSearchParams(location.search);
    const nextParam = searchParams.get("next");
    const target = getSafeInternalRedirect(nextParam, ROUTES.ACCOUNT);
    return <Navigate to={target} replace />;
  }

  return children;
}

export default {
  ProtectedRoute,
  PublicOnlyRoute,
};
