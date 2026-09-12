import { request } from "../client/apiClient";
import { API_CONFIG } from "@/config/apiConfig";

export const paymentApi = {
  createPaymentIntent: async (orderId, paymentMethod = "stripe") => {
    return await request(API_CONFIG.ENDPOINTS.PAYMENTS.INTENT(orderId), {
      method: "POST",
      body: {
        paymentMethod,
      },
    });
  },
};

export default paymentApi;
