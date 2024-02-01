import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils/utils.js';
import { addOrder, getOrderById } from '../controllers/orderController.js';

const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler(addOrder));
orderRouter.post('/:id', expressAsyncHandler(getOrderById));

export default orderRouter;
