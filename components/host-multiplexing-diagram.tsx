"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 520
const VH = 280

interface SocketDef {
  label: string; port: string; color: string; textColor: string
}

const sockets: SocketDef[] = [
  { label: "HTTP Server",  port: ":80",    color: "fill-blue-500/15 stroke-blue-500/40",     textColor: "fill-blue-700 dark:fill-blue-300" },
  { label: "SSH Daemon",   port: ":22",    color: "fill-purple-500/15 stroke-purple-500/40", textColor: "fill-purple-700 dark:fill-purple-300" },
  { label: "DNS Resolver", port: ":53",    color: "fill-emerald-500/15 stroke-emerald-500/40", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { label: "DB Server",    port: ":5432",  color: "fill-orange-500/15 stroke-orange-500/40", textColor: "fill-orange-700 dark:fill-orange-300" },
  { label: "Client App",   port: ":53014", color: "fill-rose-500/15 stroke-rose-500/40",    textColor: "fill-rose-700 dark:fill-rose-300" },
]

export function HostMultiplexingDiagram({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null)

  const hostX = 140, hostY = 30, hostW = 250, hostH = 220
  const nicX = 30, nicY = 110, nicW = 80, nicH = 60

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Host Multiplexing — One IP, Many Sockets</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          The kernel uses port numbers to route incoming data to the correct socket.
        </p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          {/* Host boundary */}
          <rect x={hostX} y={hostY} width={hostW} height={hostH} rx={8}
            className="fill-slate-500/5 stroke-slate-500/20 stroke-[1.5]" />
          <text x={hostX + hostW / 2} y={hostY + hostH + 16} textAnchor="middle"
            className="fill-muted-foreground/30 font-semibold" fontSize={8}>
            203.0.113.10
          </text>

          {/* NIC */}
          <rect x={nicX} y={nicY} width={nicW} height={nicH} rx={6}
            className="fill-amber-500/10 stroke-amber-500/40 stroke-[1.5]" />
          <text x={nicX + nicW / 2} y={nicY + 24} textAnchor="middle"
            className="fill-amber-700 dark:fill-amber-300 font-semibold" fontSize={9}>NIC</text>
          <text x={nicX + nicW / 2} y={nicY + 38} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={7}>1 interface</text>

          {/* Wire from left */}
          <line x1={0} y1={nicY + nicH / 2} x2={nicX} y2={nicY + nicH / 2}
            className="stroke-amber-500/30 stroke-[2]" />
          <text x={12} y={nicY + nicH / 2 - 6} className="fill-muted-foreground/20" fontSize={6}>wire</text>

          {/* Sockets */}
          {sockets.map((s, i) => {
            const sx = hostX + 20
            const sy = hostY + 16 + i * 40
            const sw = hostW - 40
            const sh = 30
            const isActive = hovered === i

            return (
              <g key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer">
                <rect x={sx} y={sy} width={sw} height={sh} rx={5}
                  className={cn("stroke-[1.5] transition-all duration-200",
                    isActive ? s.color : "fill-slate-500/5 stroke-slate-500/15"
                  )} />
                <text x={sx + 10} y={sy + 19} className={cn("font-semibold transition-colors", isActive ? s.textColor : "fill-muted-foreground/40")} fontSize={8}>
                  {s.label}
                </text>
                <text x={sx + sw - 10} y={sy + 19} textAnchor="end"
                  className={cn("font-mono transition-colors", isActive ? s.textColor : "fill-muted-foreground/25")} fontSize={8}>
                  {s.port}
                </text>

                {/* Fan-in line from NIC to socket */}
                <line x1={nicX + nicW} y1={nicY + nicH / 2}
                  x2={sx} y2={sy + sh / 2}
                  className={cn("stroke-1 transition-all duration-200",
                    isActive ? "stroke-amber-500/50" : "stroke-muted-foreground/10"
                  )}
                  strokeDasharray={isActive ? undefined : "3 3"} />
              </g>
            )
          })}

          {/* Outgoing arrows from right side */}
          {sockets.map((s, i) => {
            const sy = hostY + 16 + i * 40
            const sh = 30
            const isActive = hovered === i
            return (
              <line key={`out-${i}`}
                x1={hostX + hostW} y1={sy + sh / 2}
                x2={VW - 10} y2={sy + sh / 2}
                className={cn("stroke-1 transition-all duration-200",
                  isActive ? "stroke-emerald-500/40" : "stroke-muted-foreground/5"
                )}
                strokeDasharray="3 3" />
            )
          })}
          <text x={VW - 8} y={hostY + hostH / 2} textAnchor="end"
            className="fill-muted-foreground/15" fontSize={6}
            transform={`rotate(-90, ${VW - 8}, ${hostY + hostH / 2})`}>
            to network
          </text>
        </svg>
      </div>
    </div>
  )
}
