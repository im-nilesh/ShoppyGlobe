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
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/40 border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-blue-400 transition"
        >
          Shoppy<span className="text-blue-500">Globe</span>
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full lg:w-96 bg-zinc-900 border border-zinc-700 text-white rounded-xl px-5 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-white font-medium">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          {user && (
            <>
              <Link to="/orders" className="hover:text-blue-400 transition">
                My Orders
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-blue-400 transition"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-5 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/checkout" className="hover:text-blue-400 transition">
                Checkout
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-zinc-300">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl cursor-pointer"
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
