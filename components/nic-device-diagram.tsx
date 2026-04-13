"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 760
const VH = 340

type HighlightZone = "send" | "receive" | null

export function NicDeviceDiagram({ className }: { className?: string }) {
  const [active, setActive] = useState<HighlightZone>(null)

  const hostX = 20, hostY = 60, hostW = 220, hostH = 220
  const nicX = 340, nicY = 60, nicW = 180, nicH = 220
  const netX = 620, netY = 100, netW = 120, netH = 140

  const cpuX = hostX + 20, cpuY = hostY + 20, cpuW = 80, cpuH = 50
  const ramX = hostX + 120, ramY = hostY + 20, ramW = 80, ramH = 50
  const dmaX = hostX + 50, dmaY = hostY + 100, dmaW = 120, dmaH = 36
  const driverX = hostX + 30, driverY = hostY + 155, driverW = 160, driverH = 36

  const ctrlX = nicX + 15, ctrlY = nicY + 20, ctrlW = 150, ctrlH = 50
  const macX = nicX + 15, macY = nicY + 90, macW = 150, macH = 36
  const phyX = nicX + 15, phyY = nicY + 150, phyW = 150, phyH = 36

  const busX1 = hostX + hostW, busX2 = nicX, busY = hostY + hostH / 2 - 15

  const isSend = active === "send"
  const isRecv = active === "receive"
  const isAny = isSend || isRecv

  function Block({ x, y, w, h, label, sub, highlight, accent }: {
    x: number; y: number; w: number; h: number; label: string; sub?: string
    highlight: boolean; accent: string
  }) {
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={5}
          className={cn("stroke-[1.5] transition-all duration-200",
            highlight ? `${accent} stroke-current` : "fill-slate-200/50 dark:fill-slate-700/30 stroke-slate-300 dark:stroke-slate-600"
          )} />
        <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle"
          className={cn("font-semibold transition-colors", highlight ? "fill-foreground" : "fill-muted-foreground")} fontSize={9}>
          {label}
        </text>
        {sub && (
          <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle"
            className="fill-muted-foreground/50" fontSize={7}>
            {sub}
          </text>
        )}
      </g>
    )
  }

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">NIC Device Anatomy — I/O for External Connections</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Hover <strong>Send</strong> or <strong>Receive</strong> to trace data flow through the NIC.
        </p>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-4xl mx-auto">

          {/* Host Machine boundary */}
          <rect x={hostX} y={hostY} width={hostW} height={hostH} rx={8}
            className="fill-purple-500/5 stroke-purple-500/25 stroke-2" />
          <text x={hostX + hostW / 2} y={hostY - 8} textAnchor="middle"
            className="fill-purple-600 dark:fill-purple-400 font-semibold" fontSize={10}>
            Host Machine
          </text>

          {/* NIC boundary */}
          <rect x={nicX} y={nicY} width={nicW} height={nicH} rx={8}
            className="fill-amber-500/5 stroke-amber-500/25 stroke-2" />
          <text x={nicX + nicW / 2} y={nicY - 8} textAnchor="middle"
            className="fill-amber-600 dark:fill-amber-400 font-semibold" fontSize={10}>
            Network Interface Card
          </text>

          {/* Network cloud */}
          <rect x={netX} y={netY} width={netW} height={netH} rx={20}
            className="fill-sky-500/5 stroke-sky-500/25 stroke-2" />
          <text x={netX + netW / 2} y={netY + netH / 2 - 6} textAnchor="middle"
            className="fill-sky-600 dark:fill-sky-400 font-semibold" fontSize={10}>
            Network
          </text>
          <text x={netX + netW / 2} y={netY + netH / 2 + 10} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={8}>
            (Ethernet / WiFi)
          </text>

          {/* Host blocks */}
          <Block x={cpuX} y={cpuY} w={cpuW} h={cpuH} label="CPU" sub="Initiates I/O"
            highlight={isAny} accent="fill-purple-500/15" />
          <Block x={ramX} y={ramY} w={ramW} h={ramH} label="RAM" sub="Packet Buffers"
            highlight={isAny} accent="fill-cyan-500/15" />
          <Block x={dmaX} y={dmaY} w={dmaW} h={dmaH} label="DMA Engine"
            highlight={isAny} accent="fill-amber-500/15" />
          <Block x={driverX} y={driverY} w={driverW} h={driverH} label="NIC Driver (Kernel)"
            highlight={isAny} accent="fill-emerald-500/15" />

          {/* Internal host wires */}
          <line x1={cpuX + cpuW / 2} y1={cpuY + cpuH} x2={dmaX + 30} y2={dmaY}
            className="stroke-purple-500/30 stroke-[1.5]" />
          <line x1={ramX + ramW / 2} y1={ramY + ramH} x2={dmaX + 90} y2={dmaY}
            className="stroke-cyan-500/30 stroke-[1.5]" />
          <line x1={dmaX + dmaW / 2} y1={dmaY + dmaH} x2={driverX + driverW / 2} y2={driverY}
            className="stroke-amber-500/30 stroke-[1.5]" />

          {/* NIC blocks */}
          <Block x={ctrlX} y={ctrlY} w={ctrlW} h={ctrlH} label="PCIe Controller" sub="Descriptor Rings"
            highlight={isAny} accent="fill-amber-500/15" />
          <Block x={macX} y={macY} w={macW} h={macH} label="MAC Engine"
            highlight={isAny} accent="fill-orange-500/15" />
          <Block x={phyX} y={phyY} w={phyW} h={phyH} label="PHY Transceiver"
            highlight={isAny} accent="fill-rose-500/15" />

          {/* NIC internal wires */}
          <line x1={ctrlX + ctrlW / 2} y1={ctrlY + ctrlH} x2={macX + macW / 2} y2={macY}
            className="stroke-amber-500/30 stroke-[1.5]" />
          <line x1={macX + macW / 2} y1={macY + macH} x2={phyX + phyW / 2} y2={phyY}
            className="stroke-orange-500/30 stroke-[1.5]" />

          {/* PCIe bus between host and NIC */}
          <line x1={busX1} y1={busY} x2={busX2} y2={busY}
            className={cn("stroke-[3] transition-all duration-200",
              isAny ? "stroke-amber-500" : "stroke-amber-500/30")} />
          <text x={(busX1 + busX2) / 2} y={busY - 8} textAnchor="middle"
            className={cn("font-bold transition-colors",
              isAny ? "fill-amber-600 dark:fill-amber-400" : "fill-muted-foreground/40")} fontSize={9}>
            PCIe Bus (DMA)
          </text>

          {/* Link wire: NIC PHY → Network */}
          <line x1={nicX + nicW} y1={phyY + phyH / 2} x2={netX} y2={netY + netH / 2}
            className={cn("stroke-[3] transition-all duration-200",
              isAny ? "stroke-sky-500" : "stroke-sky-500/30")} />
          <text x={(nicX + nicW + netX) / 2} y={phyY + phyH / 2 + 20} textAnchor="middle"
            className={cn("font-bold transition-colors",
              isAny ? "fill-sky-600 dark:fill-sky-400" : "fill-muted-foreground/40")} fontSize={8}>
            Physical Link
          </text>

          {/* Send/Receive flow arrows */}
          {isSend && (
            <g>
              <text x={VW / 2} y={VH - 16} textAnchor="middle"
                className="fill-emerald-600 dark:fill-emerald-400 font-semibold" fontSize={9}>
                SEND: App → Driver → DMA to NIC → MAC → PHY → Wire
              </text>
              <line x1={hostX + hostW / 2} y1={VH - 30} x2={netX + netW / 2} y2={VH - 30}
                className="stroke-emerald-500/50 stroke-[2]"
                markerEnd="url(#arrowGreen)" />
              <defs>
                <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6" className="fill-emerald-500" />
                </marker>
              </defs>
            </g>
          )}
          {isRecv && (
            <g>
              <text x={VW / 2} y={VH - 16} textAnchor="middle"
                className="fill-sky-600 dark:fill-sky-400 font-semibold" fontSize={9}>
                RECEIVE: Wire → PHY → MAC → DMA to RAM → Interrupt → Driver → App
              </text>
              <line x1={netX + netW / 2} y1={VH - 30} x2={hostX + hostW / 2} y2={VH - 30}
                className="stroke-sky-500/50 stroke-[2]"
                markerEnd="url(#arrowBlue)" />
              <defs>
                <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6" className="fill-sky-500" />
                </marker>
              </defs>
            </g>
          )}
        </svg>

        {/* Interactive buttons */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            onMouseEnter={() => setActive("send")}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(a => a === "send" ? null : "send")}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-medium border transition-colors",
              active === "send" ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300" : "hover:bg-muted"
            )}>
            ↗ Send Path
          </button>
          <button
            onMouseEnter={() => setActive("receive")}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(a => a === "receive" ? null : "receive")}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-medium border transition-colors",
              active === "receive" ? "bg-sky-500/10 border-sky-500/40 text-sky-700 dark:text-sky-300" : "hover:bg-muted"
            )}>
            ↙ Receive Path
          </button>
        </div>
      </div>
    </div>
  )
}
