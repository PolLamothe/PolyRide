# Présentation du projet
Ce projet s'inscrit dans la matière **"Gestion de projet écologique"** et doit être planifier et gérér de façon **agile (Scrum)**.

Ce projet est un site web, de préférence une Progressive Web App ([PWA](https://fr.wikipedia.org/wiki/Progressive_web_app)), permettant aux étudiants de Nantes Université ou au minimum ceux de Polytech Nantes de pouvoir réaliser leurs déplacements quotidien vers l'école en utilisant le **covoiturage**.

La spécifité de ce projet est la fait d'automatiquement mettre en relation des étudiants commencant/terminant à la même heure via une mise en commun automatique des **emplois du temps**.

# Contexte et Cadre du Projet
Ce projet est réalisé dans le cadre de la matière "Gestion de projet écologique", enseignée par Mme Sylvaine Gautier. Il s'inscrit dans la thématique "Transport/Mobilité" et doit privilégier une approche "Locale et Citoyenne".

**Contraintes principales :**
* **Timeline :** Le projet se déroule du 13/10/2025 au 01/12/2025 (Deadline).
* **Sprints :** 3-4 sprints sont prévus.
* **Coût :** Le défi est de s'approcher d'un coût de "0".

# Objectifs et Critères (SMARTEF)
L'objectif principal est de concevoir et mettre en œuvre un projet concret et réaliste ayant un impact positif sur la planète et la société. Le projet doit avoir un impact sociétal et environnemental mesurable.

Les objectifs doivent respecter le cadre **SMARTEF** :
* **S**pécifique : C'est l'action de l'équipe qui permet d'atteindre le résultat.
* **M**esurable : Des indicateurs doivent permettre d'attester que les objectifs sont atteints.
* **A**tteignable et ambitieux.
* **R**éaliste : En adéquation avec les moyens et ressources disponibles.
* **T**emporisé : Limité dans le temps.
* **É**cologique.
* **F**un / Motivant.

# Livrables et Évaluation
Le projet sera évalué au travers de plusieurs livrables présentés lors des séances de TD :

* **TD1 :**
    * Mini dossier projet.
    * Présentation du Sprint planning à la classe.
* **TD2 :**
    * Sprint Review (démonstration).
* **TD3 (Livraison finale) :**
    * Livraison finale sous forme de "LIBRE PRESENTATION" de 7 minutes.
    * Cette présentation est une Sprint Review / Rétrospective.
    * Une évaluation croisée sera réalisée lors de cette séance.

### Contenu de la présentation finale
La présentation finale (TD3) doit obligatoirement comporter :
* Le contexte.
* Le ou les objectifs avec des critères MESURABLES et SMARTEF.
* Le déroulé précis du projet ("Racontez-nous une histoire").
* La composition de l'équipe (distribution des rôles).
* Le burn down chart.
* Une démo (sprint planning).
* Le Product Backlog.
* Le lien vers l'outil de gestion (JIRA ou autre) montrant les sprints, les tâches (US) et leur répartition.
* Ce que l'équipe a retiré de l'expérience (les plus et les moins).
* Le "Et après...".

# L'équipe
L'équipe dévant réaliser ce projet est consitué de 4 membres :

### Pol LAMOTHE :
**Role Scrum : Product Owner, Dev Team**

- Responsable Technique
- Responsable Backend

### Julien PITRE :
**Role Scrum : Scrum Master, Dev Team**

- Reponsable Frontend

### Kyllian ARNAUD :
**Role Scrum : Dev Team**

- Reponsable Base de donnée
- Developpeur Frontend

### Anouar EL KHATBI IMANI :
**Role Scrum : Dev Team**

- Responsable Communication
- Développeur Frontend

# Planification des Sprints

### Sprint 1 : "Cadrage & Socle Technique" (23 Octobre - 10 Novembre)

**Objectif Sprint :** Préparer tous les livrables administratifs pour le TD1 et construire le socle technique (authentification) pour que le développement fonctionnel puisse démarrer le 10/11.

* **Tâches Backend :**
    * Initialiser le **Backend (NodeJS)**, le dépôt Git.
    * Développer les endpoints d'inscription/login (avec validation email `@univ-nantes.fr`).
        * **Responsable(s) :** **Pol** (pour l'ensemble du Backend).

* **Tâches Base de Données :**
    * Concevoir et exécuter le **schéma SQL initial** (pour la gestion des utilisateurs et des événements de calendrier).
        * **Responsable(s) :** **Kyllian**.

* **Tâches Frontend (Core) :**
    * Initialiser le **Frontend (React)** et définir la structure des dossiers.
        * **Responsable(s) :** **Julien** (Lead).
    * Mettre en place le **système de routing** (React Router).
        * **Responsable(s) :** **Kyllian**.
    * Implémenter la **logique d'authentification** (Gestion d'état global, appels API).
        * **Responsable(s) :** **Julien** (Lead), **Kyllian**.

* **Tâches Frontend (Support) :**
    * Créer les **composants UI visuels** (HTML/CSS) pour l'inscription et le login.
        * **Responsable(s) :** **Anouar**.

* **LIVRABLE (TD1 - 10 Novembre) :**
    * Mini dossier projet.
    * Présentation du planning des Sprints 2 et 3.

---

### Sprint 2 : "Noyau Fonctionnel & Matching" (10 Novembre - 24 Novembre)

**Objectif Sprint :** Livrer la fonctionnalité centrale : un utilisateur authentifié importe son EDT, renseigne son adresse, et peut voir des "matches" de covoiturage. (Prêt pour la démo TD2).

* **Tâches Backend :**
    * (API & Logique) Développer l'endpoint et le *parser* (`node-ical`) pour l'import du lien `.ics`.
    * (API) Intégrer **Nominatim** (géocodage de l'adresse).
    * (Logique) Développer l'algorithme de **matching** (horaires + géo).
        * **Responsable(s) :** **Pol** (pour l'ensemble du Backend).

* **Tâches Base de Données :**
    * Écrire les **scripts de migration SQL** (pour la gestion des trajets proposés et des réservations).
        * **Responsable(s) :** **Kyllian**.

* **Tâches Frontend (Core) :**
    * Créer la page "Mon Profil" (Formulaire `.ics` + Adresse) et la connecter à l'API.
        * **Responsable(s) :** **Kyllian**.
    * Créer la page "Rechercher un trajet" (logique des filtres, affichage des "matches").
        * **Responsable(s) :** **Julien** (Lead).
    * Intégrer **Leaflet** (carte) pour visualiser les zones.
        * **Responsable(s) :** **Julien**.

* **Tâches Frontend (Support) :**
    * Mettre en place la **charte graphique** (CSS global, variables).
    * Appliquer le style (CSS) aux pages existantes (Login, Profil, etc.).
        * **Responsable(s) :** **Anouar**.

* **LIVRABLE (TD2 - ~24 Novembre) :**
    * Préparer la démo de Sprint Review.
        * **Responsable(s) :** **Anouar** (Présentation), **Julien** (SM).

---

### Sprint 3 : "Interaction & Finition" (24 Novembre - 1er Décembre)

**Objectif Sprint :** Finaliser le produit avec le chat, la PWA, et préparer la livraison finale.

* **Tâches Backend :**
    * Implémenter le serveur **Socket.io** (Chat) + API de persistance des messages.
        * **Responsable(s) :** **Pol**.

* **Tâches Base de Données :**
    * Écrire la **migration SQL** (pour la messagerie).
        * **Responsable(s) :** **Kyllian**.

* **Tâches Frontend (Core) :**
    * Implémenter la logique client **Socket.io** (connexion, émission/réception).
        * **Responsable(s) :** **Julien** (Lead).
    * Implémenter le **Service Worker** et le `manifest.json` pour la PWA.
        * **Responsable(s) :** **Kyllian**.

* **Tâches Frontend (Support) :**
    * Créer le **composant UI du Chat** (visuel des bulles, champ de saisie, CSS).
        * **Responsable(s) :** **Anouar**.

* **Tâches de Clôture (Livrable TD3) :**
    * Préparer la **présentation finale** (diapositives, rétrospective).
        * **Responsable(s) :** **Anouar** (Comms Lead).

* **LIVRABLE (TD3 - 1er Décembre) :**
    * Présentation finale (7 min) et démo du produit.