const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Regisztráció és bejelentkezés
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Regisztráció
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nev:
 *                 type: string
 *               email:
 *                 type: string
 *               jelszo:
 *                 type: string
 *               szuletesiDatum:
 *                 type: string
 *                 description: pl. 1995-03-15
 *     responses:
 *       201:
 *         description: Sikeres regisztráció, token visszaadva
 *       400:
 *         description: Hibás adat vagy foglalt email
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Bejelentkezés
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               jelszo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sikeres bejelentkezés, token visszaadva
 *       401:
 *         description: Hibás email vagy jelszó
 */
router.post('/login', login);

module.exports = router;