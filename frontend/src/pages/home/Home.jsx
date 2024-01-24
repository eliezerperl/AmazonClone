import { useReducer, useEffect, axios } from '../../utils/import';
import Title from '../../components/shared/title/Title';
import HomePageReducer from '../../reducers/HomePageReducer';
import Loading from '../../components/shared/loading/Loading';
import MessageBox from '../../components/shared/messageBox/MessageBox';
import Products from '../../components/homepage/products/Products';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../actions/Action';

const initialState = { loading: true, error: '', data: [] };

const Home = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    HomePageReducer,
    initialState
  );
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get('/api/v1/products');
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
        console.log(error.message);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="d-flex flex-column gap-3">
      <Title title="Home Page" />
      <div className="backroundHomePage">
        <img
          width={'100%'}
          src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg"
          alt="backround-img"
        />
      </div>
      <div className="products d-flex justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Products products={data}></Products>
        )}
      </div>
    </div>
  );
};

export default Home;
