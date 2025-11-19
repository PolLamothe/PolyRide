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
 * /api/trajet/request:
 *   get:
 *     summary: Récupère les demandes de trajet en attente
 *     description: Retourne une liste de demandes de trajet en attente pour l'utilisateur authentifié.
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
router.get("/request",trajetController.getTrajetRequest)



/**
 * @swagger
 * /api/trajet/ask:
 *   post:
 *     summary: Demande un trajet à un conducteur
 *     description: Permet à un utilisateur authentifié de demander un trajet à un conducteur spécifique pour un jour et une direction donnés.
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
 *               - conducteur
 *               - jour
 *               - direction
 *             properties:
 *               conducteur:
 *                 type: string
 *                 description: L'email du conducteur à qui demander le trajet.
 *                 example: "driver@example.com"
 *               jour:
 *                 type: string
 *                 format: date-time
 *                 description: Le jour du trajet demandé.
 *                 example: "2025-11-12T08:00:00.000Z"
 *               direction:
 *                 type: string
 *                 description: La direction du trajet (par exemple, "aller" ou "retour").
 *                 example: "aller"
 *     responses:
 *       200:
 *         description: La demande de trajet a été créée avec succès.
 *       400:
 *         description: Requête invalide (par exemple, l'utilisateur cible n'est pas un conducteur).
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur lors de la création de la demande de trajet.
 */
router.post("/ask",trajetController.askTtrajet)


/**
 * @swagger
 * /api/trajet/decideTrajet:
 *   post:
 *     summary: Répondre à une demande de trajet
 *     description: Permet au conducteur de répondre à une demande de trajet en l'acceptant ou en la refusant.
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
 *               - trajetId
 *               - decision
 *             properties:
 *               trajetId:
 *                 type: string
 *                 description: L'ID du trajet à accepter ou refuser.
 *                 example: "60d0fe4f5311236168a109ca"
 *               decision:
 *                 type: string
 *                 description: La décision du conducteur ('accept' or 'refuse').
 *                 example: "accept"
 *     responses:
 *       200:
 *         description: La décision a été enregistrée avec succès.
 *       400:
 *         description: Requête invalide (par exemple, l'utilisateur n'est pas le conducteur ou la décision est invalide).
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur.
 */
router.post("/decideTrajet",trajetController.responseTrajet)


module.exports = router