import type { Module } from "../types";

export const traitsGenerics: Module = {
  id: "traits-generics",
  slug: "traits-generics",
  title: { fr: "Traits et génériques", en: "Traits and generics" },
  description: {
    fr: "Le polymorphisme à la Rust : des comportements partagés, sans coût à l'exécution.",
    en: "Polymorphism the Rust way: shared behavior, with zero runtime cost.",
  },
  status: "available",
  lessons: [
    {
      id: "traits",
      slug: "traits",
      title: { fr: "Définir et implémenter un trait", en: "Defining and implementing a trait" },
      summary: {
        fr: "Un contrat de comportement, implémenté type par type.",
        en: "A behavior contract, implemented type by type.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Un trait décrit un comportement : une liste de méthodes qu'un type s'engage à fournir. C'est proche d'une interface Java ou Kotlin, à une différence près : on peut implémenter un trait pour un type après coup, dans un bloc `impl Trait for Type` séparé de la déclaration du type.",
            en: "A trait describes behavior: a list of methods a type commits to provide. It is close to a Java or Kotlin interface, with one difference: you can implement a trait for a type after the fact, in an `impl Trait for Type` block separate from the type declaration.",
          },
        },
        {
          type: "code",
          code: `trait Priced {
    fn price(&self, spot: f64) -> f64;

    // Méthode par défaut : les types peuvent la garder ou la redéfinir.
    fn describe(&self) -> String {
        String::from("instrument")
    }
}

struct Forward {
    strike: f64,
}

struct Call {
    strike: f64,
}

impl Priced for Forward {
    fn price(&self, spot: f64) -> f64 {
        spot - self.strike
    }
}

impl Priced for Call {
    fn price(&self, spot: f64) -> f64 {
        (spot - self.strike).max(0.0)
    }
    fn describe(&self) -> String {
        format!("call {}", self.strike)
    }
}

fn main() {
    let forward = Forward { strike: 100.0 };
    let call = Call { strike: 105.0 };
    println!("{} : {}", forward.describe(), forward.price(110.0));
    println!("{} : {}", call.describe(), call.price(110.0));
}`,
        },
        {
          type: "text",
          text: {
            fr: "On peut aussi implémenter ses propres traits pour des types qu'on n'a pas écrits, comme `f64` ou `Vec<T>`. La seule limite, la règle d'orphelin : le trait ou le type doit venir de ton crate. Tu ne peux pas implémenter `Display` (de la bibliothèque standard) pour `Vec` (de la bibliothèque standard).",
            en: "You can also implement your own traits for types you did not write, like `f64` or `Vec<T>`. The only limit, the orphan rule: either the trait or the type must come from your crate. You cannot implement `Display` (from the standard library) for `Vec` (from the standard library).",
          },
        },
        {
          type: "code",
          code: `trait Percent {
    fn as_percent(&self) -> String;
}

impl Percent for f64 {
    fn as_percent(&self) -> String {
        format!("{:.2} %", self * 100.0)
    }
}

fn main() {
    println!("{}", 0.0315.as_percent()); // 3.15 %
}`,
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Pas d'héritage de classes en Rust. Le partage de comportement passe par les traits (et leurs méthodes par défaut), le partage de données par la composition : une struct qui en contient une autre.",
            en: "No class inheritance in Rust. Behavior is shared through traits (and their default methods), data through composition: a struct that contains another.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute une struct `Put { strike: f64 }` qui implémente `Priced` : son prix vaut max(strike - spot, 0) et sa description \"put <strike>\".",
          en: "Add a `Put { strike: f64 }` struct implementing `Priced`: its price is max(strike - spot, 0) and its description \"put <strike>\".",
        },
        starterCode: `trait Priced {
    fn price(&self, spot: f64) -> f64;
    fn describe(&self) -> String {
        String::from("instrument")
    }
}

// ajoute Put et son impl ici

fn main() {
    let put = Put { strike: 100.0 };
    println!("{} : {}", put.describe(), put.price(92.0)); // put 100 : 8
}`,
        solutionCode: `trait Priced {
    fn price(&self, spot: f64) -> f64;
    fn describe(&self) -> String {
        String::from("instrument")
    }
}

struct Put {
    strike: f64,
}

impl Priced for Put {
    fn price(&self, spot: f64) -> f64 {
        (self.strike - spot).max(0.0)
    }
    fn describe(&self) -> String {
        format!("put {}", self.strike)
    }
}

fn main() {
    let put = Put { strike: 100.0 };
    println!("{} : {}", put.describe(), put.price(92.0)); // put 100 : 8
}`,
        hint: {
          fr: "Seule `price` est obligatoire ; redéfinis `describe` pour remplacer le texte par défaut.",
          en: "Only `price` is required; override `describe` to replace the default text.",
        },
        explanation: {
          fr: "Si tu oublies `price`, l'erreur est explicite : not all trait items implemented, missing: `price`. Le trait est un contrat vérifié à la compilation.",
          en: "If you forget `price`, the error is explicit: not all trait items implemented, missing: `price`. The trait is a contract checked at compile time.",
        },
      },
    },
    {
      id: "standard-traits",
      slug: "standard-traits",
      title: { fr: "Les traits de la bibliothèque standard", en: "Standard library traits" },
      summary: {
        fr: "derive, Display, From : les traits que tout le monde attend.",
        en: "derive, Display, From: the traits everyone expects.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Tu utilises des traits depuis le début sans le savoir. `#[derive(Debug, Clone, PartialEq)]` génère automatiquement l'implémentation de ces traits. Les plus courants : `Debug` (affichage `{:?}`), `Clone` (`.clone()`), `Copy` (copie implicite, pour les petits types), `PartialEq` (`==`), `Default` (valeur par défaut).",
            en: "You have been using traits from the start without knowing it. `#[derive(Debug, Clone, PartialEq)]` automatically generates the implementation of those traits. The most common: `Debug` (`{:?}` output), `Clone` (`.clone()`), `Copy` (implicit copy, for small types), `PartialEq` (`==`), `Default` (default value).",
          },
        },
        {
          type: "code",
          code: `#[derive(Debug, Clone, Copy, PartialEq, Default)]
struct Point {
    time: f64,
    value: f64,
}

fn main() {
    let origin = Point::default(); // { time: 0.0, value: 0.0 }
    let p = Point { time: 1.0, value: 101.5 };
    let q = p; // Copy : p reste utilisable
    println!("{origin:?} {}", p == q);
}`,
        },
        {
          type: "text",
          text: {
            fr: "`Display` ne se dérive pas : c'est l'affichage destiné aux humains, à toi de décider du format. On l'a déjà implémenté pour nos erreurs. `From` définit une conversion d'un type vers un autre ; l'implémenter donne gratuitement `into()` dans l'autre sens, et permet à `?` de convertir les erreurs automatiquement.",
            en: "`Display` cannot be derived: it is the human-facing output, and the format is yours to choose. We already implemented it for our errors. `From` defines a conversion from one type to another; implementing it gives you `into()` for free in the other direction, and lets `?` convert errors automatically.",
          },
        },
        {
          type: "code",
          code: `use std::fmt;

struct Money {
    cents: i64,
}

impl fmt::Display for Money {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}.{:02} EUR", self.cents / 100, self.cents % 100)
    }
}

impl From<f64> for Money {
    fn from(amount: f64) -> Self {
        Money { cents: (amount * 100.0).round() as i64 }
    }
}

fn main() {
    let a = Money::from(1234.5);
    let b: Money = 99.999.into(); // into() vient gratuitement de From
    println!("{a} / {b}"); // 1234.50 EUR / 100.00 EUR
}`,
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Réflexe utile : dérive `Debug` sur tous tes types publics, et `Clone`, `PartialEq` dès que c'est possible. Les tests en ont besoin pour `assert_eq!`, et les utilisateurs de ta bibliothèque aussi.",
            en: "A useful habit: derive `Debug` on all your public types, and `Clone`, `PartialEq` whenever possible. Tests need them for `assert_eq!`, and so do the users of your library.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Implémente `Display` pour `Rate` afin que `0.0315` s'affiche « 3.15 % », et `From<f64>` pour pouvoir écrire `let r: Rate = 0.0315.into();`.",
          en: "Implement `Display` for `Rate` so that `0.0315` prints as \"3.15 %\", and `From<f64>` so you can write `let r: Rate = 0.0315.into();`.",
        },
        starterCode: `use std::fmt;

struct Rate(f64);

// implémente Display et From<f64> ici

fn main() {
    let r: Rate = 0.0315.into();
    println!("{r}"); // 3.15 %
}`,
        solutionCode: `use std::fmt;

struct Rate(f64);

impl fmt::Display for Rate {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:.2} %", self.0 * 100.0)
    }
}

impl From<f64> for Rate {
    fn from(value: f64) -> Self {
        Rate(value)
    }
}

fn main() {
    let r: Rate = 0.0315.into();
    println!("{r}"); // 3.15 %
}`,
        hint: {
          fr: "Dans `fmt`, utilise `write!(f, ...)` exactement comme `println!`. `From` n'a qu'une fonction : `fn from(value: f64) -> Self`.",
          en: "Inside `fmt`, use `write!(f, ...)` exactly like `println!`. `From` has a single function: `fn from(value: f64) -> Self`.",
        },
        explanation: {
          fr: "On implémente `From`, jamais `Into` directement : la bibliothèque standard fournit `Into` automatiquement pour tout type qui a un `From`.",
          en: "You implement `From`, never `Into` directly: the standard library provides `Into` automatically for every type that has a `From`.",
        },
      },
    },
    {
      id: "generics",
      slug: "generics",
      title: { fr: "Les génériques", en: "Generics" },
      summary: {
        fr: "Écrire une fonction une fois, pour tous les types qui respectent un trait.",
        en: "Write a function once, for every type that satisfies a trait.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une fonction générique prend un paramètre de type, noté entre chevrons. Seule, elle ne peut presque rien faire de ce type inconnu. On ajoute donc des bornes de trait : `T: Priced` signifie « n'importe quel type, pourvu qu'il implémente Priced ». Le compilateur vérifie alors chaque appel.",
            en: "A generic function takes a type parameter, written between angle brackets. On its own it can do almost nothing with that unknown type. So you add trait bounds: `T: Priced` means \"any type, as long as it implements Priced\". The compiler then checks every call.",
          },
        },
        {
          type: "code",
          code: `trait Priced {
    fn price(&self, spot: f64) -> f64;
}

struct Forward {
    strike: f64,
}

impl Priced for Forward {
    fn price(&self, spot: f64) -> f64 {
        spot - self.strike
    }
}

// Générique : fonctionne pour tout T qui implémente Priced.
fn price_ladder<T: Priced>(instrument: &T, spots: &[f64]) -> Vec<f64> {
    let mut prices = Vec::new();
    for &spot in spots {
        prices.push(instrument.price(spot));
    }
    prices
}

// Même chose, syntaxe raccourcie avec impl Trait.
fn mid_price(instrument: &impl Priced, low: f64, high: f64) -> f64 {
    (instrument.price(low) + instrument.price(high)) / 2.0
}

fn main() {
    let forward = Forward { strike: 100.0 };
    println!("{:?}", price_ladder(&forward, &[90.0, 100.0, 110.0]));
    println!("{}", mid_price(&forward, 95.0, 115.0));
}`,
        },
        {
          type: "text",
          text: {
            fr: "Les structs peuvent aussi être génériques, et plusieurs bornes se combinent avec `+`. Quand la signature devient longue, la clause `where` déplace les bornes après les paramètres pour garder la lisibilité.",
            en: "Structs can be generic too, and several bounds combine with `+`. When the signature gets long, the `where` clause moves the bounds after the parameters to keep it readable.",
          },
        },
        {
          type: "code",
          code: `use std::fmt::Debug;

#[derive(Debug)]
struct Labeled<T> {
    label: String,
    value: T,
}

fn report<T>(items: &[Labeled<T>])
where
    T: Debug + PartialOrd,
{
    for item in items {
        println!("{} = {:?}", item.label, item.value);
    }
}

fn main() {
    let rates = vec![
        Labeled { label: String::from("1Y"), value: 0.031 },
        Labeled { label: String::from("5Y"), value: 0.028 },
    ];
    report(&rates);
}`,
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Les génériques ne coûtent rien à l'exécution. Le compilateur génère une copie spécialisée de la fonction pour chaque type réellement utilisé (la monomorphisation) : c'est aussi rapide que si tu avais écrit chaque version à la main.",
            en: "Generics cost nothing at runtime. The compiler generates a specialized copy of the function for each type actually used (monomorphization): it is as fast as if you had written each version by hand.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris une fonction générique `largest` qui renvoie le plus grand élément d'une slice non vide, pour tout type `T: PartialOrd + Copy`.",
          en: "Write a generic `largest` function that returns the largest element of a non-empty slice, for any type `T: PartialOrd + Copy`.",
        },
        starterCode: `fn largest(/* ? */) /* -> ? */ {
    todo!()
}

fn main() {
    println!("{}", largest(&[3, 17, 5])); // 17
    println!("{}", largest(&[0.031, 0.045, 0.028])); // 0.045
}`,
        solutionCode: `fn largest<T: PartialOrd + Copy>(values: &[T]) -> T {
    let mut max = values[0];
    for &value in values {
        if value > max {
            max = value;
        }
    }
    max
}

fn main() {
    println!("{}", largest(&[3, 17, 5])); // 17
    println!("{}", largest(&[0.031, 0.045, 0.028])); // 0.045
}`,
        hint: {
          fr: "`PartialOrd` autorise `>`, `Copy` permet de sortir les valeurs de la slice avec `for &value in values`.",
          en: "`PartialOrd` allows `>`, `Copy` lets you take values out of the slice with `for &value in values`.",
        },
        explanation: {
          fr: "La même fonction sert pour des `i32` et des `f64`. `PartialOrd` suffit (pas besoin de `Ord`), ce qui accepte les flottants. Une slice vide paniquerait sur `values[0]` : une version robuste renverrait `Option<T>`.",
          en: "The same function serves `i32` and `f64` values. `PartialOrd` is enough (no need for `Ord`), which accepts floats. An empty slice would panic on `values[0]`: a robust version would return `Option<T>`.",
        },
      },
    },
    {
      id: "trait-objects",
      slug: "trait-objects",
      title: { fr: "Trait objects et dyn", en: "Trait objects and dyn" },
      summary: {
        fr: "Mélanger des types différents dans une même collection.",
        en: "Mix different types in the same collection.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Les génériques fixent le type à la compilation : un `Vec<T>` ne contient qu'un seul type `T`. Pour une liste qui mélange des forwards et des calls, on utilise un trait object : `Box<dyn Priced>`. Le `dyn` signale que la méthode à appeler sera choisie à l'exécution, via une table de méthodes (le dispatch dynamique).",
            en: "Generics fix the type at compile time: a `Vec<T>` holds a single type `T`. For a list that mixes forwards and calls, you use a trait object: `Box<dyn Priced>`. The `dyn` signals that the method to call will be picked at runtime, through a method table (dynamic dispatch).",
          },
        },
        {
          type: "code",
          code: `trait Priced {
    fn price(&self, spot: f64) -> f64;
}

struct Forward {
    strike: f64,
}
struct Call {
    strike: f64,
}

impl Priced for Forward {
    fn price(&self, spot: f64) -> f64 {
        spot - self.strike
    }
}
impl Priced for Call {
    fn price(&self, spot: f64) -> f64 {
        (spot - self.strike).max(0.0)
    }
}

fn main() {
    let book: Vec<Box<dyn Priced>> = vec![
        Box::new(Forward { strike: 100.0 }),
        Box::new(Call { strike: 105.0 }),
        Box::new(Call { strike: 115.0 }),
    ];
    let mut total = 0.0;
    for instrument in &book {
        total += instrument.price(110.0);
    }
    println!("valeur du book : {total}"); // 10 + 5 + 0 = 15
}`,
          caption: {
            fr: "`Box` place la valeur sur le tas : nécessaire car un Forward et un Call n'ont pas forcément la même taille en mémoire. On reviendra sur Box avec les smart pointers.",
            en: "`Box` puts the value on the heap: needed because a Forward and a Call do not necessarily have the same size in memory. We will come back to Box with smart pointers.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Génériques ou `dyn` ? Les génériques sont plus rapides (appel direct, inlining possible) mais un seul type à la fois. `dyn` accepte des types mélangés au prix d'une indirection par appel. Dans un moteur de calcul, on garde les génériques dans les boucles chaudes et `dyn` pour la configuration (choisir un modèle au démarrage).",
            en: "Generics or `dyn`? Generics are faster (direct call, inlining possible) but one type at a time. `dyn` accepts mixed types at the cost of one indirection per call. In a computation engine, keep generics in hot loops and `dyn` for configuration (picking a model at startup).",
          },
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "Une fonction générique `fn f<T: Priced>(x: &T)` refuse par défaut un `&dyn Priced`, car `T` doit avoir une taille connue. On lève cette restriction avec `T: Priced + ?Sized` : le `?Sized` signifie « la taille peut être inconnue ». Tu le croiseras dans riskforge.",
            en: "A generic function `fn f<T: Priced>(x: &T)` refuses a `&dyn Priced` by default, because `T` must have a known size. You lift that restriction with `T: Priced + ?Sized`: the `?Sized` means \"the size may be unknown\". You will run into it in riskforge.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris `book_value(book: &[Box<dyn Priced>], spot: f64) -> f64` qui additionne les prix de tous les instruments du book.",
          en: "Write `book_value(book: &[Box<dyn Priced>], spot: f64) -> f64`, which sums the prices of every instrument in the book.",
        },
        starterCode: `trait Priced {
    fn price(&self, spot: f64) -> f64;
}

struct Forward {
    strike: f64,
}

impl Priced for Forward {
    fn price(&self, spot: f64) -> f64 {
        spot - self.strike
    }
}

fn book_value(book: &[Box<dyn Priced>], spot: f64) -> f64 {
    todo!()
}

fn main() {
    let book: Vec<Box<dyn Priced>> = vec![
        Box::new(Forward { strike: 100.0 }),
        Box::new(Forward { strike: 120.0 }),
    ];
    println!("{}", book_value(&book, 110.0)); // 0
}`,
        solutionCode: `trait Priced {
    fn price(&self, spot: f64) -> f64;
}

struct Forward {
    strike: f64,
}

impl Priced for Forward {
    fn price(&self, spot: f64) -> f64 {
        spot - self.strike
    }
}

fn book_value(book: &[Box<dyn Priced>], spot: f64) -> f64 {
    let mut total = 0.0;
    for instrument in book {
        total += instrument.price(spot);
    }
    total
}

fn main() {
    let book: Vec<Box<dyn Priced>> = vec![
        Box::new(Forward { strike: 100.0 }),
        Box::new(Forward { strike: 120.0 }),
    ];
    println!("{}", book_value(&book, 110.0)); // 0
}`,
        hint: {
          fr: "On appelle `price` sur un `Box<dyn Priced>` exactement comme sur la valeur elle-même.",
          en: "You call `price` on a `Box<dyn Priced>` exactly as on the value itself.",
        },
        explanation: {
          fr: "La fonction prend `&[Box<dyn Priced>]` plutôt que `&Vec<...>`, toujours la même règle : accepter la slice, plus générale. +10 et -10 se compensent : le book vaut 0 à 110.",
          en: "The function takes `&[Box<dyn Priced>]` rather than `&Vec<...>`, the same rule as always: accept the slice, which is more general. +10 and -10 cancel out: the book is worth 0 at 110.",
        },
      },
    },
    {
      id: "project-diffusion-models",
      kind: "project",
      slug: "project-diffusion-models",
      title: { fr: "Fil rouge : les modèles de diffusion", en: "Project: diffusion models" },
      summary: {
        fr: "Un trait DiffusionModel, deux modèles, et la première simulation Monte Carlo.",
        en: "A DiffusionModel trait, two models, and the first Monte Carlo simulation.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Jusqu'ici, riskforge évaluait le portefeuille pour un seul prix spot. Le cœur d'un moteur de risque, c'est de simuler des milliers de trajectoires futures de ce prix, puis de mesurer l'exposition sur chacune. La façon dont le prix évolue s'appelle un modèle de diffusion, et il en existe beaucoup : c'est le cas d'école pour un trait.",
            en: "So far riskforge valued the portfolio for a single spot price. The heart of a risk engine is to simulate thousands of future paths of that price, then measure exposure on each one. The way the price evolves is called a diffusion model, and there are many of them: a textbook case for a trait.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Deux modèles pour commencer. Le mouvement brownien géométrique (GBM), classique pour les actions : le prix évolue par variations relatives, avec une tendance (drift) et une volatilité. Le processus d'Ornstein-Uhlenbeck, qui revient vers un niveau moyen, adapté aux matières premières et proche du modèle de Hull-White utilisé pour les taux.",
            en: "Two models to start with. Geometric Brownian motion (GBM), the classic for equities: the price moves by relative changes, with a trend (drift) and a volatility. The Ornstein-Uhlenbeck process, which reverts toward a mean level, suited to commodities and close to the Hull-White model used for rates.",
          },
        },
        {
          type: "code",
          label: "src/diffusion.rs",
          code: `pub trait DiffusionModel {
    /// Valeur après un pas de temps dt (en années), à partir d'un tirage normal z.
    fn step(&self, current: f64, dt: f64, z: f64) -> f64;

    fn name(&self) -> String {
        String::from("model")
    }
}

pub struct Gbm {
    pub drift: f64,
    pub volatility: f64,
}

impl DiffusionModel for Gbm {
    fn step(&self, current: f64, dt: f64, z: f64) -> f64 {
        let sigma = self.volatility;
        current * ((self.drift - 0.5 * sigma * sigma) * dt + sigma * dt.sqrt() * z).exp()
    }

    fn name(&self) -> String {
        format!("GBM(mu={}, sigma={})", self.drift, self.volatility)
    }
}

/// Générateur minimal pour l'exemple (riskforge fournit le sien dans src/rng.rs).
struct Lcg(u64);

impl Lcg {
    fn uniform(&mut self) -> f64 {
        self.0 = self.0.wrapping_mul(6364136223846793005).wrapping_add(1442695040888963407);
        ((self.0 >> 11) as f64 + 0.5) / (1u64 << 53) as f64
    }
    fn normal(&mut self) -> f64 {
        let (u1, u2) = (self.uniform(), self.uniform());
        (-2.0 * u1.ln()).sqrt() * (2.0 * std::f64::consts::PI * u2).cos()
    }
}

/// Générique : une version spécialisée est compilée pour chaque modèle.
fn simulate_terminal<M: DiffusionModel>(model: &M, spot: f64, years: f64, steps: usize, paths: usize) -> Vec<f64> {
    let dt = years / steps as f64;
    let mut rng = Lcg(42);
    let mut terminal = Vec::with_capacity(paths);
    for _ in 0..paths {
        let mut value = spot;
        for _ in 0..steps {
            value = model.step(value, dt, rng.normal());
        }
        terminal.push(value);
    }
    terminal
}

fn main() {
    let model = Gbm { drift: 0.05, volatility: 0.2 };
    let terminal = simulate_terminal(&model, 100.0, 1.0, 12, 20_000);
    let mean = terminal.iter().sum::<f64>() / terminal.len() as f64;
    println!("{} : moyenne à 1 an = {mean:.2} (théorie : {:.2})", model.name(), 100.0 * 0.05_f64.exp());
}`,
          caption: {
            fr: "Contrôle de cohérence classique : en moyenne, un GBM vaut S0 x exp(mu x T), soit 105,13 ici. Avec 20 000 trajectoires, la moyenne simulée tombe tout près.",
            en: "A classic sanity check: on average, a GBM is worth S0 x exp(mu x T), here 105.13. With 20,000 paths, the simulated mean lands very close.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Grâce au trait, ajouter un modèle ne touche ni la simulation ni le calcul d'exposition. Dans le dépôt riskforge, la simulation renvoie toute la grille (une liste de scénarios par date), que l'on branche sur le `exposure_profile` écrit à l'étape 3 : on obtient enfin un profil d'exposition attendue simulé.",
            en: "Thanks to the trait, adding a model touches neither the simulation nor the exposure computation. In the riskforge repository, the simulation returns the whole grid (a list of scenarios per date), which we plug into the `exposure_profile` written in step 3: at last we get a simulated expected exposure profile.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Le générateur aléatoire de riskforge a une graine fixe : deux exécutions donnent exactement les mêmes trajectoires. Indispensable pour tester un code Monte Carlo et pour comparer deux implémentations (Rust et Kotlin) sur les mêmes tirages.",
            en: "riskforge's random generator uses a fixed seed: two runs produce exactly the same paths. Essential to test Monte Carlo code and to compare two implementations (Rust and Kotlin) on the same draws.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute un modèle `MeanReverting { speed, mean, volatility }` (Ornstein-Uhlenbeck) qui implémente `DiffusionModel` avec la discrétisation simple : x + speed x (mean - x) x dt + volatility x sqrt(dt) x z.",
          en: "Add a `MeanReverting { speed, mean, volatility }` model (Ornstein-Uhlenbeck) implementing `DiffusionModel` with the simple discretization: x + speed x (mean - x) x dt + volatility x sqrt(dt) x z.",
        },
        starterCode: `trait DiffusionModel {
    fn step(&self, current: f64, dt: f64, z: f64) -> f64;
}

// ajoute MeanReverting et son impl ici

fn main() {
    let model = MeanReverting { speed: 2.0, mean: 100.0, volatility: 0.0 };
    let mut x = 130.0;
    for _ in 0..12 {
        x = model.step(x, 1.0 / 12.0, 0.0);
    }
    println!("{x:.2}"); // se rapproche de 100 : environ 103.36
}`,
        solutionCode: `trait DiffusionModel {
    fn step(&self, current: f64, dt: f64, z: f64) -> f64;
}

struct MeanReverting {
    speed: f64,
    mean: f64,
    volatility: f64,
}

impl DiffusionModel for MeanReverting {
    fn step(&self, current: f64, dt: f64, z: f64) -> f64 {
        current + self.speed * (self.mean - current) * dt + self.volatility * dt.sqrt() * z
    }
}

fn main() {
    let model = MeanReverting { speed: 2.0, mean: 100.0, volatility: 0.0 };
    let mut x = 130.0;
    for _ in 0..12 {
        x = model.step(x, 1.0 / 12.0, 0.0);
    }
    println!("{x:.2}"); // se rapproche de 100 : environ 103.36
}`,
        hint: {
          fr: "Une struct à trois champs f64 et un `impl DiffusionModel for MeanReverting` avec la formule de l'énoncé.",
          en: "A struct with three f64 fields and an `impl DiffusionModel for MeanReverting` with the formula from the prompt.",
        },
        explanation: {
          fr: "Avec une volatilité nulle, on voit le retour à la moyenne à l'état pur : l'écart de 30 se réduit d'environ 1/6 par mois. Le dépôt riskforge utilise la discrétisation exacte, plus précise quand le pas de temps est grand.",
          en: "With zero volatility you see mean reversion in its pure form: the gap of 30 shrinks by about 1/6 each month. The riskforge repository uses the exact discretization, more accurate when the time step is large.",
        },
      },
    },
  ],
};
