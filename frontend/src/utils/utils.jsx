import axios from 'axios';
import { ADD_TO_CART } from '../actions/Action';

export const getError = (err) => {
  return err.message && err.response.data.message
    ? err.response.data.message
    : err.message;
};

export const addToCartHandler = async (product, cartItems, dispatch) => {
  const { data } = await axios.get(`/api/v1/products/${product._id}`);

  const existingItem = cartItems.find((prod) => prod._id === product._id);

  console.log(data.countInStock);

  if (existingItem && data.countInStock === existingItem.quantity) {
    alert('Therre are no more items in stock');
    return;
  }

  let updatedProduct;
  if (cartItems.includes(existingItem)) {
    const indexToUpdate = cartItems.indexOf(existingItem);
    cartItems[indexToUpdate] = {
      ...product,
      quantity: existingItem.quantity + 1,
    };
    console.log(true);
  } else {
    updatedProduct = { ...product, quantity: 1 };
    cartItems.push(updatedProduct);
    console.log(false);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  dispatch({ type: ADD_TO_CART, payload: [...cartItems] });
  // try {
  //   //fetch

  //   if (data.countInStock < quantity) {
  //     alert('Sorry, Product s out of stock');
  //     return;
  //   }

  //   dispatch({ type: ADD_TO_CART, payload: [...cartItems, updatedProduct] });
  // } catch (error) {
  //   console.log(error);
  // }
};
