const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  pickup: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Rental', rentalSchema)
