const { Router } = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../utils/utils.js');
const {
  addOrder,
  getOrderById,
  getUsersOrders,
} = require('../controllers/orderController.js');


const orderRouter = Router();
orderRouter.post('/', isAuth, expressAsyncHandler(addOrder));
orderRouter.get('/myorders', isAuth, expressAsyncHandler(getUsersOrders));
orderRouter.get('/:id', isAuth, expressAsyncHandler(getOrderById));

module.exports = orderRouter
