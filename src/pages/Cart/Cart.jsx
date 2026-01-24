import { Link } from "react-router";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";

const Cart = () => {
  // Demo cart items - will be replaced with context/state
  const cartItems = [
    {
      id: 1,
      name: "Cappuccino",
      price: 180,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    },
    {
      id: 2,
      name: "Cold Brew",
      price: 220,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-amber-50">
        <FiShoppingBag className="text-6xl text-amber-300 mb-4" />
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-amber-700 mb-6">
          Add some delicious coffee to get started!
        </p>
        <Link
          to="/menu"
          className="btn bg-amber-600 hover:bg-amber-700 text-white border-none"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 lg:px-8 bg-amber-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card card-side bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <figure className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-amber-900">{item.name}</h2>
                  <p className="text-amber-600 font-bold">৳{item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-circle btn-sm bg-amber-100 hover:bg-amber-200 border-none">
                        <FiMinus />
                      </button>
                      <span className="font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button className="btn btn-circle btn-sm bg-amber-100 hover:bg-amber-200 border-none">
                        <FiPlus />
                      </button>
                    </div>
                    <button className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-white shadow-lg sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-amber-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Subtotal</span>
                    <span className="font-medium">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Tax (5%)</span>
                    <span className="font-medium">৳{tax}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-amber-900">Total</span>
                    <span className="text-amber-600">৳{total}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="btn bg-amber-600 hover:bg-amber-700 text-white border-none mt-6 w-full"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/menu"
                  className="btn btn-ghost text-amber-600 w-full"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
