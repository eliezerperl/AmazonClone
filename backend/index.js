import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productsRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors()); // does nothing at the moment
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({extended: false})); //this is common practice for urlencoded
// these three lines are boilerplate

//middleware
//routes:
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', userRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
});



mongoose.connect(process.env.MONGO)
.then(() => {
  app.listen(PORT, function(){
    console.log("listening on " + PORT);
  })
}).catch(err => {console.log(err.message);});