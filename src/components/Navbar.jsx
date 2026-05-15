import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSearch,
} from "react-icons/fa";

import {
  useContext,
  useState,
} from "react";

import {
  CartContext,
} from "../context/CartContext";

export default function Navbar() {

  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const {
    cart,
    user,
    logoutUser,
  } = useContext(CartContext);

  // LOGOUT

  const handleLogout = () => {

    logoutUser();

    navigate("/login");
  };

  // SEARCH

  const handleSearch = (e) => {

    e.preventDefault();

    if (search.trim()) {

      navigate(
        `/products?search=${search}`
      );
    }
  };

  return (

    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between gap-5">

          {/* LOGO */}

          <Link
            to="/"
            className="text-2xl font-bold text-blue-700"
          >

            RentEase

          </Link>

          {/* SEARCH BAR */}

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 flex-1 max-w-md"
          >

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-transparent outline-none flex-1"
            />

            <button type="submit">

              <FaSearch className="text-gray-500" />

            </button>

          </form>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="hover:text-blue-600 font-medium"
            >

              Home

            </Link>

            <Link
              to="/products"
              className="hover:text-blue-600 font-medium"
            >

              Products

            </Link>

            <Link
              to="/dashboard"
              className="hover:text-blue-600 font-medium"
            >

              Dashboard

            </Link>

            {/* ADMIN */}

            {user?.role === "admin" && (

              <Link
                to="/admin"
                className="hover:text-blue-600 font-medium"
              >

                Admin

              </Link>

            )}

            {/* CART */}

            <Link
              to="/cart"
              className="relative flex items-center"
            >

              <FaShoppingCart size={22} />

              {cart.length > 0 && (

                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">

                  {cart.length}

                </span>

              )}

            </Link>

            {/* USER */}

            {user ? (

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2">

                  <FaUser />

                  <span className="font-medium">

                    {user.name}

                  </span>

                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >

                  Logout

                </button>

              </div>

            ) : (

              <div className="flex gap-3">

                <Link to="/login">

                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">

                    Login

                  </button>

                </Link>

                <Link to="/register">

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">

                    Register

                  </button>

                </Link>

              </div>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >

            <FaBars size={24} />

          </button>

        </div>

        {/* MOBILE MENU */}

        {menuOpen && (

          <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">

            {/* MOBILE SEARCH */}

            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-xl px-4 py-2"
            >

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="bg-transparent outline-none flex-1"
              />

              <button type="submit">

                <FaSearch />

              </button>

            </form>

            <Link to="/">
              Home
            </Link>

            <Link to="/products">
              Products
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            {/* ADMIN */}

            {user?.role === "admin" && (

              <Link
                to="/admin"
                className="hover:text-blue-600 font-medium"
              >

                Admin

              </Link>

            )}

            {/* CART */}

            <Link
              to="/cart"
              className="relative flex items-center"
            >

              <FaShoppingCart size={22} />

              {cart.length > 0 && (

                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">

                  {cart.length}

                </span>

              )}

            </Link>

            {/* USER */}

            {user ? (

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-3xl"
              >

                Logout

              </button>

            ) : (

              <div className="flex gap-3">

                <Link to="/login">

                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-3xl">

                    Login

                  </button>

                </Link>

                <Link to="/register">

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-3xl">

                    Register

                  </button>

                </Link>

              </div>

            )}

          </div>

        )}

      </div>

    </nav>
  );
}