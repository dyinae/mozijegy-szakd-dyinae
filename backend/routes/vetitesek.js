const express = require('express');
const router = express.Router();
const {
  getVetitesek,
  getVetitesById,
  createVetites,
  deleteVetites
} = require('../controllers/vetitesController');
const { protect, adminOnly } = require('../middleware/auth');
/**
 * @swagger
 * tags:
 *   name: Vetítések
 *   description: Vetítések kezelése
 */

/**
 * @swagger
 * /api/vetitesek:
 *   get:
 *     summary: Összes vetítés listázása
 *     tags: [Vetítések]
 *     responses:
 *       200:
 *         description: Vetítések listája
 */
router.get('/', getVetitesek);

/**
 * @swagger
 * /api/vetitesek/{id}:
 *   get:
 *     summary: Egy vetítés lekérése
 *     tags: [Vetítések]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vetítés adatai
 *       404:
 *         description: Vetítés nem található
 */
router.get('/:id', getVetitesById);

/**
 * @swagger
 * /api/vetitesek:
 *   post:
 *     summary: Új vetítés létrehozása
 *     tags: [Vetítések]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               film:
 *                 type: string
 *                 description: Film ID-ja
 *               datum:
 *                 type: string
 *                 description: pl. 2026-05-10T18:00:00
 *               terem:
 *                 type: string
 *               osszesUlohely:
 *                 type: number
 *               jegyAr:
 *                 type: number
 *     responses:
 *       201:
 *         description: Vetítés létrehozva
 *       400:
 *         description: Hibás adat
 */
router.post('/', protect, adminOnly, createVetites);

/**
 * @swagger
 * /api/vetitesek/{id}:
 *   delete:
 *     summary: Vetítés törlése
 *     tags: [Vetítések]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vetítés törölve
 *       404:
 *         description: Vetítés nem található
 */
router.delete('/:id', protect, adminOnly, deleteVetites);

module.exports = router;