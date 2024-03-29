import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import productRouter from '../routes/productRouter';
// import seedRouter from '../routes/seedRouter';
import userRouter from '../routes/userRouter';
import orderRouter from '../routes/orderRouter';

dotenv.config();
// const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors()); // does nothing at the moment
app.use(express.json()); // parses JSON
app.use(express.urlencoded({ extended: false }));

//middleware
//routes:
// app.use('/.netlify/functions/api/v1/seed', seedRouter);
app.use('/.netlify/functions/api/v1/products', productRouter);
app.use('/.netlify/functions/api/v1/users', userRouter);
app.use('/.netlify/functions/api/v1/orders', orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

export const handler = serverless(app);

