import { authApi } from "@/api/auth/authApi";
import { tokenManager } from "@/utils/tokenManager";

export const authService = {
  login: async ({ email, password }) => {
    const res = await authApi.login({
      email: email.trim().toLowerCase(),
      password,
    });
    if (res?.data?.token) {
      tokenManager.setToken(res.data.token);
      return {
        ...res.data.user,
        name: res.data.user.fullName,
      };
    }
    throw new Error(res?.message || "Login failed");
  },

  signup: async ({ fullName, email, countryCode, phoneNumber, password, tag }) => {
    const res = await authApi.signup({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      countryCode: countryCode.trim(),
      phoneNumber: phoneNumber.trim().replace(/\D/g, ""),
      password,
      tag,
    });
    if (res?.data?.token) {
      tokenManager.setToken(res.data.token);
      return {
        ...res.data.user,
        name: res.data.user.fullName,
      };
    }
    throw new Error(res?.message || "Registration failed");
  },

  logout: () => {
    tokenManager.removeToken();
  },

  restoreSession: async () => {
    if (!tokenManager.hasToken()) {
      return null;
    }
    try {
      const res = await authApi.getMe();
      if (res?.data?.user) {
        return {
          ...res.data.user,
          name: res.data.user.fullName,
        };
      }
      return null;
    } catch (err) {
      tokenManager.removeToken();
      return null;
    }
  },
};

export default authService;
