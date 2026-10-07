# GoPrimer

Application web pédagogique pour apprendre le langage Go depuis zéro : parcours progressif par modules et leçons, exemples de code commentés, exercices avec indice et solution, suivi de progression. Interface bilingue français / anglais.

*Read this in English: [README.en.md](README.en.md)*

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

L'application est disponible sur [http://localhost:3131](http://localhost:3131) (redirection automatique vers `/fr`).

## Structure du contenu

Le contenu pédagogique est séparé du moteur d'affichage, dans `src/content/` :

- `src/content/types.ts` : types du curriculum (module, leçon, section, exercice), avec des champs bilingues `{ fr, en }`.
- `src/content/modules/*.ts` : un module = un fichier, contenant ses leçons.
- `src/content/curriculum.ts` : assemble les modules et expose les fonctions de navigation (module suivant, leçon suivante...).

Les modules déjà rédigés (statut `available`) : Prise en main, Syntaxe de base, Structures de contrôle. Les modules suivants existent en métadonnées seules (statut `planned`) et seront étoffés au fil des prochaines itérations : Fonctions, Tableaux/slices/maps, Structs et méthodes, Interfaces, Gestion des erreurs, Pointeurs, Paquets et modules, Goroutines et channels, Tests, Go idiomatique.

## Progression

La progression (leçons marquées comme terminées) est stockée dans le `localStorage` du navigateur, sans compte ni backend.

## Variables d'environnement

Aucune variable d'environnement n'est nécessaire pour le développement local.

## Tests

```bash
npm run lint
npx tsc --noEmit
```

## Déploiement

Déployé sur [Vercel](https://vercel.com). Chaque push sur `main` déclenche un déploiement de production.

## Licence

© 2026 Riadh MNASRI
