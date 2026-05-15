import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div >
      
      <Layout products={[]} />
      <Footer />
    </div>
    // <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

    //   <div className="bg-white shadow-lg rounded-2xl p-10 max-w-xl w-full text-center">

    //     {/* Title */}
    //     <h1 className="text-4xl font-bold text-blue-600 mb-3">
    //       Welcome to RentEase
    //     </h1>

    //     <p className="text-gray-500 mb-6">
    //       Rent furniture & appliances easily at affordable prices
    //     </p>

    //     {/* Buttons */}
    //     <div className="flex flex-col gap-3">

    //       <Link
    //         to="/login"
    //         className="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
    //       >
    //         Login
    //       </Link>

    //       <Link
    //         to="/register"
    //         className="bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
    //       >
    //         Register
    //       </Link>

    //       <Link
    //         to="/products"
    //         className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    //       >
    //         View Products
    //       </Link>

    //       <Link
    //         to="/cart"
    //         className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
    //       >
    //         Cart
    //       </Link>

    //       <Link
    //         to="/dashboard"
    //         className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
    //       >
    //         My Rentals
    //       </Link>

    //       <Link
    //         to="/admin"
    //         className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
    //       >
    //         Admin Panel
    //       </Link>

    //     </div>

    //   </div>
    // </div>
  );
}