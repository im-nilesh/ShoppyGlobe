import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
    <div className="glass px-10 py-8 text-center">
      <div className="h-10 w-10 mx-auto rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

      <p className="mt-5 text-slate-300 text-lg font-medium">Loading...</p>
    </div>
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<LoadingScreen />}>
            <RouterProvider router={router} />
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
