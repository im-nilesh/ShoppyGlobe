import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";
function Header() {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Header</h1>
      <h1>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">CheckOut</Link>
      </h1>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => {
          dispatch(setSearchTerm(e.target.value));
        }}
      />
    </>
  );
}
export default Header;
