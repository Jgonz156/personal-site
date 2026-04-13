"use client"

import { cn } from "@/lib/utils"

const VW = 560
const VH = 260

interface ViewBand {
  label: string; sub: string; y: number; h: number; w: number
  fill: string; stroke: string; text: string
  items?: string[]
}

const views: ViewBand[] = [
  {
    label: "Application View", sub: '"client asks, server replies"',
    y: 10, h: 44, w: 200,
    fill: "fill-emerald-500/10", stroke: "stroke-emerald-500/40",
    text: "fill-emerald-700 dark:fill-emerald-300",
    items: ["send(\"GET_TEMP\")", "recv() → \"42 C\""],
  },
  {
    label: "Socket / Transport View", sub: "endpoints, ports, connection state, readiness",
    y: 72, h: 60, w: 360,
    fill: "fill-blue-500/10", stroke: "stroke-blue-500/40",
    text: "fill-blue-700 dark:fill-blue-300",
    items: ["4-tuple identity", "TCP seq/ack state", "recv buffer", "blocking / poll()"],
  },
  {
    label: "Packet / Path View", sub: "headers, packets, hops, NICs, DMA, interrupts",
    y: 150, h: 70, w: 500,
    fill: "fill-amber-500/10", stroke: "stroke-amber-500/40",
    text: "fill-amber-700 dark:fill-amber-300",
    items: ["IP + TCP headers", "Ethernet frames", "Router forwarding", "NIC descriptor rings", "DMA + interrupts"],
  },
]

export function AbstractionCompressionDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Three Views of the Same Conversation</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Each layer compresses the complexity below into a simpler abstraction above.
        </p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          {views.map((v, i) => {
            const bx = (VW - v.w) / 2
            return (
              <g key={v.label}>
                <rect x={bx} y={v.y} width={v.w} height={v.h} rx={6}
                  className={cn("stroke-[1.5]", v.fill, v.stroke)} />

                <text x={VW / 2} y={v.y + 16} textAnchor="middle"
                  className={cn("font-bold", v.text)} fontSize={9}>
                  {v.label}
                </text>
                <text x={VW / 2} y={v.y + 28} textAnchor="middle"
                  className="fill-muted-foreground/30" fontSize={7}>
                  {v.sub}
                </text>

                {v.items && (
                  <text x={VW / 2} y={v.y + v.h - 8} textAnchor="middle"
                    className="fill-muted-foreground/20 font-mono" fontSize={6}>
                    {v.items.join("  ·  ")}
                  </text>
                )}

                {/* Connector */}
                {i < views.length - 1 && (
                  <line x1={VW / 2} y1={v.y + v.h} x2={VW / 2} y2={views[i + 1].y}
                    className="stroke-muted-foreground/10 stroke-1" />
                )}
              </g>
            )
          })}

          {/* Annotations */}
          <text x={VW / 2 + 110} y={55} className="fill-emerald-600/30 dark:fill-emerald-400/20 font-semibold" fontSize={7}>
            ← what the programmer writes
          </text>
          <text x={VW / 2 + 190} y={105} className="fill-blue-600/30 dark:fill-blue-400/20 font-semibold" fontSize={7}>
            ← what the kernel manages
          </text>
          <text x={VW / 2 + 260} y={190} className="fill-amber-600/30 dark:fill-amber-400/20 font-semibold" fontSize={7}>
            ← what actually happens
          </text>
        </svg>
      </div>
    </div>
  )
}
