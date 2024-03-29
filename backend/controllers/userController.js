const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const { generateToken } = require('../utils/utils.js');

const signin = async (req, res) => {
  const { password: pwdFromWebsite, email } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compareSync(pwdFromWebsite, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid Credentials' });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password),
  });

  const user = await newUser.save();

  res.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
};

module.exports = { signin, signup };
