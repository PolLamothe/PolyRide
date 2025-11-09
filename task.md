# Planification des Sprints

### Sprint 1 : "Cadrage & Socle Technique" (23 Octobre - 10 Novembre)

**Objectif Sprint :** Préparer tous les livrables administratifs pour le TD1 et construire le socle technique (authentification) pour que le développement fonctionnel puisse démarrer le 10/11.

#### User Story US01 : Authentification Étudiante (19 points)
1.  Tâche : Développer les endpoints d'inscription/login (avec validation email `@univ-nantes.fr`).
    * **Estimation (pts) : 8**
    * **Responsable(s) :** Pol
    * [x] **État :** Fait
    * **Réalisé par : Pol**
    * **Terminé le : 7/11/2025**
    * **Commentaire :**
1.  Tâche : Implémenter la **logique d'authentification** (Gestion d'état global, appels API).
    * **Estimation (pts) : 8**
    * **Responsable(s) :** Julien (Lead), Kyllian
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Créer les **composants UI visuels** (HTML/CSS) pour l'inscription et le login.
    * **Estimation (pts) : 3**
    * **Responsable(s) :** Anouar
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

#### Overhead Technique & Admin (7 points)
1.  Tâche : Initialiser le **Backend (NodeJS)**, le dépôt Git.
    * **Estimation (pts) : 1** (Tâche déjà réalisée)
    * **Responsable(s) :** Pol
    * [x] **État :** Fait
    * **Réalisé par : Pol**
    * **Terminé le : 23/10**
    * **Commentaire :**
1.  Tâche : Initialiser le **Frontend (React)** et définir la structure des dossiers.
    * **Estimation (pts) : 3**
    * **Responsable(s) :** Julien (Lead)
    * [x] **État :** Fait
    * **Réalisé par : Kyllian**
    * **Terminé le : 8/11**
    * **Commentaire :** 
1.  Tâche : Mettre en place le **système de routing** (React Router).
    * **Estimation (pts) : 3**
    * **Responsable(s) :** Kyllian
    * [x] **État :** Fait
    * **Réalisé par : Kyllian**
    * **Terminé le : 8/11**
    * **Commentaire :**

* **LIVRABLE (TD1 - 10 Novembre) :**
    * Mini dossier projet. (Tâche admin/mgmt - 0 pts dev)
    * Présentation du planning des Sprints 2 et 3. (Tâche admin/mgmt - 0 pts dev)

---

### Sprint 2 : "Noyau Fonctionnel & Matching" (10 Novembre - 24 Novembre)

**Objectif Sprint :** Livrer la fonctionnalité centrale : un utilisateur authentifié importe son EDT, renseigne son adresse, et peut voir des "matches" de covoiturage. (Prêt pour la démo TD2).

#### User Story US02 : Profil & Import EDT (19 points)
1.  Tâche : (API & Logique) Développer l'endpoint et le *parser* (`node-ical`) pour l'import du lien `.ics`.
    * **Estimation (pts) : 8**
    * **Responsable(s) :** Pol
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : (API) Intégrer **Nominatim** (géocodage de l'adresse).
    * **Estimation (pts) : 3**
    * **Responsable(s) :** Pol
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Créer la page "Mon Profil" (Formulaire `.ics` + Adresse) et la connecter à l'API.
    * **Estimation (pts) : 8**
    * **Responsable(s) :** Kyllian
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

#### User Story US03 : Recherche de Covoiturage (18 points)
1.  Tâche : (Logique) Développer l'algorithme de **matching** (horaires + géo).
    * **Estimation (pts) : 13**
    * **Responsable(s) :** Pol
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Créer la page "Rechercher un trajet" (logique des filtres, affichage des "matches").
    * **Estimation (pts) : 5**
    * **Responsable(s) :** Julien (Lead)
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

#### User Story US04 : Visualisation Carte (20 points)
1.  Tâche : Intégrer **Leaflet** (carte) pour visualiser les zones.
    * **Estimation (pts) : 20**
    * **Responsable(s) :** Julien
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

#### Overhead Technique & Admin (12 points)
1.  Tâche : Mettre en place la **charte graphique** (CSS global, variables).
    * **Estimation (pts) : 3**
    * **Responsable(s) :** Anouar
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Appliquer le style (CSS) aux pages existantes (Login, Profil, etc.).
    * **Estimation (pts) : 5**
    * **Responsable(s) :** Anouar
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Recruter des utilisateurs pour les tests.
    * **Estimation (pts) : 2**
    * **Responsable(s) :** Anouar
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Préparer la démo de Sprint Review.
    * **Estimation (pts) : 2**
    * **Responsable(s) :** Anouar (Présentation), Julien (SM)
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

---

### Sprint 3 : "Interaction & Finition" (24 Novembre - 1er Décembre)

**Objectif Sprint :** Finaliser le produit avec le chat, la PWA, et préparer la livraison finale.

#### User Story US05 : Messagerie Instantanée (24 points)
1.  Tâche : Implémenter le serveur **Socket.io** (Chat) + API de persistance des messages.
    * **Estimation (pts) : 13**
    * **Responsable(s) :** Pol
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Implémenter la logique client **Socket.io** (connexion, émission/réception).
    * **Estimation (pts) : 8**
    * **Responsable(s) :** Julien (Lead)
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**
1.  Tâche : Créer le **composant UI du Chat** (visuel des bulles, champ de saisie, CSS).
    * **Estimation (pts) : 3**
    * **Responsable(s) :** Anouar
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

#### User Story US06 : Expérience Mobile (PWA) (20 points)
1.  Tâche : Implémenter le **Service Worker** et le `manifest.json` pour la PWA.
    * **Estimation (pts) : 20**
    * **Responsable(s) :** Kyllian
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

#### Overhead Technique & Admin (2 points)
1.  Tâche : Préparer la **présentation finale** (diapositives, rétrospective).
    * **Estimation (pts) : 2**
    * **Responsable(s) :** Anouar
    * [ ] **État :** À faire
    * **Réalisé par :**
    * **Terminé le :**
    * **Commentaire :**

* **LIVRABLE (TD3 - 1er Décembre) :**
    * Présentation finale (7 min) et démo du produit.