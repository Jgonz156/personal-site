"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type Variant = "unix" | "inet"

const apiSteps = ["socket()", "bind()", "listen()", "accept()", "connect()", "read/write()"]

const VW = 320
const VH = 310

function SocketHalf({ variant, dimmed }: { variant: Variant; dimmed: boolean }) {
  const isUnix = variant === "unix"
  const title = isUnix ? "AF_UNIX (Local)" : "AF_INET (Network)"
  const addr = isUnix ? "/tmp/sensor.sock" : "192.168.1.10:8080"
  const transport = isUnix ? "Kernel Buffer" : "Network"
  const transportColor = isUnix
    ? "fill-blue-500/15 stroke-blue-500/50"
    : "fill-amber-500/15 stroke-amber-500/50"
  const transportText = isUnix
    ? "fill-blue-700 dark:fill-blue-300"
    : "fill-amber-700 dark:fill-amber-300"

  const serverX = 60; const clientX = 200
  const boxY = 60; const boxW = 80; const boxH = 50

  const apiLabelsServer = ["socket()", "bind()", "listen()", "accept()"]
  const apiLabelsClient = ["socket()", "connect()"]

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className={cn(
      "w-full transition-opacity duration-300",
      dimmed && "opacity-25"
    )}>
      {/* Title */}
      <text x={VW / 2} y={18} textAnchor="middle"
        className={cn("font-bold", isUnix
          ? "fill-blue-700 dark:fill-blue-300"
          : "fill-amber-700 dark:fill-amber-300"
        )} fontSize={12}>
        {title}
      </text>
      <text x={VW / 2} y={34} textAnchor="middle"
        className="fill-muted-foreground/40 font-mono" fontSize={8}>
        {addr}
      </text>

      {/* Server box */}
      <rect x={serverX - boxW / 2} y={boxY} width={boxW} height={boxH} rx={6}
        className="fill-green-500/15 stroke-green-500/50 stroke-2" />
      <text x={serverX} y={boxY + 22} textAnchor="middle"
        className="fill-green-700 dark:fill-green-300 font-semibold" fontSize={11}>Server</text>
      <text x={serverX} y={boxY + 38} textAnchor="middle"
        className="fill-muted-foreground/40" fontSize={7}>listener</text>

      {/* Server API labels */}
      {apiLabelsServer.map((label, i) => (
        <text key={label} x={serverX} y={boxY + boxH + 16 + i * 14} textAnchor="middle"
          className="fill-muted-foreground/50 font-mono" fontSize={7}>{label}</text>
      ))}

      {/* Client box */}
      <rect x={clientX - boxW / 2} y={boxY} width={boxW} height={boxH} rx={6}
        className="fill-purple-500/15 stroke-purple-500/50 stroke-2" />
      <text x={clientX} y={boxY + 22} textAnchor="middle"
        className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={11}>Client</text>
      <text x={clientX} y={boxY + 38} textAnchor="middle"
        className="fill-muted-foreground/40" fontSize={7}>connector</text>

      {/* Client API labels */}
      {apiLabelsClient.map((label, i) => (
        <text key={label} x={clientX} y={boxY + boxH + 16 + i * 14} textAnchor="middle"
          className="fill-muted-foreground/50 font-mono" fontSize={7}>{label}</text>
      ))}

      {/* Transport / connection */}
      <rect x={VW / 2 - 55} y={200} width={110} height={36} rx={6}
        className={cn("stroke-2", transportColor)} />
      <text x={VW / 2} y={215} textAnchor="middle"
        className={cn("font-semibold", transportText)} fontSize={10}>{transport}</text>
      <text x={VW / 2} y={228} textAnchor="middle"
        className="fill-muted-foreground/40" fontSize={7}>
        {isUnix ? "local, no network stack" : "TCP/IP, crosses machines"}
      </text>

      {/* Bidirectional arrows */}
      <line x1={serverX} y1={boxY + boxH + 60} x2={VW / 2 - 55} y2={218}
        className="stroke-muted-foreground/30 stroke-1" />
      <line x1={clientX} y1={boxY + boxH + 32} x2={VW / 2 + 55} y2={218}
        className="stroke-muted-foreground/30 stroke-1" />

      {/* ↔ bidirectional label */}
      <text x={VW / 2} y={252} textAnchor="middle"
        className="fill-muted-foreground/30" fontSize={8}>↔ bidirectional ↔</text>

      {/* read/write at the bottom */}
      <text x={VW / 2} y={274} textAnchor="middle"
        className="fill-muted-foreground/50 font-mono" fontSize={8}>read() / write()</text>

      {/* Emphasis for network variant */}
      {!isUnix && (
        <g>
          <line x1={VW / 2 - 60} y1={290} x2={VW / 2 + 60} y2={290}
            className="stroke-amber-500/40 stroke-2" strokeDasharray="6 3" />
          <text x={VW / 2} y={304} textAnchor="middle"
            className="fill-amber-600/40 dark:fill-amber-400/30" fontSize={7}>
            network wire
          </text>
        </g>
      )}
    </svg>
  )
}

export function SocketComparisonDiagram({ className }: { className?: string }) {
  const [highlight, setHighlight] = useState<Variant | null>(null)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Unix Domain Socket vs. Network Socket</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Same API. Same programming model. Only the address family changes.
        </p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div
            className={cn("cursor-pointer rounded-lg border p-2 transition-all",
              highlight === "unix" ? "border-blue-500/50 bg-blue-500/5" :
              highlight === null ? "border-border/50" : "border-border/20"
            )}
            onClick={() => setHighlight(highlight === "unix" ? null : "unix")}
          >
            <SocketHalf variant="unix" dimmed={highlight === "inet"} />
          </div>
          <div
            className={cn("cursor-pointer rounded-lg border p-2 transition-all",
              highlight === "inet" ? "border-amber-500/50 bg-amber-500/5" :
              highlight === null ? "border-border/50" : "border-border/20"
            )}
            onClick={() => setHighlight(highlight === "inet" ? null : "inet")}
          >
            <SocketHalf variant="inet" dimmed={highlight === "unix"} />
          </div>
        </div>

        {/* The one-line difference */}
        <div className="mt-3 p-2.5 rounded border bg-muted/30">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-blue-500/30 border border-blue-500/50" />
              <code className="text-blue-700 dark:text-blue-300">AF_UNIX</code>
            </div>
            <span className="text-muted-foreground">→</span>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-amber-500/30 border border-amber-500/50" />
              <code className="text-amber-700 dark:text-amber-300">AF_INET</code>
            </div>
            <span className="text-muted-foreground text-[11px] ml-1">
              — one constant changes. The rest of the code is identical.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
