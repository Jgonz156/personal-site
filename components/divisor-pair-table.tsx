"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

// ============================================================================
// Types
// ============================================================================

export interface DivisorPairTableProps {
  number: number // The number to factor
  highlightSymmetry?: boolean // Highlight when pairs "meet" at √n
  animated?: boolean // Enable step-through animation (default: true)
  showSqrtLine?: boolean // Show the √n boundary marker
  showAllPairs?: boolean // Show mirrored pairs after symmetry point (default: false)
  caption?: string
  className?: string
}

interface DivisorPair {
  a: number
  b: number
  isSymmetryPoint: boolean // When a === b
  isMirror: boolean // This is a mirrored/reversed pair
  mirrorOf?: number // Index of the original pair this mirrors
}

// ============================================================================
// Helper Functions
// ============================================================================

function getDivisorPairs(n: number, includeAllPairs: boolean): DivisorPair[] {
  const pairs: DivisorPair[] = []
  const sqrt = Math.sqrt(n)

  // First, get pairs up to sqrt
  for (let a = 1; a <= sqrt; a++) {
    if (n % a === 0) {
      const b = n / a
      pairs.push({
        a,
        b,
        isSymmetryPoint: a === b,
        isMirror: false,
      })
    }
  }

  // If showing all pairs, add the mirrored versions (excluding perfect square)
  if (includeAllPairs) {
    const originalCount = pairs.length
    // Iterate in reverse to maintain proper pairing order
    for (let i = originalCount - 1; i >= 0; i--) {
      const original = pairs[i]
      // Skip if it's a perfect square (a === b) - no mirror needed
      if (!original.isSymmetryPoint) {
        pairs.push({
          a: original.b,
          b: original.a,
          isSymmetryPoint: false,
          isMirror: true,
          mirrorOf: i,
        })
      }
    }
  }

  return pairs
}

// ============================================================================
// Component
// ============================================================================

