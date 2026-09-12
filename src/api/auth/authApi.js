import { request } from "../client/apiClient";
import { API_CONFIG } from "@/config/apiConfig";
import { ENV } from "@/config/env";

export const authApi = {
  signup: async ({
    fullName,
    email,
    countryCode,
    phoneNumber,
    password,
    tag = ENV.SITE_TAG,
  }) => {
    return await request(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, {
      method: "POST",
      body: {
        fullName,
        email,
        countryCode,
        phoneNumber,
        password,
        tag,
      },
    });
  },

  login: async ({ email, password }) => {
    return await request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: {
        email,
        password,
      },
    });
  },

  getMe: async () => {
    return await request(API_CONFIG.ENDPOINTS.AUTH.ME, {
      method: "GET",
    });
  },

  checkEmail: async (email) => {
    return await request(
      `${API_CONFIG.ENDPOINTS.AUTH.CHECK_EMAIL}?email=${encodeURIComponent(email)}`,
      { method: "GET" },
    );
  },
};

export default authApi;
