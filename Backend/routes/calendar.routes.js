const { Router } = require('express');
const calendarController = require('../controllers/calendar.controller');

const router = Router();

/**
 * @swagger
 * /api/calendar/updateCalendar:
 *   post:
 *     summary: Update user's calendar link
 *     description: Endpoint for updating the calendar link associated with the authenticated user.
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calendarLink:
 *                 type: string
 *                 format: uri
 *                 description: The new calendar link (ICS URL).
 *                 example: "http://edt-v2.univ-nantes.fr/calendar/ics?..."
 *     responses:
 *       200:
 *         description: Calendar link updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Calendrier enregistré"
 *       400:
 *         description: Bad request, e.g., invalid token or calendar link.
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
 *                   example: "Erreur serveur lors de l'enregistrement du calendrier."
 */

router.post("/updateCalendar", calendarController.registerCalendar);

module.exports = router;