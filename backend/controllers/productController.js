import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product does not exist" })
  }
}

const getProductByToken = async (req, res) => {
  const product = await Product.findOne({token: req.params.token});
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({message: "Product not found"});
  }
};


export { getProducts, getProduct, getProductByToken }