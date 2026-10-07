import type { Module } from "../types";

export const ownership: Module = {
  id: "ownership",
  slug: "ownership",
  title: { fr: "Ownership et emprunts", en: "Ownership and borrowing" },
  description: {
    fr: "Le concept qui rend Rust unique : qui possède une valeur, qui peut la lire, qui peut la modifier.",
    en: "The concept that makes Rust unique: who owns a value, who may read it, who may change it.",
  },
  status: "available",
  lessons: [
    {
      id: "ownership-rules",
      slug: "ownership-rules",
      title: { fr: "Les règles de l'ownership", en: "The ownership rules" },
      summary: {
        fr: "Un seul propriétaire, le move, et la libération automatique.",
        en: "A single owner, moves, and automatic cleanup.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Trois règles, et tout le reste en découle. Chaque valeur a un propriétaire (une variable). Il n'y a qu'un seul propriétaire à la fois. Quand le propriétaire sort de sa portée, la valeur est libérée.",
            en: "Three rules, and everything else follows. Each value has an owner (a variable). There is only one owner at a time. When the owner goes out of scope, the value is dropped.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let a = String::from("ACME Bank");
    let b = a; // la propriété passe de a à b : c'est un move

    // println!("{a}"); // erreur : borrow of moved value: \`a\`
    println!("{b}");
} // b sort de portée ici : la mémoire de la String est libérée`,
        },
        {
          type: "text",
          text: {
            fr: "Pourquoi un move et pas une copie ? Une `String` vit sur le tas (heap). Si `a` et `b` pointaient toutes les deux vers le même texte, la mémoire serait libérée deux fois en fin de portée. Rust l'interdit en invalidant `a`. En Java, le GC règle ce problème au prix de pauses ; ici, c'est réglé à la compilation.",
            en: "Why a move and not a copy? A `String` lives on the heap. If `a` and `b` both pointed to the same text, the memory would be freed twice at the end of the scope. Rust forbids it by invalidating `a`. In Java the GC solves this at the cost of pauses; here, it is settled at compile time.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let x = 42;
    let y = x; // i32 est Copy : x reste utilisable
    println!("{x} {y}");

    let s1 = String::from("EUR");
    let s2 = s1.clone(); // copie explicite du contenu
    println!("{s1} {s2}");
}`,
          caption: {
            fr: "Les petits types de taille fixe (entiers, flottants, bool, char) sont copiés. Pour le reste, la copie est explicite avec `.clone()`.",
            en: "Small fixed-size types (integers, floats, bool, char) are copied. For everything else, copying is explicit with `.clone()`.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Passer une valeur à une fonction obéit aux mêmes règles : la fonction devient propriétaire, et l'appelant ne peut plus s'en servir ensuite.",
            en: "Passing a value to a function follows the same rules: the function becomes the owner, and the caller can no longer use it afterwards.",
          },
        },
        {
          type: "code",
          code: `fn print_name(name: String) {
    println!("{name}");
} // name est libérée ici

fn main() {
    let counterparty = String::from("ACME Bank");
    print_name(counterparty);
    // print_name(counterparty); // erreur : use of moved value
}`,
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "Ne réponds pas à chaque erreur de move par un `.clone()`. Ça compile, mais ça copie des données pour rien. La bonne réponse est presque toujours l'emprunt, sujet de la leçon suivante.",
            en: "Do not answer every move error with `.clone()`. It compiles, but it copies data for nothing. The right answer is almost always borrowing, the topic of the next lesson.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ce programme ne compile pas. Corrige-le sans ajouter de `.clone()` : il suffit de réordonner deux lignes.",
          en: "This program does not compile. Fix it without adding `.clone()`: reordering two lines is enough.",
        },
        starterCode: `fn archive(report: String) {
    println!("archivé : {report}");
}

fn main() {
    let report = String::from("EE report");
    archive(report);
    println!("taille : {}", report.len());
}`,
        solutionCode: `fn archive(report: String) {
    println!("archivé : {report}");
}

fn main() {
    let report = String::from("EE report");
    println!("taille : {}", report.len());
    archive(report);
}`,
        hint: {
          fr: "Après l'appel à `archive`, la String a changé de propriétaire.",
          en: "After the call to `archive`, the String has a new owner.",
        },
        explanation: {
          fr: "On lit la longueur tant que `main` est encore propriétaire, puis on cède la valeur. Le compilateur raisonne sur l'ordre des instructions : un move n'invalide la variable qu'à partir de l'endroit où il a lieu.",
          en: "We read the length while `main` still owns the value, then hand it over. The compiler reasons about statement order: a move only invalidates the variable from the point where it happens.",
        },
      },
    },
    {
      id: "borrowing",
      slug: "borrowing",
      title: { fr: "Références et emprunts", en: "References and borrowing" },
      summary: {
        fr: "Prêter une valeur sans la céder : & et &mut.",
        en: "Lend a value without giving it away: & and &mut.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une référence permet d'accéder à une valeur sans en devenir propriétaire : on dit qu'on l'emprunte. `&x` crée une référence en lecture seule, `&mut x` une référence qui autorise la modification.",
            en: "A reference lets you access a value without owning it: we say we borrow it. `&x` creates a read-only reference, `&mut x` a reference that allows modification.",
          },
        },
        {
          type: "code",
          code: `fn name_length(name: &String) -> usize {
    name.len()
}

fn add_suffix(name: &mut String) {
    name.push_str(" (CCP)");
}

fn main() {
    let mut counterparty = String::from("LCH");
    let len = name_length(&counterparty); // emprunt en lecture
    add_suffix(&mut counterparty); // emprunt en écriture
    println!("{counterparty} ({len} caractères au départ)");
}`,
          caption: {
            fr: "`main` reste propriétaire du début à la fin. Les fonctions empruntent, puis rendent la main.",
            en: "`main` stays the owner from start to finish. Functions borrow, then give control back.",
          },
        },
        {
          type: "text",
          text: {
            fr: "La règle d'or du borrow checker : à un instant donné, tu peux avoir soit autant de références `&` que tu veux, soit une seule référence `&mut`, mais jamais les deux en même temps. Plusieurs lecteurs, ou un seul écrivain.",
            en: "The borrow checker's golden rule: at any given time, you can have either as many `&` references as you like, or a single `&mut` reference, but never both at once. Many readers, or one writer.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let mut rates = vec![0.01, 0.02];
    let first = &rates[0]; // emprunt en lecture
    // rates.push(0.03); // erreur : cannot borrow as mutable
    println!("{first}"); // dernier usage de first
    rates.push(0.03); // ok : l'emprunt en lecture est terminé
    println!("{rates:?}");
}`,
          caption: {
            fr: "Pourquoi l'interdire ? `push` peut réallouer le vecteur ailleurs en mémoire, et `first` pointerait alors dans le vide. En Java, c'est une ConcurrentModificationException à l'exécution ; ici, une erreur de compilation.",
            en: "Why forbid it? `push` may reallocate the vector elsewhere in memory, and `first` would then point to nothing. In Java this is a ConcurrentModificationException at runtime; here, a compile error.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Un emprunt dure jusqu'à la dernière utilisation de la référence, pas jusqu'à la fin du bloc. C'est pour ça que le second `push` est accepté.",
            en: "A borrow lasts until the last use of the reference, not until the end of the block. That is why the second `push` is accepted.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris `apply_shock` qui multiplie chaque taux du vecteur par (1 + shock), en modifiant le vecteur sur place.",
          en: "Write `apply_shock`, which multiplies every rate in the vector by (1 + shock), modifying the vector in place.",
        },
        starterCode: `fn apply_shock(/* paramètres */) {
    todo!()
}

fn main() {
    let mut rates = vec![0.010, 0.020, 0.030];
    apply_shock(&mut rates, 0.5);
    println!("{rates:?}"); // environ [0.015, 0.03, 0.045]
}`,
        solutionCode: `fn apply_shock(rates: &mut Vec<f64>, shock: f64) {
    for rate in rates.iter_mut() {
        *rate *= 1.0 + shock;
    }
}

fn main() {
    let mut rates = vec![0.010, 0.020, 0.030];
    apply_shock(&mut rates, 0.5);
    println!("{rates:?}"); // environ [0.015, 0.03, 0.045]
}`,
        hint: {
          fr: "`iter_mut()` donne une référence `&mut f64` sur chaque élément ; on modifie la valeur pointée avec `*rate`.",
          en: "`iter_mut()` yields a `&mut f64` to each element; you change the pointed value with `*rate`.",
        },
        explanation: {
          fr: "L'étoile déréférence : `*rate` désigne le f64 lui-même, pas la référence. Le vecteur n'est jamais copié, la fonction travaille directement sur les données de l'appelant.",
          en: "The star dereferences: `*rate` means the f64 itself, not the reference. The vector is never copied, the function works directly on the caller's data.",
        },
      },
    },
    {
      id: "slices",
      slug: "slices",
      title: { fr: "Les slices", en: "Slices" },
      summary: {
        fr: "&str et &[T] : des vues sur une partie d'une collection.",
        en: "&str and &[T]: views over part of a collection.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une slice est une référence vers une portion contiguë d'une collection : un pointeur et une longueur, sans copie. `&[f64]` est une vue sur des f64, `&str` une vue sur du texte.",
            en: "A slice is a reference to a contiguous portion of a collection: a pointer and a length, no copy. `&[f64]` is a view over f64 values, `&str` a view over text.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let curve = vec![0.010, 0.015, 0.021, 0.026, 0.030];
    let short_end: &[f64] = &curve[..2]; // indices 0 et 1
    let long_end = &curve[3..]; // de 3 à la fin
    println!("{short_end:?} {long_end:?}");

    let isin = String::from("FR0000131104");
    let country: &str = &isin[..2];
    println!("pays : {country}");
}`,
        },
        {
          type: "text",
          text: {
            fr: "L'intérêt principal : écrire des fonctions qui acceptent le type le plus général. Une fonction qui prend `&[f64]` accepte un tableau, un `Vec`, ou un morceau de l'un ou de l'autre. Une fonction qui prend `&str` accepte une `String` comme un littéral.",
            en: "The main benefit: writing functions that accept the most general type. A function taking `&[f64]` accepts an array, a `Vec`, or a piece of either. A function taking `&str` accepts a `String` as well as a literal.",
          },
        },
        {
          type: "code",
          code: `fn total(values: &[f64]) -> f64 {
    let mut sum = 0.0;
    for v in values {
        sum += v;
    }
    sum
}

fn main() {
    let fixed = [1.0, 2.0, 3.0];
    let dynamic = vec![4.0, 5.0, 6.0, 7.0];
    println!("{} {} {}", total(&fixed), total(&dynamic), total(&dynamic[1..3]));
}`,
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Règle pratique pour les paramètres : préfère `&str` à `&String` et `&[T]` à `&Vec<T>`. Clippy te le rappellera d'ailleurs.",
            en: "Rule of thumb for parameters: prefer `&str` over `&String` and `&[T]` over `&Vec<T>`. Clippy will remind you anyway.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris `average` qui prend une slice de f64 et renvoie sa moyenne, puis appelle-la sur les 3 derniers éléments du vecteur.",
          en: "Write `average`, which takes a slice of f64 and returns its mean, then call it on the last 3 elements of the vector.",
        },
        starterCode: `fn average(/* ? */) -> f64 {
    todo!()
}

fn main() {
    let prices = vec![100.0, 101.0, 99.0, 102.0, 104.0, 103.0];
    // moyenne des 3 derniers : 103
}`,
        solutionCode: `fn average(values: &[f64]) -> f64 {
    let mut sum = 0.0;
    for v in values {
        sum += v;
    }
    sum / values.len() as f64
}

fn main() {
    let prices = vec![100.0, 101.0, 99.0, 102.0, 104.0, 103.0];
    let last_three = &prices[prices.len() - 3..];
    println!("{}", average(last_three)); // 103
}`,
        hint: {
          fr: "La plage `[len - 3..]` va de l'antépénultième élément jusqu'à la fin.",
          en: "The range `[len - 3..]` goes from the third-to-last element to the end.",
        },
        explanation: {
          fr: "Aucune donnée n'est copiée : `last_three` n'est qu'un pointeur et une longueur. Attention, une slice vide donnerait 0 / 0 = NaN ; on traitera ce cas proprement avec `Option` au module sur les erreurs.",
          en: "No data is copied: `last_three` is just a pointer and a length. Beware, an empty slice would give 0 / 0 = NaN; we will handle that case properly with `Option` in the error-handling module.",
        },
      },
    },
    {
      id: "project-borrowed-scenarios",
      kind: "project",
      slug: "project-borrowed-scenarios",
      title: { fr: "Fil rouge : agréger sans copier", en: "Project: aggregate without copying" },
      summary: {
        fr: "riskforge passe aux slices : des fonctions réutilisables, zéro copie.",
        en: "riskforge moves to slices: reusable functions, zero copies.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Dans la vraie vie, les scénarios ne sont pas 5 mais 10 000, et ils arrivent dans un `Vec` construit à l'exécution. On sort donc la logique de `main` dans des fonctions qui empruntent les scénarios : aucune copie, quelle que soit leur taille.",
            en: "In real life there are not 5 scenarios but 10,000, and they come in a `Vec` built at runtime. So we move the logic out of `main` into functions that borrow the scenarios: no copy, whatever their size.",
          },
        },
        {
          type: "code",
          label: "src/main.rs",
          code: `fn exposure(mtm: f64) -> f64 {
    mtm.max(0.0)
}

/// Exposition attendue : moyenne des expositions sur tous les scénarios.
fn expected_exposure(mtms: &[f64]) -> f64 {
    let mut total = 0.0;
    for &mtm in mtms {
        total += exposure(mtm);
    }
    total / mtms.len() as f64
}

/// Choc de marché appliqué sur place : chaque MtM bouge du même montant.
fn shift(mtms: &mut [f64], amount: f64) {
    for mtm in mtms.iter_mut() {
        *mtm += amount;
    }
}

fn main() {
    let mut mtms = vec![1_200.0, -300.0, 450.0, 0.0, -800.0];
    println!("EE = {:.2}", expected_exposure(&mtms));

    shift(&mut mtms, 200.0);
    println!("EE après choc = {:.2}", expected_exposure(&mtms));
}`,
          caption: {
            fr: "`for &mtm in mtms` déstructure chaque `&f64` en `f64` : possible parce que f64 est Copy.",
            en: "`for &mtm in mtms` destructures each `&f64` into an `f64`: possible because f64 is Copy.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Les signatures racontent l'histoire : `expected_exposure` ne fait que lire (`&[f64]`), `shift` modifie (`&mut [f64]`). En lisant uniquement les signatures, un relecteur sait déjà quelles fonctions peuvent toucher aux données. C'est l'un des grands bénéfices de Rust sur un gros moteur de calcul.",
            en: "The signatures tell the story: `expected_exposure` only reads (`&[f64]`), `shift` modifies (`&mut [f64]`). Just by reading the signatures, a reviewer already knows which functions may touch the data. That is one of Rust's big wins on a large computation engine.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Prochaine étape du fil rouge : remplacer ces f64 nus par un vrai modèle métier (Trade, NettingSet) avec des structs et des enums.",
            en: "Next step of the project: replace these bare f64 values with a real domain model (Trade, NettingSet) using structs and enums.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute `exposure_profile` qui prend les MtM de plusieurs dates (une slice de vecteurs) et renvoie un `Vec<f64>` avec l'EE de chaque date.",
          en: "Add `exposure_profile`, which takes the MtMs of several dates (a slice of vectors) and returns a `Vec<f64>` with the EE of each date.",
        },
        starterCode: `fn expected_exposure(mtms: &[f64]) -> f64 {
    let mut total = 0.0;
    for &mtm in mtms {
        total += mtm.max(0.0);
    }
    total / mtms.len() as f64
}

fn exposure_profile(dates: &[Vec<f64>]) -> Vec<f64> {
    todo!()
}

fn main() {
    let dates = vec![
        vec![100.0, -50.0, 20.0],  // 1 an
        vec![150.0, -80.0, 60.0],  // 2 ans
        vec![90.0, 10.0, -200.0],  // 3 ans
    ];
    println!("{:?}", exposure_profile(&dates));
}`,
        solutionCode: `fn expected_exposure(mtms: &[f64]) -> f64 {
    let mut total = 0.0;
    for &mtm in mtms {
        total += mtm.max(0.0);
    }
    total / mtms.len() as f64
}

fn exposure_profile(dates: &[Vec<f64>]) -> Vec<f64> {
    let mut profile = Vec::new();
    for scenarios in dates {
        profile.push(expected_exposure(scenarios));
    }
    profile
}

fn main() {
    let dates = vec![
        vec![100.0, -50.0, 20.0],  // 1 an
        vec![150.0, -80.0, 60.0],  // 2 ans
        vec![90.0, 10.0, -200.0],  // 3 ans
    ];
    println!("{:?}", exposure_profile(&dates));
}`,
        hint: {
          fr: "Parcourir `dates` donne des `&Vec<f64>`, que Rust convertit automatiquement en `&[f64]` à l'appel.",
          en: "Iterating over `dates` yields `&Vec<f64>`, which Rust automatically converts into `&[f64]` at the call site.",
        },
        explanation: {
          fr: "Le profil d'exposition (EE à chaque date) est exactement ce que trace un risk manager. La conversion automatique de `&Vec<f64>` en `&[f64]` s'appelle la deref coercion : on la détaillera avec les smart pointers.",
          en: "The exposure profile (EE at each date) is exactly what a risk manager plots. The automatic conversion from `&Vec<f64>` to `&[f64]` is called deref coercion: we will detail it with smart pointers.",
        },
      },
    },
  ],
};
