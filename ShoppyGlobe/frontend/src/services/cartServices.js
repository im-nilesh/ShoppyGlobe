import api from "./api";

export const getCartItems = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await api.put(`/cart/${cartItemId}`, {
    quantity,
  });

  return response.data;
};

export const deleteCartItem = async (cartItemId) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};
