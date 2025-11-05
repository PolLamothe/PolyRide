# 🛠️ Backend - Guide de Démarrage

Ce document explique comment installer et lancer le serveur Backend (Node.js) de PolyRide en local.

## 📋 Prérequis

Avant de commencer, assure-toi d'avoir installé :

* **Node.js** (v18+ recommandé) : [Télécharger ici](https://nodejs.org/)
* **npm** (généralement inclus avec Node.js)
* **Base de données SQL** (PostgreSQL/MySQL selon votre choix d'équipe pour la tâche S1-DB-1)

## 🚀 Installation

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```

## ⚙️ Configuration (.env)

Le serveur a besoin de variables d'environnement pour fonctionner (notamment pour la connexion Base de Données).

1.  Crée un fichier `.env` à la racine du backend.
2. Copie le contenu du fichier .env.example dedans

> **Note pour Kyllian** : Assure-toi que la DB locale correspond à ces informations lors de l'exécution de tes scripts SQL.

## ▶️ Lancement

### Mode développement (rechargement automatique)

Si `nodemon` est installé (recommandé pour le dev) :

```bash
npm run dev
```

### Mode standard

```bash
node server.js
```

ou via npm si le script est configuré dans `package.json` :

```bash
npm start
```

## ✅ Vérification

Si tout va bien, le terminal devrait afficher quelque chose comme :

```
Serveur lancé sur le port 3000 🚀
Connexion à la BDD réussie ✅
```

Tu peux tester que l'API répond via ton navigateur ou Postman : `http://localhost:3000/` (ou une route de test si tu en as défini une).

## 📂 Structure du Backend

Petit rappel de l'organisation pour l'équipe :

  * `server.js` : Point d'entrée de l'application.
  * `/controllers` : Logique métier (ex: `auth.controller.js` pour l'inscription/login).
  * `/routes` : Définition des URLs d'API (ex: `auth.routes.js`).
  * `/db` & `/dao` : Gestion de la connexion et des requêtes à la base de données.