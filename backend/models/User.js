const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nev: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  jelszo: {
    type: String,
    required: true,
    minlength: 6
  },
  szuletesiDatum: {
    type: Date,
    required: true
  },
  szerep: {
    type: String,
    enum: ['felhasznalo', 'admin'],
    default: 'felhasznalo'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);