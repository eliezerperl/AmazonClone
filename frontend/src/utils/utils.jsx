export const getError = (err) => {
  return err.message && err.response.data.message
    ? err.response.data.message
    : err.message;
};

export const addToCartHandler = (product, cartItems, dispatch) => {
  return; // will implement on Thursday
};
