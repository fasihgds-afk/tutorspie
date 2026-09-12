import { API_CONFIG } from "@/config/apiConfig";
import { tokenManager } from "@/utils/tokenManager";

export async function request(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = {
    ...API_CONFIG.HEADERS,
    ...(options.headers || {}),
  };

  const token = tokenManager.getToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (
    config.body &&
    typeof config.body === "object" &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  let res;
  try {
    res = await fetch(url, config);
  } catch (err) {
    const netErr = new Error("Unable to connect to server. Please check your network connection.");
    netErr.status = 0;
    throw netErr;
  }

  let data = null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  }

  if (res.status === 401) {
    tokenManager.removeToken();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
  }

  if (!res.ok) {
    const errorMsg =
      (data && data.message) ||
      (data && Array.isArray(data.errors) && data.errors[0]?.msg) ||
      (data && Array.isArray(data.errors) && data.errors[0]?.message) ||
      `Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const apiClient = {
  request,
  getToken: tokenManager.getToken,
  setToken: tokenManager.setToken,
  removeToken: tokenManager.removeToken,
};

export default apiClient;
