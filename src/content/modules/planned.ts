import type { Module } from "../types";

const planned: Array<Pick<Module, "id" | "slug" | "title" | "description">> = [
  {
    id: "structs-enums",
    slug: "structs-enums",
    title: { fr: "Structs, enums et pattern matching", en: "Structs, enums and pattern matching" },
    description: {
      fr: "Modéliser un domaine avec des types précis, et laisser match vérifier chaque cas.",
      en: "Model a domain with precise types, and let match check every case.",
    },
  },
  {
    id: "collections",
    slug: "collections",
    title: { fr: "Collections", en: "Collections" },
    description: {
      fr: "Vec, String et HashMap : les structures de données du quotidien.",
      en: "Vec, String and HashMap: the everyday data structures.",
    },
  },
  {
    id: "error-handling",
    slug: "error-handling",
    title: { fr: "Gestion des erreurs", en: "Error handling" },
    description: {
      fr: "Option, Result et l'opérateur ? : des erreurs visibles dans les types, sans exceptions.",
      en: "Option, Result and the ? operator: errors visible in the types, no exceptions.",
    },
  },
  {
    id: "traits-generics",
    slug: "traits-generics",
    title: { fr: "Traits et génériques", en: "Traits and generics" },
    description: {
      fr: "Le polymorphisme à la Rust : des comportements partagés, sans coût à l'exécution.",
      en: "Polymorphism the Rust way: shared behavior, with zero runtime cost.",
    },
  },
  {
    id: "closures-iterators",
    slug: "closures-iterators",
    title: { fr: "Closures et itérateurs", en: "Closures and iterators" },
    description: {
      fr: "map, filter, fold : du code fonctionnel aussi rapide qu'une boucle écrite à la main.",
      en: "map, filter, fold: functional code as fast as a hand-written loop.",
    },
  },
  {
    id: "lifetimes",
    slug: "lifetimes",
    title: { fr: "Lifetimes", en: "Lifetimes" },
    description: {
      fr: "Comprendre les annotations 'a et pourquoi le compilateur en a parfois besoin.",
      en: "Understand 'a annotations and why the compiler sometimes needs them.",
    },
  },
  {
    id: "testing",
    slug: "testing",
    title: { fr: "Modules, tests et benchmarks", en: "Modules, tests and benchmarks" },
    description: {
      fr: "Organiser un crate, écrire des tests intégrés et mesurer avec criterion.",
      en: "Organize a crate, write built-in tests and measure with criterion.",
    },
  },
  {
    id: "smart-pointers",
    slug: "smart-pointers",
    title: { fr: "Smart pointers", en: "Smart pointers" },
    description: {
      fr: "Box, Rc, Arc et RefCell : quand la propriété unique ne suffit plus.",
      en: "Box, Rc, Arc and RefCell: when single ownership is not enough.",
    },
  },
  {
    id: "concurrency",
    slug: "concurrency",
    title: { fr: "Concurrence", en: "Concurrency" },
    description: {
      fr: "Threads, channels et rayon : du parallélisme sans data race, garanti par le compilateur.",
      en: "Threads, channels and rayon: parallelism without data races, guaranteed by the compiler.",
    },
  },
  {
    id: "async",
    slug: "async",
    title: { fr: "Async avec Tokio", en: "Async with Tokio" },
    description: {
      fr: "async/await, futures et runtime Tokio pour les programmes réseau.",
      en: "async/await, futures and the Tokio runtime for network programs.",
    },
  },
  {
    id: "ffi",
    slug: "ffi",
    title: { fr: "FFI et interop JVM", en: "FFI and JVM interop" },
    description: {
      fr: "unsafe maîtrisé, ABI C et appel d'une bibliothèque Rust depuis Kotlin.",
      en: "Controlled unsafe, the C ABI, and calling a Rust library from Kotlin.",
    },
  },
];

export const plannedModules: Module[] = planned.map((module) => ({
  ...module,
  status: "planned",
  lessons: [],
}));
