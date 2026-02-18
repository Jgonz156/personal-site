"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

export type ProcessState =
  | "new"
  | "ready"
  | "running"
  | "blocked"
  | "terminated"

interface Transition {
  from: ProcessState
  to: ProcessState
  label: string
  description: string
}

const transitions: Transition[] = [
  { from: "new", to: "ready", label: "Admit", description: "Process created — new PCB, PAS, and PEC allocated" },
  { from: "ready", to: "running", label: "Dispatch", description: "Scheduler assigns CPU — PEC loaded, PAS activated" },
  { from: "running", to: "blocked", label: "I/O Wait", description: "Process needs data that hasn't arrived yet" },
  { from: "blocked", to: "ready", label: "I/O Complete", description: "Requested data has arrived — ready to resume" },
  { from: "running", to: "ready", label: "Interrupt", description: "Preempted — could continue but something urgent came first" },
  { from: "running", to: "terminated", label: "Exit", description: "Process completed — PCB, PAS, PEC can be reclaimed" },
]

const statePositions: Record<ProcessState, { x: number; y: number }> = {
  new: { x: 60, y: 100 },
  ready: { x: 200, y: 100 },
  running: { x: 380, y: 100 },
  blocked: { x: 290, y: 220 },
  terminated: { x: 520, y: 100 },
}

const stateColors: Record<ProcessState, { fill: string; stroke: string; text: string }> = {
  new: {
    fill: "fill-slate-200/60 dark:fill-slate-700/50",
    stroke: "stroke-slate-500 dark:stroke-slate-400",
    text: "fill-slate-800 dark:fill-slate-200",
  },
  ready: {
    fill: "fill-yellow-200/60 dark:fill-yellow-700/40",
    stroke: "stroke-yellow-600 dark:stroke-yellow-400",
    text: "fill-yellow-900 dark:fill-yellow-100",
  },
  running: {
    fill: "fill-green-200/60 dark:fill-green-700/40",
    stroke: "stroke-green-600 dark:stroke-green-400",
    text: "fill-green-900 dark:fill-green-100",
  },
  blocked: {
    fill: "fill-red-200/60 dark:fill-red-700/40",
    stroke: "stroke-red-600 dark:stroke-red-400",
    text: "fill-red-900 dark:fill-red-100",
  },
  terminated: {
    fill: "fill-slate-300/60 dark:fill-slate-600/50",
    stroke: "stroke-slate-500 dark:stroke-slate-400",
    text: "fill-slate-700 dark:fill-slate-200",
  },
}

interface ProcessStateDiagramProps {
  highlightState?: ProcessState
  className?: string
}

function CurvedArrow({
  from,
  to,
  label,
  offset = 0,
  selected,
  onClick,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  label: string
  offset?: number
  selected: boolean
  onClick: () => void
}) {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2 + offset
  const path = `M ${from.x} ${from.y} Q ${midX} ${midY - 30 + offset} ${to.x} ${to.y}`

  return (
    <g onClick={onClick} className="cursor-pointer">
      <path
        d={path}
        fill="none"
        className={cn(
          "stroke-2 transition-all",
          selected
            ? "stroke-red-500 dark:stroke-red-400"
            : "stroke-muted-foreground/50 hover:stroke-muted-foreground"
        )}
        markerEnd="url(#state-arrow)"
      />
      <text
        x={midX}
        y={midY - 10 + offset}
        fontSize={9}
        textAnchor="middle"
        className={cn(
          "font-semibold transition-all",
          selected
            ? "fill-red-600 dark:fill-red-300"
            : "fill-muted-foreground/70"
        )}
      >
        {label}
      </text>
    </g>
  )
}

