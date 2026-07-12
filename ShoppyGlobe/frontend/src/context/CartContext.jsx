import { createContext, useContext, useEffect, useState } from "react";
import {
  getCartItems,
  addToCart as addToCartAPI,
  updateCartItem,
  deleteCartItem,
} from "../services/cartServices";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await getCartItems();

      setCartItems(response.cartItems);
    } catch (error) {
      console.error(error);

      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(productId, quantity = 1) {
    await addToCartAPI(productId, quantity);
    await fetchCart();
  }

  async function updateQuantity(cartId, quantity) {
    await updateCartItem(cartId, quantity);
    await fetchCart();
  }

  async function removeItem(cartId) {
    await deleteCartItem(cartId);
    await fetchCart();
  }

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
