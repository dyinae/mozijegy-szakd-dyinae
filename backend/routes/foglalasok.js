const express = require('express');
const router = express.Router();
const {
  getFoglalasok,
  createFoglalas,
  deleteFoglalas
} = require('../controllers/foglalasController');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Foglalások
 *   description: Foglalások kezelése
 */

/**
 * @swagger
 * /api/foglalasok:
 *   get:
 *     summary: Összes foglalás listázása
 *     tags: [Foglalások]
 *     responses:
 *       200:
 *         description: Foglalások listája
 */
router.get('/', protect, getFoglalasok);

/**
 * @swagger
 * /api/foglalasok:
 *   post:
 *     summary: Új foglalás létrehozása
 *     tags: [Foglalások]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               felhasznalo:
 *                 type: string
 *                 description: User ID-ja
 *               vetites:
 *                 type: string
 *                 description: Vetítés ID-ja
 *               ulohelyek:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: pl. [5, 6, 7]
 *     responses:
 *       201:
 *         description: Foglalás létrehozva
 *       400:
 *         description: Hibás adat
 *       403:
 *         description: Korhatár miatt nem jogosult
 */
router.post('/', protect, createFoglalas);

/**
 * @swagger
 * /api/foglalasok/{id}:
 *   delete:
 *     summary: Foglalás lemondása
 *     tags: [Foglalások]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foglalás lemondva
 *       404:
 *         description: Foglalás nem található
 */
router.delete('/:id', protect, deleteFoglalas);

module.exports = router;