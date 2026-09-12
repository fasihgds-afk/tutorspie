import { SITE_CONFIG } from "@/config/siteConfig";
import { useAuth } from "@/auth/useAuth";
import { useOrder } from "@/hooks/useOrder";

export const PHONE = SITE_CONFIG.PHONE;
export const PHONE_HREF = SITE_CONFIG.PHONE_HREF;
export const EMAIL = SITE_CONFIG.EMAIL;
export const EMAIL_HREF = SITE_CONFIG.EMAIL_HREF;
export const NAV_LINKS = SITE_CONFIG.NAV_LINKS;
export const FOOTER_LINKS = SITE_CONFIG.FOOTER_LINKS;

/**
 * Backward compatibility adapter for useAccount
 */
export function useAccount() {
  const auth = useAuth();
  const orderHook = useOrder(true);

  return {
    user: auth.user,
    ready: auth.ready,
    orders: orderHook.orders,
    loadingOrders: orderHook.loading,
    ordersError: orderHook.error,
    refreshOrders: orderHook.fetchOrders,
    authenticate: async (isSignup, name, email, password, phone = "", countryCode = "+1") => {
      if (isSignup) {
        return await auth.signup({
          fullName: name,
          email,
          countryCode,
          phoneNumber: phone,
          password,
        });
      }
      return await auth.login({ email, password });
    },
    logout: auth.logout,
    saveOrder: () => {},
    updateOrder: orderHook.updateDraft,
    updateProfile: () => {
      throw new Error("Profile editing is managed by support and not available.");
    },
  };
}

export {
  SiteHeader,
  SiteFooter,
  AuthPanel,
  DashboardPanel,
  OrdersTable,
  OrderDetails,
} from "./account";
