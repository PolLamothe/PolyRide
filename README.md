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

| **Section**| **Description**|
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Titre du Projet**| PolyRide|
| **Problème à résoudre / But / Besoin** | Réduire l'empreinte carbone des déplacements étudiants vers le campus. Le covoiturage classique échoue sur ces trajets courts à cause de la **rigidité et la variabilité des horaires étudiants**. PolyRide lève ce frein par une mise en relation automatique (matching) basée sur la synchronisation des emplois du temps (via import `.ics`) et la proximité géographique.|
| **Contexte**                           | Projet de la matière "Gestion de projet écologique" de Polytech Nantes. Thématique "Transport/Mobilité" - "Locale et Citoyenne".|
| **Objectifs (SMARTEF)**                | - **Spécifique :** Développer une PWA de covoiturage pour étudiants avec matching algorithmique (ICS + Géo).<br><br>- **Mesurable :**<br>   - Site déployé et accessible<br>   - Utilisateurs pouvant s'inscrire et renseigner leurs informations<br>   - Utilisateurs pouvant trouver des étudiants proche et ayant les mêmes horaires<br>   - Utilisateurs pouvant demander et accepter/refuser des trajets<br>   - Un réel trajet réalisé via l'application<br><br>- **Atteignable :** Périmètre jugé atteignable par le responsable Technique.<br><br>- **Réaliste :** Respect de la contrainte "Coût 0€" (OpenSource, Hébergement sur infrastructure personnelle Raspberry Pi/VPS).<br><br>- **Temporisé :** Projet du 13/10/2025 au 01/12/2025 (Deadline stricte).<br><br>- **Écologique :** Réduction directe des GES + **Sensibilisation via un compteur de CO2 économisé**affiché par trajet.<br><br>- **Fun :** UX moderne et fluide pour engager la communauté étudiante. |
| **Périmètre (Product Backlog)**        | TODO|
| **Acteurs / Équipe**                   | - **Pol LAMOTHE :** Product Owner, Dev Team (Resp. Technique, Backend, DB).<br><br>- **Julien PITRE :** Scrum Master, Dev Team (Resp. Frontend).<br><br>- **Kyllian ARNAUD :** Dev Team (Co-Resp. Frontend).<br><br>- **Anouar EL KHATBI IMANI :** Dev Team (Resp. Communication, Dev Frontend).|
| **Contraintes**                        | - **Méthodologie :** Agile (Scrum).<br><br>- **Deadline :** 01/12/2025.<br><br>- **Coût :** "Coût 0" (Hébergement sur matériel personnel).<br><br>- **Humain :** Hétérogénéité des niveaux en dév Web.<br><br>- **Technique :** Dépendance aux API externes (Nominatim, ENT).<br><br>- **Déploiement** : Intégration des mise à jours directement sur le serveur de production.|
| **Planning (Sprints)**                 | - **Sprint 1 (23/10 - 10/11) :** Définitions du projet et création du socle technique<br><br>- **Sprint 2 (10/11 - 17/11) :** Personnalisation des profils utilisateurs<br><br>- **Sprint 3 (17/11 - 24/11) :** Proposition de trajets entre utilisateurs<br><br>- **Sprint 4 (24/11 - 01/12) :** Déploiement du site en production et ouverture aux étudiants|
| **Livrables**                          | - **TD1 (10 Nov.) :** Dossier cadrage, Sprint planning.<br><br>- **TD3 (01 Déc.) :** Produit final, Présentation (7 min), Rétrospective, Backlog, Burndown Chart.|
| **Ressources utilisées**               | - **Technologies :** React, Node.js, MongoDB, Express, Nominatim.<br><br>- **Gestion :** Outil de gestion de projet (JIRA ou similaire).<br><br>- **Infrastructure :** Serveur personnel (Raspberry Pi ou VPS).|

# Matrice de criticité :

**Échelle de notation :**
* **Probabilité (P) :** Faible (1), Moyenne (2), Élevée (3)
* **Impact (I) :** Faible (1), Moyen (2), Élevé (3), Critique (4)
* **Criticité :** Probabilité × Impact (Faible: 1-2, Moyenne: 3-4, Élevée: 6, Critique: 8-12)


| ID     | Description du Risque                                                                                                                                                               | Probabilité (P) |  Impact (I)  | Criticité (P×I) | Niveau de Criticité | Actions d'atténuation                                                                                                                                     |
| :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------: | :----------: | :-------------: | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **R1** | **[Technique]** Défaillance de l'infrastructure d'hébergement personnelle (Raspberry Pi / VPS).                                                                                     |   2 (Moyenne)   |  3 (Élevé)   |        6        | **Élevée**          | Préparer un plan de déploiement alternatif sur un service gratuit (ex: Vercel/Render) en cas d'échec du matériel personnel.                               |
| **R2** | **[Humain]** Manque d'expérience en développement Web de certains membres, entraînant des retards ou une qualité réduite.                                                           |   3 (Élevée)    |  3 (Élevé)   |        9        | **Critique**        | Pair programming, revues de code systématiques par les membres seniors (Pol, Kyllian), priorisation stricte du MVP (P1, P2).                              |
| **R3** | **[Planning]** Non-respect de la deadline finale du 01/12/2025 pour la livraison du TD3.                                                                                            |   2 (Moyenne)   | 4 (Critique) |        8        | **Critique**        | Suivi rigoureux du Burndown Chart. Adaptation du périmètre (dé-prioriser P3) si la vélocité est insuffisante.                                             |
| **R4** | **[Dépendances]** Retard sur une tâche backend bloquante (ex: API Matching S2-BE-3) qui bloque l'équipe Frontend (ex: S2-FE-2).                                                     |   2 (Moyenne)   |  3 (Élevé)   |        6        | **Élevée**          | Prioriser le développement des tâches backend bloquantes en début de sprint. Le Frontend travaille avec des données "mock" (fictives) en attendant l'API. |
| **R5** | **[Coût]** Dépassement de la contrainte "coût 0" (ex: besoin d'un service payant).                                                                                                  |   1 (Faible)    |  1 (Faible)  |        1        | **Faible**          | Utilisation exclusive de technologies et services open-source et gratuits (React, Node, MongoDB, Nominatim, Leaflet).                                     |
| **R6** | **[Périmètre]** L'équipe ne parvient pas à terminer les fonctionnalités P3 (Chat, PWA), prévues dans le dernier sprint.                                                             |   2 (Moyenne)   |  2 (Moyen)   |        4        | **Moyenne**         | Le Scrum Master (Julien) protège l'équipe du "scope creep". Le PO (Pol) doit être prêt à sacrifier ces US P3 si le MVP est en retard.                     |
| R8     | **[Technique / API]** Blocage par l'API **Nominatim** (OpenStreetMap). Elle est gratuite mais a une politique stricte d'usage (User-Agent obligatoire, limite de requêtes/seconde). | 2<br>(Moyenne)  | 2<br>(Moyen) |      4<br>      | Moyenne             | Mettre un système de backup utilisant une autre API d'encodage GPS                                                                                        |
| R9     | **[Données]** Hétérogénéité ou indisponibilité du service ICS de l'université (Lien cassé, format non standard, serveur EDT down).                                                  | 2<br>(Moyenne)  | 3<br>(Élevé) |        6        | Élevé               | Télécharger les emplois du temp sur le serveur afin de pouvoir survivre en attendant la réparation                                                        |