# mon-ecommerce

Site de vente en ligne avec paiement par **MTN Mobile Money** et **Orange Money**, entièrement en **TypeScript** (frontend et backend).

## Technologies

- **Frontend** : React, TypeScript, Vite, React Router, Tailwind CSS
- **Backend** : Node.js, Express, TypeScript, Sequelize
- **Base de données** : MySQL
- **Paiements** : API MTN MoMo (Collection) et Orange Money (Web Payment)

## Structure du projet

```
mon-ecommerce/
├── frontend/          Interface React (TypeScript)
│   └── src/
│       ├── assets/        Logos et images (Orange Money, MTN MoMo...)
│       ├── components/    PaymentMethodSelector.tsx, PaymentForm.tsx...
│       ├── context/       CartContext.tsx (panier)
│       ├── pages/         Catalogue.tsx, Panier.tsx, Checkout.tsx
│       ├── types/         Types partagés
│       └── App.tsx
├── backend-ts/        API Node.js (TypeScript)
│   └── src/
│       ├── config/        Connexion MySQL
│       ├── controllers/   Logique des requêtes
│       ├── models/        Tables (Sequelize)
│       ├── routes/        URLs de l'API
│       ├── services/      Appels aux API MTN / Orange
│       ├── types/         Types TypeScript partagés
│       └── index.ts       Point d'entrée
└── README.md
```

## Prérequis

- Node.js (version LTS) : https://nodejs.org
- MySQL Server et MySQL Workbench : https://dev.mysql.com/downloads/installer
- Git : https://git-scm.com
- Éditeur : Visual Studio Code

Vérifie l'installation :

```
node -v
npm -v
```

## Installation

### 1. Base de données

Dans MySQL Workbench, crée la base :

```sql
CREATE DATABASE ecommerce;
```

Les tables sont créées automatiquement au premier lancement du backend.

### 2. Backend (TypeScript)

```
cd backend-ts
npm install
```

Dépendances principales :

```
npm install express cors dotenv axios uuid mysql2 sequelize reflect-metadata
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/uuid
```

Crée un fichier `.env` dans `backend-ts` :

```
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ton_mot_de_passe_mysql
DB_NAME=ecommerce

MTN_BASE_URL=https://sandbox.momodeveloper.mtn.com
MTN_SUBSCRIPTION_KEY=
MTN_API_USER=
MTN_API_KEY=
MTN_TARGET_ENVIRONMENT=sandbox
```

Lance le serveur :

```
npm run dev
```

Tu dois voir `Serveur démarré sur le port 5000`, puis `MySQL connecté` et `Tables synchronisées`.

Pour la production :

```
npm run build
npm start
```

### 3. Frontend (React + TypeScript)

Création du projet (une seule fois, à la racine de `mon-ecommerce`) :

```
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom react-hot-toast
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Dans `tailwind.config.js`, configure les fichiers analysés :

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

Dans `src/index.css`, mets :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Crée un fichier `.env` dans `frontend` :

```
VITE_API_URL=http://localhost:5000/api
```

Dans le code, l'adresse de l'API se lit avec :

```ts
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
```

Lance le site :

```
npm run dev
```

Le site s'ouvre sur http://localhost:5173.

## Types principaux

Les paiements utilisent les mêmes types côté frontend et backend :

```ts
export type Provider = 'mtn' | 'orange';
export type StatutPaiement = 'pending' | 'success' | 'failed';
```

## État du projet

- Disponible côté backend : paiement MTN MoMo (`POST /api/payment/mtn`, `GET /api/payment/mtn/status/:reference`)
- À ajouter : paiement Orange Money, routes `/api/produits` et `/api/commandes` (nécessaires pour afficher le catalogue et valider une commande)

## Obtenir les clés de paiement

- **MTN MoMo** : https://momodeveloper.mtn.com (souscrire au produit « Collection »)
- **Orange Money** : https://developer.orange.com (activer « Orange Money Web Payment »)

Les logos Orange Money et MTN MoMo doivent provenir des fichiers officiels fournis par les opérateurs.

## Sécurité

- Les fichiers `.env` ne doivent jamais être envoyés sur Git (ils sont listés dans `.gitignore`).
- Les clés des API de paiement restent uniquement côté backend, jamais dans le frontend.
- Les paiements sont à tester en mode sandbox avant toute mise en production.

## Auteur

Christian Sorel Monkam Tientcheu