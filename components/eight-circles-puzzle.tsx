"use client"

import { useState, useCallback, useEffect } from "react"
import { useTheme } from "next-themes"

interface CirclePosition {
  x: number
  y: number
}

interface Preset {
  name: string
  description: string
  positions: CirclePosition[]
  adjacencies: [number, number][]
  letters: string[]
  viewBox: string
}

const WARMUP_PRESET: Preset = {
  name: "Warm-Up",
  description:
    "5 circles, 6 edges — a gentle start. Place A through E so no alphabetically adjacent letters share an edge.",
  positions: [
    { x: 150, y: 60 },
    { x: 300, y: 60 },
    { x: 75, y: 200 },
    { x: 225, y: 200 },
    { x: 375, y: 200 },
  ],
  adjacencies: [
    [0, 2], [0, 3],
    [1, 3], [1, 4],
    [2, 3], [3, 4],
  ],
  letters: ["A", "B", "C", "D", "E"],
  viewBox: "0 0 450 280",
}

const CLASSIC_PRESET: Preset = {
  name: "The Classic",
  description:
    "8 circles, 12 edges — the original puzzle. Place A through H so no alphabetically adjacent letters share an edge.",
  positions: [
    { x: 200, y: 50 },
    { x: 350, y: 50 },
    { x: 125, y: 170 },
    { x: 275, y: 170 },
    { x: 425, y: 170 },
    { x: 200, y: 290 },
    { x: 350, y: 290 },
    { x: 275, y: 410 },
  ],
  adjacencies: [
    [0, 2], [0, 3],
    [1, 3], [1, 4],
    [2, 3], [2, 5],
    [3, 4], [3, 5], [3, 6],
    [4, 6],
    [5, 7], [6, 7],
  ],
  letters: ["A", "B", "C", "D", "E", "F", "G", "H"],
  viewBox: "0 0 550 460",
}

const CHALLENGE_PRESET: Preset = {
  name: "Challenge",
  description:
    "10 circles, 17 edges — a denser graph requiring careful reasoning. Place A through J.",
  positions: [
    { x: 275, y: 40 },
    { x: 140, y: 120 },
    { x: 410, y: 120 },
    { x: 70, y: 230 },
    { x: 210, y: 230 },
    { x: 340, y: 230 },
    { x: 480, y: 230 },
    { x: 140, y: 340 },
    { x: 275, y: 340 },
    { x: 410, y: 340 },
  ],
  adjacencies: [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
    [3, 4], [3, 7],
    [4, 5], [4, 7], [4, 8],
    [5, 6], [5, 8], [5, 9],
    [6, 9],
    [7, 8], [8, 9],
  ],
  letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  viewBox: "0 0 550 400",
}

const PRESETS: Preset[] = [WARMUP_PRESET, CLASSIC_PRESET, CHALLENGE_PRESET]

function areAlphabeticallyAdjacent(a: string, b: string): boolean {
  return Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 1
}

interface EightCirclesPuzzleProps {
  presetIndex?: number
}

