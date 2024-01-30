import axios from 'axios';
import { UPDATE_CART } from '../actions/Action';

export const getError = (err) => {
  return err.message && err.response.data.message
    ? err.response.data.message
    : err.message;
};

export const addToCartHandler = async (product, cartItems, dispatch) => {
  const { data } = await axios.get(`/api/v1/products/${product._id}`);

  const existingItem = cartItems.find((prod) => prod._id === product._id);

  if (existingItem && data.countInStock === existingItem.quantity) {
    alert('There are no more items in stock');
    return;
  }

  let updatedProduct;
  if (cartItems.includes(existingItem)) {
    const indexToUpdate = cartItems.indexOf(existingItem);
    cartItems[indexToUpdate] = {
      ...product,
      quantity: existingItem.quantity + 1,
    };
  } else {
    updatedProduct = { ...product, quantity: 1 };
    cartItems.push(updatedProduct);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  dispatch({ type: UPDATE_CART, payload: [...cartItems] });
};

export const deleteFromCartHandler = (product, cartItems, dispatch) => {
  const existingItem = cartItems.find((prod) => prod._id === product._id);

  const indexToUpdate = cartItems.indexOf(existingItem);

  cartItems.splice(indexToUpdate, 1);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  dispatch({ type: UPDATE_CART, payload: [...cartItems] });
};

export const minusFromCartHandler = (product, cartItems, dispatch) => {
  const existingItem = cartItems.find((prod) => prod._id === product._id);

  const indexToUpdate = cartItems.indexOf(existingItem);
  if (existingItem.quantity > 1) {
    cartItems[indexToUpdate] = {
      ...product,
      quantity: existingItem.quantity - 1,
    };
  } else {
    cartItems.splice(indexToUpdate, 1);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  dispatch({ type: UPDATE_CART, payload: [...cartItems] });
};

export const updateCartHandler = (product, cartItems, newQty) => {
  const indexToUpdate = cartItems.indexOf(product);

  if (product.quantity > 1) {
    cartItems[indexToUpdate] = {
      ...product,
      quantity: newQty,
    };
  } else {
    cartItems.splice(indexToUpdate, 1);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
