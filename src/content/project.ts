import type { Bilingual } from "./types";

export type Milestone = {
  moduleId: string;
  title: Bilingual;
  deliverable: Bilingual;
};

export const projectName = "riskforge";

export const projectPitch: Bilingual = {
  fr: "Tout au long du parcours, tu construis riskforge : un moteur Monte Carlo qui simule l'exposition d'un portefeuille de dérivés à une contrepartie (EE, PFE, EPE, puis CVA). Chaque module se termine par une étape du projet, si bien qu'à la fin tu as un vrai programme Rust, parallélisé, benchmarké, et appelable depuis Kotlin.",
  en: "Throughout the course you build riskforge: a Monte Carlo engine that simulates the exposure of a derivatives portfolio to a counterparty (EE, PFE, EPE, then CVA). Each module ends with a step of the project, so by the end you have a real Rust program, parallelized, benchmarked, and callable from Kotlin.",
};

export const milestones: Milestone[] = [
  {
    moduleId: "getting-started",
    title: { fr: "Lancer le projet", en: "Kick off the project" },
    deliverable: {
      fr: "Un crate Cargo qui compile et affiche le contexte de la simulation.",
      en: "A Cargo crate that compiles and prints the simulation context.",
    },
  },
  {
    moduleId: "basics",
    title: { fr: "Exposition positive", en: "Positive exposure" },
    deliverable: {
      fr: "Exposition d'un scénario et moyenne sur quelques scénarios codés en dur.",
      en: "Exposure of one scenario and the average over a few hard-coded scenarios.",
    },
  },
  {
    moduleId: "ownership",
    title: { fr: "Agréger sans copier", en: "Aggregate without copying" },
    deliverable: {
      fr: "Fonctions qui empruntent les scénarios (&[f64]) au lieu de les dupliquer.",
      en: "Functions that borrow scenarios (&[f64]) instead of duplicating them.",
    },
  },
  {
    moduleId: "structs-enums",
    title: { fr: "Modèle métier", en: "Domain model" },
    deliverable: {
      fr: "Trade, NettingSet et types d'instruments modélisés par des structs et des enums.",
      en: "Trade, NettingSet and instrument types modeled with structs and enums.",
    },
  },
  {
    moduleId: "error-handling",
    title: { fr: "Charger un portefeuille", en: "Load a portfolio" },
    deliverable: {
      fr: "Lecture d'un CSV de trades avec des erreurs typées, sans aucun panic.",
      en: "Reading a CSV of trades with typed errors, without a single panic.",
    },
  },
  {
    moduleId: "traits-generics",
    title: { fr: "Modèles de diffusion", en: "Diffusion models" },
    deliverable: {
      fr: "Un trait commun pour GBM et Hull-White, interchangeables dans le moteur.",
      en: "A shared trait for GBM and Hull-White, interchangeable in the engine.",
    },
  },
  {
    moduleId: "closures-iterators",
    title: { fr: "Profils d'exposition", en: "Exposure profiles" },
    deliverable: {
      fr: "EE, PFE à 97,5 % et EPE calculés par itérateurs sur toute la grille de temps.",
      en: "EE, 97.5% PFE and EPE computed with iterators across the whole time grid.",
    },
  },
  {
    moduleId: "testing",
    title: { fr: "Tests et benchmarks", en: "Tests and benchmarks" },
    deliverable: {
      fr: "Tests unitaires, comparaison avec les résultats Kotlin et benchmarks criterion.",
      en: "Unit tests, comparison with the Kotlin results and criterion benchmarks.",
    },
  },
  {
    moduleId: "concurrency",
    title: { fr: "Parallélisation", en: "Parallelization" },
    deliverable: {
      fr: "Simulation répartie sur tous les cœurs avec rayon, gain mesuré.",
      en: "Simulation spread across every core with rayon, speedup measured.",
    },
  },
  {
    moduleId: "ffi",
    title: { fr: "Appel depuis Kotlin", en: "Called from Kotlin" },
    deliverable: {
      fr: "Bibliothèque C-ABI appelée depuis la JVM (API FFM), benchmark final JVM contre Rust.",
      en: "C-ABI library called from the JVM (FFM API), final JVM versus Rust benchmark.",
    },
  },
];
