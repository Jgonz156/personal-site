"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

export function PollingVsInterruptTimeline({ className }: { className?: string }) {
  const [latency, setLatency] = useState(50)

  const totalTime = 420
  const requestTime = 20
  const handleTime = 16
  const deviceTime = latency * 3.36

  const pollBarWidth = Math.min(deviceTime, totalTime - requestTime)
  const interruptOtherWidth = Math.min(deviceTime, totalTime - requestTime - handleTime)

  const barH = 36
  const barY1 = 70
  const barY2 = 155
  const barLeft = 60
  const barRight = barLeft + totalTime
  const viewW = barRight + 100

  const pollLabel =
    pollBarWidth >= 130 ? "Busy-waiting (checking status)" :
    pollBarWidth >= 60 ? "Busy-waiting" : null
  const interruptLabel =
    interruptOtherWidth >= 110 ? "Other productive work" :
    interruptOtherWidth >= 50 ? "Productive" : null

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold">Polling vs. Interrupt-Driven I/O</h4>
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground" htmlFor="latency-slider">
              Device latency:
            </label>
            <input
              id="latency-slider"
              type="range"
              min={5}
              max={100}
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value))}
              className="w-32 accent-primary"
            />
            <span className="text-xs font-mono text-muted-foreground w-16">
              {latency < 30 ? "Fast" : latency < 70 ? "Medium" : "Slow"}
            </span>
          </div>
        </div>

        <svg width="100%" viewBox={`0 0 ${viewW} 230`} className="max-w-3xl mx-auto">
          {/* === POLLING TIMELINE === */}
          <text x={barLeft} y={barY1 - 12} className="fill-foreground font-semibold" fontSize={11}>
            Polling (Busy-Wait)
          </text>

          {/* Background bar */}
          <rect x={barLeft} y={barY1} width={totalTime} height={barH} rx={4}
            className="fill-muted/50 stroke-border stroke-1" />

          {/* Request phase */}
          <rect x={barLeft} y={barY1} width={requestTime} height={barH} rx={4}
            className="fill-blue-500/30 stroke-blue-500/50 stroke-1" />
          <text x={barLeft + requestTime / 2} y={barY1 + barH / 2 + 3} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300" fontSize={8}>Req</text>

          {/* Polling / wasted cycles */}
          <rect x={barLeft + requestTime} y={barY1} width={pollBarWidth} height={barH}
            className="fill-red-500/25 stroke-red-500/40 stroke-1" />
          {Array.from({ length: Math.floor(pollBarWidth / 10) }).map((_, i) => (
            <line key={i}
              x1={barLeft + requestTime + 5 + i * 10} y1={barY1 + 6}
              x2={barLeft + requestTime + 5 + i * 10} y2={barY1 + barH - 6}
              className="stroke-red-400/40 stroke-[0.5]" />
          ))}
          {pollLabel && (
            <text x={barLeft + requestTime + pollBarWidth / 2} y={barY1 + barH / 2 + 3}
              textAnchor="middle" className="fill-red-700 dark:fill-red-300 font-medium" fontSize={9}>
              {pollLabel}
            </text>
          )}

          {/* Read data */}
          <rect x={barLeft + requestTime + pollBarWidth} y={barY1} width={handleTime} height={barH}
            className="fill-green-500/30 stroke-green-500/50 stroke-1" />
          <text x={barLeft + requestTime + pollBarWidth + handleTime / 2} y={barY1 + barH / 2 + 3}
            textAnchor="middle" className="fill-green-700 dark:fill-green-300" fontSize={7}>Read</text>

          {/* CPU utilization label */}
          <text x={barRight + 10} y={barY1 + barH / 2 + 3} className="fill-red-600 dark:fill-red-400 font-semibold" fontSize={10}>
            {Math.round((pollBarWidth / totalTime) * 100)}% wasted
          </text>

          {/* === INTERRUPT TIMELINE === */}
          <text x={barLeft} y={barY2 - 12} className="fill-foreground font-semibold" fontSize={11}>
            Interrupt-Driven I/O
          </text>

          {/* Background bar */}
          <rect x={barLeft} y={barY2} width={totalTime} height={barH} rx={4}
            className="fill-muted/50 stroke-border stroke-1" />

          {/* Request phase */}
          <rect x={barLeft} y={barY2} width={requestTime} height={barH} rx={4}
            className="fill-blue-500/30 stroke-blue-500/50 stroke-1" />
          <text x={barLeft + requestTime / 2} y={barY2 + barH / 2 + 3} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300" fontSize={8}>Req</text>

          {/* Productive other work */}
          <rect x={barLeft + requestTime} y={barY2} width={interruptOtherWidth} height={barH}
            className="fill-emerald-500/25 stroke-emerald-500/40 stroke-1" />
          {interruptLabel && (
            <text x={barLeft + requestTime + interruptOtherWidth / 2} y={barY2 + barH / 2 + 3}
              textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-medium" fontSize={9}>
              {interruptLabel}
            </text>
          )}

          {/* Interrupt arrow */}
          <line x1={barLeft + requestTime + interruptOtherWidth} y1={barY2 - 14}
            x2={barLeft + requestTime + interruptOtherWidth} y2={barY2}
            className="stroke-amber-500 stroke-2" />
          <polygon
            points={`${barLeft + requestTime + interruptOtherWidth - 4},${barY2 - 4} ${barLeft + requestTime + interruptOtherWidth + 4},${barY2 - 4} ${barLeft + requestTime + interruptOtherWidth},${barY2}`}
            className="fill-amber-500" />
          <text x={barLeft + requestTime + interruptOtherWidth} y={barY2 - 18}
            textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-bold" fontSize={9}>
            IRQ
          </text>

          {/* Handle interrupt + read */}
          <rect x={barLeft + requestTime + interruptOtherWidth} y={barY2}
            width={handleTime} height={barH}
            className="fill-amber-500/30 stroke-amber-500/50 stroke-1" />
          <text x={barLeft + requestTime + interruptOtherWidth + handleTime / 2} y={barY2 + barH / 2 + 3}
            textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize={7}>Handle</text>

          {/* Resume work */}
          {barLeft + requestTime + interruptOtherWidth + handleTime < barRight && (
            <rect x={barLeft + requestTime + interruptOtherWidth + handleTime} y={barY2}
              width={barRight - (barLeft + requestTime + interruptOtherWidth + handleTime)} height={barH}
              className="fill-emerald-500/25 stroke-emerald-500/40 stroke-1" />
          )}

          {/* CPU utilization label */}
          <text x={barRight + 10} y={barY2 + barH / 2 + 3} className="fill-emerald-600 dark:fill-emerald-400 font-semibold" fontSize={10}>
            {Math.round(((totalTime - handleTime - requestTime) / totalTime) * 100)}% productive
          </text>

          {/* Time axis */}
          <line x1={barLeft} y1={210} x2={barRight} y2={210} className="stroke-border stroke-1" />
          <text x={barLeft} y={224} className="fill-muted-foreground" fontSize={9}>t=0</text>
          <text x={barRight} y={224} textAnchor="end" className="fill-muted-foreground" fontSize={9}>time →</text>
        </svg>
      </div>
    </div>
  )
}
