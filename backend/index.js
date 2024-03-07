const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRouter.js');
const userRouter = require('./routes/userRouter.js');
const orderRouter = require('./routes/orderRouter.js');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors()); // does nothing at the moment
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({ extended: false })); //this is common practice for urlencoded


//middleware
//routes:
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, function () {
      console.log('listening on ' + PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
