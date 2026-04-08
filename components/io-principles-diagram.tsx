"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

type Principle =
  | "device-independence"
  | "uniform-naming"
  | "error-handling"
  | "sync-async"
  | "buffering"
  | "shareable-dedicated"
  | "combined"

interface NodeDef { id: string; label: string; subtitle?: string; x: number; y: number; w: number; h: number; color: string }
interface EdgeDef { from: string; to: string; label?: string }
interface WrapperDef { id: string; label: string; x: number; y: number; w: number; h: number; color: string; lx: number; ly: number; la?: string }

const VW = 780, VH = 590

const W: WrapperDef[] = [
  { id: "soc", label: "SoC", x: 310, y: 4, w: 160, h: 165, color: "stroke-purple-400/40", lx: 320, ly: 18 },
  { id: "gpu", label: "GPU", x: 35, y: 50, w: 130, h: 175, color: "stroke-rose-400/40", lx: 44, ly: 64 },
  { id: "ram", label: "RAM", x: 610, y: 50, w: 145, h: 135, color: "stroke-cyan-400/40", lx: 619, ly: 64 },
  { id: "pch_box", label: "Platform Controller Hub", x: 95, y: 270, w: 590, h: 105, color: "stroke-teal-400/40", lx: 390, ly: 286, la: "middle" },
  { id: "usb", label: "USB Flash Drive", x: 100, y: 410, w: 104, h: 135, color: "stroke-sky-400/30", lx: 152, ly: 424, la: "middle" },
  { id: "sata", label: "SATA SSD", x: 208, y: 410, w: 104, h: 135, color: "stroke-orange-400/30", lx: 260, ly: 424, la: "middle" },
  { id: "nvme", label: "NVMe SSD", x: 316, y: 410, w: 104, h: 135, color: "stroke-amber-400/30", lx: 368, ly: 424, la: "middle" },
  { id: "audio", label: "Sound Card", x: 424, y: 410, w: 104, h: 135, color: "stroke-emerald-400/30", lx: 476, ly: 424, la: "middle" },
  { id: "wifi", label: "WiFi Adapter", x: 534, y: 410, w: 144, h: 135, color: "stroke-fuchsia-400/30", lx: 606, ly: 424, la: "middle" },
]

const N: NodeDef[] = [
  { id: "cpu", label: "CPU", subtitle: "ALU · CU · Regs", x: 322, y: 30, w: 136, h: 50, color: "fill-purple-500/15 stroke-purple-500/50" },
  { id: "mmu", label: "MMU", subtitle: "Mem Ctrl · PCIe", x: 322, y: 96, w: 136, h: 50, color: "fill-purple-400/15 stroke-purple-400/50" },
  { id: "gpu_ctrl", label: "Controller", x: 48, y: 97, w: 104, h: 48, color: "fill-rose-500/15 stroke-rose-500/50" },
  { id: "gpu_cores", label: "Cores / VRAM", x: 48, y: 160, w: 104, h: 48, color: "fill-rose-400/15 stroke-rose-400/50" },
  { id: "dram", label: "DRAM Modules", x: 623, y: 81, w: 118, h: 80, color: "fill-cyan-500/15 stroke-cyan-500/50" },
  { id: "pch", label: "", x: 370, y: 275, w: 40, h: 10, color: "fill-none stroke-none" },
  { id: "usb_ctrl", label: "USB Ctrl", x: 108, y: 318, w: 88, h: 44, color: "fill-sky-500/15 stroke-sky-500/50" },
  { id: "sata_ctrl", label: "SATA Ctrl", x: 216, y: 318, w: 88, h: 44, color: "fill-orange-500/15 stroke-orange-500/50" },
  { id: "nvme_ctrl", label: "NVMe Ctrl", x: 324, y: 318, w: 88, h: 44, color: "fill-amber-500/15 stroke-amber-500/50" },
  { id: "audio_ctrl", label: "Audio Ctrl", x: 432, y: 318, w: 88, h: 44, color: "fill-emerald-500/15 stroke-emerald-500/50" },
  { id: "net_ctrl", label: "Net Ctrl", x: 542, y: 318, w: 128, h: 44, color: "fill-fuchsia-500/15 stroke-fuchsia-500/50" },
  { id: "usb_dev_ctrl", label: "USB Ctrl", x: 108, y: 435, w: 88, h: 38, color: "fill-sky-400/15 stroke-sky-400/50" },
  { id: "sata_dev_ctrl", label: "Drive Ctrl", x: 216, y: 435, w: 88, h: 38, color: "fill-orange-400/15 stroke-orange-400/50" },
  { id: "nvme_dev_ctrl", label: "SSD Ctrl", x: 324, y: 435, w: 88, h: 38, color: "fill-amber-400/15 stroke-amber-400/50" },
  { id: "audio_dev_ctrl", label: "Codec Ctrl", x: 432, y: 435, w: 88, h: 38, color: "fill-emerald-400/15 stroke-emerald-400/50" },
  { id: "net_dev_ctrl", label: "NIC Ctrl", x: 542, y: 435, w: 128, h: 38, color: "fill-fuchsia-400/15 stroke-fuchsia-400/50" },
  { id: "usb_func", label: "Flash IC", x: 108, y: 487, w: 88, h: 38, color: "fill-sky-300/10 stroke-sky-300/40" },
  { id: "sata_func", label: "NAND / Platters", x: 216, y: 487, w: 88, h: 38, color: "fill-orange-300/10 stroke-orange-300/40" },
  { id: "nvme_func", label: "Flash Array", x: 324, y: 487, w: 88, h: 38, color: "fill-amber-300/10 stroke-amber-300/40" },
  { id: "audio_func", label: "DAC / Amp", x: 432, y: 487, w: 88, h: 38, color: "fill-emerald-300/10 stroke-emerald-300/40" },
  { id: "net_func", label: "Radio / PHY", x: 542, y: 487, w: 128, h: 38, color: "fill-fuchsia-300/10 stroke-fuchsia-300/40" },
]

const E: EdgeDef[] = [
  { from: "cpu", to: "mmu" },
  { from: "mmu", to: "gpu_ctrl", label: "PCIe x16" },
  { from: "gpu_ctrl", to: "gpu_cores" },
  { from: "mmu", to: "dram", label: "Memory Bus" },
  { from: "mmu", to: "pch", label: "DMI 4.0" },
  { from: "pch", to: "usb_ctrl" },
  { from: "pch", to: "sata_ctrl" },
  { from: "pch", to: "nvme_ctrl" },
  { from: "pch", to: "audio_ctrl" },
  { from: "pch", to: "net_ctrl" },
  { from: "usb_ctrl", to: "usb_dev_ctrl" },
  { from: "sata_ctrl", to: "sata_dev_ctrl" },
  { from: "nvme_ctrl", to: "nvme_dev_ctrl" },
  { from: "audio_ctrl", to: "audio_dev_ctrl" },
  { from: "net_ctrl", to: "net_dev_ctrl" },
  { from: "usb_dev_ctrl", to: "usb_func" },
  { from: "sata_dev_ctrl", to: "sata_func" },
  { from: "nvme_dev_ctrl", to: "nvme_func" },
  { from: "audio_dev_ctrl", to: "audio_func" },
  { from: "net_dev_ctrl", to: "net_func" },
]

const nMap = Object.fromEntries(N.map(n => [n.id, n]))
function mx(n: NodeDef) { return n.x + n.w / 2 }
function my(n: NodeDef) { return n.y + n.h / 2 }

const deviceIds = new Set(["usb", "sata", "nvme", "audio", "wifi"])
const deviceInternals: Record<string, string[]> = {
  usb: ["usb_dev_ctrl", "usb_func"], sata: ["sata_dev_ctrl", "sata_func"],
  nvme: ["nvme_dev_ctrl", "nvme_func"], audio: ["audio_dev_ctrl", "audio_func"],
  wifi: ["net_dev_ctrl", "net_func"], gpu: ["gpu_ctrl", "gpu_cores"],
}
const allDevNodeIds = new Set(Object.entries(deviceInternals).filter(([k]) => deviceIds.has(k)).flatMap(([, v]) => v))
const ghostableWrapperIds = new Set([...deviceIds, "gpu", "pch_box"])
const ghostableNodeIds = new Set([
  ...allDevNodeIds, "gpu_ctrl", "gpu_cores",
  "usb_ctrl", "sata_ctrl", "nvme_ctrl", "audio_ctrl", "net_ctrl", "pch",
])

const sataPathIds = new Set(["sata_func", "sata_dev_ctrl", "sata_ctrl", "pch", "mmu", "dram"])
const sataEdges: [string, string][] = [
  ["sata_func", "sata_dev_ctrl"], ["sata_dev_ctrl", "sata_ctrl"],
  ["pch", "sata_ctrl"], ["mmu", "pch"], ["mmu", "dram"],
]
function isOnSataEdge(a: string, b: string) {
  return sataEdges.some(([x, y]) => (a === x && b === y) || (a === y && b === x))
}

// ── Error handling data ──

interface HopDef {
  component: string; subtitle: string
  actions: string[]; border: string; bg: string; text: string
}

