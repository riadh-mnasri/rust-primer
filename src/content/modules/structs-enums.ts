import type { Module } from "../types";

export const structsEnums: Module = {
  id: "structs-enums",
  slug: "structs-enums",
  title: { fr: "Structs, enums et pattern matching", en: "Structs, enums and pattern matching" },
  description: {
    fr: "Modéliser un domaine avec des types précis, et laisser match vérifier chaque cas.",
    en: "Model a domain with precise types, and let match check every case.",
  },
  status: "available",
  lessons: [
    {
      id: "structs",
      slug: "structs",
      title: { fr: "Les structs", en: "Structs" },
      summary: {
        fr: "Regrouper des données nommées dans un type à toi.",
        en: "Group named data into a type of your own.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une struct regroupe plusieurs valeurs nommées dans un seul type, comme une classe Java sans héritage, ou une data class Kotlin. On déclare les champs et leurs types, puis on crée une instance en donnant une valeur à chaque champ.",
            en: "A struct groups several named values into a single type, like a Java class without inheritance, or a Kotlin data class. You declare the fields and their types, then create an instance by giving every field a value.",
          },
        },
        {
          type: "code",
          code: `#[derive(Debug)]
struct Quote {
    ticker: String,
    bid: f64,
    ask: f64,
}

fn main() {
    let quote = Quote {
        ticker: String::from("AIR.PA"),
        bid: 151.20,
        ask: 151.30,
    };
    println!("{} : {} / {}", quote.ticker, quote.bid, quote.ask);
    println!("{quote:?}");
}`,
          caption: {
            fr: "`#[derive(Debug)]` génère l'affichage de débogage, utilisé par `{:?}`. Sans lui, `println!` refuse d'afficher la struct.",
            en: "`#[derive(Debug)]` generates the debug formatting used by `{:?}`. Without it, `println!` refuses to print the struct.",
          },
        },
        {
          type: "text",
          text: {
            fr: "La mutabilité concerne toute l'instance : soit la variable est `mut` et tous les champs sont modifiables, soit aucun ne l'est. Deux raccourcis utiles : si une variable porte le même nom qu'un champ, on l'écrit une seule fois ; et `..autre` copie les champs restants depuis une autre instance.",
            en: "Mutability applies to the whole instance: either the variable is `mut` and every field can change, or none can. Two handy shortcuts: if a variable has the same name as a field you write it once; and `..other` copies the remaining fields from another instance.",
          },
        },
        {
          type: "code",
          code: `#[derive(Debug)]
struct Quote {
    ticker: String,
    bid: f64,
    ask: f64,
}

fn main() {
    let ticker = String::from("AIR.PA");
    let mut quote = Quote { ticker, bid: 151.20, ask: 151.30 };
    quote.bid = 151.25;

    let wider = Quote { ask: 151.60, ..quote };
    println!("{wider:?}");
}`,
          caption: {
            fr: "Attention : `..quote` déplace la String `ticker` dans `wider`. Après cette ligne, `quote.ticker` n'est plus utilisable (mais `quote.bid` l'est encore, f64 étant Copy).",
            en: "Careful: `..quote` moves the `ticker` String into `wider`. After that line `quote.ticker` can no longer be used (but `quote.bid` still can, f64 being Copy).",
          },
        },
        {
          type: "text",
          text: {
            fr: "Les tuple structs ont des champs sans nom. Leur usage le plus courant est le newtype : envelopper un type existant pour lui donner un sens métier. Un `Notional(f64)` et un `Rate(f64)` ne peuvent plus être confondus, alors que deux `f64` nus le peuvent.",
            en: "Tuple structs have unnamed fields. Their most common use is the newtype: wrapping an existing type to give it business meaning. A `Notional(f64)` and a `Rate(f64)` can no longer be mixed up, whereas two bare `f64` values can.",
          },
        },
        {
          type: "code",
          code: `struct Notional(f64);
struct Rate(f64);

fn annual_interest(notional: Notional, rate: Rate) -> f64 {
    notional.0 * rate.0
}

fn main() {
    let interest = annual_interest(Notional(1_000_000.0), Rate(0.035));
    // annual_interest(Rate(0.035), Notional(1_000_000.0)); // erreur : types inversés
    println!("{interest}");
}`,
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Le newtype ne coûte rien à l'exécution : en mémoire, un `Notional` est exactement un f64. Tu gagnes la sécurité du typage gratuitement.",
            en: "A newtype costs nothing at runtime: in memory, a `Notional` is exactly an f64. You get type safety for free.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Déclare une struct `Trade` avec un identifiant `id` (u32), une contrepartie `counterparty` (String) et un nominal `notional` (f64), puis crée une instance et affiche-la avec `{:?}`.",
          en: "Declare a `Trade` struct with an `id` (u32), a `counterparty` (String) and a `notional` (f64), then create an instance and print it with `{:?}`.",
        },
        starterCode: `// déclare la struct ici

fn main() {
    // crée un Trade et affiche-le
}`,
        solutionCode: `#[derive(Debug)]
struct Trade {
    id: u32,
    counterparty: String,
    notional: f64,
}

fn main() {
    let trade = Trade {
        id: 1,
        counterparty: String::from("ACME Bank"),
        notional: 5_000_000.0,
    };
    println!("{trade:?}");
}`,
        hint: {
          fr: "N'oublie pas `#[derive(Debug)]` au-dessus de la struct pour pouvoir utiliser `{:?}`.",
          en: "Do not forget `#[derive(Debug)]` above the struct so you can use `{:?}`.",
        },
        explanation: {
          fr: "`{trade:#?}` (avec un dièse) affiche la même chose sur plusieurs lignes indentées : très pratique pour les structs imbriquées.",
          en: "`{trade:#?}` (with a hash) prints the same thing over several indented lines: very handy for nested structs.",
        },
      },
    },
    {
      id: "methods",
      slug: "methods",
      title: { fr: "Méthodes et blocs impl", en: "Methods and impl blocks" },
      summary: {
        fr: "Attacher du comportement à un type : &self, &mut self, self et new.",
        en: "Attach behavior to a type: &self, &mut self, self and new.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Les méthodes se déclarent dans un bloc `impl`, séparé de la struct. Leur premier paramètre dit comment elles utilisent l'instance, avec exactement les règles d'ownership du module précédent.",
            en: "Methods are declared in an `impl` block, separate from the struct. Their first parameter says how they use the instance, following exactly the ownership rules from the previous module.",
          },
        },
        {
          type: "code",
          code: `#[derive(Debug)]
struct Position {
    ticker: String,
    quantity: f64,
    price: f64,
}

impl Position {
    // Fonction associée (pas de self) : le constructeur par convention.
    fn new(ticker: &str, quantity: f64, price: f64) -> Self {
        Self { ticker: ticker.to_string(), quantity, price }
    }

    // &self : lecture seule.
    fn market_value(&self) -> f64 {
        self.quantity * self.price
    }

    // &mut self : modifie l'instance.
    fn reprice(&mut self, new_price: f64) {
        self.price = new_price;
    }

    // self : consomme l'instance, qui n'est plus utilisable ensuite.
    fn close(self) -> String {
        format!("{} clôturée à {}", self.ticker, self.price)
    }
}

fn main() {
    let mut position = Position::new("AIR.PA", 100.0, 151.25);
    println!("{}", position.market_value());
    position.reprice(155.0);
    println!("{}", position.close());
    // position.market_value(); // erreur : position a été consommée par close
}`,
        },
        {
          type: "text",
          text: {
            fr: "On appelle une fonction associée avec `Type::fonction` (comme `String::from`) et une méthode avec un point. Rust n'a pas de constructeur spécial : `new` est une simple convention, et `Self` désigne le type en cours d'implémentation.",
            en: "You call an associated function with `Type::function` (like `String::from`) and a method with a dot. Rust has no special constructor: `new` is just a convention, and `Self` refers to the type being implemented.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Pas besoin d'écrire `(&mut position).reprice(...)` : Rust ajoute automatiquement `&` ou `&mut` selon la signature de la méthode. C'est l'auto-référencement.",
            en: "No need to write `(&mut position).reprice(...)`: Rust automatically adds `&` or `&mut` depending on the method signature. This is auto-referencing.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute à `Position` une méthode `pnl(&self, entry_price: f64) -> f64` qui renvoie le gain ou la perte par rapport au prix d'entrée.",
          en: "Add a `pnl(&self, entry_price: f64) -> f64` method to `Position` that returns the profit or loss against the entry price.",
        },
        starterCode: `struct Position {
    quantity: f64,
    price: f64,
}

impl Position {
    // ajoute pnl ici
}

fn main() {
    let position = Position { quantity: 100.0, price: 155.0 };
    println!("{}", position.pnl(151.0)); // 400
}`,
        solutionCode: `struct Position {
    quantity: f64,
    price: f64,
}

impl Position {
    fn pnl(&self, entry_price: f64) -> f64 {
        (self.price - entry_price) * self.quantity
    }
}

fn main() {
    let position = Position { quantity: 100.0, price: 155.0 };
    println!("{}", position.pnl(151.0)); // 400
}`,
        hint: {
          fr: "La méthode ne modifie rien : `&self` suffit. On accède aux champs avec `self.price`.",
          en: "The method changes nothing: `&self` is enough. Fields are accessed with `self.price`.",
        },
        explanation: {
          fr: "Choisir le bon receveur (`&self`, `&mut self`, `self`) documente l'intention : un lecteur sait sans lire le corps que `pnl` ne touche pas à la position.",
          en: "Picking the right receiver (`&self`, `&mut self`, `self`) documents intent: a reader knows without reading the body that `pnl` does not touch the position.",
        },
      },
    },
    {
      id: "enums",
      slug: "enums",
      title: { fr: "Les enums", en: "Enums" },
      summary: {
        fr: "Un type qui vaut l'une de plusieurs variantes, chacune avec ses données.",
        en: "A type that is one of several variants, each with its own data.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une enum Rust ressemble à une enum Java au premier abord, mais chaque variante peut porter ses propres données, de forme différente. C'est l'équivalent d'une sealed class Kotlin : un ensemble fermé de cas, connu du compilateur.",
            en: "A Rust enum looks like a Java enum at first sight, but each variant can carry its own data, in a different shape. It is the equivalent of a Kotlin sealed class: a closed set of cases known to the compiler.",
          },
        },
        {
          type: "code",
          code: `#[derive(Debug)]
enum Order {
    Market { quantity: f64 },
    Limit { quantity: f64, price: f64 },
    Cancel(u64),
}

fn main() {
    let orders = vec![
        Order::Market { quantity: 100.0 },
        Order::Limit { quantity: 50.0, price: 151.0 },
        Order::Cancel(42),
    ];
    for order in &orders {
        println!("{order:?}");
    }
}`,
          caption: {
            fr: "Trois variantes, trois formes de données. Un seul type `Order`, donc un seul `Vec<Order>` possible.",
            en: "Three variants, three data shapes. A single `Order` type, so a single `Vec<Order>` is possible.",
          },
        },
        {
          type: "text",
          text: {
            fr: "L'enum la plus importante de la bibliothèque standard est `Option<T>`. Rust n'a pas de `null` : une valeur qui peut manquer est de type `Option<T>`, qui vaut soit `Some(valeur)`, soit `None`. Le compilateur t'oblige à traiter le cas `None` avant d'utiliser la valeur.",
            en: "The most important enum in the standard library is `Option<T>`. Rust has no `null`: a value that may be missing has type `Option<T>`, which is either `Some(value)` or `None`. The compiler forces you to handle the `None` case before using the value.",
          },
        },
        {
          type: "code",
          code: `fn find_rate(tenor_years: u32) -> Option<f64> {
    match tenor_years {
        1 => Some(0.031),
        5 => Some(0.028),
        _ => None,
    }
}

fn main() {
    let rate = find_rate(5);
    // let doubled = rate * 2.0; // erreur : Option<f64> n'est pas un f64
    if let Some(r) = rate {
        println!("taux 5 ans : {r}");
    }
    println!("taux 3 ans : {:?}", find_rate(3)); // None
}`,
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Si tu viens de Kotlin, `Option<f64>` joue le rôle de `Double?`. La différence : ici c'est un type ordinaire, on lui applique les mêmes outils qu'aux autres enums.",
            en: "If you come from Kotlin, `Option<f64>` plays the role of `Double?`. The difference: here it is an ordinary type, you use the same tools on it as on any other enum.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Déclare une enum `Rating` avec trois variantes : `Investment`, `Speculative` et `Default`. Ajoute-lui une méthode `weight(&self) -> f64` qui renvoie 0.2, 1.0 et 1.5.",
          en: "Declare a `Rating` enum with three variants: `Investment`, `Speculative` and `Default`. Give it a `weight(&self) -> f64` method returning 0.2, 1.0 and 1.5.",
        },
        starterCode: `// déclare l'enum et son impl ici

fn main() {
    println!("{}", Rating::Speculative.weight()); // 1
}`,
        solutionCode: `enum Rating {
    Investment,
    Speculative,
    Default,
}

impl Rating {
    fn weight(&self) -> f64 {
        match self {
            Rating::Investment => 0.2,
            Rating::Speculative => 1.0,
            Rating::Default => 1.5,
        }
    }
}

fn main() {
    println!("{}", Rating::Speculative.weight()); // 1
}`,
        hint: {
          fr: "Les enums aussi ont des blocs `impl`. Dans la méthode, un `match self` couvre les trois variantes.",
          en: "Enums have `impl` blocks too. Inside the method, a `match self` covers the three variants.",
        },
        explanation: {
          fr: "Si tu ajoutes plus tard une quatrième variante, le compilateur signalera chaque `match` qui ne la traite pas. C'est la grande force des enums par rapport à une hiérarchie de classes ouverte.",
          en: "If you later add a fourth variant, the compiler will flag every `match` that does not handle it. That is the big strength of enums over an open class hierarchy.",
        },
      },
    },
    {
      id: "pattern-matching",
      slug: "pattern-matching",
      title: { fr: "Pattern matching", en: "Pattern matching" },
      summary: {
        fr: "Déstructurer, filtrer avec des gardes, et if let pour un seul cas.",
        en: "Destructure, filter with guards, and if let for a single case.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "`match` ne se contente pas de comparer des valeurs : il déstructure. Chaque bras peut extraire les données d'une variante dans des variables, et s'en servir immédiatement.",
            en: "`match` does more than compare values: it destructures. Each arm can pull a variant's data into variables and use them right away.",
          },
        },
        {
          type: "code",
          code: `enum Order {
    Market { quantity: f64 },
    Limit { quantity: f64, price: f64 },
    Cancel(u64),
}

fn describe(order: &Order) -> String {
    match order {
        Order::Market { quantity } => format!("achat de {quantity} au marché"),
        Order::Limit { quantity, price } if *price > 1_000.0 => {
            format!("limite élevée : {quantity} à {price}")
        }
        Order::Limit { quantity, price } => format!("{quantity} à {price}"),
        Order::Cancel(id) => format!("annulation de l'ordre {id}"),
    }
}

fn main() {
    println!("{}", describe(&Order::Limit { quantity: 10.0, price: 1_500.0 }));
    println!("{}", describe(&Order::Cancel(7)));
}`,
          caption: {
            fr: "`if *price > 1_000.0` est une garde : le bras ne s'applique que si la condition est vraie. L'étoile est là parce qu'on matche sur une référence.",
            en: "`if *price > 1_000.0` is a guard: the arm only applies when the condition holds. The star is there because we match on a reference.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Les motifs fonctionnent aussi sur les tuples et les structs, avec `..` pour ignorer les champs inutiles. On peut combiner plusieurs motifs avec `|`.",
            en: "Patterns also work on tuples and structs, with `..` to skip fields you do not need. You can combine several patterns with `|`.",
          },
        },
        {
          type: "code",
          code: `struct Trade {
    id: u32,
    notional: f64,
    currency: &'static str,
}

fn main() {
    let trade = Trade { id: 3, notional: 2e6, currency: "EUR" };
    let Trade { notional, currency, .. } = trade;
    println!("{notional} {currency}");

    let zone = match currency {
        "EUR" | "CHF" => "Europe",
        "USD" | "CAD" => "Amérique du Nord",
        _ => "autre",
    };
    println!("{zone} (trade {})", trade.id);
}`,
        },
        {
          type: "text",
          text: {
            fr: "Quand un seul cas t'intéresse, `if let` évite d'écrire un `match` avec un bras `_ => {}` vide. `let ... else` fait l'inverse : il extrait la valeur ou sort immédiatement de la fonction.",
            en: "When only one case matters, `if let` saves you from writing a `match` with an empty `_ => {}` arm. `let ... else` does the opposite: it extracts the value or leaves the function right away.",
          },
        },
        {
          type: "code",
          code: `fn spread(bid: Option<f64>, ask: Option<f64>) -> Option<f64> {
    let Some(b) = bid else { return None };
    let Some(a) = ask else { return None };
    Some(a - b)
}

fn main() {
    if let Some(s) = spread(Some(151.2), Some(151.3)) {
        println!("spread : {s:.2}");
    }
    println!("{:?}", spread(None, Some(151.3))); // None
}`,
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "Évite le bras `_` sur tes propres enums quand c'est possible. Il fait taire le compilateur le jour où tu ajoutes une variante, ce qui est précisément le moment où tu voudrais qu'il parle.",
            en: "Avoid the `_` arm on your own enums when you can. It silences the compiler on the day you add a variant, which is exactly when you want it to speak up.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Complète `payoff` pour qu'elle renvoie le gain à l'échéance d'une option : max(spot - strike, 0) pour un Call, max(strike - spot, 0) pour un Put.",
          en: "Complete `payoff` so it returns an option's payoff at maturity: max(spot - strike, 0) for a Call, max(strike - spot, 0) for a Put.",
        },
        starterCode: `enum OptionContract {
    Call { strike: f64 },
    Put { strike: f64 },
}

fn payoff(option: &OptionContract, spot: f64) -> f64 {
    todo!()
}

fn main() {
    println!("{}", payoff(&OptionContract::Call { strike: 100.0 }, 112.0)); // 12
    println!("{}", payoff(&OptionContract::Put { strike: 100.0 }, 112.0)); // 0
}`,
        solutionCode: `enum OptionContract {
    Call { strike: f64 },
    Put { strike: f64 },
}

fn payoff(option: &OptionContract, spot: f64) -> f64 {
    match option {
        OptionContract::Call { strike } => (spot - strike).max(0.0),
        OptionContract::Put { strike } => (strike - spot).max(0.0),
    }
}

fn main() {
    println!("{}", payoff(&OptionContract::Call { strike: 100.0 }, 112.0)); // 12
    println!("{}", payoff(&OptionContract::Put { strike: 100.0 }, 112.0)); // 0
}`,
        hint: {
          fr: "Un `match option` avec un bras par variante ; chaque bras extrait `strike`.",
          en: "A `match option` with one arm per variant; each arm extracts `strike`.",
        },
        explanation: {
          fr: "Ici `strike` est un `&f64` (on matche sur une référence), et pourtant `spot - strike` compile : les opérateurs arithmétiques sont implémentés entre `f64` et `&f64`.",
          en: "Here `strike` is an `&f64` (we match on a reference), yet `spot - strike` compiles: arithmetic operators are implemented between `f64` and `&f64`.",
        },
      },
    },
    {
      id: "project-domain-model",
      kind: "project",
      slug: "project-domain-model",
      title: { fr: "Fil rouge : le modèle métier", en: "Project: the domain model" },
      summary: {
        fr: "Trade, Instrument et NettingSet : riskforge passe des f64 nus à de vrais types.",
        en: "Trade, Instrument and NettingSet: riskforge moves from bare f64 values to real types.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Jusqu'ici, riskforge manipulait des MtM déjà calculés. Dans la réalité, on part d'un portefeuille de contrats et on calcule leur MtM pour chaque scénario de marché. On modélise donc les contrats : un `Trade` porte un `Instrument` (forward ou option), un sens (acheteur ou vendeur) et une quantité.",
            en: "So far riskforge handled precomputed MtMs. In reality you start from a portfolio of contracts and compute their MtM for each market scenario. So we model the contracts: a `Trade` holds an `Instrument` (forward or option), a direction (long or short) and a quantity.",
          },
        },
        {
          type: "code",
          label: "src/model.rs",
          code: `#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Direction {
    Long,
    Short,
}

impl Direction {
    pub fn sign(self) -> f64 {
        match self {
            Direction::Long => 1.0,
            Direction::Short => -1.0,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum OptionKind {
    Call,
    Put,
}

#[derive(Debug, Clone, PartialEq)]
pub enum Instrument {
    Forward { strike: f64 },
    EuropeanOption { kind: OptionKind, strike: f64 },
}

#[derive(Debug, Clone, PartialEq)]
pub struct Trade {
    pub id: u32,
    pub instrument: Instrument,
    pub direction: Direction,
    pub quantity: f64,
}

impl Trade {
    /// MtM du trade pour un prix spot donné (valeur intrinsèque pour les options).
    pub fn mtm(&self, spot: f64) -> f64 {
        let unit_value = match self.instrument {
            Instrument::Forward { strike } => spot - strike,
            Instrument::EuropeanOption { kind: OptionKind::Call, strike } => (spot - strike).max(0.0),
            Instrument::EuropeanOption { kind: OptionKind::Put, strike } => (strike - spot).max(0.0),
        };
        unit_value * self.quantity * self.direction.sign()
    }
}

fn main() {
    let trade = Trade {
        id: 1,
        instrument: Instrument::EuropeanOption { kind: OptionKind::Call, strike: 100.0 },
        direction: Direction::Short,
        quantity: 1_000.0,
    };
    println!("MtM à 112 : {}", trade.mtm(112.0)); // -12000
}`,
          caption: {
            fr: "Simplification assumée : une option vaut ici sa valeur intrinsèque. Le vrai prix (Black-Scholes) viendra avec les modèles de diffusion.",
            en: "A deliberate simplification: an option is worth its intrinsic value here. The real price (Black-Scholes) will come with the diffusion models.",
          },
        },
        {
          type: "text",
          text: {
            fr: "Vient ensuite la notion clé du risque de contrepartie : le netting. Si la contrepartie fait défaut, les contrats couverts par un même accord de compensation (ISDA) sont soldés ensemble. Ce n'est plus l'exposition de chaque trade qui compte, mais celle de leur somme : max(somme des MtM, 0).",
            en: "Next comes the key notion of counterparty risk: netting. If the counterparty defaults, contracts covered by the same netting agreement (ISDA) are settled together. What counts is no longer each trade's exposure but that of their sum: max(sum of MtMs, 0).",
          },
        },
        {
          type: "code",
          label: "src/model.rs",
          code: `#[derive(Debug, Clone, PartialEq)]
pub enum Instrument {
    Forward { strike: f64 },
}

#[derive(Debug, Clone, PartialEq)]
pub struct Trade {
    pub id: u32,
    pub instrument: Instrument,
    pub quantity: f64,
}

impl Trade {
    pub fn mtm(&self, spot: f64) -> f64 {
        match self.instrument {
            Instrument::Forward { strike } => (spot - strike) * self.quantity,
        }
    }
}

#[derive(Debug)]
pub struct NettingSet {
    pub counterparty: String,
    trades: Vec<Trade>,
}

impl NettingSet {
    pub fn new(counterparty: &str) -> Self {
        Self { counterparty: counterparty.to_string(), trades: Vec::new() }
    }

    pub fn add(&mut self, trade: Trade) {
        self.trades.push(trade);
    }

    pub fn net_mtm(&self, spot: f64) -> f64 {
        let mut total = 0.0;
        for trade in &self.trades {
            total += trade.mtm(spot);
        }
        total
    }

    pub fn net_exposure(&self, spot: f64) -> f64 {
        self.net_mtm(spot).max(0.0)
    }
}

fn main() {
    let mut set = NettingSet::new("ACME Bank");
    set.add(Trade { id: 1, instrument: Instrument::Forward { strike: 100.0 }, quantity: 1_000.0 });
    set.add(Trade { id: 2, instrument: Instrument::Forward { strike: 105.0 }, quantity: -800.0 });
    println!("{} : exposition nette {}", set.counterparty, set.net_exposure(110.0)); // 6000
}`,
          caption: {
            fr: "`trades` n'est pas `pub` : on ne peut ajouter un trade que par `add`. C'est l'encapsulation à la Rust, au niveau du module.",
            en: "`trades` is not `pub`: a trade can only be added through `add`. That is encapsulation the Rust way, at module level.",
          },
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Dans le dépôt riskforge, la branche main contient ces types avec des `todo!()` et les tests correspondants. Implémente-les, puis compare avec la branche solutions.",
            en: "In the riskforge repository, the main branch holds these types with `todo!()` bodies and the matching tests. Implement them, then compare with the solutions branch.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute `gross_exposure`, la somme des expositions de chaque trade pris isolément (sans netting), et compare-la à l'exposition nette.",
          en: "Add `gross_exposure`, the sum of each trade's exposure taken on its own (without netting), and compare it with the net exposure.",
        },
        starterCode: `struct Trade {
    strike: f64,
    quantity: f64,
}

impl Trade {
    fn mtm(&self, spot: f64) -> f64 {
        (spot - self.strike) * self.quantity
    }
}

struct NettingSet {
    trades: Vec<Trade>,
}

impl NettingSet {
    fn net_exposure(&self, spot: f64) -> f64 {
        let mut total = 0.0;
        for trade in &self.trades {
            total += trade.mtm(spot);
        }
        total.max(0.0)
    }

    // ajoute gross_exposure ici
}

fn main() {
    let set = NettingSet {
        trades: vec![
            Trade { strike: 100.0, quantity: 1_000.0 },
            Trade { strike: 105.0, quantity: -800.0 },
        ],
    };
    println!("net = {}", set.net_exposure(110.0)); // 6000
    println!("brut = {}", set.gross_exposure(110.0)); // 10000
}`,
        solutionCode: `struct Trade {
    strike: f64,
    quantity: f64,
}

impl Trade {
    fn mtm(&self, spot: f64) -> f64 {
        (spot - self.strike) * self.quantity
    }
}

struct NettingSet {
    trades: Vec<Trade>,
}

impl NettingSet {
    fn net_exposure(&self, spot: f64) -> f64 {
        let mut total = 0.0;
        for trade in &self.trades {
            total += trade.mtm(spot);
        }
        total.max(0.0)
    }

    fn gross_exposure(&self, spot: f64) -> f64 {
        let mut total = 0.0;
        for trade in &self.trades {
            total += trade.mtm(spot).max(0.0);
        }
        total
    }
}

fn main() {
    let set = NettingSet {
        trades: vec![
            Trade { strike: 100.0, quantity: 1_000.0 },
            Trade { strike: 105.0, quantity: -800.0 },
        ],
    };
    println!("net = {}", set.net_exposure(110.0)); // 6000
    println!("brut = {}", set.gross_exposure(110.0)); // 10000
}`,
        hint: {
          fr: "Même boucle que `net_exposure`, mais le plancher à zéro s'applique à chaque trade, pas au total.",
          en: "Same loop as `net_exposure`, but the zero floor applies to each trade, not to the total.",
        },
        explanation: {
          fr: "Sans netting, le trade 1 (+10 000) compte plein pot et le trade 2 (-4 000) compte pour zéro : 10 000. Avec netting, ils se compensent : 6 000. Cet écart explique pourquoi les banques tiennent tant aux accords de compensation : ils réduisent le capital à mobiliser.",
          en: "Without netting, trade 1 (+10,000) counts in full and trade 2 (-4,000) counts as zero: 10,000. With netting they offset each other: 6,000. That gap is why banks care so much about netting agreements: they reduce the capital they must hold.",
        },
      },
    },
  ],
};
