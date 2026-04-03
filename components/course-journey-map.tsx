"use client"

import { GraphVisualization } from "@/components/graph-visualization"
import type { GraphNode, GraphEdge } from "@/components/graph-visualization"

const STANDARD_COLORS: Record<string, string> = {
  syllabus: "#a1a1aa",
  logic: "#60a5fa",
  numbers: "#4ade80",
  collections: "#c084fc",
  functions: "#fb923c",
  combinatorics: "#2dd4bf",
  graphs: "#fb7185",
  synthesis: "#fbbf24",
}

const NODES: GraphNode[] = [
  { id: "LN0", label: "LN0\nSyllabus", color: STANDARD_COLORS.syllabus },

  { id: "LN1", label: "LN1\nLogic Intro", color: STANDARD_COLORS.logic },
  { id: "LN2", label: "LN2\nConnectives", color: STANDARD_COLORS.logic },
  { id: "LN3", label: "LN3\nDeduction", color: STANDARD_COLORS.logic },

  { id: "LN4", label: "LN4\nType Theory", color: STANDARD_COLORS.numbers },
  { id: "LN5", label: "LN5\nBooleans", color: STANDARD_COLORS.numbers },
  { id: "LN6", label: "LN6\nIntegers", color: STANDARD_COLORS.numbers },
  { id: "LN7", label: "LN7\nMod Arith", color: STANDARD_COLORS.numbers },

  { id: "LN8", label: "LN8\nTuples", color: STANDARD_COLORS.collections },
  { id: "LN9", label: "LN9\nSets", color: STANDARD_COLORS.collections },
  { id: "LN10", label: "LN10\nSet Ops", color: STANDARD_COLORS.collections },
  { id: "LN11", label: "LN11\nRelations", color: STANDARD_COLORS.collections },

  { id: "LN12", label: "LN12\nLambda Calc", color: STANDARD_COLORS.functions },
  { id: "LN13", label: "LN13\nVariables", color: STANDARD_COLORS.functions },
  { id: "LN14", label: "LN14\nReductions", color: STANDARD_COLORS.functions },
  { id: "LN15", label: "LN15\nInj/Surj/Bij", color: STANDARD_COLORS.functions },

  { id: "LN16", label: "LN16\nCounting", color: STANDARD_COLORS.combinatorics },
  { id: "LN17", label: "LN17\nPerm/Comb", color: STANDARD_COLORS.combinatorics },
  { id: "LN18", label: "LN18\nPascal", color: STANDARD_COLORS.combinatorics },
  { id: "LN19", label: "LN19\nBijective Proof", color: STANDARD_COLORS.combinatorics },

  { id: "LN20", label: "LN20\nWalks", color: STANDARD_COLORS.graphs },
  { id: "LN21", label: "LN21\nConnectedness", color: STANDARD_COLORS.graphs },
  { id: "LN22", label: "LN22\nGraph Families", color: STANDARD_COLORS.graphs },
  { id: "LN23", label: "LN23\nTrees/MST", color: STANDARD_COLORS.graphs },

  { id: "LN24", label: "LN24\nSet Theory", color: STANDARD_COLORS.synthesis },
  { id: "LN25", label: "LN25\nProof Tech", color: STANDARD_COLORS.synthesis },
  { id: "LN26", label: "LN26\nEngine Room", color: STANDARD_COLORS.synthesis },
  { id: "LN27", label: "LN27\nFrontier", color: STANDARD_COLORS.synthesis },
]

const EDGES: GraphEdge[] = [
  // Sequential within standards
  { from: "LN1", to: "LN2" },
  { from: "LN2", to: "LN3" },
  { from: "LN4", to: "LN5" },
  { from: "LN5", to: "LN6" },
  { from: "LN6", to: "LN7" },
  { from: "LN8", to: "LN9" },
  { from: "LN9", to: "LN10" },
  { from: "LN10", to: "LN11" },
  { from: "LN12", to: "LN13" },
  { from: "LN13", to: "LN14" },
  { from: "LN14", to: "LN15" },
  { from: "LN16", to: "LN17" },
  { from: "LN17", to: "LN18" },
  { from: "LN18", to: "LN19" },
  { from: "LN20", to: "LN21" },
  { from: "LN21", to: "LN22" },
  { from: "LN22", to: "LN23" },
  { from: "LN24", to: "LN25" },
  { from: "LN25", to: "LN26" },
  { from: "LN26", to: "LN27" },

  // Standard transitions
  { from: "LN3", to: "LN4" },
  { from: "LN7", to: "LN8" },
  { from: "LN11", to: "LN12" },
  { from: "LN15", to: "LN16" },
  { from: "LN19", to: "LN20" },
  { from: "LN23", to: "LN24" },

  // Cross-standard connections
  { from: "LN3", to: "LN25", label: "proofs" },
  { from: "LN5", to: "LN26", label: "gates" },
  { from: "LN7", to: "LN26", label: "RSA" },
  { from: "LN15", to: "LN19", label: "bijections" },
  { from: "LN11", to: "LN24", label: "sets" },
  { from: "LN20", to: "LN26", label: "BFS/DFS" },
  { from: "LN23", to: "LN27", label: "Dijkstra" },
  { from: "LN22", to: "LN25", label: "reducibility" },
  { from: "LN20", to: "LN27", label: "game trees" },
]

export function CourseJourneyMap() {
  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 justify-center text-xs text-muted-foreground">
        {Object.entries(STANDARD_COLORS)
          .filter(([k]) => k !== "syllabus")
          .map(([name, color]) => (
            <span key={name} className="flex items-center gap-1">
              <span
                className="inline-block w-3 h-3 rounded-full border"
                style={{ backgroundColor: color, borderColor: color }}
              />
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
          ))}
      </div>
      <GraphVisualization
        nodes={NODES}
        edges={EDGES}
        directed={true}
        interactive={true}
        height="500px"
      />
    </div>
  )
}
