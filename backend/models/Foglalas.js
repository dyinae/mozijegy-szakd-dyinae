const mongoose = require('mongoose');

const foglalasSchema = new mongoose.Schema({
  felhasznalo: {
    type: mongoose.Schema.Types.ObjectId,  // User modellre hivatkozik
    ref: 'User',
    required: true
  },
  vetites: {
    type: mongoose.Schema.Types.ObjectId,  // Vetites modellre hivatkozik
    ref: 'Vetites',
    required: true
  },
  ulohelyek: {
    type: [Number],                        // pl. [5, 6, 7] - székszámok
    required: true
  },
  vegosszeg: {
    type: Number,
    required: true                         // jegyAr * ulohelyek.length
  },
  statusz: {
    type: String,
    enum: ['aktív', 'lemondott'],
    default: 'aktív'
  }
}, { timestamps: true });

module.exports = mongoose.model('Foglalas', foglalasSchema);