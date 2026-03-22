"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const BIT_OPTIONS = [8, 16, 32, 64] as const

const COLUMNS = [
  { english: "Quin", byteUnit: "EiB", bytePrefix: "Exa" },
  { english: "Quad", byteUnit: "PiB", bytePrefix: "Peta" },
  { english: "Tril", byteUnit: "TiB", bytePrefix: "Tera" },
  { english: "Bil", byteUnit: "GiB", bytePrefix: "Giga" },
  { english: "Mil", byteUnit: "MiB", bytePrefix: "Mega" },
  { english: "Thou", byteUnit: "KiB", bytePrefix: "Kilo" },
  { english: "Hund", byteUnit: "B", bytePrefix: "" },
]

const ADDRESS_DATA: Record<number, { max: string; total: string }> = {
  8: { max: "255", total: "256" },
  16: { max: "65,535", total: "65,536" },
  32: { max: "4,294,967,295", total: "4,294,967,296" },
  64: { max: "18,446,744,073,709,551,615", total: "18,446,744,073,709,551,616" },
}

function getMaxAddress(bits: number): string {
  return ADDRESS_DATA[bits]?.max ?? "0"
}

function getTotalAddresses(bits: number): string {
  return ADDRESS_DATA[bits]?.total ?? "0"
}

function getDigitGroups(bits: number): string[] {
  const str = getMaxAddress(bits)
  return str.split(",")
}

function getByteDescription(bits: number): string {
  if (bits === 8) return "256 B"
  if (bits === 16) return "64 KiB"
  if (bits === 32) return "4 GiB"
  return "16 EiB"
}

export function AddressSpaceScale({ className }: { className?: string }) {
  const [bitIndex, setBitIndex] = useState(3)
  const bits = BIT_OPTIONS[bitIndex]
  const groups = getDigitGroups(bits)

  const startColIndex = COLUMNS.length - groups.length

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Address Space Scale</h4>
      <p className="text-xs text-muted-foreground mb-3">
        How many addresses can an N-bit system reference? Slide to compare 8, 16, 32, and 64-bit address spaces.
      </p>

      {/* Slider */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-muted-foreground w-20 shrink-0">
          Bit width: <strong className="text-foreground">{bits}</strong>
        </span>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={bitIndex}
          onChange={(e) => setBitIndex(parseInt(e.target.value))}
          className="flex-1 accent-blue-600"
        />
        <div className="flex gap-2 text-[10px] text-muted-foreground">
          {BIT_OPTIONS.map((b, i) => (
            <button
              key={b}
              onClick={() => setBitIndex(i)}
              className={cn(
                "px-1.5 py-0.5 rounded transition-colors",
                i === bitIndex
                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold"
                  : "hover:bg-muted/30"
              )}
            >
              {b}-bit
            </button>
          ))}
        </div>
      </div>

      {/* Total address count */}
      <div className="mb-3 p-2 rounded bg-blue-500/5 border border-blue-400/20 text-xs text-center">
        <span className="text-muted-foreground">2</span>
        <sup className="text-blue-700 dark:text-blue-300 font-bold">{bits}</sup>
        <span className="text-muted-foreground"> = </span>
        <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
          {getTotalAddresses(bits)}
        </span>
        <span className="text-muted-foreground"> addresses</span>
        <span className="text-muted-foreground"> ≈ </span>
        <span className="font-semibold text-foreground">{getByteDescription(bits)}</span>
      </div>

      {/* Max address display */}
      <div className="text-[10px] text-muted-foreground font-semibold mb-1">
        Max addressable value (2<sup>{bits}</sup> − 1):
      </div>
      <div className="font-mono text-lg font-bold text-center mb-4 tracking-wide text-blue-700 dark:text-blue-300">
        {getMaxAddress(bits)}
      </div>

      {/* Column breakdown table */}
      <div className="overflow-x-auto">
        <div
          className="grid gap-1 min-w-fit mx-auto"
          style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(70px, 1fr))` }}
        >
          {groups.map((group, gi) => {
            const colMeta = COLUMNS[startColIndex + gi]
            return (
              <div
                key={gi}
                className={cn(
                  "rounded border p-2 text-center transition-all",
                  gi === 0 && groups.length > 1
                    ? "border-blue-400/40 bg-blue-500/10"
                    : "border-muted-foreground/15 bg-muted/5"
                )}
              >
                {/* Row 1: Digit group */}
                <div className="font-mono font-bold text-sm text-foreground mb-1">
                  {group}
                </div>
                {/* Row 2: English magnitude */}
                <div className="text-[10px] font-semibold text-muted-foreground">
                  {colMeta.english}
                </div>
                {/* Row 3: Byte unit */}
                <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300 mt-1">
                  {colMeta.byteUnit}
                </div>
                {/* Row 4: Byte prefix */}
                <div className="text-[9px] text-muted-foreground">
                  {colMeta.bytePrefix || "—"}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Contextual callout */}
      <div className="mt-4 p-2 rounded border border-blue-400/20 bg-blue-500/5 text-[10px] text-muted-foreground">
        {bits === 8 && (
          <span>A humble 8-bit system can address just <strong className="text-foreground">256 bytes</strong> — enough for a few variables.</span>
        )}
        {bits === 16 && (
          <span>A 16-bit system addresses <strong className="text-foreground">64 KiB</strong> — the entire address space of early personal computers like the Apple II.</span>
        )}
        {bits === 32 && (
          <span>A 32-bit system tops out at <strong className="text-foreground">4 GiB</strong> — this is why 32-bit games and operating systems hit the famous 4 GB RAM limit. The instruction set literally cannot express larger addresses.</span>
        )}
        {bits === 64 && (
          <span>A 64-bit system can theoretically address <strong className="text-foreground">16 EiB</strong> (≈ 18.4 exabytes). This is a number in the <strong>quintillions</strong>. No computer on Earth has this much memory — not even close.</span>
        )}
      </div>
    </div>
  )
}
