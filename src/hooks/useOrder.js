import { useState, useCallback, useEffect } from "react";
import { orderService } from "@/services/orderService";
import { parseApiError } from "@/utils/errorHandler";
import { useAuth } from "@/auth/useAuth";

export function useOrder(autoFetch = false) {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const list = await orderService.getMyOrders();
      setOrders(list);
    } catch (err) {
      setError(parseApiError(err, "Failed to load orders."));
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (autoFetch && isAuthenticated) {
      fetchOrders();
    }
  }, [autoFetch, isAuthenticated, fetchOrders]);

  const createOrder = useCallback(async (orderForm) => {
    setLoading(true);
    setError("");
    try {
      const created = await orderService.createOrder(orderForm);
      return created;
    } catch (err) {
      const parsed = parseApiError(err, "Failed to create order.");
      setError(parsed);
      throw new Error(parsed);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDraft = useCallback(async (orderId, changes) => {
    setLoading(true);
    setError("");
    try {
      const updated = await orderService.updateDraft(orderId, changes);
      return updated;
    } catch (err) {
      const parsed = parseApiError(err, "Failed to update order.");
      setError(parsed);
      throw new Error(parsed);
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmOrder = useCallback(async (orderId) => {
    setLoading(true);
    setError("");
    try {
      const confirmed = await orderService.confirmOrder(orderId);
      return confirmed;
    } catch (err) {
      const parsed = parseApiError(err, "Failed to confirm order.");
      setError(parsed);
      throw new Error(parsed);
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrder = useCallback(async (orderId) => {
    try {
      return await orderService.getOrder(orderId);
    } catch (err) {
      throw new Error(parseApiError(err, "Failed to retrieve order."));
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateDraft,
    confirmOrder,
    getOrder,
  };
}

export default useOrder;
