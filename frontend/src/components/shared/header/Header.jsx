import React from 'react';
import SearchBox from '../searchBox/SearchBox';
import {
  NaVBar,
  Container,
  LinkContainer,
  Link,
  NavDropdown,
  Badge,
} from '../../../utils/import';
import { useStoreContext } from '../../../utils/Store';
import { USER_SIGNOUT } from '../../../actions/Action';

const Header = () => {
  const { state, dispatch } = useStoreContext();
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  const signoutHandler = () => {
    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
  };

  return (
    <header>
      <NaVBar bg="dark" variant="dark">
        <Container>
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4 gap-2">
            <LinkContainer to={'/'}>
              <NaVBar.Brand>
                <img
                  width={80}
                  src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                  alt="Amazon Logo"
                />
              </NaVBar.Brand>
            </LinkContainer>
            <SearchBox />
          </nav>
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4 gap-2">
            <Link to={'/cart'} className="nav-link">
              <i className="fas fa-shopping-cart text-white"></i>
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown className="text-white" title={userInfo.name}>
                <div className="text-center">{userInfo.name}</div>
                <NavDropdown.Divider />
                <div className="text-center">
                  <Link
                    to={'#signedout'}
                    onClick={signoutHandler}
                    className="dropdown item">
                    Sign out
                  </Link>
                </div>
              </NavDropdown>
            ) : (
              <Link to={'/signin'} className="text-white nav-link">
                Sign in
              </Link>
            )}
          </nav>
        </Container>
      </NaVBar>
    </header>
  );
};

export default Header;
