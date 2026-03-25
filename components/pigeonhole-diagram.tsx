"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface PigeonholeDiagramProps {
  className?: string
  defaultItems?: number
  defaultSlots?: number
}

const COLORS = [
  "bg-blue-400",
  "bg-green-400",
  "bg-amber-400",
  "bg-rose-400",
  "bg-violet-400",
  "bg-cyan-400",
  "bg-orange-400",
  "bg-pink-400",
  "bg-teal-400",
  "bg-lime-400",
  "bg-indigo-400",
  "bg-red-400",
  "bg-emerald-400",
  "bg-fuchsia-400",
  "bg-yellow-400",
]

export function PigeonholeDiagram({
  className = "",
  defaultItems = 5,
  defaultSlots = 4,
}: PigeonholeDiagramProps) {
  const [numItems, setNumItems] = useState(defaultItems)
  const [numSlots, setNumSlots] = useState(defaultSlots)
  const [placement, setPlacement] = useState<number[] | null>(null)

  const placeRandom = useCallback(() => {
    const p: number[] = []
    for (let i = 0; i < numItems; i++) {
      p.push(Math.floor(Math.random() * numSlots))
    }
    setPlacement(p)
  }, [numItems, numSlots])

  const reset = useCallback(() => {
    setPlacement(null)
  }, [])

  const slotCounts: number[] = Array(numSlots).fill(0)
  const slotItems: number[][] = Array.from({ length: numSlots }, () => [])
  if (placement) {
    for (let i = 0; i < placement.length; i++) {
      slotCounts[placement[i]]++
      slotItems[placement[i]].push(i)
    }
  }

  const maxCount = Math.max(...slotCounts)
  const ceil = Math.ceil(numItems / numSlots)
  const hasCollision = numItems > numSlots

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-3">
        <span className="font-semibold text-sm">Pigeonhole Diagram</span>
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            Items: {numItems}
            <input
              type="range"
              min={1}
              max={15}
              value={numItems}
              onChange={(e) => {
                setNumItems(Number(e.target.value))
                setPlacement(null)
              }}
              className="w-20 accent-primary"
            />
          </label>
          <label className="flex items-center gap-2 text-muted-foreground">
            Slots: {numSlots}
            <input
              type="range"
              min={1}
              max={10}
              value={numSlots}
              onChange={(e) => {
                setNumSlots(Number(e.target.value))
                setPlacement(null)
              }}
              className="w-20 accent-primary"
            />
          </label>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex justify-center gap-2 flex-wrap">
          {Array.from({ length: numSlots }, (_, s) => {
            const items = slotItems[s]
            const isOverloaded = items.length > 1
            return (
              <div
                key={s}
                className={`flex flex-col items-center border-2 rounded-lg min-w-[3.5rem] p-2 transition-colors ${
                  isOverloaded
                    ? "border-destructive bg-destructive/10"
                    : placement
                      ? "border-primary/30 bg-primary/5"
                      : "border-muted-foreground/20 bg-muted/30"
                }`}
              >
                <div className="flex flex-col items-center gap-1 min-h-[2.5rem] justify-end">
                  {items.map((itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`w-6 h-6 rounded-full ${COLORS[itemIdx % COLORS.length]} flex items-center justify-center text-[10px] font-bold text-white`}
                    >
                      {itemIdx + 1}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1.5 font-mono">
                  #{s + 1}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {placement ? (
            <>
              <span className="font-medium text-foreground">
                {numItems} items → {numSlots} slots
              </span>
              {" · "}
              Max in one slot: <strong>{maxCount}</strong>
              {" · "}
              Guaranteed minimum: <strong>⌈{numItems}/{numSlots}⌉ = {ceil}</strong>
              {hasCollision && (
                <span className="block mt-1 text-destructive font-medium">
                  Injection impossible — collision guaranteed
                </span>
              )}
            </>
          ) : (
            <span>
              {numItems} items, {numSlots} slots — at least one slot must hold
              ≥ ⌈{numItems}/{numSlots}⌉ = {ceil} item{ceil > 1 ? "s" : ""}
              {hasCollision && (
                <span className="block mt-1 text-destructive font-medium">
                  {numItems} {">"} {numSlots} — injection impossible
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-center gap-3">
        <Button variant="outline" size="sm" onClick={placeRandom}>
          {placement ? "Randomize" : "Place Items"}
        </Button>
        {placement && (
          <Button variant="outline" size="sm" onClick={reset}>
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
