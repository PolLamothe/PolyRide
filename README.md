# Présentation du projet
Ce projet s'inscrit dans la matière **"Gestion de projet écologique"** et doit être planifier et gérér de façon **agile (Scrum)**.

Ce projet est un site web, de préférence une Progressive Web App ([PWA](https://fr.wikipedia.org/wiki/Progressive_web_app)), permettant aux étudiants de Nantes Université ou au minimum ceux de Polytech Nantes de pouvoir réaliser leurs déplacements quotidien vers l'école en utilisant le **covoiturage**.

La spécifité de ce projet est la fait d'automatiquement mettre en relation des étudiants commencant/terminant à la même heure via une mise en commun automatique des **emplois du temps**.

# Contexte et Cadre du Projet
Ce projet est réalisé dans le cadre de la matière "Gestion de projet écologique". Il s'inscrit dans la thématique "Transport/Mobilité" et doit privilégier une approche "Locale et Citoyenne".

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
- Responsable Base de donnée

### Julien PITRE :
**Role Scrum : Scrum Master, Dev Team**

- Responsable Frontend

### Kyllian ARNAUD :
**Role Scrum : Dev Team**

- Co-Responsable Frontend

### Anouar EL KHATBI IMANI :
**Role Scrum : Dev Team**

- Responsable Communication
- Développeur 

# Note de Cadrage : Projet PolyRide

# Note de Cadrage : Projet PolyRide

| Section | Description |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Titre du Projet** | PolyRide |
| **Problème à résoudre / But / Besoin** | Réduire l'empreinte carbone des déplacements étudiants vers le campus de Polytech Nantes et Nantes Université. Le but est de faciliter le covoiturage grâce à la **spécificité du projet : la mise en relation automatique (matching) basée sur la synchronisation des emplois du temps (via import `.ics`) et la proximité géographique.** |
| **Contexte** | Projet de la matière "Gestion de projet écologique" de Polytech Nantes. Thématique "Transport/Mobilité" - "Locale et Citoyenne". |
| **Objectifs (SMARTEF)** | - **Spécifique :** Développer "PolyRide", une PWA de covoiturage destinée aux étudiants de Nantes Université. La spécificité du projet est la mise en relation automatique (matching) basée sur la synchronisation des emplois du temps (via import `.ics`) et la proximité géographique.<br>- **Mesurable :**<br>    - **Objectif Produit :** 100% des User Stories P1 et P2 (Authentification, Profil, Matching, Carte) sont fonctionnelles et démontrables lors de la livraison finale (TD3).<br>    - **Objectif Gestion :** Le Burndown Chart est maintenu à jour, présenté lors des livrables, et reflète la vélocité de l'équipe dans la complétion des points de vélocité estimés.<br>- **Atteignable :** Le périmètre (MVP + extensions PWA/Chat) est jugé atteignable en 4 sprints par une équipe de 4 étudiants, en priorisant les fonctionnalités vitales (P1, P2).<br>- **Réaliste :** Le projet respecte la contrainte "coût 0" en s'appuyant sur des technologies open-source (React, Node.js, Leaflet) et un hébergement sur infrastructure personnelle (Raspberry Pi / VPS). (Prend en compte l'expérience web variable des membres).<br>- **Temporisé :** Le projet est strictement délimité dans le temps, commençant le 13/10/2025 avec une deadline finale fixée au 01/12/2025 pour la livraison (TD3).<br>- **Écologique :** Le projet vise un impact environnemental positif direct en réduisant l'empreinte carbone des trajets étudiants (thématique "Transport/Mobilité").<br>- **Fun :** Réaliser une application concrète, intuitive et engageante, qui répond à un besoin réel de la communauté étudiante. |
| **Périmètre (Product Backlog)** | - **US01 (P1) :** Authentification Étudiante (`@univ-nantes.fr`).<br>- **US02 (P2) :** Profil & Import EDT (`.ics`), adresse géocodée.<br>- **US03 (P2) :** Recherche de Covoiturage (match EDT +/- 30 min, proximité).<br>- **US04 (P2) :** Visualisation Carte (Leaflet).<br>- **US05 (P3) :** Messagerie Instantanée (Socket.io).<br>- **US06 (P3) :** Expérience Mobile (PWA). |
| **Acteurs / Équipe** | - **Pol LAMOTHE :** Product Owner, Dev Team (Resp. Technique, Backend, DB).<br>- **Julien PITRE :** Scrum Master, Dev Team (Resp. Frontend).<br>- **Kyllian ARNAUD :** Dev Team (Co-Resp. Frontend).<br>- **Anouar EL KHATBI IMANI :** Dev Team (Resp. Communication, Dev Frontend). |
| **Contraintes** | - **Méthodologie :** Agile (Scrum).<br>- **Deadline :** 01/12/2025.<br>- **Coût :** Approche "coût 0". **L'hébergement (serveur, domaine) sera assuré par des moyens personnels (Raspberry Pi / VPS) pour rester dans ce budget.**<br>- **Humain :** Certain membre ont très peu d'expérience en développement Web. |
| **Planning (Sprints)** | - **Sprint 1 (23/10 - 10/11) :** Cadrage & Socle Technique (Authentification).<br>- **Sprint 2 (10/11 - 17/11) :** Noyau Fonctionnel - Profil (Import EDT, Adresse).<br>- **Sprint 3 (17/11 - 24/11) :** Noyau Fonctionnel - Matching & Carte.<br>- **Sprint 4 (24/11 - 01/12) :** Interaction & Finition (Chat, PWA). |
| **Livrables** | - **TD1 (10 Nov.) :** Mini dossier projet (note de cadrage), Sprint planning.<br>- **TD2 :** Sprint Review (démonstration matching).<br>- **TD3 (01 Déc.) :** Produit fonctionnel final, présentation finale (7 min), rétrospective, Product Backlog, Burndown Chart. |
| **Ressources utilisées** | - **Technologies :** React, Node.js, MongoDB, Express, Socket.io, Leaflet, Nominatim.<br>- **Gestion :** Outil de gestion de projet (JIRA ou similaire).<br>- **Infrastructure :** Serveur personnel (Raspberry Pi ou VPS) pour l'hébergement. |