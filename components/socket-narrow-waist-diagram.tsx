"use client"

import { cn } from "@/lib/utils"

const VW = 420
const VH = 280

interface Band {
  label: string; sub: string; y: number; h: number; w: number
  fill: string; stroke: string; text: string
}

const bands: Band[] = [
  {
    label: "Application", sub: "send() / recv()", y: 10, h: 36, w: 120,
    fill: "fill-emerald-500/10", stroke: "stroke-emerald-500/40", text: "fill-emerald-700 dark:fill-emerald-300",
  },
  {
    label: "Socket Handle", sub: "the narrow waist", y: 60, h: 30, w: 100,
    fill: "fill-blue-500/15", stroke: "stroke-blue-500/50", text: "fill-blue-700 dark:fill-blue-300",
  },
  {
    label: "Transport Logic", sub: "TCP / UDP state machine", y: 106, h: 40, w: 200,
    fill: "fill-purple-500/10", stroke: "stroke-purple-500/40", text: "fill-purple-700 dark:fill-purple-300",
  },
  {
    label: "Network + Link + NIC", sub: "packet path from LN21", y: 162, h: 50, w: 320,
    fill: "fill-amber-500/10", stroke: "stroke-amber-500/40", text: "fill-amber-700 dark:fill-amber-300",
  },
  {
    label: "Physical Wire", sub: "bits on the medium", y: 228, h: 28, w: 380,
    fill: "fill-slate-500/5", stroke: "stroke-slate-500/20", text: "fill-muted-foreground/40",
  },
]

export function SocketNarrowWaistDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">The Socket as a Narrow Waist</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          A tiny API resting on top of a much wider and more complicated stack.
        </p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-md mx-auto">
          {bands.map((b, i) => {
            const bx = (VW - b.w) / 2
            return (
              <g key={b.label}>
                <rect x={bx} y={b.y} width={b.w} height={b.h} rx={6}
                  className={cn("stroke-[1.5]", b.fill, b.stroke)} />
                <text x={VW / 2} y={b.y + b.h / 2 - 2} textAnchor="middle"
                  className={cn("font-semibold", b.text)} fontSize={9}>
                  {b.label}
                </text>
                <text x={VW / 2} y={b.y + b.h / 2 + 10} textAnchor="middle"
                  className="fill-muted-foreground/30" fontSize={7}>
                  {b.sub}
                </text>

                {/* Connector to next band */}
                {i < bands.length - 1 && (
                  <line x1={VW / 2} y1={b.y + b.h} x2={VW / 2} y2={bands[i + 1].y}
                    className="stroke-muted-foreground/10 stroke-1" />
                )}
              </g>
            )
          })}

          {/* Annotation arrow pointing at narrow waist */}
          <line x1={VW / 2 + 70} y1={75} x2={VW / 2 + 54} y2={75}
            className="stroke-blue-500/40 stroke-[1.5]" markerEnd="url(#waist-arr)" />
          <text x={VW / 2 + 74} y={72} className="fill-blue-600/50 dark:fill-blue-400/50 font-semibold" fontSize={7}>
            program sees only this
          </text>
          <defs>
            <marker id="waist-arr" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
              <path d="M6,0 L0,3 L6,6" className="fill-blue-500/40" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  )
}