export function EightCirclesPuzzle({
  presetIndex = 1,
}: EightCirclesPuzzleProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = mounted && resolvedTheme === "dark"
  const [activePreset, setActivePreset] = useState(presetIndex)

  useEffect(() => {
    setMounted(true)
  }, [])

  const preset = PRESETS[activePreset]

  const [placement, setPlacement] = useState<(string | null)[]>(
    Array(preset.positions.length).fill(null)
  )
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null)
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null)

  const resetState = useCallback((p: Preset) => {
    setPlacement(Array(p.positions.length).fill(null))
    setDraggedLetter(null)
    setSelectedCircle(null)
  }, [])

  const handlePresetChange = (index: number) => {
    setActivePreset(index)
    resetState(PRESETS[index])
  }

  const getViolations = useCallback((): Set<string> => {
    const violations = new Set<string>()
    for (const [i, j] of preset.adjacencies) {
      const a = placement[i]
      const b = placement[j]
      if (a && b && areAlphabeticallyAdjacent(a, b)) {
        violations.add(`${i}-${j}`)
      }
    }
    return violations
  }, [placement, preset.adjacencies])

  const violations = getViolations()
  const allPlaced = placement.every((p) => p !== null)
  const isSolved = allPlaced && violations.size === 0

  const usedLetters = new Set(placement.filter(Boolean) as string[])

  const handleCircleClick = (index: number) => {
    if (draggedLetter) {
      const newPlacement = [...placement]
      const existingIndex = newPlacement.indexOf(draggedLetter)
      if (existingIndex !== -1) {
        newPlacement[existingIndex] = null
      }
      newPlacement[index] = draggedLetter
      setPlacement(newPlacement)
      setDraggedLetter(null)
      setSelectedCircle(null)
    } else if (placement[index]) {
      setDraggedLetter(placement[index])
      const newPlacement = [...placement]
      newPlacement[index] = null
      setPlacement(newPlacement)
    } else if (selectedCircle === null) {
      setSelectedCircle(index)
    } else {
      setSelectedCircle(null)
    }
  }

  const handleLetterClick = (letter: string) => {
    if (selectedCircle !== null) {
      const newPlacement = [...placement]
      newPlacement[selectedCircle] = letter
      setPlacement(newPlacement)
      setSelectedCircle(null)
    } else {
      setDraggedLetter(draggedLetter === letter ? null : letter)
    }
  }

  const colors = {
    empty: isDark ? "#374151" : "#f3f4f6",
    violation: isDark ? "#991b1b" : "#fca5a5",
    correct: isDark ? "#166534" : "#86efac",
    selected: isDark ? "#1e40af" : "#93c5fd",
    text: isDark ? "#f9fafb" : "#1f2937",
    line: isDark ? "#6b7280" : "#9ca3af",
    lineViolation: "#ef4444",
    strokeEmpty: isDark ? "#6b7280" : "#9ca3af",
    strokePlaced: isDark ? "#22c55e" : "#16a34a",
    strokeSelected: isDark ? "#3b82f6" : "#2563eb",
  }

  const getCircleColor = (index: number): string => {
    if (selectedCircle === index) return colors.selected
    const letter = placement[index]
    if (!letter) return colors.empty
    for (const [i, j] of preset.adjacencies) {
      if (i === index || j === index) {
        const other = i === index ? j : i
        const otherLetter = placement[other]
        if (otherLetter && areAlphabeticallyAdjacent(letter, otherLetter)) {
          return colors.violation
        }
      }
    }
    return colors.correct
  }

  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((p, i) => (
          <button
            key={i}
            onClick={() => handlePresetChange(i)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              activePreset === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 border-border hover:bg-muted"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-3">
        {preset.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {preset.letters.map((letter) => {
          const isUsed = usedLetters.has(letter)
          const isSelected = draggedLetter === letter
          return (
            <button
              key={letter}
              onClick={() => !isUsed && handleLetterClick(letter)}
              disabled={isUsed && !isSelected}
              className={`w-10 h-10 rounded-md border-2 font-bold text-lg transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-100 dark:bg-blue-900/50 dark:border-blue-400 scale-110"
                  : isUsed
                    ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
              }`}
            >
              {letter}
            </button>
          )
        })}
        <button
          onClick={() => resetState(preset)}
          className="ml-auto px-3 py-1.5 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors"
        >
          Reset
        </button>
      </div>

      <svg viewBox={preset.viewBox} className="w-full max-w-lg mx-auto">
        {preset.adjacencies.map(([i, j]) => {
          const key = `${i}-${j}`
          const isViolation = violations.has(key)
          return (
            <line
              key={key}
              x1={preset.positions[i].x}
              y1={preset.positions[i].y}
              x2={preset.positions[j].x}
              y2={preset.positions[j].y}
              stroke={isViolation ? colors.lineViolation : colors.line}
              strokeWidth={isViolation ? 3 : 1.5}
            />
          )
        })}

        {preset.positions.map((pos, i) => {
          const fillColor = getCircleColor(i)
          return (
            <g
              key={i}
              onClick={() => handleCircleClick(i)}
              className="cursor-pointer"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={30}
                fill={fillColor}
                stroke={
                  selectedCircle === i
                    ? colors.strokeSelected
                    : placement[i]
                      ? colors.strokePlaced
                      : colors.strokeEmpty
                }
                strokeWidth={selectedCircle === i ? 3 : 2}
              />
              <text
                x={pos.x}
                y={pos.y + 6}
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill={colors.text}
              >
                {placement[i] || ""}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-3 text-sm">
        {isSolved ? (
          <p className="font-semibold text-green-600 dark:text-green-400">
            Solved! No alphabetically adjacent letters share an edge.
          </p>
        ) : draggedLetter ? (
          <p className="text-blue-600 dark:text-blue-400">
            Click a circle to place <strong>{draggedLetter}</strong>.
          </p>
        ) : (
          <p className="text-muted-foreground">
            {violations.size > 0
              ? `${violations.size} violation${violations.size > 1 ? "s" : ""} — red circles have alphabetically adjacent neighbors.`
              : allPlaced
                ? "All placed correctly! No violations."
                : "Click a letter above, then click a circle to place it. No alphabetically adjacent letters (like A-B or D-E) may share an edge."}
          </p>
        )}
      </div>
    </div>
  )
}