const hops: HopDef[] = [
  { component: "NAND / Platters", subtitle: "Functional Hardware",
    actions: ["Retry read", "Head offset retry", "Multi-level ECC", "Remap sector", "Report upward"],
    border: "border-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-500" },
  { component: "Drive Controller", subtitle: "Device Controller",
    actions: ["Retry with ECC", "Remap bad sector", "Adjust timing", "Report upward"],
    border: "border-yellow-500", bg: "bg-yellow-500/10", text: "text-yellow-500" },
  { component: "SATA Ctrl (PCH)", subtitle: "Host Controller",
    actions: ["Reissue command", "Reset SATA link", "Report upward"],
    border: "border-orange-500", bg: "bg-orange-500/10", text: "text-orange-500" },
  { component: "CPU / Driver", subtitle: "Operating System",
    actions: ["Retry I/O request", "Reset device", "Fail to filesystem"],
    border: "border-red-500", bg: "bg-red-500/10", text: "text-red-500" },
]

const lostAtHop: string[][] = [
  [],
  ["Head offset retry", "Multi-level ECC"],
  ["Head offset retry", "Multi-level ECC", "Remap bad sector", "Adjust timing"],
  ["Head offset retry", "Multi-level ECC", "Remap bad sector", "Adjust timing", "Reset SATA link"],
]

// ── Sync/async data ──

interface AsyncStep { label: string; cpuLabel: string; devActive: boolean; terminal: string; phase: string }

const asyncSteps: AsyncStep[] = [
  { label: "CPU issues I/O command to SATA controller", cpuLabel: "Process A", devActive: false, terminal: "> read(fd, buf, 4096)", phase: "issue" },
  { label: "OS suspends process; CPU switches to another", cpuLabel: "Process B", devActive: false, terminal: "  ...blocking...", phase: "suspend" },
  { label: "Device operates independently", cpuLabel: "Process B", devActive: true, terminal: "  ...blocking...", phase: "device" },
  { label: "Device fires interrupt", cpuLabel: "← IRQ", devActive: true, terminal: "  ...blocking...", phase: "interrupt" },
  { label: "OS wakes process; read() returns", cpuLabel: "Process A", devActive: false, terminal: "  4096 bytes received", phase: "resume" },
]

// ── Buffer data ──

const bufferPositions = [
  { x: 308, y: 491, label: "Device", hw: true },
  { x: 308, y: 439, label: "Ctrl", hw: true },
  { x: 308, y: 322, label: "PCH", hw: true },
  { x: 745, y: 95, label: "DMA", hw: true },
  { x: 475, y: 108, label: "Page Cache", hw: false },
  { x: 475, y: 40, label: "User", hw: false },
]

const rateLabels = [
  { text: "~600 MB/s", x: 320, y: 470 },
  { text: "~600 MB/s", x: 320, y: 390 },
  { text: "~4 GB/s", x: 450, y: 240 },
]

// ── Shared devices ──

const shareableWrapperIds = new Set([...deviceIds, "gpu"])

const shareStepData = [
  { shared: [] as string[], dedicated: [] as string[], blocked: ["A", "B", "C"] as string[],
    label: "Three processes request I/O simultaneously" },
  { shared: ["A", "B"], dedicated: ["A"], blocked: ["B", "C"],
    label: "Shared interleaves A & B — Dedicated locks to A" },
  { shared: ["B", "C"], dedicated: ["B"], blocked: ["C"],
    label: "Shared rotates to B & C — Dedicated finishes A, starts B" },
  { shared: ["A", "B", "C"], dedicated: ["C"], blocked: [],
    label: "Shared serves all three — Dedicated finishes B, starts C" },
]

const shareProcs = [
  { id: "A", cx: 75, fill: "fill-blue-500/15", stroke: "stroke-blue-500", text: "fill-blue-500", dot: "fill-blue-500" },
  { id: "B", cx: 150, fill: "fill-emerald-500/15", stroke: "stroke-emerald-500", text: "fill-emerald-500", dot: "fill-emerald-500" },
  { id: "C", cx: 225, fill: "fill-violet-500/15", stroke: "stroke-violet-500", text: "fill-violet-500", dot: "fill-violet-500" },
]

// ── Combined mode data ──

const combinedTabNames = ["Hardware Reality", "OS Boundary", "Application View", "Runtime Behavior"]

const allBufferPositions: { x: number; y: number; hw: boolean; label?: string }[] = [
  { x: 156, y: 101, hw: true }, { x: 156, y: 164, hw: true },
  { x: 200, y: 322, hw: true }, { x: 200, y: 439, hw: true }, { x: 200, y: 491, hw: true },
  { x: 308, y: 322, hw: true }, { x: 308, y: 439, hw: true }, { x: 308, y: 491, hw: true },
  { x: 416, y: 322, hw: true }, { x: 416, y: 439, hw: true }, { x: 416, y: 491, hw: true },
  { x: 524, y: 322, hw: true }, { x: 524, y: 439, hw: true }, { x: 524, y: 491, hw: true },
  { x: 674, y: 322, hw: true }, { x: 674, y: 439, hw: true }, { x: 674, y: 491, hw: true },
  { x: 745, y: 95, hw: true, label: "DMA" },
  { x: 475, y: 108, hw: false, label: "Page Cache" },
  { x: 475, y: 40, hw: false, label: "User" },
]

const rtStepLabels = [
  "Both processes issue read() on /dev/nvme0n1",
  "A\u2019s request enters the OS driver",
  "Request crosses the PCIe root complex",
  "PCH routes to NVMe host controller",
  "SSD controller receives read command",
  "Flash array reads data successfully",
  "Data returns to SSD controller",
  "Data crosses PCH via DMI link",
  "Data reaches memory controller",
  "OS delivers data to Process A \u2014 read() returns",
  "B\u2019s request enters the OS driver",
  "Request crosses the PCIe root complex",
  "PCH routes to NVMe host controller",
  "SSD controller receives read command",
  "Flash array reads data successfully",
  "Data returns to SSD controller",
  "DMI link error \u2014 data corrupted in transit (3 options)",
  "Error propagates \u2014 remediation options shrink (1 option)",
  "OS returns I/O error to Process B \u2014 read() fails",
]
const rtBoxes = [-1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0]
const rtDirs: string[] = [
  "none","down","down","down","down","hit","up","up","up","arrive",
  "down","down","down","down","hit","up","error","error-up","error-done",
]
const rtDotBreaks = new Set([1, 6, 10, 15])
const chainLabels = ["CPU", "MMU", "PCH", "SSD Ctrl", "NAND"]
const chainSubs = ["OS Driver", "Memory Ctrl", "Host Ctrl", "Device Ctrl", "Flash Array"]

// ── Descriptions ──

const desc: Record<Principle, string> = {
  "device-independence": "Device independence is a software layering principle. The purple boundary separates the uniform syscall API from device-specific drivers and hardware. Toggle visibility to see what applications cannot see.",
  "uniform-naming": "Every device maps to a filesystem path — programs use names like /dev/sda without knowing the hardware. Network devices are the exception: they use the socket API instead.",
  "error-handling": "Handle errors as close to the source as possible — that is where the richest set of remediation actions exists. Step through each hop to watch the available physical fixes shrink.",
  "sync-async": "I/O is fundamentally asynchronous at the hardware level — the device operates independently while the CPU runs other work. The OS wraps this in blocking system calls so programmers write sequential code.",
  "buffering": "Buffers at each hop absorb speed differences between adjacent stages. Hardware controllers use on-chip FIFOs; the OS adds software buffers (page cache, user-space) above the abstraction boundary.",
  "shareable-dedicated": "Most I/O devices are shared — they queue or interleave concurrent requests. Truly dedicated devices require the OS to serialize access through spooling or locking.",
  "combined": "Progressive reveal of all six I/O software principles — from raw hardware through OS abstraction and naming to runtime behavior.",
}

// ── Component ──

