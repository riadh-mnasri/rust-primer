import type { Module } from "../types";

export const gettingStarted: Module = {
  id: "getting-started",
  slug: "getting-started",
  title: { fr: "Prise en main", en: "Getting started" },
  description: {
    fr: "Comprendre ce qu'est Rust, installer la chaîne d'outils et lancer ton premier projet Cargo.",
    en: "Understand what Rust is, install the toolchain, and run your first Cargo project.",
  },
  status: "available",
  lessons: [
    {
      id: "why-rust",
      slug: "why-rust",
      title: { fr: "Pourquoi Rust ?", en: "Why Rust?" },
      summary: {
        fr: "Ce que Rust apporte, et pourquoi il est réputé difficile au début.",
        en: "What Rust brings, and why it has a reputation for a steep start.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Rust est un langage compilé né chez Mozilla, stable depuis 2015. Il vise une promesse rare : la performance du C et du C++, sans leurs bugs mémoire (pointeurs pendants, double libération, data races). Il n'a pas de ramasse-miettes : la mémoire est libérée à un moment connu dès la compilation.",
            en: "Rust is a compiled language born at Mozilla, stable since 2015. It aims at a rare promise: the performance of C and C++, without their memory bugs (dangling pointers, double frees, data races). It has no garbage collector: memory is released at a point known at compile time.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Le secret, c'est l'ownership : un ensemble de règles vérifiées par le compilateur (le fameux borrow checker) qui décident qui possède chaque valeur et qui a le droit de la lire ou de la modifier. Si ton code compile, toute une famille de bugs a déjà été éliminée.",
            en: "The secret is ownership: a set of rules checked by the compiler (the famous borrow checker) that decide who owns each value and who may read or modify it. If your code compiles, a whole family of bugs has already been ruled out.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Si tu viens de Java ou Kotlin : pense à Rust comme à un langage où le compilateur fait le travail du GC et de la revue de code concurrente. Les premières semaines, tu vas te battre avec lui. Ensuite, il devient ton meilleur relecteur.",
            en: "If you come from Java or Kotlin: think of Rust as a language where the compiler does the job of the GC and of a concurrency code review. For the first weeks you will fight it. After that, it becomes your best reviewer.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Où le trouve-t-on ? Dans les outils en ligne de commande (ripgrep, uv), les navigateurs (Firefox), le noyau Linux, l'infrastructure cloud (AWS Firecracker), la finance (moteurs de matching, calcul de risque) et partout où l'on veut aller vite sans crasher.",
            en: "Where do you find it? In command-line tools (ripgrep, uv), browsers (Firefox), the Linux kernel, cloud infrastructure (AWS Firecracker), finance (matching engines, risk computation) and anywhere people want speed without crashes.",
          },
        },
      ],
    },
    {
      id: "install-rust",
      slug: "install-rust",
      title: { fr: "Installer Rust", en: "Install Rust" },
      summary: {
        fr: "rustup, rustc et cargo : les trois outils à connaître.",
        en: "rustup, rustc and cargo: the three tools to know.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "On installe Rust avec `rustup`, le gestionnaire officiel de versions. Sur macOS ou Linux, une seule commande suffit. Sous Windows, télécharge l'installeur depuis rustup.rs.",
            en: "You install Rust with `rustup`, the official version manager. On macOS or Linux a single command is enough. On Windows, download the installer from rustup.rs.",
          },
        },
        {
          type: "code",
          code: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`,
          caption: {
            fr: "Installe la chaîne d'outils stable dans ~/.cargo et ~/.rustup.",
            en: "Installs the stable toolchain into ~/.cargo and ~/.rustup.",
          },
        },
        {
          type: "code",
          code: `rustc --version
cargo --version`,
          caption: {
            fr: "Vérifie l'installation : les deux commandes doivent afficher un numéro de version.",
            en: "Check the installation: both commands should print a version number.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Trois outils à retenir. `rustc` est le compilateur ; tu l'appelleras rarement directement. `cargo` est l'outil de build, le gestionnaire de dépendances et le lanceur de tests, l'équivalent de Maven ou Gradle. `rustup` met à jour le tout avec `rustup update`.",
            en: "Three tools to remember. `rustc` is the compiler; you will rarely call it directly. `cargo` is the build tool, dependency manager and test runner, the equivalent of Maven or Gradle. `rustup` keeps everything up to date with `rustup update`.",
          },
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Installe aussi rust-analyzer dans ton éditeur (VS Code, RustRover ou IntelliJ avec le plugin Rust). Il affiche les types déduits et les erreurs du compilateur pendant que tu tapes : indispensable pour apprendre.",
            en: "Also install rust-analyzer in your editor (VS Code, RustRover or IntelliJ with the Rust plugin). It shows inferred types and compiler errors as you type: essential while learning.",
          },
        },
      ],
    },
    {
      id: "first-cargo-project",
      slug: "first-cargo-project",
      title: { fr: "Premier projet avec Cargo", en: "First project with Cargo" },
      summary: {
        fr: "Créer, compiler, lancer et formater un projet.",
        en: "Create, build, run and format a project.",
      },
      sections: [
        {
          type: "code",
          code: `cargo new hello
cd hello
cargo run`,
          caption: {
            fr: "Crée un projet binaire, le compile puis l'exécute : il affiche « Hello, world! ».",
            en: "Creates a binary project, builds it, then runs it: it prints \"Hello, world!\".",
          },
        },
        {
          type: "text",
          text: {
            fr: "Cargo a généré deux fichiers. `Cargo.toml` décrit le projet (nom, version, édition de Rust, dépendances). `src/main.rs` contient le point d'entrée du programme : la fonction `main`.",
            en: "Cargo generated two files. `Cargo.toml` describes the project (name, version, Rust edition, dependencies). `src/main.rs` holds the program entry point: the `main` function.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let language = "Rust";
    let year = 2015;
    println!("Hello, {language}! Stable since {year}.");
}`,
          caption: {
            fr: "`println!` est une macro (le ! le signale). Les accolades insèrent une variable dans le texte.",
            en: "`println!` is a macro (the ! gives it away). Braces insert a variable into the text.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Les commandes du quotidien : `cargo check` vérifie que le code compile sans produire de binaire (très rapide), `cargo build --release` produit un binaire optimisé dans target/release, `cargo fmt` formate le code et `cargo clippy` propose des améliorations idiomatiques.",
            en: "Everyday commands: `cargo check` verifies the code compiles without producing a binary (very fast), `cargo build --release` produces an optimized binary in target/release, `cargo fmt` formats the code and `cargo clippy` suggests idiomatic improvements.",
          },
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "Pour mesurer des performances, compile toujours en `--release`. Le mode debug par défaut peut être 10 à 50 fois plus lent : c'est normal, il est fait pour déboguer.",
            en: "To measure performance, always build with `--release`. The default debug mode can be 10 to 50 times slower: that is expected, it is made for debugging.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Modifie ce programme pour qu'il affiche « Rust a 11 ans en 2026. » en calculant l'âge à partir des deux variables.",
          en: "Change this program so it prints \"Rust is 11 years old in 2026.\" by computing the age from the two variables.",
        },
        starterCode: `fn main() {
    let stable_since = 2015;
    let current_year = 2026;
    // calcule l'âge puis affiche la phrase
}`,
        solutionCode: `fn main() {
    let stable_since = 2015;
    let current_year = 2026;
    let age = current_year - stable_since;
    println!("Rust a {age} ans en {current_year}.");
}`,
        hint: {
          fr: "Déclare une nouvelle variable avec `let age = ...;` puis insère-la avec `{age}` dans `println!`.",
          en: "Declare a new variable with `let age = ...;` then insert it with `{age}` inside `println!`.",
        },
        explanation: {
          fr: "Le compilateur déduit le type `i32` pour les trois variables. Les accolades de `println!` acceptent directement un nom de variable depuis Rust 2021.",
          en: "The compiler infers the `i32` type for all three variables. Since Rust 2021, the braces in `println!` accept a variable name directly.",
        },
      },
    },
    {
      id: "project-kickoff",
      kind: "project",
      slug: "project-kickoff",
      title: { fr: "Fil rouge : lancer riskforge", en: "Project: kick off riskforge" },
      summary: {
        fr: "Le risque de contrepartie en cinq minutes, puis le squelette du projet.",
        en: "Counterparty risk in five minutes, then the project skeleton.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Le projet fil rouge s'appelle riskforge. Il répond à une question que se posent toutes les banques : si ma contrepartie fait défaut à une date future, combien puis-je perdre ? Pas besoin d'être expert en finance, on introduit chaque notion au moment où on la code.",
            en: "The running project is called riskforge. It answers a question every bank asks: if my counterparty defaults at some future date, how much could I lose? No finance expertise needed, each notion is introduced when we code it.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Le vocabulaire minimal. Le MtM (mark-to-market) est la valeur actuelle d'un contrat : positive, la contrepartie me doit de l'argent ; négative, c'est moi qui lui dois. L'exposition est la part que je perds en cas de défaut : max(MtM, 0). Comme le futur est incertain, on simule des milliers de scénarios de marché (Monte Carlo) et on résume leurs expositions.",
            en: "The minimal vocabulary. MtM (mark-to-market) is the current value of a contract: positive, the counterparty owes me money; negative, I owe them. Exposure is what I lose if they default: max(MtM, 0). Since the future is uncertain, we simulate thousands of market scenarios (Monte Carlo) and summarize their exposures.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Les indicateurs que riskforge calculera : l'EE (exposition attendue, la moyenne des expositions), la PFE (un quantile élevé, typiquement 97,5 %), l'EPE (la moyenne de l'EE dans le temps) et enfin la CVA, le prix de ce risque.",
            en: "The metrics riskforge will compute: EE (expected exposure, the average of exposures), PFE (a high quantile, typically 97.5%), EPE (the time average of EE) and finally CVA, the price of that risk.",
          },
        },
        {
          type: "code",
          label: "terminal",
          code: `cargo new riskforge
cd riskforge`,
          caption: {
            fr: "Crée le projet que tu feras grandir de module en module.",
            en: "Creates the project you will grow module after module.",
          },
        },
        {
          type: "code",
          label: "src/main.rs",
          code: `fn main() {
    let counterparty = "ACME Bank";
    let scenarios = 10_000;
    let horizon_years = 5;

    println!("riskforge");
    println!("Counterparty: {counterparty}");
    println!("Simulating {scenarios} scenarios over {horizon_years} years");
}`,
          caption: {
            fr: "Les underscores dans 10_000 rendent les grands nombres lisibles ; le compilateur les ignore.",
            en: "Underscores in 10_000 make large numbers readable; the compiler ignores them.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute un pas de temps mensuel : calcule le nombre de dates de la grille (12 par an sur l'horizon) et affiche « Time grid: 60 dates ».",
          en: "Add a monthly time step: compute the number of dates on the grid (12 per year over the horizon) and print \"Time grid: 60 dates\".",
        },
        starterCode: `fn main() {
    let scenarios = 10_000;
    let horizon_years = 5;
    println!("Simulating {scenarios} scenarios over {horizon_years} years");
    // ajoute la grille de temps ici
}`,
        solutionCode: `fn main() {
    let scenarios = 10_000;
    let horizon_years = 5;
    let steps_per_year = 12;
    let time_steps = horizon_years * steps_per_year;
    println!("Simulating {scenarios} scenarios over {horizon_years} years");
    println!("Time grid: {time_steps} dates");
}`,
        hint: {
          fr: "Une variable `steps_per_year` puis une multiplication suffisent.",
          en: "A `steps_per_year` variable and a multiplication are all you need.",
        },
        explanation: {
          fr: "Nommer la constante 12 plutôt que de l'écrire en dur rend le calcul lisible. Au module suivant, on verra `const` pour les valeurs vraiment fixes.",
          en: "Naming the constant 12 instead of hard-coding it keeps the computation readable. In the next module we will see `const` for truly fixed values.",
        },
      },
    },
  ],
};
