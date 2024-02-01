import {
  useNavigate,
  useEffect,
  useState,
  Form,
  Button,
} from '../../utils/import';
import { useStoreContext } from '../../utils/Store';
import { SAVE_PAYMENT_METHOD } from '../../actions/Action';
import Title from '../../components/shared/title/Title';
import CheckoutSteps from '../../components/shared/checkoutSteps/CheckoutSteps';

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStoreContext();
  const {
    cart: { shippingAddress, paymentMethod, cartItems },
    userInfo,
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    console.log(state);
    navigate('/placeorder');
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [cartItems, navigate, shippingAddress, userInfo]);

  return (
    <div className="d-flex flex-column gap-4">
      <Title title="Payment" />
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container d-flex flex-column gap-4 align-items-center">
        <h1 className="steps-title">Payment Method</h1>
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <Button type="sumbit">Continue</Button>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
