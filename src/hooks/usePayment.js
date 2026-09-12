import { useState } from "react";
import { paymentService } from "@/services/paymentService";
import { parseApiError } from "@/utils/errorHandler";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState(null);

  const createPaymentIntent = async (orderId, paymentMethod = "stripe") => {
    setLoading(true);
    setError("");
    try {
      const data = await paymentService.createPaymentIntent(orderId, paymentMethod);
      setPaymentData(data);
      return data;
    } catch (err) {
      const parsed = parseApiError(err, "Failed to initialize payment intent.");
      setError(parsed);
      throw new Error(parsed);
    } finally {
      setLoading(false);
    }
  };

  const resetPayment = () => {
    setPaymentData(null);
    setError("");
    setLoading(false);
  };

  return {
    loading,
    error,
    paymentData,
    createPaymentIntent,
    resetPayment,
  };
}

export default usePayment;
