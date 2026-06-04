import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <h1>Header</h1>
      <h1>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">CheckOut</Link>
      </h1>
    </>
  );
}
export default Header;
