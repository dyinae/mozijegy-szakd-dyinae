const Foglalas = require('../models/Foglalas');
const Vetites = require('../models/Vetites');
const User = require('../models/User');

const getFoglalasok = async (req, res) => {
  try {
    let foglalasok;

    if (req.user.szerep === 'admin') {
      // Admin látja az összeset
      foglalasok = await Foglalas.find()
        .populate('felhasznalo', '-jelszo')
        .populate({
          path: 'vetites',
          populate: { path: 'film' }
        });
    } else {
      // Sima user csak a sajátját látja
      foglalasok = await Foglalas.find({ felhasznalo: req.user.id })
        .populate('felhasznalo', '-jelszo')
        .populate({
          path: 'vetites',
          populate: { path: 'film' }
        });
    }

    res.status(200).json(foglalasok);
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

const createFoglalas = async (req, res) => {
  try {
    const { felhasznalo, vetites, ulohelyek } = req.body;

    const vetitesAdat = await Vetites.findById(vetites).populate('film');
    if (!vetitesAdat) return res.status(404).json({ message: 'Vetítés nem található' });

    if (vetitesAdat.szabadUlohely < ulohelyek.length) {
      return res.status(400).json({ message: 'Nincs elég szabad szék!' });
    }

    const marFoglalt = ulohelyek.filter(
      (szek) => vetitesAdat.foglaltSzekek.includes(szek)
    );
    if (marFoglalt.length > 0) {
      return res.status(400).json({
        message: `A ${marFoglalt.join(', ')} szék már foglalt!`
      });
    }

    const user = await User.findById(felhasznalo);
    const mai = new Date();
    const szuletett = new Date(user.szuletesiDatum);
    const kor = mai.getFullYear() - szuletett.getFullYear();
    if (kor < parseInt(vetitesAdat.film.korhatar)) {
      return res.status(403).json({
        message: 'Életkora alapján nem jogosult erre a vetítésre!'
      });
    }

    const vegosszeg = vetitesAdat.jegyAr * ulohelyek.length;
    const foglalas = new Foglalas({ felhasznalo, vetites, ulohelyek, vegosszeg });
    await foglalas.save();

    vetitesAdat.foglaltSzekek.push(...ulohelyek);
    vetitesAdat.szabadUlohely -= ulohelyek.length;
    await vetitesAdat.save();

    res.status(201).json(foglalas);
  } catch (err) {
    res.status(400).json({ message: 'Hibás adat', error: err.message });
  }
};

const deleteFoglalas = async (req, res) => {
  try {
    const foglalas = await Foglalas.findById(req.params.id);
    if (!foglalas) return res.status(404).json({ message: 'Foglalás nem található' });

    // Csak a saját foglalását mondhatja le, kivéve az admin
    if (req.user.szerep !== 'admin' &&
        foglalas.felhasznalo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Csak a saját foglalását mondhatja le!' });
    }

    const vetites = await Vetites.findById(foglalas.vetites);
    if (vetites) {
      vetites.szabadUlohely += foglalas.ulohelyek.length;
      vetites.foglaltSzekek = vetites.foglaltSzekek.filter(
        (szek) => !foglalas.ulohelyek.includes(szek)
      );
      await vetites.save();
    }

    foglalas.statusz = 'lemondott';
    await foglalas.save();

    res.status(200).json({ message: 'Foglalás lemondva' });
  } catch (err) {
    res.status(500).json({ message: 'Szerver hiba', error: err.message });
  }
};

module.exports = { getFoglalasok, createFoglalas, deleteFoglalas };