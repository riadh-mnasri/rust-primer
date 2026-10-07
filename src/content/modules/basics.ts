import type { Module } from "../types";

export const basics: Module = {
  id: "basics",
  slug: "basics",
  title: { fr: "Les bases du langage", en: "Language basics" },
  description: {
    fr: "Variables, types, fonctions et contrôle de flux : la grammaire de base de Rust.",
    en: "Variables, types, functions and control flow: the core grammar of Rust.",
  },
  status: "available",
  lessons: [
    {
      id: "variables",
      slug: "variables",
      title: { fr: "Variables et mutabilité", en: "Variables and mutability" },
      summary: {
        fr: "Immuable par défaut, mut quand il le faut, et le shadowing.",
        en: "Immutable by default, mut when needed, and shadowing.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "En Rust, une variable déclarée avec `let` est immuable par défaut. C'est l'inverse de Java, où il faut ajouter `final`. Pour pouvoir la modifier, on l'annonce explicitement avec `mut`.",
            en: "In Rust, a variable declared with `let` is immutable by default. That is the opposite of Java, where you have to add `final`. To be able to change it, you say so explicitly with `mut`.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let rate = 0.03;
    // rate = 0.04; // erreur : cannot assign twice to immutable variable

    let mut notional = 1_000_000.0;
    notional = notional * 2.0;
    println!("rate = {rate}, notional = {notional}");
}`,
        },
        {
          type: "text",
          text: {
            fr: "Le shadowing permet de redéclarer une variable du même nom avec `let`. La nouvelle variable masque l'ancienne, et peut même changer de type. C'est pratique pour transformer une valeur étape par étape sans inventer des noms comme `input2`.",
            en: "Shadowing lets you redeclare a variable with the same name using `let`. The new variable hides the old one, and can even change type. It is handy to transform a value step by step without inventing names like `input2`.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let spaces = "   ";
    let spaces = spaces.len(); // &str devient usize
    println!("{spaces} espaces");

    const DAYS_PER_YEAR: f64 = 365.0;
    println!("{DAYS_PER_YEAR}");
}`,
          caption: {
            fr: "`const` exige un type explicite et une valeur connue à la compilation. Convention : MAJUSCULES_AVEC_UNDERSCORES.",
            en: "`const` requires an explicit type and a value known at compile time. Convention: UPPER_SNAKE_CASE.",
          },
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Réflexe à prendre : commence toujours sans `mut`. Le compilateur te dira quand une variable doit vraiment changer, et il te préviendra aussi si tu as mis un `mut` inutile.",
            en: "A habit to build: always start without `mut`. The compiler will tell you when a variable really needs to change, and it also warns you about a useless `mut`.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ce code ne compile pas. Corrige-le en changeant le moins de choses possible.",
          en: "This code does not compile. Fix it by changing as little as possible.",
        },
        starterCode: `fn main() {
    let total = 0;
    total = total + 10;
    total = total + 5;
    println!("{total}");
}`,
        solutionCode: `fn main() {
    let mut total = 0;
    total = total + 10;
    total = total + 5;
    println!("{total}");
}`,
        hint: {
          fr: "Lis le message d'erreur : il propose lui-même la correction.",
          en: "Read the error message: it suggests the fix itself.",
        },
        explanation: {
          fr: "`total` est réaffectée, elle doit donc être déclarée `mut`. Les messages d'erreur de rustc sont parmi les meilleurs du marché : prends l'habitude de les lire en entier.",
          en: "`total` is reassigned, so it must be declared `mut`. rustc error messages are among the best around: get used to reading them in full.",
        },
      },
    },
    {
      id: "types",
      slug: "types",
      title: { fr: "Types de base", en: "Basic types" },
      summary: {
        fr: "Entiers, flottants, booléens, caractères, tuples et tableaux.",
        en: "Integers, floats, booleans, characters, tuples and arrays.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Rust est statiquement typé, mais le compilateur déduit la plupart des types. Les entiers ont une taille explicite : `i32` (signé, 32 bits, le défaut), `u64` (non signé), `usize` (taille d'un pointeur, utilisé pour les index). Les flottants sont `f64` (défaut) et `f32`.",
            en: "Rust is statically typed, but the compiler infers most types. Integers have an explicit size: `i32` (signed, 32 bits, the default), `u64` (unsigned), `usize` (pointer-sized, used for indexes). Floats are `f64` (default) and `f32`.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let count: u32 = 42;
    let price: f64 = 101.25;
    let is_call = true;
    let currency = '€'; // char : un caractère Unicode, entre apostrophes

    // Aucune conversion implicite : on convertit avec \`as\`.
    let total = price * count as f64;
    println!("{count} x {price} {currency} = {total} (call: {is_call})");
}`,
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "Pas de conversion implicite entre types numériques, même de `i32` vers `f64`. Ça paraît pénible au début, mais c'est exactement ce qui évite les arrondis silencieux dans un calcul financier.",
            en: "No implicit conversion between numeric types, not even from `i32` to `f64`. It feels tedious at first, but it is exactly what prevents silent rounding in a financial computation.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Deux types composés natifs. Le tuple regroupe des valeurs de types différents, on y accède par position. Le tableau contient un nombre fixe d'éléments du même type, connu à la compilation.",
            en: "Two native compound types. A tuple groups values of different types, accessed by position. An array holds a fixed number of elements of the same type, known at compile time.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let quote: (&str, f64) = ("EURUSD", 1.0842);
    let (pair, rate) = quote; // déstructuration
    println!("{pair} = {rate} (ou {})", quote.1);

    let tenors: [u32; 4] = [1, 2, 5, 10];
    println!("{} tenors, le plus long : {} ans", tenors.len(), tenors[3]);
}`,
          caption: {
            fr: "`[u32; 4]` se lit « tableau de 4 u32 ». Un accès hors limites provoque un panic, jamais une lecture mémoire au hasard.",
            en: "`[u32; 4]` reads \"array of 4 u32\". An out-of-bounds access triggers a panic, never a random memory read.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Calcule la moyenne des 5 prix du tableau et affiche-la. Attention aux types.",
          en: "Compute the average of the 5 prices in the array and print it. Mind the types.",
        },
        starterCode: `fn main() {
    let prices: [f64; 5] = [100.0, 102.5, 99.0, 101.0, 97.5];
    let sum = prices[0] + prices[1] + prices[2] + prices[3] + prices[4];
    // divise par le nombre d'éléments
}`,
        solutionCode: `fn main() {
    let prices: [f64; 5] = [100.0, 102.5, 99.0, 101.0, 97.5];
    let sum = prices[0] + prices[1] + prices[2] + prices[3] + prices[4];
    let average = sum / prices.len() as f64;
    println!("average = {average}");
}`,
        hint: {
          fr: "`prices.len()` renvoie un `usize`, qu'on ne peut pas diviser directement avec un `f64`.",
          en: "`prices.len()` returns a `usize`, which cannot be divided with an `f64` directly.",
        },
        explanation: {
          fr: "On convertit explicitement la longueur avec `as f64`. On verra bientôt une boucle `for` puis les itérateurs (`prices.iter().sum()`) pour éviter d'écrire chaque index.",
          en: "We convert the length explicitly with `as f64`. We will soon see a `for` loop and then iterators (`prices.iter().sum()`) to avoid writing every index.",
        },
      },
    },
    {
      id: "functions",
      slug: "functions",
      title: { fr: "Fonctions et expressions", en: "Functions and expressions" },
      summary: {
        fr: "Signatures typées, et pourquoi le dernier point-virgule compte.",
        en: "Typed signatures, and why the last semicolon matters.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une fonction se déclare avec `fn`. Les types des paramètres sont obligatoires, comme le type de retour après `->`. Pas d'inférence aux frontières des fonctions : la signature est un contrat lisible sans regarder le corps.",
            en: "A function is declared with `fn`. Parameter types are mandatory, and so is the return type after `->`. No inference at function boundaries: the signature is a contract you can read without looking at the body.",
          },
        },
        {
          type: "code",
          code: `fn discount_factor(rate: f64, years: f64) -> f64 {
    (-rate * years).exp()
}

fn main() {
    let df = discount_factor(0.03, 5.0);
    println!("DF(5 ans) = {df:.4}");
}`,
          caption: {
            fr: "`{df:.4}` affiche 4 décimales. Pas de `return` : la dernière expression est la valeur renvoyée.",
            en: "`{df:.4}` prints 4 decimals. No `return`: the last expression is the returned value.",
          },
        },
        {
          type: "text",
          text: {
            fr: "C'est le point clé : en Rust presque tout est une expression qui produit une valeur, y compris un bloc entre accolades. Ajouter un point-virgule transforme une expression en instruction, qui ne renvoie rien (le type unité `()`).",
            en: "This is the key point: in Rust almost everything is an expression that produces a value, including a block between braces. Adding a semicolon turns an expression into a statement, which returns nothing (the unit type `()`).",
          },
        },
        {
          type: "code",
          code: `fn square(x: f64) -> f64 {
    x * x; // erreur : mismatched types, expected f64, found ()
}`,
          caption: {
            fr: "L'erreur la plus fréquente des débutants. Le compilateur suggère de retirer le point-virgule.",
            en: "The most common beginner mistake. The compiler suggests removing the semicolon.",
          },
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "`return` existe toujours, mais on le réserve aux sorties anticipées (au milieu d'une fonction). En fin de fonction, l'expression nue est la forme idiomatique.",
            en: "`return` still exists, but it is kept for early exits (in the middle of a function). At the end of a function, the bare expression is the idiomatic form.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris la fonction `forward_value` qui renvoie la valeur d'un contrat à terme acheteur : (prix spot moins prix convenu) multiplié par la quantité.",
          en: "Write the `forward_value` function that returns the value of a long forward: (spot price minus agreed price) times quantity.",
        },
        starterCode: `fn forward_value(spot: f64, strike: f64, quantity: f64) -> f64 {
    todo!()
}

fn main() {
    println!("{}", forward_value(105.0, 100.0, 1_000.0)); // 5000
}`,
        solutionCode: `fn forward_value(spot: f64, strike: f64, quantity: f64) -> f64 {
    (spot - strike) * quantity
}

fn main() {
    println!("{}", forward_value(105.0, 100.0, 1_000.0)); // 5000
}`,
        hint: {
          fr: "Remplace `todo!()` par une expression unique, sans point-virgule final.",
          en: "Replace `todo!()` with a single expression, without a trailing semicolon.",
        },
        explanation: {
          fr: "`todo!()` est une macro qui compile mais panique à l'exécution : pratique pour esquisser une signature avant de l'implémenter.",
          en: "`todo!()` is a macro that compiles but panics at runtime: handy to sketch a signature before implementing it.",
        },
      },
    },
    {
      id: "control-flow",
      slug: "control-flow",
      title: { fr: "Contrôle de flux", en: "Control flow" },
      summary: {
        fr: "if comme expression, les trois boucles et un premier match.",
        en: "if as an expression, the three loops and a first match.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "`if` est une expression : il produit une valeur. Ça remplace l'opérateur ternaire, qui n'existe pas en Rust. Les deux branches doivent avoir le même type, et la condition doit être un vrai `bool` (pas de « valeur vraie » comme 0 ou 1).",
            en: "`if` is an expression: it produces a value. It replaces the ternary operator, which does not exist in Rust. Both branches must have the same type, and the condition must be an actual `bool` (no \"truthy\" values like 0 or 1).",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let mtm: f64 = -250.0;
    let side = if mtm >= 0.0 { "on nous doit" } else { "nous devons" };
    println!("{side} {}", mtm.abs());
}`,
        },
        {
          type: "text",
          text: {
            fr: "Trois boucles. `loop` tourne indéfiniment jusqu'à un `break` (qui peut renvoyer une valeur). `while` tourne tant qu'une condition est vraie. `for` parcourt une collection ou un intervalle : c'est de loin la plus utilisée.",
            en: "Three loops. `loop` runs forever until a `break` (which can return a value). `while` runs while a condition holds. `for` walks over a collection or a range: by far the most used.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    // 0..5 exclut 5, 0..=5 l'inclut
    for year in 1..=3 {
        println!("année {year}");
    }

    let mut capital = 100.0;
    let mut years = 0;
    while capital < 200.0 {
        capital *= 1.07;
        years += 1;
    }
    println!("doublé en {years} ans");

    let mut attempts = 0;
    let found = loop {
        attempts += 1;
        if attempts == 3 {
            break attempts * 10;
        }
    };
    println!("{found}");
}`,
        },
        {
          type: "text",
          text: {
            fr: "`match` compare une valeur à des motifs, dans l'ordre. Il doit être exhaustif : tous les cas possibles doivent être couverts, sinon le code ne compile pas. Le motif `_` attrape tout le reste.",
            en: "`match` compares a value against patterns, in order. It must be exhaustive: every possible case has to be covered, otherwise the code does not compile. The `_` pattern catches everything else.",
          },
        },
        {
          type: "code",
          code: `fn rating_bucket(score: u32) -> &'static str {
    match score {
        0 => "défaut",
        1..=3 => "spéculatif",
        4..=6 => "moyen",
        _ => "solide",
    }
}

fn main() {
    println!("{}", rating_bucket(5));
}`,
          caption: {
            fr: "On reverra `match` en profondeur avec les enums, où il devient l'outil central du langage.",
            en: "We will revisit `match` in depth with enums, where it becomes the central tool of the language.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Avec une boucle `for` sur le tableau, compte combien de scénarios ont un MtM strictement positif.",
          en: "Using a `for` loop over the array, count how many scenarios have a strictly positive MtM.",
        },
        starterCode: `fn main() {
    let mtms = [120.0, -40.0, 0.0, 75.5, -10.0, 300.0];
    let mut positive = 0;
    // boucle ici
    println!("{positive} scénarios positifs"); // 3
}`,
        solutionCode: `fn main() {
    let mtms = [120.0, -40.0, 0.0, 75.5, -10.0, 300.0];
    let mut positive = 0;
    for mtm in mtms {
        if mtm > 0.0 {
            positive += 1;
        }
    }
    println!("{positive} scénarios positifs"); // 3
}`,
        hint: {
          fr: "`for mtm in mtms` donne chaque élément tour à tour.",
          en: "`for mtm in mtms` gives you each element in turn.",
        },
        explanation: {
          fr: "La boucle `for` parcourt directement les valeurs, sans index. C'est plus sûr qu'un `for (i = 0; ...)` : aucun risque de sortir du tableau.",
          en: "The `for` loop walks the values directly, without an index. It is safer than a `for (i = 0; ...)`: no risk of running past the end of the array.",
        },
      },
    },
    {
      id: "project-positive-exposure",
      kind: "project",
      slug: "project-positive-exposure",
      title: { fr: "Fil rouge : exposition positive", en: "Project: positive exposure" },
      summary: {
        fr: "Première logique métier de riskforge : exposition et exposition attendue.",
        en: "First business logic in riskforge: exposure and expected exposure.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "On a toutes les briques pour une première version de riskforge. Pour chaque scénario simulé, le contrat a un MtM. L'exposition, c'est la partie positive de ce MtM : si la valeur est négative, un défaut de la contrepartie ne nous coûte rien.",
            en: "We have every building block for a first version of riskforge. For each simulated scenario, the contract has an MtM. Exposure is the positive part of that MtM: if the value is negative, a counterparty default costs us nothing.",
          },
        },
        {
          type: "code",
          label: "src/main.rs",
          code: `const SCENARIOS: usize = 5;

fn exposure(mtm: f64) -> f64 {
    if mtm > 0.0 { mtm } else { 0.0 }
}

fn main() {
    // MtM du contrat dans 5 scénarios de marché, à une date future
    let mtms: [f64; SCENARIOS] = [1_200.0, -300.0, 450.0, 0.0, -800.0];

    let mut total = 0.0;
    for mtm in mtms {
        total += exposure(mtm);
    }
    let expected_exposure = total / SCENARIOS as f64;

    println!("EE = {expected_exposure:.2}");
}`,
          caption: {
            fr: "EE = (1200 + 0 + 450 + 0 + 0) / 5 = 330. Les scénarios négatifs comptent pour zéro, mais ils comptent dans la moyenne.",
            en: "EE = (1200 + 0 + 450 + 0 + 0) / 5 = 330. Negative scenarios count as zero, but they still count in the average.",
          },
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "La version idiomatique de `exposure` est `mtm.max(0.0)`. On l'a écrite avec `if` pour pratiquer, remplace-la quand tu veux.",
            en: "The idiomatic version of `exposure` is `mtm.max(0.0)`. We wrote it with `if` for practice, swap it whenever you like.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Limite assumée : le tableau a une taille fixe et la logique vit dans `main`. Au module suivant, on passera les scénarios par référence à des fonctions dédiées, ce qui nous fera découvrir l'ownership.",
            en: "A deliberate limitation: the array has a fixed size and the logic lives in `main`. In the next module we will pass scenarios by reference to dedicated functions, which will introduce ownership.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute le calcul de l'exposition maximale (la plus forte exposition parmi les scénarios) et affiche-la à côté de l'EE.",
          en: "Add the maximum exposure (the highest exposure across scenarios) and print it next to EE.",
        },
        starterCode: `fn exposure(mtm: f64) -> f64 {
    mtm.max(0.0)
}

fn main() {
    let mtms = [1_200.0, -300.0, 450.0, 0.0, -800.0];
    let mut total = 0.0;
    for mtm in mtms {
        total += exposure(mtm);
    }
    println!("EE = {:.2}", total / mtms.len() as f64);
    // exposition maximale ici
}`,
        solutionCode: `fn exposure(mtm: f64) -> f64 {
    mtm.max(0.0)
}

fn main() {
    let mtms = [1_200.0, -300.0, 450.0, 0.0, -800.0];
    let mut total = 0.0;
    let mut max_exposure = 0.0;
    for mtm in mtms {
        let e = exposure(mtm);
        total += e;
        if e > max_exposure {
            max_exposure = e;
        }
    }
    println!("EE = {:.2}", total / mtms.len() as f64);
    println!("max = {max_exposure:.2}");
}`,
        hint: {
          fr: "Une deuxième variable `mut` initialisée à 0.0, mise à jour dans la même boucle.",
          en: "A second `mut` variable initialized to 0.0, updated in the same loop.",
        },
        explanation: {
          fr: "Une exposition n'est jamais négative, donc 0.0 est un point de départ correct. Calculer les deux indicateurs dans la même boucle évite de parcourir les scénarios deux fois : avec 10 000 scénarios, ça compte.",
          en: "Exposure is never negative, so 0.0 is a correct starting point. Computing both metrics in the same loop avoids walking the scenarios twice: with 10,000 scenarios, it matters.",
        },
      },
    },
  ],
};
