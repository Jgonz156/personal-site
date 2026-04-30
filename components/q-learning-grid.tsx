"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

const ROWS = 5
const COLS = 5
const GOAL = { r: 0, c: 4 }
const PIT = { r: 2, c: 2 }
const START = { r: 4, c: 0 }

const ALPHA = 0.5
const GAMMA = 0.9
const EPSILON = 0.2

type Action = 0 | 1 | 2 | 3 // up, right, down, left
const ACTIONS: Action[] = [0, 1, 2, 3]
const ACTION_DELTAS: Record<Action, { dr: number; dc: number }> = {
  0: { dr: -1, dc: 0 },
  1: { dr: 0, dc: 1 },
  2: { dr: 1, dc: 0 },
  3: { dr: 0, dc: -1 },
}

type QTable = number[][][] // [r][c][a]

function makeEmptyQ(): QTable {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => [0, 0, 0, 0]),
  )
}

function step(
  r: number,
  c: number,
  a: Action,
): { nr: number; nc: number; reward: number; done: boolean } {
  const { dr, dc } = ACTION_DELTAS[a]
  let nr = r + dr
  let nc = c + dc
  if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) {
    nr = r
    nc = c
    return { nr, nc, reward: -1, done: false }
  }
  if (nr === GOAL.r && nc === GOAL.c) {
    return { nr, nc, reward: 10, done: true }
  }
  if (nr === PIT.r && nc === PIT.c) {
    return { nr, nc, reward: -10, done: true }
  }
  return { nr, nc, reward: -0.1, done: false }
}

function pickAction(q: QTable, r: number, c: number, explore: boolean): Action {
  if (explore && Math.random() < EPSILON) {
    return ACTIONS[Math.floor(Math.random() * 4)]
  }
  const qs = q[r][c]
  let bestA: Action = 0
  let bestQ = qs[0]
  for (let i = 1; i < 4; i++) {
    if (qs[i] > bestQ) {
      bestQ = qs[i]
      bestA = i as Action
    }
  }
  return bestA
}

function runEpisode(q: QTable): { newQ: QTable; steps: number; totalReward: number } {
  const newQ = q.map((row) => row.map((cell) => cell.slice()))
  let r = START.r
  let c = START.c
  let totalReward = 0
  let steps = 0
  while (true) {
    const a = pickAction(newQ, r, c, true)
    const { nr, nc, reward, done } = step(r, c, a)
    const maxNext = done ? 0 : Math.max(...newQ[nr][nc])
    newQ[r][c][a] += ALPHA * (reward + GAMMA * maxNext - newQ[r][c][a])
    totalReward += reward
    r = nr
    c = nc
    steps++
    if (done || steps > 100) break
  }
  return { newQ, steps, totalReward }
}

