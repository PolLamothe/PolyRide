const { Router } = require('express');
const trajetController = require("../controllers/trajet.controller")

const router = Router();



/**
 * @swagger
 * /api/trajet/proposal:
 *   post:
 *     summary: Récupère les propositions de trajet
 *     description: Retourne une liste de propositions de trajets pour l'utilisateur authentifié.
 *     tags: [Trajet]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - time
 *               - day
 *             properties:
 *               time:
 *                 type: string
 *                 example: "start"
 *               day:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-12"
 *     responses:
 *       200:
 *         description: Une liste de propositions de trajet.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   position:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                       lon:
 *                         type: number
 *                   distance:
 *                     type: number
 *                   difference:
 *                     type: number
 *                   usage:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: Requête invalide.
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur.
 */
router.post("/proposal",trajetController.getTrajetProposal)

/**
 * @swagger
 * /api/trajet/pending:
 *   get:
 *     summary: Récupère les demandes de trajet en attente
 *     description: Retourne une liste de demandes de trajet en attente pour l'utilisateur authentifié (doit être un conducteur).
 *     tags: [Trajet]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Une liste de demandes de trajet en attente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   requester:
 *                     type: object
*                     properties:
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                   status:
 *                     type: string
 *                     example: "pending"
 *       400:
 *         description: Requête invalide (par exemple, l'utilisateur n'est pas un conducteur).
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur.
 */
router.get("/pending",trajetController.getPendingTrajetRequest)


module.exports = router