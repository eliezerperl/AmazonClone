import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';

dotenv.config();
// const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors()); // does nothing at the moment
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({ extended: false })); 


//middleware
//routes:
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

export const handler = serverless(app);

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log('listening on ' + PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
