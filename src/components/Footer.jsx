import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO */}

          <div>

            <h2 className="text-3xl font-bold text-blue-400">
              RentEase
            </h2>

            <p className="mt-4 text-gray-300 leading-7">

              Affordable furniture and appliance
              rentals for students, families,
              and working professionals.

            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-300">

              <Link
                to="/"
                className="hover:text-blue-400"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="hover:text-blue-400"
              >
                Products
              </Link>

              <Link
                to="/cart"
                className="hover:text-blue-400"
              >
                Cart
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-blue-400"
              >
                Dashboard
              </Link>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-300">

              <p className="flex items-center gap-3">

                <FaEnvelope />

                support@rentease.com

              </p>

              <p className="flex items-center gap-3">

                <FaPhone />

                +91 9876543200

              </p>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">

              <a
                href="#"
                className="hover:text-blue-400"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="hover:text-pink-400"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="hover:text-sky-400"
              >
                <FaTwitter />
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">

          © 2026 RentEase. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}