export function QLearningGrid() {
  const [q, setQ] = useState<QTable>(makeEmptyQ)
  const [episode, setEpisode] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const qRef = useRef(q)
  qRef.current = q

  const trainOne = () => {
    const { newQ } = runEpisode(qRef.current)
    qRef.current = newQ
    setQ(newQ)
    setEpisode((e) => e + 1)
  }

  const trainBurst = (n: number) => {
    let cur = qRef.current
    for (let i = 0; i < n; i++) {
      cur = runEpisode(cur).newQ
    }
    qRef.current = cur
    setQ(cur)
    setEpisode((e) => e + n)
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(trainOne, 80)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const reset = () => {
    setRunning(false)
    const fresh = makeEmptyQ()
    qRef.current = fresh
    setQ(fresh)
    setEpisode(0)
  }

  // For visualization, compute V(s) = max_a Q(s, a)
  const allV: number[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      allV.push(Math.max(...q[r][c]))
    }
  }
  const maxV = Math.max(0.1, ...allV)
  const minV = Math.min(0, ...allV)

  const cellSize = 64

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          Q-Learning Gridworld — find the goal, avoid the pit
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          episode <span className="font-semibold text-foreground">{episode}</span>
        </span>
      </div>

      <div className="px-4 py-3 border-b flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={trainOne}
          disabled={running}
        >
          +1 episode
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={() => trainBurst(50)}
          disabled={running}
        >
          +50 episodes
        </Button>
        <Button
          size="sm"
          variant={running ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setRunning(!running)}
        >
          {running ? "Pause" : "Auto-train"}
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

      <div className="px-4 py-4 grid md:grid-cols-[auto_1fr] gap-4 items-start">
        <svg
          viewBox={`0 0 ${COLS * cellSize} ${ROWS * cellSize}`}
          className="border rounded bg-muted/20"
          style={{ width: COLS * cellSize, height: ROWS * cellSize, maxWidth: "100%" }}
        >
          {Array.from({ length: ROWS }).map((_, r) =>
            Array.from({ length: COLS }).map((_, c) => {
              const isGoal = r === GOAL.r && c === GOAL.c
              const isPit = r === PIT.r && c === PIT.c
              const isStart = r === START.r && c === START.c
              const v = Math.max(...q[r][c])
              let fill = "white"
              if (isGoal) fill = "#16a34a"
              else if (isPit) fill = "#dc2626"
              else if (v > 0) {
                const t = v / maxV
                fill = `rgba(34,197,94,${0.15 + t * 0.6})`
              } else if (v < 0) {
                const t = v / minV
                fill = `rgba(220,38,38,${0.05 + t * 0.35})`
              }

              const bestA = pickAction(q, r, c, false)
              const cx = c * cellSize + cellSize / 2
              const cy = r * cellSize + cellSize / 2

              const arrowOffset = 14
              const arrowDeltas: Record<Action, { x: number; y: number }> = {
                0: { x: 0, y: -arrowOffset },
                1: { x: arrowOffset, y: 0 },
                2: { x: 0, y: arrowOffset },
                3: { x: -arrowOffset, y: 0 },
              }
              const showArrow =
                !isGoal && !isPit && q[r][c].some((x) => x !== 0)

              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={c * cellSize}
                    y={r * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={fill}
                    stroke="#9ca3af"
                    strokeWidth={0.5}
                  />
                  {isGoal && (
                    <text
                      x={cx}
                      y={cy + 5}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="700"
                      fill="white"
                    >
                      ★
                    </text>
                  )}
                  {isPit && (
                    <text
                      x={cx}
                      y={cy + 5}
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="700"
                      fill="white"
                    >
                      ✕
                    </text>
                  )}
                  {isStart && (
                    <text
                      x={cx}
                      y={cy + 5}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill="#1e3a8a"
                    >
                      S
                    </text>
                  )}
                  {showArrow && (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={cx + arrowDeltas[bestA].x}
                      y2={cy + arrowDeltas[bestA].y}
                      stroke="#1e40af"
                      strokeWidth={2}
                      markerEnd="url(#ql-arrow)"
                    />
                  )}
                  {!isGoal && !isPit && !isStart && v !== 0 && (
                    <text
                      x={c * cellSize + 4}
                      y={r * cellSize + 12}
                      fontSize="9"
                      fontFamily="monospace"
                      className="fill-foreground"
                      opacity={0.6}
                    >
                      {v.toFixed(1)}
                    </text>
                  )}
                </g>
              )
            }),
          )}
          <defs>
            <marker
              id="ql-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#1e40af" />
            </marker>
          </defs>
        </svg>

        <div className="text-xs space-y-2 leading-relaxed">
          <p className="font-semibold text-sm">Reading the grid</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <strong className="text-green-600">★</strong> goal cell
              (reward <span className="font-mono">+10</span>) ·{" "}
              <strong className="text-red-600">✕</strong> pit (reward{" "}
              <span className="font-mono">−10</span>) ·{" "}
              <strong>S</strong> agent start
            </li>
            <li>
              Each non-terminal step costs{" "}
              <span className="font-mono">−0.1</span>; bumping a wall costs{" "}
              <span className="font-mono">−1</span>
            </li>
            <li>
              Cell shading shows{" "}
              <em>
                V(s) = max<sub>a</sub> Q(s, a)
              </em>{" "}
              — bluer/greener = higher learned value
            </li>
            <li>
              Arrows show the <em>greedy policy</em> learned so far
            </li>
          </ul>
          <p className="text-muted-foreground">
            Update rule:{" "}
            <span className="font-mono text-[10px]">
              Q(s,a) ← Q(s,a) + α[r + γ·max Q(s′,·) − Q(s,a)]
            </span>{" "}
            with α = {ALPHA}, γ = {GAMMA}, ε = {EPSILON}.
          </p>
          <p className="text-muted-foreground">
            Click <em>+50 episodes</em> a few times: a path from S to ★
            crystallizes through the right corridor while the cells next to ✕
            stay red. That is{" "}
            <strong className="text-foreground">approximate Q-learning</strong>{" "}
            — exact in this small state space, approximate in larger ones, and
            the foundation for <em>deep</em> Q-learning when you replace the
            table with a neural net.
          </p>
        </div>
      </div>
    </div>
  )
}
