"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface BusTopologyDiagramProps {
  mode?: "northbridge" | "pch"
  animateFlow?: boolean
  highlightDevice?: string
  showLabels?: boolean
  className?: string
}

const NB_W = 780
const NB_H = 590

interface NodeDef {
  id: string
  label: string
  subtitle?: string
  x: number
  y: number
  w: number
  h: number
  color: string
  activeColor: string
}

interface EdgeDef {
  from: string
  to: string
  label?: string
}

interface WrapperDef {
  label: string
  x: number
  y: number
  w: number
  h: number
  color: string
  labelX: number
  labelY: number
  labelAnchor?: string
}

// ──────────────────────────────────────────────
// Northbridge / Southbridge (detailed view)
// ──────────────────────────────────────────────

const northbridgeWrappers: WrapperDef[] = [
  { label: "Northbridge", x: 260, y: 82, w: 260, h: 128, color: "stroke-amber-400/40", labelX: 390, labelY: 96, labelAnchor: "middle" },
  { label: "GPU Card", x: 30, y: 75, w: 135, h: 165, color: "stroke-rose-400/40", labelX: 39, labelY: 89 },
  { label: "RAM", x: 610, y: 82, w: 145, h: 128, color: "stroke-cyan-400/40", labelX: 619, labelY: 96 },
  { label: "Southbridge", x: 130, y: 275, w: 520, h: 108, color: "stroke-teal-400/40", labelX: 390, labelY: 290, labelAnchor: "middle" },
  { label: "USB Device", x: 140, y: 425, w: 104, h: 135, color: "stroke-sky-400/30", labelX: 192, labelY: 439, labelAnchor: "middle" },
  { label: "SATA Drive", x: 260, y: 425, w: 104, h: 135, color: "stroke-orange-400/30", labelX: 312, labelY: 439, labelAnchor: "middle" },
  { label: "Sound Card", x: 380, y: 425, w: 104, h: 135, color: "stroke-emerald-400/30", labelX: 432, labelY: 439, labelAnchor: "middle" },
  { label: "PCI Card", x: 500, y: 425, w: 104, h: 135, color: "stroke-violet-400/30", labelX: 552, labelY: 439, labelAnchor: "middle" },
]

