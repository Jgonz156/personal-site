"use client"

import { useMemo, useState } from "react"

type BitWidth = 4 | 8 | 16

function toBinary(n: number, bits: number): string {
  const max = Math.pow(2, bits)
  const v = ((n % max) + max) % max
  return v.toString(2).padStart(bits, "0")
}

function signedDecimal(n: number, bits: number): number {
  const half = Math.pow(2, bits - 1)
  return n >= half ? n - Math.pow(2, bits) : n
}

interface BoundaryRow {
  unsigned: number
  signed: number
  label: string
}

function getBoundaryRows(bits: BitWidth): BoundaryRow[] {
  const max = Math.pow(2, bits) - 1
  const halfMinus1 = Math.pow(2, bits - 1) - 1
  const half = Math.pow(2, bits - 1)

  return [
    { unsigned: 0, signed: 0, label: "Zero — all bits off" },
    { unsigned: 1, signed: 1, label: "Smallest positive" },
    {
      unsigned: halfMinus1,
      signed: halfMinus1,
      label: "Largest positive (MSB still 0)",
    },
    {
      unsigned: half,
      signed: -half,
      label: "Sign bit flips on! Most negative",
    },
    {
      unsigned: half + 1,
      signed: -half + 1,
      label: "One step past the wrap",
    },
    { unsigned: max, signed: -1, label: "All bits on = −1 (signed)" },
  ]
}

/**
 * Format a binary string with a space every 4 bits for readability.
 * "1010110011110000" -> "1010 1100 1111 0000"
 */
function groupBinary(s: string): string {
  const out: string[] = []
  for (let i = s.length; i > 0; i -= 4) {
    out.unshift(s.slice(Math.max(0, i - 4), i))
  }
  return out.join(" ")
}

