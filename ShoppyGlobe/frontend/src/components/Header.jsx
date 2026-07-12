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

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="glass max-w-7xl mx-auto h-20 px-8 flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold whitespace-nowrap">
          <span className="text-white">Shoppy</span>
          <span className="text-blue-500">Globe</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full input-dark"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 ml-auto">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/orders"
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition whitespace-nowrap"
              >
                Orders
              </Link>

              <Link
                to="/cart"
                className="relative px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link
                to="/checkout"
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition whitespace-nowrap"
              >
                Checkout
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                Login
              </Link>

              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="glass-light px-4 py-2 rounded-xl whitespace-nowrap">
                Hi, <span className="font-semibold">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white cursor-pointer"
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
