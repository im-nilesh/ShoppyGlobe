import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderServices";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const response = await getMyOrders();
      setOrders(response.orders);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch orders",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-white text-2xl">Loading Orders...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <h2 className="text-2xl text-zinc-300 font-semibold">
            No Orders Yet
          </h2>

          <p className="text-zinc-500 mt-3">
            Start shopping to place your first order.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-zinc-400 mt-1">
                    Status :
                    <span className="text-green-400 font-semibold ml-2">
                      {order.orderStatus}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-3xl font-bold text-blue-500">
                    ₹{order.totalAmount}
                  </h2>

                  <p className="text-zinc-400">
                    {order.items.length} Item
                    {order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-zinc-800 pt-5 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between text-zinc-300"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>

                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-zinc-800 pt-5">
                <p className="text-zinc-400 text-sm">
                  <span className="font-semibold text-white">
                    Shipping Address:
                  </span>
                </p>

                <p className="text-zinc-300 whitespace-pre-line mt-2">
                  {order.shippingAddress}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