export function TwosComplementExplorer() {
  const [bits, setBits] = useState<BitWidth>(4)
  const [value, setValue] = useState(0)

  const max = Math.pow(2, bits)
  const half = Math.pow(2, bits - 1)
  const safeValue = Math.min(Math.max(value, 0), max - 1)

  const binary = toBinary(safeValue, bits)
  const groupedBinary = groupBinary(binary)
  const restGrouped = groupBinary(binary.slice(1))
  const isNegative = binary[0] === "1"
  const signed = signedDecimal(safeValue, bits)

  const handleBitsChange = (newBits: BitWidth) => {
    setBits(newBits)
    if (value >= Math.pow(2, newBits)) {
      setValue(Math.pow(2, newBits) - 1)
    }
  }

  const boundaryRows = useMemo(() => getBoundaryRows(bits), [bits])

  // Build a representative example for the footer's "5 + (-3)" demo
  const negThreeUnsigned = max - 3 // 13 / 253 / 65533

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      {/* Header with bit-width tabs */}
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-3">
        <span className="font-semibold text-sm">⚙ Two&apos;s Complement Explorer</span>
        <div className="flex items-center gap-1.5">
          {([4, 8, 16] as const).map((b) => (
            <button
              key={b}
              onClick={() => handleBitsChange(b)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                bits === b
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {b}-bit
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4 py-3 border-b bg-muted/10">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <label className="text-xs text-muted-foreground">
            Drag the slider to sweep through every bit pattern (0 to {max - 1}{" "}
            unsigned)
          </label>
          <span className="text-xs font-mono text-muted-foreground">
            {safeValue} / {max - 1}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={max - 1}
          value={safeValue}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
          <span>0</span>
          <span className="text-amber-600 dark:text-amber-400">
            ↑ wrap point at {half}
          </span>
          <span>{max - 1}</span>
        </div>
      </div>

      {/* Big binary display */}
      <div className="px-4 py-4 border-b">
        <div className="text-center mb-3">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Binary ({bits} bits)
          </div>
          <div className="font-mono text-base sm:text-xl tracking-wider break-all">
            <span
              className={`px-1.5 rounded font-bold ${
                isNegative
                  ? "bg-red-500/20 text-red-700 dark:text-red-300"
                  : "bg-green-500/20 text-green-700 dark:text-green-300"
              }`}
            >
              {binary[0]}
            </span>
            <span className="ml-1.5 text-foreground">{restGrouped}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            ↑ sign bit ({isNegative ? "1 → negative" : "0 → non-negative"})
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="px-3 py-2 border rounded bg-muted/20 text-center">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
              Unsigned decimal
            </div>
            <div className="font-mono font-bold text-xl">{safeValue}</div>
            <div className="text-[10px] text-muted-foreground italic">
              just read the bits as a number
            </div>
          </div>
          <div
            className={`px-3 py-2 border rounded text-center ${
              isNegative ? "bg-red-500/10" : "bg-green-500/10"
            }`}
          >
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
              Signed (two&apos;s complement)
            </div>
            <div
              className={`font-mono font-bold text-xl ${
                isNegative
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
              }`}
            >
              {signed >= 0 ? "+" : ""}
              {signed}
            </div>
            <div className="text-[10px] text-muted-foreground italic">
              {isNegative
                ? `${safeValue} − 2^${bits} = ${safeValue} − ${max} = ${signed}`
                : "MSB = 0 → same as unsigned"}
            </div>
          </div>
        </div>
      </div>

      {/* Boundary table */}
      <div className="px-4 py-3 border-b overflow-x-auto">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Interesting patterns (click a row to jump the slider)
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b">
              <th className="text-left py-1.5 px-2">Binary</th>
              <th className="text-right py-1.5 px-2">Unsigned</th>
              <th className="text-right py-1.5 px-2">Signed</th>
              <th className="text-left py-1.5 px-2 hidden md:table-cell">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            {boundaryRows.map((row, i) => {
              const rowBin = toBinary(row.unsigned, bits)
              const rowGroupedRest = groupBinary(rowBin.slice(1))
              const rowIsNeg = row.signed < 0
              const isCurrent = row.unsigned === safeValue
              return (
                <tr
                  key={i}
                  onClick={() => setValue(row.unsigned)}
                  className={`border-b last:border-0 cursor-pointer hover:bg-muted/30 transition-colors ${
                    isCurrent ? "bg-primary/10 hover:bg-primary/15" : ""
                  }`}
                >
                  <td className="py-1.5 px-2 font-mono text-xs sm:text-sm">
                    <span
                      className={`px-1 rounded font-bold ${
                        rowIsNeg
                          ? "bg-red-500/15 text-red-700 dark:text-red-300"
                          : "bg-green-500/15 text-green-700 dark:text-green-300"
                      }`}
                    >
                      {rowBin[0]}
                    </span>
                    <span className="ml-1">{rowGroupedRest}</span>
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono">
                    {row.unsigned}
                  </td>
                  <td
                    className={`py-1.5 px-2 text-right font-mono ${
                      rowIsNeg ? "text-red-700 dark:text-red-300" : ""
                    }`}
                  >
                    {row.signed >= 0 ? "+" : ""}
                    {row.signed}
                  </td>
                  <td className="py-1.5 px-2 text-xs text-muted-foreground italic hidden md:table-cell">
                    {row.label}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with the "addition just works" insight */}
      <div className="px-4 py-3 bg-muted/20">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">The MSB is the sign bit.</strong>{" "}
          Values 0 to {half - 1} are non-negative (MSB = 0); values {half} to{" "}
          {max - 1} unsigned are reinterpreted as {-half} to −1 signed (MSB =
          1). The signed value is just{" "}
          <span className="font-mono">unsigned − 2^{bits}</span> when the sign
          bit is on.
        </p>
        <p className="text-xs text-muted-foreground italic mt-2">
          <strong className="text-foreground not-italic">
            Why this is brilliant:
          </strong>{" "}
          The CPU does <em>one</em> addition regardless of sign. To compute{" "}
          <span className="font-mono">5 + (−3)</span>, the hardware adds the
          unsigned bit patterns:{" "}
          <span className="font-mono">5 + {negThreeUnsigned} ={" "}
          {(5 + negThreeUnsigned).toLocaleString()} ≡ 2 (mod {max})</span>{" "}
          → reading bit pattern 2 as signed gives <span className="font-mono">+2</span>.
          Correct! No branching, no special "is it negative?" hardware. Two&apos;s
          complement makes signed arithmetic <em>free</em>.
        </p>
      </div>
    </div>
  )
}
