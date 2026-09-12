import { paymentApi } from "@/api/payments/paymentApi";

export const paymentService = {
  createPaymentIntent: async (orderId, paymentMethod = "stripe") => {
    const res = await paymentApi.createPaymentIntent(orderId, paymentMethod);
    return res?.data || null;
  },
};

export default paymentService;
