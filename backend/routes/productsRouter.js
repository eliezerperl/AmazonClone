import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getProducts,  getProduct, getProductByToken } from "../controllers/productController.js";

const productsRouter = express.Router();
productsRouter.get('/', expressAsyncHandler(getProducts));
productsRouter.get('/:id', expressAsyncHandler(getProduct));
productsRouter.get('/token/:token', expressAsyncHandler(getProductByToken));

export default productsRouter;