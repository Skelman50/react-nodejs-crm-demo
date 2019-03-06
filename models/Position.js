const mongoose = require('mongoose');

const { Schema } = mongoose;

const positionShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    ref: 'caregories',
    type: Schema.Types.ObjectId,
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('positions', positionShema);
