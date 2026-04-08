"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type Mode = "general" | "mouse"

const VW = 720
const VH = 570

interface CardDef {
  title: string
  subtitle: string
  examples: string
}

interface StageDef {
  num: number
  perspective: string
  question: string
  left: CardDef
  right: CardDef
}

const stages: StageDef[] = [
  {
    num: 1,
    perspective: "The Device",
    question: "What does the physical hardware naturally produce?",
    left: { title: "Discrete", subtitle: "Self-contained, independently addressable units", examples: "HDD sectors, keypress events, USB packets" },
    right: { title: "Continuous", subtitle: "Flowing state that changes over time", examples: "Mouse position, audio waveform, temperature" },
  },
  {
    num: 2,
    perspective: "The Controller",
    question: "How should we package it for the wire?",
    left: { title: "Block Protocol", subtitle: "Random access, buffering, interleaving", examples: "Fixed-size chunks with metadata" },
    right: { title: "Stream Protocol", subtitle: "Low-overhead, sequential delivery", examples: "Byte-at-a-time or small reports" },
  },
  {
    num: 3,
    perspective: "The Mainboard",
    question: "How should we listen for data?",
    left: { title: "Interrupts", subtitle: "Unpredictable bursts with idle gaps", examples: "Free CPU between arrivals" },
    right: { title: "Polling", subtitle: "Minimum latency, near-continuous arrival", examples: "CPU checks status each cycle" },
  },
]

const stageYs = [16, 210, 404]
const stageH = 145
const cardW = 275
const cardH = 78
const leftX = 50
const rightX = 395
const leftCx = leftX + cardW / 2
const rightCx = rightX + cardW / 2

function cardTopY(stageIdx: number) { return stageYs[stageIdx] + 50 }
function cardBotY(stageIdx: number) { return cardTopY(stageIdx) + cardH }

const adaptLabels = [
  { general: "\u2190 controller adapts when nature \u2260 protocol \u2192", mouse: "Controller samples continuous \u2192 discrete reports" },
  { general: "\u2190 system adapts: frequency / workload tradeoffs \u2192", mouse: "Polling rate set by host (125 Hz \u2013 8 kHz)" },
]

