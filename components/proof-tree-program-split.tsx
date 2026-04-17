"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"
import type { ProofTreeNode } from "@/components/proof-tree-reader"

/**
 * A token in a Petal program. The proof tree's nodes can reference these
 * by id to highlight which part of the source text corresponds to the
 * judgment currently being read.
 */
export interface ProgramToken {
  id: string
  text: string
  /** Optional: append a newline before this token (for line breaks in the listing). */
  newline?: boolean
  /** Optional: indent in spaces for this token. */
  indent?: number
}

/**
 * Per-node metadata: which program tokens this rule application
 * corresponds to, and what state/output the program has at the
 * moment this judgment is established.
 */
export interface ProofProgramLink {
  /** Token IDs to highlight when this node is the active step. */
  tokenIds: string[]
  /** Optional human description of the connection. */
  note?: string
  /** Environment after this judgment resolves (key/value pairs). */
  environment?: Record<string, number>
  /** Output stream after this judgment resolves. */
  output?: number[]
}

/**
 * Extended proof tree node with a link to source program tokens.
 * Each proof step in the omega walk activates these highlights.
 */
export interface LinkedProofTreeNode extends ProofTreeNode {
  programLink?: ProofProgramLink
  premises?: LinkedProofTreeNode[]
}

interface ProofTreeProgramSplitProps {
  title?: string
  tree: LinkedProofTreeNode
  program: ProgramToken[]
  /** Optional caption shown above the source listing. */
  programLabel?: string
}

type StepPart =
  | "enter-rule"
  | "conclusion-left"
  | "side-cond"
  | "conclusion-right"

interface SplitStep {
  nodeId: string
  part: StepPart
  sideCondIndex?: number
  description: string
  badge: string
  depth: number
  link?: ProofProgramLink
}

function generateSplitSteps(
  node: LinkedProofTreeNode,
  depth = 0
): SplitStep[] {
  const steps: SplitStep[] = []
  const link = node.programLink

  steps.push({
    nodeId: node.id,
    part: "enter-rule",
    depth,
    link,
    description:
      depth === 0
        ? `Begin reading the proof tree. The root judgment IS the meaning of the entire program — every rule application below corresponds to a piece of the Petal source.`
        : `Recurse into a sub-proof. The "${node.ruleName}" rule applies to a sub-piece of the program: the highlighted source span is what this judgment talks about.`,
    badge: depth === 0 ? "⊢ Whole program" : `↑ Sub-program (depth ${depth})`,
  })

  steps.push({
    nodeId: node.id,
    part: "conclusion-left",
    depth,
    link,
    description:
      "① Bottom-left: the input. The highlighted source on the right is the syntactic part this judgment evaluates. Notice how it lines up exactly with the program text.",
    badge: "① Input ↔ source",
  })

  for (const premise of node.premises ?? []) {
    steps.push(...generateSplitSteps(premise, depth + 1))
  }

  for (let i = 0; i < (node.sideConditions ?? []).length; i++) {
    const sc = node.sideConditions![i]
    steps.push({
      nodeId: node.id,
      part: "side-cond",
      sideCondIndex: i,
      depth,
      link,
      description:
        sc.description ??
        "A side condition fires here. Side conditions don't correspond to source-code execution — they're the bridges that translate syntactic terminals (numerals, operators, identifiers) into their semantic meanings.",
      badge: "◊ Side condition",
    })
  }

  steps.push({
    nodeId: node.id,
    part: "conclusion-right",
    depth,
    link,
    description:
      depth === 0
        ? "③ Root resolves. The proof tree IS the program's evaluation — reading the tree from leaves to root recreates the program's runtime behavior. The proof tree and the program are the same object viewed from two angles."
        : "③ This sub-judgment resolves. The state and output produced here flow up to the parent rule, just like a sub-expression's value flows up to its parent in the AST.",
    badge: depth === 0 ? "③ Program complete" : "↓ State flows up",
  })

  return steps
}