const northbridgeNodes: NodeDef[] = [
  // CPU (standalone — no SoC in this era)
  { id: "cpu", label: "CPU", subtitle: "ALU · CU · Regs", x: 350, y: 8, w: 80, h: 54, color: "fill-purple-500/15 stroke-purple-500/50", activeColor: "fill-purple-500/30 stroke-purple-500" },
  // Northbridge internals (routing point + two controllers)
  { id: "nb", label: "", x: 370, y: 87, w: 40, h: 10, color: "fill-none stroke-none", activeColor: "fill-none stroke-none" },
  { id: "agp_ctrl", label: "AGP Ctrl", x: 272, y: 118, w: 110, h: 48, color: "fill-amber-500/15 stroke-amber-500/50", activeColor: "fill-amber-500/30 stroke-amber-500" },
  { id: "mem_ctrl", label: "Mem Ctrl", x: 398, y: 118, w: 110, h: 48, color: "fill-amber-400/15 stroke-amber-400/50", activeColor: "fill-amber-400/30 stroke-amber-400" },
  // GPU Card internals (vertical: Controller on top, Cores below)
  { id: "gpu_ctrl", label: "Controller", x: 43, y: 118, w: 110, h: 48, color: "fill-rose-500/15 stroke-rose-500/50", activeColor: "fill-rose-500/30 stroke-rose-500" },
  { id: "gpu_cores", label: "GPU Cores", x: 43, y: 178, w: 110, h: 46, color: "fill-rose-400/15 stroke-rose-400/50", activeColor: "fill-rose-400/30 stroke-rose-400" },
  // RAM
  { id: "dram", label: "DRAM Modules", x: 623, y: 107, w: 118, h: 70, color: "fill-cyan-500/15 stroke-cyan-500/50", activeColor: "fill-cyan-500/30 stroke-cyan-500" },
  // Southbridge internals (routing point + controllers)
  { id: "sb", label: "", x: 370, y: 280, w: 40, h: 10, color: "fill-none stroke-none", activeColor: "fill-none stroke-none" },
  { id: "usb_ctrl", label: "USB Ctrl", x: 148, y: 318, w: 88, h: 44, color: "fill-sky-500/15 stroke-sky-500/50", activeColor: "fill-sky-500/30 stroke-sky-500" },
  { id: "sata_ctrl", label: "SATA Ctrl", x: 268, y: 318, w: 88, h: 44, color: "fill-orange-500/15 stroke-orange-500/50", activeColor: "fill-orange-500/30 stroke-orange-500" },
  { id: "audio_ctrl", label: "Audio Ctrl", x: 388, y: 318, w: 88, h: 44, color: "fill-emerald-500/15 stroke-emerald-500/50", activeColor: "fill-emerald-500/30 stroke-emerald-500" },
  { id: "pci_ctrl", label: "PCI Ctrl", x: 508, y: 318, w: 88, h: 44, color: "fill-violet-500/15 stroke-violet-500/50", activeColor: "fill-violet-500/30 stroke-violet-500" },
  // Device-side controllers (inside device wrappers)
  { id: "usb_dev_ctrl", label: "USB Ctrl", x: 148, y: 450, w: 88, h: 38, color: "fill-sky-400/15 stroke-sky-400/50", activeColor: "fill-sky-400/30 stroke-sky-400" },
  { id: "sata_dev_ctrl", label: "Drive Ctrl", x: 268, y: 450, w: 88, h: 38, color: "fill-orange-400/15 stroke-orange-400/50", activeColor: "fill-orange-400/30 stroke-orange-400" },
  { id: "audio_dev_ctrl", label: "Codec Ctrl", x: 388, y: 450, w: 88, h: 38, color: "fill-emerald-400/15 stroke-emerald-400/50", activeColor: "fill-emerald-400/30 stroke-emerald-400" },
  { id: "pci_dev_ctrl", label: "Card Ctrl", x: 508, y: 450, w: 88, h: 38, color: "fill-violet-400/15 stroke-violet-400/50", activeColor: "fill-violet-400/30 stroke-violet-400" },
  // Functional hardware (inside device wrappers)
  { id: "usb_func", label: "Peripheral", x: 148, y: 502, w: 88, h: 38, color: "fill-sky-300/10 stroke-sky-300/40", activeColor: "fill-sky-300/25 stroke-sky-300" },
  { id: "sata_func", label: "Platters / Flash", x: 268, y: 502, w: 88, h: 38, color: "fill-orange-300/10 stroke-orange-300/40", activeColor: "fill-orange-300/25 stroke-orange-300" },
  { id: "audio_func", label: "DAC / Amp", x: 388, y: 502, w: 88, h: 38, color: "fill-emerald-300/10 stroke-emerald-300/40", activeColor: "fill-emerald-300/25 stroke-emerald-300" },
  { id: "pci_func", label: "Hardware", x: 508, y: 502, w: 88, h: 38, color: "fill-violet-300/10 stroke-violet-300/40", activeColor: "fill-violet-300/25 stroke-violet-300" },
]

const northbridgeEdges: EdgeDef[] = [
  { from: "cpu", to: "nb", label: "FSB" },
  { from: "nb", to: "agp_ctrl" },
  { from: "nb", to: "mem_ctrl" },
  { from: "agp_ctrl", to: "gpu_ctrl", label: "AGP" },
  { from: "gpu_ctrl", to: "gpu_cores" },
  { from: "mem_ctrl", to: "dram", label: "Memory Bus" },
  { from: "nb", to: "sb", label: "Internal" },
  { from: "sb", to: "usb_ctrl" },
  { from: "sb", to: "sata_ctrl" },
  { from: "sb", to: "audio_ctrl" },
  { from: "sb", to: "pci_ctrl" },
  { from: "usb_ctrl", to: "usb_dev_ctrl" },
  { from: "sata_ctrl", to: "sata_dev_ctrl" },
  { from: "audio_ctrl", to: "audio_dev_ctrl" },
  { from: "pci_ctrl", to: "pci_dev_ctrl" },
  { from: "usb_dev_ctrl", to: "usb_func" },
  { from: "sata_dev_ctrl", to: "sata_func" },
  { from: "audio_dev_ctrl", to: "audio_func" },
  { from: "pci_dev_ctrl", to: "pci_func" },
]

