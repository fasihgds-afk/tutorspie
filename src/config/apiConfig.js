import { ENV } from "./env";

export const API_CONFIG = {
  BASE_URL: ENV.API_URL.replace(/\/+$/, ""),
  TIMEOUT_MS: 15000,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  ENDPOINTS: {
    AUTH: {
      SIGNUP: "/auth/signup",
      LOGIN: "/auth/login",
      ME: "/auth/me",
      CHECK_EMAIL: "/auth/check-email",
    },
    ORDERS: {
      BASE: "/orders",
      MY_ORDERS: "/orders/my-orders",
      BY_ID: (orderId) => `/orders/${orderId}`,
      CONFIRM: (orderId) => `/orders/${orderId}/confirm`,
    },
    PAYMENTS: {
      INTENT: (orderId) => `/payments/orders/${orderId}/payment-intent`,
    },
  },
};

export default API_CONFIG;
