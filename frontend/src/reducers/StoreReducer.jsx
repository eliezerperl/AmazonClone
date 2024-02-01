import {
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
        cart: { cartItems: [], shippingAdress: {}, paymentMethod: '' },
      };

    case UPDATE_CART:
      return { ...state, cart: { cartItems: action.payload } };

    case SAVE_SHIPPING_ADDRESS:
      return { ...state, cart: { shippingAdress: action.payload } };

    default:
      return { ...state };
  }
};

export default StoreReducer;
