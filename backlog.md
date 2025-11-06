# PRODUCT BACKLOG - PolyRide

Ce document recense toutes les fonctionnalités souhaitées pour le produit, ordonnées par priorité. Il est maintenu par le Product Owner (Pol).

**Légende des priorités :**

* **P1 (Vital) :** Must-have pour le MVP (Sprint 1).
* **P2 (Essentiel) :** Fonctionnalités clés du service (Sprint 2).
* **P3 (Confort) :** Améliorations de l'expérience utilisateur (Sprint 3).

- - -

## Vue d'ensemble

| ID | Titre | User Story (En tant que... je veux... afin de...) | Priorité | Sprint Cible | État |
| :--- | :---- | :------------------------------------------------ | :------- | :----------- | :--- |
| **US01** | **Authentification Étudiante** | En tant qu **'étudiant**, je veux **m'inscrire/me connecter avec mon email universitaire** afin d'**accéder au service de manière sécurisée**. | **P1** | S1 | À faire |
| **US02** | **Profil & Import EDT** | En tant qu'**utilisateur**, je veux **importer mon fichier `.ics` et renseigner mon adresse** afin que **l'application connaisse mes contraintes de trajets**. | **P2** | S2 | À faire |
| **US03** | **Recherche de Covoiturage** | En tant que **conducteur ou passager**, je veux **voir les trajets compatibles (horaires/lieux)** afin de **trouver un partenaire de covoiturage**. | **P2** | S2 | À faire |
| **US04** | **Visualisation Carte** | En tant qu'**utilisateur**, je veux **visualiser les zones de départ/arrivée sur une carte** afin de **mieux repérer les trajets proposés**. | **P2** | S2 | À faire |
| **US05** | **Messagerie Instantanée** | En tant qu'**utilisateur**, je veux **discuter via un chat intégré** afin de **finaliser les détails pratiques du covoiturage**. | **P3** | S3 | À faire |
| **US06** | **Expérience Mobile (PWA)** | En tant qu'**utilisateur mobile**, je veux **installer l'application sur mon téléphone** afin d'y **accéder facilement au quotidien**. | **P3** | S3 | À faire |

- - -

## Détail des User Stories

### US01 : Authentification Étudiante

* **Priorité :** P1
* **Sprint Cible :** S1
* **Estimation : 24**
* **Critères d'acceptation (Definition of Done fonctionnelle) :**
    * [ ] L'inscription refuse les emails qui ne finissent pas par `@univ-nantes.fr`.
    * [ ] Un utilisateur connecté accède à la page d'accueil protégée.
    * [ ] Les données utilisateur (email, mot de passe hashé) sont persistées en base de données.

### US02 : Profil & Import EDT

* **Priorité :** P2
* **Sprint Cible :** S2
* **Estimation : 19**
* **Critères d'acceptation (DoD) :**
    * [ ] L'utilisateur peut uploader un fichier `.ics` ou coller un lien d'abonnement.
    * [ ] L'application extrait correctement les dates et heures de début/fin des cours.
    * [ ] L'adresse saisie est correctement géocodée (latitude/longitude) via l'API Nominatim.
    * [ ] Les informations de profil (EDT + adresse) sont sauvegardées en base.

### US03 : Recherche de Covoiturage (Matching)

* **Priorité :** P2
* **Sprint Cible :** S2
* **Estimation : 18**
* **Critères d'acceptation (DoD) :**
    * [ ] L'utilisateur voit une liste d'autres étudiants ayant des trajets compatibles.
    * [ ] La compatibilité est définie par : même créneau horaire (+/- 30 min) ET proximité géographique (rayon défini).
    * [ ] Les résultats affichent le nom de l'utilisateur et l'heure du trajet commun.

### US04 : Visualisation Carte

* **Priorité :** P2
* **Sprint Cible :** S2
* **Estimation : 20**
* **Critères d'acceptation (DoD) :**
    * [ ] Une carte interactive (Leaflet) est intégrée à la page de recherche.
    * [ ] Des marqueurs indiquent les points de départ/arrivée approximatifs des covoitureurs potentiels.

### US05 : Messagerie Instantanée

* **Priorité :** P3
* **Sprint Cible :** S3
* **Estimation : 27**
* **Critères d'acceptation (DoD) :**
    * [ ] L'utilisateur peut initier une conversation depuis un profil "matché".
    * [ ] Les messages s'envoient et se reçoivent en temps réel (sans rechargement de page).
    * [ ] L'historique des messages est conservé entre les sessions.

### US06 : Expérience Mobile (PWA)

* **Priorité :** P3
* **Sprint Cible :** S3
* **Estimation : 20**
* **Critères d'acceptation (DoD) :**
    * [ ] L'application est servie en HTTPS (ou localhost pour le dev).
    * [ ] Le navigateur mobile propose "Ajouter à l'écran d'accueil".
    * [ ] L'application lancée depuis l'écran d'accueil s'affiche en plein écran (standalone), sans barre d'URL.