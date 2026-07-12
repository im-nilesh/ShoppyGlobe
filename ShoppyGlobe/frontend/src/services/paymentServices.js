import api from "./api";

export const createPaymentOrder = async (shippingAddress) => {
  const response = await api.post("/payment/create-order", {
    shippingAddress,
  });

  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/payment/verify", paymentData);

  return response.data;
};
