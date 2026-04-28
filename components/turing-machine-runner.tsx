"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

interface TMState {
  id: string
  label: string
  isStart?: boolean
  isAccept?: boolean
  x: number
  y: number
}

interface TMTransition {
  from: string
  to: string
  /**
   * The symbol(s) being read. Comma-separated for "or" semantics, e.g. "0,1"
   * means this transition fires for either 0 or 1.
   */
  read: string
  /**
   * The symbol to write. Use the literal "same" to mean "write whatever was
   * read" (handy for pass-through transitions).
   */
  write: string
  /** L = left, R = right, S = stay */
  move: "L" | "R" | "S"
}

interface TMStep {
  tape: string[]
  head: number
  /** id of the state the machine is currently in (BEFORE the next transition fires) */
  state: string
  description?: string
}

interface TuringMachineRunnerProps {
  title?: string
  states: TMState[]
  transitions: TMTransition[]
  steps: TMStep[]
  className?: string
}

const SVG_WIDTH = 500
const SVG_HEIGHT = 180

export function TuringMachineRunner({
  title,
  states,
  transitions,
  steps,
  className = "",
}: TuringMachineRunnerProps) {
  const [stepIdx, setStepIdx] = useState(0)
  const step = steps[stepIdx]

  const currentSymbol = step.tape[step.head] ?? ""

  // The "active" transition is the one whose `from` matches the current state
  // and whose `read` set contains the current tape symbol.
  const activeTransition = useMemo(() => {
    return (
      transitions.find(
        (t) =>
          t.from === step.state &&
          t.read
            .split(",")
            .map((s) => s.trim())
            .includes(currentSymbol)
      ) ?? null
    )
  }, [step, currentSymbol, transitions])

  const activeKey = activeTransition
    ? `${activeTransition.from}->${activeTransition.to}::${activeTransition.read}`
    : null

  const writeSymbol =
    activeTransition?.write === "same"
      ? currentSymbol
      : activeTransition?.write ?? null

  return (
    <div
      className={`my-6 border rounded-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `⚙️ ${title}` : "⚙️ Turing Machine"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      {/* State machine diagram */}
      <div className="border-b bg-background">
        <div className="px-4 pt-2 pb-0 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
          State Machine
        </div>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full"
          style={{ maxHeight: "200px" }}
        >
          <defs>
            <marker
              id="tm-arrow"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path
                d="M0,0 L8,3 L0,6 Z"
                fill="currentColor"
                className="text-muted-foreground"
              />
            </marker>
            <marker
              id="tm-arrow-active"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill="#3b82f6" />
            </marker>
          </defs>

          {/* Transitions */}
          {transitions.map((t) => {
            const from = states.find((s) => s.id === t.from)
            const to = states.find((s) => s.id === t.to)
            if (!from || !to) return null
            const key = `${t.from}->${t.to}::${t.read}`
            const isActive = activeKey === key
            const labelText = `${t.read} / ${t.write}, ${t.move}`

            if (t.from === t.to) {
              // Self-loop with auto-flip if it'd clip the top of the canvas
              const wouldClipTop = from.y - 55 < 5
              const wouldClipBottom = from.y + 55 > SVG_HEIGHT - 5
              const loopBelow = wouldClipTop && !wouldClipBottom
              const loopArc = loopBelow
                ? `M${from.x - 12},${from.y + 25} C${from.x - 30},${from.y + 55} ${from.x + 30},${from.y + 55} ${from.x + 12},${from.y + 25}`
                : `M${from.x - 12},${from.y - 25} C${from.x - 30},${from.y - 55} ${from.x + 30},${from.y - 55} ${from.x + 12},${from.y - 25}`
              const labelY = loopBelow ? from.y + 72 : from.y - 60
              return (
                <g key={key}>
                  <path
                    d={loopArc}
                    fill="none"
                    stroke={isActive ? "#3b82f6" : "currentColor"}
                    strokeWidth={isActive ? 2 : 1}
                    className={isActive ? "" : "text-muted-foreground"}
                    markerEnd={`url(#${isActive ? "tm-arrow-active" : "tm-arrow"})`}
                  />
                  <text
                    x={from.x}
                    y={labelY}
                    textAnchor="middle"
                    className={`text-[11px] font-mono ${
                      isActive
                        ? "fill-blue-500 font-bold"
                        : "fill-muted-foreground"
                    }`}
                  >
                    {labelText}
                  </text>
                </g>
              )
            }

            // Straight transition with offset for bidirectional pairs
            const dx = to.x - from.x
            const dy = to.y - from.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const nx = dx / dist
            const ny = dy / dist
            const r = 22
            const x1 = from.x + nx * r
            const y1 = from.y + ny * r
            const x2 = to.x - nx * (r + 8)
            const y2 = to.y - ny * (r + 8)

            const hasReverse = transitions.some(
              (tt) => tt.from === t.to && tt.to === t.from
            )
            const offset = hasReverse ? 8 : 0
            const perpX = -ny * offset
            const perpY = nx * offset

            return (
              <g key={key}>
                <line
                  x1={x1 + perpX}
                  y1={y1 + perpY}
                  x2={x2 + perpX}
                  y2={y2 + perpY}
                  stroke={isActive ? "#3b82f6" : "currentColor"}
                  strokeWidth={isActive ? 2 : 1}
                  className={isActive ? "" : "text-muted-foreground"}
                  markerEnd={`url(#${isActive ? "tm-arrow-active" : "tm-arrow"})`}
                />
                <text
                  x={(x1 + x2) / 2 + perpX + ny * 14}
                  y={(y1 + y2) / 2 + perpY - nx * 14}
                  textAnchor="middle"
                  className={`text-[11px] font-mono ${
                    isActive
                      ? "fill-blue-500 font-bold"
                      : "fill-muted-foreground"
                  }`}
                >
                  {labelText}
                </text>
              </g>
            )
          })}

          {/* States */}
          {states.map((s) => {
            const isCurrent = step.state === s.id
            return (
              <g key={s.id}>
                {s.isStart && (
                  <line
                    x1={s.x - 45}
                    y1={s.y}
                    x2={s.x - 24}
                    y2={s.y}
                    stroke="currentColor"
                    className="text-muted-foreground"
                    strokeWidth={1}
                    markerEnd="url(#tm-arrow)"
                  />
                )}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={20}
                  fill={isCurrent ? "#3b82f6" : "transparent"}
                  stroke={isCurrent ? "#3b82f6" : "currentColor"}
                  strokeWidth={2}
                  className={isCurrent ? "" : "text-foreground"}
                />
                {s.isAccept && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={16}
                    fill="none"
                    stroke={isCurrent ? "white" : "currentColor"}
                    strokeWidth={1.5}
                    className={isCurrent ? "" : "text-foreground"}
                  />
                )}
                <text
                  x={s.x}
                  y={s.y + 4}
                  textAnchor="middle"
                  className={`text-xs font-medium ${
                    isCurrent ? "fill-white" : "fill-foreground"
                  }`}
                >
                  {s.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Action summary line */}
      <div className="px-4 py-2 bg-muted/10 border-b text-center text-sm">
        {activeTransition ? (
          <span>
            <span className="text-muted-foreground">read</span>{" "}
            <span className="font-mono font-bold text-primary">
              {currentSymbol === "#" ? "␣" : currentSymbol}
            </span>{" "}
            <span className="text-muted-foreground">→ write</span>{" "}
            <span className="font-mono font-bold text-primary">
              {writeSymbol === "#" ? "␣" : writeSymbol}
            </span>
            <span className="text-muted-foreground">, move</span>{" "}
            <span className="font-mono font-bold text-primary">
              {activeTransition.move}
            </span>
          </span>
        ) : (
          <span className="text-muted-foreground italic">
            no outgoing transition — machine halts
          </span>
        )}
      </div>

      {/* Tape */}
      <div className="px-4 py-4 flex flex-col items-center gap-2">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Tape
        </div>
        <div className="flex items-end gap-0 overflow-x-auto max-w-full pb-2">
          {step.tape.map((cell, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`text-xs font-bold mb-1 transition-opacity duration-200 ${
                  i === step.head ? "opacity-100 text-primary" : "opacity-0"
                }`}
              >
                ▼
              </div>
              <div
                className={`
                  w-10 h-10 flex items-center justify-center
                  border font-mono text-sm font-semibold
                  transition-all duration-200
                  ${
                    i === step.head
                      ? "border-primary border-2 bg-primary/15 text-primary scale-110"
                      : "border-border bg-muted/30 text-foreground"
                  }
                `}
              >
                {cell}
              </div>
              <div className="text-[10px] text-muted-foreground/50 mt-0.5">
                {i}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      {step.description && (
        <div className="px-4 pb-3">
          <p className="text-sm text-muted-foreground italic text-center">
            {step.description}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
          disabled={stepIdx === 0}
        >
          ← Previous
        </Button>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === stepIdx
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setStepIdx(Math.min(steps.length - 1, stepIdx + 1))
          }
          disabled={stepIdx === steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
