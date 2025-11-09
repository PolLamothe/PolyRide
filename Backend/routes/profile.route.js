const { Router } = require('express');
const profileController = require('../controllers/profile.controller');

const router = Router();

/**
 * @swagger
 * /api/profile/profile:
 *   get:
 *     summary: Get user profile information
 *     description: Endpoint for retrieving the authenticated user's profile details.
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "john.doe@etu.univ-nantes.fr"
 *                 calendar:
 *                   type: string
 *                   format: uri
 *                   nullable: true
 *                   example: "http://edt-v2.univ-nantes.fr/calendar/ics?..."
 *                 userName:
 *                   type: string
 *                   example: "john doe"
 *       400:
 *         description: Bad request, e.g., invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token JWT invalide"
 *       401:
 *         description: Unauthorized, if no valid JWT is provided.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur lors de la récupération du profil."
 */

router.get("/profile", profileController.getProfile);

module.exports = router;