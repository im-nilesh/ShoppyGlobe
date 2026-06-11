import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
