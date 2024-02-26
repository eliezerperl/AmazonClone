import axios from 'axios';
import { Card, useEffect, useState } from '../../utils/import';
import { useStoreContext } from '../../utils/Store';

const MyOrders = () => {
  const { state } = useStoreContext();
  const { userInfo } = state;
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/orders/myorders', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const { orders } = data;
      setOrders(orders);
    };
    fetchData();
  }, [userInfo._id, userInfo.token]);

  return orders ? (
    <>
      {orders.map((order) => (
        <Card key={order}>
          <Card.Link href={`/orders/${order._id}`}>
            <Card.Title className="text-center">Order {order._id}</Card.Title>
          </Card.Link>
          <Card.Body className="myorders-card-body">
            <Card.Text className="d-flex gap-5">
              {order.orderItems.map((item) => (
                <Card
                  className="d-flex justify-content-between gap-4 align-items-center p-2 myorders-items-card"
                  key={item}>
                  <section className="d-flex flex-column gap-2">
                    <Card.Img src={item.image}></Card.Img>
                    <Card.Subtitle>{item.title}</Card.Subtitle>
                  </section>
                  <section className="d-flex flex-column gap-2">
                    <span className="text-center">
                      <strong>Quantity:</strong> {item.quantity}
                    </span>
                    <Card.Footer>
                      <strong>Price:</strong> ${item.price * item.quantity}
                    </Card.Footer>
                  </section>
                </Card>
              ))}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <span>
              <strong>Price:</strong> ${order.itemsPrice}
            </span>
            <span>
              <strong>Shipping:</strong> ${order.shippingPrice}
            </span>
            <span>
              <strong>Tax:</strong> ${order.taxPrice}
            </span>
            <span>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </span>
          </Card.Footer>
        </Card>
      ))}
    </>
  ) : (
    <div>No orders</div>
  );
};

export default MyOrders;