export function IOPrinciplesDiagram({ principle, className }: { principle: Principle; className?: string }) {
  const [showHW, setShowHW] = useState(true)
  const [errStep, setErrStep] = useState(0)
  const [errPlay, setErrPlay] = useState(false)
  const [aStep, setAStep] = useState(0)
  const [aPlay, setAPlay] = useState(false)
  const [bufPhase, setBufPhase] = useState(0)
  const [bufPlay, setBufPlay] = useState(false)
  const [shareStep, setShareStep] = useState(0)
  const [sharePlay, setSharePlay] = useState(true)
  const [combinedTab, setCombinedTab] = useState(0)
  const [rtStep, setRtStep] = useState(0)
  const [rtPlay, setRtPlay] = useState(false)

  useEffect(() => {
    if (principle !== "error-handling" || !errPlay) return
    const id = setInterval(() => setErrStep(s => (s + 1) % 4), 2000)
    return () => clearInterval(id)
  }, [principle, errPlay])

  useEffect(() => {
    if (principle !== "sync-async" || !aPlay) return
    const id = setInterval(() => setAStep(s => (s + 1) % 5), 1500)
    return () => clearInterval(id)
  }, [principle, aPlay])

  useEffect(() => {
    if (principle !== "buffering" || !bufPlay) return
    const id = setInterval(() => setBufPhase(p => (p + 1) % 6), 800)
    return () => clearInterval(id)
  }, [principle, bufPlay])

  useEffect(() => {
    if (principle !== "shareable-dedicated" || !sharePlay) return
    const id = setInterval(() => setShareStep(s => (s + 1) % 4), 1200)
    return () => clearInterval(id)
  }, [principle, sharePlay])

  useEffect(() => {
    if (principle !== "combined" || !rtPlay) return
    const id = setInterval(() => setRtStep(s => (s + 1) % 19), 2500)
    return () => clearInterval(id)
  }, [principle, rtPlay])

  const p = principle
  const isDevIndep = p === "device-independence"
  const isBuf = p === "buffering"

  // ── Error Handling Mode ──
  if (p === "error-handling") {
    return (
      <div className={cn("w-full my-6", className)}>
        <div className="border rounded-lg bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">ASAP Error Handling</h4>
            <div className="flex gap-1.5 items-center">
              <button onClick={() => setErrStep(s => Math.max(0, s - 1))}
                className="px-2 py-1 rounded-md text-xs font-medium border hover:bg-muted disabled:opacity-30"
                disabled={errStep === 0}>Back</button>
              <button onClick={() => setErrPlay(!errPlay)}
                className={cn("px-2 py-1 rounded-md text-xs font-medium border", errPlay ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
                {errPlay ? "Pause" : "Play"}</button>
              <button onClick={() => setErrStep(s => Math.min(3, s + 1))}
                className="px-2 py-1 rounded-md text-xs font-medium border hover:bg-muted disabled:opacity-30"
                disabled={errStep === 3}>Next</button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{desc["error-handling"]}</p>

          <svg width="100%" viewBox="0 0 680 360" className="max-w-2xl mx-auto">
            {hops.map((hop, i) => {
              const y = 10 + i * 88
              const active = i === errStep
              const past = i < errStep
              const colors = ["stroke-emerald-500", "stroke-yellow-500", "stroke-orange-500", "stroke-red-500"]
              const fills = ["fill-emerald-500/15", "fill-yellow-500/15", "fill-orange-500/15", "fill-red-500/15"]
              const textColors = ["fill-emerald-500", "fill-yellow-500", "fill-orange-500", "fill-red-500"]
              return (
                <g key={i}>
                  {i > 0 && (
                    <line x1={340} y1={y - 6} x2={340} y2={y}
                      className="stroke-border stroke-2" markerEnd="url(#err-arrow)" />
                  )}
                  <rect x={60} y={y} width={560} height={72} rx={8}
                    className={cn("stroke-2 transition-all duration-300",
                      active ? `${fills[i]} ${colors[i]}` :
                      past ? "fill-muted/30 stroke-border/30" :
                      "fill-muted/10 stroke-border/20"
                    )} />
                  <circle cx={90} cy={y + 36} r={14}
                    className={cn("stroke-2 transition-all duration-300",
                      active ? `${fills[i]} ${colors[i]}` : "fill-muted/20 stroke-border/30"
                    )} />
                  <text x={90} y={y + 40} textAnchor="middle"
                    className={cn("font-bold transition-colors", active ? textColors[i] : "fill-muted-foreground/40")}
                    fontSize={12}>{i + 1}</text>
                  <text x={120} y={y + 28}
                    className={cn("font-semibold transition-colors", active ? "fill-foreground" : past ? "fill-muted-foreground/40" : "fill-muted-foreground/60")}
                    fontSize={13}>{hop.component}</text>
                  <text x={120} y={y + 45}
                    className={cn("transition-colors", active ? "fill-muted-foreground" : "fill-muted-foreground/30")}
                    fontSize={9}>{hop.subtitle}</text>
                  <text x={580} y={y + 40} textAnchor="end"
                    className={cn("font-bold transition-colors", active ? textColors[i] : "fill-muted-foreground/30")}
                    fontSize={11}>{hop.actions.length} actions</text>
                </g>
              )
            })}
            <text x={340} y={355} textAnchor="middle" className="fill-muted-foreground/40" fontSize={9}>
              Error information travels upward. The ability to physically fix does not.
            </text>
            <defs>
              <marker id="err-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" className="fill-border" />
              </marker>
            </defs>
          </svg>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className={cn("text-xs font-semibold mb-2", hops[errStep].text)}>
                Available at Hop {errStep + 1} — {hops[errStep].component}
              </p>
              <ul className="space-y-1">
                {hops[errStep].actions.map(a => (
                  <li key={a} className={cn("text-xs px-2 py-1 rounded", hops[errStep].bg, hops[errStep].text)}>{a}</li>
                ))}
              </ul>
            </div>
            {lostAtHop[errStep].length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2 text-muted-foreground">No longer available</p>
                <ul className="space-y-1">
                  {lostAtHop[errStep].map(a => (
                    <li key={a} className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground/50 line-through">{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Sync/Async Mode ──
  if (p === "sync-async") {
    const step = asyncSteps[aStep]
    return (
      <div className={cn("w-full my-6", className)}>
        <div className="border rounded-lg bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Synchronous Appearance, Async Reality</h4>
            <button onClick={() => setAPlay(!aPlay)}
              className={cn("px-3 py-1 rounded-md text-xs font-medium border", aPlay ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
              {aPlay ? "Pause" : "Play"}</button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{desc["sync-async"]}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Hardware Reality</p>
              <svg width="100%" viewBox="0 0 320 260" className="max-w-sm">
                <rect x={90} y={20} width={140} height={50} rx={8}
                  className={cn("stroke-2 transition-all duration-300",
                    step.phase === "issue" || step.phase === "resume" ? "fill-purple-500/20 stroke-purple-500" :
                    step.phase === "interrupt" ? "fill-amber-500/20 stroke-amber-500" :
                    "fill-muted/20 stroke-border"
                  )} />
                <text x={160} y={42} textAnchor="middle" className="fill-foreground font-semibold" fontSize={12}>CPU Core</text>
                <text x={160} y={58} textAnchor="middle"
                  className={cn("font-mono font-semibold", step.phase === "interrupt" ? "fill-amber-500" : "fill-muted-foreground")}
                  fontSize={10}>{step.cpuLabel}</text>

                <line x1={160} y1={70} x2={160} y2={180}
                  className={cn("stroke-2 transition-all duration-300",
                    step.phase === "issue" ? "stroke-purple-500" :
                    step.phase === "interrupt" ? "stroke-amber-500" :
                    "stroke-border/40"
                  )} />
                <text x={175} y={130} className="fill-muted-foreground/40" fontSize={8}>I/O Bus</text>
                {step.phase === "interrupt" && (
                  <polygon points="156,95 160,85 164,95" className="fill-amber-500" />
                )}
                {step.phase === "issue" && (
                  <polygon points="156,155 160,165 164,155" className="fill-purple-500" />
                )}

                <rect x={90} y={180} width={140} height={50} rx={8}
                  className={cn("stroke-2 transition-all duration-300",
                    step.devActive ? "fill-blue-500/20 stroke-blue-500" : "fill-muted/20 stroke-border"
                  )} />
                <text x={160} y={202} textAnchor="middle" className="fill-foreground font-semibold" fontSize={12}>SATA Device</text>
                <text x={160} y={218} textAnchor="middle"
                  className={cn("font-semibold", step.devActive ? "fill-blue-500" : "fill-muted-foreground/50")}
                  fontSize={10}>{step.devActive ? "Operating..." : "Idle"}</text>

                {asyncSteps.map((_, i) => (
                  <circle key={i} cx={30 + i * 16} cy={250} r={6}
                    className={cn("stroke-[1.5] transition-all duration-300",
                      i === aStep ? "fill-primary stroke-primary" :
                      i < aStep ? "fill-primary/30 stroke-primary/30" :
                      "fill-muted/20 stroke-border/40"
                    )} />
                ))}
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Program View</p>
              <div className="font-mono text-xs bg-zinc-950 text-zinc-400 rounded-lg p-3 min-h-[160px]">
                {asyncSteps.slice(0, aStep + 1).map((s, i) => (
                  <div key={i} className={cn("leading-relaxed", i === aStep ? "text-zinc-100" : "text-zinc-600")}>
                    {s.terminal}
                  </div>
                ))}
                {aStep === 4 && <div className="text-zinc-600 mt-1">&gt; // next line of code</div>}
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">{step.label}</p>
            </div>
          </div>
          <p className="text-xs text-center text-blue-400/60 mt-3 font-medium">
            I/O is asynchronous. The OS makes it look synchronous.
          </p>
        </div>
      </div>
    )
  }

  // ── Uniform Naming Mode ──
  if (p === "uniform-naming") {
    return (
      <div className={cn("w-full my-6", className)}>
        <div className="border rounded-lg bg-card p-4">
          <h4 className="text-sm font-semibold mb-1">Uniform Naming</h4>
          <p className="text-xs text-muted-foreground mb-3">{desc["uniform-naming"]}</p>

          <svg width="100%" viewBox="0 0 780 560" className="max-w-3xl mx-auto">
            {/* ── L-shaped Abstraction Boundary ── */}
            <polyline points="180,10 180,238 760,238" fill="none"
              className="stroke-purple-500/40 stroke-[2]" strokeDasharray="8 4" />

            {/* ── Upper Right: SoC + RAM (compact) ── */}
            <rect x={290} y={35} width={160} height={90} rx={8}
              className="fill-none stroke-purple-400/40 stroke-[1.5]" strokeDasharray="4 3" />
            <text x={370} y={88} textAnchor="middle"
              className="fill-muted-foreground/60 font-semibold" fontSize={11}>SoC (CPU + MMU)</text>

            <rect x={530} y={35} width={145} height={90} rx={8}
              className="fill-none stroke-cyan-400/40 stroke-[1.5]" strokeDasharray="4 3" />
            <text x={602} y={88} textAnchor="middle"
              className="fill-muted-foreground/60 font-semibold" fontSize={11}>RAM</text>

            <text x={465} y={155} textAnchor="middle"
              className="fill-muted-foreground/40 font-semibold" fontSize={9}>
              Direct application access</text>
            <text x={465} y={170} textAnchor="middle"
              className="fill-muted-foreground/30" fontSize={8}>
              No device file needed</text>

            {/* ── Upper Left: I/O context label ── */}
            <text x={90} y={115} textAnchor="middle"
              className="fill-emerald-500/30 font-semibold" fontSize={10}>I/O Devices</text>
            <text x={90} y={131} textAnchor="middle"
              className="fill-emerald-500/20" fontSize={8}>Accessed via /dev/</text>

            {/* ── Column Headers ── */}
            <text x={65} y={256} className="fill-muted-foreground/40 font-semibold" fontSize={9}>
              FILESYSTEM PATH</text>
            <text x={480} y={256} className="fill-muted-foreground/40 font-semibold" fontSize={9}>
              HARDWARE</text>

            {/* ── /dev Root ── */}
            <text x={60} y={282} className="fill-emerald-500 font-bold font-mono" fontSize={15}>/dev</text>

            {/* ── Tree trunk (vertical) ── */}
            <line x1={72} y1={288} x2={72} y2={442} className="stroke-emerald-500/25 stroke-[1.5]" />

            {/* ── Branch: dri/card0 → GPU ── */}
            <line x1={72} y1={302} x2={92} y2={302} className="stroke-emerald-500/25 stroke-[1.5]" />
            <text x={96} y={306} className="fill-muted-foreground/40 font-mono" fontSize={12}>dri/</text>
            <line x1={100} y1={310} x2={100} y2={324} className="stroke-emerald-500/15 stroke-[1.5]" />
            <line x1={100} y1={324} x2={118} y2={324} className="stroke-emerald-500/15 stroke-[1.5]" />
            <text x={122} y={328} className="fill-rose-500 font-mono font-bold" fontSize={12}>card0</text>
            <line x1={220} y1={324} x2={475} y2={324}
              className="stroke-rose-400/30 stroke-[1.5]" strokeDasharray="4 3" />
            <rect x={480} y={312} width={180} height={24} rx={6}
              className="fill-rose-500/10 stroke-rose-400/40 stroke-[1.5]" />
            <circle cx={496} cy={324} r={4} className="fill-rose-500" />
            <text x={508} y={328} className="fill-rose-500 font-semibold" fontSize={11}>GPU</text>

            {/* ── Branch: nvme0n1 → NVMe SSD ── */}
            <line x1={72} y1={354} x2={92} y2={354} className="stroke-emerald-500/25 stroke-[1.5]" />
            <text x={96} y={358} className="fill-amber-500 font-mono font-bold" fontSize={12}>nvme0n1</text>
            <line x1={220} y1={354} x2={475} y2={354}
              className="stroke-amber-400/30 stroke-[1.5]" strokeDasharray="4 3" />
            <rect x={480} y={342} width={180} height={24} rx={6}
              className="fill-amber-500/10 stroke-amber-400/40 stroke-[1.5]" />
            <circle cx={496} cy={354} r={4} className="fill-amber-500" />
            <text x={508} y={358} className="fill-amber-500 font-semibold" fontSize={11}>NVMe SSD</text>

            {/* ── Branch: sda → SATA SSD ── */}
            <line x1={72} y1={384} x2={92} y2={384} className="stroke-emerald-500/25 stroke-[1.5]" />
            <text x={96} y={388} className="fill-orange-500 font-mono font-bold" fontSize={12}>sda</text>
            <line x1={220} y1={384} x2={475} y2={384}
              className="stroke-orange-400/30 stroke-[1.5]" strokeDasharray="4 3" />
            <rect x={480} y={372} width={180} height={24} rx={6}
              className="fill-orange-500/10 stroke-orange-400/40 stroke-[1.5]" />
            <circle cx={496} cy={384} r={4} className="fill-orange-500" />
            <text x={508} y={388} className="fill-orange-500 font-semibold" fontSize={11}>SATA SSD</text>

            {/* ── Branch: sdb → USB Flash Drive ── */}
            <line x1={72} y1={414} x2={92} y2={414} className="stroke-emerald-500/25 stroke-[1.5]" />
            <text x={96} y={418} className="fill-sky-500 font-mono font-bold" fontSize={12}>sdb</text>
            <line x1={220} y1={414} x2={475} y2={414}
              className="stroke-sky-400/30 stroke-[1.5]" strokeDasharray="4 3" />
            <rect x={480} y={402} width={180} height={24} rx={6}
              className="fill-sky-500/10 stroke-sky-400/40 stroke-[1.5]" />
            <circle cx={496} cy={414} r={4} className="fill-sky-500" />
            <text x={508} y={418} className="fill-sky-500 font-semibold" fontSize={11}>USB Flash Drive</text>

            {/* ── Branch: snd/pcmC0D0p → Sound Card ── */}
            <line x1={72} y1={442} x2={92} y2={442} className="stroke-emerald-500/25 stroke-[1.5]" />
            <text x={96} y={446} className="fill-muted-foreground/40 font-mono" fontSize={12}>snd/</text>
            <line x1={100} y1={450} x2={100} y2={466} className="stroke-emerald-500/15 stroke-[1.5]" />
            <line x1={100} y1={466} x2={118} y2={466} className="stroke-emerald-500/15 stroke-[1.5]" />
            <text x={122} y={470} className="fill-emerald-500 font-mono font-bold" fontSize={12}>pcmC0D0p</text>
            <line x1={220} y1={466} x2={475} y2={466}
              className="stroke-emerald-400/30 stroke-[1.5]" strokeDasharray="4 3" />
            <rect x={480} y={454} width={180} height={24} rx={6}
              className="fill-emerald-500/10 stroke-emerald-400/40 stroke-[1.5]" />
            <circle cx={496} cy={466} r={4} className="fill-emerald-500" />
            <text x={508} y={470} className="fill-emerald-500 font-semibold" fontSize={11}>Sound Card</text>

            {/* ── Network Exception ── */}
            <line x1={60} y1={494} x2={660} y2={494} className="stroke-border/20 stroke-1" />
            <text x={65} y={514} className="fill-orange-400 font-bold" fontSize={10}>⚠ Network Exception</text>
            <text x={96} y={534} className="fill-fuchsia-500 font-mono font-bold" fontSize={12}>
              socket(AF_INET, ...)</text>
            <line x1={260} y1={530} x2={475} y2={530}
              className="stroke-fuchsia-400/30 stroke-[1.5]" strokeDasharray="4 3" />
            <rect x={480} y={518} width={180} height={24} rx={6}
              className="fill-fuchsia-500/10 stroke-fuchsia-400/40 stroke-[1.5]" />
            <circle cx={496} cy={530} r={4} className="fill-fuchsia-500" />
            <text x={508} y={534} className="fill-fuchsia-500 font-semibold" fontSize={11}>WiFi Adapter</text>

            {/* ── Footer ── */}
            <text x={390} y={555} textAnchor="middle" className="fill-emerald-400/50" fontSize={8}>
              Programs address devices by name, not by hardware address.</text>
          </svg>
        </div>
      </div>
    )
  }

  // ── Shareable vs. Dedicated Mode ──
  if (p === "shareable-dedicated") {
    const step = shareStepData[shareStep]

    function renderPanel(active: string[], type: "shared" | "dedicated") {
      const deviceName = type === "shared" ? "NVMe SSD" : "Printer"
      const barrierY = 88
      const deviceY = 135
      const blocked = type === "dedicated" ? step.blocked : [] as string[]

      return (
        <svg width="100%" viewBox="0 0 300 200" className="max-w-xs mx-auto">
          {shareProcs.map(proc => {
            const isActive = active.includes(proc.id)
            const isBlocked = blocked.includes(proc.id)
            const isDone = type === "dedicated" && !isActive && !isBlocked && active.length > 0
            const arrowEndY = isBlocked ? barrierY - 6 : deviceY
            const isQueued = type === "shared" && !isActive && active.length > 0

            return (
              <g key={proc.id}>
                <circle cx={proc.cx} cy={25} r={14}
                  className={cn("stroke-2 transition-all duration-300",
                    isActive ? `${proc.fill} ${proc.stroke}` :
                    isDone ? "fill-muted/10 stroke-border/20" :
                    isQueued ? `${proc.fill} ${proc.stroke}` :
                    "fill-muted/20 stroke-border/40"
                  )} style={{ opacity: isDone ? 0.3 : 1 }} />
                <text x={proc.cx} y={30} textAnchor="middle"
                  className={cn("font-bold transition-colors",
                    isActive ? proc.text :
                    isDone ? "fill-muted-foreground/15" :
                    isQueued ? proc.text :
                    "fill-muted-foreground/30"
                  )} fontSize={12}>{proc.id}</text>

                {!isDone && (
                  <line x1={proc.cx} y1={39} x2={proc.cx} y2={arrowEndY}
                    className={cn("stroke-[1.5] transition-all duration-300",
                      isActive ? proc.stroke :
                      isQueued ? `${proc.stroke} opacity-40` :
                      "stroke-muted-foreground/15"
                    )} strokeDasharray={isActive ? undefined : "4 3"} />
                )}

                {isActive && (
                  <polygon
                    points={`${proc.cx - 4},${deviceY - 5} ${proc.cx},${deviceY + 2} ${proc.cx + 4},${deviceY - 5}`}
                    className={cn(proc.dot, "transition-all duration-300")} />
                )}

                {isBlocked && (
                  <g className="transition-all duration-300">
                    <line x1={proc.cx - 5} y1={barrierY - 8} x2={proc.cx + 5} y2={barrierY + 2}
                      className="stroke-red-400/50 stroke-[1.5]" />
                    <line x1={proc.cx + 5} y1={barrierY - 8} x2={proc.cx - 5} y2={barrierY + 2}
                      className="stroke-red-400/50 stroke-[1.5]" />
                  </g>
                )}
              </g>
            )
          })}

          {type === "dedicated" && (
            <>
              <line x1={40} y1={barrierY} x2={260} y2={barrierY}
                className="stroke-red-400/30 stroke-[1.5]" strokeDasharray="6 3" />
              <text x={268} y={92}
                className="fill-red-400/40 font-bold" fontSize={8}>LOCK</text>
            </>
          )}

          <rect x={45} y={deviceY} width={210} height={50} rx={8}
            className={cn("stroke-2 transition-all duration-300",
              active.length > 0 ? "fill-amber-500/15 stroke-amber-500" : "fill-muted/20 stroke-border"
            )} />
          <text x={150} y={deviceY + 22} textAnchor="middle"
            className="fill-foreground font-semibold" fontSize={12}>{deviceName}</text>
          <text x={150} y={deviceY + 38} textAnchor="middle"
            className={cn("font-semibold transition-colors",
              active.length > 0 ? "fill-amber-500" : "fill-muted-foreground/40"
            )} fontSize={9}>
            {active.length === 0 ? "Idle" :
              type === "shared" ? `Serving ${active.join(", ")} (interleaved)` :
              `Locked to ${active[0]}`}
          </text>
        </svg>
      )
    }

    return (
      <div className={cn("w-full my-6", className)}>
        <div className="border rounded-lg bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Shareable vs. Dedicated</h4>
            <button onClick={() => setSharePlay(!sharePlay)}
              className={cn("px-3 py-1 rounded-md text-xs font-medium border",
                sharePlay ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
              {sharePlay ? "Pause" : "Play"}</button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{desc["shareable-dedicated"]}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-amber-500 mb-2">Shared Device</p>
              {renderPanel(step.shared, "shared")}
              <div className="flex flex-wrap gap-1.5 mt-2 justify-center">
                {["SSD", "GPU", "Sound Card", "NIC"].map(d => (
                  <span key={d} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">{d}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 mb-2">Dedicated Device</p>
              {renderPanel(step.dedicated, "dedicated")}
              <div className="flex flex-wrap gap-1.5 mt-2 justify-center">
                {["Printer", "Scanner", "Burner", "Tape Drive"].map(d => (
                  <span key={d} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">{d}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {shareStepData.map((_, i) => (
              <div key={i} className={cn("w-2.5 h-2.5 rounded-full transition-all",
                i === shareStep ? "bg-amber-500" :
                i < shareStep ? "bg-amber-500/30" :
                "bg-muted"
              )} />
            ))}
          </div>
          <p className="text-xs text-center text-amber-400/60 mt-2 italic">{step.label}</p>
        </div>
      </div>
    )
  }

  // ── Combined Mode (Progressive Tabs) ──
  if (p === "combined") {
    const rs = rtStep
    const cX = 400, cW = 140, cH = 30
    const cYs = [18, 60, 102, 144, 186]

    const procA = rs === 0 ? "req" : rs <= 8 ? "active" : "done"
    const procB = rs === 0 ? "req" : rs <= 9 ? "queued" : rs <= 15 ? "active" : rs <= 17 ? "error" : "error-done"
    const activeBox = rtBoxes[rs]
    const dir = rtDirs[rs]
    const devStatus = rs === 0 ? "Idle" : rs <= 5 ? "Serving A" : rs <= 9 ? "A done \u00b7 B next" : rs <= 15 ? "Serving B" : "Error on B"

    function cBoxClass(idx: number) {
      if (idx !== activeBox || dir === "none") return "fill-muted/20 stroke-border"
      if (dir === "down") return "fill-blue-500/15 stroke-blue-500"
      if (dir === "hit" || dir === "up" || dir === "arrive") return "fill-emerald-500/15 stroke-emerald-500"
      return "fill-red-500/15 stroke-red-500"
    }

    function errorBadges() {
      const b: { box: number; count: number; faded: boolean }[] = []
      if (rs >= 16) b.push({ box: 2, count: 3, faded: rs > 16 })
      if (rs >= 17) b.push({ box: 1, count: 1, faded: rs > 17 })
      if (rs >= 18) b.push({ box: 0, count: 1, faded: false })
      return b
    }

    function pchBase(mode: "full" | "ghost" | "hide") {
      const g = mode !== "full"
      return (
        <>
          {W.map(w => {
            const gh = ghostableWrapperIds.has(w.id)
            if (mode === "hide" && gh) return null
            return (
              <rect key={`wr-${w.id}`} x={w.x} y={w.y} width={w.w} height={w.h} rx={8}
                className={cn("fill-none stroke-[1.5] stroke-dashed", w.color)}
                strokeDasharray="4 3" style={{ opacity: g && gh ? 0.1 : 1 }} />
            )
          })}
          {E.map((e, i) => {
            const f = nMap[e.from], t = nMap[e.to]
            if (!f || !t) return null
            const gh = ghostableNodeIds.has(e.from) || ghostableNodeIds.has(e.to)
            if (mode === "hide" && gh) return null
            return (
              <line key={`ed-${i}`} x1={mx(f)} y1={my(f)} x2={mx(t)} y2={my(t)}
                className="stroke-border stroke-2" style={{ opacity: g && gh ? 0.1 : 1 }} />
            )
          })}
          {N.filter(n => n.label).map(n => {
            const gh = ghostableNodeIds.has(n.id)
            if (mode === "hide" && gh) return null
            return (
              <rect key={`nr-${n.id}`} x={n.x} y={n.y} width={n.w} height={n.h} rx={6}
                className={cn("stroke-2", n.color)} style={{ opacity: g && gh ? 0.1 : 1 }} />
            )
          })}
          {W.map(w => {
            const gh = ghostableWrapperIds.has(w.id)
            if (mode === "hide" && gh) return null
            return (
              <text key={`wl-${w.id}`} x={w.lx} y={w.ly}
                textAnchor={(w.la || "start") as "start" | "middle" | "end"}
                className="fill-muted-foreground/60 font-semibold" fontSize={10}
                style={{ opacity: g && gh ? 0.1 : 1 }}>{w.label}</text>
            )
          })}
          {E.filter(e => e.label).map((e, i) => {
            const f = nMap[e.from], t = nMap[e.to]
            if (!f || !t) return null
            const gh = ghostableNodeIds.has(e.from) || ghostableNodeIds.has(e.to)
            if (mode === "hide" && gh) return null
            return (
              <text key={`el-${i}`} x={(mx(f) + mx(t)) / 2 + 8} y={(my(f) + my(t)) / 2 - 6}
                className="fill-muted-foreground/60 font-medium" fontSize={8}
                style={{ opacity: g && gh ? 0.1 : 1 }}>{e.label}</text>
            )
          })}
          {N.filter(n => n.label).map(n => {
            const gh = ghostableNodeIds.has(n.id)
            if (mode === "hide" && gh) return null
            return (
              <g key={`nl-${n.id}`} style={{ opacity: g && gh ? 0.1 : 1 }}>
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 + (n.subtitle ? -1 : 4)}
                  textAnchor="middle" className="fill-muted-foreground font-semibold"
                  fontSize={n.label.length > 12 ? 9 : 11}>{n.label}</text>
                {n.subtitle && (
                  <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 12}
                    textAnchor="middle" className="fill-muted-foreground/60" fontSize={7}>{n.subtitle}</text>
                )}
              </g>
            )
          })}
        </>
      )
    }

    function renderBuffers(mode: "all" | "ghost-hw" | "sw-only") {
      return allBufferPositions.map((bp, i) => {
        if (mode === "sw-only" && bp.hw) return null
        return (
          <g key={`cb-${i}`} style={{ opacity: mode === "ghost-hw" && bp.hw ? 0.1 : 1 }}>
            <rect x={bp.x} y={bp.y} width={8} height={28} rx={2}
              className="fill-none stroke-cyan-500/50 stroke-1" />
            <rect x={bp.x + 1} y={bp.y + 10} width={6} height={17} rx={1}
              className="fill-cyan-500/30" />
            {bp.label && (
              <text x={bp.x + 12} y={bp.y + 18}
                className="fill-cyan-500/50 font-semibold" fontSize={6}>{bp.label}</text>
            )}
          </g>
        )
      })
    }

    return (
      <div className={cn("w-full my-6", className)}>
        <div className="border rounded-lg bg-card p-4">
          <h4 className="text-sm font-semibold mb-3">All Principles Combined</h4>

          <div className="flex gap-1 mb-4 flex-wrap">
            {combinedTabNames.map((name, i) => (
              <button key={i} onClick={() => setCombinedTab(i)}
                className={cn("px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                  combinedTab === i ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}>{name}</button>
            ))}
          </div>

          {/* ── Tab 1: Hardware Reality ── */}
          {combinedTab === 0 && (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                The full hardware architecture — buffers at every hop and sharing properties at each device.</p>
              <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto">
                {pchBase("full")}
                {renderBuffers("all")}
                {W.filter(wd => shareableWrapperIds.has(wd.id)).map(wd => (
                  <text key={`sb-${wd.id}`} x={wd.lx} y={wd.y + wd.h + 12}
                    textAnchor={(wd.la || "start") as "start" | "middle" | "end"}
                    className="fill-amber-500/50 font-bold" fontSize={7}>Shared</text>
                ))}
                {rateLabels.map((rl, i) => (
                  <text key={`rl-${i}`} x={rl.x} y={rl.y}
                    className="fill-cyan-400/30 font-mono" fontSize={7}>{rl.text}</text>
                ))}
              </svg>
            </>
          )}

          {/* ── Tab 2: OS Boundary ── */}
          {combinedTab === 1 && (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                The OS draws an abstraction boundary — applications see system calls, not hardware.</p>
              <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto">
                {pchBase("ghost")}
                {renderBuffers("ghost-hw")}
                <polyline points={`180,10 180,248 ${VW - 20},248`} fill="none"
                  className="stroke-purple-500 stroke-[2.5]" strokeDasharray="8 4" />
                <text x={480} y={242} textAnchor="middle" className="fill-purple-500 font-bold" fontSize={9}>
                  ABSTRACTION BOUNDARY</text>
                <text x={VW - 10} y={266} textAnchor="end" className="fill-teal-400/50 font-semibold" fontSize={8}>
                  DEVICE DRIVERS</text>
                <text x={VW - 10} y={406} textAnchor="end" className="fill-muted-foreground/30 font-semibold" fontSize={8}>
                  HARDWARE</text>
              </svg>
            </>
          )}

          {/* ── Tab 3: Application View ── */}
          {combinedTab === 2 && (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                Programs address devices by filesystem path — the hardware is invisible.</p>
              <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto">
                {pchBase("hide")}
                {renderBuffers("sw-only")}
                <polyline points={`180,10 180,248 ${VW - 20},248`} fill="none"
                  className="stroke-purple-500/40 stroke-[2]" strokeDasharray="8 4" />
                <text x={90} y={125} textAnchor="middle"
                  className="fill-emerald-500/30 font-semibold" fontSize={10}>I/O Devices</text>
                <text x={90} y={141} textAnchor="middle"
                  className="fill-emerald-500/20" fontSize={8}>Accessed via /dev/</text>
                <text x={65} y={268} className="fill-muted-foreground/40 font-semibold" fontSize={9}>FILESYSTEM PATH</text>
                <text x={480} y={268} className="fill-muted-foreground/40 font-semibold" fontSize={9}>HARDWARE</text>
                <text x={60} y={296} className="fill-emerald-500 font-bold font-mono" fontSize={15}>/dev</text>
                <line x1={72} y1={302} x2={72} y2={456} className="stroke-emerald-500/25 stroke-[1.5]" />
                <line x1={72} y1={316} x2={92} y2={316} className="stroke-emerald-500/25 stroke-[1.5]" />
                <text x={96} y={320} className="fill-muted-foreground/40 font-mono" fontSize={12}>dri/</text>
                <line x1={100} y1={324} x2={100} y2={338} className="stroke-emerald-500/15 stroke-[1.5]" />
                <line x1={100} y1={338} x2={118} y2={338} className="stroke-emerald-500/15 stroke-[1.5]" />
                <text x={122} y={342} className="fill-rose-500 font-mono font-bold" fontSize={12}>card0</text>
                <line x1={220} y1={338} x2={475} y2={338} className="stroke-rose-400/30 stroke-[1.5]" strokeDasharray="4 3" />
                <rect x={480} y={326} width={180} height={24} rx={6} className="fill-rose-500/10 stroke-rose-400/40 stroke-[1.5]" />
                <circle cx={496} cy={338} r={4} className="fill-rose-500" />
                <text x={508} y={342} className="fill-rose-500 font-semibold" fontSize={11}>GPU</text>
                <line x1={72} y1={368} x2={92} y2={368} className="stroke-emerald-500/25 stroke-[1.5]" />
                <text x={96} y={372} className="fill-amber-500 font-mono font-bold" fontSize={12}>nvme0n1</text>
                <line x1={220} y1={368} x2={475} y2={368} className="stroke-amber-400/30 stroke-[1.5]" strokeDasharray="4 3" />
                <rect x={480} y={356} width={180} height={24} rx={6} className="fill-amber-500/10 stroke-amber-400/40 stroke-[1.5]" />
                <circle cx={496} cy={368} r={4} className="fill-amber-500" />
                <text x={508} y={372} className="fill-amber-500 font-semibold" fontSize={11}>NVMe SSD</text>
                <line x1={72} y1={398} x2={92} y2={398} className="stroke-emerald-500/25 stroke-[1.5]" />
                <text x={96} y={402} className="fill-orange-500 font-mono font-bold" fontSize={12}>sda</text>
                <line x1={220} y1={398} x2={475} y2={398} className="stroke-orange-400/30 stroke-[1.5]" strokeDasharray="4 3" />
                <rect x={480} y={386} width={180} height={24} rx={6} className="fill-orange-500/10 stroke-orange-400/40 stroke-[1.5]" />
                <circle cx={496} cy={398} r={4} className="fill-orange-500" />
                <text x={508} y={402} className="fill-orange-500 font-semibold" fontSize={11}>SATA SSD</text>
                <line x1={72} y1={428} x2={92} y2={428} className="stroke-emerald-500/25 stroke-[1.5]" />
                <text x={96} y={432} className="fill-sky-500 font-mono font-bold" fontSize={12}>sdb</text>
                <line x1={220} y1={428} x2={475} y2={428} className="stroke-sky-400/30 stroke-[1.5]" strokeDasharray="4 3" />
                <rect x={480} y={416} width={180} height={24} rx={6} className="fill-sky-500/10 stroke-sky-400/40 stroke-[1.5]" />
                <circle cx={496} cy={428} r={4} className="fill-sky-500" />
                <text x={508} y={432} className="fill-sky-500 font-semibold" fontSize={11}>USB Flash Drive</text>
                <line x1={72} y1={456} x2={92} y2={456} className="stroke-emerald-500/25 stroke-[1.5]" />
                <text x={96} y={460} className="fill-muted-foreground/40 font-mono" fontSize={12}>snd/</text>
                <line x1={100} y1={464} x2={100} y2={478} className="stroke-emerald-500/15 stroke-[1.5]" />
                <line x1={100} y1={478} x2={118} y2={478} className="stroke-emerald-500/15 stroke-[1.5]" />
                <text x={122} y={482} className="fill-emerald-500 font-mono font-bold" fontSize={12}>pcmC0D0p</text>
                <line x1={220} y1={478} x2={475} y2={478} className="stroke-emerald-400/30 stroke-[1.5]" strokeDasharray="4 3" />
                <rect x={480} y={466} width={180} height={24} rx={6} className="fill-emerald-500/10 stroke-emerald-400/40 stroke-[1.5]" />
                <circle cx={496} cy={478} r={4} className="fill-emerald-500" />
                <text x={508} y={482} className="fill-emerald-500 font-semibold" fontSize={11}>Sound Card</text>
                <line x1={60} y1={508} x2={400} y2={508} className="stroke-border/20 stroke-1" />
                <text x={65} y={528} className="fill-orange-400 font-bold" fontSize={10}>{"\u26A0"} Network Exception</text>
                <text x={96} y={548} className="fill-fuchsia-500 font-mono font-bold" fontSize={12}>socket(AF_INET, ...)</text>
                <line x1={260} y1={544} x2={475} y2={544} className="stroke-fuchsia-400/30 stroke-[1.5]" strokeDasharray="4 3" />
                <rect x={480} y={532} width={180} height={24} rx={6} className="fill-fuchsia-500/10 stroke-fuchsia-400/40 stroke-[1.5]" />
                <circle cx={496} cy={544} r={4} className="fill-fuchsia-500" />
                <text x={508} y={548} className="fill-fuchsia-500 font-semibold" fontSize={11}>WiFi Adapter</text>
              </svg>
            </>
          )}

          {/* ── Tab 4: Runtime Behavior ── */}
          {combinedTab === 3 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground">Two interleaved reads — one succeeds, one encounters a transmission error.</p>
                <div className="flex gap-1.5 items-center">
                  <button onClick={() => setRtStep(s => Math.max(0, s - 1))}
                    className="px-2 py-1 rounded-md text-xs font-medium border hover:bg-muted disabled:opacity-30"
                    disabled={rs === 0}>Back</button>
                  <button onClick={() => setRtPlay(!rtPlay)}
                    className={cn("px-2 py-1 rounded-md text-xs font-medium border",
                      rtPlay ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
                    {rtPlay ? "Pause" : "Play"}</button>
                  <button onClick={() => setRtStep(s => Math.min(18, s + 1))}
                    className="px-2 py-1 rounded-md text-xs font-medium border hover:bg-muted disabled:opacity-30"
                    disabled={rs === 18}>Next</button>
                </div>
              </div>

              <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto">
                {/* L-boundary */}
                <polyline points={`180,10 180,248 ${VW - 20},248`} fill="none"
                  className="stroke-purple-500/30 stroke-[2]" strokeDasharray="8 4" />

                {/* ── Upper-left: Device paths ── */}
                <text x={90} y={25} textAnchor="middle"
                  className="fill-muted-foreground/40 font-semibold" fontSize={8}>DEVICE PATHS</text>
                {[
                  { path: "/dev/nvme0n1", color: "fill-amber-500", active: true },
                  { path: "/dev/sda", color: "fill-orange-500/40" },
                  { path: "/dev/sdb", color: "fill-sky-500/40" },
                  { path: "/dev/dri/card0", color: "fill-rose-500/40" },
                  { path: "/dev/snd/pcmC0D0p", color: "fill-emerald-500/40" },
                  { path: "socket(AF_INET,...)", color: "fill-fuchsia-500/40" },
                ].map((dp, i) => (
                  <text key={i} x={20} y={50 + i * 28}
                    className={cn("font-mono", "active" in dp && dp.active ? cn(dp.color, "font-bold") : dp.color)}
                    fontSize={"active" in dp && dp.active ? 10 : 9}>
                    {"active" in dp && dp.active ? "\u25B6 " : "  "}{dp.path}
                  </text>
                ))}

                {/* ── Upper-right: Hardware chain ── */}
                <text x={cX + cW / 2} y={10} textAnchor="middle"
                  className="fill-muted-foreground/40 font-semibold" fontSize={8}>HARDWARE CHAIN</text>
                {cYs.map((y, i) => (
                  <g key={i}>
                    <rect x={cX} y={y} width={cW} height={cH} rx={6}
                      className={cn("stroke-2 transition-all duration-300", cBoxClass(i))} />
                    <text x={cX + cW / 2} y={y + 13} textAnchor="middle"
                      className="fill-foreground font-semibold" fontSize={9}>{chainLabels[i]}</text>
                    <text x={cX + cW / 2} y={y + 25} textAnchor="middle"
                      className="fill-muted-foreground/50" fontSize={7}>{chainSubs[i]}</text>
                    {i < 4 && (
                      <line x1={cX + cW / 2} y1={y + cH + 2} x2={cX + cW / 2} y2={cYs[i + 1] - 2}
                        className="stroke-border/30 stroke-[1.5]" />
                    )}
                  </g>
                ))}
                {dir === "down" && activeBox >= 0 && activeBox < 4 && (
                  <polygon points={`${cX + cW / 2 - 4},${cYs[activeBox] + cH + 8} ${cX + cW / 2},${cYs[activeBox] + cH + 14} ${cX + cW / 2 + 4},${cYs[activeBox] + cH + 8}`}
                    className="fill-blue-500/60" />
                )}
                {(dir === "up" || dir === "arrive") && activeBox > 0 && (
                  <polygon points={`${cX + cW / 2 - 4},${cYs[activeBox] - 8} ${cX + cW / 2},${cYs[activeBox] - 14} ${cX + cW / 2 + 4},${cYs[activeBox] - 8}`}
                    className="fill-emerald-500/60" />
                )}
                {(dir === "error-up" || dir === "error-done") && activeBox >= 0 && activeBox < 4 && (
                  <polygon points={`${cX + cW / 2 - 4},${cYs[activeBox] - 8} ${cX + cW / 2},${cYs[activeBox] - 14} ${cX + cW / 2 + 4},${cYs[activeBox] - 8}`}
                    className="fill-red-500/60" />
                )}
                {errorBadges().map(({ box, count, faded }) => (
                  <g key={`eb-${box}`} style={{ opacity: faded ? 0.3 : 1 }}>
                    <circle cx={cX + cW + 14} cy={cYs[box] + cH / 2} r={9}
                      className="fill-red-500/15 stroke-red-500/40 stroke-1" />
                    <text x={cX + cW + 14} y={cYs[box] + cH / 2 + 3} textAnchor="middle"
                      className="fill-red-500 font-bold" fontSize={8}>{count}</text>
                  </g>
                ))}

                {/* ── Lower-left: Shared device ── */}
                <text x={200} y={268} textAnchor="middle"
                  className="fill-muted-foreground/40 font-semibold" fontSize={8}>SHARED DEVICE</text>
                {/* Process A */}
                <circle cx={120} cy={310} r={15}
                  className={cn("stroke-2 transition-all duration-300",
                    procA === "done" ? "fill-muted/10 stroke-border/20" : "fill-blue-500/15 stroke-blue-500"
                  )} style={{ opacity: procA === "done" ? 0.3 : 1 }} />
                <text x={120} y={315} textAnchor="middle"
                  className={cn("font-bold", procA === "done" ? "fill-muted-foreground/15" : "fill-blue-500")}
                  fontSize={12}>A</text>
                {procA !== "done" && (
                  <line x1={120} y1={325} x2={120} y2={435}
                    className={cn("stroke-[1.5]", procA === "active" ? "stroke-blue-500" : "stroke-blue-500/30")}
                    strokeDasharray={procA === "active" ? undefined : "4 3"} />
                )}
                {procA === "active" && (
                  <polygon points="116,430 120,437 124,430" className="fill-blue-500" />
                )}
                {/* Process B */}
                <circle cx={280} cy={310} r={15}
                  className={cn("stroke-2 transition-all duration-300",
                    procB === "error" || procB === "error-done" ? "fill-red-500/15 stroke-red-500" :
                    "fill-emerald-500/15 stroke-emerald-500"
                  )} />
                <text x={280} y={315} textAnchor="middle"
                  className={cn("font-bold",
                    procB === "error" || procB === "error-done" ? "fill-red-500" : "fill-emerald-500"
                  )} fontSize={12}>B</text>
                <line x1={280} y1={325} x2={280} y2={435}
                  className={cn("stroke-[1.5]",
                    procB === "active" ? "stroke-emerald-500" :
                    procB === "error" || procB === "error-done" ? "stroke-red-500" :
                    "stroke-emerald-500/30"
                  )} strokeDasharray={procB === "queued" || procB === "req" ? "4 3" : undefined} />
                {(procB === "active" || procB === "error" || procB === "error-done") && (
                  <polygon points="276,430 280,437 284,430"
                    className={procB === "active" ? "fill-emerald-500" : "fill-red-500"} />
                )}
                {/* Device */}
                <rect x={50} y={445} width={310} height={55} rx={8}
                  className={cn("stroke-2 transition-all duration-300",
                    rs === 0 ? "fill-muted/20 stroke-border" :
                    rs >= 16 ? "fill-red-500/15 stroke-red-500" :
                    "fill-amber-500/15 stroke-amber-500"
                  )} />
                <text x={205} y={467} textAnchor="middle"
                  className="fill-foreground font-mono font-semibold" fontSize={11}>/dev/nvme0n1</text>
                <text x={205} y={485} textAnchor="middle"
                  className={cn("font-semibold transition-colors",
                    rs === 0 ? "fill-muted-foreground/40" : rs >= 16 ? "fill-red-500" : "fill-amber-500"
                  )} fontSize={8}>{devStatus}</text>

                {/* ── Lower-right: Terminal (SVG) ── */}
                <text x={572} y={268} textAnchor="middle"
                  className="fill-muted-foreground/40 font-semibold" fontSize={8}>PROGRAM VIEW</text>
                <rect x={400} y={283} width={355} height={218} rx={8}
                  className="fill-zinc-950 stroke-zinc-800 stroke-1" />
                <text x={418} y={310}
                  className={cn("font-mono transition-colors",
                    rs === 0 ? "fill-zinc-100" : rs >= 9 ? "fill-emerald-400" : "fill-zinc-600"
                  )} fontSize={10}>&gt; read(fd_a, buf, 4096)</text>
                {rs >= 1 && rs < 9 && (
                  <text x={418} y={330} className="fill-zinc-600 font-mono" fontSize={10}>
                    {"  "}...blocking...</text>
                )}
                {rs >= 9 && (
                  <text x={418} y={330} className="fill-emerald-400 font-mono" fontSize={10}>
                    {"  "}4096 bytes read {"\u2713"}</text>
                )}
                <line x1={418} y1={348} x2={738} y2={348} className="stroke-zinc-800 stroke-1" />
                <text x={418} y={374}
                  className={cn("font-mono transition-colors",
                    rs === 0 ? "fill-zinc-100" : rs >= 18 ? "fill-red-400" : "fill-zinc-600"
                  )} fontSize={10}>&gt; read(fd_b, buf, 4096)</text>
                {rs >= 1 && rs < 18 && (
                  <text x={418} y={394} className="fill-zinc-600 font-mono" fontSize={10}>
                    {"  "}...blocking...</text>
                )}
                {rs >= 18 && (
                  <text x={418} y={394} className="fill-red-400 font-mono" fontSize={10}>
                    {"  "}errno: EIO {"\u2014"} Input/output error</text>
                )}
              </svg>

              {/* Step dots (grouped with subtle spacing) */}
              <div className="flex justify-center items-center mt-3 flex-wrap">
                {rtStepLabels.map((_, i) => (
                  <div key={i} className={rtDotBreaks.has(i) ? "ml-3 mr-0.5" : "mx-0.5"}>
                    <div
                      className={cn("w-2 h-2 rounded-full transition-all cursor-pointer",
                        i === rs ? "bg-primary scale-125" : i < rs ? "bg-primary/30" : "bg-muted"
                      )}
                      onClick={() => setRtStep(i)} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground/60 mt-2 italic">{rtStepLabels[rs]}</p>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── PCH-based modes ──

  const viewH = VH

  function wrapperOpacity(w: WrapperDef) {
    if (isDevIndep && ghostableWrapperIds.has(w.id) && !showHW) return 0.1
    return 1
  }

  function wrapperStroke(w: WrapperDef) {
    return w.color
  }



  function nodeOpacity(n: NodeDef) {
    if (isDevIndep && !showHW && ghostableNodeIds.has(n.id)) return 0.1
    return 1
  }


  function edgeOpacity(e: EdgeDef) {
    if (isDevIndep && !showHW && (ghostableNodeIds.has(e.from) || ghostableNodeIds.has(e.to))) return 0.1
    return 1
  }

  function edgeStroke(e: EdgeDef) {
    if (isBuf && isOnSataEdge(e.from, e.to)) return "stroke-cyan-500 stroke-[3]"
    return "stroke-border stroke-2"
  }


  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">
            {p === "device-independence" ? "Device Independence" : "Buffering"}
          </h4>
          {isDevIndep && (
            <button onClick={() => setShowHW(!showHW)}
              className={cn("px-3 py-1 rounded-md text-xs font-medium border transition-colors",
                showHW ? "hover:bg-muted" : "bg-primary text-primary-foreground")}>
              {showHW ? "Hide Hardware" : "Show Hardware"}
            </button>
          )}
          {isBuf && (
            <button onClick={() => setBufPlay(!bufPlay)}
              className={cn("px-3 py-1 rounded-md text-xs font-medium border",
                bufPlay ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
              {bufPlay ? "Pause" : "Play"}
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3">{desc[p]}</p>

        <svg width="100%" viewBox={`0 0 ${VW} ${viewH}`} className="max-w-3xl mx-auto">

          {/* ── Layer 1: Wrappers ── */}
          {W.map(w => (
            <rect key={`wr-${w.id}`} x={w.x} y={w.y} width={w.w} height={w.h} rx={8}
              className={cn("fill-none stroke-[1.5] stroke-dashed", wrapperStroke(w))}
              strokeDasharray="4 3" style={{ opacity: wrapperOpacity(w), transition: "opacity 300ms" }} />
          ))}

          {/* ── Layer 2: Edges ── */}
          {E.map((e, i) => {
            const f = nMap[e.from], t = nMap[e.to]
            if (!f || !t) return null
            return (
              <line key={`ed-${i}`} x1={mx(f)} y1={my(f)} x2={mx(t)} y2={my(t)}
                className={cn("transition-all duration-300", edgeStroke(e))}
                style={{ opacity: edgeOpacity(e), transition: "opacity 300ms" }} />
            )
          })}

          {/* ── Layer 3: Node rects ── */}
          {N.map(n => {
            if (!n.label) return null
            return (
              <rect key={`nr-${n.id}`} x={n.x} y={n.y} width={n.w} height={n.h} rx={6}
                className={cn("stroke-2", n.color)}
                style={{ opacity: nodeOpacity(n), transition: "opacity 300ms" }} />
            )
          })}

          {/* ── Layer 4: All text ── */}
          {W.map(w => (
            <text key={`wl-${w.id}`} x={w.lx} y={w.ly}
              textAnchor={(w.la || "start") as "start" | "middle" | "end"}
              className="fill-muted-foreground/60 font-semibold" fontSize={10}
              style={{ opacity: wrapperOpacity(w), transition: "opacity 300ms" }}>
              {w.label}
            </text>
          ))}

          {E.filter(e => e.label).map((e, i) => {
            const f = nMap[e.from], t = nMap[e.to]
            if (!f || !t) return null
            return (
              <text key={`el-${i}`} x={(mx(f) + mx(t)) / 2 + 8} y={(my(f) + my(t)) / 2 - 6}
                className="fill-muted-foreground/60 font-medium" fontSize={8}>
                {e.label}
              </text>
            )
          })}

          {N.filter(n => n.label).map(n => (
            <g key={`nl-${n.id}`} style={{ opacity: nodeOpacity(n), transition: "opacity 300ms" }}>
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 + (n.subtitle ? -1 : 4)}
                textAnchor="middle" className="fill-muted-foreground font-semibold"
                fontSize={n.label.length > 12 ? 9 : 11}>{n.label}</text>
              {n.subtitle && (
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 12}
                  textAnchor="middle" className="fill-muted-foreground/60" fontSize={7}>{n.subtitle}</text>
              )}
            </g>
          ))}

          {/* ── Device Independence Overlay ── */}
          {isDevIndep && (
            <>
              <polyline points={`180,10 180,248 ${VW - 20},248`} fill="none"
                className="stroke-purple-500 stroke-[2.5]" strokeDasharray="8 4" />
              <text x={480} y={242} textAnchor="middle" className="fill-purple-500 font-bold" fontSize={9}>
                ABSTRACTION BOUNDARY — Device-Independent OS / VFS
              </text>
              <text x={VW - 10} y={266} textAnchor="end" className="fill-teal-400/50 font-semibold" fontSize={8}>
                DEVICE DRIVERS
              </text>
              <text x={VW - 10} y={406} textAnchor="end" className="fill-muted-foreground/30 font-semibold" fontSize={8}>
                HARDWARE
              </text>
              <text x={VW / 2} y={VH - 8} textAnchor="middle" className="fill-purple-400/60" fontSize={8}>
                Applications see system calls, not hardware. The OS creates device independence through software layering.
              </text>
            </>
          )}

          {/* ── Buffering Overlay ── */}
          {isBuf && (
            <>
              {/* L-shaped boundary separating HW / SW buffers */}
              <polyline points={`180,10 180,248 ${VW - 20},248`} fill="none"
                className="stroke-cyan-500/30 stroke-[2]" strokeDasharray="8 4" />
              <text x={VW - 20} y={236} textAnchor="end"
                className="fill-cyan-500/35 font-semibold" fontSize={8}>SOFTWARE BUFFERS</text>
              <text x={VW - 20} y={262} textAnchor="end"
                className="fill-cyan-500/25 font-semibold" fontSize={8}>HARDWARE BUFFERS</text>

              {bufferPositions.map((bp, i) => {
                const filled = bufPhase === i
                return (
                  <g key={`buf-${i}`}>
                    <rect x={bp.x} y={bp.y} width={8} height={28} rx={2}
                      className="fill-none stroke-cyan-500/60 stroke-[1.5]" />
                    <rect x={bp.x + 1} y={bp.y + (filled ? 1 : 27)} width={6}
                      height={filled ? 26 : 0} rx={1}
                      className="fill-cyan-500/50 transition-all duration-500" />
                    <text x={bp.x + 12} y={bp.y + 18}
                      className="fill-cyan-500/70 font-semibold" fontSize={7}>{bp.label}</text>
                  </g>
                )
              })}
              {rateLabels.map((rl, i) => (
                <text key={`rl-${i}`} x={rl.x} y={rl.y}
                  className="fill-cyan-400/40 font-mono" fontSize={7}>{rl.text}</text>
              ))}
              <text x={VW / 2} y={VH - 8} textAnchor="middle" className="fill-cyan-400/60" fontSize={8}>
                Buffers exist at every hop — on-chip FIFOs in hardware, page cache and user buffers in software.
              </text>
            </>
          )}

        </svg>

      </div>
    </div>
  )
}
