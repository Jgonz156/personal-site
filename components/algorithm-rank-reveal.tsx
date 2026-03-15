"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const RANKINGS = [
  { rank: "1st", alg: "First-Fit (FF)", reason: "Naturally sorts by behavior — small hot zone at front, large cold zone at back", color: "bg-emerald-500/15 border-emerald-400/40 text-emerald-700 dark:text-emerald-300" },
  { rank: "2nd", alg: "Next-Fit (NF)", reason: "Fast like FF but distributes gaps evenly — no natural sorting emerges", color: "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300" },
  { rank: "3rd", alg: "Worst-Fit (WF)", reason: "Preserves large gaps for future use — fewer fragments, but bigger leftover gaps", color: "bg-amber-500/15 border-amber-400/40 text-amber-700 dark:text-amber-300" },
  { rank: "4th", alg: "Best-Fit (BF)", reason: "Minimizes leftover space per allocation — ironically creates maximum tiny sliver gaps", color: "bg-red-500/15 border-red-400/40 text-red-700 dark:text-red-300" },
]

export function AlgorithmRankReveal({ className }: { className?: string }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-2">
        Pop Quiz — Rank the Allocation Algorithms
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        Based on extensive empirical study, these four algorithms can be generally ranked by overall performance (speed + fragmentation management). Before revealing the answer, think about which one you would expect to win — and which would come last.
      </p>

      {!revealed ? (
        <div className="text-center py-6">
          <div className="flex justify-center gap-3 mb-4 flex-wrap">
            {["First-Fit", "Best-Fit", "Worst-Fit", "Next-Fit"].map((name) => (
              <span key={name} className="px-3 py-1.5 rounded-lg border bg-muted/30 text-sm font-semibold font-mono">
                {name}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-4 italic">
            Which is fastest overall? Which is slowest? Can you guess?
          </p>
          <Button
            variant="default"
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => setRevealed(true)}
          >
            Reveal Ranking
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {RANKINGS.map((r, i) => (
            <div
              key={r.alg}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border transition-all",
                r.color
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className="text-2xl font-black font-mono shrink-0 w-10 text-center">{r.rank}</span>
              <div>
                <div className="font-semibold text-sm">{r.alg}</div>
                <div className="text-xs opacity-80 mt-0.5">{r.reason}</div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="text-xs h-7 mt-2" onClick={() => setRevealed(false)}>
            Hide Answer
          </Button>
        </div>
      )}
    </div>
  )
}
