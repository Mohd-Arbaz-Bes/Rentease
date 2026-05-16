import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  const category = query.get("category");

  const search = query.get("search");

  // FETCH PRODUCTS
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `${API}/api/products?category=${category || ""}&search=${search || ""}&limit=8`,
      )
      .then((res) => {
        setProducts(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [category, search]);

  // CATEGORY FILTER
  const handleCategory = (cat) => {
    navigate(`/products?category=${cat}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-10">
      {/* PAGE TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Explore Products
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Rent furniture and appliances at affordable monthly prices
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => handleCategory("furniture")}
          className={`px-5 py-2 rounded-full font-medium transition ${
            category === "furniture"
              ? "bg-blue-600 text-white"
              : "bg-white shadow hover:bg-blue-100"
          }`}
        >
          Furniture
        </button>

        <button
          onClick={() => handleCategory("appliances")}
          className={`px-5 py-2 rounded-full font-medium transition ${
            category === "appliances"
              ? "bg-green-600 text-white"
              : "bg-white shadow hover:bg-green-100"
          }`}
        >
          Appliances
        </button>

        <button
          onClick={() => navigate("/products")}
          className="px-5 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition"
        >
          All Products
        </button>
      </div>

      {/* SEARCH RESULT */}
      {search && (
        <p className="text-center text-gray-600 mb-6">
          Search result for:
          <span className="font-semibold"> {search}</span>
        </p>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading Products...
          </h2>
        </div>
      ) : products.length === 0 ? (
        /* NO PRODUCTS */
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">Try another category or search</p>
        </div>
      ) : (
        /* PRODUCTS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
