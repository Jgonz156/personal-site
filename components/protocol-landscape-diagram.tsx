"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const COL_W = 130
const ROW_H = 36
const GAP_X = 12
const GAP_Y = 4
const PAD_X = 40
const PAD_Y = 44
const LABEL_COL_W = 100

interface Protocol {
  name: string
  accent: { fill: string; stroke: string; text: string; dimFill: string; dimStroke: string }
  layers: (string | null)[]
}

interface LayerRole {
  label: string
  question: string
}

const roles: LayerRole[] = [
  { label: "Semantic / App", question: "What meaning does the data carry?" },
  { label: "Transport / Guarantee", question: "What delivery promises are made?" },
  { label: "Framing / Link", question: "How are bits grouped and checked?" },
  { label: "Physical", question: "How do signals move?" },
]

const protocols: Protocol[] = [
  {
    name: "TCP/IP",
    accent: {
      fill: "fill-blue-500/15", stroke: "stroke-blue-500/40",
      text: "fill-blue-700 dark:fill-blue-300",
      dimFill: "fill-blue-500/5", dimStroke: "stroke-blue-500/15",
    },
    layers: [
      "HTTP, DNS, etc.",
      "TCP / UDP",
      "Ethernet frame",
      "PHY · copper / fiber",
    ],
  },
  {
    name: "USB",
    accent: {
      fill: "fill-emerald-500/15", stroke: "stroke-emerald-500/40",
      text: "fill-emerald-700 dark:fill-emerald-300",
      dimFill: "fill-emerald-500/5", dimStroke: "stroke-emerald-500/15",
    },
    layers: [
      "Device class (HID, storage…)",
      "Transfer types (ctrl, bulk, isoch, intr)",
      "Token · Data · Handshake packets",
      "Differential D+ / D−",
    ],
  },
  {
    name: "PCIe",
    accent: {
      fill: "fill-amber-500/15", stroke: "stroke-amber-500/40",
      text: "fill-amber-700 dark:fill-amber-300",
      dimFill: "fill-amber-500/5", dimStroke: "stroke-amber-500/15",
    },
    layers: [
      "Memory-mapped I/O",
      "Transaction layer (rd/wr/cpl)",
      "DLLP · CRC · ack/nak",
      "Differential lanes",
    ],
  },
  {
    name: "BGP",
    accent: {
      fill: "fill-purple-500/15", stroke: "stroke-purple-500/40",
      text: "fill-purple-700 dark:fill-purple-300",
      dimFill: "fill-purple-500/5", dimStroke: "stroke-purple-500/15",
    },
    layers: [
      "Route advertisements",
      "Rides on TCP (port 179)",
      null,
      "Inter-AS links",
    ],
  },
]

const VW = LABEL_COL_W + PAD_X + protocols.length * COL_W + (protocols.length - 1) * GAP_X + PAD_X
const VH = PAD_Y + roles.length * ROW_H + (roles.length - 1) * GAP_Y + 36

export function ProtocolLandscapeDiagram({ className }: { className?: string }) {
  const [hoverRow, setHoverRow] = useState<number | null>(null)

  const colStartX = LABEL_COL_W + PAD_X
  const rowStartY = PAD_Y

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Protocol Design Is a Recurring Pattern</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Every protocol answers the same questions — only the medium and guarantees change. Hover a row to compare.
        </p>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-full max-w-3xl mx-auto"
          onMouseLeave={() => setHoverRow(null)}
        >
          {/* Column headers */}
          {protocols.map((p, ci) => {
            const cx = colStartX + ci * (COL_W + GAP_X) + COL_W / 2
            return (
              <text key={p.name} x={cx} y={PAD_Y - 10} textAnchor="middle"
                className={cn("font-bold", p.accent.text)} fontSize={10}>
                {p.name}
              </text>
            )
          })}

          {/* Rows */}
          {roles.map((role, ri) => {
            const ry = rowStartY + ri * (ROW_H + GAP_Y)
            const isHover = hoverRow === ri

            return (
              <g key={role.label}
                onMouseEnter={() => setHoverRow(ri)}
              >
                {/* Row label */}
                <text x={LABEL_COL_W - 4} y={ry + ROW_H / 2 + 3} textAnchor="end"
                  className={cn("font-semibold transition-all duration-200",
                    isHover ? "fill-foreground" : "fill-muted-foreground/40"
                  )} fontSize={8}>
                  {role.label}
                </text>

                {/* Highlight band behind entire row */}
                {isHover && (
                  <rect x={colStartX - 4} y={ry - 2}
                    width={protocols.length * COL_W + (protocols.length - 1) * GAP_X + 8}
                    height={ROW_H + 4} rx={6}
                    className="fill-foreground/[0.03] stroke-none" />
                )}

                {/* Protocol cells */}
                {protocols.map((p, ci) => {
                  const cx = colStartX + ci * (COL_W + GAP_X)
                  const label = p.layers[ri]
                  const isEmpty = label === null

                  if (isEmpty) {
                    return (
                      <g key={p.name}>
                        <rect x={cx} y={ry} width={COL_W} height={ROW_H} rx={5}
                          className="fill-none stroke-muted-foreground/10 stroke-1"
                          strokeDasharray="4 3" />
                        <text x={cx + COL_W / 2} y={ry + ROW_H / 2 + 3} textAnchor="middle"
                          className="fill-muted-foreground/15" fontSize={7}>
                          (not applicable)
                        </text>
                      </g>
                    )
                  }

                  const highlighted = isHover
                  return (
                    <g key={p.name}>
                      <rect x={cx} y={ry} width={COL_W} height={ROW_H} rx={5}
                        className={cn("stroke-[1.5] transition-all duration-200",
                          highlighted ? p.accent.fill : p.accent.dimFill,
                          highlighted ? p.accent.stroke : p.accent.dimStroke,
                        )} />
                      <text x={cx + COL_W / 2} y={ry + ROW_H / 2 + 3} textAnchor="middle"
                        className={cn("transition-all duration-200",
                          highlighted ? p.accent.text : "fill-muted-foreground/30"
                        )} fontSize={7}>
                        {label}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}

          {/* Question annotation for hovered row */}
          {hoverRow !== null && (
            <text
              x={VW / 2}
              y={rowStartY + roles.length * (ROW_H + GAP_Y) + 16}
              textAnchor="middle"
              className="fill-muted-foreground/50 font-medium" fontSize={8}
            >
              {roles[hoverRow].question}
            </text>
          )}

          {/* Default prompt when nothing hovered */}
          {hoverRow === null && (
            <text
              x={VW / 2}
              y={rowStartY + roles.length * (ROW_H + GAP_Y) + 16}
              textAnchor="middle"
              className="fill-muted-foreground/20" fontSize={8}
            >
              ↑ hover a row to see the shared design question ↑
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
