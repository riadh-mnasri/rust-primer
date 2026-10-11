import type { Module } from "../types";

export const collections: Module = {
  id: "collections",
  slug: "collections",
  title: { fr: "Collections", en: "Collections" },
  description: {
    fr: "Vec, String et HashMap : les structures de données du quotidien.",
    en: "Vec, String and HashMap: the everyday data structures.",
  },
  status: "available",
  lessons: [
    {
      id: "vectors",
      slug: "vectors",
      title: { fr: "Vec<T>", en: "Vec<T>" },
      summary: {
        fr: "Le tableau dynamique : ajouter, lire sans risque, modifier, trier.",
        en: "The growable array: add, read safely, modify, sort.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "`Vec<T>` est un tableau qui grandit à l'exécution, l'équivalent d'un `ArrayList` Java. Ses éléments sont contigus en mémoire, ce qui le rend très rapide à parcourir. On le crée vide avec `Vec::new()` ou rempli avec la macro `vec!`.",
            en: "`Vec<T>` is an array that grows at runtime, the equivalent of a Java `ArrayList`. Its elements sit next to each other in memory, which makes it very fast to iterate. You create it empty with `Vec::new()` or filled with the `vec!` macro.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let mut prices: Vec<f64> = Vec::new();
    prices.push(101.5);
    prices.push(99.8);
    prices.push(103.2);

    let tenors = vec![1, 2, 5, 10];
    println!("{} prix, {} tenors", prices.len(), tenors.len());

    let last = prices.pop(); // Option<f64> : le Vec peut être vide
    println!("{last:?} retiré, reste {prices:?}");
}`,
        },
        {
          type: "text",
          text: {
            fr: "Deux façons de lire un élément. L'index `v[i]` renvoie la valeur directement mais panique si `i` est hors limites. `v.get(i)` renvoie une `Option` : `Some(&valeur)` ou `None`. Utilise l'index quand un débordement serait un bug, et `get` quand l'absence est un cas normal.",
            en: "Two ways to read an element. Indexing `v[i]` returns the value directly but panics if `i` is out of bounds. `v.get(i)` returns an `Option`: `Some(&value)` or `None`. Use indexing when going out of bounds would be a bug, and `get` when absence is a normal case.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let curve = vec![0.010, 0.015, 0.021];
    println!("{}", curve[1]);

    match curve.get(10) {
        Some(rate) => println!("taux : {rate}"),
        None => println!("pas de point à cet indice"),
    }

    let mut shocked = curve.clone();
    for rate in shocked.iter_mut() {
        *rate *= 2.0;
    }
    println!("{shocked:?}"); // [0.02, 0.03, 0.042]
}`,
        },
        {
          type: "text",
          text: {
            fr: "Piège classique : `sort()` ne marche pas sur un `Vec<f64>`. Les flottants n'ont pas d'ordre total à cause de NaN (NaN n'est ni plus petit ni plus grand que 1.0). On trie donc avec `sort_by` et la fonction `f64::total_cmp`, qui définit un ordre complet, NaN compris.",
            en: "A classic trap: `sort()` does not work on a `Vec<f64>`. Floats have no total order because of NaN (NaN is neither smaller nor greater than 1.0). So you sort with `sort_by` and the `f64::total_cmp` function, which defines a complete order, NaN included.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let mut exposures = vec![450.0, 1_200.0, 0.0, 330.0];
    // exposures.sort(); // erreur : the trait \`Ord\` is not implemented for \`f64\`
    exposures.sort_by(f64::total_cmp);
    println!("{exposures:?}");

    let mut ids = vec![42, 7, 19];
    ids.sort(); // les entiers ont un ordre total : sort() suffit
    println!("{ids:?}");
}`,
        },
        {
          type: "callout",
          variant: "tip",
          text: {
            fr: "Si tu connais la taille finale, `Vec::with_capacity(n)` réserve la mémoire d'un coup et évite les réallocations successives. Avec 10 000 scénarios, la différence se mesure.",
            en: "If you know the final size, `Vec::with_capacity(n)` reserves the memory in one go and avoids repeated reallocations. With 10,000 scenarios, the difference is measurable.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris `percentile` qui trie une copie des valeurs et renvoie celle située à la position `p` (entre 0 et 1). C'est la base de la PFE, qui est un percentile élevé des expositions.",
          en: "Write `percentile`, which sorts a copy of the values and returns the one at position `p` (between 0 and 1). This is the basis of PFE, which is a high percentile of exposures.",
        },
        starterCode: `fn percentile(values: &[f64], p: f64) -> f64 {
    todo!()
}

fn main() {
    let exposures = [0.0, 50.0, 330.0, 120.0, 1_200.0, 80.0, 450.0, 0.0, 60.0, 900.0];
    println!("{}", percentile(&exposures, 0.9)); // 1200
    println!("{}", percentile(&exposures, 0.5)); // 120
}`,
        solutionCode: `fn percentile(values: &[f64], p: f64) -> f64 {
    let mut sorted = values.to_vec();
    sorted.sort_by(f64::total_cmp);
    let index = (p * sorted.len() as f64) as usize;
    sorted[index.min(sorted.len() - 1)]
}

fn main() {
    let exposures = [0.0, 50.0, 330.0, 120.0, 1_200.0, 80.0, 450.0, 0.0, 60.0, 900.0];
    println!("{}", percentile(&exposures, 0.9)); // 1200
    println!("{}", percentile(&exposures, 0.5)); // 120
}`,
        hint: {
          fr: "`values.to_vec()` crée un `Vec` copié depuis la slice : on ne peut pas trier une slice empruntée en lecture seule.",
          en: "`values.to_vec()` creates a `Vec` copied from the slice: you cannot sort a read-only borrowed slice.",
        },
        explanation: {
          fr: "`.min(len - 1)` protège contre p = 1.0, qui donnerait un indice égal à la longueur. Il existe plusieurs conventions de percentile (avec ou sans interpolation) ; on garde la plus simple, on affinera pour la PFE.",
          en: "`.min(len - 1)` guards against p = 1.0, which would produce an index equal to the length. There are several percentile conventions (with or without interpolation); we keep the simplest and will refine it for PFE.",
        },
      },
    },
    {
      id: "strings",
      slug: "strings",
      title: { fr: "String et &str", en: "String and &str" },
      summary: {
        fr: "Texte possédé ou emprunté, UTF-8, et pourquoi s[0] n'existe pas.",
        en: "Owned or borrowed text, UTF-8, and why s[0] does not exist.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Rust a deux types de texte principaux. `String` possède son contenu, sur le tas, et peut grandir. `&str` est une vue empruntée sur du texte, comme une slice. Les littéraux entre guillemets sont des `&str`. Une règle simple : stocke des `String` dans tes structs, prends des `&str` en paramètre.",
            en: "Rust has two main text types. `String` owns its content, on the heap, and can grow. `&str` is a borrowed view over text, like a slice. String literals in quotes are `&str`. A simple rule: store `String` in your structs, take `&str` as parameters.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let mut label = String::from("ACME");
    label.push_str(" Bank");
    label.push('!');

    let id = 42;
    let key = format!("{label}#{id}"); // format! construit une String sans rien consommer
    println!("{key}");

    let view: &str = &label[..4];
    println!("{view}");
}`,
        },
        {
          type: "text",
          text: {
            fr: "Les chaînes sont toujours en UTF-8. Un caractère peut occuper de 1 à 4 octets, donc `len()` compte des octets et non des caractères, et l'indexation `s[0]` n'existe pas : elle pourrait tomber au milieu d'un caractère. Pour parcourir les caractères, on utilise `chars()`.",
            en: "Strings are always UTF-8. A character can take 1 to 4 bytes, so `len()` counts bytes rather than characters, and indexing with `s[0]` does not exist: it could land in the middle of a character. To walk the characters, use `chars()`.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let city = "Zürich";
    println!("{} octets, {} caractères", city.len(), city.chars().count()); // 7, 6
    // let first = city[0]; // erreur : String cannot be indexed by integer
    let first = city.chars().next();
    println!("{first:?}");
}`,
        },
        {
          type: "text",
          text: {
            fr: "Les méthodes les plus utiles pour lire des données : `trim` enlève les espaces autour, `split` découpe selon un séparateur, `parse` convertit du texte en nombre. `parse` peut échouer (\"abc\" n'est pas un nombre), il renvoie donc un `Result` : on l'étudiera en détail au module suivant.",
            en: "The most useful methods for reading data: `trim` strips surrounding whitespace, `split` cuts on a separator, `parse` turns text into a number. `parse` can fail (\"abc\" is not a number), so it returns a `Result`: we will study it in detail in the next module.",
          },
        },
        {
          type: "code",
          code: `fn main() {
    let line = "  7, ACME Bank , 1000000.5 ";
    for field in line.split(',') {
        println!("[{}]", field.trim());
    }

    let notional: f64 = "1000000.5".parse().unwrap();
    println!("{notional}");
}`,
          caption: {
            fr: "`unwrap()` panique si la conversion échoue. Acceptable dans un exemple, interdit dans riskforge : on le remplacera par une vraie gestion d'erreur.",
            en: "`unwrap()` panics if the conversion fails. Fine in an example, banned in riskforge: we will replace it with real error handling.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Écris `normalize_counterparty` qui retire les espaces autour du nom et le met en majuscules, pour que \" acme bank \" et \"ACME Bank\" désignent la même contrepartie.",
          en: "Write `normalize_counterparty`, which strips surrounding spaces and uppercases the name, so that \" acme bank \" and \"ACME Bank\" refer to the same counterparty.",
        },
        starterCode: `fn normalize_counterparty(name: &str) -> String {
    todo!()
}

fn main() {
    println!("{}", normalize_counterparty(" acme bank ")); // ACME BANK
    println!("{}", normalize_counterparty("ACME Bank") == normalize_counterparty(" acme bank ")); // true
}`,
        solutionCode: `fn normalize_counterparty(name: &str) -> String {
    name.trim().to_uppercase()
}

fn main() {
    println!("{}", normalize_counterparty(" acme bank ")); // ACME BANK
    println!("{}", normalize_counterparty("ACME Bank") == normalize_counterparty(" acme bank ")); // true
}`,
        hint: {
          fr: "`trim()` renvoie un `&str`, et `to_uppercase()` crée une nouvelle `String`.",
          en: "`trim()` returns a `&str`, and `to_uppercase()` creates a new `String`.",
        },
        explanation: {
          fr: "Le paramètre est un `&str` (on lit seulement), le retour une `String` (on crée un nouveau texte). `to_uppercase` gère l'Unicode correctement : \"zürich\" devient \"ZÜRICH\".",
          en: "The parameter is a `&str` (we only read), the return value a `String` (we create new text). `to_uppercase` handles Unicode correctly: \"zürich\" becomes \"ZÜRICH\".",
        },
      },
    },
    {
      id: "hashmaps",
      slug: "hashmaps",
      title: { fr: "HashMap", en: "HashMap" },
      summary: {
        fr: "Associer des clés à des valeurs, et l'API entry.",
        en: "Map keys to values, and the entry API.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "`HashMap<K, V>` associe des clés à des valeurs, comme un `HashMap` Java. Il faut l'importer depuis `std::collections`. `insert` ajoute ou remplace, `get` renvoie une `Option<&V>` puisque la clé peut manquer.",
            en: "`HashMap<K, V>` maps keys to values, like a Java `HashMap`. It has to be imported from `std::collections`. `insert` adds or replaces, `get` returns an `Option<&V>` since the key may be missing.",
          },
        },
        {
          type: "code",
          code: `use std::collections::HashMap;

fn main() {
    let mut fx: HashMap<String, f64> = HashMap::new();
    fx.insert(String::from("EURUSD"), 1.0842);
    fx.insert(String::from("EURGBP"), 0.8571);

    match fx.get("EURUSD") {
        Some(rate) => println!("EURUSD = {rate}"),
        None => println!("taux inconnu"),
    }

    for (pair, rate) in &fx {
        println!("{pair} -> {rate}");
    }
}`,
          caption: {
            fr: "L'ordre de parcours d'une HashMap n'est pas garanti et change d'une exécution à l'autre. Si l'ordre compte, utilise `BTreeMap`, triée par clé.",
            en: "A HashMap's iteration order is not guaranteed and changes between runs. If order matters, use `BTreeMap`, sorted by key.",
          },
        },
        {
          type: "text",
          text: {
            fr: "L'API `entry` est l'outil le plus idiomatique : elle donne accès à l'emplacement d'une clé, qu'elle existe ou non. `or_insert(v)` insère `v` si la clé est absente, puis renvoie une référence mutable vers la valeur. Parfait pour compter ou cumuler.",
            en: "The `entry` API is the most idiomatic tool: it gives access to a key's slot whether it exists or not. `or_insert(v)` inserts `v` if the key is missing, then returns a mutable reference to the value. Perfect for counting or accumulating.",
          },
        },
        {
          type: "code",
          code: `use std::collections::BTreeMap;

fn main() {
    let trades = [("ACME", 1_000.0), ("Globex", 250.0), ("ACME", -300.0)];

    let mut net_by_counterparty: BTreeMap<&str, f64> = BTreeMap::new();
    for (counterparty, mtm) in trades {
        *net_by_counterparty.entry(counterparty).or_insert(0.0) += mtm;
    }
    println!("{net_by_counterparty:?}"); // {"ACME": 700.0, "Globex": 250.0}
}`,
        },
        {
          type: "callout",
          variant: "note",
          text: {
            fr: "Une `HashMap` devient propriétaire de ce qu'on y insère. Insérer une `String` la déplace dans la map ; insérer un `&str` exige que le texte vive plus longtemps que la map. Le compilateur vérifie les deux.",
            en: "A `HashMap` takes ownership of what you insert. Inserting a `String` moves it into the map; inserting a `&str` requires the text to outlive the map. The compiler checks both.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Compte le nombre de trades par contrepartie avec l'API `entry`, puis affiche le résultat trié par nom.",
          en: "Count the number of trades per counterparty with the `entry` API, then print the result sorted by name.",
        },
        starterCode: `use std::collections::BTreeMap;

fn main() {
    let counterparties = ["ACME", "Globex", "ACME", "Initech", "ACME", "Globex"];
    // compte ici
    // attendu : {"ACME": 3, "Globex": 2, "Initech": 1}
}`,
        solutionCode: `use std::collections::BTreeMap;

fn main() {
    let counterparties = ["ACME", "Globex", "ACME", "Initech", "ACME", "Globex"];
    let mut counts: BTreeMap<&str, u32> = BTreeMap::new();
    for name in counterparties {
        *counts.entry(name).or_insert(0) += 1;
    }
    println!("{counts:?}");
}`,
        hint: {
          fr: "`*counts.entry(name).or_insert(0) += 1;` : l'étoile modifie la valeur pointée par la référence mutable.",
          en: "`*counts.entry(name).or_insert(0) += 1;`: the star modifies the value behind the mutable reference.",
        },
        explanation: {
          fr: "Une seule recherche dans la map par élément, au lieu de deux avec un `get` suivi d'un `insert`. Et `BTreeMap` donne directement l'ordre alphabétique.",
          en: "A single map lookup per element, instead of two with a `get` followed by an `insert`. And `BTreeMap` directly gives alphabetical order.",
        },
      },
    },
    {
      id: "project-portfolio",
      kind: "project",
      slug: "project-portfolio",
      title: { fr: "Fil rouge : un portefeuille multi-contreparties", en: "Project: a multi-counterparty portfolio" },
      summary: {
        fr: "Ranger les trades par contrepartie dans une HashMap de netting sets.",
        en: "File trades by counterparty in a HashMap of netting sets.",
      },
      sections: [
        {
          type: "text",
          text: {
            fr: "Une banque n'a pas une contrepartie mais des centaines, chacune avec son netting set. On crée donc un `Portfolio` qui range les trades par contrepartie : une `HashMap<String, NettingSet>`. Ajouter un trade, c'est trouver (ou créer) le bon netting set, exactement le travail de l'API `entry`.",
            en: "A bank does not have one counterparty but hundreds, each with its netting set. So we create a `Portfolio` that files trades by counterparty: a `HashMap<String, NettingSet>`. Adding a trade means finding (or creating) the right netting set, which is exactly the job of the `entry` API.",
          },
        },
        {
          type: "code",
          label: "src/portfolio.rs",
          code: `use std::collections::{BTreeMap, HashMap};

#[derive(Debug)]
pub struct NettingSet {
    pub counterparty: String,
    mtms: Vec<f64>,
}

impl NettingSet {
    pub fn new(counterparty: &str) -> Self {
        Self { counterparty: counterparty.to_string(), mtms: Vec::new() }
    }
    pub fn add(&mut self, mtm: f64) {
        self.mtms.push(mtm);
    }
    pub fn net_exposure(&self) -> f64 {
        let mut total = 0.0;
        for mtm in &self.mtms {
            total += mtm;
        }
        total.max(0.0)
    }
}

#[derive(Debug, Default)]
pub struct Portfolio {
    netting_sets: HashMap<String, NettingSet>,
}

impl Portfolio {
    pub fn add(&mut self, counterparty: &str, mtm: f64) {
        self.netting_sets
            .entry(counterparty.to_string())
            .or_insert(NettingSet::new(counterparty))
            .add(mtm);
    }

    /// Exposition nette par contrepartie, triée par nom.
    pub fn exposures(&self) -> BTreeMap<String, f64> {
        let mut result = BTreeMap::new();
        for (name, set) in &self.netting_sets {
            result.insert(name.clone(), set.net_exposure());
        }
        result
    }
}

fn main() {
    let mut portfolio = Portfolio::default();
    portfolio.add("ACME", 10_000.0);
    portfolio.add("Globex", -2_000.0);
    portfolio.add("ACME", -4_000.0);
    println!("{:?}", portfolio.exposures()); // {"ACME": 6000.0, "Globex": 0.0}
}`,
          caption: {
            fr: "Version simplifiée (des MtM au lieu de vrais trades) pour se concentrer sur la HashMap. Dans le dépôt riskforge, le Portfolio range les vrais `Trade` de l'étape précédente.",
            en: "A simplified version (MtMs instead of real trades) to focus on the HashMap. In the riskforge repository, the Portfolio files the real `Trade` values from the previous step.",
          },
        },
        {
          type: "text",
          text: {
            fr: "`#[derive(Default)]` génère un `Portfolio::default()` avec une map vide, sans écrire de `new`. Et `exposures` renvoie une `BTreeMap` pour que le rapport sorte toujours dans le même ordre : indispensable pour comparer deux exécutions ou écrire des tests.",
            en: "`#[derive(Default)]` generates a `Portfolio::default()` with an empty map, without writing a `new`. And `exposures` returns a `BTreeMap` so the report always comes out in the same order: essential to compare two runs or to write tests.",
          },
        },
        {
          type: "callout",
          variant: "warning",
          text: {
            fr: "`or_insert(NettingSet::new(...))` construit le netting set à chaque appel, même quand la clé existe déjà (il est alors jeté). `or_insert_with` évite ce gaspillage en ne le construisant qu'au besoin, mais il prend une closure : on le reverra au module sur les closures.",
            en: "`or_insert(NettingSet::new(...))` builds the netting set on every call, even when the key already exists (it is then thrown away). `or_insert_with` avoids that waste by building it only when needed, but it takes a closure: we will come back to it in the closures module.",
          },
        },
      ],
      exercise: {
        prompt: {
          fr: "Ajoute `total_exposure`, qui additionne les expositions nettes de toutes les contreparties. C'est le chiffre qu'un risk manager regarde en premier.",
          en: "Add `total_exposure`, which sums the net exposures of every counterparty. It is the first number a risk manager looks at.",
        },
        starterCode: `use std::collections::HashMap;

#[derive(Default)]
struct Portfolio {
    net_mtm: HashMap<String, f64>,
}

impl Portfolio {
    fn add(&mut self, counterparty: &str, mtm: f64) {
        *self.net_mtm.entry(counterparty.to_string()).or_insert(0.0) += mtm;
    }

    // ajoute total_exposure ici
}

fn main() {
    let mut portfolio = Portfolio::default();
    portfolio.add("ACME", 10_000.0);
    portfolio.add("Globex", -2_000.0);
    portfolio.add("ACME", -4_000.0);
    portfolio.add("Initech", 1_500.0);
    println!("{}", portfolio.total_exposure()); // 7500
}`,
        solutionCode: `use std::collections::HashMap;

#[derive(Default)]
struct Portfolio {
    net_mtm: HashMap<String, f64>,
}

impl Portfolio {
    fn add(&mut self, counterparty: &str, mtm: f64) {
        *self.net_mtm.entry(counterparty.to_string()).or_insert(0.0) += mtm;
    }

    fn total_exposure(&self) -> f64 {
        let mut total = 0.0;
        for net in self.net_mtm.values() {
            total += net.max(0.0);
        }
        total
    }
}

fn main() {
    let mut portfolio = Portfolio::default();
    portfolio.add("ACME", 10_000.0);
    portfolio.add("Globex", -2_000.0);
    portfolio.add("ACME", -4_000.0);
    portfolio.add("Initech", 1_500.0);
    println!("{}", portfolio.total_exposure()); // 7500
}`,
        hint: {
          fr: "`self.net_mtm.values()` parcourt uniquement les valeurs ; applique le plancher à zéro par contrepartie, pas sur le total.",
          en: "`self.net_mtm.values()` walks the values only; apply the zero floor per counterparty, not on the total.",
        },
        explanation: {
          fr: "ACME 6 000, Globex 0 (on lui doit de l'argent, ce n'est pas une exposition), Initech 1 500 : 7 500. Le netting se fait à l'intérieur d'une contrepartie, jamais entre deux contreparties différentes : une dette envers Globex ne compense pas une créance sur ACME.",
          en: "ACME 6,000, Globex 0 (we owe them money, that is not an exposure), Initech 1,500: 7,500. Netting happens inside one counterparty, never across two different ones: a debt to Globex does not offset a claim on ACME.",
        },
      },
    },
  ],
};
