const { Router } = require('express');
const trajetController = require("../controllers/trajet.controller")

const router = Router();



/**
 * @swagger
 * /api/trajet/proposal:
 *   get:
 *     summary: Récupère les propositions de trajet
 *     description: Retourne une liste de propositions de trajets pour l'utilisateur authentifié
 *     tags: [Trajet]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Une liste de propositions de trajet
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
router.get("/proposal",trajetController.getTrajetProposal)


module.exports = router