import OrderSummary from '../../components/shared/summary/OrderSummary';
import PaymentSummary from '../../components/shared/summary/PaymentSummary';
import { useStoreContext } from '../../utils/Store';
import {
  Col,
  Row,
  axios,
  useEffect,
  useParams,
  useState,
} from '../../utils/import';

const Order = () => {
  const { state } = useStoreContext();
  const { userInfo } = state;
  const urlParams = useParams();
  const [order, setOrder] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/v1/orders/${urlParams.id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const { order } = data;
      setOrder(order);
    };
    fetchData();
  }, [urlParams.id, userInfo.token]);

  let modifiedOrder;
  if (order) {
    modifiedOrder = {
      shippingAddress: order.shippingAddress,
      cartItems: order.orderItems,
      paymentMethod: order.paymentMethod,
    };
  }

  return (
    <Row>
      {order && (
        <>
          <h1 className="text-center">Order: {order._id}</h1>
          <Col md={8}>
            <OrderSummary
              cart={modifiedOrder}
              status={order.isPaid && 'paid'}
              isDelivered={order.isDelivered}
            />
          </Col>
          <Col md={4}>
            <PaymentSummary cart={order} />
          </Col>
        </>
      )}
    </Row>
  );
};

export default Order;
