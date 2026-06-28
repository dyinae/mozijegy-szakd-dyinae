const Film = require('../models/Film');

// Összes film lekérése
const getFilmek = async (req, res) => {
  try {
    const filmek = await Film.find();
    res.status(200).json(filmek);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// Egy film lekérése ID alapján
const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film nem található' });
    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// Új film létrehozása (admin)
const createFilm = async (req, res) => {
  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    res.status(400).json({ message: 'Hibás adat', error: err.message });
  }
};

// Film módosítása (admin)
const updateFilm = async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // a módosított verziót adja vissza
    );
    if (!film) return res.status(404).json({ message: 'Film nem található' });
    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// Film törlése (admin)
const deleteFilm = async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film nem található' });
    res.status(200).json({ message: 'Film törölve' });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

module.exports = { getFilmek, getFilmById, createFilm, updateFilm, deleteFilm };