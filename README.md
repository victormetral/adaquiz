[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/rLo6X3-f)
# AdaQuiz — Projet de départ

Bienvenue sur le projet de départ AdaQuiz ! Ce repo contient la structure de base du quiz. À vous de le compléter.

## Ce qui est déjà fait

- `index.html` — la structure de base avec les 3 sections à compléter
- `style.css` — uniquement la classe .cache (permettant de cacher des écrans dynamiquement grâce au JS)
- `script.js` — le chargement du JSON et la navigation entre écrans

## Ce que vous devez faire

1. **Compléter `index.html` et `style.css`** pour créer le squelette du site, sans JavaScript
2. **Compléter `questions.json`** avec au moins 5 questions (voir le brief pour le format)
3. **Compléter les fonctions** marquées `TODO` dans `script.js` :
   - `afficherQuestion()`
   - `verifierReponse(indexChoisi)`
   - `afficherResultats()`
   - Les écouteurs d'événements en bas du fichier

## Lancer le projet en local

```bash
npx live-server
```

Ouvrir ensuite `http://localhost:8080`.

> ⚠️ Ne pas ouvrir `index.html` directement dans le navigateur — `fetch` ne fonctionne pas sans serveur local.
