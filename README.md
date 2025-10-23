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

### Julien PITRE :
**Role Scrum : Scrum Master, Dev Team**

### Kyllian ARNAUD :
**Role Scrum : Dev Team**

### Anouar EL KHATBI IMANI :
**Role Scrum : Dev Team**

# Planification des Sprints

#### Semaine 1 (Pré-Sprint / Sprint 0) : 13/10 - 19/10
*Objectif :* Mettre en place les fondations.
* **Tâches :**
    * Finaliser le mini-dossier projet et la présentation du Sprint Planning (pour TD1).
    * Initialiser le dépôt Git, le projet React, le serveur NodeJS (Express).
    * Concevoir le schéma de la DB SQL (Tables : `Users`, `Courses`, `Trips`, `Messages`).

**Livrable : Présentation du Sprint Planning (TD1)**

---

#### Sprint 1 : "Le Noyau : Identité et Données" (2 semaines : ~20/10 - 02/11)
*Objectif Sprint :* Un étudiant peut s'inscrire (avec validation d'email), se connecter, et voir son propre emploi du temps dans l'application.
* **Backend (NodeJS/SQL) :**
    * **Tâche 1 (Auth) :** Implémenter l'**inscription** (limité au domaine `@univ-nantes.fr`) et le **login**. Mettre en place la logique d'envoi d'email de vérification.
    * **Tâche 2 (EDT) :** Créer un endpoint API où l'utilisateur peut soumettre son **lien `.ics`**.
    * **Tâche 3 (EDT/DB) :** Quand le lien est soumis, le backend télécharge le fichier, le **parse (avec `node-ical`)**, et stocke les événements à venir dans la table `Courses`.
* **Frontend (React) :**
    * **Tâche 1 (Auth) :** Créer les pages : Inscription, Connexion, et "Veuillez vérifier votre email".
    * **Tâche 2 (Profil) :** Créer la page "Mon Profil" où l'utilisateur colle son lien `.ics` et renseigne son adresse postale.
    * **Tâche 3 (EDT) :** Créer une vue "Mon Emploi du Temps" qui affiche les cours récupérés depuis le backend.

---

#### Sprint 2 : "Le Matching" (2 semaines : ~03/11 - 16/11)
*Objectif Sprint :* L'application propose des trajets compatibles en se basant sur les horaires et les adresses géolocalisées.
* **Backend (NodeJS/SQL) :**
    * **Tâche 1 (Geo) :** Intégrer l'API **Nominatim** (OpenStreetMap) pour convertir l'adresse de l'utilisateur en coordonnées GPS (Latitude/Longitude) et les stocker dans la table `Users`.
    * **Tâche 2 (Matching) :** Développer l'algorithme de **matching** :
        * Requête SQL pour trouver les utilisateurs avec des cours qui finissent/commencent aux mêmes heures.
        * Pour les "matches", vérifier la compatibilité des adresses (par ex. calcul de distance à vol d'oiseau, ou mieux, via l'API **OSRM**).
    * **Tâche 3 (API) :** Créer les endpoints API pour "Proposer un trajet" et "Chercher un trajet".
* **Frontend (React) :**
    * Créer les pages "Proposer" et "Rechercher" un trajet.
    * Afficher les résultats des "matches".
    * Intégrer **Leaflet** pour afficher les points de départ/arrivée sur une carte.

**Livrable : Démo fonctionnelle pour le Sprint Review (TD2)**

---

#### Sprint 3 : "L'Interaction et Finition" (2 semaines : ~17/11 - 30/11)
*Objectif Sprint :* Les utilisateurs peuvent s'organiser via un chat en temps réel et l'application est "installable" (PWA).
* **Backend (NodeJS/SQL) :**
    * **Tâche 1 (Chat) :** Implémenter le serveur **Socket.io** pour le chat.
    * **Tâche 2 (Chat) :** Connecter Socket.io à la DB **SQL** pour que chaque message envoyé soit stocké avant d'être diffusé.
* **Frontend (React) :**
    * **Tâche 1 (Chat) :** Développer le composant de **Chat** (interface de messagerie) qui se connecte au serveur Socket.io.
    * **Tâche 2 (PWA) :** Implémenter le **Service Worker** et le `manifest.json` pour rendre le site installable (PWA).
    * **Tâches de fin :** Polissage de l'interface, tests, et préparation de tous les livrables finaux (Burndown chart, démo, etc.).

**Livrable : Présentation finale (TD3 le 01/12)**