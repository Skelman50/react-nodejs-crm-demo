const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User.js');

dotenv.config();

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordRes = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordRes) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, process.env.SECRET_JWT, { expiresIn: 60 * 60 });

      const refreshToken = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 * 10 });


      res.status(200).json({
        token: `Bearer ${token}`,
        refreshToken,
      });
    } else {
      res.status(401).json({
        error: 'Password incorrect',
      });
    }
  } else {
    res.status(404).json({
      error: 'Not found email',
    });
  }
};

module.exports.refresh = async function (req, res) {
  const candidate = await User.findOne({ _id: req.body.userId });

  if (candidate) {
    const token = jwt.sign({
      email: candidate.email,
      userId: candidate._id,
    }, process.env.SECRET_JWT, { expiresIn: 60 * 60 });

    const refreshToken = jwt.sign({
      email: candidate.email,
      userId: candidate._id,
    }, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 * 10 });

    res.status(200).json({
      token: `Bearer ${token}`,
      refreshToken,
    });
  } else {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      error: 'Пользователь занят',
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
