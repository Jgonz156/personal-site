"use client"

import { useMemo } from "react"

// ============================================================================
// Types
// ============================================================================

export interface PrimeFactorizationTableProps {
  maxNumber?: number // How many numbers to show (default: 20)
  showPrimeColors?: boolean // Color-code by prime factor (default: true)
  caption?: string
  className?: string
}

interface Factorization {
  n: number
  factors: Map<number, number> // prime -> exponent
  isPrime: boolean
  displayString: string
}

// ============================================================================
// Helper Functions
// ============================================================================

// Unicode superscript digits
const superscripts: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
}

function toSuperscript(num: number): string {
  return String(num)
    .split("")
    .map((d) => superscripts[d] || d)
    .join("")
}

function primeFactorize(n: number): Map<number, number> {
  const factors = new Map<number, number>()
  if (n <= 1) return factors

  let num = n
  let divisor = 2

  while (num > 1) {
    while (num % divisor === 0) {
      factors.set(divisor, (factors.get(divisor) || 0) + 1)
      num /= divisor
    }
    divisor++
    if (divisor * divisor > num && num > 1) {
      factors.set(num, 1)
      break
    }
  }

  return factors
}

function factorsToDisplay(factors: Map<number, number>): string {
  if (factors.size === 0) return "1"

  const parts: string[] = []
  const sortedPrimes = Array.from(factors.keys()).sort((a, b) => a - b)

  for (const prime of sortedPrimes) {
    const exp = factors.get(prime)!
    if (exp === 1) {
      parts.push(String(prime))
    } else {
      parts.push(`${prime}${toSuperscript(exp)}`)
    }
  }

  return parts.join("×")
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}

function getFactorizations(max: number): Factorization[] {
  const results: Factorization[] = []

  for (let n = 1; n <= max; n++) {
    const factors = primeFactorize(n)
    results.push({
      n,
      factors,
      isPrime: isPrime(n),
      displayString: n === 1 ? "1" : factorsToDisplay(factors),
    })
  }

  return results
}

// ============================================================================
// Component
// ============================================================================

export function PrimeFactorizationTable({
  maxNumber = 20,
  showPrimeColors = true,
  caption,
  className = "",
}: PrimeFactorizationTableProps) {
  const factorizations = useMemo(
    () => getFactorizations(maxNumber),
    [maxNumber]
  )

  return (
    <div className={`my-6 ${className}`}>
      <div className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            {/* Number row */}
            <thead>
              <tr className="border-b-2 border-primary/30 bg-primary/5">
                <th className="px-2 py-2 text-left font-semibold text-sm sticky left-0 bg-primary/5 z-10">
                  n
                </th>
                {factorizations.map((f) => (
                  <th
                    key={f.n}
                    className={`px-3 py-2 text-center font-mono text-lg min-w-[50px] ${
                      f.isPrime
                        ? "bg-amber-100 dark:bg-amber-900/30 font-bold"
                        : ""
                    }`}
                  >
                    {f.n}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Factorization row */}
            <tbody>
              <tr>
                <td className="px-2 py-3 text-left font-semibold text-sm sticky left-0 bg-background z-10 border-r border-primary/20">
                  Factors
                </td>
                {factorizations.map((f) => (
                  <td
                    key={f.n}
                    className={`px-3 py-3 text-center font-mono ${
                      f.isPrime
                        ? "bg-amber-50 dark:bg-amber-900/20"
                        : ""
                    }`}
                  >
                    {f.displayString}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="p-3 border-t border-primary/20 bg-primary/5 flex flex-wrap gap-4 items-center justify-center">
          <span className="text-sm text-muted-foreground">Legend:</span>
          <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded text-sm font-medium">
            Prime numbers
          </span>
          <span className="text-sm text-muted-foreground">
            = only divisible by 1 and themselves
          </span>
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