// ──────────────────────────────────────────────
// Platform Controller Hub (detailed view)
// ──────────────────────────────────────────────

const PCH_W = 780
const PCH_H = 590

const pchWrappers: WrapperDef[] = [
  { label: "SoC", x: 310, y: 4, w: 160, h: 165, color: "stroke-purple-400/40", labelX: 320, labelY: 18 },
  { label: "GPU", x: 35, y: 50, w: 130, h: 175, color: "stroke-rose-400/40", labelX: 44, labelY: 64 },
  { label: "RAM", x: 610, y: 50, w: 145, h: 135, color: "stroke-cyan-400/40", labelX: 619, labelY: 64 },
  { label: "Platform Controller Hub", x: 95, y: 270, w: 590, h: 105, color: "stroke-teal-400/40", labelX: 390, labelY: 286, labelAnchor: "middle" },
  // Device wrappers (controller + functional hardware pairs)
  { label: "USB Flash Drive", x: 100, y: 410, w: 104, h: 135, color: "stroke-sky-400/30", labelX: 152, labelY: 424, labelAnchor: "middle" },
  { label: "SATA SSD", x: 208, y: 410, w: 104, h: 135, color: "stroke-orange-400/30", labelX: 260, labelY: 424, labelAnchor: "middle" },
  { label: "NVMe SSD", x: 316, y: 410, w: 104, h: 135, color: "stroke-amber-400/30", labelX: 368, labelY: 424, labelAnchor: "middle" },
  { label: "Sound Card", x: 424, y: 410, w: 104, h: 135, color: "stroke-emerald-400/30", labelX: 476, labelY: 424, labelAnchor: "middle" },
  { label: "WiFi Adapter", x: 534, y: 410, w: 144, h: 135, color: "stroke-fuchsia-400/30", labelX: 606, labelY: 424, labelAnchor: "middle" },
]

