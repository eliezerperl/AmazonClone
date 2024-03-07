const { Router } = require('express');
const expressAsyncHandler = require('express-async-handler');
const { signin, signup } = require('../controllers/userController.js');

const userRouter = Router();
userRouter.post('/signup', expressAsyncHandler(signup));
userRouter.post('/signin', expressAsyncHandler(signin));

module.exports = userRouter