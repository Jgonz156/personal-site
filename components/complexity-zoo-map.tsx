"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Category = "undecidable" | "np-complete" | "np-other" | "p"

interface ZooNode {
  id: string
  label: string
  x: number
  y: number
  category: Category
  caption: string
  emphasized?: boolean
}

interface Reduction {
  from: string
  to: string
}

const NODES: ZooNode[] = [
  {
    id: "halting",
    label: "Halting Problem",
    x: 300,
    y: 60,
    category: "undecidable",
    caption:
      "**Halting Problem** is *undecidable* — no algorithm can decide whether arbitrary programs terminate. We proved this in LN25 by contradiction. It sits outside every complexity class because the question 'how fast can we solve this?' assumes a solution exists at all. Many other problems are proven undecidable by *reducing the halting problem to them* — exactly the reducibility technique from LN25.",
  },
  {
    id: "sat",
    label: "SAT",
    x: 115,
    y: 215,
    category: "np-complete",
    caption:
      "**SAT** (Boolean satisfiability) is the *original* NP-complete problem (Cook–Levin, 1971). Given a Boolean formula, is there an assignment that makes it true? Verifying a candidate is easy — just plug it in. Finding one seems to require checking all 2ⁿ assignments.",
  },
  {
    id: "3sat",
    label: "3-SAT",
    x: 300,
    y: 215,
    category: "np-complete",
    emphasized: true,
    caption:
      "**3-SAT** is the *keystone* of NP-completeness. Karp's 1972 paper proved 3-SAT reduces to 21 other problems, which is why this orange region is so densely interconnected. **If anyone finds a polynomial-time algorithm for 3-SAT, ALL NP-complete problems collapse into P** — and the orange region merges into the green one. That single result is worth $1M from the Clay Mathematics Institute.",
  },
  {
    id: "vc",
    label: "Vertex Cover",
    x: 485,
    y: 215,
    category: "np-complete",
    caption:
      "**Vertex Cover** (LN20 callback): find the smallest set of vertices that touches every edge of a graph. NP-complete because 3-SAT reduces to it (Karp 1972). Equivalent up to complement to *Independent Set* — solving one solves both.",
  },
  {
    id: "color",
    label: "Graph Coloring",
    x: 115,
    y: 265,
    category: "np-complete",
    caption:
      "**Graph Coloring** (LN23 callback — chromatic number): can a graph be colored with k colors so that no two adjacent vertices share a color? NP-complete for k ≥ 3. The 4-color theorem says planar graphs always need ≤ 4, but actually *finding* the coloring is the hard part.",
  },
  {
    id: "tsp",
    label: "TSP",
    x: 300,
    y: 265,
    category: "np-complete",
    caption:
      "**Traveling Salesman**: visit every city once and return home with minimum total distance. The decision version (does a tour of length ≤ L exist?) is NP-complete; the optimization version is NP-hard. Real routing systems (UPS, airlines, chip layout) use heuristics and approximations because exact solutions are infeasible at scale.",
  },
  {
    id: "ham",
    label: "Hamilton Cycle",
    x: 485,
    y: 265,
    category: "np-complete",
    caption:
      "**Hamilton Cycle** (LN20 callback): does a graph have a cycle that visits every vertex exactly once? NP-complete. Reduces directly to TSP by giving each edge weight 1. Compare to **Euler cycle** from LN20: Euler is in P (just check vertex degrees), Hamilton is NP-complete. Tiny change in problem statement, exponential change in difficulty.",
  },
  {
    id: "iso",
    label: "Graph Isomorphism",
    x: 200,
    y: 335,
    category: "np-other",
    caption:
      "**Graph Isomorphism**: are two graphs structurally identical? In NP (verify by checking the bijection), but **not known to be in P or NP-complete**. Lives in a mysterious middle zone. Babai's 2015 quasi-polynomial algorithm got famously close to P, but the question remains open.",
  },
  {
    id: "factor",
    label: "Integer Factoring",
    x: 400,
    y: 335,
    category: "np-other",
    caption:
      "**Integer Factoring** is in NP (verify by multiplication) but **not known to be in P or NP-complete**. **All of RSA's security depends on factoring being hard** — see the RSA Playground above. Shor's quantum algorithm factors in polynomial time, which is why RSA is post-quantum vulnerable.",
  },
  {
    id: "sort",
    label: "Sorting",
    x: 95,
    y: 425,
    category: "p",
    caption:
      "**Sorting** is in P. Comparison-based sorts run in O(n log n) — *provably optimal* via a counting argument (LN17 combinatorics + LN25 contradiction): there are n! permutations, and a binary decision tree of depth d distinguishes only 2^d cases, so d ≥ log₂(n!) ≈ n log n.",
  },
  {
    id: "dijkstra",
    label: "Dijkstra",
    x: 215,
    y: 425,
    category: "p",
    caption:
      "**Dijkstra's Shortest Path** (LN23 callback) runs in O((V+E) log V) — polynomial in the input size, so firmly in P. The greedy structure plus induction proof of correctness from LN23 is the playbook for many P algorithms.",
  },
  {
    id: "mst",
    label: "MST",
    x: 335,
    y: 425,
    category: "p",
    caption:
      "**Minimum Spanning Tree** (LN23 callback): Kruskal and Prim both run in O(E log V). In P. Both are greedy algorithms whose correctness is proved by exchange arguments — a cousin of LN25's reducibility flavor.",
  },
  {
    id: "primality",
    label: "Primality",
    x: 455,
    y: 425,
    category: "p",
    caption:
      "**Primality Testing** (LN7 callback): is n prime? In P since AKS (2002), running in O(log⁷ n). *Easier than factoring!* You can decide primality without producing factors. This asymmetry is exactly what makes RSA possible: easy to *generate* primes, hard to *factor* their products.",
  },
  {
    id: "2sat",
    label: "2-SAT",
    x: 300,
    y: 462,
    category: "p",
    caption:
      "**2-SAT** is the easy cousin of 3-SAT. Same problem (satisfy a Boolean formula), but each clause has only 2 literals. Solvable in *linear time* via the implication graph and strongly connected components — graph theory from LN21! Tiny restriction on the problem, exponential drop in difficulty. The boundary between P and NP-complete is razor-thin.",
  },
]

