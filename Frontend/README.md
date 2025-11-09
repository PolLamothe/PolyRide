# PolyRide - Frontend

Ce projet est le frontend de l'application PolyRide, une application de covoiturage pour les étudiants de Polytechnique.

## Prérequis

-   [Node.js](https://nodejs.org/) (version 18.x ou supérieure recommandée)
-   [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)

## Installation

1.  Clonez le dépôt du projet.
2.  Naviguez dans le dossier `Frontend` :
    ```bash
    cd Frontend
    ```
3.  Installez les dépendances :
    ```bash
    npm install
    ```

## Lancement du serveur de développement

Pour lancer le serveur de développement du frontend, exécutez la commande suivante :

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173) (Vite utilise le port 5173 par défaut, mais cela peut varier si le port est déjà utilisé).

## Lancement du Backend

Le frontend a besoin du backend pour fonctionner correctement. Pour lancer le serveur backend :

1.  Ouvrez un nouveau terminal.
2.  Naviguez dans le dossier `Backend` :
    ```bash
    cd ../Backend
    ```
3.  Installez les dépendances :
    ```bash
    npm install
    ```
4.  Lancez le serveur (en mode développement avec `nodemon` s'il est installé, sinon avec `node`) :
    ```bash
    node server.js
    ```
    ou si vous avez nodemon:
    ```bash
    nodemon server.js
    ```

Le serveur backend sera accessible à l'adresse [http://localhost:3001](http://localhost:3001).

## Qu'est-ce qu'un JWT (JSON Web Token) ?

JWT (prononcé "jot") est une norme ouverte (RFC 7519) qui définit une manière compacte et autonome de transmettre en toute sécurité des informations entre les parties sous forme d'objet JSON. Ces informations peuvent être vérifiées et approuvées car elles sont signées numériquement.

### Structure d'un JWT

Un JWT se compose de trois parties séparées par des points (`.`):

1.  **Header (En-tête)** : Contient le type de token (JWT) et l'algorithme de signature utilisé (par exemple, HMAC SHA256 ou RSA).
    ```json
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```
2.  **Payload (Charge utile)** : Contient les "claims" (revendications). Les claims sont des déclarations sur une entité (généralement l'utilisateur) et des données supplémentaires. Il existe des claims enregistrés (comme `iss` pour l'émetteur, `exp` pour la date d'expiration, `sub` pour le sujet), des claims publics et des claims privés.
    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true,
      "iat": 1516239022
    }
    ```
3.  **Signature** : Pour créer la signature, vous devez prendre l'en-tête encodé en Base64Url, la charge utile encodée en Base64Url, une clé secrète, l'algorithme spécifié dans l'en-tête, et les signer.

Par exemple, en utilisant l'algorithme HMAC SHA256, la signature sera créée de la manière suivante :
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

La signature est utilisée pour vérifier que le message n'a pas été modifié en cours de route.

### Comment ça marche dans PolyRide ?

1.  **Connexion** : Lorsque vous vous connectez avec votre email et votre mot de passe, le backend vérifie vos informations d'identification.
2.  **Création du Token** : Si les informations sont correctes, le backend crée un JWT qui contient votre identifiant utilisateur (`userId`). Ce token est signé avec une clé secrète connue uniquement du backend.
3.  **Stockage du Token** : Le backend envoie ce JWT au frontend. Le frontend le stocke (par exemple, dans un cookie HTTP-only ou dans le `localStorage`).
4.  **Requêtes authentifiées** : Pour chaque requête ultérieure vers une route protégée du backend (par exemple, pour voir votre profil), le frontend inclut le JWT dans l'en-tête de la requête (généralement dans l'en-tête `Authorization` avec le préfixe `Bearer`).
5.  **Vérification du Token** : Le backend reçoit la requête, extrait le JWT et vérifie sa signature en utilisant la clé secrète. S'il est valide, le backend peut faire confiance aux informations contenues dans le token (comme le `userId`) et autoriser la requête.

Ce mécanisme permet au backend de ne pas avoir à stocker d'informations sur l'état de la session de l'utilisateur, ce qui le rend "stateless" et plus facile à mettre à l'échelle.