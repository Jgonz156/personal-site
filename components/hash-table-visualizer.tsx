"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface HashTableVisualizerProps {
  className?: string
}

const NUM_BUCKETS = 8

const NORMAL_KEYS = [
  { key: "alice", hash: 3 },
  { key: "bob", hash: 7 },
  { key: "carol", hash: 1 },
  { key: "dave", hash: 5 },
  { key: "eve", hash: 0 },
  { key: "frank", hash: 4 },
  { key: "grace", hash: 2 },
  { key: "heidi", hash: 6 },
  { key: "ivan", hash: 1 },
  { key: "judy", hash: 3 },
]

const ADVERSARIAL_KEYS = [
  { key: "aab", hash: 0 },
  { key: "bba", hash: 0 },
  { key: "cab", hash: 0 },
  { key: "dba", hash: 0 },
  { key: "eab", hash: 0 },
  { key: "fba", hash: 0 },
  { key: "gab", hash: 0 },
  { key: "hba", hash: 0 },
  { key: "iab", hash: 0 },
  { key: "jba", hash: 0 },
]

export function HashTableVisualizer({
  className = "",
}: HashTableVisualizerProps) {
  const [mode, setMode] = useState<"normal" | "adversarial">("normal")
  const [step, setStep] = useState(0)

  const keys = mode === "normal" ? NORMAL_KEYS : ADVERSARIAL_KEYS
  const totalSteps = keys.length

  const { buckets, totalOps, maxChain } = useMemo(() => {
    const b: string[][] = Array.from({ length: NUM_BUCKETS }, () => [])
    let ops = 0
    let max = 0
    for (let i = 0; i < step; i++) {
      const bucket = keys[i].hash
      ops += b[bucket].length + 1
      b[bucket].push(keys[i].key)
      max = Math.max(max, b[bucket].length)
    }
    return { buckets: b, totalOps: ops, maxChain: max }
  }, [step, keys])

  const handleModeChange = useCallback(
    (m: "normal" | "adversarial") => {
      setMode(m)
      setStep(0)
    },
    []
  )

  const currentKey = step > 0 ? keys[step - 1] : null

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-3">
        <span className="font-semibold text-sm">Hash Table Visualizer</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleModeChange("normal")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mode === "normal"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Normal Keys
          </button>
          <button
            onClick={() => handleModeChange("adversarial")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mode === "adversarial"
                ? "bg-destructive text-destructive-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Adversarial Keys
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {currentKey && (
          <div className="mb-3 text-center text-sm font-mono text-muted-foreground">
            hash(&quot;{currentKey.key}&quot;) % {NUM_BUCKETS} ={" "}
            <span
              className={
                mode === "adversarial"
                  ? "text-destructive font-bold"
                  : "text-primary font-bold"
              }
            >
              {currentKey.hash}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          {buckets.map((chain, i) => {
            const isTarget = currentKey?.hash === i && step > 0
            const hasCollision = chain.length > 1
            return (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 min-h-[2.5rem] transition-colors ${
                  isTarget && hasCollision
                    ? "border-destructive bg-destructive/10"
                    : isTarget
                      ? "border-primary bg-primary/10"
                      : "border-muted-foreground/15 bg-muted/20"
                }`}
              >
                <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">
                  {i}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {chain.map((key, j) => {
                    const isNew =
                      isTarget && j === chain.length - 1 && step > 0
                    return (
                      <span
                        key={`${key}-${j}`}
                        className={`px-2 py-0.5 rounded text-xs font-mono ${
                          isNew
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {key}
                      </span>
                    )
                  })}
                  {chain.length === 0 && (
                    <span className="text-xs text-muted-foreground/40 italic">
                      empty
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <span className="text-muted-foreground">Keys inserted</span>
            <p className="font-bold text-sm">{step}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Max chain</span>
            <p
              className={`font-bold text-sm ${maxChain > 2 ? "text-destructive" : ""}`}
            >
              {maxChain}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Total operations</span>
            <p
              className={`font-bold text-sm ${totalOps > step * 2 ? "text-destructive" : ""}`}
            >
              {totalOps}
            </p>
          </div>
        </div>

        {step === totalSteps && (
          <div className="mt-3 text-center text-sm font-medium">
            {mode === "normal" ? (
              <span className="text-primary">
                Well-distributed: ~{totalOps} operations for {totalSteps} keys ≈
                O(n)
              </span>
            ) : (
              <span className="text-destructive">
                All collisions: {totalOps} operations for {totalSteps} keys ≈
                O(n²)
              </span>
            )}
          </div>
        )}
      </div>

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
