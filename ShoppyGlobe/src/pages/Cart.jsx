import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <>
      <h1>Cart Page</h1>
    </>
  );
}
export default Cart;
