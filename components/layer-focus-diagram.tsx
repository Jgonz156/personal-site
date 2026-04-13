"use client"

import { cn } from "@/lib/utils"

const VW = 320
const VH = 200
const ROW_W = 200
const ROW_H = 30
const GAP = 4

interface LayerRow {
  label: string
  status: "covered" | "focus" | "future"
  note: string
}

const layers: LayerRow[] = [
  { label: "Application",  status: "future",  note: "above today's focus" },
  { label: "Transport",    status: "focus",   note: "this lecture" },
  { label: "Network",      status: "covered", note: "LN21" },
  { label: "Link",         status: "covered", note: "LN21" },
  { label: "Physical",     status: "covered", note: "folded into Link" },
]

const styles: Record<string, { fill: string; stroke: string; text: string; note: string }> = {
  covered: {
    fill: "fill-slate-500/10",
    stroke: "stroke-slate-500/30",
    text: "fill-muted-foreground/50",
    note: "fill-muted-foreground/30",
  },
  focus: {
    fill: "fill-blue-500/15",
    stroke: "stroke-blue-500/50",
    text: "fill-blue-700 dark:fill-blue-300",
    note: "fill-blue-600 dark:fill-blue-400",
  },
  future: {
    fill: "fill-slate-500/5",
    stroke: "stroke-slate-500/15",
    text: "fill-muted-foreground/30",
    note: "fill-muted-foreground/20",
  },
}

export function LayerFocusDiagram({ className }: { className?: string }) {
  const startX = (VW - ROW_W) / 2
  const startY = 20

  return (
    <div className={cn("my-6 flex justify-center", className)}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-xs">
        {layers.map((l, i) => {
          const y = startY + i * (ROW_H + GAP)
          const s = styles[l.status]
          const isFocus = l.status === "focus"

          return (
            <g key={l.label}>
              <rect x={startX} y={y} width={ROW_W} height={ROW_H} rx={5}
                className={cn("stroke-[1.5] transition-all", s.fill, s.stroke)}
                strokeDasharray={l.status === "future" ? "4 3" : undefined} />
              <text x={startX + 12} y={y + 19} className={cn("font-semibold", s.text)} fontSize={10}>
                {l.label}
              </text>
              <text x={startX + ROW_W - 12} y={y + 19} textAnchor="end"
                className={cn("font-medium", s.note)} fontSize={8}>
                {l.note}
              </text>

              {isFocus && (
                <rect x={startX - 3} y={y - 3} width={ROW_W + 6} height={ROW_H + 6} rx={7}
                  className="fill-none stroke-blue-500/30 stroke-[2]" strokeDasharray="6 3" />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
