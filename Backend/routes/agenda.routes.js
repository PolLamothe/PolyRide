const { Router } = require('express');
const agendaController = require('../controllers/agenda.controller');

const router = Router();



/**
 * @swagger
 * /api/agenda:
 *   post:
 *     tags: ['Agenda']
 *     summary: Get user agenda
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               week:
 *                 type: string
 *                 example: "2025-11-20"
 *     responses:
 *       200:
 *         description: User agenda
 *       401:
 *         description: Unauthorized
 */
router.post("/",agendaController.getUserAgenda)



module.exports = router