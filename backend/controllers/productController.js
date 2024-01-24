import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
}

export default getProducts;