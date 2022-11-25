require('dotenv').config();

module.exports = config = {
  mongoDB: {
    uri: process.env.MONGGO_DB_URI
  },
  secret: process.env.JWT_SECRET
}