const pchNodes: NodeDef[] = [
  // SoC internals (stacked vertically: CPU on top, MMU below)
  { id: "cpu", label: "CPU", subtitle: "ALU · CU · Regs", x: 322, y: 30, w: 136, h: 50, color: "fill-purple-500/15 stroke-purple-500/50", activeColor: "fill-purple-500/30 stroke-purple-500" },
  { id: "mmu", label: "MMU", subtitle: "Mem Ctrl · PCIe", x: 322, y: 96, w: 136, h: 50, color: "fill-purple-400/15 stroke-purple-400/50", activeColor: "fill-purple-400/30 stroke-purple-400" },
  // GPU internals (stacked vertically: Controller on top, Cores below)
  { id: "gpu_ctrl", label: "Controller", x: 48, y: 97, w: 104, h: 48, color: "fill-rose-500/15 stroke-rose-500/50", activeColor: "fill-rose-500/30 stroke-rose-500" },
  { id: "gpu_cores", label: "Cores / VRAM", x: 48, y: 160, w: 104, h: 48, color: "fill-rose-400/15 stroke-rose-400/50", activeColor: "fill-rose-400/30 stroke-rose-400" },
  // RAM (centered at same Y as MMU)
  { id: "dram", label: "DRAM Modules", x: 623, y: 81, w: 118, h: 80, color: "fill-cyan-500/15 stroke-cyan-500/50", activeColor: "fill-cyan-500/30 stroke-cyan-500" },
  // Invisible routing point for PCH fan-out (same X as MMU for vertical DMI line)
  { id: "pch", label: "", x: 370, y: 275, w: 40, h: 10, color: "fill-none stroke-none", activeColor: "fill-none stroke-none" },
  // Controllers inside PCH
  { id: "usb_ctrl", label: "USB Ctrl", x: 108, y: 318, w: 88, h: 44, color: "fill-sky-500/15 stroke-sky-500/50", activeColor: "fill-sky-500/30 stroke-sky-500" },
  { id: "sata_ctrl", label: "SATA Ctrl", x: 216, y: 318, w: 88, h: 44, color: "fill-orange-500/15 stroke-orange-500/50", activeColor: "fill-orange-500/30 stroke-orange-500" },
  { id: "nvme_ctrl", label: "NVMe Ctrl", x: 324, y: 318, w: 88, h: 44, color: "fill-amber-500/15 stroke-amber-500/50", activeColor: "fill-amber-500/30 stroke-amber-500" },
  { id: "audio_ctrl", label: "Audio Ctrl", x: 432, y: 318, w: 88, h: 44, color: "fill-emerald-500/15 stroke-emerald-500/50", activeColor: "fill-emerald-500/30 stroke-emerald-500" },
  { id: "net_ctrl", label: "Net Ctrl", x: 542, y: 318, w: 128, h: 44, color: "fill-fuchsia-500/15 stroke-fuchsia-500/50", activeColor: "fill-fuchsia-500/30 stroke-fuchsia-500" },
  // Device-side controllers (inside device wrappers)
  { id: "usb_dev_ctrl", label: "USB Ctrl", x: 108, y: 435, w: 88, h: 38, color: "fill-sky-400/15 stroke-sky-400/50", activeColor: "fill-sky-400/30 stroke-sky-400" },
  { id: "sata_dev_ctrl", label: "Drive Ctrl", x: 216, y: 435, w: 88, h: 38, color: "fill-orange-400/15 stroke-orange-400/50", activeColor: "fill-orange-400/30 stroke-orange-400" },
  { id: "nvme_dev_ctrl", label: "SSD Ctrl", x: 324, y: 435, w: 88, h: 38, color: "fill-amber-400/15 stroke-amber-400/50", activeColor: "fill-amber-400/30 stroke-amber-400" },
  { id: "audio_dev_ctrl", label: "Codec Ctrl", x: 432, y: 435, w: 88, h: 38, color: "fill-emerald-400/15 stroke-emerald-400/50", activeColor: "fill-emerald-400/30 stroke-emerald-400" },
  { id: "net_dev_ctrl", label: "NIC Ctrl", x: 542, y: 435, w: 128, h: 38, color: "fill-fuchsia-400/15 stroke-fuchsia-400/50", activeColor: "fill-fuchsia-400/30 stroke-fuchsia-400" },
  // Functional hardware (inside device wrappers)
  { id: "usb_func", label: "Flash IC", x: 108, y: 487, w: 88, h: 38, color: "fill-sky-300/10 stroke-sky-300/40", activeColor: "fill-sky-300/25 stroke-sky-300" },
  { id: "sata_func", label: "NAND / Platters", x: 216, y: 487, w: 88, h: 38, color: "fill-orange-300/10 stroke-orange-300/40", activeColor: "fill-orange-300/25 stroke-orange-300" },
  { id: "nvme_func", label: "Flash Array", x: 324, y: 487, w: 88, h: 38, color: "fill-amber-300/10 stroke-amber-300/40", activeColor: "fill-amber-300/25 stroke-amber-300" },
  { id: "audio_func", label: "DAC / Amp", x: 432, y: 487, w: 88, h: 38, color: "fill-emerald-300/10 stroke-emerald-300/40", activeColor: "fill-emerald-300/25 stroke-emerald-300" },
  { id: "net_func", label: "Radio / PHY", x: 542, y: 487, w: 128, h: 38, color: "fill-fuchsia-300/10 stroke-fuchsia-300/40", activeColor: "fill-fuchsia-300/25 stroke-fuchsia-300" },
]

const pchEdges: EdgeDef[] = [
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

function getNodeCenter(node: NodeDef) {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 }
}

function findPath(from: string, to: string, edges: EdgeDef[], nodes: NodeDef[]): string[] {
  const adj: Record<string, string[]> = {}
  for (const e of edges) {
    if (!adj[e.from]) adj[e.from] = []
    if (!adj[e.to]) adj[e.to] = []
    adj[e.from].push(e.to)
    adj[e.to].push(e.from)
  }

  const visited = new Set<string>()
  const queue: string[][] = [[from]]
  visited.add(from)

  while (queue.length > 0) {
    const path = queue.shift()!
    const current = path[path.length - 1]
    if (current === to) return path
    for (const neighbor of adj[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([...path, neighbor])
      }
    }
  }
  return [from]
}

