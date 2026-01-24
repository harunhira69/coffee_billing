import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  // Demo order summary
  const subtotal = 580;
  const tax = 29;
  const total = 609;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been successfully placed",
      confirmButtonColor: "#d97706",
    }).then(() => {
      navigate("/order-success");
    });
  };

  return (
    <div className="py-8 px-4 lg:px-8 bg-amber-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-amber-900 mb-4">
                Delivery Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-amber-800">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input input-bordered focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-amber-800">
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="input input-bordered focus:border-amber-500"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-amber-800">
                      Delivery Address
                    </span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    className="textarea textarea-bordered focus:border-amber-500"
                    rows={3}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-amber-800">
                      Payment Method
                    </span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-amber-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleChange}
                        className="radio radio-warning"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-amber-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash"
                        checked={formData.paymentMethod === "bkash"}
                        onChange={handleChange}
                        className="radio radio-warning"
                      />
                      <span>bKash</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-amber-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="nagad"
                        checked={formData.paymentMethod === "nagad"}
                        onChange={handleChange}
                        className="radio radio-warning"
                      />
                      <span>Nagad</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn bg-amber-600 hover:bg-amber-700 text-white border-none w-full mt-6"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card bg-white shadow-lg h-fit sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-amber-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-amber-700">Cappuccino x 2</span>
                  <span className="font-medium">৳360</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-amber-700">Cold Brew x 1</span>
                  <span className="font-medium">৳220</span>
                </div>
                <div className="flex justify-between pt-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
