import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-3xl font-bold text-blue-600">
          ShoppyGlobe
        </Link>

        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />

        <div className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative hover:text-blue-600 transition"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {user && (
            <Link to="/checkout" className="hover:text-blue-600 transition">
              Checkout
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700">Hi, {user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
