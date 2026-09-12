import { ROUTES } from "@/constants/routeConstants";

/**
 * Validates and ensures a redirection path is a safe internal route.
 * Rejects external URLs (http://, https://, //) and malicious protocols (javascript:)
 */
export function getSafeInternalRedirect(nextParam, fallback = ROUTES.ACCOUNT) {
  if (!nextParam || typeof nextParam !== "string") {
    return fallback;
  }

  const trimmed = nextParam.trim();

  // Must start with '/' and NOT with '//' or '\'
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
    return fallback;
  }

  // Reject protocol strings
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return fallback;
  }

  return trimmed;
}

export function buildLoginRedirect(currentPath) {
  if (!currentPath || currentPath === ROUTES.HOME || currentPath === ROUTES.LOGIN) {
    return ROUTES.LOGIN;
  }
  return `${ROUTES.LOGIN}?next=${encodeURIComponent(currentPath)}`;
}

export default {
  getSafeInternalRedirect,
  buildLoginRedirect,
};
