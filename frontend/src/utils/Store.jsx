import { createContext, useContext } from 'react';
import { useReducer, PropTypes } from '../utils/import';
import StoreReducer from '../reducers/StoreReducer';

const user = localStorage.getItem('userInfo');
const items = localStorage.getItem('cartItems');
const shippingAddress = localStorage.getItem('shippingAddress');
const paymentMethod = localStorage.getItem('paymentMethod');

const initialState = {
  userInfo: user ? JSON.parse(user) : null,
  cart: {
    cartItems: items ? JSON.parse(items) : [],
    shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : {},
    paymentMethod: paymentMethod ? paymentMethod : '',
  },
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState);
  const body = { state, dispatch };

  return <StoreContext.Provider value={body}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => useContext(StoreContext);
