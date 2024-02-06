import {
  Button,
  Form,
  FormControl,
  InputGroup,
  useEffect,
  useLocation,
  useNavigate,
  useState,
} from '../../../utils/import';
import { getFilterURI } from '../../../utils/utils';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    if (!query) return;

    const filterURI = getFilterURI(search, { query: query });
    navigate(filterURI);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const filterURI = getFilterURI(search, { query: query });
    navigate(filterURI);
  };
  return (
    <Form onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="q"
          id="q"
          placeholder="Search for product"
          aria-describedby="btn-search"></FormControl>
        <Button type="submit" id="btn-search">
          <li className="fa fa-search"></li>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