export function ProcessStateDiagram({
  highlightState,
  className,
}: ProcessStateDiagramProps) {
  const [selectedTransition, setSelectedTransition] = useState<number | null>(null)
  const activeState = highlightState

  const stateRadius = 32

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Process State Diagram</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Click a transition arrow to see what triggers it.
      </p>

      <svg
        viewBox="0 0 600 280"
        className="w-full"
        style={{ maxHeight: "320px" }}
      >
        <defs>
          <marker
            id="state-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <polygon
              points="0 0, 8 4, 0 8"
              className="fill-muted-foreground/60"
            />
          </marker>
        </defs>

        {/* Transition arrows */}
        {/* New -> Ready */}
        <CurvedArrow
          from={{ x: statePositions.new.x + stateRadius, y: statePositions.new.y }}
          to={{ x: statePositions.ready.x - stateRadius, y: statePositions.ready.y }}
          label="Admit"
          selected={selectedTransition === 0}
          onClick={() => setSelectedTransition(selectedTransition === 0 ? null : 0)}
        />

        {/* Ready -> Running */}
        <CurvedArrow
          from={{ x: statePositions.ready.x + stateRadius, y: statePositions.ready.y }}
          to={{ x: statePositions.running.x - stateRadius, y: statePositions.running.y }}
          label="Dispatch"
          selected={selectedTransition === 1}
          onClick={() => setSelectedTransition(selectedTransition === 1 ? null : 1)}
        />

        {/* Running -> Blocked */}
        <CurvedArrow
          from={{ x: statePositions.running.x - 10, y: statePositions.running.y + stateRadius }}
          to={{ x: statePositions.blocked.x + 15, y: statePositions.blocked.y - stateRadius }}
          label="I/O Wait"
          offset={20}
          selected={selectedTransition === 2}
          onClick={() => setSelectedTransition(selectedTransition === 2 ? null : 2)}
        />

        {/* Blocked -> Ready */}
        <CurvedArrow
          from={{ x: statePositions.blocked.x - 15, y: statePositions.blocked.y - stateRadius }}
          to={{ x: statePositions.ready.x + 10, y: statePositions.ready.y + stateRadius }}
          label="I/O Done"
          offset={20}
          selected={selectedTransition === 3}
          onClick={() => setSelectedTransition(selectedTransition === 3 ? null : 3)}
        />

        {/* Running -> Ready (interrupt, curved above) */}
        <CurvedArrow
          from={{ x: statePositions.running.x - 20, y: statePositions.running.y - stateRadius }}
          to={{ x: statePositions.ready.x + 20, y: statePositions.ready.y - stateRadius }}
          label="Interrupt"
          offset={-40}
          selected={selectedTransition === 4}
          onClick={() => setSelectedTransition(selectedTransition === 4 ? null : 4)}
        />

        {/* Running -> Terminated */}
        <CurvedArrow
          from={{ x: statePositions.running.x + stateRadius, y: statePositions.running.y }}
          to={{ x: statePositions.terminated.x - stateRadius, y: statePositions.terminated.y }}
          label="Exit"
          selected={selectedTransition === 5}
          onClick={() => setSelectedTransition(selectedTransition === 5 ? null : 5)}
        />

        {/* State nodes */}
        {(Object.entries(statePositions) as [ProcessState, { x: number; y: number }][]).map(
          ([state, pos]) => {
            const colors = stateColors[state]
            const isActive = activeState === state
            return (
              <g key={state}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={stateRadius}
                  className={cn(
                    colors.fill,
                    colors.stroke,
                    "stroke-2 transition-all",
                    isActive && "stroke-[3px]"
                  )}
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  fontSize={11}
                  textAnchor="middle"
                  className={cn(colors.text, "font-bold")}
                >
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </text>
              </g>
            )
          }
        )}
      </svg>

      {/* Transition description */}
      {selectedTransition !== null && (
        <div className="mt-2 p-2 border rounded bg-red-500/5 dark:bg-red-500/10 border-red-400/30">
          <p className="text-sm">
            <span className="font-bold text-red-700 dark:text-red-300">
              {transitions[selectedTransition].from.charAt(0).toUpperCase() +
                transitions[selectedTransition].from.slice(1)}{" "}
              →{" "}
              {transitions[selectedTransition].to.charAt(0).toUpperCase() +
                transitions[selectedTransition].to.slice(1)}
            </span>
            {": "}
            {transitions[selectedTransition].description}
          </p>
        </div>
      )}
    </div>
  )
}
