import Title from '../../components/shared/title/Title';
import CheckoutSteps from '../../components/shared/checkoutSteps/CheckoutSteps';
import {
  Button,
  Container,
  Form,
  useEffect,
  useNavigate,
} from '../../utils/import';
import { useStoreContext } from '../../utils/Store';
import './Shipping.css';
import { SAVE_SHIPPING_ADDRESS } from '../../actions/Action';

const Shipping = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStoreContext();
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [cartItems.length, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
    navigate('/payment');
  };

  return (
    <div className="d-flex flex-column gap-3">
      <Title title="Shipping Details"></Title>
      <CheckoutSteps step1 step2 />
      <div className="steps"></div>
      <Container className="small-container d-flex flex-column gap-4">
        <h1 className="shipping-address-title">Shipping Address</h1>
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control name="fullName" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control name="address" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>City:</Form.Label>
            <Form.Control name="city" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control name="postalCode" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Country:</Form.Label>
            <Form.Control name="country" required></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Shipping;
