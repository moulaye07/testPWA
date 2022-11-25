const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create cities schema and model
const CitiesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'city name field is required']
  },
  img: {
    type: String,
    required: [false]
  }
})

const Cities = mongoose.model('cities', CitiesSchema);

module.exports = Cities;

