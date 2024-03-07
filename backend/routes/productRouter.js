const { Router } = require('express');
const expressAsyncHandler = require('express-async-handler');
const {
  getProducts,
  getProduct,
  getProductByToken,
  getCategories,
  getSearchedItems,
} = require('../controllers/productController.js');


const productRouter = Router();
productRouter.get('/', expressAsyncHandler(getProducts));
productRouter.get('/categories', expressAsyncHandler(getCategories));
productRouter.get('/search', expressAsyncHandler(getSearchedItems));

productRouter.get('/:id', expressAsyncHandler(getProduct));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));

module.exports = productRouter;
