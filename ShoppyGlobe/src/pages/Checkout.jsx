import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  function handleOrder() {
    alert("Order Placed");

    dispatch(clearCart());

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <h2>User Details</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <hr />

      <div>
        <h2>Order Summary</h2>

        {cart.length === 0 ? (
          <h3>Your Cart is Empty</h3>
        ) : (
          cart.map((product) => (
            <div key={product.id}>
              <h4>{product.title}</h4>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Subtotal: ₹{product.price * product.quantity}</p>
            </div>
          ))
        )}

        <h2>Total: ₹{total}</h2>
      </div>

      <button onClick={handleOrder} disabled={cart.length === 0}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
