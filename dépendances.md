# Dépendances des Tâches - PolyRide

Ce document détaille l'ordre logique d'exécution des tâches. Une tâche ne devrait idéalement commencer que lorsque ses **Préréquis (Dépend de)** sont terminés.

## Tableau des Dépendances

### Sprint 1 : Cadrage & Socle Technique

| ID | Tâche | Responsable | Dépend de (Préréquis) | Bloque (Est requis pour) |
| :--- | :--- | :--- | :--- | :--- |
| **S1-BE-1** | Initialiser Backend (NodeJS) & Git | Pol | *Aucun (Point de départ)* | S1-BE-2, S2-BE-1, S3-BE-1 |
| **S1-DB-1** | Schéma MongoDB initial (Users/Events) | Pol | *Aucun* | S1-BE-2, S2-DB-1 |
| **S1-FE-1** | Initialiser Frontend (React) | Julien | *Aucun (Point de départ)* | S1-FE-2, S1-FS-1 |
| **S1-FE-2** | Système de routing (React Router) | Kyllian | S1-FE-1 | S1-FE-3 |
| **S1-FS-1** | Composants UI visuels (Login/Inscription) | Anouar | S1-FE-1 (recommandé) | S1-FE-3 (intégration finale) |
| **S1-BE-2** | Endpoints Inscription/Login (API) | Pol | **S1-BE-1, S1-DB-1** | S1-FE-3 |
| **S1-FE-3** | Logique d'authentification (Front) | Julien, Kyllian | **S1-BE-2, S1-FE-2**, S1-FS-1 | S2-FE-1 (Profil requis) |

### Sprint 2 : Noyau Fonctionnel & Matching

| ID | Tâche | Responsable | Dépend de (Préréquis) | Bloque (Est requis pour) |
| :--- | :--- | :--- | :--- | :--- |
| **S2-DB-1** | Schémas MongoDB (Trajets/Réserv.) | Pol | S1-DB-1 | S2-BE-3 |
| **S2-BE-1** | API Parser ICS (`node-ical`) | Pol | S1-BE-1 | S2-BE-3, S2-FE-1 |
| **S2-BE-2** | API Intégration Nominatim (Géo) | Pol | S1-BE-1 | S2-BE-3, S2-FE-1 |
| **S2-FS-1** | Charte graphique (CSS global) | Anouar | S1-FE-1 | S2-FS-2 |
| **S2-BE-3** | Algorithme de Matching (API) | Pol | **S2-BE-1, S2-BE-2, S2-DB-1**| S2-FE-2 |
| **S2-FE-1** | Page "Mon Profil" (Import ICS + Adresse) | Kyllian | **S1-FE-3** (Auth), S2-BE-1, S2-BE-2 | S2-FE-2 (Données nécessaires) |
| **S2-FE-2** | Page "Rechercher un trajet" (Listing) | Julien | **S2-BE-3** (Algo prêt), S2-FE-1 (Profil rempli) | S2-FE-3 |
| **S2-FE-3** | Intégration Leaflet (Carte) | Julien | S2-FE-2 (Page existante) | *Aucun* |
| **S2-FS-2** | Appliquer style CSS aux pages | Anouar | S2-FS-1, (S1-FE-3, S2-FE-1, S2-FE-2) | *Finition UI* |

### Sprint 3 : Interaction & Finition

| ID | Tâche | Responsable | Dépend de (Préréquis) | Bloque (Est requis pour) |
| :--- | :--- | :--- | :--- | :--- |
| **S3-DB-1** | Schéma MongoDB (Messagerie) | Pol | S1-DB-1 | S3-BE-1 |
| **S3-BE-1** | Serveur Socket.io + API Messages | Pol | S1-BE-1, **S3-DB-1** | S3-FE-1 |
| **S3-FS-1** | Composant UI du Chat (Visuel) | Anouar | S2-FS-1 (Charte) | S3-FE-1 |
| **S3-FE-1** | Logique Client Socket.io (Front chat) | Julien | **S3-BE-1, S3-FS-1** | *Fonctionnalité Chat finie*|
| **S3-FE-2** | PWA (Service Worker, Manifest) | Kyllian | S1-FE-1 (App stable recommandée)| *Livraison finale* |

---

## Visualisation du Chemin Critique (Diagramme)

```mermaid
graph TD
    %% Styles
    classDef backend fill:#f9f,stroke:#333,stroke-width:2px;
    classDef frontend fill:#aff,stroke:#333,stroke-width:2px;
    classDef db fill:#ff9,stroke:#333,stroke-width:2px;
    classDef support fill:#ddd,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5;

    subgraph Sprint 1 [S1 : Socle Technique]
        S1-BE-1(Init Backend):::backend --> S1-BE-2(API Auth):::backend
        S1-DB-1(Init DB):::db --> S1-BE-2
        S1-FE-1(Init Frontend):::frontend --> S1-FE-2(Routing):::frontend
        S1-FE-2 --> S1-FE-3(Logique Auth):::frontend
        S1-BE-2 --> S1-FE-3
        S1-FS-1(UI Auth):::support -.-> S1-FE-3
    end

    subgraph Sprint 2 [S2 : Fonctionnel Core]
        S1-DB-1 --> S2-DB-1(Schémas Trajets):::db
        S1-BE-1 --> S2-BE-1(Parser ICS):::backend
        S1-BE-1 --> S2-BE-2(Nominatim Geo):::backend

        S2-BE-1 --> S2-BE-3(Algo Matching):::backend
        S2-BE-2 --> S2-BE-3
        S2-DB-1 --> S2-BE-3

        S1-FE-3 --> S2-FE-1(Page Profil):::frontend
        S2-BE-1 --> S2-FE-1
        S2-BE-2 --> S2-FE-1

        S2-BE-3 --> S2-FE-2(Page Recherche):::frontend
        S2-FE-1 --> S2-FE-2
        S2-FE-2 --> S2-FE-3(Leaflet Carte):::frontend
    end

    subgraph Sprint 3 [S3 : Interaction]
        S3-DB-1(Schéma Chat):::db --> S3-BE-1(Socket.io Back):::backend
        S1-BE-1 --> S3-BE-1
        S3-BE-1 --> S3-FE-1(Socket.io Front):::frontend
        S3-FS-1(UI Chat):::support -.-> S3-FE-1
    end