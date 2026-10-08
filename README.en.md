# RustPrimer

A web app to learn the Rust language from scratch while building a real project across the modules: **riskforge**, a Monte Carlo counterparty risk engine (EE, PFE, EPE, CVA). Short lessons, commented code examples, exercises with hints and solutions, progress tracking. Bilingual French / English interface.

*Lire en français : [README.md](README.md)*

## The idea: a running project

Every module ends with a "Running project" lesson that applies the module's notions to riskforge:

| Module | Project step |
|---|---|
| Getting started | Create the crate and print the simulation context |
| Language basics | Positive exposure and expected exposure (EE) |
| Ownership and borrowing | Functions that borrow scenarios, zero copies |
| Structs, enums | Domain model: Trade, NettingSet |
| Error handling | Loading a CSV portfolio without panics |
| Traits and generics | Interchangeable diffusion models (GBM, Hull-White) |
| Closures and iterators | EE, 97.5% PFE and EPE profiles |
| Modules, tests, benchmarks | Tests, comparison with Kotlin, criterion |
| Concurrency | Parallelization with rayon |
| FFI and JVM interop | Called from Kotlin (FFM API), JVM versus Rust benchmark |

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

The app runs on [http://localhost:3175](http://localhost:3175) (automatic redirect to `/fr`).

## Content structure

Course content is kept apart from the rendering engine, in `src/content/`:

- `types.ts`: curriculum types (module, lesson, section, exercise) with bilingual `{ fr, en }` fields. A lesson with `kind: "project"` is a running project step.
- `modules/*.ts`: one module per file, with its lessons.
- `project.ts`: the riskforge milestones shown on the home page.
- `curriculum.ts`: assembles the modules and exposes navigation.

Written modules: Getting started, Language basics, Ownership and borrowing, Structs, enums and pattern matching (18 lessons, including 4 project steps). The other modules exist as metadata (`planned` status) and will be written over the next iterations.

Every Rust snippet containing a `main` is compiled and run with `rustc` before publishing; only the starter code of "fix this code" exercises fails on purpose.

## Progress

Progress (completed lessons) is stored in the browser's `localStorage`, no account or backend.

## Environment variables

None.

## Tests

```bash
npm run lint
npx tsc --noEmit
```

## Deployment

Planned on [Vercel](https://vercel.com): every push to `main` triggers a production deployment.

## Roadmap

- [x] Modules 1 to 3 and their project steps
- [x] Structs, enums and pattern matching
- [ ] Collections, error handling
- [ ] Traits and generics, closures and iterators
- [ ] Lifetimes, tests and benchmarks, smart pointers
- [ ] Concurrency, async, FFI and JVM interop

## License

© 2026 Riadh MNASRI. All rights reserved.
