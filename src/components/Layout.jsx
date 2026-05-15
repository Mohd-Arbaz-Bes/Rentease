import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Layout = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/products?limit=3")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <>

      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-full rounded-b-3xl px-6 py-14 overflow-hidden">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}

          <div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg">

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">

                Upgrade Your Home <br />
                with Easy Rentals

              </h1>

              <p className="text-blue-100 mt-4 text-lg">

                Affordable, Flexible & Hassle-Free
                Furniture and Appliance Rentals

              </p>

              {/* FEATURE POINTS */}

              <div className="flex flex-wrap gap-4 mt-6 text-white text-sm">

                <span className="bg-white/20 px-3 py-2 rounded-full">
                  ✔ Free Delivery
                </span>

                <span className="bg-white/20 px-3 py-2 rounded-full">
                  ✔ Easy Returns
                </span>

                <span className="bg-white/20 px-3 py-2 rounded-full">
                  ✔ No Deposit
                </span>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4 mt-8">

                <Link to="/products">

                  <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">

                    Explore Products

                  </button>

                </Link>

                <Link to="/register">

                  <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">

                    Get Started

                  </button>

                </Link>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
              alt="Furniture"
              className="w-full max-w-md rounded-3xl shadow-2xl object-cover"
            />

          </div>

        </div>

      </div>

      {/* FEATURED PRODUCTS */}

      <div className="mt-14 px-6">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {products.map((p) => (

            <Link key={p._id} to={`/products/${p._id}`}>

              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 hover:-translate-y-1">

                <img
                  src={p.image || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-semibold text-lg">
                    {p.name}
                  </h3>

                  <p className="text-blue-600 font-bold mt-2">
                    ₹{p.pricePerMonth}/month
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </>
  );
};

export default Layout;