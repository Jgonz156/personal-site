"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export type GamePlayer = "P" | "O"

export interface GameMove {
  player: GamePlayer
  /** Short label for the move bubble, e.g. "?value" or "x = 5". */
  label: string
  /** Optional one-line annotation explaining the move's intent. */
  note?: string
}

export interface GameSemanticsTraceProps {
  title?: string
  /** The program being interpreted as a game, e.g. "f(x) = x + 1". */
  program: string
  /** What the game's outcome represents, e.g. "the value f(5) = 6". */
  outcome: string
  moves: GameMove[]
}

const PLAYER_META: Record<
  GamePlayer,
  { label: string; full: string; tint: string; ring: string }
> = {
  P: {
    label: "P",
    full: "Player (program)",
    tint: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/40",
    ring: "ring-blue-500/40",
  },
  O: {
    label: "O",
    full: "Opponent (environment)",
    tint: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/40",
    ring: "ring-amber-500/40",
  },
}

function MoveBubble({
  move,
  index,
  isLatest,
}: {
  move: GameMove
  index: number
  isLatest: boolean
}) {
  const meta = PLAYER_META[move.player]
  const align = move.player === "P" ? "justify-start" : "justify-end"
  return (
    <div className={`flex ${align}`}>
      <div
        className={`max-w-[80%] border rounded-lg px-3 py-2 ${meta.tint} ${
          isLatest ? `ring-2 ${meta.ring}` : ""
        }`}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider opacity-80">
          <span>
            #{index + 1} · {meta.label}
          </span>
          <span className="opacity-70 normal-case font-normal">
            {meta.full}
          </span>
        </div>
        <div className="font-mono text-sm mt-0.5">{move.label}</div>
        {move.note && (
          <div className="text-xs italic opacity-80 mt-1">{move.note}</div>
        )}
      </div>
    </div>
  )
}

export function GameSemanticsTrace({
  title,
  program,
  outcome,
  moves,
}: GameSemanticsTraceProps) {
  const [revealCount, setRevealCount] = useState(1)
  const total = moves.length
  const visibleMoves = moves.slice(0, revealCount)
  const isFirst = revealCount === 1
  const isLast = revealCount === total
  const complete = revealCount === total

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🎲 ${title}` : "🎲 Game Semantics Trace"}
        </span>
        <span className="text-xs text-muted-foreground">
          Move {revealCount} of {total}
        </span>
      </div>

      <div className="px-4 py-3 border-b bg-muted/20 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Program
          </div>
          <div className="font-mono text-sm">{program}</div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Outcome under negotiation
          </div>
          <div className="text-sm">{outcome}</div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-2 bg-background min-h-[180px]">
        {visibleMoves.map((m, i) => (
          <MoveBubble
            key={i}
            move={m}
            index={i}
            isLatest={i === visibleMoves.length - 1}
          />
        ))}
      </div>

      {complete && (
        <div className="px-4 py-2 border-t bg-green-500/10 text-green-800 dark:text-green-300 text-sm text-center">
          ✓ Play complete — the program&rsquo;s strategy delivered the outcome.
        </div>
      )}

      <div className="px-4 py-3 bg-muted/20 flex items-center justify-between gap-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevealCount((c) => Math.max(1, c - 1))}
          disabled={isFirst}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevealCount(1)}
          disabled={isFirst}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => setRevealCount((c) => Math.min(total, c + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
