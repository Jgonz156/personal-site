"use client"

import { useState, useMemo } from "react"

interface BirthdayParadoxChartProps {
  className?: string
}

function computeProbabilities(maxK: number): number[] {
  const probs: number[] = [0]
  let pAllDiff = 1
  for (let k = 1; k <= maxK; k++) {
    pAllDiff *= (365 - k + 1) / 365
    probs.push(1 - pAllDiff)
  }
  return probs
}

const MAX_K = 70
const CHART_W = 560
const CHART_H = 280
const MARGIN = { top: 24, right: 20, bottom: 40, left: 50 }
const PLOT_W = CHART_W - MARGIN.left - MARGIN.right
const PLOT_H = CHART_H - MARGIN.top - MARGIN.bottom

export function BirthdayParadoxChart({
  className = "",
}: BirthdayParadoxChartProps) {
  const [activeK, setActiveK] = useState(23)
  const probs = useMemo(() => computeProbabilities(MAX_K), [])

  function xScale(k: number) {
    return MARGIN.left + (k / MAX_K) * PLOT_W
  }
  function yScale(p: number) {
    return MARGIN.top + (1 - p) * PLOT_H
  }

  const pathD = probs
    .map((p, k) => `${k === 0 ? "M" : "L"} ${xScale(k).toFixed(1)} ${yScale(p).toFixed(1)}`)
    .join(" ")

  const xTicks = [0, 10, 20, 23, 30, 40, 50, 60, 70]
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0]

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">
          Birthday Paradox — Collision Probability
        </span>
      </div>

      <div className="px-4 py-4 flex flex-col items-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          width={CHART_W}
          height={CHART_H}
          className="max-w-full h-auto"
        >
          {yTicks.map((t) => (
            <g key={`yt-${t}`}>
              <line
                x1={MARGIN.left}
                y1={yScale(t)}
                x2={MARGIN.left + PLOT_W}
                y2={yScale(t)}
                className="stroke-muted-foreground/15"
                strokeWidth={1}
              />
              <text
                x={MARGIN.left - 6}
                y={yScale(t) + 4}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize={10}
              >
                {Math.round(t * 100)}%
              </text>
            </g>
          ))}

          {xTicks.map((t) => (
            <text
              key={`xt-${t}`}
              x={xScale(t)}
              y={CHART_H - MARGIN.bottom + 20}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={10}
            >
              {t}
            </text>
          ))}
          <text
            x={MARGIN.left + PLOT_W / 2}
            y={CHART_H - 4}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={11}
          >
            People in the room
          </text>

          <line
            x1={MARGIN.left}
            y1={yScale(0.5)}
            x2={MARGIN.left + PLOT_W}
            y2={yScale(0.5)}
            className="stroke-destructive/50"
            strokeWidth={1}
            strokeDasharray="6 3"
          />
          <text
            x={MARGIN.left + PLOT_W + 2}
            y={yScale(0.5) + 3}
            className="fill-destructive/70"
            fontSize={9}
            textAnchor="start"
          >
            50%
          </text>

          <line
            x1={MARGIN.left}
            y1={yScale(0.999)}
            x2={MARGIN.left + PLOT_W}
            y2={yScale(0.999)}
            className="stroke-muted-foreground/30"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text
            x={MARGIN.left + PLOT_W + 2}
            y={yScale(0.999) + 3}
            className="fill-muted-foreground/60"
            fontSize={9}
            textAnchor="start"
          >
            99.9%
          </text>

          <path
            d={pathD}
            fill="none"
            className="stroke-primary"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          <circle
            cx={xScale(23)}
            cy={yScale(probs[23])}
            r={5}
            className="fill-destructive"
          />
          <text
            x={xScale(23) + 8}
            y={yScale(probs[23]) + 4}
            className="fill-destructive"
            fontSize={10}
            fontWeight="bold"
          >
            k=23: {(probs[23] * 100).toFixed(1)}%
          </text>

          <circle
            cx={xScale(activeK)}
            cy={yScale(probs[activeK])}
            r={4}
            className="fill-primary"
          />
          {activeK !== 23 && (
            <text
              x={xScale(activeK) + (activeK > 55 ? -8 : 8)}
              y={yScale(probs[activeK]) - 8}
              textAnchor={activeK > 55 ? "end" : "start"}
              className="fill-primary"
              fontSize={10}
              fontWeight="bold"
            >
              k={activeK}: {(probs[activeK] * 100).toFixed(1)}%
            </text>
          )}
        </svg>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>k = {activeK}</span>
          <input
            type="range"
            min={1}
            max={MAX_K}
            value={activeK}
            onChange={(e) => setActiveK(Number(e.target.value))}
            className="w-48 accent-primary"
          />
          <span>P(collision) = {(probs[activeK] * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 text-center text-xs text-muted-foreground italic">
        Birthday paradox: 50% chance of collision at just 23 people. Pigeonhole
        certainty: 366 people for a guaranteed match.
      </div>
    </div>
  )
}
