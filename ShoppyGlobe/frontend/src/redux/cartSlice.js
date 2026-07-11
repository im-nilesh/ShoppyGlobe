import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // Add product to cart or increase quantity if it already exists

    addToCart(state, action) {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    // Remove product from cart
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    // Clear entire cart
    clearCart() {
      return [];
    },
    // Increase product quantity
    incrementQuantity(state, action) {
      const product = state.find((item) => item.id === action.payload);

      if (product) {
        product.quantity += 1;
      }
    },
    // Decrease product quantity
    decrementQuantity(state, action) {
      const product = state.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
