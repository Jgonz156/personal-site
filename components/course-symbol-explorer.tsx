"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

function MathFormula({ formula }: { formula: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)
    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })
    return () => {
      mounted = false
    }
  }, [formula])

  return (
    <div className="relative overflow-x-auto text-center">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$$${formula}$$`}
      </div>
    </div>
  )
}

interface BlockRow {
  label: string
  stages: string[]
}

interface CourseBlock {
  name: string
  range: string
  rows: BlockRow[]
}

function getMaxStep(block: CourseBlock): number {
  return block.rows
    .slice(1)
    .reduce((sum, row) => sum + row.stages.length, 0)
}

function getRowVisibility(
  block: CourseBlock,
  revealStep: number
): { rowIndex: number; stageIndex: number }[] {
  const visible: { rowIndex: number; stageIndex: number }[] = []
  let stepBudget = revealStep
  for (let r = 1; r < block.rows.length; r++) {
    if (stepBudget <= 0) break
    const stages = block.rows[r].stages.length
    const stageIndex = Math.min(stepBudget, stages) - 1
    visible.push({ rowIndex: r, stageIndex })
    stepBudget -= stages
  }
  return visible
}

const BLOCKS: CourseBlock[] = [
  {
    name: "Logic",
    range: "LN 1–3",
    rows: [
      {
        label: "Type",
        stages: ["\\text{Propositions: } P,\\, Q,\\, R,\\, \\ldots"],
      },
      {
        label: "Instances",
        stages: ["\\top \\quad \\bot \\quad T \\quad F"],
      },
      {
        label: "Operators",
        stages: [
          "\\land \\quad \\lor \\quad \\rightarrow \\quad \\neg \\quad \\equiv \\quad \\forall \\quad \\exists",
        ],
      },
    ],
  },
  {
    name: "Booleans",
    range: "LN 5",
    rows: [
      {
        label: "Type",
        stages: ["\\mathbb{B}"],
      },
      {
        label: "Instances",
        stages: ["0 \\qquad 1"],
      },
      {
        label: "Operators",
        stages: [
          "+ \\quad \\times \\quad - \\quad \\equiv",
        ],
      },
      {
        label: "Isomorphism to Logic",
        stages: [
          "0 \\!\\equiv\\! F \\quad 1 \\!\\equiv\\! T \\quad + \\!\\equiv\\! \\lor \\quad \\times \\!\\equiv\\! \\land \\quad - \\!\\equiv\\! \\neg \\quad \\equiv \\;\\equiv\\; =",
        ],
      },
    ],
  },
  {
    name: "Numbers",
    range: "LN 6–7",
    rows: [
      {
        label: "Type",
        stages: ["\\mathbb{N} \\quad \\mathbb{Z} \\quad \\mathbb{Q} \\quad \\mathbb{R}"],
      },
      {
        label: "Instances",
        stages: [
          "0,\\, 1,\\, 2,\\, \\ldots \\;\\;\\; -1,\\, -2,\\, \\ldots \\;\\;\\; \\tfrac{1}{2},\\, \\pi,\\, \\ldots",
        ],
      },
      {
        label: "Operators",
        stages: [
          "+ \\quad - \\quad \\times \\quad \\div \\quad \\% \\quad | \\quad \\lfloor\\;\\rfloor \\quad \\lceil\\;\\rceil \\quad \\equiv_m",
        ],
      },
    ],
  },
  {
    name: "Collections",
    range: "LN 8–11",
    rows: [
      {
        label: "Type",
        stages: [
          "(\\ldots,\\, \\ldots,\\, \\ldots) \\quad \\{\\ldots,\\, \\ldots,\\, \\ldots\\}",
        ],
      },
      {
        label: "Instances",
        stages: ["(1,2,3) \\quad \\{1,2,3\\} \\quad \\emptyset"],
      },
      {
        label: "Operators",
        stages: [
          "\\cup \\;\\; \\cap \\;\\; \\in \\;\\; \\subseteq \\;\\; \\subset \\;\\; = \\;\\; \\overline{A} \\;\\; \\setminus \\;\\; \\triangle \\;\\; \\times \\;\\; \\mathcal{P}(A) \\;\\; |A|",
        ],
      },
    ],
  },
  {
    name: "Functions",
    range: "LN 12–15",
    rows: [
      {
        label: "Type",
        stages: ["\\lambda \\quad ."],
      },
      {
        label: "Instances",
        stages: [
          "\\lambda x.\\, x \\qquad \\lambda x.\\, x+1 \\qquad \\lambda x.\\, x \\% 2",
        ],
      },
      {
        label: "Operators",
        stages: [
          "\\alpha \\quad \\beta \\quad \\eta \\quad FV \\quad BV \\quad [\\ldots/\\ldots]",
        ],
      },
      {
        label: "Properties",
        stages: [
          "\\text{dom} \\quad \\text{cod} \\quad \\text{im} \\quad \\text{preim} \\quad \\text{inj.} \\quad \\text{surj.} \\quad \\text{bij.}",
          "\\begin{array}{rl} \\text{dom:} & (A) \\to \\ldots \\quad \\text{cod:} \\; (\\ldots) \\to A \\quad \\text{preim:} \\; \\{(a,\\ldots) \\mid F\\} \\quad \\text{im:} \\; \\{(\\ldots,b) \\mid F\\} \\\\ \\text{inj:} & \\forall a_1\\!,a_2.\\; f(a_1)\\!=\\!f(a_2) \\Rightarrow a_1\\!=\\!a_2 \\quad \\text{surj:} \\; \\forall b.\\,\\exists a.\\; f(a)\\!=\\!b \\quad \\text{bij:} \\; \\forall b.\\,\\exists! a.\\; f(a)\\!=\\!b \\end{array}",
          "\\begin{array}{c} (A) \\to \\ldots \\quad (\\ldots) \\to A \\quad \\{(a,\\ldots) \\mid F\\} \\quad \\{(\\ldots,b) \\mid F\\} \\\\ \\forall a_1\\!,a_2.\\; f(a_1)\\!=\\!f(a_2) \\Rightarrow a_1\\!=\\!a_2 \\quad \\forall b.\\,\\exists a.\\; f(a)\\!=\\!b \\quad \\forall b.\\,\\exists! a.\\; f(a)\\!=\\!b \\end{array}",
        ],
      },
    ],
  },
  {
    name: "Combinatorics",
    range: "LN 16–19",
    rows: [
      {
        label: "Type",
        stages: [
          "\\text{Enum: } |\\{\\ldots\\}| \\quad \\text{Exist: } \\exists x \\in S.\\; P(x) \\quad \\text{Construct: } \\exists! x.\\; P(x) \\quad \\text{Optim: } \\min_{x \\in S} f(x)",
        ],
      },
      {
        label: "Instances",
        stages: [
          "\\{\\{\\ldots\\},\\{\\ldots\\},\\ldots\\} \\quad \\{(\\ldots),(\\ldots),\\ldots\\}",
        ],
      },
      {
        label: "Operators",
        stages: [
          "n! \\quad P(n,k) = \\frac{n!}{(n-k)!} \\quad C(n,k) = \\binom{n}{k}",
        ],
      },
      {
        label: "Behaviors",
        stages: [
          "\\Sigma\\text{-Rule} \\quad \\Pi\\text{-Rule} \\quad \\text{Incl-Excl} \\quad \\text{Dbl Count} \\quad \\text{Bijective} \\quad \\text{Pigeonhole}",
          "\\begin{array}{rl} \\Sigma\\text{-Rule:} & |A \\cup B| = |A|+|B| \\;(A \\cap B = \\emptyset) \\quad \\Pi\\text{-Rule:} \\; |A \\times B| = |A| \\cdot |B| \\\\ \\text{Incl-Excl:} & |A \\cup B| = |A|+|B|-|A \\cap B| \\quad \\text{Dbl Count:} \\; \\text{LHS} = \\text{RHS} \\\\ \\text{Bijective:} & |A|=|B| \\!\\iff\\! \\exists f\\!: A \\xrightarrow{\\sim} B \\quad \\text{Pigeonhole:} \\; |A|>|B| \\Rightarrow \\neg\\text{inj}(f\\!: A \\to B) \\end{array}",
          "\\begin{array}{c} |A \\cup B| = |A|+|B| \\;(A \\cap B = \\emptyset) \\quad |A \\times B| = |A| \\cdot |B| \\\\ |A \\cup B| = |A|+|B|-|A \\cap B| \\quad \\text{LHS} = \\text{RHS} \\\\ |A|=|B| \\!\\iff\\! \\exists f\\!: A \\xrightarrow{\\sim} B \\quad |A|>|B| \\Rightarrow \\neg\\text{inj}(f\\!: A \\to B) \\end{array}",
        ],
      },
    ],
  },
  {
    name: "Graphs",
    range: "LN 20–23",
    rows: [
      {
        label: "Type",
        stages: ["G = (V,\\, E)"],
      },
      {
        label: "Instances",
        stages: [
          "G = (V,\\, E) \\quad \\vec{G} = (V,\\, \\vec{E}) \\quad (v_1, v_2, \\ldots)",
        ],
      },
      {
        label: "Operators",
        stages: [
          "\\cup \\quad \\cap \\quad \\setminus \\quad \\overline{G} \\quad \\cong \\quad \\text{v-cleave} \\quad \\text{e-contract}",
        ],
      },
      {
        label: "Families",
        stages: [
          "\\text{walks} \\quad \\text{paths} \\quad K_n \\quad K_{m,n} \\quad C_n \\quad W_n \\quad Q_n \\quad \\text{Trees} \\quad \\text{MST}",
        ],
      },
    ],
  },
]

export function CourseSymbolExplorer({
  className = "",
}: {
  className?: string
}) {
  const [activeBlock, setActiveBlock] = useState(0)
  const [revealStep, setRevealStep] = useState(0)
  const [showSummary, setShowSummary] = useState(false)

  const block = BLOCKS[activeBlock]
  const maxStep = getMaxStep(block)

  const handleTabClick = (index: number) => {
    setShowSummary(false)
    setActiveBlock(index)
    setRevealStep(0)
  }

  const handleNext = () => {
    if (revealStep < maxStep) {
      setRevealStep((s) => s + 1)
    } else if (activeBlock < BLOCKS.length - 1) {
      setActiveBlock((b) => b + 1)
      setRevealStep(0)
    } else {
      setShowSummary(true)
    }
  }

  const handlePrev = () => {
    if (showSummary) {
      setShowSummary(false)
      setActiveBlock(BLOCKS.length - 1)
      setRevealStep(getMaxStep(BLOCKS[BLOCKS.length - 1]))
      return
    }
    if (revealStep > 0) {
      setRevealStep((s) => s - 1)
    } else if (activeBlock > 0) {
      const prevBlock = BLOCKS[activeBlock - 1]
      setActiveBlock((b) => b - 1)
      setRevealStep(getMaxStep(prevBlock))
    }
  }

  const handleRevealAll = () => {
    setRevealStep(maxStep)
  }

  if (showSummary) {
    return <SummaryView className={className} onBack={handlePrev} />
  }

  const visibleRows = getRowVisibility(block, revealStep)

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="flex overflow-x-auto border-b bg-muted/30">
        {BLOCKS.map((b, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(i)}
            className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
              i === activeBlock && !showSummary
                ? "border-primary text-primary bg-primary/10"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {b.name}
          </button>
        ))}
        <button
          onClick={() => setShowSummary(true)}
          className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            showSummary
              ? "border-primary text-primary bg-primary/10"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          The Pattern
        </button>
      </div>

      <div className="px-4 py-2 bg-muted/10 border-b flex items-center justify-between">
        <div>
          <span className="font-semibold">{block.name}</span>
          <span className="text-xs text-muted-foreground ml-2">
            ({block.range})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={handleRevealAll}
          disabled={revealStep >= maxStep}
        >
          Reveal All
        </Button>
      </div>

      <div className="p-4 space-y-4 min-h-[220px]">
        <PhaseRow label={block.rows[0].label}>
          <MathFormula
            key={`${activeBlock}-row0-s0`}
            formula={block.rows[0].stages[0]}
          />
        </PhaseRow>

        {visibleRows.map(({ rowIndex, stageIndex }) => {
          const row = block.rows[rowIndex]
          return (
            <PhaseRow key={`${activeBlock}-row${rowIndex}`} label={row.label}>
              <MathFormula
                key={`${activeBlock}-row${rowIndex}-s${stageIndex}`}
                formula={row.stages[stageIndex]}
              />
            </PhaseRow>
          )
        })}
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={activeBlock === 0 && revealStep === 0}
        >
          ← Back
        </Button>
        <span className="text-xs text-muted-foreground">
          Block {activeBlock + 1}/{BLOCKS.length} · Step{" "}
          {revealStep + 1}/{maxStep + 1}
        </span>
        <Button variant="outline" size="sm" onClick={handleNext}>
          {activeBlock === BLOCKS.length - 1 && revealStep >= maxStep
            ? "View Pattern →"
            : "Next →"}
        </Button>
      </div>
    </div>
  )
}

function PhaseRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-primary uppercase tracking-wider">
        {label}
      </div>
      {children}
    </div>
  )
}

function SummaryView({
  className = "",
  onBack,
}: {
  className?: string
  onBack: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)
    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="flex overflow-x-auto border-b bg-muted/30">
        {BLOCKS.map((b, i) => (
          <button
            key={i}
            className="px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 border-transparent text-muted-foreground"
            disabled
          >
            {b.name}
          </button>
        ))}
        <button className="px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 border-primary text-primary bg-primary/10">
          The Pattern
        </button>
      </div>

      <div className="relative p-4">
        {!rendered && (
          <div className="space-y-4">
            {BLOCKS.map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                <div className="h-4 flex-1 rounded bg-muted animate-pulse" />
              </div>
            ))}
            <div className="flex justify-center pt-4">
              <div className="h-8 w-64 rounded bg-muted animate-pulse" />
            </div>
          </div>
        )}
        <div
          ref={ref}
          style={{
            visibility: rendered ? "visible" : "hidden",
            position: rendered ? "static" : "absolute",
          }}
        >
          <div className="space-y-3 mb-6">
            {BLOCKS.map((b, i) => (
              <div
                key={i}
                className="grid grid-cols-[80px_1fr] gap-2 items-start text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <div>
                  <div className="font-semibold text-xs">{b.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {b.range}
                  </div>
                </div>
                <div className="overflow-x-auto text-xs">
                  {b.rows.map((row, ri) => (
                    <span key={ri}>
                      {ri > 0 && (
                        <span className="mx-2 text-border">|</span>
                      )}
                      <span className="text-muted-foreground">
                        {row.label}:{" "}
                      </span>
                      {`$${row.stages[row.stages.length - 1]}$`}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 text-center space-y-3">
            <p className="text-sm font-semibold">
              Every idea in discrete mathematics follows the same structure:
            </p>
            {`$$A \\;\\text{ with }\\; a : A \\;\\text{ and operators }\\; {\\sim} : (A, \\ldots) \\to \\ldots$$`}
            <p className="text-sm text-muted-foreground">
              <strong>Type</strong> → <strong>Instances</strong> →{" "}
              <strong>Operators</strong> → and sometimes further{" "}
              <strong>Properties</strong>, <strong>Behaviors</strong>, or{" "}
              <strong>Families</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20">
        <Button variant="outline" size="sm" onClick={onBack}>
          ← Back to Blocks
        </Button>
      </div>
    </div>
  )
}
