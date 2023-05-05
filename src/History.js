import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, getCurrentUserID } from "./firebase";
import { Container, ListGroup } from 'react-bootstrap';


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
    <Container className="">
      <p class="text-center">
        <h1>
          Order history
        </h1>
      </p>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            <h4>Items:</h4>
            <ListGroup>
              {order.items.map((item) => (
                <ListGroup.Item key={item.name}>
                  {item.name}: ${item.price}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h5>Total: ${order.total}</h5>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default History;