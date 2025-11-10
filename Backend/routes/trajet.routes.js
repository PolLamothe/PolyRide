const { Router } = require('express');
const trajetController = require("../controllers/trajet.controller")

const router = Router();


/**
 * @swagger
 * /api/trajet/proposal:
 *   get:
 *     summary: Get nearest people for trajet proposal
 *     tags: [Trajet]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Successful response with nearest people data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // TODO: Define properties of the user/person object
 *                   _id:
 *                     type: string
 *                     example: "654321098765432109876543"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *       400:
 *         description: Bad request, e.g., invalid token.
 *       500:
 *         description: Server error.
 */
router.get("/proposal",trajetController.getTrajetProposal)

module.exports = router