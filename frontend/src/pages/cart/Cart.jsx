import { Col, Row, useNavigate } from '../../utils/import';
import { useStoreContext } from '../../utils/Store';
import CartProducts from './CartProducts';
import CartSummary from './CartSummary';
import Title from '../../components/shared/title/Title';

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useStoreContext();
  const { cart } = state;
  const { cartItems } = cart;

  const navigateToProd = (item) => {
    navigate(`/product/${item.token}`);
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <>
      <Title title="Cart" />
      <Row>
        <Col xs={12} md={8}>
          <CartProducts
            cartItems={cartItems}
            navigateToProds={navigateToProd}
          />
        </Col>
        <Col xs={6} md={4}>
          <CartSummary
            cartItems={cartItems}
            checkoutHandler={checkoutHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default Cart;
