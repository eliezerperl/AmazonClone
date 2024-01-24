import React, { createContext, useContext } from 'react';
import { useReducer, PropTypes } from '../utils/import';
import StoreReducer from '../reducers/StoreReducer';

const user = localStorage.getItem('userInfo');
const items = localStorage.getItem('cartItems');
const shippingAdress = localStorage.getItem('shippingAddress');
const paymentMethod = localStorage.getItem('paymentMethod');

const initialState = {
  userInfo: user ? JSON.parse(user) : null,
  cart: {
    cartItems: items ? JSON.parse(items) : [],
    shippingAddress: shippingAdress ? JSON.parse(shippingAdress) : {},
    paymentMethod: paymentMethod ? JSON.parse(paymentMethod) : '',
  },
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState);
  const body = { state, dispatch };

  return <StoreContext.Provider value={body}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  childrem: PropTypes.node,
};

export const useStoreContext = () => useContext(StoreContext);
