"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface FAState {
  id: string
  label: string
  isStart?: boolean
  isAccept?: boolean
  x: number
  y: number
}

interface FATransition {
  from: string
  to: string
  label: string
}

interface FiniteAutomatonRunnerProps {
  states: FAState[]
  transitions: FATransition[]
  title?: string
  className?: string
}

export function FiniteAutomatonRunner({
  states,
  transitions,
  title,
  className = "",
}: FiniteAutomatonRunnerProps) {
  const [input, setInput] = useState("")
  const [currentState, setCurrentState] = useState<string | null>(null)
  const [charIndex, setCharIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<"accepted" | "rejected" | null>(null)
  const [activeTransition, setActiveTransition] = useState<string | null>(null)

  const startState = states.find((s) => s.isStart)

  const reset = useCallback(() => {
    setCurrentState(null)
    setCharIndex(-1)
    setIsRunning(false)
    setResult(null)
    setActiveTransition(null)
  }, [])

  const startRun = useCallback(() => {
    if (!startState || input.length === 0) return
    setCurrentState(startState.id)
    setCharIndex(0)
    setIsRunning(true)
    setResult(null)
    setActiveTransition(null)
  }, [input, startState])

  const stepForward = useCallback(() => {
    if (!isRunning || currentState === null) return

    if (charIndex >= input.length) {
      const acceptState = states.find(
        (s) => s.id === currentState && s.isAccept
      )
      setResult(acceptState ? "accepted" : "rejected")
      setIsRunning(false)
      setActiveTransition(null)
      return
    }

    const ch = input[charIndex]
    const trans = transitions.find(
      (t) => t.from === currentState && t.label.includes(ch)
    )

    if (trans) {
      setActiveTransition(`${trans.from}-${trans.to}-${trans.label}`)
      setCurrentState(trans.to)
      setCharIndex((i) => i + 1)
    } else {
      setResult("rejected")
      setIsRunning(false)
      setActiveTransition(null)
    }
  }, [isRunning, currentState, charIndex, input, transitions, states])

  const svgWidth = 500
  const svgHeight = 200

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">
          {title ?? "Finite Automaton Runner"}
        </span>
      </div>

      <div className="p-4">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full border rounded bg-background"
          style={{ maxHeight: "220px" }}
        >
          <defs>
            <marker
              id="fa-arrow"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" className="text-muted-foreground" />
            </marker>
            <marker
              id="fa-arrow-active"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill="#3b82f6" />
            </marker>
          </defs>

          {transitions.map((t) => {
            const from = states.find((s) => s.id === t.from)
            const to = states.find((s) => s.id === t.to)
            if (!from || !to) return null
            const key = `${t.from}-${t.to}-${t.label}`
            const isActive = activeTransition === key

            if (t.from === t.to) {
              // Auto-flip the self-loop below the node when drawing it above
              // would clip the top edge of the SVG. Symmetrically, if drawing
              // below would clip the bottom, keep it above.
              const wouldClipTop = from.y - 55 < 5
              const wouldClipBottom = from.y + 55 > svgHeight - 5
              const loopBelow = wouldClipTop && !wouldClipBottom
              const loopArc = loopBelow
                ? `M${from.x - 12},${from.y + 25} C${from.x - 30},${from.y + 55} ${from.x + 30},${from.y + 55} ${from.x + 12},${from.y + 25}`
                : `M${from.x - 12},${from.y - 25} C${from.x - 30},${from.y - 55} ${from.x + 30},${from.y - 55} ${from.x + 12},${from.y - 25}`
              const labelY = loopBelow ? from.y + 62 : from.y - 50
              return (
                <g key={key}>
                  <path
                    d={loopArc}
                    fill="none"
                    stroke={isActive ? "#3b82f6" : "currentColor"}
                    strokeWidth={isActive ? 2 : 1}
                    className={isActive ? "" : "text-muted-foreground"}
                    markerEnd={`url(#${isActive ? "fa-arrow-active" : "fa-arrow"})`}
                  />
                  <text
                    x={from.x}
                    y={labelY}
                    textAnchor="middle"
                    className={`text-[11px] ${isActive ? "fill-blue-500 font-bold" : "fill-muted-foreground"}`}
                  >
                    {t.label}
                  </text>
                </g>
              )
            }

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
                  markerEnd={`url(#${isActive ? "fa-arrow-active" : "fa-arrow"})`}
                />
                <text
                  x={(x1 + x2) / 2 + perpX + ny * 12}
                  y={(y1 + y2) / 2 + perpY - nx * 12}
                  textAnchor="middle"
                  className={`text-[11px] ${isActive ? "fill-blue-500 font-bold" : "fill-muted-foreground"}`}
                >
                  {t.label}
                </text>
              </g>
            )
          })}

          {states.map((s) => {
            const isCurrent = currentState === s.id
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
                    markerEnd="url(#fa-arrow)"
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
                  className={`text-xs font-medium ${isCurrent ? "fill-white" : "fill-foreground"}`}
                >
                  {s.label}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label className="text-sm font-medium">Input:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              reset()
            }}
            placeholder="Type a string..."
            className="flex-1 min-w-[120px] px-3 py-1.5 text-sm border rounded bg-background"
            disabled={isRunning}
          />
          {!isRunning && !result && (
            <Button size="sm" onClick={startRun} disabled={input.length === 0}>
              Start
            </Button>
          )}
          {isRunning && (
            <Button size="sm" onClick={stepForward}>
              Step →
            </Button>
          )}
          {(isRunning || result) && (
            <Button variant="outline" size="sm" onClick={reset}>
              Reset
            </Button>
          )}
        </div>

        {isRunning && charIndex < input.length && (
          <div className="mt-3 text-sm">
            <span className="text-muted-foreground">Processing: </span>
            <span className="font-mono">
              {input.split("").map((ch, i) => (
                <span
                  key={i}
                  className={
                    i < charIndex
                      ? "text-muted-foreground"
                      : i === charIndex
                        ? "text-blue-500 font-bold underline"
                        : "text-foreground"
                  }
                >
                  {ch}
                </span>
              ))}
            </span>
          </div>
        )}

        {isRunning && charIndex >= input.length && (
          <div className="mt-3 text-sm text-muted-foreground">
            All characters processed. Click <strong>Step</strong> to check acceptance.
          </div>
        )}

        {result && (
          <div
            className={`mt-3 p-3 rounded text-sm font-medium ${
              result === "accepted"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
            }`}
          >
            {result === "accepted"
              ? `✓ Accepted — "${input}" ended in an accept state.`
              : `✗ Rejected — "${input}" did not end in an accept state.`}
          </div>
        )}
      </div>
    </div>
  )
}
