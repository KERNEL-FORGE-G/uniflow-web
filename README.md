# UniFlow Web

Front-end de la plateforme éducative UniFlow (React + Vite + Tailwind).

## Démarrage

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173/

## Mode données

Par défaut le front tourne **en mocks** (`src/mocks/` + `src/services/`).

Pour brancher l'API backend :

1. Copier `.env.example` → `.env`
2. Mettre `VITE_USE_API=true`
3. Renseigner `VITE_API_BASE_URL`

Voir le contrat attendu : [`docs/api-contract.md`](docs/api-contract.md).

## Comptes démo (auth mock)

| Email | Rôle |
|---|---|
| emma.martin@uniflow.edu | Étudiant |
| lucas.dubois@uniflow.edu | Délégué |
| martin@uniflow.edu | Enseignant |
| admin@uniflow.edu | Admin |

Mot de passe : n'importe lequel (non vérifié en mock).

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build production
- `npm run lint` — oxlint
- `npm run preview` — preview du build
