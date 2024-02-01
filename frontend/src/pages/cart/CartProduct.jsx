import { useStoreContext } from '../../utils/Store';
import { Col, PropTypes } from '../../utils/import';
import {
  addToCartHandler,
  deleteFromCartHandler,
  minusFromCartHandler,
} from '../../utils/utils';
import './Cart.css';

const CartProduct = ({ item, cartItems, navigateToProd }) => {
  const { dispatch } = useStoreContext();

  return (
    <>
      <Col xs={12} md={10}>
        <div className="d-flex justify-content-between align-items-center">
          <img
            src={item.image}
            alt={`${item.title} image`}
            onClick={() => navigateToProd(item)}
            className="prod-navigator img-fluid rounded img-thumbnail"
          />
          <span
            className="text-center prod-navigator"
            onClick={() => navigateToProd(item)}>
            {item.title}
          </span>
          <span>${item.price}</span>
        </div>
      </Col>
      <Col xs={6} md={2} className="d-flex flex-column">
        <div className="d-flex justify-content-end">
          <i
            className="fa fa-trash edit-symbol"
            onClick={() =>
              deleteFromCartHandler(item, cartItems, dispatch)
            }></i>
        </div>
        <div className="d-flex flex-grow-1 align-items-end">
          <i
            className="fa fa-minus edit-symbol"
            onClick={() => {
              minusFromCartHandler(item, cartItems, dispatch);
            }}
          />
          <span className="flex-grow-1 text-center item-quantity">
            {item.quantity}
          </span>
          <i
            className="fa fa-plus edit-symbol"
            onClick={() => {
              addToCartHandler(item, cartItems, dispatch);
            }}
          />
        </div>
      </Col>
    </>
  );
};

CartProduct.propTypes = {
  item: PropTypes.object,
  cartItems: PropTypes.array,
  navigateToProd: PropTypes.func,
};

export default CartProduct;
