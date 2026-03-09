"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

type Volatility = "volatile" | "nonvolatile" | "semivolatile"
type TimeScale = "computer" | "human" | "scientific"
type SortColumn = "name" | "size" | "speed" | "cost" | null
type SortDir = "asc" | "desc"

interface SubTech {
  name: string
  use: string
  size: string
  speedNs: number
  speedLabel: string
  cost: string
  note?: string
}

interface MemoryTier {
  name: string
  use: string
  size: string
  sizeOrder: number
  speedNs: number
  speedLabel: string
  costTier: number
  cost: string
  volatility: Volatility
  humanAnalogy: string
  detail: string
  subTechs?: SubTech[]
}

const TIERS: MemoryTier[] = [
  {
    name: "CPU Registers",
    use: "Immediate computation storage",
    size: "Bytes",
    sizeOrder: 0,
    speedNs: 0.3,
    speedLabel: "~1 cycle (~0.3 ns)",
    costTier: 9,
    cost: "Extremely expensive (built into CPU die)",
    volatility: "volatile",
    humanAnalogy: "Thinking a thought — instant",
    detail: "SRAM flip-flops etched directly into the CPU. The only memory that operates at full clock speed. A modern CPU has dozens of general-purpose registers plus hundreds of hidden architectural registers.",
  },
  {
    name: "CPU Cache (L1/L2/L3)",
    use: "Fast CPU computation buffer; multicore shared space",
    size: "KBs – MBs",
    sizeOrder: 1,
    speedNs: 1,
    speedLabel: "1–100 cycles (1–30 ns)",
    costTier: 8,
    cost: "Very expensive (on-die SRAM)",
    volatility: "volatile",
    humanAnalogy: "Reaching for a pen on your desk — near-instant",
    detail: "L1 is per-core and split into instruction/data caches (~32–64 KB each, ~1–4 cycles). L2 is per-core (~256 KB–1 MB, ~4–14 cycles). L3 is shared across all cores (~8–64 MB, ~30–70 cycles). Cache coherency protocols (MESI, MOESI) keep multicore views consistent.",
    subTechs: [
      { name: "L1 Cache", use: "Per-core instruction + data", size: "32–64 KB each", speedNs: 1, speedLabel: "~1–4 cycles (~1 ns)", cost: "Most expensive cache tier", note: "Split into L1i (instructions) and L1d (data)" },
      { name: "L2 Cache", use: "Per-core unified buffer", size: "256 KB – 1 MB", speedNs: 4, speedLabel: "~4–14 cycles (~4 ns)", cost: "Very expensive" },
      { name: "L3 Cache", use: "Shared across all cores", size: "8 – 64 MB", speedNs: 10, speedLabel: "~30–70 cycles (~10–30 ns)", cost: "Expensive", note: "Critical for multicore communication" },
    ],
  },
  {
    name: "ROM",
    use: "Boot firmware, system microcode",
    size: "MBs",
    sizeOrder: 2,
    speedNs: 100,
    speedLabel: "~100 ns",
    costTier: 3,
    cost: "Cheap (simple manufacturing)",
    volatility: "nonvolatile",
    humanAnalogy: "Recalling your birthday — well-memorized, quick",
    detail: "Read-Only Memory stores immutable boot code (BIOS/UEFI), microcode updates, and embedded firmware. Despite the name, modern EEPROM/Flash-based ROM can be electrically rewritten but requires special procedures — the system cannot casually overwrite it.",
  },
  {
    name: "RAM (Main Memory)",
    use: "Active processes and their data",
    size: "GBs",
    sizeOrder: 3,
    speedNs: 10,
    speedLabel: "6–20 ns (DDR5) / ~100 ns (DDR3)",
    costTier: 6,
    cost: "Moderate–expensive ($3–5/GB for DDR5)",
    volatility: "volatile",
    humanAnalogy: "Walking to a filing cabinet in your office — seconds",
    detail: "DRAM using 1 transistor + 1 capacitor per bit. Requires periodic refresh cycles (~64 ms) to prevent capacitor discharge. Modern DDR5 reaches 4800–8400 MT/s with on-die ECC. Dual/quad channel configurations multiply bandwidth.",
    subTechs: [
      { name: "DDR4 SDRAM", use: "Previous-gen main memory", size: "4–64 GB sticks", speedNs: 15, speedLabel: "~15–20 ns", cost: "$1.50–3/GB" },
      { name: "DDR5 SDRAM", use: "Current-gen main memory", size: "8–64 GB sticks", speedNs: 10, speedLabel: "~6–14 ns", cost: "$3–5/GB", note: "On-die ECC, dual 32-bit channels per DIMM" },
      { name: "HBM3/HBM3e", use: "GPU/AI accelerator memory", size: "16–48 GB per stack", speedNs: 8, speedLabel: "~8 ns", cost: "$10–20/GB", note: "3D-stacked DRAM; extreme bandwidth for ML workloads" },
    ],
  },
  {
    name: "NVMe SSD",
    use: "High-speed OS and application storage",
    size: "GBs – low TBs",
    sizeOrder: 4,
    speedNs: 20000,
    speedLabel: "10–50 μs",
    costTier: 5,
    cost: "Moderate ($0.05–0.10/GB)",
    volatility: "nonvolatile",
    humanAnalogy: "Driving to the library — a few minutes",
    detail: "NAND Flash connected via PCIe/NVMe protocol, bypassing the SATA bottleneck. Sequential reads reach 7+ GB/s on PCIe 5.0. Random IOPS matter more for OS workloads. Controller firmware manages wear leveling, garbage collection, and TRIM.",
    subTechs: [
      { name: "PCIe 4.0 NVMe", use: "Mainstream fast storage", size: "250 GB – 4 TB", speedNs: 30000, speedLabel: "~30–50 μs", cost: "$0.06–0.08/GB" },
      { name: "PCIe 5.0 NVMe", use: "Bleeding-edge fast storage", size: "1 – 4 TB", speedNs: 15000, speedLabel: "~10–20 μs", cost: "$0.08–0.12/GB", note: "Sequential reads up to 12+ GB/s" },
    ],
  },
  {
    name: "SATA SSD",
    use: "Mid-range long-term storage",
    size: "GBs – low TBs",
    sizeOrder: 5,
    speedNs: 75000,
    speedLabel: "50–100 μs",
    costTier: 4,
    cost: "Affordable ($0.04–0.07/GB)",
    volatility: "nonvolatile",
    humanAnalogy: "Taking the bus across town — 20 minutes",
    detail: "Same NAND Flash technology as NVMe but bottlenecked by the SATA III interface at ~550 MB/s. Still dramatically faster than HDDs for random access. Common in budget builds and older systems.",
    subTechs: [
      { name: "SLC NAND", use: "Enterprise / high-endurance", size: "Up to 1 TB", speedNs: 50000, speedLabel: "~50 μs", cost: "Expensive", note: "1 bit per cell — fastest, most durable" },
      { name: "TLC NAND", use: "Consumer mainstream", size: "256 GB – 4 TB", speedNs: 75000, speedLabel: "~75 μs", cost: "Moderate", note: "3 bits per cell — good balance of cost and endurance" },
      { name: "QLC NAND", use: "Budget / archival", size: "1 – 8 TB", speedNs: 100000, speedLabel: "~100 μs", cost: "Cheapest flash", note: "4 bits per cell — lowest endurance, highest density" },
    ],
  },
  {
    name: "HDD",
    use: "High-capacity bulk storage",
    size: "High GBs – High TBs",
    sizeOrder: 6,
    speedNs: 8000000,
    speedLabel: "5–10 ms",
    costTier: 2,
    cost: "Cheap ($0.015–0.03/GB)",
    volatility: "nonvolatile",
    humanAnalogy: "Flying across the country — several hours",
    detail: "Spinning magnetic platters with a mechanical read/write head. Sequential throughput is decent (~200 MB/s) but random access requires physical head movement (seek time) and platter rotation (rotational latency), making random I/O orders of magnitude slower than SSDs.",
    subTechs: [
      { name: "7200 RPM HDD", use: "Desktop / NAS", size: "1 – 20 TB", speedNs: 5000000, speedLabel: "~5 ms", cost: "$0.015–0.025/GB" },
      { name: "5400 RPM HDD", use: "Laptop / cold storage", size: "500 GB – 5 TB", speedNs: 8000000, speedLabel: "~8 ms", cost: "$0.02–0.03/GB", note: "Quieter, lower power, slower" },
      { name: "SMR HDD", use: "Archival / write-once", size: "8 – 20+ TB", speedNs: 10000000, speedLabel: "~10 ms", cost: "$0.012–0.02/GB", note: "Shingled magnetic recording — higher density, poor random write" },
    ],
  },
  {
    name: "Optical (CD/DVD/Blu-ray)",
    use: "Media distribution, archival",
    size: "MBs – GBs",
    sizeOrder: 7,
    speedNs: 250000000,
    speedLabel: "200–300 ms",
    costTier: 1,
    cost: "Very cheap per disc ($0.01–0.05/GB)",
    volatility: "nonvolatile",
    humanAnalogy: "Sailing across the Atlantic — weeks",
    detail: "Laser reads/writes pits on a reflective disc surface. The term \"burning\" a CD is literal — a laser physically burns microscopic pits into the dye layer. Read-only (pressed) discs last 50–100+ years. Writable discs degrade faster.",
    subTechs: [
      { name: "CD-ROM/CD-R", use: "Legacy audio/software distribution", size: "700 MB", speedNs: 300000000, speedLabel: "~300 ms", cost: "$0.03/disc" },
      { name: "DVD", use: "Video / software", size: "4.7 – 8.5 GB", speedNs: 250000000, speedLabel: "~250 ms", cost: "$0.01–0.02/GB" },
      { name: "Blu-ray", use: "HD video / archival", size: "25 – 128 GB", speedNs: 200000000, speedLabel: "~200 ms", cost: "$0.02–0.04/GB", note: "UHD Blu-ray uses 3-layer 100 GB discs" },
    ],
  },
  {
    name: "Tape Storage",
    use: "Enterprise backup, cold archival",
    size: "TBs per cartridge",
    sizeOrder: 8,
    speedNs: 1000000000,
    speedLabel: "~1+ second (seek)",
    costTier: 0,
    cost: "Cheapest per GB ($0.004–0.01/GB)",
    volatility: "nonvolatile",
    humanAnalogy: "Voyager reaching Neptune — 12 years",
    detail: "Linear magnetic tape wound on reels. Must fast-forward/rewind to reach data (sequential access only). LTO-9 holds 18 TB native (45 TB compressed) per cartridge. Still the backbone of enterprise backup and cold storage due to unbeatable cost-per-GB and 30+ year archival life.",
    subTechs: [
      { name: "LTO-8", use: "Enterprise backup", size: "12 TB native / 30 TB compressed", speedNs: 1000000000, speedLabel: "~1–2 s seek", cost: "$0.006/GB" },
      { name: "LTO-9", use: "Current-gen enterprise", size: "18 TB native / 45 TB compressed", speedNs: 1000000000, speedLabel: "~1–2 s seek", cost: "$0.004/GB", note: "Sequential read up to 400 MB/s once positioned" },
    ],
  },
]

