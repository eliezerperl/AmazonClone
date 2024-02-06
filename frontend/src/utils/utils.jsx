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

export const getFilterURI = (searchFromURI, filter, skipPathName) => {
  const searchParams = new URLSearchParams(searchFromURI);

  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterPrice = filter.price || price;
  const filterRating = filter.rating || rating;
  const filterOrder = filter.order || order;
  const filterPage = filter.page || page;

  const link = `${
    skipPathName ? '' : '/search?'
  }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`;

  return link;
};
