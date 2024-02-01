import {
  Card,
  Link,
  Col,
  PropTypes,
  Row,
  ListGroup,
} from '../../../utils/import';
import MessageBox from '../messageBox/MessageBox';

const OrderSummary = ({ cart, status, isDelivered }) => {
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Shipping Address</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Name: </strong>
            {cart.shippingAddress.fullName} <br />
            <strong>Address: </strong>
            {cart.shippingAddress.address} <br />
            <strong>City: </strong>
            {cart.shippingAddress.city} {cart.shippingAddress.postalCode}
            <br />
            <strong>Country: </strong>
            {cart.shippingAddress.country} <br />
          </Card.Text>
          {status === 'submitOrder' ? (
            <Link to={'/shipping'}>Edit</Link>
          ) : isDelivered ? (
            <MessageBox variant={'success'}>Delivered</MessageBox>
          ) : (
            <MessageBox variant={'danger'}>Not Delivered</MessageBox>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Payment Method</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </Card.Text>
          {status === 'submitOrder' ? (
            <Link to={'/payment'}>Edit</Link>
          ) : status === 'paid' ? (
            <MessageBox variant={'success'}>Paid</MessageBox>
            ) : (
            <MessageBox variant={'danger'}>Not Paid</MessageBox>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Items</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {cart.cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col>
                    {/* <Link to={`product/${item.token}`}> */}
                      <img
                        src={item.image}
                        alt={`${item.title} image`}
                        className="img-fluid rounded img-thumbnail"
                      />
                    {/* </Link> */}
                  </Col>
                  <Col>
                    {/* <Link className="text-center" to={`product/${item.token}`}> */}
                      {item.title}
                    {/* </Link> */}
                  </Col>
                  <Col>
                    <span>${item.price}</span>
                  </Col>
                  <Col xs={6} md={2}>
                    <strong>Quantity: </strong>
                    {item.quantity}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {status === 'submitOrder' && <Link to={'/cart'}>Back to Cart</Link>}
        </Card.Body>
      </Card>
    </>
  );
};

OrderSummary.propTypes = {
  cart: PropTypes.object,
  status: PropTypes.string,
  isDelivered: PropTypes.bool,
};

export default OrderSummary;
