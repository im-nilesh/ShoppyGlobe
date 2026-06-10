import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice";
function Cart() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return (
    <>
      <h1>Cart</h1>

      {cart.map((product) => {
        return (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <h3>{product.price}</h3>
            <button
              onClick={() => {
                dispatch(decrementQuantity(product.id));
              }}
            >
              -
            </button>
            <span>{product.quantity}</span>
            <button
              onClick={() => {
                dispatch(incrementQuantity(product.id));
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                dispatch(removeFromCart(product.id));
              }}
            >
              Remove From Cart
            </button>
          </div>
        );
      })}
      <h2>Total: {total}</h2>
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </button>
    </>
  );
}
export default Cart;