const SI_TIERS: { exp: number; suffix: string; label: string }[] = [
  { exp: 0, suffix: "s", label: "10⁰ s" },
  { exp: -3, suffix: "ms", label: "10⁻³ s" },
  { exp: -6, suffix: "μs", label: "10⁻⁶ s" },
  { exp: -9, suffix: "ns", label: "10⁻⁹ s" },
  { exp: -12, suffix: "ps", label: "10⁻¹² s" },
]

function formatSpeedScientific(ns: number): string {
  const seconds = ns * 1e-9
  let best = SI_TIERS[0]
  for (const tier of SI_TIERS) {
    if (seconds < Math.pow(10, tier.exp + 3)) best = tier
    if (seconds >= Math.pow(10, tier.exp)) { best = tier; break }
  }
  const mantissa = seconds / Math.pow(10, best.exp)
  const mantissaStr = mantissa >= 100
    ? `~${mantissa.toFixed(0)}`
    : mantissa >= 10
      ? `~${mantissa.toFixed(1)}`
      : `~${mantissa.toFixed(2)}`
  return `${mantissaStr} ${best.label} (${best.suffix})`
}

function speedBarWidth(ns: number): number {
  const minLog = Math.log10(0.1)
  const maxLog = Math.log10(2e9)
  const log = Math.log10(Math.max(ns, 0.1))
  return Math.min(100, Math.max(2, ((log - minLog) / (maxLog - minLog)) * 100))
}

