// Orders.jsx

import "../css/MyOrders.css";

const MyOrders = () => {
  const orders = [
    {
      id: 1,
      item: "Laptop",
      status: "Delivered",
    },
    {
      id: 2,
      item: "Headphones",
      status: "Pending",
    },
    {
      id: 3,
      item: "Keyboard",
      status: "Shipped",
    },
  ];

  return (
    <div className="orders-container">
      <div className="orders-card">
        <h1>My Orders 📦</h1>

        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-item" key={order.id}>
              <div>
                <h3>{order.item}</h3>
                <p>Order ID: #{order.id}</p>
              </div>

              <span>{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MyOrders;