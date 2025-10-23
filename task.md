# Planification des Sprints

### Sprint 1 : "Cadrage & Socle Technique" (23 Octobre - 10 Novembre)

**Objectif Sprint :** Préparer tous les livrables administratifs pour le TD1 et construire le socle technique (authentification) pour que le développement fonctionnel puisse démarrer le 10/11.

* **Tâches Backend (Responsable : Pol)**
    * [ ] Tâche : Initialiser le **Backend (NodeJS)**, le dépôt Git.
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Développer les endpoints d'inscription/login (avec validation email `@univ-nantes.fr`).
        * **État :** À faire
        * **Commentaire :**

* **Tâches Base de Données (Responsable : Kyllian)**
    * [ ] Tâche : Concevoir et exécuter le **schéma SQL initial** (utilisateurs, événements de calendrier).
        * **État :** À faire
        * **Commentaire :**

* **Tâches Frontend (Core)**
    * [ ] Tâche : Initialiser le **Frontend (React)** et définir la structure des dossiers.
        * **Responsable(s) :** **Julien** (Lead)
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Mettre en place le **système de routing** (React Router).
        * **Responsable(s) :** **Kyllian**
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Implémenter la **logique d'authentification** (Gestion d'état global, appels API).
        * **Responsable(s) :** **Julien** (Lead), **Kyllian**
        * **État :** À faire
        * **Commentaire :**

* **Tâches Frontend (Support) (Responsable : Anouar)**
    * [ ] Tâche : Créer les **composants UI visuels** (HTML/CSS) pour l'inscription et le login.
        * **État :** À faire
        * **Commentaire :**

* **LIVRABLE (TD1 - 10 Novembre) :**
    * Mini dossier projet.
    * Présentation du planning des Sprints 2 et 3.

---

### Sprint 2 : "Noyau Fonctionnel & Matching" (10 Novembre - 24 Novembre)

**Objectif Sprint :** Livrer la fonctionnalité centrale : un utilisateur authentifié importe son EDT, renseigne son adresse, et peut voir des "matches" de covoiturage. (Prêt pour la démo TD2).

* **Tâches Backend (Responsable : Pol)**
    * [ ] Tâche : (API & Logique) Développer l'endpoint et le *parser* (`node-ical`) pour l'import du lien `.ics`.
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : (API) Intégrer **Nominatim** (géocodage de l'adresse).
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : (Logique) Développer l'algorithme de **matching** (horaires + géo).
        * **État :** À faire
        * **Commentaire :**

* **Tâches Base de Données (Responsable : Kyllian)**
    * [ ] Tâche : Écrire les **scripts de migration SQL** (gestion des trajets proposés et des réservations).
        * **État :** À faire
        * **Commentaire :**

* **Tâches Frontend (Core)**
    * [ ] Tâche : Créer la page "Mon Profil" (Formulaire `.ics` + Adresse) et la connecter à l'API.
        * **Responsable(s) :** **Kyllian**
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Créer la page "Rechercher un trajet" (logique des filtres, affichage des "matches").
        * **Responsable(s) :** **Julien** (Lead)
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Intégrer **Leaflet** (carte) pour visualiser les zones.
        * **Responsable(s) :** **Julien**
        * **État :** À faire
        * **Commentaire :**

* **Tâches Frontend (Support) (Responsable : Anouar)**
    * [ ] Tâche : Mettre en place la **charte graphique** (CSS global, variables).
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Appliquer le style (CSS) aux pages existantes (Login, Profil, etc.).
        * **État :** À faire
        * **Commentaire :**

* **LIVRABLE (TD2 - ~24 Novembre) :**
    * [ ] Tâche : Préparer la démo de Sprint Review.
        * **Responsable(s) :** **Anouar** (Présentation), **Julien** (SM)
        * **État :** À faire
        * **Commentaire :**

---

### Sprint 3 : "Interaction & Finition" (24 Novembre - 1er Décembre)

**Objectif Sprint :** Finaliser le produit avec le chat, la PWA, et préparer la livraison finale.

* **Tâches Backend (Responsable : Pol)**
    * [ ] Tâche : Implémenter le serveur **Socket.io** (Chat) + API de persistance des messages.
        * **État :** À faire
        * **Commentaire :**

* **Tâches Base de Données (Responsable : Kyllian)**
    * [ ] Tâche : Écrire la **migration SQL** (pour la messagerie).
        * **État :** À faire
        * **Commentaire :**

* **Tâches Frontend (Core)**
    * [ ] Tâche : Implémenter la logique client **Socket.io** (connexion, émission/réception).
        * **Responsable(s) :** **Julien** (Lead)
        * **État :** À faire
        * **Commentaire :**
    * [ ] Tâche : Implémenter le **Service Worker** et le `manifest.json` pour la PWA.
        * **Responsable(s) :** **Kyllian**
        * **État :** À faire
        * **Commentaire :**

* **Tâches Frontend (Support) (Responsable : Anouar)**
    * [ ] Tâche : Créer le **composant UI du Chat** (visuel des bulles, champ de saisie, CSS).
        * **État :** À faire
        * **Commentaire :**

* **Tâches de Clôture (Livrable TD3) (Responsable : Anouar)**
    * [ ] Tâche : Préparer la **présentation finale** (diapositives, rétrospective).
        * **État :** À faire
        * **Commentaire :**

* **LIVRABLE (TD3 - 1er Décembre) :**
    * Présentation finale (7 min) et démo du produit.