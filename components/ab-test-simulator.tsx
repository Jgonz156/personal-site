"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

// Erf approximation for normal CDF
function erf(x: number): number {
  const sign = Math.sign(x)
  x = Math.abs(x)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1.0 / (1.0 + p * x)
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return sign * y
}

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2))
}

interface Variant {
  name: string
  trueRate: number
  visitors: number
  conversions: number
  color: string
}

const INITIAL_VARIANTS: [Variant, Variant] = [
  { name: "A (control)", trueRate: 0.12, visitors: 0, conversions: 0, color: "#3b82f6" },
  { name: "B (variant)", trueRate: 0.14, visitors: 0, conversions: 0, color: "#16a34a" },
]

export function ABTestSimulator() {
  const [variants, setVariants] = useState<[Variant, Variant]>(() => [
    { ...INITIAL_VARIANTS[0] },
    { ...INITIAL_VARIANTS[1] },
  ])
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const variantsRef = useRef(variants)
  variantsRef.current = variants

  const setRate = (i: 0 | 1, rate: number) => {
    setVariants((prev) => {
      const copy: [Variant, Variant] = [{ ...prev[0] }, { ...prev[1] }]
      copy[i].trueRate = rate
      copy[i].visitors = 0
      copy[i].conversions = 0
      return copy
    })
  }

  const reset = () => {
    setRunning(false)
    setVariants((prev) => [
      { ...prev[0], visitors: 0, conversions: 0 },
      { ...prev[1], visitors: 0, conversions: 0 },
    ])
  }

  const sendVisitors = (n: number) => {
    const cur = variantsRef.current
    let v0c = cur[0].conversions
    let v1c = cur[1].conversions
    let v0v = cur[0].visitors
    let v1v = cur[1].visitors
    for (let i = 0; i < n; i++) {
      // Random assignment 50/50
      if (Math.random() < 0.5) {
        v0v++
        if (Math.random() < cur[0].trueRate) v0c++
      } else {
        v1v++
        if (Math.random() < cur[1].trueRate) v1c++
      }
    }
    const next: [Variant, Variant] = [
      { ...cur[0], visitors: v0v, conversions: v0c },
      { ...cur[1], visitors: v1v, conversions: v1c },
    ]
    variantsRef.current = next
    setVariants(next)
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => sendVisitors(50), 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const p1 = variants[0].visitors === 0 ? 0 : variants[0].conversions / variants[0].visitors
  const p2 = variants[1].visitors === 0 ? 0 : variants[1].conversions / variants[1].visitors
  const totalVisitors = variants[0].visitors + variants[1].visitors

  // Two-proportion z-test
  let zScore = 0
  let pValue = 1
  if (variants[0].visitors > 0 && variants[1].visitors > 0) {
    const pooled =
      (variants[0].conversions + variants[1].conversions) /
      (variants[0].visitors + variants[1].visitors)
    const se = Math.sqrt(
      pooled * (1 - pooled) * (1 / variants[0].visitors + 1 / variants[1].visitors),
    )
    if (se > 0) {
      zScore = (p2 - p1) / se
      pValue = 2 * (1 - normalCdf(Math.abs(zScore)))
    }
  }

  const significant = pValue < 0.05 && totalVisitors > 0
  const winner = significant ? (p2 > p1 ? "B" : "A") : null

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          A/B Test Simulator — when can you trust the result?
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          {totalVisitors.toLocaleString()} visitors
        </span>
      </div>

      <div className="px-4 py-3 border-b grid sm:grid-cols-2 gap-3">
        {variants.map((v, i) => (
          <label key={i} className="text-xs flex items-center gap-2">
            <span className="w-28 shrink-0 text-muted-foreground">
              {v.name} true rate
            </span>
            <input
              type="range"
              min={0.05}
              max={0.4}
              step={0.005}
              value={v.trueRate}
              onChange={(e) =>
                setRate(i as 0 | 1, parseFloat(e.target.value))
              }
              className="flex-1"
            />
            <span className="font-mono w-12 text-right">
              {(v.trueRate * 100).toFixed(1)}%
            </span>
          </label>
        ))}
      </div>

      <div className="px-4 py-3 border-b flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={() => sendVisitors(100)}
          disabled={running}
        >
          +100 visitors
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={() => sendVisitors(1000)}
          disabled={running}
        >
          +1,000 visitors
        </Button>
        <Button
          size="sm"
          variant={running ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setRunning(!running)}
        >
          {running ? "Pause" : "Auto-stream"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs ml-auto"
          onClick={reset}
        >
          Reset
        </Button>
      </div>

      <div className="px-4 py-4 grid sm:grid-cols-2 gap-3">
        {variants.map((v, i) => {
          const empirical = i === 0 ? p1 : p2
          return (
            <div key={i} className="border rounded p-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{v.name}</span>
                <span style={{ color: v.color }}>
                  {(empirical * 100).toFixed(2)}%
                </span>
              </div>
              <div className="mt-2 h-3 bg-muted rounded overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${empirical * 100 * 2.5}%`,
                    background: v.color,
                  }}
                />
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground font-mono">
                {v.conversions} / {v.visitors} conversions
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-4 py-3 border-t bg-muted/30 text-xs">
        {totalVisitors === 0 ? (
          <p className="text-muted-foreground">
            Send some visitors to start collecting data.
          </p>
        ) : significant ? (
          <p>
            <strong className="text-green-700 dark:text-green-400">
              Statistically significant
            </strong>{" "}
            — z = {zScore.toFixed(2)}, p = {pValue.toExponential(2)} &lt; 0.05.
            Variant <strong>{winner}</strong> wins.
          </p>
        ) : (
          <p className="text-muted-foreground">
            <strong className="text-foreground">Not yet significant</strong> —
            z = {zScore.toFixed(2)}, p = {pValue.toFixed(3)} ≥ 0.05. Need more
            visitors. <em>This is the whole game</em>: with too few users you
            can&apos;t distinguish noise from a real difference. Try setting
            both true rates to the same value and watch the &quot;winner&quot;
            flip back and forth — that is what a false positive looks like.
          </p>
        )}
      </div>
    </div>
  )
}
