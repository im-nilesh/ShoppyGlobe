import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return alert("Please fill all the fields");
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      login(response.user, response.token);

      alert(response.message);

      // Redirect to the page user originally wanted,
      // otherwise go to Home.
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass w-full max-w-md rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-slate-400 text-center mt-3 mb-8">
          Login to continue shopping.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="input-dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
