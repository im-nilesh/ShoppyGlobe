import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-12 max-w-lg w-full text-center">
        <h1 className="text-8xl font-black text-blue-500">404</h1>

        <h2 className="text-3xl font-bold text-white mt-4">Page Not Found</h2>

        <p className="text-slate-400 mt-5">
          The page you're looking for doesn't exist.
        </p>

        <Link to="/" className="btn-primary inline-block mt-10">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
