import { Card, PropTypes, Link, Row } from '../../utils/import';
import MessageBox from '../../components/shared/messageBox/MessageBox';
import CartProduct from './CartProduct';
import './Cart.css';

const CartProducts = ({ cartItems, navigateToProds }) => {
  return (
    <Card>
      <Card.Body>
        {cartItems.length !== 0 ? (
          cartItems.map((item, index) => (
            <div key={item.token}>
              <Row>
                <CartProduct
                  item={item}
                  cartItems={cartItems}
                  navigateToProd={navigateToProds}
                />
              </Row>
              {index !== cartItems.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <div>
            <MessageBox>You have no items in your cart...</MessageBox>{' '}
            <Link to={'/'}>Browse for items</Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

CartProducts.propTypes = {
  cartItems: PropTypes.array,
  navigateToProds: PropTypes.func,
};

export default CartProducts;
