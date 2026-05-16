import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  // TOTAL PRICE

  const totalPrice = cart.reduce((sum, item) => sum + item.pricePerMonth, 0);

  // CHECKOUT

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // LOGIN CHECK

    if (!user) {
      alert("Please login first");

      navigate("/login");

      return;
    }

    try {
      const res = await axios.post("https://rentease-9mjo.onrender.com/api/orders", {
        userId: user._id,

        products: cart.map((item) => ({
          productId: item._id,

          productName: item.name,

          quantity: 1,

          tenure: 1,
        })),
        productName: cart.map((item) => item.name).join(", "),

        totalAmount: totalPrice,

        deliveryDate: new Date(),
      });

      alert("Order placed successfully!");

      // CLEAR CART

      setCart([]);

      localStorage.removeItem("cart");

      console.log(res.data);

      // REDIRECT HOME

      navigate("/");
    } catch (err) {
      console.log(err);

      alert("Error placing order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}

        <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-5 border rounded-2xl p-4">
                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  {/* DETAILS */}

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-1">{item.category}</p>

                    <p className="text-blue-600 font-bold text-lg mt-3">
                      ₹{item.pricePerMonth}
                      /month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Products</span>

              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>

              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-gray-800">
              <span>Total</span>

              <span>₹{totalPrice}</span>
            </div>
          </div>

          {/* BUTTON */}

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
