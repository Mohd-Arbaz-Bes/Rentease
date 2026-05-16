import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Layout products={[]} />
      <Footer />
    </div>
  );
}
