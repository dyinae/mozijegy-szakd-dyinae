const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  cim: {
    type: String,
    required: true,
    trim: true
  },
  leiras: {
    type: String,
    required: true
  },
  mufaj: {
    type: String,
    required: true
  },
  hosszPercben: {
    type: Number,
    required: true
  },
  korhatar: {
    type: String,
    enum: ['6', '12', '16', '18', 'mindenkinek'],
    default: 'mindenkinek'
  },
  plakat: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Film', filmSchema);