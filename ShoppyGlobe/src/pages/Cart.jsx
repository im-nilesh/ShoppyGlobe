import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

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
        return <CartItem key={product.id} product={product} />;
      })}
      <h2>Total: {total}</h2>
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </button>
      <Link to="/checkout">
        <button>Proceed To Checkout</button>
      </Link>
    </>
  );
}
export default Cart;
