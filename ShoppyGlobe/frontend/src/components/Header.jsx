import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchTerm } from "../redux/searchSlice";
import { getCartItems } from "../services/cartServices";

function Header() {
  const dispatch = useDispatch();

  const [totalItems, setTotalItems] = useState(0);

  async function fetchCartCount() {
    try {
      const response = await getCartItems();

      const count = response.cartItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);

      setTotalItems(count);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          ShoppyGlobe
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            dispatch(setSearchTerm(e.target.value));
          }}
        />

        {/* Navigation */}
        <div className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/checkout" className="hover:text-blue-600 transition">
            Checkout
          </Link>

          <Link
            to="/cart"
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
