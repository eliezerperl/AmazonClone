import {
  Button,
  Card,
  Col,
  ListGroup,
  PropTypes,
  Row,
} from '../../../utils/import';
import Loading from '../loading/Loading.jsx';

const PaymentSummary = ({ loading, cart, status, submitOrderHandler }) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Payment Summary</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>${cart.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${cart.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${cart.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item> */}
            {status === 'submitOrder' && (
              <Row className="mt-3">
                <Button variant="primary" onClick={submitOrderHandler}>
                  Submit
                </Button>
              </Row>
            )}
            {loading && (
              <div className="d-flex justify-content-center">
                <Loading />
              </div>
            )}
            {/* </ListGroup.Item> */}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
PaymentSummary.propTypes = {
  loading: PropTypes.bool,
  cart: PropTypes.object,
  status: PropTypes.string,
  submitOrderHandler: PropTypes.func,
};
export default PaymentSummary;
