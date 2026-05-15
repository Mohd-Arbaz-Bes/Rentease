import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Dashboard() {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const { logoutUser } =
    useContext(CartContext);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    if (!user) {

      navigate("/login");

      return;
    }

    axios
      .get(
        `http://localhost:5000/api/orders/user/${user._id}`
      )
      .then((res) =>
        setOrders(res.data)
      )
      .catch((err) =>
        console.log(err)
      );

  }, []);

  // RETURN PRODUCT

  const handleReturn =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/orders/return/${id}`
        );

        alert(
          "Product Returned"
        );

        setOrders((prev) =>
          prev.map((order) =>
            order._id === id
              ? {
                  ...order,
                  status:
                    "returned",
                }
              : order
          )
        );

      } catch (err) {

        console.log(err);
      }
    };

  // LOGOUT

  const handleLogout = () => {

    logoutUser();

    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}

        <h1 className="text-3xl font-bold mb-6">

          {user?.role === "admin"
            ? "Admin Dashboard"
            : "User Dashboard"}

        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT SIDE */}

          <div className="space-y-6">

            {/* PROFILE */}

            <div className="bg-white p-5 rounded-xl shadow">

              <h2 className="text-xl font-semibold mb-4">

                Profile Details

              </h2>

              <p className="mb-2">

                <b>Name:</b>{" "}
                {user?.name}

              </p>

              <p className="mb-2">

                <b>Email:</b>{" "}
                {user?.email}

              </p>

            </div>

            {/* SETTINGS */}

            <div className="bg-white p-5 rounded-xl shadow">

              <h2 className="text-xl font-semibold mb-4">

                Settings

              </h2>

              <button
                onClick={
                  handleLogout
                }
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >

                Logout

              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="md:col-span-2">

            <div className="bg-white p-5 rounded-xl shadow">

              <h2 className="text-2xl font-semibold mb-5">

                My Orders

              </h2>

              {orders.length ===
              0 ? (

                <p>
                  No Orders Yet.
                </p>

              ) : (

                <div className="space-y-4">

                  {orders.map(
                    (order) => (

                      <div
                        key={
                          order._id
                        }
                        className="border rounded-lg p-4 relative"
                      >

                        {/* REMOVE BUTTON */}

          <button
  onClick={async () => {

    try {

      await axios.delete(
        `http://localhost:5000/api/orders/${order._id}`
      );

      setOrders((prev) =>
        prev.filter(
          (item) =>
            item._id !== order._id
        )
      );

    } catch (err) {

      console.log(err);
    }
  }}
  className="absolute top-2 right-2 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-red-500 text-xl font-bold hover:bg-red-500 hover:text-white transition"
>
  ×
</button>
                        {/* TOP */}

                        <div className="flex justify-between items-center mb-3">

                          <h3 className="font-semibold">

                            Order Details

                          </h3>

                          <span
                            className={`px-3 py-1 mt-10 rounded text-sm text-white ${
                              order.status ===
                              "active"
                                ? "bg-green-500"
                                : "bg-gray-500"
                            }`}
                          >

                            {
                              order.status
                            }

                          </span>

                        </div>

                        {/* PRODUCT NAME */}

                        <p className="mb-2 text-xl font-bold text-blue-700">

                          {
                            order.productName
                          }

                        </p>

                        {/* ORDER ID */}

                        <p className="mb-2">

                          <b>
                            Order ID:
                          </b>{" "}

                          {
                            order._id
                          }

                        </p>

                        {/* PRICE */}

                        <p className="mb-2">

                          <b>
                            Total Amount:
                          </b>{" "}

                          ₹
                          {
                            order.totalAmount
                          }

                        </p>

                        {/* DATE */}

                        <p className="mb-2">

                          <b>
                            Delivery Date:
                          </b>{" "}

                          {new Date(
                            order.deliveryDate
                          ).toDateString()}

                        </p>

                        {/* RETURN BUTTON */}

                        {order.status ===
                          "active" && (

                          <button
                            onClick={() =>
                              handleReturn(
                                order._id
                              )
                            }
                            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >

                            Mark as Returned

                          </button>

                        )}

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}