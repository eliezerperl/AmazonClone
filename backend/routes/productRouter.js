import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  getProducts,
  getProduct,
  getProductByToken,
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(getProducts));
productRouter.get('/:id', expressAsyncHandler(getProduct));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));

export default productRouter;
