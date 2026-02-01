# Season Deals - Informatique

Site statique Vite/React pour afficher des produits.

Instructions rapides pour publier sur GitHub et déployer:

1. Initialiser le dépôt local (déjà fait automatiquement si vous avez accepté).

2. Créer le repo distant sur GitHub (utilisez `gh` ou l'interface web) :

```bash
# avec GitHub CLI (si installé et connecté):
gh repo create <username>/<repo-name> --public --source=. --remote=origin --push
```

3. Si vous ne voulez pas utiliser `gh`, créez le repo sur github.com puis :

```bash
git remote add origin https://github.com/<username>/<repo-name>.git
git branch -M main
git push -u origin main
```

4. Le workflow GitHub Actions ajouté va construire l'application et publier le contenu du dossier `dist/` sur la branche `gh-pages` à chaque push sur `main`.

5. Après le push, activez GitHub Pages dans les paramètres du dépôt si nécessaire (source: `gh-pages` branch). Le site sera accessible via `https://<username>.github.io/<repo-name>/`.

Notes:
- Si vous préférez Vercel/Netlify, connectez votre repo et configurez la commande de build `npm run build` et le dossier de publication `dist`.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/168Z2vpu_q5KeQQbjdQqhxtiD6XSmgGyp

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