function MathBlock({
  latex,
  className,
}: {
  latex: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
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
  }, [latex])

  return (
    <span className={`relative ${className ?? ""}`}>
      {!rendered && <MathShimmer />}
      <span
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$${latex}$`}
      </span>
    </span>
  )
}

const HIGHLIGHT = {
  input:
    "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/40 rounded px-1",
  output:
    "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/40 rounded px-1",
  sideCond:
    "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/40 rounded px-1",
}

interface SplitTreeRenderProps {
  node: LinkedProofTreeNode
  step: SplitStep
  visitedRights: Set<string>
}

function SplitTreeRender({
  node,
  step,
  visitedRights,
}: SplitTreeRenderProps) {
  const isActive = step.nodeId === node.id
  const isLeftActive = isActive && step.part === "conclusion-left"
  const isRightActive = isActive && step.part === "conclusion-right"
  const isVisited = visitedRights.has(node.id) && !isActive

  const hasAbove =
    (node.premises?.length ?? 0) > 0 || (node.sideConditions?.length ?? 0) > 0

  return (
    <div
      className={`inline-flex flex-col items-center min-w-fit transition-opacity duration-200 ${
        isVisited ? "opacity-70" : ""
      }`}
    >
      {hasAbove && (
        <div className="flex items-end justify-center gap-5 px-2 pb-1">
          {node.premises?.map((p) => (
            <SplitTreeRender
              key={p.id}
              node={p}
              step={step}
              visitedRights={visitedRights}
            />
          ))}
          {node.sideConditions?.map((sc, i) => {
            const isScActive =
              isActive &&
              step.part === "side-cond" &&
              step.sideCondIndex === i
            return (
              <span
                key={`sc-${i}`}
                className={`inline-block text-sm self-end pb-1 transition-all duration-200 ${
                  isScActive ? HIGHLIGHT.sideCond : ""
                }`}
              >
                <MathBlock latex={sc.latex} />
              </span>
            )
          })}
        </div>
      )}

      <div
        className={`min-w-[60px] border-t-2 transition-colors duration-200 ${
          isActive
            ? "border-amber-500"
            : isVisited
              ? "border-foreground/40"
              : "border-foreground"
        }`}
        style={{ width: "100%" }}
      />

      <div className="flex flex-wrap items-center justify-center gap-x-1 px-1 pt-1">
        <span
          className={`inline-block transition-all duration-200 ${
            isLeftActive ? HIGHLIGHT.input : ""
          }`}
        >
          <MathBlock latex={node.conclusion.left} />
        </span>
        <span
          className={`inline-block transition-all duration-200 ${
            isRightActive ? HIGHLIGHT.output : ""
          }`}
        >
          <MathBlock latex={node.conclusion.right} />
        </span>
      </div>

      {isActive && step.part === "enter-rule" && (
        <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40">
          {node.ruleName}
        </div>
      )}
    </div>
  )
}

function ProgramView({
  program,
  highlightIds,
}: {
  program: ProgramToken[]
  highlightIds: Set<string>
}) {
  // Group tokens into lines
  const lines: ProgramToken[][] = [[]]
  for (const tok of program) {
    if (tok.newline && lines[lines.length - 1].length > 0) {
      lines.push([])
    }
    lines[lines.length - 1].push(tok)
  }

  return (
    <pre className="font-mono text-sm bg-muted/20 rounded p-3 overflow-x-auto leading-7">
      {lines.map((line, li) => (
        <div key={li} className="whitespace-pre">
          {line.map((tok, ti) => {
            const indent = tok.indent ? " ".repeat(tok.indent) : ""
            const isHighlighted = highlightIds.has(tok.id)
            return (
              <span key={`${li}-${ti}-${tok.id}`}>
                {indent}
                <span
                  className={`transition-all duration-200 ${
                    isHighlighted
                      ? "bg-amber-200 dark:bg-amber-800/60 text-amber-900 dark:text-amber-100 ring-1 ring-amber-500 rounded px-0.5"
                      : ""
                  }`}
                >
                  {tok.text}
                </span>
              </span>
            )
          })}
        </div>
      ))}
    </pre>
  )
}

export function ProofTreeProgramSplit({
  title,
  tree,
  program,
  programLabel,
}: ProofTreeProgramSplitProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = useMemo(() => generateSplitSteps(tree), [tree])
  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const visitedRights = useMemo(() => {
    const set = new Set<string>()
    for (let i = 0; i < currentStep; i++) {
      if (steps[i].part === "conclusion-right") {
        set.add(steps[i].nodeId)
      }
    }
    return set
  }, [steps, currentStep])

  const highlightIds = useMemo(
    () => new Set(step.link?.tokenIds ?? []),
    [step]
  )

  const badgeColor = (() => {
    switch (step.part) {
      case "enter-rule":
        return "bg-muted text-muted-foreground"
      case "conclusion-left":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "side-cond":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "conclusion-right":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  })()

  const envEntries = Object.entries(step.link?.environment ?? {})
  const output = step.link?.output ?? []

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `Ω↔ ${title}` : "Ω↔ Proof Tree ↔ Petal Program"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length} · depth {step.depth}
        </span>
      </div>

      {/* Proof tree spans the full container width — proof trees grow wide
          as the program grows, so they need every pixel they can get. */}
      <div className="border-b">
        <div className="px-3 py-1.5 bg-muted/30 border-b">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Proof tree
          </span>
        </div>
        <div className="px-3 py-4 bg-background overflow-x-auto">
          <div className="min-w-fit mx-auto flex justify-center">
            <SplitTreeRender
              node={tree}
              step={step}
              visitedRights={visitedRights}
            />
          </div>
        </div>
      </div>

      {/* Source and state share the row beneath the tree. */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r flex flex-col">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {programLabel ?? "Petal program"}
            </span>
          </div>
          <div className="px-3 py-3 flex-1">
            <ProgramView program={program} highlightIds={highlightIds} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              State at this point
            </span>
          </div>
          <div className="px-3 py-3 flex-1">
            {envEntries.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">
                Environment <code>σ</code>: (empty)
              </span>
            ) : (
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground mb-1">
                  Environment <code>σ</code>:
                </div>
                {envEntries.map(([name, value]) => (
                  <div
                    key={name}
                    className="flex justify-between font-mono text-sm"
                  >
                    <span>{name}</span>
                    <span>↦ {value}</span>
                  </div>
                ))}
              </div>
            )}
            {output.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <span className="text-xs font-semibold text-muted-foreground">
                  Output <code>o</code>:{" "}
                </span>
                <span className="font-mono text-sm text-green-600 dark:text-green-400">
                  [{output.join(", ")}]
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${badgeColor}`}
          >
            {step.badge}
          </span>
          {step.depth > 0 && (
            <span className="text-xs text-muted-foreground">
              {"·".repeat(step.depth)} nested rule
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      <div className="px-4 py-3 bg-muted/20 border-t flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(0)}
          disabled={isFirst}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() =>
            setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
          }
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