export function IODecisionChain({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("general")
  const isMouse = mode === "mouse"

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">I/O Reasoning Chain</h4>
          <div className="flex gap-1 rounded-lg border p-0.5">
            <button onClick={() => setMode("general")}
              className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors",
                mode === "general" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}>General</button>
            <button onClick={() => setMode("mouse")}
              className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors",
                mode === "mouse" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}>Mouse Example</button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          {isMouse
            ? "A mouse produces both discrete clicks and continuous movement. Trace the two paths: clicks flow straight down the left column, movement crosses right\u2011to\u2011left at the controller (adaptation) and back right for polling."
            : "At each stage along the data path, the same question recurs: discrete or continuous? The dashed cross\u2011lines show where the controller or system adapts between paradigms."}
        </p>

        <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto">

          {/* ── Layer 1: Stage wrappers ── */}
          {stageYs.map((sy, i) => (
            <rect key={`sw-${i}`} x={30} y={sy} width={660} height={stageH} rx={10}
              className="fill-none stroke-border/40 stroke-[1.5] stroke-dashed" />
          ))}

          {/* ── Layer 2: Connection lines between stages ── */}
          {[0, 1].map((gap) => {
            const fromBot = cardBotY(gap)
            const toTop = cardTopY(gap + 1)

            const clickActive = isMouse
            const moveActive = isMouse

            const moveCrossDir = gap === 0 ? "r2l" : "l2r"

            return (
              <g key={`conn-${gap}`}>
                {/* Left straight (click path) */}
                <line x1={leftCx} y1={fromBot} x2={leftCx} y2={toTop}
                  className={cn("transition-all duration-300",
                    clickActive ? "stroke-sky-500 stroke-[3]" : "stroke-border/50 stroke-[1.5]"
                  )}
                  markerEnd={clickActive ? "url(#dc-arrow-click)" : undefined} />

                {/* Right straight */}
                <line x1={rightCx} y1={fromBot} x2={rightCx} y2={toTop}
                  className="stroke-border/50 stroke-[1.5] transition-all duration-300" />

                {/* Right→Left cross (adaptation) */}
                <line x1={rightCx} y1={fromBot} x2={leftCx} y2={toTop}
                  className={cn("transition-all duration-300",
                    moveActive && moveCrossDir === "r2l"
                      ? "stroke-amber-500 stroke-[3]"
                      : "stroke-border/20 stroke-1 stroke-dashed"
                  )}
                  markerEnd={moveActive && moveCrossDir === "r2l" ? "url(#dc-arrow-move)" : undefined} />

                {/* Left→Right cross (adaptation) */}
                <line x1={leftCx} y1={fromBot} x2={rightCx} y2={toTop}
                  className={cn("transition-all duration-300",
                    moveActive && moveCrossDir === "l2r"
                      ? "stroke-amber-500 stroke-[3]"
                      : "stroke-border/20 stroke-1 stroke-dashed"
                  )}
                  markerEnd={moveActive && moveCrossDir === "l2r" ? "url(#dc-arrow-move)" : undefined} />
              </g>
            )
          })}

          {/* ── Layer 3: Card rects ── */}
          {stages.map((_, i) => {
            const cy = cardTopY(i)

            const clickL = isMouse
            const moveL = isMouse && (i === 1)
            const moveR = isMouse && (i === 0 || i === 2)

            return (
              <g key={`cr-${i}`}>
                <rect x={leftX} y={cy} width={cardW} height={cardH} rx={6}
                  className={cn("stroke-2 transition-all duration-300",
                    clickL && !moveL ? "fill-sky-500/20 stroke-sky-500" :
                    moveL ? "fill-amber-500/20 stroke-amber-500" :
                    "fill-sky-500/8 stroke-sky-500/40"
                  )} />
                <rect x={rightX} y={cy} width={cardW} height={cardH} rx={6}
                  className={cn("stroke-2 transition-all duration-300",
                    moveR ? "fill-amber-500/20 stroke-amber-500" :
                    "fill-amber-500/8 stroke-amber-500/40"
                  )} />
              </g>
            )
          })}

          {/* ── Layer 4: All text ── */}

          {/* Stage headers + questions */}
          {stages.map((stage, i) => (
            <g key={`sh-${i}`}>
              <text x={VW / 2} y={stageYs[i] + 18} textAnchor="middle"
                className="fill-muted-foreground/70 font-bold tracking-wide" fontSize={10}>
                STAGE {stage.num} — {stage.perspective.toUpperCase()}
              </text>
              <text x={VW / 2} y={stageYs[i] + 34} textAnchor="middle"
                className="fill-muted-foreground/50 italic" fontSize={9}>
                {stage.question}
              </text>
            </g>
          ))}

          {/* Card labels */}
          {stages.map((stage, i) => {
            const cy = cardTopY(i)
            const clickL = isMouse
            const moveL = isMouse && i === 1
            const moveR = isMouse && (i === 0 || i === 2)
            const activeL = clickL || moveL
            const activeR = moveR

            return (
              <g key={`cl-${i}`}>
                {/* Left card */}
                <text x={leftCx} y={cy + 22} textAnchor="middle"
                  className={cn("font-bold transition-colors", activeL ? "fill-foreground" : "fill-muted-foreground")}
                  fontSize={12}>{stage.left.title}</text>
                <text x={leftCx} y={cy + 40} textAnchor="middle"
                  className={cn("transition-colors", activeL ? "fill-foreground/80" : "fill-muted-foreground/70")}
                  fontSize={8}>{stage.left.subtitle}</text>
                <text x={leftCx} y={cy + 56} textAnchor="middle"
                  className="fill-muted-foreground/45" fontSize={7}>{stage.left.examples}</text>

                {/* Right card */}
                <text x={rightCx} y={cy + 22} textAnchor="middle"
                  className={cn("font-bold transition-colors", activeR ? "fill-foreground" : "fill-muted-foreground")}
                  fontSize={12}>{stage.right.title}</text>
                <text x={rightCx} y={cy + 40} textAnchor="middle"
                  className={cn("transition-colors", activeR ? "fill-foreground/80" : "fill-muted-foreground/70")}
                  fontSize={8}>{stage.right.subtitle}</text>
                <text x={rightCx} y={cy + 56} textAnchor="middle"
                  className="fill-muted-foreground/45" fontSize={7}>{stage.right.examples}</text>
              </g>
            )
          })}

          {/* Adaptation labels between stages */}
          {adaptLabels.map((lbl, i) => {
            const midY = (cardBotY(i) + cardTopY(i + 1)) / 2 + 4
            return (
              <text key={`al-${i}`} x={VW / 2} y={midY} textAnchor="middle"
                className={cn("font-semibold transition-colors",
                  isMouse ? "fill-amber-500" : "fill-muted-foreground/30"
                )} fontSize={8}>
                {isMouse ? lbl.mouse : lbl.general}
              </text>
            )
          })}

          {/* Mouse mode path labels */}
          {isMouse && (
            <>
              <text x={leftX + 8} y={cardTopY(0) - 4}
                className="fill-sky-500 font-bold" fontSize={9}>CLICKS</text>
              <text x={rightX + cardW - 80} y={cardTopY(0) - 4}
                className="fill-amber-500 font-bold" fontSize={9}>MOVEMENT</text>
            </>
          )}

          <defs>
            <marker id="dc-arrow-click" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-sky-500" />
            </marker>
            <marker id="dc-arrow-move" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-amber-500" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  )
}
