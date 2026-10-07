"use client";

import { useState } from "react";

const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "const",
  "continue",
  "crate",
  "dyn",
  "else",
  "enum",
  "extern",
  "false",
  "fn",
  "for",
  "if",
  "impl",
  "in",
  "let",
  "loop",
  "match",
  "mod",
  "move",
  "mut",
  "pub",
  "ref",
  "return",
  "self",
  "Self",
  "static",
  "struct",
  "super",
  "trait",
  "true",
  "type",
  "unsafe",
  "use",
  "where",
  "while",
]);

const PRIMITIVES = new Set([
  "i8",
  "i16",
  "i32",
  "i64",
  "i128",
  "isize",
  "u8",
  "u16",
  "u32",
  "u64",
  "u128",
  "usize",
  "f32",
  "f64",
  "bool",
  "char",
  "str",
]);

// Ordre des groupes : commentaire, attribut, chaîne, caractère, lifetime,
// nombre, macro, appel de fonction, identifiant, espaces, ponctuation.
const TOKEN_RE =
  /(\/\/.*$)|(#!?\[[^\]]*\])|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)')|('[a-z_][a-z0-9_]*)|(\b\d[\d_]*(?:\.\d[\d_]*)?(?:e-?\d+)?(?:_?[iuf](?:8|16|32|64|128|size))?\b)|([A-Za-z_][A-Za-z0-9_]*!)|([A-Za-z_][A-Za-z0-9_]*)(?=\()|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z0-9_]+)/g;

type Token = { text: string; kind?: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(line)) !== null) {
    const [full, comment, attribute, str, chr, lifetime, number, macro, funcCall, identifier] =
      match;

    if (comment !== undefined) tokens.push({ text: full, kind: "comment" });
    else if (attribute !== undefined) tokens.push({ text: full, kind: "attr" });
    else if (str !== undefined || chr !== undefined) tokens.push({ text: full, kind: "string" });
    else if (lifetime !== undefined) tokens.push({ text: full, kind: "keyword" });
    else if (number !== undefined) tokens.push({ text: full, kind: "number" });
    else if (macro !== undefined) tokens.push({ text: full, kind: "macro" });
    else if (funcCall !== undefined) {
      tokens.push({ text: full, kind: KEYWORDS.has(funcCall) ? "keyword" : "func" });
    } else if (identifier !== undefined) {
      if (KEYWORDS.has(identifier)) tokens.push({ text: full, kind: "keyword" });
      else if (PRIMITIVES.has(identifier) || /^[A-Z]/.test(identifier))
        tokens.push({ text: full, kind: "type" });
      else tokens.push({ text: full });
    } else tokens.push({ text: full });
  }
  return tokens;
}

const KIND_COLOR: Record<string, string> = {
  comment: "var(--code-comment)",
  attr: "var(--code-attr)",
  string: "var(--code-string)",
  number: "var(--code-number)",
  func: "var(--code-func)",
  macro: "var(--code-macro)",
  keyword: "var(--code-keyword)",
  type: "var(--code-type)",
};

const KIND_STYLE: Record<string, string> = {
  comment: "italic",
};

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // presse-papiers indisponible, on ignore
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl border"
      style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="font-mono text-xs" style={{ color: "var(--code-comment)" }}>
          {label ?? "rust"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-2 py-0.5 font-mono text-xs transition-colors hover:bg-white/10"
          style={{ color: "var(--code-fg)" }}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono" style={{ color: "var(--code-fg)" }}>
          {lines.map((line, i) => (
            <div key={i}>
              {line.length === 0
                ? " "
                : tokenizeLine(line).map((token, j) => (
                    <span
                      key={j}
                      style={{
                        color: token.kind ? KIND_COLOR[token.kind] : undefined,
                        fontStyle: token.kind ? KIND_STYLE[token.kind] : undefined,
                      }}
                    >
                      {token.text}
                    </span>
                  ))}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
