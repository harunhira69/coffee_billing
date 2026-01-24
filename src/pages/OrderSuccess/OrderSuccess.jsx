import { Link } from "react-router";
import { FiCheckCircle, FiHome, FiCoffee } from "react-icons/fi";

const OrderSuccess = () => {
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-amber-50 to-green-50 px-4">
      <div className="card bg-white shadow-xl max-w-md w-full">
        <div className="card-body items-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <FiCheckCircle className="text-5xl text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-amber-900">Order Confirmed!</h1>
          <p className="text-amber-700 mt-2">
            Thank you for your order. Your coffee is being prepared with love!
          </p>

          <div className="bg-amber-50 rounded-lg p-4 w-full mt-6">
            <p className="text-sm text-amber-600">Order Number</p>
            <p className="text-xl font-bold text-amber-900">{orderNumber}</p>
          </div>

          <div className="mt-6 space-y-3 w-full">
            <div className="flex items-center gap-3 text-amber-700">
              <FiCoffee className="text-amber-600" />
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">
            <Link
              to="/"
              className="btn bg-amber-600 hover:bg-amber-700 text-white border-none flex-1"
            >
              <FiHome className="mr-2" />
              Back to Home
            </Link>
            <Link
              to="/menu"
              className="btn btn-outline border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 flex-1"
            >
              Order More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
