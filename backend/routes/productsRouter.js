import express from "express";
import getProducts from "../controllers/productController.js";

const productsRouter = express.Router();
productsRouter.get('/', getProducts);

export default productsRouter;