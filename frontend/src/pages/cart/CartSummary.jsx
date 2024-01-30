import {
  ListGroup,
  Button,
  Card,
  PropTypes,
  Row,
  Col,
} from '../../utils/import';

const CartSummary = ({ cartItems, checkoutHandler }) => {
  let totalItems = 0;
  let amountToPay = 0;
  cartItems.forEach((item) => {
    totalItems += item.quantity;
    amountToPay += item.price * item.quantity;
  });

  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col md={8}>
                Subtotal:{' '}
                {totalItems === 0 ? '(No items)' : `(${totalItems} items)`}
              </Col>
              <Col md={4}> {amountToPay.toFixed(2)}$</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                onClick={checkoutHandler}
                variant="primary"
                disabled={cartItems.length === 0}>
                Checkout
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

CartSummary.propTypes = {
  cartItems: PropTypes.array,
  checkoutHandler: PropTypes.func,
};

export default CartSummary;
