const TOKEN_KEY = "tutorspie_token";

export const tokenManager = {
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {}
  },

  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },

  hasToken: () => {
    return Boolean(tokenManager.getToken());
  },
};

export const { getToken, setToken, removeToken, hasToken } = tokenManager;
export default tokenManager;
