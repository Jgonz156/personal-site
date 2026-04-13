"use client"

import { cn } from "@/lib/utils"

const VW = 620
const VH = 240

interface TimeBlock {
  x: number; w: number; label: string
  fill: string; textColor: string
}

const TRACK_H = 36
const TRACK_Y = [40, 110, 180]
const LABEL_X = 10
const BAR_X = 130
const BAR_W = 460

const blockingBlocks: TimeBlock[] = [
  { x: 0,   w: 80,  label: "running",         fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 80,  w: 200, label: "sleeping (recv)",  fill: "fill-slate-500/10 stroke-slate-500/20",  textColor: "fill-muted-foreground/40" },
  { x: 280, w: 40,  label: "data!",            fill: "fill-emerald-500/15 stroke-emerald-500/40", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { x: 320, w: 140, label: "running",          fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
]

const nonblockingBlocks: TimeBlock[] = [
  { x: 0,   w: 50, label: "try",     fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 50,  w: 30, label: "EAGAIN",  fill: "fill-rose-500/10 stroke-rose-500/30",     textColor: "fill-rose-700 dark:fill-rose-300" },
  { x: 80,  w: 40, label: "work",    fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 120, w: 30, label: "try",     fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 150, w: 30, label: "EAGAIN",  fill: "fill-rose-500/10 stroke-rose-500/30",     textColor: "fill-rose-700 dark:fill-rose-300" },
  { x: 180, w: 40, label: "work",    fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 220, w: 30, label: "try",     fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 250, w: 40, label: "data!",   fill: "fill-emerald-500/15 stroke-emerald-500/40", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { x: 290, w: 170, label: "running", fill: "fill-blue-500/15 stroke-blue-500/40",   textColor: "fill-blue-700 dark:fill-blue-300" },
]

const readinessBlocks: TimeBlock[] = [
  { x: 0,   w: 60,  label: "running",                   fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 60,  w: 140, label: "poll() — waiting on N fds",  fill: "fill-purple-500/10 stroke-purple-500/30", textColor: "fill-purple-700 dark:fill-purple-300" },
  { x: 200, w: 40,  label: "fd 3 ready",                 fill: "fill-emerald-500/15 stroke-emerald-500/40", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { x: 240, w: 60,  label: "handle fd 3",                fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
  { x: 300, w: 80,  label: "poll() again",               fill: "fill-purple-500/10 stroke-purple-500/30", textColor: "fill-purple-700 dark:fill-purple-300" },
  { x: 380, w: 40,  label: "fd 7 ready",                 fill: "fill-emerald-500/15 stroke-emerald-500/40", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { x: 420, w: 40,  label: "handle",                     fill: "fill-blue-500/15 stroke-blue-500/40",    textColor: "fill-blue-700 dark:fill-blue-300" },
]

const tracks = [
  { label: "Blocking", sub: "sleeps on one call", blocks: blockingBlocks, labelColor: "fill-blue-700 dark:fill-blue-300" },
  { label: "Nonblocking", sub: "polls repeatedly", blocks: nonblockingBlocks, labelColor: "fill-rose-700 dark:fill-rose-300" },
  { label: "Readiness", sub: "waits for any fd", blocks: readinessBlocks, labelColor: "fill-purple-700 dark:fill-purple-300" },
]

export function WaitingModelTimeline({ className }: { className?: string }) {
  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Waiting Models — Blocking, Nonblocking, Readiness</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Three strategies for the same problem: what should the process do while the network is not ready?
        </p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          {tracks.map((t, ti) => {
            const ty = TRACK_Y[ti]

            return (
              <g key={t.label}>
                {/* Track label */}
                <text x={LABEL_X} y={ty + 14}
                  className={cn("font-bold", t.labelColor)} fontSize={9}>
                  {t.label}
                </text>
                <text x={LABEL_X} y={ty + 26}
                  className="fill-muted-foreground/30" fontSize={6}>
                  {t.sub}
                </text>

                {/* Track background */}
                <rect x={BAR_X} y={ty} width={BAR_W} height={TRACK_H} rx={4}
                  className="fill-slate-500/5 stroke-slate-500/10 stroke-1" />

                {/* Blocks */}
                {t.blocks.map((b, bi) => {
                  const bx = BAR_X + (b.x / BAR_W) * BAR_W
                  const bw = (b.w / BAR_W) * BAR_W
                  return (
                    <g key={bi}>
                      <rect x={bx + 1} y={ty + 2} width={bw - 2} height={TRACK_H - 4} rx={3}
                        className={cn("stroke-1", b.fill)} />
                      {bw > 25 && (
                        <text x={bx + bw / 2} y={ty + TRACK_H / 2 + 3} textAnchor="middle"
                          className={cn("font-medium", b.textColor)} fontSize={bw > 60 ? 7 : 5}>
                          {b.label}
                        </text>
                      )}
                    </g>
                  )
                })}
              </g>
            )
          })}

          {/* Time axis */}
          <line x1={BAR_X} y1={VH - 10} x2={BAR_X + BAR_W} y2={VH - 10}
            className="stroke-muted-foreground/15 stroke-1" markerEnd="url(#time-arr)" />
          <text x={BAR_X + BAR_W + 8} y={VH - 7}
            className="fill-muted-foreground/20" fontSize={7}>time</text>
          <defs>
            <marker id="time-arr" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" className="fill-muted-foreground/15" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  )
}
