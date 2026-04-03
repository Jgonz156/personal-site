"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

type CellType = "empty" | "wall" | "start" | "end" | "visited" | "path"

interface PathfindingGridProps {
  rows?: number
  cols?: number
  className?: string
}

interface Coord {
  r: number
  c: number
}

function heuristic(a: Coord, b: Coord): number {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c)
}

function reconstructPath(
  cameFrom: Map<string, string>,
  current: string
): string[] {
  const path = [current]
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!
    path.unshift(current)
  }
  return path
}

function key(r: number, c: number): string {
  return `${r},${c}`
}

function parseKey(k: string): Coord {
  const [r, c] = k.split(",").map(Number)
  return { r, c }
}

export function PathfindingGrid({
  rows = 10,
  cols = 14,
  className = "",
}: PathfindingGridProps) {
  const [grid, setGrid] = useState<CellType[][]>(() => {
    const g = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "empty" as CellType)
    )
    g[1][1] = "start"
    g[rows - 2][cols - 2] = "end"
    for (let r = 2; r < rows - 2; r++) g[r][5] = "wall"
    for (let c = 5; c < 9; c++) g[2][c] = "wall"
    return g
  })

  const [tool, setTool] = useState<"wall" | "erase">("wall")
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [pathLength, setPathLength] = useState<number | null>(null)
  const [nodesExplored, setNodesExplored] = useState(0)
  const animRef = useRef<NodeJS.Timeout | null>(null)

  const getStart = useCallback((): Coord | null => {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (grid[r][c] === "start") return { r, c }
    return null
  }, [grid, rows, cols])

  const getEnd = useCallback((): Coord | null => {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (grid[r][c] === "end") return { r, c }
    return null
  }, [grid, rows, cols])

  const clearPath = useCallback(() => {
    setGrid((g) =>
      g.map((row) =>
        row.map((cell) =>
          cell === "visited" || cell === "path" ? "empty" : cell
        )
      )
    )
    setHasRun(false)
    setPathLength(null)
    setNodesExplored(0)
  }, [])

  const handleCellInteraction = useCallback(
    (r: number, c: number) => {
      if (hasRun) clearPath()
      setGrid((g) => {
        const next = g.map((row) => [...row])
        const current = next[r][c]
        if (current === "start" || current === "end") return next
        if (tool === "wall") {
          next[r][c] = current === "wall" ? "empty" : "wall"
        } else {
          next[r][c] = "empty"
        }
        return next
      })
    },
    [tool, hasRun, clearPath]
  )

  const runAStar = useCallback(() => {
    const start = getStart()
    const end = getEnd()
    if (!start || !end) return

    clearPath()

    const openSet = new Map<string, number>()
    const cameFrom = new Map<string, string>()
    const gScore = new Map<string, number>()
    const fScore = new Map<string, number>()

    const startKey = key(start.r, start.c)
    const endKey = key(end.r, end.c)
    openSet.set(startKey, 0)
    gScore.set(startKey, 0)
    fScore.set(startKey, heuristic(start, end))

    const visitedOrder: string[] = []
    const dirs = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
    ]

    let found = false
    let finalPath: string[] = []

    while (openSet.size > 0) {
      let currentKey = ""
      let minF = Infinity
      for (const [k, _] of openSet) {
        const f = fScore.get(k) ?? Infinity
        if (f < minF) {
          minF = f
          currentKey = k
        }
      }

      if (currentKey === endKey) {
        found = true
        finalPath = reconstructPath(cameFrom, currentKey)
        break
      }

      openSet.delete(currentKey)
      const current = parseKey(currentKey)
      if (currentKey !== startKey) {
        visitedOrder.push(currentKey)
      }

      for (const [dr, dc] of dirs) {
        const nr = current.r + dr
        const nc = current.c + dc
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue

        const cellType = grid[nr][nc]
        if (cellType === "wall") continue

        const neighborKey = key(nr, nc)
        const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1

        if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
          cameFrom.set(neighborKey, currentKey)
          gScore.set(neighborKey, tentativeG)
          fScore.set(neighborKey, tentativeG + heuristic({ r: nr, c: nc }, end))
          if (!openSet.has(neighborKey)) {
            openSet.set(neighborKey, fScore.get(neighborKey)!)
          }
        }
      }
    }

    let step = 0
    const totalVisited = visitedOrder.length
    const animate = () => {
      if (step < totalVisited) {
        const coord = parseKey(visitedOrder[step])
        setGrid((g) => {
          const next = g.map((row) => [...row])
          if (next[coord.r][coord.c] === "empty") {
            next[coord.r][coord.c] = "visited"
          }
          return next
        })
        setNodesExplored(step + 1)
        step++
        animRef.current = setTimeout(animate, 30)
      } else if (found) {
        setGrid((g) => {
          const next = g.map((row) => [...row])
          for (const pk of finalPath) {
            const coord = parseKey(pk)
            if (
              next[coord.r][coord.c] !== "start" &&
              next[coord.r][coord.c] !== "end"
            ) {
              next[coord.r][coord.c] = "path"
            }
          }
          return next
        })
        setPathLength(finalPath.length - 1)
        setHasRun(true)
      } else {
        setHasRun(true)
        setPathLength(-1)
      }
    }

    animRef.current = setTimeout(animate, 50)
  }, [grid, rows, cols, getStart, getEnd, clearPath])

  useEffect(() => {
    return () => {
      if (animRef.current) clearTimeout(animRef.current)
    }
  }, [])

  const cellColors: Record<CellType, string> = {
    empty: "bg-background",
    wall: "bg-foreground/80",
    start: "bg-green-500",
    end: "bg-red-500",
    visited: "bg-blue-200 dark:bg-blue-800/50",
    path: "bg-amber-400 dark:bg-amber-500",
  }

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">A* Pathfinding</span>
        <div className="flex items-center gap-2">
          <Button
            variant={tool === "wall" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("wall")}
          >
            Draw Walls
          </Button>
          <Button
            variant={tool === "erase" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("erase")}
          >
            Erase
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div
          className="inline-grid border border-border rounded overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "1px",
            backgroundColor: "var(--border)",
          }}
          onMouseLeave={() => setIsDrawing(false)}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${cellColors[cell]} ${
                  cell === "start" || cell === "end"
                    ? "cursor-default"
                    : "cursor-pointer hover:opacity-80"
                }`}
                onMouseDown={() => {
                  setIsDrawing(true)
                  handleCellInteraction(r, c)
                }}
                onMouseEnter={() => {
                  if (isDrawing) handleCellInteraction(r, c)
                }}
                onMouseUp={() => setIsDrawing(false)}
                title={
                  cell === "start"
                    ? "Start"
                    : cell === "end"
                      ? "End"
                      : `(${r}, ${c})`
                }
              />
            ))
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 inline-block rounded-sm" /> Start
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 inline-block rounded-sm" /> End
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-foreground/80 inline-block rounded-sm" /> Wall
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-200 dark:bg-blue-800/50 inline-block rounded-sm border border-border" /> Explored
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-amber-400 inline-block rounded-sm" /> Path
          </span>
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button size="sm" onClick={runAStar}>
            Find Path
          </Button>
          <Button variant="outline" size="sm" onClick={clearPath}>
            Clear Path
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {hasRun && pathLength !== null && pathLength >= 0 && (
            <span>
              Path length: <strong>{pathLength}</strong> · Nodes explored:{" "}
              <strong>{nodesExplored}</strong>
            </span>
          )}
          {hasRun && pathLength === -1 && (
            <span className="text-red-500">No path found!</span>
          )}
        </div>
      </div>
    </div>
  )
}
