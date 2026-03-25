"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BijectionVisualizerProps {
  leftItems: string[]
  rightItems: string[]
  mappings: [number, number][]
  leftLabel: string
  rightLabel: string
  functionLabel: string
  className?: string
}

export function BijectionVisualizer({
  leftItems,
  rightItems,
  mappings,
  leftLabel,
  rightLabel,
  functionLabel,
  className = "",
}: BijectionVisualizerProps) {
  const [step, setStep] = useState(0)
  const totalSteps = mappings.length

  const ITEM_H = 32
  const ITEM_GAP = 4
  const COL_W = 140
  const GAP = 160
  const PAD_TOP = 48
  const PAD_BOTTOM = 16
  const PAD_X = 16

  const maxItems = Math.max(leftItems.length, rightItems.length)
  const contentH = maxItems * ITEM_H + (maxItems - 1) * ITEM_GAP
  const svgH = PAD_TOP + contentH + PAD_BOTTOM
  const svgW = PAD_X + COL_W + GAP + COL_W + PAD_X

  const leftX = PAD_X
  const rightX = PAD_X + COL_W + GAP

  function itemY(index: number, total: number) {
    const blockH = total * ITEM_H + (total - 1) * ITEM_GAP
    const offsetY = PAD_TOP + (contentH - blockH) / 2
    return offsetY + index * (ITEM_H + ITEM_GAP) + ITEM_H / 2
  }

  const activeLeft = step > 0 ? mappings[step - 1][0] : -1
  const activeRight = step > 0 ? mappings[step - 1][1] : -1

  const mappedLeft = new Set<number>()
  const mappedRight = new Set<number>()
  for (let i = 0; i < step; i++) {
    mappedLeft.add(mappings[i][0])
    mappedRight.add(mappings[i][1])
  }

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">{functionLabel}</span>
      </div>

      <div className="px-4 py-4 flex justify-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          width={svgW}
          height={svgH}
          className="max-w-full h-auto"
        >
          <text
            x={leftX + COL_W / 2}
            y={20}
            textAnchor="middle"
            className="fill-blue-500 text-xs font-semibold"
            fontSize={13}
          >
            {leftLabel}
          </text>
          <text
            x={rightX + COL_W / 2}
            y={20}
            textAnchor="middle"
            className="fill-green-500 text-xs font-semibold"
            fontSize={13}
          >
            {rightLabel}
          </text>

          <rect
            x={leftX}
            y={PAD_TOP - 8}
            width={COL_W}
            height={contentH + 16}
            rx={8}
            className="fill-blue-500/5 stroke-blue-500/30"
            strokeWidth={1}
          />
          <rect
            x={rightX}
            y={PAD_TOP - 8}
            width={COL_W}
            height={contentH + 16}
            rx={8}
            className="fill-green-500/5 stroke-green-500/30"
            strokeWidth={1}
          />

          {leftItems.map((item, i) => {
            const y = itemY(i, leftItems.length)
            const isActive = i === activeLeft
            const isMapped = mappedLeft.has(i)
            return (
              <g key={`l-${i}`}>
                <rect
                  x={leftX + 4}
                  y={y - ITEM_H / 2 + 2}
                  width={COL_W - 8}
                  height={ITEM_H - 4}
                  rx={4}
                  className={
                    isActive
                      ? "fill-blue-500/30 stroke-blue-500"
                      : isMapped
                        ? "fill-blue-500/10 stroke-blue-500/40"
                        : "fill-transparent stroke-transparent"
                  }
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x={leftX + COL_W / 2}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground"
                  fontSize={11}
                  fontFamily="monospace"
                >
                  {item}
                </text>
              </g>
            )
          })}

          {rightItems.map((item, i) => {
            const y = itemY(i, rightItems.length)
            const isActive = i === activeRight
            const isMapped = mappedRight.has(i)
            return (
              <g key={`r-${i}`}>
                <rect
                  x={rightX + 4}
                  y={y - ITEM_H / 2 + 2}
                  width={COL_W - 8}
                  height={ITEM_H - 4}
                  rx={4}
                  className={
                    isActive
                      ? "fill-green-500/30 stroke-green-500"
                      : isMapped
                        ? "fill-green-500/10 stroke-green-500/40"
                        : "fill-transparent stroke-transparent"
                  }
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x={rightX + COL_W / 2}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground"
                  fontSize={11}
                  fontFamily="monospace"
                >
                  {item}
                </text>
              </g>
            )
          })}

          {mappings.slice(0, step).map(([li, ri], idx) => {
            const ly = itemY(li, leftItems.length)
            const ry = itemY(ri, rightItems.length)
            const isCurrent = idx === step - 1
            return (
              <line
                key={`arrow-${idx}`}
                x1={leftX + COL_W - 4}
                y1={ly}
                x2={rightX + 4}
                y2={ry}
                className={
                  isCurrent ? "stroke-primary" : "stroke-muted-foreground/40"
                }
                strokeWidth={isCurrent ? 2 : 1}
                markerEnd="url(#arrowhead)"
              />
            )
          })}

          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                className="fill-muted-foreground/60"
              />
            </marker>
          </defs>
        </svg>
      </div>

      {step === totalSteps && (
        <div className="px-4 pb-3">
          <p className="text-sm text-center text-primary font-medium">
            Every left item maps to exactly one right item, and every right item
            is reached — bijection confirmed.
          </p>
        </div>
      )}

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          ← Previous
        </Button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === step
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Step ${i}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep(Math.min(totalSteps, step + 1))}
          disabled={step === totalSteps}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
