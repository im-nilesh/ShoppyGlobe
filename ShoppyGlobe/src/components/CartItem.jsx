import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  return (
    <>
      <div>
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
    </>
  );
}
export default CartItem;
