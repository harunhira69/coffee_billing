import { Link } from "react-router";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="text-center">
        <FiAlertTriangle className="text-8xl text-amber-400 mx-auto mb-6" />
        <h1 className="text-9xl font-bold text-amber-200">404</h1>
        <h2 className="text-3xl font-bold text-amber-900 mt-4">
          Page Not Found
        </h2>
        <p className="text-amber-700 mt-2 max-w-md mx-auto">
          Oops! The page you're looking for seems to have gone for a coffee break.
        </p>
        <Link
          to="/"
          className="btn bg-amber-600 hover:bg-amber-700 text-white border-none mt-8"
        >
          <FiHome className="mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
