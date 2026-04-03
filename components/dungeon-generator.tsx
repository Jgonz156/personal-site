"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

const COLS = 20
const ROWS = 14
const MIN_ROOM = 3
const MAX_ROOM_W = 6
const MAX_ROOM_H = 5
const TARGET_ROOMS = 5

type Cell = "wall" | "room" | "corridor"

interface Room {
  x: number
  y: number
  w: number
  h: number
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function placeRooms(): Room[] {
  const rooms: Room[] = []
  let attempts = 0
  while (rooms.length < TARGET_ROOMS && attempts < 200) {
    attempts++
    const w = randInt(MIN_ROOM, MAX_ROOM_W)
    const h = randInt(MIN_ROOM, MAX_ROOM_H)
    const x = randInt(1, COLS - w - 1)
    const y = randInt(1, ROWS - h - 1)
    const candidate = { x, y, w, h }

    const overlaps = rooms.some(
      (r) =>
        candidate.x - 1 < r.x + r.w &&
        candidate.x + candidate.w + 1 > r.x &&
        candidate.y - 1 < r.y + r.h &&
        candidate.y + candidate.h + 1 > r.y
    )

    if (!overlaps) rooms.push(candidate)
  }
  return rooms
}

function roomCenter(r: Room): [number, number] {
  return [Math.floor(r.x + r.w / 2), Math.floor(r.y + r.h / 2)]
}

function generateDungeon() {
  const grid: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => "wall")
  )

  const rooms = placeRooms()

  for (const r of rooms) {
    for (let dy = 0; dy < r.h; dy++) {
      for (let dx = 0; dx < r.w; dx++) {
        grid[r.y + dy][r.x + dx] = "room"
      }
    }
  }

  // Connect rooms with L-shaped corridors using a simple MST-like approach
  const connected = new Set<number>([0])
  const remaining = new Set<number>(rooms.map((_, i) => i).filter((i) => i > 0))

  let corridorCells = 0

  while (remaining.size > 0) {
    let bestDist = Infinity
    let bestFrom = 0
    let bestTo = 0

    for (const ci of connected) {
      for (const ri of remaining) {
        const [cx, cy] = roomCenter(rooms[ci])
        const [rx, ry] = roomCenter(rooms[ri])
        const dist = Math.abs(cx - rx) + Math.abs(cy - ry)
        if (dist < bestDist) {
          bestDist = dist
          bestFrom = ci
          bestTo = ri
        }
      }
    }

    connected.add(bestTo)
    remaining.delete(bestTo)

    const [x1, y1] = roomCenter(rooms[bestFrom])
    const [x2, y2] = roomCenter(rooms[bestTo])

    // Carve L-shaped corridor: horizontal first, then vertical
    const dx = x2 > x1 ? 1 : -1
    for (let x = x1; x !== x2; x += dx) {
      if (grid[y1][x] === "wall") {
        grid[y1][x] = "corridor"
        corridorCells++
      }
    }
    const dy = y2 > y1 ? 1 : -1
    for (let y = y1; y !== y2 + dy; y += dy) {
      if (grid[y][x2] === "wall") {
        grid[y][x2] = "corridor"
        corridorCells++
      }
    }
  }

  const roomCellCount = rooms.reduce((sum, r) => sum + r.w * r.h, 0)

  return {
    grid,
    rooms,
    stats: {
      roomCount: rooms.length,
      corridorCells,
      walkable: roomCellCount + corridorCells,
      totalCells: ROWS * COLS,
    },
  }
}

export function DungeonGenerator() {
  const [dungeon, setDungeon] = useState(() => generateDungeon())

  const regenerate = useCallback(() => {
    setDungeon(generateDungeon())
  }, [])

  const cellColor = (cell: Cell) => {
    switch (cell) {
      case "wall":
        return "bg-zinc-800 dark:bg-zinc-700"
      case "room":
        return "bg-amber-200 dark:bg-amber-900/60"
      case "corridor":
        return "bg-stone-300 dark:bg-stone-600"
    }
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">Dungeon Generator</span>
        <Button variant="outline" size="sm" onClick={regenerate}>
          Generate
        </Button>
      </div>

      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div
            className="grid border border-zinc-600 rounded overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              width: "100%",
              maxWidth: "480px",
              aspectRatio: `${COLS} / ${ROWS}`,
            }}
          >
            {dungeon.grid.flatMap((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  className={`${cellColor(cell)}`}
                  style={{ aspectRatio: "1" }}
                />
              ))
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mb-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-zinc-800 dark:bg-zinc-700 border border-zinc-600" />
            Wall
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-amber-200 dark:bg-amber-900/60 border border-amber-400" />
            Room
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-stone-300 dark:bg-stone-600 border border-stone-400" />
            Corridor
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Rooms</div>
            <div className="text-lg font-mono font-semibold">{dungeon.stats.roomCount}</div>
          </div>
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Corridors</div>
            <div className="text-lg font-mono font-semibold">{dungeon.stats.corridorCells}</div>
          </div>
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Walkable</div>
            <div className="text-lg font-mono font-semibold">{dungeon.stats.walkable}</div>
          </div>
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Total cells</div>
            <div className="text-lg font-mono font-semibold">{dungeon.stats.totalCells}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