const REDUCTIONS: Reduction[] = [
  { from: "sat", to: "3sat" },
  { from: "3sat", to: "vc" },
  { from: "3sat", to: "color" },
  { from: "3sat", to: "tsp" },
  { from: "ham", to: "tsp" },
]

const NODE_W = 110
const NODE_H = 28

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith("**")) {
      parts.push(
        <strong key={key++} className="font-semibold">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else {
      parts.push(
        <em key={key++} className="italic">
          {tok.slice(1, -1)}
        </em>,
      )
    }
    last = regex.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function ComplexityZooMap() {
  const [selected, setSelected] = useState<string | null>(null)
  const [pEqualsNp, setPEqualsNp] = useState(false)

  const selectedNode = NODES.find((n) => n.id === selected) ?? null

  const ncFill = pEqualsNp ? "rgba(34,197,94,0.18)" : "rgba(245,158,11,0.18)"
  const ncStroke = pEqualsNp ? "#22c55e" : "#f59e0b"

  const categoryFill = (cat: Category): string => {
    if (cat === "undecidable") return "#fecaca"
    if (cat === "np-complete") return pEqualsNp ? "#bbf7d0" : "#fed7aa"
    if (cat === "np-other") return "#fef9c3"
    return "#bbf7d0"
  }
  const categoryStroke = (cat: Category): string => {
    if (cat === "undecidable") return "#dc2626"
    if (cat === "np-complete") return pEqualsNp ? "#16a34a" : "#ea580c"
    if (cat === "np-other") return "#ca8a04"
    return "#16a34a"
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-3">
        <span className="font-semibold text-sm">
          The Complexity Zoo — interactive map
        </span>
        <div className="flex items-center gap-2">
          {selected && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelected(null)}
              className="h-7 text-xs"
            >
              Clear selection
            </Button>
          )}
          <Button
            size="sm"
            variant={pEqualsNp ? "default" : "outline"}
            onClick={() => setPEqualsNp(!pEqualsNp)}
            className="h-7 text-xs"
          >
            {pEqualsNp ? "Showing: P = NP world" : "Imagine: P = NP"}
          </Button>
        </div>
      </div>

      <svg
        viewBox="0 0 600 500"
        className="w-full h-auto"
        style={{ maxHeight: "560px" }}
      >
        <defs>
          <marker
            id="zoo-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#6366f1" />
          </marker>
        </defs>

        {/* Undecidable region */}
        <rect
          x={15}
          y={15}
          width={570}
          height={75}
          rx={12}
          fill="rgba(220,38,38,0.10)"
          stroke="#dc2626"
          strokeWidth={1.5}
          strokeDasharray="6 4"
        />
        <text
          x={32}
          y={34}
          className="fill-red-700 dark:fill-red-400"
          fontSize="11"
          fontWeight="700"
          letterSpacing="1"
        >
          UNDECIDABLE — no algorithm exists at any time bound
        </text>

        {/* NP outer region */}
        <rect
          x={15}
          y={110}
          width={570}
          height={380}
          rx={14}
          fill="rgba(250,204,21,0.10)"
          stroke="#ca8a04"
          strokeWidth={1.5}
        />
        <text
          x={32}
          y={130}
          className="fill-yellow-700 dark:fill-yellow-300"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1"
        >
          NP — verifiable in polynomial time
        </text>

        {/* NP-Complete inner region */}
        <rect
          x={45}
          y={150}
          width={510}
          height={145}
          rx={12}
          fill={ncFill}
          stroke={ncStroke}
          strokeWidth={1.5}
        />
        <text
          x={62}
          y={170}
          className="fill-orange-700 dark:fill-orange-300"
          fontSize="12"
          fontWeight="700"
          letterSpacing="0.5"
          style={{ fill: pEqualsNp ? undefined : undefined }}
        >
          {pEqualsNp ? "NP-Complete = P (collapsed)" : "NP-Complete — every NP problem reduces to these"}
        </text>

        {/* "Other NP" label */}
        <text
          x={300}
          y={312}
          textAnchor="middle"
          fontSize="10"
          fontStyle="italic"
          className="fill-muted-foreground"
        >
          Other NP problems — status unknown
        </text>

        {/* P inner region */}
        <rect
          x={45}
          y={365}
          width={510}
          height={120}
          rx={12}
          fill="rgba(34,197,94,0.18)"
          stroke="#16a34a"
          strokeWidth={1.5}
        />
        <text
          x={62}
          y={385}
          className="fill-green-700 dark:fill-green-400"
          fontSize="12"
          fontWeight="700"
          letterSpacing="0.5"
        >
          P — solvable in polynomial time
        </text>

        {/* P = NP? connector */}
        {pEqualsNp ? (
          <>
            <line
              x1={300}
              y1={295}
              x2={300}
              y2={365}
              stroke="#16a34a"
              strokeWidth={3}
            />
            <rect
              x={272}
              y={318}
              width={56}
              height={20}
              rx={10}
              fill="#16a34a"
            />
            <text
              x={300}
              y={332}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="white"
            >
              P = NP ✓
            </text>
          </>
        ) : (
          <>
            <line
              x1={300}
              y1={295}
              x2={300}
              y2={365}
              stroke="#eab308"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            <rect
              x={272}
              y={318}
              width={56}
              height={20}
              rx={10}
              fill="#fef9c3"
              stroke="#eab308"
              strokeWidth={1.5}
            />
            <text
              x={300}
              y={332}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              className="fill-yellow-800"
            >
              P = NP?
            </text>
          </>
        )}

        {/* Reduction arrows */}
        {REDUCTIONS.map(({ from, to }) => {
          const a = NODES.find((n) => n.id === from)!
          const b = NODES.find((n) => n.id === to)!
          // Compute edge endpoints on the rounded-rect borders (approximate)
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy)
          const ux = dx / dist
          const uy = dy / dist
          // Offset from center of node by half-width along the dominant axis
          const ax = a.x + ux * (NODE_W / 2 + 2)
          const ay = a.y + uy * (NODE_H / 2 + 2)
          const bx = b.x - ux * (NODE_W / 2 + 8)
          const by = b.y - uy * (NODE_H / 2 + 8)
          const isActive =
            selected !== null && (selected === from || selected === to)
          return (
            <line
              key={`${from}-${to}`}
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke={isActive ? "#4f46e5" : "#6366f1"}
              strokeWidth={isActive ? 2.5 : 1.5}
              opacity={isActive ? 1 : 0.55}
              markerEnd="url(#zoo-arrow)"
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((n) => {
          const isSelected = selected === n.id
          const isNcEquiv =
            selected !== null &&
            n.category === "np-complete" &&
            NODES.find((m) => m.id === selected)?.category === "np-complete"
          const fill = categoryFill(n.category)
          const stroke = categoryStroke(n.category)
          return (
            <g
              key={n.id}
              onClick={() => setSelected(n.id === selected ? null : n.id)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={n.x - NODE_W / 2}
                y={n.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={14}
                fill={fill}
                stroke={isSelected ? "#1e40af" : stroke}
                strokeWidth={isSelected ? 3 : isNcEquiv ? 2 : n.emphasized ? 2 : 1.25}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontSize={n.emphasized ? 12 : 11}
                fontWeight={n.emphasized || isSelected ? 700 : 600}
                className="fill-foreground"
                style={{ pointerEvents: "none" }}
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="px-4 py-3 border-t bg-muted/20 text-sm leading-relaxed min-h-[5.5rem]">
        {selectedNode ? (
          <p>{renderInlineMarkdown(selectedNode.caption)}</p>
        ) : pEqualsNp ? (
          <p className="text-muted-foreground">
            <strong className="text-foreground font-semibold">
              In this hypothetical world,
            </strong>{" "}
            every NP-complete problem has a polynomial-time algorithm. RSA
            breaks. Optimization becomes trivial. Most CS researchers don&apos;t
            believe we live here — but no one has proved it. Toggle off to
            return to the consensus view, or click any node to learn about it.
          </p>
        ) : (
          <p className="text-muted-foreground">
            <strong className="text-foreground font-semibold">
              Click any problem
            </strong>{" "}
            to learn about it. Indigo arrows are <em>polynomial-time
            reductions</em> — the exact technique from LN25. The dashed gold
            arc is the biggest open problem in CS:{" "}
            <strong className="text-foreground font-semibold">
              does P = NP?
            </strong>{" "}
            Most NP-complete problems are linked to <strong>3-SAT</strong>{" "}
            because that&apos;s how Karp originally proved them all hard.
          </p>
        )}
      </div>
    </div>
  )
}