function speedBarColor(ns: number): string {
  if (ns < 2) return "bg-emerald-500"
  if (ns < 50) return "bg-green-500"
  if (ns < 1000) return "bg-lime-500"
  if (ns < 100000) return "bg-yellow-500"
  if (ns < 10000000) return "bg-orange-500"
  return "bg-red-500"
}

const volatilityBadge: Record<Volatility, { cls: string; label: string }> = {
  volatile: { cls: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-400/30", label: "Volatile" },
  nonvolatile: { cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30", label: "Non-Volatile" },
  semivolatile: { cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/30", label: "Semi-Volatile" },
}

const costDots = (tier: number) => {
  const filled = Math.min(tier + 1, 10)
  return "●".repeat(filled) + "○".repeat(10 - filled)
}

export function MemoryTechTable({ className }: { className?: string }) {
  const [timeScale, setTimeScale] = useState<TimeScale>("computer")
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [sortCol, setSortCol] = useState<SortColumn>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const toggleExpand = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const handleSort = (col: SortColumn) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortCol(col)
      setSortDir("asc")
    }
  }

  const sorted = useMemo(() => {
    if (!sortCol) return TIERS
    const arr = [...TIERS]
    const dir = sortDir === "asc" ? 1 : -1
    arr.sort((a, b) => {
      switch (sortCol) {
        case "name": return dir * a.name.localeCompare(b.name)
        case "size": return dir * (a.sizeOrder - b.sizeOrder)
        case "speed": return dir * (a.speedNs - b.speedNs)
        case "cost": return dir * (a.costTier - b.costTier)
        default: return 0
      }
    })
    return arr
  }, [sortCol, sortDir])

  const speedDisplay = (ns: number, label: string, human: string) => {
    switch (timeScale) {
      case "computer": return label
      case "human": return human
      case "scientific": return formatSpeedScientific(ns)
    }
  }

  const sortIndicator = (col: SortColumn) => {
    if (sortCol !== col) return " ↕"
    return sortDir === "asc" ? " ↑" : " ↓"
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h4 className="font-semibold text-sm">
          Memory Technology Hierarchy
        </h4>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-1">Speed scale:</span>
          {(["computer", "human", "scientific"] as TimeScale[]).map((ts) => (
            <Button
              key={ts}
              variant={timeScale === ts ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs h-6 px-2 capitalize",
                timeScale === ts && "bg-violet-600 hover:bg-violet-700"
              )}
              onClick={() => setTimeScale(ts)}
            >
              {ts === "scientific" ? "10ⁿ" : ts}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs min-w-[800px]">
          <thead>
            <tr className="border-b-2">
              <th
                className="text-left p-2 font-semibold cursor-pointer hover:text-violet-600 select-none"
                onClick={() => handleSort("name")}
              >
                Storage Type{sortIndicator("name")}
              </th>
              <th className="text-left p-2 font-semibold">Typical Use</th>
              <th
                className="text-left p-2 font-semibold cursor-pointer hover:text-violet-600 select-none"
                onClick={() => handleSort("size")}
              >
                Size{sortIndicator("size")}
              </th>
              <th
                className="text-left p-2 font-semibold cursor-pointer hover:text-violet-600 select-none min-w-[200px]"
                onClick={() => handleSort("speed")}
              >
                {timeScale === "human" ? "Human Scale" : timeScale === "scientific" ? "Speed (seconds)" : "Speed"}{sortIndicator("speed")}
              </th>
              <th
                className="text-left p-2 font-semibold cursor-pointer hover:text-violet-600 select-none"
                onClick={() => handleSort("cost")}
              >
                Cost{sortIndicator("cost")}
              </th>
              <th className="text-left p-2 font-semibold">Volatility</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((tier) => {
              const isExpanded = expanded.has(tier.name)
              const isHovered = hoveredRow === tier.name
              return (
                <TierGroup
                  key={tier.name}
                  tier={tier}
                  isExpanded={isExpanded}
                  isHovered={isHovered}
                  onToggle={() => toggleExpand(tier.name)}
                  onHover={(h) => setHoveredRow(h ? tier.name : null)}
                  speedDisplay={speedDisplay}
                  timeScale={timeScale}
                />
              )
            })}
          </tbody>
        </table>
      </div>

      {/* CPU cycle record + neuron comparison */}
      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border bg-violet-500/5 border-violet-400/30">
          <div className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1">
            Fastest CPU Cycle Ever Recorded
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-mono font-bold">~0.1096 ns</span> (109.6 picoseconds) — achieved by an overclocked Intel Core i9-14900KF at <span className="font-mono">9,130.33 MHz</span> (9.13 GHz). This is the fastest a single CPU cycle has ever completed.
          </div>
        </div>
        <div className="p-3 rounded-lg border bg-amber-500/5 border-amber-400/30">
          <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">
            Human Neuron Comparison
          </div>
          <div className="text-xs text-muted-foreground">
            A human neuron fires at <span className="font-mono font-bold">10–100 Hz</span> (max ~1000 Hz for specialized neurons). That is a {"\""}clock speed{"\""} of ~10 ms per cycle — equivalent to an HDD seek. The brain compensates with massive parallelism: <span className="font-mono">~86 billion</span> neurons and <span className="font-mono">~150 trillion</span> synapses, processing ~10 bits/sec consciously.
          </div>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-lg border bg-teal-500/5 border-teal-400/30">
        <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-1">
          Where Computer Time Meets Human Time
        </div>
        <div className="text-xs text-muted-foreground">
          At tape storage access times (~1 second), computer latency finally reaches human-perceivable timescales. Everything above tape in the hierarchy happens so fast that without the human-scale analogies, we literally cannot appreciate the speed differences. Toggle to the {"\""}<span className="font-semibold">human</span>{"\""} time scale above to feel the gap.
        </div>
      </div>
    </div>
  )
}

function TierGroup({
  tier,
  isExpanded,
  isHovered,
  onToggle,
  onHover,
  speedDisplay,
  timeScale,
}: {
  tier: MemoryTier
  isExpanded: boolean
  isHovered: boolean
  onToggle: () => void
  onHover: (h: boolean) => void
  speedDisplay: (ns: number, label: string, human: string) => string
  timeScale: TimeScale
}) {
  const vBadge = volatilityBadge[tier.volatility]
  const hasSubTechs = tier.subTechs && tier.subTechs.length > 0

  return (
    <>
      <tr
        className={cn(
          "border-b transition-colors cursor-pointer",
          isHovered && "bg-muted/50",
          isExpanded && "bg-muted/30"
        )}
        onClick={onToggle}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <td className="p-2 font-semibold">
          <div className="flex items-center gap-1.5">
            {hasSubTechs && (
              <span className={cn("transition-transform text-muted-foreground text-[10px]", isExpanded && "rotate-90")}>
                ▶
              </span>
            )}
            {tier.name}
          </div>
        </td>
        <td className="p-2 text-muted-foreground">{tier.use}</td>
        <td className="p-2 font-mono">{tier.size}</td>
        <td className="p-2">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px]">
              {speedDisplay(tier.speedNs, tier.speedLabel, tier.humanAnalogy)}
            </span>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden w-full max-w-[180px]">
              <div
                className={cn("h-full rounded-full transition-all", speedBarColor(tier.speedNs))}
                style={{ width: `${speedBarWidth(tier.speedNs)}%` }}
              />
            </div>
          </div>
        </td>
        <td className="p-2">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[10px] text-muted-foreground tracking-tight">
              {costDots(tier.costTier)}
            </span>
            <span className="text-[10px] text-muted-foreground">{tier.cost}</span>
          </div>
        </td>
        <td className="p-2">
          <span className={cn("inline-flex px-1.5 py-0.5 rounded border text-[10px] font-semibold", vBadge.cls)}>
            {vBadge.label}
          </span>
        </td>
      </tr>

      {/* Detail panel on hover */}
      {isHovered && !isExpanded && (
        <tr>
          <td colSpan={6} className="p-0">
            <div className="px-4 py-2 bg-muted/30 border-b text-xs text-muted-foreground italic">
              {tier.detail}
            </div>
          </td>
        </tr>
      )}

      {/* Expanded sub-technologies */}
      {isExpanded && (
        <>
          <tr>
            <td colSpan={6} className="p-0">
              <div className="px-4 py-2 bg-muted/20 border-b text-xs text-muted-foreground">
                {tier.detail}
              </div>
            </td>
          </tr>
          {tier.subTechs?.map((sub) => (
            <tr key={sub.name} className="border-b bg-muted/10">
              <td className="p-2 pl-8 font-mono text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground/40">└</span>
                  {sub.name}
                </div>
              </td>
              <td className="p-2 text-muted-foreground">{sub.use}</td>
              <td className="p-2 font-mono text-muted-foreground">{sub.size}</td>
              <td className="p-2">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {timeScale === "scientific"
                      ? formatSpeedScientific(sub.speedNs)
                      : sub.speedLabel}
                  </span>
                  <div className="h-1 rounded-full bg-muted overflow-hidden w-full max-w-[180px]">
                    <div
                      className={cn("h-full rounded-full", speedBarColor(sub.speedNs))}
                      style={{ width: `${speedBarWidth(sub.speedNs)}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="p-2 text-[10px] text-muted-foreground">{sub.cost}</td>
              <td className="p-2">
                {sub.note && (
                  <span className="text-[10px] text-muted-foreground italic">{sub.note}</span>
                )}
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  )
}
