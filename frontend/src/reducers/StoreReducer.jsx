import {
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  UPDATE_CART,
  USER_SIGNIN,
  USER_SIGNOUT,
} from '../actions/Action';

const StoreReducer = (state, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return { ...state, userInfo: action.payload };
    case USER_SIGNOUT:
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };

    case UPDATE_CART:
      return { ...state, cart: { ...state.cart, cartItems: action.payload } };

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return { ...state };
  }
};

export default StoreReducer;
