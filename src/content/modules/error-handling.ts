import type { Module } from "../types";

export const errorHandling: Module = {
  id: "error-handling",
  slug: "error-handling",
  title: { fr: "Gestion des erreurs", en: "Error handling" },
  description: {
    fr: "Option, Result et l'opérateur ? : des erreurs visibles dans les types, sans exceptions.",
    en: "Option, Result and the ? operator: errors visible in the types, no exceptions.",
  },
  status: "available",
  lessons: [
    {
      id: "panic",
      slug: "panic",
      title: { fr: "panic! et les erreurs irrécupérables", en: "panic! and unrecoverable errors" },
      summary: {
        fr: "Quand arrêter le programme, et pourquoi unwrap est un aveu.",
        en: "When to stop the program, and why unwrap is a confession.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Rust n'a pas d'exceptions. Il distingue deux familles d'erreurs. Les erreurs irrécupérables sont des bugs : un indice hors limites, un invariant violé. Elles déclenchent un `panic!`, qui arrête le thread en affichant un message. Les erreurs récupérables sont des situations normales qu'on doit traiter : un fichier absent, une ligne CSV mal formée. Elles passent par le type `Result`.",
            en: "Rust has no exceptions. It separates errors into two families. Unrecoverable errors are bugs: an out-of-bounds index, a broken invariant. They trigger a `panic!`, which stops the thread and prints a message. Recoverable errors are normal situations you must handle: a missing file, a malformed CSV line. They go through the `Result` type.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let scenarios: Vec<f64> = Vec::new();
    if scenarios.is_empty() {
        panic!("aucun scénario : la simulation n'a pas tourné");
    }
}`,
          caption: {
            fr: "Le programme s'arrête avec : thread 'main' panicked at ... aucun scénario. Lance-le avec RUST_BACKTRACE=1 pour voir la pile d'appels.",
            en: "The program stops with: thread 'main' panicked at ... aucun scénario. Run it with RUST_BACKTRACE=1 to see the call stack.",
          },
        },
        {
          type: "text",
          text: {
            fr: "`unwrap()` et `expect(\"message\")` extraient la valeur d'une `Option` ou d'un `Result`, et paniquent s'il n'y en a pas. Ils sont utiles dans les tests, les prototypes, ou quand tu sais qu'une erreur est impossible. `expect` est préférable : son message explique pourquoi tu pensais que ça ne pouvait pas échouer.",
            en: "`unwrap()` and `expect(\"message\")` extract the value from an `Option` or a `Result`, and panic if there is none. They are useful in tests, prototypes, or when you know an error is impossible. Prefer `expect`: its message explains why you thought it could not fail.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let fixed: f64 = "0.035".parse().expect("taux codé en dur, toujours valide");
    println!("{fixed}");

    let from_user = "3,5 %";
    // let rate: f64 = from_user.parse().unwrap(); // panique : invalid float literal
    println!("{:?}", from_user.parse::<f64>()); // Err(ParseFloatError { kind: Invalid })
}`,
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "Dans un moteur de calcul, chaque `unwrap` est un crash potentiel en production. Règle pour riskforge : `unwrap` et `expect` uniquement dans les tests. Tout le reste remonte des `Result`.",
            en: "In a computation engine, every `unwrap` is a potential production crash. The riskforge rule: `unwrap` and `expect` only in tests. Everything else returns a `Result`.",
          },
        },
      ],
    },
    {
      id: "result",
      slug: "result",
      title: { fr: "Le type Result", en: "The Result type" },
      summary: {
        fr: "Ok ou Err : une erreur qui fait partie de la signature.",
        en: "Ok or Err: an error that is part of the signature.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "`Result<T, E>` est une enum à deux variantes : `Ok(T)` contient la valeur en cas de succès, `Err(E)` décrit l'erreur. Contrairement aux exceptions Java non vérifiées, l'erreur fait partie du type de retour : impossible d'ignorer qu'une fonction peut échouer.",
            en: "`Result<T, E>` is an enum with two variants: `Ok(T)` holds the value on success, `Err(E)` describes the error. Unlike unchecked Java exceptions, the error is part of the return type: you cannot overlook that a function may fail.",
          },
        },
        {
          type: "code",
          code: `fn parse_quantity(text: &str) -> Result<f64, String> {
    match text.trim().parse::<f64>() {
        Ok(q) if q > 0.0 => Ok(q),
        Ok(q) => Err(format!("quantité non positive : {q}")),
        Err(e) => Err(format!("'{text}' n'est pas un nombre ({e})")),
    }
}

fn main() {
    for input in ["1000", "-5", "abc"] {
        match parse_quantity(input) {
            Ok(q) => println!("ok : {q}"),
            Err(message) => println!("erreur : {message}"),
        }
    }
}`,
        },
        {
          type: "text",
          text: {
            fr: "Quelques méthodes évitent d'écrire un `match` à chaque fois. `unwrap_or(défaut)` donne une valeur de repli. `map` transforme la valeur si c'est un `Ok`. `ok()` convertit un `Result` en `Option` en oubliant l'erreur, et `ok_or(erreur)` fait l'inverse.",
            en: "A few methods save you from writing a `match` every time. `unwrap_or(default)` provides a fallback value. `map` transforms the value when it is an `Ok`. `ok()` turns a `Result` into an `Option`, dropping the error, and `ok_or(error)` does the reverse.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let haircut: f64 = "abc".parse().unwrap_or(0.0);
    println!("{haircut}"); // 0

    let rates = vec![0.031, 0.028];
    let ten_year: Result<f64, String> = rates.get(10).copied().ok_or(String::from("pas de taux 10 ans"));
    println!("{ten_year:?}");
}`,
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Option ou Result ? `Option` quand l'absence est normale et n'a pas besoin d'explication (une clé absente d'une map). `Result` quand il faut dire pourquoi ça a échoué (une ligne de fichier invalide).",
            en: "Option or Result? `Option` when absence is normal and needs no explanation (a key missing from a map). `Result` when you need to say why it failed (an invalid line in a file).",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris `parse_direction` qui accepte \"long\" ou \"short\" (sans tenir compte de la casse ni des espaces) et renvoie une erreur explicite sinon.",
          en: "Write `parse_direction`, which accepts \"long\" or \"short\" (ignoring case and surrounding spaces) and returns an explicit error otherwise.",
        },
        starterCode: `#[derive(Debug)]
enum Direction {
    Long,
    Short,
}

fn parse_direction(text: &str) -> Result<Direction, String> {
    todo!()
}

fn main() {
    println!("{:?}", parse_direction(" LONG ")); // Ok(Long)
    println!("{:?}", parse_direction("buy")); // Err("sens inconnu : buy")
}`,
        solutionCode: `#[derive(Debug)]
enum Direction {
    Long,
    Short,
}

fn parse_direction(text: &str) -> Result<Direction, String> {
    match text.trim().to_lowercase().as_str() {
        "long" => Ok(Direction::Long),
        "short" => Ok(Direction::Short),
        other => Err(format!("sens inconnu : {other}")),
    }
}

fn main() {
    println!("{:?}", parse_direction(" LONG ")); // Ok(Long)
    println!("{:?}", parse_direction("buy")); // Err("sens inconnu : buy")
}`,
        hint: {
          fr: "`to_lowercase()` renvoie une `String` ; `.as_str()` permet de la comparer à des littéraux dans un `match`.",
          en: "`to_lowercase()` returns a `String`; `.as_str()` lets you compare it with literals in a `match`.",
        },
        explanation: {
          fr: "Le dernier bras capture la valeur dans `other` au lieu de `_`, pour pouvoir la citer dans le message. Un message d'erreur qui montre la valeur fautive fait gagner beaucoup de temps.",
          en: "The last arm binds the value to `other` instead of `_`, so it can be quoted in the message. An error message that shows the offending value saves a lot of time.",
        },
      },
    },
    {
      id: "question-mark",
      slug: "question-mark",
      title: { fr: "L'opérateur ?", en: "The ? operator" },
      summary: {
        fr: "Propager une erreur en un caractère.",
        en: "Propagate an error in a single character.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Le plus souvent, une fonction ne sait pas quoi faire d'une erreur et doit la remonter à l'appelant. Le `?` placé après un `Result` fait exactement ça : si c'est un `Ok`, il en extrait la valeur ; si c'est un `Err`, il quitte immédiatement la fonction en renvoyant cette erreur.",
            en: "Most of the time, a function does not know what to do with an error and has to pass it up to the caller. The `?` placed after a `Result` does exactly that: if it is an `Ok`, it extracts the value; if it is an `Err`, it leaves the function right away, returning that error.",
          },
        },
        {
          type: "code",
          code: `use std::num::ParseFloatError;

fn notional(quantity: &str, price: &str) -> Result<f64, ParseFloatError> {
    let q: f64 = quantity.trim().parse()?;
    let p: f64 = price.trim().parse()?;
    Ok(q * p)
}

fn main() {
    println!("{:?}", notional("100", "151.5")); // Ok(15150.0)
    println!("{:?}", notional("100", "n/a")); // Err(...)
}`,
          caption: {
            fr: "Sans `?`, il faudrait deux `match` imbriqués. `?` ne s'utilise que dans une fonction qui renvoie elle-même un `Result` (ou une `Option`).",
            en: "Without `?`, you would need two nested `match` expressions. `?` only works inside a function that itself returns a `Result` (or an `Option`).",
          },
        },
        {
          type: "text",
          text: {
            fr: "Souvent, les erreurs des fonctions appelées n'ont pas le même type que la tienne. `map_err` convertit l'erreur avant de la propager : c'est l'occasion d'ajouter du contexte (quel champ, quelle valeur).",
            en: "Often the errors of the functions you call do not have the same type as yours. `map_err` converts the error before propagating it: a chance to add context (which field, which value).",
          },
        },
        {
          type: "code",
          code: `fn parse_field(name: &str, value: &str) -> Result<f64, String> {
    value
        .trim()
        .parse::<f64>()
        .map_err(|_| format!("champ {name} : '{value}' n'est pas un nombre"))
}

fn trade_value(fields: &[&str]) -> Result<f64, String> {
    let strike = parse_field("strike", fields[0])?;
    let quantity = parse_field("quantity", fields[1])?;
    Ok(strike * quantity)
}

fn main() {
    println!("{:?}", trade_value(&["100", "50"]));
    println!("{:?}", trade_value(&["100", "cinquante"]));
}`,
          caption: {
            fr: "`|_| ...` est une closure qui ignore l'erreur d'origine : on la remplace par un message plus parlant. Les closures ont leur propre module plus loin.",
            en: "`|_| ...` is a closure that ignores the original error: we replace it with a clearer message. Closures get their own module later on.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "`main` peut aussi renvoyer un `Result<(), Box<dyn std::error::Error>>`, ce qui autorise `?` directement dedans. Si une erreur remonte jusque-là, le programme s'arrête avec un code de sortie non nul et affiche l'erreur.",
            en: "`main` can also return a `Result<(), Box<dyn std::error::Error>>`, which allows `?` directly inside it. If an error bubbles up that far, the program exits with a non-zero code and prints the error.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Utilise `?` pour écrire `average_price`, qui parse une liste de prix textuels et renvoie leur moyenne, ou la première erreur rencontrée.",
          en: "Use `?` to write `average_price`, which parses a list of textual prices and returns their average, or the first error encountered.",
        },
        starterCode: `use std::num::ParseFloatError;

fn average_price(prices: &[&str]) -> Result<f64, ParseFloatError> {
    todo!()
}

fn main() {
    println!("{:?}", average_price(&["100", "102", "104"])); // Ok(102.0)
    println!("{:?}", average_price(&["100", "oops", "104"])); // Err(...)
}`,
        solutionCode: `use std::num::ParseFloatError;

fn average_price(prices: &[&str]) -> Result<f64, ParseFloatError> {
    let mut total = 0.0;
    for text in prices {
        let price: f64 = text.trim().parse()?;
        total += price;
    }
    Ok(total / prices.len() as f64)
}

fn main() {
    println!("{:?}", average_price(&["100", "102", "104"])); // Ok(102.0)
    println!("{:?}", average_price(&["100", "oops", "104"])); // Err(...)
}`,
        hint: {
          fr: "Une boucle `for` classique ; le `?` dans la boucle quitte la fonction dès le premier prix invalide.",
          en: "A plain `for` loop; the `?` inside the loop leaves the function at the first invalid price.",
        },
        explanation: {
          fr: "La valeur finale est enveloppée dans `Ok(...)` : la fonction renvoie un `Result`, pas un f64. Oublier ce `Ok` est l'erreur la plus courante au début.",
          en: "The final value is wrapped in `Ok(...)`: the function returns a `Result`, not an f64. Forgetting that `Ok` is the most common early mistake.",
        },
      },
    },
    {
      id: "custom-errors",
      slug: "custom-errors",
      title: { fr: "Des erreurs typées", en: "Typed errors" },
      summary: {
        fr: "Une enum d'erreurs métier, affichable et exploitable.",
        en: "An enum of business errors, printable and usable.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une `String` comme type d'erreur suffit pour débuter, mais l'appelant ne peut rien en faire à part l'afficher. Une enum d'erreurs lui permet de réagir différemment selon le cas, avec un `match`, et les tests peuvent vérifier précisément quelle erreur survient.",
            en: "A `String` as the error type is enough to get started, but the caller can do nothing with it except print it. An error enum lets the caller react differently to each case with a `match`, and tests can check exactly which error occurs.",
          },
        },
        {
          type: "code",
          code: `use std::fmt;

#[derive(Debug, PartialEq)]
enum ParseError {
    WrongFieldCount { expected: usize, found: usize },
    InvalidNumber { field: &'static str, value: String },
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ParseError::WrongFieldCount { expected, found } => {
                write!(f, "{expected} champs attendus, {found} trouvés")
            }
            ParseError::InvalidNumber { field, value } => {
                write!(f, "champ {field} : '{value}' n'est pas un nombre")
            }
        }
    }
}

impl std::error::Error for ParseError {}

fn parse_strike(line: &str) -> Result<f64, ParseError> {
    let fields: Vec<&str> = line.split(',').collect();
    if fields.len() != 2 {
        return Err(ParseError::WrongFieldCount { expected: 2, found: fields.len() });
    }
    fields[1].trim().parse().map_err(|_| ParseError::InvalidNumber {
        field: "strike",
        value: fields[1].trim().to_string(),
    })
}

fn main() {
    for line in ["T1,100", "T2", "T3,abc"] {
        match parse_strike(line) {
            Ok(strike) => println!("{line} -> {strike}"),
            Err(e) => println!("{line} -> erreur : {e}"),
        }
    }
}`,
        },
        {
          type: "text",
          text: {
            fr: "Deux blocs `impl` à retenir. `fmt::Display` définit le message lisible affiché par `{}`. `std::error::Error` déclare officiellement le type comme une erreur, ce qui le rend compatible avec `Box<dyn Error>` et l'écosystème. Ce sont des implémentations de traits : le module suivant explique ce mécanisme en détail.",
            en: "Two `impl` blocks to remember. `fmt::Display` defines the readable message printed by `{}`. `std::error::Error` officially declares the type as an error, which makes it compatible with `Box<dyn Error>` and the ecosystem. These are trait implementations: the next module explains the mechanism in detail.",
          },
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Dans les vrais projets, la crate `thiserror` génère `Display` et `Error` à partir d'attributs, et `anyhow` simplifie les erreurs côté application. Écrire les deux impl à la main une fois aide à comprendre ce que ces crates font pour toi.",
            en: "In real projects, the `thiserror` crate generates `Display` and `Error` from attributes, and `anyhow` simplifies errors at the application level. Writing both impls by hand once helps you understand what those crates do for you.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute une variante `NegativeQuantity(f64)` à l'enum, son message dans `Display`, et fais-la renvoyer par `parse_quantity` quand la quantité est négative.",
          en: "Add a `NegativeQuantity(f64)` variant to the enum, its message in `Display`, and have `parse_quantity` return it when the quantity is negative.",
        },
        starterCode: `use std::fmt;

#[derive(Debug)]
enum ParseError {
    InvalidNumber(String),
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ParseError::InvalidNumber(value) => write!(f, "'{value}' n'est pas un nombre"),
        }
    }
}

fn parse_quantity(text: &str) -> Result<f64, ParseError> {
    let quantity: f64 = text
        .trim()
        .parse()
        .map_err(|_| ParseError::InvalidNumber(text.to_string()))?;
    Ok(quantity)
}

fn main() {
    for input in ["10", "-3", "x"] {
        match parse_quantity(input) {
            Ok(q) => println!("{q}"),
            Err(e) => println!("erreur : {e}"),
        }
    }
}`,
        solutionCode: `use std::fmt;

#[derive(Debug)]
enum ParseError {
    InvalidNumber(String),
    NegativeQuantity(f64),
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ParseError::InvalidNumber(value) => write!(f, "'{value}' n'est pas un nombre"),
            ParseError::NegativeQuantity(q) => write!(f, "quantité négative : {q}"),
        }
    }
}

fn parse_quantity(text: &str) -> Result<f64, ParseError> {
    let quantity: f64 = text
        .trim()
        .parse()
        .map_err(|_| ParseError::InvalidNumber(text.to_string()))?;
    if quantity < 0.0 {
        return Err(ParseError::NegativeQuantity(quantity));
    }
    Ok(quantity)
}

fn main() {
    for input in ["10", "-3", "x"] {
        match parse_quantity(input) {
            Ok(q) => println!("{q}"),
            Err(e) => println!("erreur : {e}"),
        }
    }
}`,
        hint: {
          fr: "Une fois la variante ajoutée, le compilateur signale le `match` de `Display` qui ne la couvre pas : laisse-toi guider.",
          en: "Once the variant is added, the compiler flags the `Display` match that does not cover it: let it guide you.",
        },
        explanation: {
          fr: "C'est l'exhaustivité du `match` au service des erreurs : impossible d'oublier le message d'une nouvelle variante. Le `return Err(...)` anticipé est la forme idiomatique pour une vérification au milieu d'une fonction.",
          en: "This is `match` exhaustiveness serving errors: you cannot forget the message of a new variant. The early `return Err(...)` is the idiomatic form for a check in the middle of a function.",
        },
      },
    },
    {
      id: "project-csv-loader",
      kind: "project",
      slug: "project-csv-loader",
      title: { fr: "Fil rouge : charger un portefeuille", en: "Project: load a portfolio" },
      summary: {
        fr: "Lire un CSV de trades avec des erreurs typées et numérotées, sans un seul panic.",
        en: "Read a CSV of trades with typed, line-numbered errors, without a single panic.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "riskforge sait maintenant calculer, mais ses trades sont codés en dur. On va les lire depuis un fichier CSV. C'est typiquement là que les erreurs arrivent : une colonne manquante, un nombre mal saisi, un type d'instrument inconnu. L'objectif : ne jamais paniquer, et dire précisément quelle ligne pose problème et pourquoi.",
            en: "riskforge can compute now, but its trades are hard-coded. We will read them from a CSV file. That is typically where errors show up: a missing column, a mistyped number, an unknown instrument type. The goal: never panic, and say exactly which line is wrong and why.",
          },
        },
        {
          type: "code",
          label: "data/portfolio.csv",
          code: `id,counterparty,instrument,strike,direction,quantity
1,ACME,forward,100,long,1000
2,ACME,forward,105,short,800
3,Globex,call,120,long,200
4,Initech,put,95,short,100`,
        },
        {
          type: "code",
          label: "src/loader.rs",
          code: `#[derive(Debug, PartialEq)]
pub enum ParseError {
    WrongFieldCount { expected: usize, found: usize },
    InvalidNumber { field: &'static str, value: String },
    UnknownInstrument(String),
    UnknownDirection(String),
}

#[derive(Debug, PartialEq)]
pub struct LoadError {
    pub line: usize,
    pub error: ParseError,
}

const FIELD_COUNT: usize = 6;

fn parse_number(field: &'static str, value: &str) -> Result<f64, ParseError> {
    value.parse().map_err(|_| ParseError::InvalidNumber { field, value: value.to_string() })
}

/// Une ligne CSV devient (contrepartie, champs utiles), ou une erreur explicite.
pub fn parse_line(line: &str) -> Result<(String, f64, f64), ParseError> {
    let fields: Vec<&str> = line.split(',').map(|f| f.trim()).collect();
    if fields.len() != FIELD_COUNT {
        return Err(ParseError::WrongFieldCount { expected: FIELD_COUNT, found: fields.len() });
    }
    match fields[2] {
        "forward" | "call" | "put" => {}
        other => return Err(ParseError::UnknownInstrument(other.to_string())),
    }
    let strike = parse_number("strike", fields[3])?;
    let quantity = parse_number("quantity", fields[5])?;
    Ok((fields[1].to_string(), strike, quantity))
}

/// Charge toutes les lignes ; la première erreur est renvoyée avec son numéro de ligne.
pub fn load(csv: &str) -> Result<Vec<(String, f64, f64)>, LoadError> {
    let mut rows = Vec::new();
    for (index, line) in csv.lines().enumerate() {
        let line_number = index + 1;
        if line_number == 1 || line.trim().is_empty() {
            continue; // en-tête et lignes vides
        }
        let row = parse_line(line).map_err(|error| LoadError { line: line_number, error })?;
        rows.push(row);
    }
    Ok(rows)
}

fn main() {
    let csv = "id,counterparty,instrument,strike,direction,quantity\\n1,ACME,forward,100,long,1000\\n2,ACME,swap,105,short,800";
    println!("{:?}", load(csv));
}`,
          caption: {
            fr: "Version raccourcie : dans le dépôt, `parse_line` construit un vrai `Trade` (direction comprise) et `load_portfolio` remplit directement un `Portfolio`.",
            en: "A shortened version: in the repository, `parse_line` builds a real `Trade` (direction included) and `load_portfolio` fills a `Portfolio` directly.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Deux couches d'erreurs. `ParseError` décrit ce qui ne va pas dans une ligne, sans savoir où elle se trouve. `LoadError` ajoute le contexte : le numéro de ligne. Chaque couche ajoute ce qu'elle seule connaît, grâce à `map_err` puis `?`. Le message final ressemble à : ligne 3 : instrument inconnu : swap.",
            en: "Two layers of errors. `ParseError` describes what is wrong with a line, without knowing where it is. `LoadError` adds the context: the line number. Each layer adds what only it knows, thanks to `map_err` then `?`. The final message reads like: line 3: unknown instrument: swap.",
          },
        },
        {
          type: "code",
          label: "src/main.rs",
          code: `use std::error::Error;
use std::fs;

fn main() -> Result<(), Box<dyn Error>> {
    let csv = fs::read_to_string("data/portfolio.csv")?;
    println!("{} caractères lus", csv.len());
    Ok(())
}`,
          caption: {
            fr: "`fs::read_to_string` renvoie un `io::Result` : un fichier absent devient une erreur propre, et `?` la remonte jusqu'à `main`.",
            en: "`fs::read_to_string` returns an `io::Result`: a missing file becomes a clean error, and `?` bubbles it up to `main`.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Fais en sorte que `load` ignore aussi les lignes de commentaire, celles qui commencent par `#` (après les espaces éventuels).",
          en: "Make `load` also skip comment lines, those starting with `#` (after any leading spaces).",
        },
        starterCode: `fn load(csv: &str) -> Vec<String> {
    let mut rows = Vec::new();
    for (index, line) in csv.lines().enumerate() {
        if index == 0 || line.trim().is_empty() {
            continue;
        }
        rows.push(line.trim().to_string());
    }
    rows
}

fn main() {
    let csv = "id,counterparty\\n1,ACME\\n  # trade annulé\\n2,Globex";
    println!("{:?}", load(csv)); // ["1,ACME", "2,Globex"]
}`,
        solutionCode: `fn load(csv: &str) -> Vec<String> {
    let mut rows = Vec::new();
    for (index, line) in csv.lines().enumerate() {
        let trimmed = line.trim();
        if index == 0 || trimmed.is_empty() || trimmed.starts_with('#') {
            continue;
        }
        rows.push(trimmed.to_string());
    }
    rows
}

fn main() {
    let csv = "id,counterparty\\n1,ACME\\n  # trade annulé\\n2,Globex";
    println!("{:?}", load(csv)); // ["1,ACME", "2,Globex"]
}`,
        hint: {
          fr: "`starts_with('#')` sur la ligne déjà passée par `trim()`.",
          en: "`starts_with('#')` on the line once it has gone through `trim()`.",
        },
        explanation: {
          fr: "On garde `enumerate` sur toutes les lignes, commentaires compris, pour que les numéros de ligne des erreurs correspondent à ce que l'utilisateur voit dans son éditeur.",
          en: "We keep `enumerate` over every line, comments included, so that the line numbers in errors match what the user sees in their editor.",
        },
      },
    },
  ],
};
