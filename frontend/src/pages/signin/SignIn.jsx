import {
  axios,
  Form,
  Container,
  useState,
  useNavigate,
  Button,
  Link,
  toast,
  useLocation,
  useEffect,
} from '../../utils/import';
import Title from '../../components/shared/title/Title.jsx';
import { getError } from '../../utils/utils';
import { useStoreContext } from '../../utils/Store';
import { USER_SIGNIN } from '../../actions/Action';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useStoreContext();
  const { userInfo } = state;
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/v1/users/signin', {
        email,
        password,
      });
      dispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <Container className="small-container">
      <Title title="Sign In" />
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign in</Button>
        </div>
        <div className="mb-3">
          New Customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create new account</Link>
        </div>
        <div className="mb-3">
          Forgot you password? <Link to={'/forgot'}>Reset password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;
