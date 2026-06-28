const User = require('../models/User');

// Összes user lekérése (admin)
const getUsers = async (req, res) => {
  try {
    // jelszo mezőt nem küldjük vissza!
    const users = await User.find().select('-jelszo');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// Egy user lekérése ID alapján (admin)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-jelszo');
    if (!user) return res.status(404).json({ message: 'Felhasználó nem található' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

// User törlése (admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Felhasználó nem található' });
    res.status(200).json({ message: 'Felhasználó törölve' });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

module.exports = { getUsers, getUserById, deleteUser };