export function DivisorPairTable({
  number,
  highlightSymmetry = true,
  animated = true,
  showSqrtLine = true,
  showAllPairs = false,
  caption,
  className = "",
}: DivisorPairTableProps) {
  const [currentStep, setCurrentStep] = useState(animated ? -1 : Infinity)
  const [isPlaying, setIsPlaying] = useState(false)

  const pairs = getDivisorPairs(number, showAllPairs)
  const sqrt = Math.sqrt(number)
  const isPerfectSquare = Number.isInteger(sqrt)

  // Find where the symmetry line should be (after original pairs, before mirrors)
  const symmetryLineIndex = showAllPairs
    ? pairs.findIndex((p) => p.isMirror) - 1
    : -1

  // Auto-play animation
  useEffect(() => {
    if (isPlaying && currentStep < pairs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 600)
      return () => clearTimeout(timer)
    } else if (isPlaying && currentStep >= pairs.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStep, pairs.length])

  const handleStep = () => {
    if (currentStep < pairs.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(-1)
    setIsPlaying(false)
  }

  const handlePlayAll = () => {
    setCurrentStep(-1)
    setTimeout(() => {
      setCurrentStep(0)
      setIsPlaying(true)
    }, 100)
  }

  const handleShowAll = () => {
    setCurrentStep(pairs.length - 1)
    setIsPlaying(false)
  }

  // Colors for pairs - mirrors use same color as their original
  const pairColors = [
    "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
    "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
    "bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700",
    "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700",
    "bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700",
    "bg-cyan-100 dark:bg-cyan-900/30 border-cyan-300 dark:border-cyan-700",
  ]

  const getColorForPair = (pair: DivisorPair, index: number): string => {
    if (pair.isMirror && pair.mirrorOf !== undefined) {
      return pairColors[pair.mirrorOf % pairColors.length]
    }
    return pairColors[index % pairColors.length]
  }

  const visiblePairs = pairs.filter((_, i) => i <= currentStep)

  // Check if we've revealed past the symmetry point
  const showSymmetryLine =
    showAllPairs &&
    symmetryLineIndex >= 0 &&
    currentStep >= symmetryLineIndex &&
    visiblePairs.some((p) => p.isMirror)

  return (
    <div className={`my-6 ${className}`}>
      <div className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-lg font-semibold">
            Divisor pairs of{" "}
            <span className="text-primary font-bold">{number}</span>
          </span>
          {showSqrtLine && (
            <div className="text-sm text-muted-foreground mt-1">
              √{number} ≈ {sqrt.toFixed(2)}
              {isPerfectSquare && " (perfect square!)"}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/30">
                <th className="px-4 py-2 text-center font-semibold">a</th>
                <th className="px-4 py-2 text-center font-semibold">×</th>
                <th className="px-4 py-2 text-center font-semibold">b</th>
                <th className="px-4 py-2 text-center font-semibold">=</th>
                <th className="px-4 py-2 text-center font-semibold">{number}</th>
              </tr>
            </thead>
            <tbody>
              {visiblePairs.map((pair, index) => {
                const colorClass = getColorForPair(pair, index)
                const isSymmetry = highlightSymmetry && pair.isSymmetryPoint
                const isFirstMirror =
                  pair.isMirror &&
                  (index === 0 || !visiblePairs[index - 1]?.isMirror)

                return (
                  <>
                    {/* Symmetry line separator */}
                    {isFirstMirror && showSymmetryLine && (
                      <tr key="symmetry-line">
                        <td
                          colSpan={5}
                          className="py-2 text-center border-y-2 border-dashed border-primary/50 bg-primary/5"
                        >
                          <span className="text-sm font-medium text-primary">
                            ↕ Symmetry at √{number} ≈ {sqrt.toFixed(2)} ↕
                          </span>
                        </td>
                      </tr>
                    )}
                    <tr
                      key={`${pair.a}-${pair.b}-${pair.isMirror ? "m" : "o"}`}
                      className={`
                        border-b border-primary/10 transition-all duration-300
                        ${colorClass}
                        ${isSymmetry ? "ring-2 ring-primary ring-inset" : ""}
                        ${pair.isMirror ? "opacity-80" : ""}
                      `}
                    >
                      <td className="px-4 py-3 text-center font-mono text-lg">
                        {pair.a}
                        {pair.isMirror && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ↔
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">×</td>
                      <td className="px-4 py-3 text-center font-mono text-lg">
                        {pair.b}
                        {pair.isMirror && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ↔
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">
                        =
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-lg font-bold">
                        {number}
                      </td>
                    </tr>
                  </>
                )
              })}

              {/* Empty state */}
              {visiblePairs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground italic"
                  >
                    Click "Step" or "Play" to reveal divisor pairs...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        {currentStep >= pairs.length - 1 && (
          <div className="mt-4 p-3 bg-primary/5 rounded-lg text-center">
            <span className="font-semibold">{number}</span> has{" "}
            <span className="font-bold text-primary">
              {showAllPairs
                ? pairs.length
                : pairs.length * 2 - (isPerfectSquare ? 1 : 0)}
            </span>{" "}
            divisors
            {pairs.length === (showAllPairs ? 2 : 1) &&
              !isPerfectSquare && (
                <span className="ml-2 text-amber-600 dark:text-amber-400 font-semibold">
                  — Prime number!
                </span>
              )}
          </div>
        )}
      </div>

      {/* Controls */}
      {animated && (
        <div className="flex gap-2 mt-3 flex-wrap">
          <Button
            onClick={handleStep}
            size="sm"
            variant="outline"
            disabled={currentStep >= pairs.length - 1}
          >
            Step →
          </Button>
          <Button
            onClick={handlePlayAll}
            size="sm"
            variant="outline"
            disabled={isPlaying}
          >
            ▶ Play
          </Button>
          <Button onClick={handleShowAll} size="sm" variant="outline">
            Show All
          </Button>
          <Button onClick={handleReset} size="sm" variant="ghost">
            Reset
          </Button>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}
