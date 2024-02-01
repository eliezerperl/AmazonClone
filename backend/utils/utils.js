import jwt from 'jsonwebtoken';

export const generateToken = ({ _id, name, email }) => {
  return jwt.sign({ _id, name, email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) res.status(401).send({ message: 'Invalid Token' });
      else {
        req.user = decode;
        next();
      }
    });
  }
  else res.status(401).send({ message: 'No Token'})
};