export function BusTopologyDiagram({
  mode: controlledMode,
  animateFlow = true,
  highlightDevice: controlledDevice,
  showLabels = true,
  className,
}: BusTopologyDiagramProps) {
  const [internalMode, setInternalMode] = useState<"northbridge" | "pch">(controlledMode || "northbridge")
  const [selectedDevice, setSelectedDevice] = useState<string | null>(controlledDevice || null)
  const [flowStep, setFlowStep] = useState(0)

  const mode = controlledMode || internalMode
  const nodes = mode === "northbridge" ? northbridgeNodes : pchNodes
  const edges = mode === "northbridge" ? northbridgeEdges : pchEdges
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

  const wrappers = mode === "northbridge" ? northbridgeWrappers : pchWrappers
  const activePath = selectedDevice ? findPath(selectedDevice, "dram", edges, nodes) : []

  const clickableIds = mode === "northbridge"
    ? new Set(["gpu_cores", "usb_func", "sata_func", "audio_func", "pci_func"])
    : new Set(["gpu_cores", "usb_func", "sata_func", "nvme_func", "audio_func", "net_func"])

  useEffect(() => {
    if (animateFlow && activePath.length > 1) {
      const interval = setInterval(() => {
        setFlowStep((prev) => (prev + 1) % activePath.length)
      }, 600)
      return () => clearInterval(interval)
    }
  }, [animateFlow, activePath.length, selectedDevice])

  useEffect(() => {
    setSelectedDevice(null)
    setFlowStep(0)
  }, [mode])

  const isOnPath = (nodeId: string) => activePath.includes(nodeId)
  const isActiveStep = (nodeId: string) => animateFlow && activePath[flowStep] === nodeId

  const vw = mode === "pch" ? PCH_W : NB_W
  const vh = mode === "pch" ? PCH_H : NB_H

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Bus Architecture Comparison</h4>
          {!controlledMode && (
            <div className="flex gap-1 rounded-lg border p-0.5">
              <button
                onClick={() => setInternalMode("northbridge")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                  mode === "northbridge" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                Northbridge / Southbridge
              </button>
              <button
                onClick={() => setInternalMode("pch")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                  mode === "pch" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                Platform Controller Hub
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          {mode === "northbridge"
            ? "Centralized: The Northbridge chipset houses the memory and AGP controllers as a separate chip. All high-speed traffic converges through it. The Southbridge handles slower I/O controllers."
            : "Integrated: The SoC packages CPU cores alongside the MMU (memory controller + PCIe root complex). High-bandwidth devices connect directly; the PCH houses controllers for everything else."}
          {" "}Click a device to trace its path to RAM.
        </p>

        <svg width="100%" viewBox={`0 0 ${vw} ${vh}`} className="max-w-3xl mx-auto">
          {/* ── Layer 1: Wrapper rects (background) ── */}
          {wrappers.map((wrapper, i) => (
            <rect key={`wr-${i}`}
              x={wrapper.x} y={wrapper.y} width={wrapper.w} height={wrapper.h}
              rx={8} className={cn("fill-none stroke-[1.5] stroke-dashed", wrapper.color)}
            />
          ))}

          {/* ── Layer 2: Edge lines ── */}
          {edges.map((edge, i) => {
            const fromNode = nodeMap[edge.from]
            const toNode = nodeMap[edge.to]
            if (!fromNode || !toNode) return null
            const from = getNodeCenter(fromNode)
            const to = getNodeCenter(toNode)

            const edgeOnPath =
              activePath.length > 1 &&
              activePath.some((id, idx) => {
                if (idx === activePath.length - 1) return false
                const next = activePath[idx + 1]
                return (id === edge.from && next === edge.to) || (id === edge.to && next === edge.from)
              })

            return (
              <line key={`el-${i}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                className={cn(
                  "transition-all duration-300",
                  edgeOnPath ? "stroke-primary stroke-[3]" : "stroke-border stroke-2"
                )}
              />
            )
          })}

          {/* ── Layer 3: Node rects (with click targets) ── */}
          {nodes.map((node) => {
            if (!node.label) return null

            const onPath = isOnPath(node.id)
            const isStep = isActiveStep(node.id)
            const isNodeClickable = clickableIds.has(node.id)

            return (
              <rect key={`nr-${node.id}`}
                x={node.x} y={node.y} width={node.w} height={node.h} rx={6}
                onClick={() => isNodeClickable && setSelectedDevice(selectedDevice === node.id ? null : node.id)}
                className={cn(
                  "stroke-2 transition-all duration-300",
                  isNodeClickable ? "cursor-pointer" : "",
                  isStep ? "stroke-primary stroke-[3] fill-primary/20" :
                  onPath ? node.activeColor :
                  node.color
                )}
              />
            )
          })}

          {/* ── Layer 4: All text (topmost) ── */}

          {/* Wrapper labels */}
          {wrappers.map((wrapper, i) => (
            <text key={`wt-${i}`}
              x={wrapper.labelX} y={wrapper.labelY}
              textAnchor={(wrapper.labelAnchor || "start") as "start" | "middle" | "end"}
              className="fill-muted-foreground/60 font-semibold" fontSize={10}
            >
              {wrapper.label}
            </text>
          ))}

          {/* Edge labels */}
          {edges.map((edge, i) => {
            if (!edge.label || !showLabels) return null
            const fromNode = nodeMap[edge.from]
            const toNode = nodeMap[edge.to]
            if (!fromNode || !toNode) return null
            const from = getNodeCenter(fromNode)
            const to = getNodeCenter(toNode)

            const edgeOnPath =
              activePath.length > 1 &&
              activePath.some((id, idx) => {
                if (idx === activePath.length - 1) return false
                const next = activePath[idx + 1]
                return (id === edge.from && next === edge.to) || (id === edge.to && next === edge.from)
              })

            return (
              <text key={`et-${i}`}
                x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 6}
                className={cn(
                  "font-medium transition-colors",
                  edgeOnPath ? "fill-primary" : "fill-muted-foreground/60"
                )}
                fontSize={8}
              >
                {edge.label}
              </text>
            )
          })}

          {/* Node labels */}
          {nodes.map((node) => {
            if (!node.label) return null

            const onPath = isOnPath(node.id)
            const isNodeClickable = clickableIds.has(node.id)

            return (
              <g key={`nt-${node.id}`}
                onClick={() => isNodeClickable && setSelectedDevice(selectedDevice === node.id ? null : node.id)}
                className={isNodeClickable ? "cursor-pointer" : ""}
              >
                <text
                  x={node.x + node.w / 2} y={node.y + node.h / 2 + (node.subtitle ? -1 : 4)}
                  textAnchor="middle"
                  className={cn(
                    "font-semibold transition-colors",
                    onPath ? "fill-foreground" : "fill-muted-foreground"
                  )}
                  fontSize={node.label.length > 12 ? 9 : 11}
                >
                  {node.label}
                </text>
                {node.subtitle && (
                  <text
                    x={node.x + node.w / 2} y={node.y + node.h / 2 + 12}
                    textAnchor="middle"
                    className="fill-muted-foreground/60" fontSize={7}
                  >
                    {node.subtitle}
                  </text>
                )}
              </g>
            )
          })}

          {/* Hop count annotation */}
          {activePath.length > 1 && (
            <text x={vw - 10} y={vh - 10} textAnchor="end" className="fill-primary font-bold" fontSize={12}>
              {activePath.length - 1} hop{activePath.length - 1 !== 1 ? "s" : ""} to RAM
            </text>
          )}

          {/* Mode label */}
          <text x={10} y={vh - 10} className="fill-muted-foreground/50 font-semibold" fontSize={10}>
            {mode === "northbridge" ? "CENTRALIZED MODEL" : "INTEGRATED MODEL"}
          </text>
        </svg>
      </div>
    </div>
  )
}
