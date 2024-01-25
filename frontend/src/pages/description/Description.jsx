import axios from 'axios';
import fetchReducer from '../../reducers/fetchReducer.jsx';
import Loading from '../../components/shared/loading/Loading.jsx';
import MessageBox from '../../components/shared/messageBox/MessageBox.jsx';
import ProductDescription from './ProductDescription.jsx';
import CartDescription from './CartDescription.jsx';
import Title from '../../components/shared/title/Title.jsx';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../actions/Action.jsx';
import { addToCartHandler, getError } from '../../utils/utils.jsx';
import { useStoreContext } from '../../utils/Store.jsx';
import {
  Col,
  Row,
  useEffect,
  useReducer,
  useNavigate,
  useParams,
} from '../../utils/import.js';

const initialState = { loading: true, error: '', data: [] };

const Description = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    fetchReducer,
    initialState
  );
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useStoreContext();
  const { cart } = state;
  const { cartItems } = cart;
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
      }
    };
    getProduct();
  }, [token]);
  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch);
    navigate('/cart');
  };

  return (
    <div>
      <Title title={data.title} />
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={data.image} alt={data.title} />
            </Col>
            <Col md={3}>
              <ProductDescription {...data} />
            </Col>
            <Col md={3}>
              <CartDescription addToCart={addToCart} product={data} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Description;
