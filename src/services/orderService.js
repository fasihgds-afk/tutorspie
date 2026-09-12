import { orderApi } from "@/api/orders/orderApi";
import { buildBackendOrderPayload, mapBackendOrderToUi } from "@/utils/orderMapper";

export const orderService = {
  createOrder: async (orderForm) => {
    const payload = buildBackendOrderPayload(orderForm);
    const res = await orderApi.createOrder(payload);
    return res?.data?.order ? mapBackendOrderToUi(res.data.order) : null;
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
