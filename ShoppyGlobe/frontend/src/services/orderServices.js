import api from "./api";

// Get all orders of the logged-in user
export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Get single order (for future use)
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
