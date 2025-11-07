# Guide d'installation et de configuration de MongoDB pour le projet PolyRide

Ce guide vous expliquera comment installer MongoDB, créer la base de données et les collections nécessaires pour faire fonctionner le backend du projet PolyRide.

### Installation manuelle

Suivez les instructions sur le site officiel de MongoDB en fonction de votre OS :
[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

## 1. Création de la base de données et des collections

Une fois MongoDB installé et lancé, vous pouvez utiliser l'interface en ligne de commande `mongosh` pour créer la base de données et les collections.

1.  Ouvrez un terminal et lancez `mongosh` :

    ```bash
    mongosh
    ```

2.  Une fois dans le shell `mongosh`, créez et basculez sur la base de données `polyride` :

    ```bash
    use polyride
    ```

3.  Créez la collection `users`. MongoDB crée la collection automatiquement lors de la première insertion d'un document. Vous pouvez insérer un document vide pour forcer la création :

    ```bash
    db.createCollection("users")
    ```

## 2. Vérification

Vous pouvez vérifier que les collections ont bien été créées avec la commande :

```bash
show collections
```

Vous devriez voir `users` dans la liste.

## 3. Configuration de l'application

Assurez-vous que votre fichier `.env` à la racine du dossier `Backend` contient la bonne chaîne de connexion à la base de données :

```
MONGODB_URI=mongodb://localhost:27017/polyride
```

Vous êtes maintenant prêt à lancer le backend !
