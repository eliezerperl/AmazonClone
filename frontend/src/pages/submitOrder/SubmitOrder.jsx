import {
  toast,
  useEffect,
  useNavigate,
  useState,
  Row,
  Col,
  axios,
} from '../../utils/import';
import CheckoutSteps from '../../components/shared/checkoutSteps/CheckoutSteps';
import { useStoreContext } from '../../utils/Store';
import { getError } from '../../utils/utils';
import Title from '../../components/shared/title/Title';
import OrderSummary from '../../components/shared/summary/OrderSummary';
import PaymentSummary from '../../components/shared/summary/PaymentSummary';
import { CLEAR_CART } from '../../actions/Action';

const SubmitOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useStoreContext();
  const { cart, userInfo } = state;

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, navigate]);

  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };
      const { data } = await axios.post('/api/v1/orders', orderData, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: CLEAR_CART });
      localStorage.removeItem('cartItems');
      navigate(`/orders/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  cart.taxPrice = round2(cart.itemsPrice * 0.17);

  cart.shippingPrice =
    cart.itemsPrice > 50
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  return (
    <div>
      <Title title={'Order Summary'} />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="text-center">Order Summary</h1>
      <Row>
        <Col xs={12} md={8}>
          <OrderSummary cart={cart} status={'submitOrder'} />
        </Col>
        <Col xs={6} md={4}>
          <PaymentSummary
            loading={loading}
            submitOrderHandler={submitOrderHandler}
            status="submitOrder"
            cart={cart}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrder;
