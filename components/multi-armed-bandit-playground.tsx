"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Strategy = "greedy" | "epsilon-greedy" | "ucb"

interface Arm {
  trueRate: number
  pulls: number
  rewards: number
  color: string
}

const INITIAL_ARMS: Arm[] = [
  { trueRate: 0.25, pulls: 0, rewards: 0, color: "#ef4444" },
  { trueRate: 0.5, pulls: 0, rewards: 0, color: "#f59e0b" },
  { trueRate: 0.65, pulls: 0, rewards: 0, color: "#3b82f6" },
  { trueRate: 0.8, pulls: 0, rewards: 0, color: "#16a34a" },
]

const TOTAL_STEPS_PER_BURST = 50
const EPSILON = 0.1

function pickArm(arms: Arm[], strategy: Strategy, t: number): number {
  if (strategy === "epsilon-greedy" && Math.random() < EPSILON) {
    return Math.floor(Math.random() * arms.length)
  }
  if (strategy === "ucb") {
    // Pull each arm at least once first
    for (let i = 0; i < arms.length; i++) {
      if (arms[i].pulls === 0) return i
    }
    let bestI = 0
    let bestScore = -Infinity
    for (let i = 0; i < arms.length; i++) {
      const mean = arms[i].rewards / arms[i].pulls
      const bonus = Math.sqrt((2 * Math.log(t + 1)) / arms[i].pulls)
      const score = mean + bonus
      if (score > bestScore) {
        bestScore = score
        bestI = i
      }
    }
    return bestI
  }
  // greedy (or epsilon-greedy non-explore branch): pick highest mean,
  // ties broken by least-pulled to seed information
  let bestI = 0
  let bestMean = -Infinity
  for (let i = 0; i < arms.length; i++) {
    if (arms[i].pulls === 0) return i
    const mean = arms[i].rewards / arms[i].pulls
    if (mean > bestMean) {
      bestMean = mean
      bestI = i
    }
  }
  return bestI
}

export function MultiArmedBanditPlayground() {
  const [arms, setArms] = useState<Arm[]>(() =>
    INITIAL_ARMS.map((a) => ({ ...a })),
  )
  const [strategy, setStrategy] = useState<Strategy>("epsilon-greedy")
  const [step, setStep] = useState(0)
  const [regretHistory, setRegretHistory] = useState<number[]>([0])
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const optimal = Math.max(...INITIAL_ARMS.map((a) => a.trueRate))

  const reset = () => {
    setArms(INITIAL_ARMS.map((a) => ({ ...a })))
    setStep(0)
    setRegretHistory([0])
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const armsRef = useRef(arms)
  const stepRef = useRef(step)
  const regretRef = useRef(regretHistory)
  armsRef.current = arms
  stepRef.current = step
  regretRef.current = regretHistory

  const runStep = () => {
    const t = stepRef.current + 1
    const choice = pickArm(armsRef.current, strategy, t)
    const reward = Math.random() < armsRef.current[choice].trueRate ? 1 : 0
    const newArms = armsRef.current.map((a, i) =>
      i === choice
        ? { ...a, pulls: a.pulls + 1, rewards: a.rewards + reward }
        : a,
    )
    const lastRegret = regretRef.current[regretRef.current.length - 1]
    const newRegret = [
      ...regretRef.current,
      lastRegret + (optimal - armsRef.current[choice].trueRate),
    ]
    armsRef.current = newArms
    stepRef.current = t
    regretRef.current = newRegret
    setArms(newArms)
    setStep(t)
    setRegretHistory(newRegret)
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        runStep()
      }, 50)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, strategy])

  const burst = () => {
    for (let i = 0; i < TOTAL_STEPS_PER_BURST; i++) runStep()
  }

  const totalReward = arms.reduce((s, a) => s + a.rewards, 0)
  const totalPulls = arms.reduce((s, a) => s + a.pulls, 0)
  const finalRegret = regretHistory[regretHistory.length - 1]

  // Regret plot
  const plotW = 500
  const plotH = 100
  const maxRegret = Math.max(10, ...regretHistory)
  const maxStep = Math.max(50, regretHistory.length - 1)

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          Multi-Armed Bandit — explore vs exploit
        </span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">step</span>
          <span className="font-mono font-semibold">{step}</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground mr-1">Strategy:</span>
        {(["greedy", "epsilon-greedy", "ucb"] as Strategy[]).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={strategy === s ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => {
              setStrategy(s)
              reset()
            }}
          >
            {s === "greedy"
              ? "Greedy"
              : s === "epsilon-greedy"
                ? `ε-greedy (ε = ${EPSILON})`
                : "UCB"}
          </Button>
        ))}
        <span className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={runStep}
            disabled={running}
          >
            +1 pull
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={burst}
            disabled={running}
          >
            +50 pulls
          </Button>
          <Button
            size="sm"
            variant={running ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => setRunning(!running)}
          >
            {running ? "Pause" : "Auto-run"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={reset}
          >
            Reset
          </Button>
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-3">
          {arms.map((arm, i) => {
            const empiricalRate = arm.pulls === 0 ? 0 : arm.rewards / arm.pulls
            const heightPct = empiricalRate * 100
            const isBest = arm.trueRate === optimal
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="relative w-full h-32 border rounded bg-muted/30 overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all"
                    style={{
                      height: `${heightPct}%`,
                      background: arm.color,
                      opacity: 0.8,
                    }}
                  />
                  {/* True rate marker */}
                  <div
                    className="absolute left-0 right-0 border-t-2 border-dashed border-foreground"
                    style={{ bottom: `${arm.trueRate * 100}%` }}
                  />
                </div>
                <div className="text-xs font-semibold">
                  Arm {i + 1} {isBest && <span className="text-green-600">★</span>}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono text-center">
                  pulls: {arm.pulls}
                  <br />
                  est: {(empiricalRate * 100).toFixed(1)}%
                  <br />
                  true: {(arm.trueRate * 100).toFixed(0)}%
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-3 flex-wrap">
          <span>
            Filled bar = <em>empirical</em> reward rate.
          </span>
          <span>
            Dashed line = <em>true (hidden) rate</em>.
          </span>
          <span className="ml-auto font-mono text-foreground">
            total reward: <strong>{totalReward}</strong> / {totalPulls}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold">Cumulative regret</span>
            <span className="text-xs font-mono text-muted-foreground">
              {finalRegret.toFixed(2)}
            </span>
          </div>
          <svg
            viewBox={`0 0 ${plotW} ${plotH}`}
            className="w-full h-auto border rounded bg-muted/20"
          >
            <polyline
              fill="none"
              stroke="#dc2626"
              strokeWidth={1.5}
              points={regretHistory
                .map((r, i) => {
                  const x = (i / maxStep) * plotW
                  const y = plotH - (r / maxRegret) * (plotH - 8) - 4
                  return `${x},${y}`
                })
                .join(" ")}
            />
            <text
              x={plotW - 4}
              y={12}
              textAnchor="end"
              fontSize="9"
              className="fill-muted-foreground font-mono"
            >
              max regret = {maxRegret.toFixed(1)}
            </text>
          </svg>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Regret is the gap between reward you <em>could</em> have earned
            (always pulling the best arm) and the reward you actually earned.{" "}
            <strong>Pure greedy</strong> often locks onto the wrong arm forever
            — its regret line stays linear. <strong>ε-greedy</strong> and{" "}
            <strong>UCB</strong> keep exploring just enough to find the truth,
            so their regret curves bend and flatten.
          </p>
        </div>
      </div>
    </div>
  )
}
