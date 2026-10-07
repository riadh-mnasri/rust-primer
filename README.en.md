# GoPrimer

A pedagogical web application for learning the Go programming language from scratch: a progressive path through modules and lessons, annotated code examples, exercises with hints and solutions, and progress tracking. Bilingual French / English interface.

*Lire en français : [README.md](README.md)*

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS 4
- [next-intl](https://next-intl.dev) for internationalization (`app/[locale]`)

## Getting started

```bash
npm install
npm run dev
```

The app is available at [http://localhost:3131](http://localhost:3131) (auto-redirects to `/fr`).

## Content structure

Course content is kept separate from the rendering engine, under `src/content/`:

- `src/content/types.ts`: curriculum types (module, lesson, section, exercise), with bilingual `{ fr, en }` fields.
- `src/content/modules/*.ts`: one file per module, containing its lessons.
- `src/content/curriculum.ts`: assembles the modules and exposes navigation helpers (next module, next lesson...).

Modules already written (status `available`): Getting started, Basic syntax, Control flow. The remaining modules exist as metadata only (status `planned`) and will be fleshed out in future iterations: Functions, Arrays/slices/maps, Structs and methods, Interfaces, Error handling, Pointers, Packages and modules, Goroutines and channels, Testing, Idiomatic Go.

## Progress

Progress (lessons marked as done) is stored in the browser's `localStorage`, with no account or backend required.

## Environment variables

No environment variables are required for local development.

## Tests

```bash
npm run lint
npx tsc --noEmit
```

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers a production deployment.

## License

© 2026 Riadh MNASRI
