"use client"

import { useMemo } from "react"

// ============================================================================
// Types
// ============================================================================

export interface DivisionRemainderTableProps {
  maxNumber?: number // How many columns (default: 12)
  divisors?: number[] // Which divisors to show (default: [2, 3, 4, 5])
  showQuotient?: boolean // Show "d|q +r" format vs just "+r" (default: true)
  caption?: string
  className?: string
}

// Colors for each remainder value (cycles)
const remainderColors = [
  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200", // r=0 (divisible)
  "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
  "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200",
  "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
  "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200",
  "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200",
]

// ============================================================================
// Component
// ============================================================================

export function DivisionRemainderTable({
  maxNumber = 12,
  divisors = [2, 3, 4, 5],
  showQuotient = true,
  caption,
  className = "",
}: DivisionRemainderTableProps) {
  const numbers = useMemo(
    () => Array.from({ length: maxNumber + 1 }, (_, i) => i),
    [maxNumber]
  )

  const getRemainderData = (n: number, d: number) => {
    const quotient = Math.floor(n / d)
    const remainder = n % d
    return { quotient, remainder }
  }

  const formatCell = (n: number, d: number) => {
    const { quotient, remainder } = getRemainderData(n, d)

    if (remainder === 0) {
      // Perfectly divisible
      if (showQuotient) {
        return `${d}∣${quotient}`
      }
      return "0"
    }

    // Has remainder
    if (showQuotient) {
      return `${d}∣${quotient} +${remainder}`
    }
    return `+${remainder}`
  }

  return (
    <div className={`my-6 ${className}`}>
      <div className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            {/* Number line row */}
            <thead>
              <tr className="border-b-2 border-primary/30 bg-primary/5">
                <th className="px-3 py-2 text-left font-semibold text-sm sticky left-0 bg-primary/5 z-10 min-w-[80px]">
                  n →
                </th>
                {numbers.map((n) => (
                  <th
                    key={n}
                    className="px-3 py-2 text-center font-mono text-lg min-w-[70px]"
                  >
                    {n}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Divisor rows */}
            <tbody>
              {divisors.map((d) => (
                <tr key={d} className="border-b border-primary/10">
                  <td className="px-3 py-2 text-left font-semibold sticky left-0 bg-background z-10 border-r border-primary/20">
                    <span className="text-sm">÷ {d}</span>
                  </td>
                  {numbers.map((n) => {
                    const { remainder } = getRemainderData(n, d)
                    const colorClass = remainderColors[remainder % remainderColors.length]

                    return (
                      <td
                        key={n}
                        className={`px-2 py-2 text-center text-sm font-mono ${colorClass}`}
                      >
                        {formatCell(n, d)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="p-3 border-t border-primary/20 bg-primary/5">
          <div className="flex flex-wrap gap-3 items-center justify-center text-sm">
            <span className="text-muted-foreground">Remainder pattern:</span>
            {divisors.length > 0 && (
              <>
                <span className={`px-2 py-1 rounded ${remainderColors[0]}`}>
                  r = 0 (divisible)
                </span>
                {Array.from({ length: Math.min(divisors[divisors.length - 1] - 1, 4) }, (_, i) => (
                  <span
                    key={i + 1}
                    className={`px-2 py-1 rounded ${remainderColors[(i + 1) % remainderColors.length]}`}
                  >
                    r = {i + 1}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Insight */}
        <div className="p-3 border-t border-primary/20 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-center text-amber-800 dark:text-amber-200">
            <strong>Notice the pattern!</strong> Remainders cycle with period equal to the divisor.
            Division by {divisors[0]} creates a {divisors[0]}-cycle, division by {divisors[1]} creates a {divisors[1]}-cycle, etc.
          </p>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}
