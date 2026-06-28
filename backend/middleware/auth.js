const jwt = require('jsonwebtoken');

// Bejelentkezés ellenőrzése
const protect = (req, res, next) => {
  try {
    // Token kiolvasása a headerből
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Nincs token, hozzáférés megtagadva!' });
    }

    // Token ellenőrzése
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // user adatait hozzáadjuk a kéréshez
    next();               // továbbenged a controllerhez
  } catch (err) {
    res.status(401).json({ message: 'Érvénytelen token!' });
  }
};

// Admin jogosultság ellenőrzése
const adminOnly = (req, res, next) => {
  if (req.user.szerep !== 'admin') {
    return res.status(403).json({ message: 'Admin jogosultság szükséges!' });
  }
  next();
};

module.exports = { protect, adminOnly };