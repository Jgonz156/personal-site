"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const X_MIN = -1
const X_MAX = 7
const Y_MIN = -2
const Y_MAX = 14

function f(x: number): number {
  return (x - 3) * (x - 3) + 1.5 * Math.sin(2.5 * x) + 1
}

function df(x: number): number {
  // f'(x) = 2(x - 3) + 1.5 * 2.5 * cos(2.5 x)
  return 2 * (x - 3) + 3.75 * Math.cos(2.5 * x)
}

function toScreenX(x: number, w: number): number {
  return ((x - X_MIN) / (X_MAX - X_MIN)) * w
}
function toScreenY(y: number, h: number): number {
  return h - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * h
}

const W = 520
const H = 240

export function GradientDescentDemo() {
  const [x0, setX0] = useState(5.5)
  const [lr, setLr] = useState(0.1)
  const [trajectory, setTrajectory] = useState<number[]>([5.5])
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const trajRef = useRef(trajectory)
  trajRef.current = trajectory

  useEffect(() => {
    setTrajectory([x0])
  }, [x0])

  const stepOnce = () => {
    const last = trajRef.current[trajRef.current.length - 1]
    const next = last - lr * df(last)
    const clamped = Math.max(X_MIN + 0.05, Math.min(X_MAX - 0.05, next))
    const nextTraj = [...trajRef.current, clamped]
    trajRef.current = nextTraj
    setTrajectory(nextTraj)
  }

  const reset = () => {
    setRunning(false)
    setTrajectory([x0])
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(stepOnce, 200)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, lr])

  // Curve points
  const curve: string[] = []
  for (let px = 0; px <= W; px += 2) {
    const x = X_MIN + (px / W) * (X_MAX - X_MIN)
    const y = f(x)
    curve.push(`${px},${toScreenY(y, H)}`)
  }

  const cur = trajectory[trajectory.length - 1]
  const curY = f(cur)
  const curSlope = df(cur)

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          Gradient Descent on a 1-D loss landscape
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          step <strong className="text-foreground">{trajectory.length - 1}</strong>{" "}
          · loss <strong className="text-foreground">{curY.toFixed(3)}</strong>
        </span>
      </div>

      <div className="px-4 py-3 border-b grid sm:grid-cols-2 gap-3">
        <label className="text-xs flex items-center gap-2">
          <span className="w-20 shrink-0 text-muted-foreground">start x₀</span>
          <input
            type="range"
            min={X_MIN + 0.1}
            max={X_MAX - 0.1}
            step={0.1}
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono w-10 text-right">{x0.toFixed(1)}</span>
        </label>
        <label className="text-xs flex items-center gap-2">
          <span className="w-20 shrink-0 text-muted-foreground">step size α</span>
          <input
            type="range"
            min={0.01}
            max={0.5}
            step={0.01}
            value={lr}
            onChange={(e) => setLr(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono w-10 text-right">{lr.toFixed(2)}</span>
        </label>
      </div>

      <div className="px-4 py-3 border-b flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={stepOnce}
          disabled={running}
        >
          +1 step
        </Button>
        <Button
          size="sm"
          variant={running ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setRunning(!running)}
        >
          {running ? "Pause" : "Auto-roll"}
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

      <div className="px-4 py-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-muted/20 rounded border">
          {/* zero line */}
          <line
            x1={0}
            x2={W}
            y1={toScreenY(0, H)}
            y2={toScreenY(0, H)}
            stroke="#9ca3af"
            strokeDasharray="3 3"
            strokeWidth={0.5}
          />
          {/* curve */}
          <polyline
            fill="none"
            stroke="#6366f1"
            strokeWidth={2}
            points={curve.join(" ")}
          />

          {/* trajectory dots */}
          {trajectory.map((tx, i) => (
            <circle
              key={i}
              cx={toScreenX(tx, W)}
              cy={toScreenY(f(tx), H)}
              r={i === trajectory.length - 1 ? 5 : 2.5}
              fill={i === trajectory.length - 1 ? "#dc2626" : "#f59e0b"}
              opacity={i === trajectory.length - 1 ? 1 : 0.6}
            />
          ))}
          {/* trajectory line */}
          <polyline
            fill="none"
            stroke="#f59e0b"
            strokeWidth={1}
            opacity={0.6}
            points={trajectory
              .map((tx) => `${toScreenX(tx, W)},${toScreenY(f(tx), H)}`)
              .join(" ")}
          />

          {/* tangent at current */}
          {(() => {
            const dx = 0.6
            const x1 = cur - dx
            const x2 = cur + dx
            const y1 = curY - curSlope * dx
            const y2 = curY + curSlope * dx
            return (
              <line
                x1={toScreenX(x1, W)}
                y1={toScreenY(y1, H)}
                x2={toScreenX(x2, W)}
                y2={toScreenY(y2, H)}
                stroke="#dc2626"
                strokeWidth={1.5}
              />
            )
          })()}

          {/* axis labels */}
          <text x={4} y={H - 4} fontSize="10" className="fill-muted-foreground">
            x = {X_MIN}
          </text>
          <text x={W - 4} y={H - 4} fontSize="10" textAnchor="end" className="fill-muted-foreground">
            x = {X_MAX}
          </text>
        </svg>

        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          The blue curve is the loss{" "}
          <span className="font-mono">f(x) = (x−3)² + 1.5·sin(2.5x) + 1</span>.
          The red dot is the current parameter, the red line shows the local{" "}
          <em>gradient</em>{" "}
          <span className="font-mono">f′(x) = {curSlope.toFixed(2)}</span>, and
          the orange trail is your descent path. Try{" "}
          <strong>α = 0.5</strong> from <strong>x₀ = 5.5</strong> — the ball
          overshoots and may diverge. Try a small{" "}
          <strong>α = 0.05</strong> — slow but steady. This single principle
          (<em>nudge against the gradient</em>) trains every neural network,
          including the LLMs powering today&apos;s coding agents.
        </p>
      </div>
    </div>
  )
}
