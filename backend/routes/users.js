const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  deleteUser
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');
/**
 * @swagger
 * tags:
 *   name: Felhasználók
 *   description: Felhasználók kezelése
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Összes felhasználó listázása
 *     tags: [Felhasználók]
 *     responses:
 *       200:
 *         description: Felhasználók listája
 */
router.get('/', protect, adminOnly, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Egy felhasználó lekérése
 *     tags: [Felhasználók]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Felhasználó adatai
 *       404:
 *         description: Felhasználó nem található
 */
router.get('/:id', protect, adminOnly, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Felhasználó törlése
 *     tags: [Felhasználók]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Felhasználó törölve
 *       404:
 *         description: Felhasználó nem található
 */
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;