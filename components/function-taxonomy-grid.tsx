"use client"

import { Fragment } from "react"

interface TaxonomyCell {
  name: string
  progType: string
  mathType: string
  pythonSig: string
  example: string
}

const suppliers: TaxonomyCell[] = [
  {
    name: "Uni-Supplier",
    progType: "() → A",
    mathType: "f : ∅ → A",
    pythonSig: "def input() -> str",
    example: 'input() → "hello"',
  },
  {
    name: "Bi-Supplier",
    progType: "() → (A, B)",
    mathType: "f : ∅ → A × B",
    pythonSig: "def get_terminal_size() -> (int, int)",
    example: "os.get_terminal_size() → (80, 24)",
  },
  {
    name: "Tri-Supplier",
    progType: "() → (A, B, C)",
    mathType: "f : ∅ → A × B × C",
    pythonSig: "def today() -> (int, int, int)",
    example: "date.today().timetuple()[:3] → (2026, 2, 10)",
  },
]

const functions: TaxonomyCell[] = [
  {
    name: "Uni-Function",
    progType: "(A) → B",
    mathType: "f : A → B",
    pythonSig: "def len(s) -> int",
    example: 'len("hello") → 5',
  },
  {
    name: "Bi-Function",
    progType: "(A, B) → C",
    mathType: "f : A × B → C",
    pythonSig: "def pow(base, exp) -> int",
    example: "pow(2, 10) → 1024",
  },
  {
    name: "Tri-Function",
    progType: "(A, B, C) → D",
    mathType: "f : A × B × C → D",
    pythonSig: "def range(start, stop, step) -> range",
    example: "range(0, 10, 2) → [0, 2, 4, 6, 8]",
  },
]

const consumers: TaxonomyCell[] = [
  {
    name: "Uni-Consumer",
    progType: "(A) → ()",
    mathType: "f : A → ∅",
    pythonSig: 'def print(x) -> None',
    example: 'print("hi") → None',
  },
  {
    name: "Bi-Consumer",
    progType: "(A, B) → ()",
    mathType: "f : A × B → ∅",
    pythonSig: "def list.insert(i, x) -> None",
    example: "nums.insert(0, 99) → None",
  },
  {
    name: "Tri-Consumer",
    progType: "(A, B, C) → ()",
    mathType: "f : A × B × C → ∅",
    pythonSig: "def setattr(obj, name, val) -> None",
    example: 'setattr(obj, "x", 5) → None',
  },
]

interface PredicateCell {
  name: string
  progType: string
  mathType: string
  pythonSig: string
  example: string
}

const predicates: PredicateCell[] = [
  {
    name: "Uni-Predicate",
    progType: "(A) → bool",
    mathType: "P : A → 𝔹",
    pythonSig: "def str.isdigit() -> bool",
    example: '"42".isdigit() → True',
  },
  {
    name: "Bi-Predicate",
    progType: "(A, B) → bool",
    mathType: "P : A × B → 𝔹",
    pythonSig: "def isinstance(x, t) -> bool",
    example: "isinstance(5, int) → True",
  },
  {
    name: "Tri-Predicate",
    progType: "(A, B, C) → bool",
    mathType: "P : A × B × C → 𝔹",
    pythonSig: "def between(x, lo, hi) -> bool",
    example: "between(5, 1, 10) → True",
  },
]

function Cell({ cell, accent }: { cell: TaxonomyCell; accent: string }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 bg-background">
      <div className="font-semibold text-sm" style={{ color: accent }}>
        {cell.name}
      </div>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground shrink-0 w-12">type</span>
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono">
            {cell.progType}
          </code>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground shrink-0 w-12">math</span>
          <span className="font-serif italic">{cell.mathType}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground shrink-0 w-12">python</span>
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px] break-all">
            {cell.pythonSig}
          </code>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground shrink-0 w-12">e.g.</span>
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px] break-all">
            {cell.example}
          </code>
        </div>
      </div>
    </div>
  )
}

const COL_ACCENT = {
  supplier: "#22c55e",
  function: "#3b82f6",
  consumer: "#f59e0b",
}

const ARITY_LABELS = ["Uni", "Bi", "Tri"]

export function FunctionTaxonomyGrid() {
  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">
          📦 Function Taxonomy
        </span>
      </div>

      <div className="p-4 space-y-6">
        {/* Desktop: full 4-column grid with row labels */}
        <div className="hidden lg:grid grid-cols-[auto_1fr_1fr_1fr] gap-2">
          <div />
          <div className="text-center text-sm font-semibold pb-1" style={{ color: COL_ACCENT.supplier }}>
            Suppliers
          </div>
          <div className="text-center text-sm font-semibold pb-1" style={{ color: COL_ACCENT.function }}>
            Functions
          </div>
          <div className="text-center text-sm font-semibold pb-1" style={{ color: COL_ACCENT.consumer }}>
            Consumers
          </div>

          {ARITY_LABELS.map((label, row) => (
            <Fragment key={row}>
              <div className="flex items-center justify-center text-xs font-semibold text-muted-foreground pr-2">
                {label}
              </div>
              <Cell cell={suppliers[row]} accent={COL_ACCENT.supplier} />
              <Cell cell={functions[row]} accent={COL_ACCENT.function} />
              <Cell cell={consumers[row]} accent={COL_ACCENT.consumer} />
            </Fragment>
          ))}
        </div>

        {/* Mobile / tablet: stack by category */}
        <div className="lg:hidden space-y-4">
          {([
            { title: "Suppliers", data: suppliers, accent: COL_ACCENT.supplier },
            { title: "Functions", data: functions, accent: COL_ACCENT.function },
            { title: "Consumers", data: consumers, accent: COL_ACCENT.consumer },
          ] as const).map((group) => (
            <div key={group.title}>
              <div className="text-sm font-semibold mb-2" style={{ color: group.accent }}>
                {group.title}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {group.data.map((cell, i) => (
                  <Cell key={i} cell={cell} accent={group.accent} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Predicates section */}
        <div className="border-t pt-4">
          <div className="text-sm font-semibold mb-3" style={{ color: "#a855f7" }}>
            🔍 Predicates — Functions restricted to boolean output
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {predicates.map((p, i) => (
              <Cell key={`p-${i}`} cell={p} accent="#a855f7" />
            ))}
          </div>
        </div>

        {/* Procedures section */}
        <div className="border-t pt-4">
          <div className="text-sm font-semibold mb-3" style={{ color: "#ef4444" }}>
            ⚡ Procedures / Pragmas — No inputs, no outputs, side-effects only
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Cell
              cell={{
                name: "Procedure",
                progType: "() → ()",
                mathType: "f : ∅ → ∅",
                pythonSig: "def gc.collect() -> None",
                example: "gc.collect() → None",
              }}
              accent="#ef4444"
            />
            <Cell
              cell={{
                name: "Procedure",
                progType: "() → ()",
                mathType: "f : ∅ → ∅",
                pythonSig: "def plt.show() -> None",
                example: "plt.show() → None",
              }}
              accent="#ef4444"
            />
            <Cell
              cell={{
                name: "Procedure",
                progType: "() → ()",
                mathType: "f : ∅ → ∅",
                pythonSig: "def random.seed() -> None",
                example: "random.seed() → None",
              }}
              accent="#ef4444"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
