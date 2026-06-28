const Vetites = require('../models/Vetites');
const Film = require('../models/Film');

// Összes vetítés lekérése
const getVetitesek = async (req, res) => {
  try {
    // populate: az ObjectId helyett a teljes film adatait adja vissza
    const vetitesek = await Vetites.find().populate('film');
    res.status(200).json(vetitesek);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// Egy vetítés lekérése ID alapján
const getVetitesById = async (req, res) => {
  try {
    const vetites = await Vetites.findById(req.params.id).populate('film');
    if (!vetites) return res.status(404).json({ message: 'Vetítés nem található' });
    res.status(200).json(vetites);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// Új vetítés létrehozása (admin)
const createVetites = async (req, res) => {
  try {
    // Ellenőrizzük hogy a film létezik-e
    const film = await Film.findById(req.body.film);
    if (!film) return res.status(404).json({ message: 'Film nem található' });

    const vetites = new Vetites({
      ...req.body,
      szabadUlohely: req.body.osszesUlohely  // kezdetben minden szék szabad
    });
    await vetites.save();
    res.status(201).json(vetites);
  } catch (err) {
    res.status(400).json({ message: 'Hibás adat', error: err.message });
  }
};

// Vetítés törlése (admin)
const deleteVetites = async (req, res) => {
  try {
    const vetites = await Vetites.findByIdAndDelete(req.params.id);
    if (!vetites) return res.status(404).json({ message: 'Vetítés nem található' });
    res.status(200).json({ message: 'Vetítés törölve' });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

module.exports = { getVetitesek, getVetitesById, createVetites, deleteVetites };