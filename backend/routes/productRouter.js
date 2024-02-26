import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  getProducts,
  getProduct,
  getProductByToken,
  getCategories,
  getSearchedItems,
} from '../controllers/productController.js';

const productRouter = Router();
productRouter.get('/', expressAsyncHandler(getProducts));
productRouter.get('/categories', expressAsyncHandler(getCategories));
productRouter.get('/search', expressAsyncHandler(getSearchedItems));

productRouter.get('/:id', expressAsyncHandler(getProduct));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));

export default productRouter;
