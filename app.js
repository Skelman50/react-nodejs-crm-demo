const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const authRouts = require('./routs/auth');
const analyticsRouts = require('./routs/analytics');
const categoryhRouts = require('./routs/category');
const orderRouts = require('./routs/order');
const positionRouts = require('./routs/position');
const mongoKey = require('./config/mongoConfig');
const path = require('path')
require('dotenv').config()

const app = express();

mongoose.connect(mongoKey.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoDB connect'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRouts);

app.use('/api/analytics', analyticsRouts);

app.use('/api/category', categoryhRouts);

app.use('/api/order', orderRouts);

app.use('/api/position', positionRouts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (res, req) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'build', 'index.html'
      )
    )
  })
}


module.exports = app;
