const express = require('express');
const router = express.Router();
const {
  getFilmek,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
} = require('../controllers/filmController');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Filmek
 *   description: Filmek kezelése
 */

/**
 * @swagger
 * /api/filmek:
 *   get:
 *     summary: Összes film listázása
 *     tags: [Filmek]
 *     responses:
 *       200:
 *         description: Filmek listája
 */
router.get('/', getFilmek);

/**
 * @swagger
 * /api/filmek/{id}:
 *   get:
 *     summary: Egy film lekérése
 *     tags: [Filmek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film adatai
 *       404:
 *         description: Film nem található
 */
router.get('/:id', getFilmById);

/**
 * @swagger
 * /api/filmek:
 *   post:
 *     summary: Új film létrehozása
 *     tags: [Filmek]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cim:
 *                 type: string
 *               leiras:
 *                 type: string
 *               mufaj:
 *                 type: string
 *               hosszPercben:
 *                 type: number
 *               korhatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Film létrehozva
 *       400:
 *         description: Hibás adat
 */
router.post('/', protect, adminOnly, createFilm);

/**
 * @swagger
 * /api/filmek/{id}:
 *   put:
 *     summary: Film módosítása
 *     tags: [Filmek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film módosítva
 *       404:
 *         description: Film nem található
 */
router.put('/:id', protect, adminOnly, updateFilm);

/**
 * @swagger
 * /api/filmek/{id}:
 *   delete:
 *     summary: Film törlése
 *     tags: [Filmek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film törölve
 *       404:
 *         description: Film nem található
 */
router.delete('/:id', protect, adminOnly, deleteFilm);

module.exports = router;