import api from "./api";

export const placeOrder = async (shippingAddress) => {
  const response = await api.post("/orders", { shippingAddress });
  return response.data;
};
