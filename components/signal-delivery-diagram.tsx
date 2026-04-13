"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface ProcessDef {
  id: string; label: string; cx: number; cy: number; color: string
}

const processes: ProcessDef[] = [
  { id: "shell",  label: "Shell",   cx: 100, cy: 70,  color: "purple" },
  { id: "server", label: "Server",  cx: 400, cy: 50,  color: "blue" },
  { id: "worker", label: "Worker",  cx: 280, cy: 180, color: "teal" },
  { id: "daemon", label: "Daemon",  cx: 500, cy: 170, color: "orange" },
]

interface SignalDef {
  from: string; to: string; name: string; description: string
  color: string      // SVG fill class
  textColor: string  // HTML text class
}

const signals: SignalDef[] = [
  { from: "shell",  to: "server", name: "SIGTERM",  description: "Shell sends a polite shutdown request to Server.", color: "fill-red-500", textColor: "text-red-500" },
  { from: "shell",  to: "worker", name: "SIGINT",   description: "User presses Ctrl+C — Shell delivers interrupt to Worker.", color: "fill-amber-500", textColor: "text-amber-500" },
  { from: "server", to: "daemon", name: "SIGUSR1",  description: "Server sends a user-defined notification to Daemon — \"reload config.\"", color: "fill-blue-500", textColor: "text-blue-500" },
  { from: "worker", to: "server", name: "SIGCHLD",  description: "Worker exits — kernel automatically sends SIGCHLD to its parent, Server.", color: "fill-green-500", textColor: "text-green-500" },
]

const VW = 600
const VH = 240

const processColors: Record<string, { fill: string; stroke: string; text: string }> = {
  purple: { fill: "fill-purple-500/15", stroke: "stroke-purple-500/50", text: "fill-purple-700 dark:fill-purple-300" },
  blue:   { fill: "fill-blue-500/15",   stroke: "stroke-blue-500/50",   text: "fill-blue-700 dark:fill-blue-300" },
  teal:   { fill: "fill-teal-500/15",   stroke: "stroke-teal-500/50",   text: "fill-teal-700 dark:fill-teal-300" },
  orange: { fill: "fill-orange-500/15", stroke: "stroke-orange-500/50", text: "fill-orange-700 dark:fill-orange-300" },
}

export function SignalDeliveryDiagram({ className }: { className?: string }) {
  const [activeSignal, setActiveSignal] = useState<number | null>(null)

  const activeFrom = activeSignal !== null ? signals[activeSignal].from : null
  const activeTo = activeSignal !== null ? signals[activeSignal].to : null

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Signals: Point-to-Point Notifications</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Click a signal to trace its delivery path.</p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          {/* Signal flight paths */}
          {signals.map((sig, i) => {
            const from = processes.find(p => p.id === sig.from)!
            const to = processes.find(p => p.id === sig.to)!
            const isActive = activeSignal === i
            const isDimmed = activeSignal !== null && !isActive

            const dx = to.cx - from.cx
            const dy = to.cy - from.cy
            const len = Math.sqrt(dx * dx + dy * dy)
            const nx = dx / len; const ny = dy / len
            const sx = from.cx + nx * 38; const sy = from.cy + ny * 24
            const ex = to.cx - nx * 38; const ey = to.cy - ny * 24
            const mx = (sx + ex) / 2 - ny * 20
            const my = (sy + ey) / 2 + nx * 20

            return (
              <g key={i}
                onClick={() => setActiveSignal(activeSignal === i ? null : i)}
                className="cursor-pointer"
              >
                <path
                  d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
                  fill="none"
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "stroke-primary stroke-2" :
                    isDimmed ? "stroke-border/15 stroke-1" :
                    "stroke-muted-foreground/20 stroke-1"
                  )}
                  strokeDasharray={isActive ? undefined : "3 3"}
                  markerEnd={isActive ? "url(#sig-arr)" : undefined}
                />
                {/* Signal label on the path */}
                <text
                  x={mx} y={my - 4}
                  textAnchor="middle"
                  className={cn(
                    "font-mono font-bold transition-all duration-300",
                    isActive ? sig.color : isDimmed ? "fill-muted-foreground/10" : "fill-muted-foreground/30"
                  )}
                  fontSize={isActive ? 10 : 8}
                >
                  {sig.name}
                </text>
              </g>
            )
          })}

          {/* Process nodes */}
          {processes.map(p => {
            const c = processColors[p.color]
            const isInvolved = p.id === activeFrom || p.id === activeTo
            const isDimmed = activeSignal !== null && !isInvolved
            const isReceiver = p.id === activeTo

            return (
              <g key={p.id} className="transition-all duration-300">
                <circle cx={p.cx} cy={p.cy} r={28}
                  className={cn(
                    "stroke-2 transition-all duration-300",
                    isDimmed ? "fill-slate-200/20 dark:fill-slate-700/20 stroke-slate-300/20 dark:stroke-slate-600/20" :
                    isReceiver ? cn(c.fill, "stroke-primary") :
                    cn(c.fill, c.stroke)
                  )}
                />
                {isReceiver && (
                  <circle cx={p.cx} cy={p.cy} r={28}
                    className="fill-none stroke-primary/30 stroke-4 animate-ping"
                    style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
                  />
                )}
                <text x={p.cx} y={p.cy + 4} textAnchor="middle"
                  className={cn(
                    "font-semibold transition-all",
                    isDimmed ? "fill-muted-foreground/15" : c.text
                  )} fontSize={11}>
                  {p.label}
                </text>
              </g>
            )
          })}

          <defs>
            <marker id="sig-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
          </defs>
        </svg>

        {/* Description */}
        {activeSignal !== null ? (
          <p className="text-sm text-muted-foreground mt-2">
            <span className={cn("font-mono font-bold", signals[activeSignal].textColor)}>
              {signals[activeSignal].name}
            </span>
            {" — "}{signals[activeSignal].description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/50 mt-2 italic">
            No buffers. No channels. No infrastructure. Just a signal number delivered by the kernel.
          </p>
        )}
      </div>
    </div>
  )
}
