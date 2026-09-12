import { request } from "../client/apiClient";
import { API_CONFIG } from "@/config/apiConfig";

export const orderApi = {
  createOrder: async (data) => {
    return await request(API_CONFIG.ENDPOINTS.ORDERS.BASE, {
      method: "POST",
      body: data,
    });
  },

  getMyOrders: async () => {
    return await request(API_CONFIG.ENDPOINTS.ORDERS.MY_ORDERS, {
      method: "GET",
    });
  },

  getOrderById: async (orderId) => {
    return await request(API_CONFIG.ENDPOINTS.ORDERS.BY_ID(orderId), {
      method: "GET",
    });
  },

  updateOrder: async (orderId, data) => {
    return await request(API_CONFIG.ENDPOINTS.ORDERS.BY_ID(orderId), {
      method: "PATCH",
      body: data,
    });
  },

  confirmOrder: async (orderId) => {
    return await request(API_CONFIG.ENDPOINTS.ORDERS.CONFIRM(orderId), {
      method: "POST",
    });
  },
};

export default orderApi;
