import { useContext } from "react";

import {
  CartContext,
} from "../context/CartContext";

import {
  Link,
} from "react-router-dom";

import {
  FaTimes,
} from "react-icons/fa";

export default function Cart() {

  const {
    cart,
    removeFromCart,
  } = useContext(CartContext);

  console.log("Cart Data:", cart);

  // SAFE TOTAL

  const totalPrice =
    cart.reduce(
      (total, item) =>
        total +
        Number(
          item?.pricePerMonth || 0
        ),
      0
    );

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">

          Your Cart

        </h1>

        {cart.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl shadow text-center">

            <p className="text-2xl text-gray-500">

              Cart is Empty

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {cart.map(
              (item, index) => (

                <div
                  key={index}
                  className="relative bg-white rounded-3xl shadow p-5 flex flex-col md:flex-row gap-5 items-center"
                >

                  {/* REMOVE BUTTON */}

                  <button
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                  >

                    <FaTimes size={14} />

                  </button>

                  {/* IMAGE */}

                  <img
                    src={
                      item?.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt="product"
                    className="w-40 h-40 object-cover rounded-2xl"
                  />

                  {/* DETAILS */}

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-gray-800">

                      {item?.name}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      {
                        item?.category
                      }

                    </p>

                    <p className="text-blue-600 text-2xl font-bold mt-4">

                      ₹
                      {
                        item?.pricePerMonth
                      }

                      <span className="text-sm text-gray-500 font-normal">

                        /month

                      </span>

                    </p>

                  </div>

                </div>
              )
            )}

            {/* SUMMARY */}

            <div className="bg-white rounded-3xl shadow p-6 mt-10">

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-blue-600">

                  ₹{totalPrice}

                </span>

              </div>

              <Link to="/checkout">

                <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition">

                  Proceed to Checkout

                </button>

              </Link>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}