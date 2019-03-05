const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  mongoURI: process.env.MONGO_CONFIG,
  jwt: process.env.SECRET_JWT,
};
