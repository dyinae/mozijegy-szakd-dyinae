const mongoose = require('mongoose');

const vetitesSchema = new mongoose.Schema({
  film: {
    type: mongoose.Schema.Types.ObjectId,  // Film modellre hivatkozik
    ref: 'Film',
    required: true
  },
  datum: {
    type: Date,
    required: true                         // pl. 2026-05-10 18:00
  },
  terem: {
    type: String,
    required: true                         // pl. "1-es terem"
  },
  osszesUlohely: {
    type: Number,
    required: true,
    default: 50
  },
  szabadUlohely: {
    type: Number,
    required: true,
    default: 50
  },
  jegyAr: {
    type: Number,
    required: true                         // pl. 1800 (Ft)
  },
  foglaltSzekek: {
  type: [Number],
  default: []           // eltárolja melyik székek foglaltak
},
}, { timestamps: true });

module.exports = mongoose.model('Vetites', vetitesSchema);