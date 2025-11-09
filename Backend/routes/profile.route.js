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
 *                 phoneNumber:
 *                   type: string
 *                   nullable: true
 *                   example: "0612345678"
 *                 usage:
 *                   type: string
 *                   example: "Conducteur et Passager"
 *                 address:
 *                   type: object
 *                   properties:
 *                     numero:
 *                       type: number
 *                       example: 1
 *                     rue:
 *                       type: string
 *                       example: "rue de la paix"
 *                     codePostal:
 *                       type: string
 *                       example: "44000"
 *                     ville:
 *                       type: string
 *                       example: "Nantes"
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

/**
 * @swagger
 * /api/profile/profile:
 *   post:
 *     summary: Update user profile information
 *     description: Endpoint for updating the authenticated user's profile details, including usage and calendar link.
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usage:
 *                 type: string
 *                 enum: [Conducteur, Passager, "Conducteur et Passager"]
 *                 description: User's role regarding carpooling.
 *                 example: "Conducteur et Passager"
 *               calendarLink:
 *                 type: string
 *                 format: uri
 *                 description: Link to the user's iCal calendar.
 *                 example: "http://edt-v2.univ-nantes.fr/calendar/ics?..."
 *               address:
 *                 type: object
 *                 properties:
 *                   numero:
 *                     type: number
 *                     example: 1
 *                   rue:
 *                     type: string
 *                     example: "rue de la paix"
 *                   codePostal:
 *                     type: string
 *                     example: "44000"
 *                   ville:
 *                     type: string
 *                     example: "Nantes"
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number.
 *                 example: "0612345678"
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil mis à jour avec succès."
 *       400:
 *         description: Bad request, e.g., invalid token, invalid usage, or invalid calendar link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisation invalide"
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
 *                   example: "Erreur serveur lors de l'actualisation du profil."
 */

router.post("/profile",profileController.updateProfile);

module.exports = router;