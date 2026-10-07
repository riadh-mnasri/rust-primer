# RustPrimer

Application web pédagogique pour apprendre le langage Rust depuis zéro, en construisant au fil des modules un vrai projet : **riskforge**, un moteur Monte Carlo de risque de contrepartie (EE, PFE, EPE, CVA). Leçons courtes, exemples de code commentés, exercices avec indice et solution, suivi de progression. Interface bilingue français / anglais.

*Read this in English: [README.en.md](README.en.md)*

## Le principe : un projet fil rouge

Chaque module se termine par une leçon « Fil rouge » qui applique les notions du module au projet riskforge :

| Module | Étape du projet |
|---|---|
| Prise en main | Créer le crate et afficher le contexte de simulation |
| Les bases du langage | Exposition positive et exposition attendue (EE) |
| Ownership et emprunts | Fonctions qui empruntent les scénarios, zéro copie |
| Structs, enums | Modèle métier : Trade, NettingSet |
| Gestion des erreurs | Chargement d'un portefeuille CSV sans panic |
| Traits et génériques | Modèles de diffusion interchangeables (GBM, Hull-White) |
| Closures et itérateurs | Profils EE, PFE 97,5 %, EPE |
| Modules, tests, benchmarks | Tests, comparaison avec Kotlin, criterion |
| Concurrence | Parallélisation avec rayon |
| FFI et interop JVM | Appel depuis Kotlin (API FFM), benchmark JVM contre Rust |

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS 4
- [next-intl](https://next-intl.dev) pour l'internationalisation (`app/[locale]`)

## Démarrage

```bash
npm install
npm run dev
```

L'application est disponible sur [http://localhost:3175](http://localhost:3175) (redirection automatique vers `/fr`).

## Structure du contenu

Le contenu pédagogique est séparé du moteur d'affichage, dans `src/content/` :

- `types.ts` : types du curriculum (module, leçon, section, exercice), champs bilingues `{ fr, en }`. Une leçon `kind: "project"` est une étape du fil rouge.
- `modules/*.ts` : un module = un fichier, avec ses leçons.
- `project.ts` : les étapes du projet riskforge affichées sur la page d'accueil.
- `curriculum.ts` : assemble les modules et expose la navigation.

Modules rédigés : Prise en main, Les bases du langage, Ownership et emprunts (13 leçons, dont 3 étapes fil rouge). Les autres modules existent en métadonnées (statut `planned`) et seront rédigés au fil des itérations.

Tous les extraits Rust contenant un `main` sont compilés et exécutés avec `rustc` avant publication ; seuls les codes de départ d'exercices « corrige ce code » échouent volontairement.

## Progression

La progression (leçons terminées) est stockée dans le `localStorage` du navigateur, sans compte ni backend.

## Variables d'environnement

Aucune.

## Tests

```bash
npm run lint
npx tsc --noEmit
```

## Déploiement

Prévu sur [Vercel](https://vercel.com) : chaque push sur `main` déclenche un déploiement de production.

## Feuille de route

- [x] Modules 1 à 3 et leurs étapes fil rouge
- [ ] Structs, enums et pattern matching
- [ ] Collections, gestion des erreurs
- [ ] Traits et génériques, closures et itérateurs
- [ ] Lifetimes, tests et benchmarks, smart pointers
- [ ] Concurrence, async, FFI et interop JVM

## Licence

© 2026 Riadh MNASRI. Tous droits réservés.
