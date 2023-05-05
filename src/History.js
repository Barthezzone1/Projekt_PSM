import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, getCurrentUserID } from "./firebase";

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), where("uid", "==", getCurrentUserID()));
      const docs = await getDocs(q);
      const filteredOrders = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(filteredOrders);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order history</h1>
      <ul>
        {orders.map((order) => (
          <li key={order}>
            <p>Items: {order.items}</p>
            <p>Total: {order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;