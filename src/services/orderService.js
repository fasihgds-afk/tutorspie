import { orderApi } from "@/api/orders/orderApi";
import { buildBackendOrderPayload, mapBackendOrderToUi } from "@/utils/orderMapper";

export const orderService = {
  createOrder: async (orderForm) => {
    // Step 1: Create order as draft
    const payload = buildBackendOrderPayload(orderForm);
    const createRes = await orderApi.createOrder(payload);
    const draftOrder = createRes?.data?.order ? mapBackendOrderToUi(createRes.data.order) : null;
    
    if (!draftOrder?.id) {
      throw new Error("Failed to create order");
    }
    
    // Step 2: Immediately confirm the order to change status to AWAITING_PAYMENT
    const confirmRes = await orderApi.confirmOrder(draftOrder.id);
    return confirmRes?.data?.order ? mapBackendOrderToUi(confirmRes.data.order) : draftOrder;
  },

  updateDraft: async (orderId, orderFormOrChanges) => {
    let payload;
    if (orderFormOrChanges.typeOfWork || orderFormOrChanges.pages || orderFormOrChanges.topic) {
      payload = buildBackendOrderPayload(orderFormOrChanges);
    } else {
      payload = orderFormOrChanges;
    }
    const res = await orderApi.updateOrder(orderId, payload);
    return res?.data?.order ? mapBackendOrderToUi(res.data.order) : null;
  },

  confirmOrder: async (orderId) => {
    const res = await orderApi.confirmOrder(orderId);
    return res?.data?.order ? mapBackendOrderToUi(res.data.order) : null;
  },

  getMyOrders: async () => {
    const res = await orderApi.getMyOrders();
    const list = res?.data?.orders || [];
    return list.map(mapBackendOrderToUi);
  },

  getOrder: async (orderId) => {
    const res = await orderApi.getOrderById(orderId);
    return res?.data?.order ? mapBackendOrderToUi(res.data.order) : null;
  },
};

export default orderService;
