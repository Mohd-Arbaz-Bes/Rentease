import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ p }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 hover:-translate-y-2">

      <img
        src={p.image || "https://via.placeholder.com/300"}
        alt={p.name}
        loading="lazy"
        width="400"
        height="300"
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h3 className="text-xl font-bold text-gray-800">

            {p.name}

          </h3>

          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

            {p.category}

          </span>

        </div>

        <p className="text-blue-600 text-2xl font-bold mt-4">

          ₹{p.pricePerMonth}

          <span className="text-sm text-gray-500 font-normal">

            /month

          </span>

        </p>

        <Link to={`/products/${p._id}`}>

          <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">

            View Details

          </button>

        </Link>

      </div>

    </div>
  );
}

export default React.memo(ProductCard);