import Product from "../models/Product.js";
import User from "../models/User.js";
import data from "../data.js";

const seedData = async (req, res) => {
  await Product.deleteMany();
  await User.deleteMany();

  await User.insertMany(data.users)
  await Product.insertMany(data.products);
  res.status(201).send({ data: data})
}

export default seedData;