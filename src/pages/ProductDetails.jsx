import { useEffect, useState, useContext } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-10 p-8">
        {/* IMAGE */}

        <div>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width="600"
            height="450"
            className="w-full h-[450px] object-cover rounded-2xl"
          />
        </div>

        {/* DETAILS */}

        <div className="flex flex-col justify-center">
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full w-fit text-sm font-medium">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-5 leading-7">{product.description}</p>

          <div className="mt-8 space-y-3">
            <p className="text-3xl font-bold text-blue-600">
              ₹{product.pricePerMonth}
              <span className="text-base text-gray-500 font-normal">
                /month
              </span>
            </p>

            <p className="text-lg text-gray-700">
              Deposit:
              <span className="font-semibold"> ₹{product.deposit}</span>
            </p>

            <p className="text-lg text-gray-700">
              Stock:
              <span className="font-semibold"> {product.stock}</span>
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              addToCart(product);

              setTimeout(() => {
                navigate("/cart");
              }, 100);
            }}
            className="mt-10 bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
