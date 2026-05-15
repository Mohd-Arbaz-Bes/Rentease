import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    pricePerMonth: "",
    deposit: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE PRODUCT (CLOUDINARY READY)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append(
        "pricePerMonth",
        Number(form.pricePerMonth)
      );
      formData.append("deposit", Number(form.deposit));
      formData.append("stock", Number(form.stock));
      formData.append("description", form.description);

      // IMAGE FILE
      if (image) {
        formData.append("image", image);
      }

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          formData
        );
        alert("Product Updated Successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData
        );
        alert("Product Added Successfully!");
      }

      fetchProducts();

      // RESET
      setForm({
        name: "",
        category: "",
        pricePerMonth: "",
        deposit: "",
        stock: "",
        description: "",
      });

      setImage(null);
      setEditId(null);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted");
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      pricePerMonth: product.pricePerMonth,
      deposit: product.deposit,
      stock: product.stock,
      description: product.description,
    });

    setEditId(product._id);
    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-blue-600 text-white px-8 py-6">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>
        <p className="mt-2">
          Manage products and rentals
        </p>
      </div>

      <div className="p-6 max-w-6xl mx-auto bg-white rounded-3xl shadow mt-6">

        {/* FORM TITLE */}
        <h2 className="text-3xl font-bold mb-6">
          {editId ? "Edit Product" : "Add Product"}
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-3 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="furniture">Furniture</option>
            <option value="appliances">Appliances</option>
          </select>

          <input
            type="number"
            name="pricePerMonth"
            value={form.pricePerMonth}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="deposit"
            value={form.deposit}
            onChange={handleChange}
            placeholder="Deposit"
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-3 rounded"
            required
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-3 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded md:col-span-2"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded md:col-span-2"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>

        </form>

        {/* PRODUCTS LIST */}
        <h2 className="text-2xl font-bold mt-10 mb-4">
          All Products
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          {products.map((p) => (
            <div
              key={p._id}
              className="bg-gray-50 p-4 rounded shadow"
            >

              <img
                src={p.image}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="text-xl font-bold mt-2">
                {p.name}
              </h3>

              <p>{p.category}</p>

              <p className="text-blue-600 font-bold">
                ₹{p.pricePerMonth}/month
              </p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}