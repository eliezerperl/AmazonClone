import {
  GET_FAIL,
  GET_REQUEST,
  GET_SEARCH_SUCCESS,
} from '../../actions/Action';
import fetchReducer from '../../reducers/fetchReducer';
import {
  axios,
  toast,
  useLocation,
  useNavigate,
  useReducer,
  useState,
  useEffect,
  Row,
  Col,
  Link,
  Button,
  LinkContainer,
} from '../../utils/import';
import { getError, getFilterURI } from '../../utils/utils';
import Title from '../../components/shared/title/Title';
import Rating from '../../components/shared/rating/Rating';
import MessageBox from '../../components/shared/messageBox/MessageBox';
import Loading from '../../components/shared/loading/Loading';
import Product from '../../components/product/Product';

const prices = [
  { name: '$1-$50', value: '1-50' },
  { name: '$51-$200', value: '51-200' },
  { name: '$201-$1000', value: '201-1000' },
];

const ratings = [
  { name: '4 stars and up', rating: 4 },
  { name: '3 stars and up', rating: 3 },
  { name: '2 stars and up', rating: 2 },
  { name: '1 star and up', rating: 1 },
];

const Search = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(fetchReducer, { loading: true, error: '' });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get('api/v1/products/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.get(
          `api/v1/products/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );
        dispatch({ type: GET_SEARCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
        toast.error(getError(error));
      }
    };
    getProducts();
  }, [category, order, page, price, query, rating]);

  return (
    <>
      <Title title="Search"></Title>
      <Row>
        <Col md={2} className="d-flex flex-column gap-5">
          <section>
            <h3>Categories:</h3>
            <ul>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterURI(search, { category: 'all' })}>
                  Any
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link to={getFilterURI(search, { category: category })}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Price:</h3>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'text-bold' : ''}
                  to={getFilterURI(search, { price: 'all' })}>
                  Any
                </Link>
              </li>
              {prices.map((priceLocal) => (
                <li key={priceLocal.value}>
                  <Link
                    className={'all' === price ? 'text-bold' : ''}
                    to={getFilterURI(search, { price: priceLocal.value })}>
                    {priceLocal.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Reviews:</h3>
            <ul>
              {ratings.map((ratingLocal) => (
                <li key={ratingLocal.rating}>
                  <Link
                    className={'all' === price ? 'text-bold' : ''}
                    to={getFilterURI(search, { rating: ratingLocal.rating })}>
                    <Rating rating={ratingLocal.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Col>

        <Col md={10}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="d-flex flex-column gap-3">
              <Row>
                <Col className="d-flex justify-content-between">
                  <span>
                    {countProducts === 0 ? 'No ' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ` : Price $${price.split('-')[0]}-$${price.split('-')[1]}`}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    price !== 'all' ||
                    rating !== 'all' ? (
                      <i
                        onClick={() =>
                          navigate(
                            getFilterURI(search, {
                              query: 'all',
                              category: 'all',
                              price: 'all',
                              rating: 'all',
                              order: 'newest',
                              page: 1,
                            })
                          )
                        }
                        className="fas fa-times-circle edit-symbol"
                      />
                    ) : null}
                  </span>

                  <span>
                    Sort by{' '}
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(
                          getFilterURI(search, { order: e.target.value })
                        );
                      }}>
                      <option value="newest">Newest Arrivals</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="toprated">Customer Reviews</option>
                    </select>
                  </span>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/search',
                      search: getFilterURI(search, { page: x + 1 }, true),
                    }}>
                    <Button
                      className={
                        Number(page) === x + 1 ? 'highlight-current-page' : ''
                      }
                      variant="light">
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Search;
