import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: 'Product does not exist' });
  }
};

const getProductByToken = async (req, res) => {
  const product = await Product.findOne({ token: req.params.token });
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};

const getCategories = async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.status(200).send(categories);
};

const getSearchedItems = async (req, res) => {
  const { query } = req;

  const page = query.page || 1;
  const order = query.order || '';
  const category = query.category || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const searchQuery = query.query || '';
  const pageSize = query.pageSize || 6;

  const ratingFilter =
    rating && rating !== 'all'
      ? {
          'rating.rate': { $gte: Number(rating) },
        }
      : {};
  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          title: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter =
    category && category !== 'all'
      ? {
          category,
        }
      : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const sortOrderFilter =
    order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };
  const products = await Product.find({
    ...queryFilter,
    ...priceFilter,
    ...ratingFilter,
    ...categoryFilter,
  })
    .sort(sortOrderFilter)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...priceFilter,
    ...ratingFilter,
    ...categoryFilter,
  });

  res.status(200).send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
};

export {
  getProducts,
  getProduct,
  getProductByToken,
  getCategories,
  getSearchedItems,
};
