const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const dotenv = require('dotenv')
dotenv.config();

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordRes = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordRes) {
      // generate token

      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, process.env.SECRET_JWT, { expiresIn: 60 * 60 });

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({
        error: 'password incorrect',
      });
    }
  } else {
    res.status(404).json({
      error: 'Not found email',
    });
  }
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      error: 'пользователь занят',
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  }
};
