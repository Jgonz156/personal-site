"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 640
const VH = 300

interface ClientDef {
  ip: string; eport: string; color: string; textColor: string
}

const clients: ClientDef[] = [
  { ip: "192.168.1.10", eport: "53014", color: "fill-blue-500/15 stroke-blue-500/40",     textColor: "fill-blue-700 dark:fill-blue-300" },
  { ip: "10.0.2.7",     eport: "49221", color: "fill-emerald-500/15 stroke-emerald-500/40", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { ip: "172.16.0.3",   eport: "61002", color: "fill-rose-500/15 stroke-rose-500/40",      textColor: "fill-rose-700 dark:fill-rose-300" },
]

interface StepDef {
  title: string
  description: string
  listenVisible: boolean
  connectedSockets: number
  activeClient: number | null
  showArrow: number | null
}

const steps: StepDef[] = [
  {
    title: "Server Binds & Listens on Port 80",
    description: "The server calls bind() on port 80 and then listen(). The socket is now a front door — ready to accept incoming connections.",
    listenVisible: true, connectedSockets: 0, activeClient: null, showArrow: null,
  },
  {
    title: "Client 1 Connects",
    description: "Client 1 (192.168.1.10) calls connect() targeting port 80. The OS auto-assigns ephemeral port 53014. An arrow reaches the server's listening socket.",
    listenVisible: true, connectedSockets: 0, activeClient: 0, showArrow: 0,
  },
  {
    title: "accept() Creates a New Socket",
    description: "The server calls accept(). A brand new socket is created for this specific 4-tuple. The listening socket stays open — port 80 is still available for more clients.",
    listenVisible: true, connectedSockets: 1, activeClient: 0, showArrow: null,
  },
  {
    title: "Client 2 Connects",
    description: "A second client (10.0.2.7:49221) connects to port 80. The listening socket handles the rendezvous again.",
    listenVisible: true, connectedSockets: 1, activeClient: 1, showArrow: 1,
  },
  {
    title: "accept() Creates Another Socket",
    description: "accept() fires again. A new socket is created with a different 4-tuple. Both conversations coexist because the full 4-tuples are distinct.",
    listenVisible: true, connectedSockets: 2, activeClient: 1, showArrow: null,
  },
  {
    title: "Client 3 Connects",
    description: "A third client (172.16.0.3:61002) connects. The pattern repeats — the well-known port never fills up.",
    listenVisible: true, connectedSockets: 2, activeClient: 2, showArrow: 2,
  },
  {
    title: "Three Simultaneous Conversations",
    description: "The server now has three active sockets plus the original listener. Port 80 is the front door; the 4-tuple is the meeting room. The building never runs out of space.",
    listenVisible: true, connectedSockets: 3, activeClient: null, showArrow: null,
  },
]

const SERVER_X = 420
const SERVER_W = 180
const CLIENT_X = 40
const CLIENT_W = 120

export function PortAcceptStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]

  const listenY = 50
  const socketStartY = 95

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold">{s.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap ml-2">{step + 1} / {steps.length}</span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          {/* ── Server Side ── */}
          <text x={SERVER_X + SERVER_W / 2} y={20} textAnchor="middle"
            className="fill-foreground/60 font-bold" fontSize={10}>Server (203.0.113.10)</text>

          {/* Listening socket */}
          {s.listenVisible && (
            <g>
              <rect x={SERVER_X} y={listenY} width={SERVER_W} height={30} rx={6}
                className="fill-amber-500/15 stroke-amber-500/50 stroke-[1.5]" />
              <text x={SERVER_X + 10} y={listenY + 19} className="fill-amber-700 dark:fill-amber-300 font-semibold" fontSize={8}>
                ⦿ LISTENING
              </text>
              <text x={SERVER_X + SERVER_W - 10} y={listenY + 19} textAnchor="end"
                className="fill-amber-600 dark:fill-amber-400 font-mono" fontSize={8}>
                :80
              </text>
            </g>
          )}

          {/* Connected sockets */}
          {Array.from({ length: s.connectedSockets }).map((_, i) => {
            const c = clients[i]
            const sy = socketStartY + i * 55
            return (
              <g key={`conn-${i}`}>
                <rect x={SERVER_X} y={sy} width={SERVER_W} height={45} rx={5}
                  className={cn("stroke-[1.5]", c.color)} />
                <text x={SERVER_X + 10} y={sy + 15}
                  className={cn("font-semibold", c.textColor)} fontSize={7}>
                  Connected Socket
                </text>
                <text x={SERVER_X + 10} y={sy + 28}
                  className="fill-muted-foreground/40 font-mono" fontSize={6}>
                  {c.ip}:{c.eport} ↔ 203.0.113.10:80
                </text>
                <text x={SERVER_X + 10} y={sy + 39}
                  className="fill-muted-foreground/25 font-mono" fontSize={5}>
                  4-tuple #{i + 1}
                </text>

                {/* Line from client to connected socket */}
                <line x1={CLIENT_X + CLIENT_W} y1={60 + i * 70 + 15}
                  x2={SERVER_X} y2={sy + 22}
                  className={cn("stroke-1", c.color.replace("fill-", "stroke-").split(" ")[0].replace("/15", "/30"))}
                  strokeDasharray="4 3" />
              </g>
            )
          })}

          {/* ── Client Side ── */}
          <text x={CLIENT_X + CLIENT_W / 2} y={20} textAnchor="middle"
            className="fill-foreground/60 font-bold" fontSize={10}>Clients</text>

          {clients.map((c, i) => {
            const cy = 40 + i * 70
            const visible = i <= (s.connectedSockets - 1) || s.activeClient === i || i < s.connectedSockets
            const isActive = s.activeClient === i

            if (!visible && s.activeClient !== i) return null

            return (
              <g key={`client-${i}`}>
                <rect x={CLIENT_X} y={cy} width={CLIENT_W} height={45} rx={5}
                  className={cn("stroke-[1.5] transition-all",
                    isActive ? c.color : i < s.connectedSockets ? c.color : "fill-slate-500/5 stroke-slate-500/15"
                  )} />
                <text x={CLIENT_X + CLIENT_W / 2} y={cy + 16} textAnchor="middle"
                  className={cn("font-semibold", isActive || i < s.connectedSockets ? c.textColor : "fill-muted-foreground/40")} fontSize={8}>
                  Client {i + 1}
                </text>
                <text x={CLIENT_X + CLIENT_W / 2} y={cy + 29} textAnchor="middle"
                  className="fill-muted-foreground/30 font-mono" fontSize={6}>
                  {c.ip}
                </text>
                <text x={CLIENT_X + CLIENT_W / 2} y={cy + 40} textAnchor="middle"
                  className="fill-muted-foreground/20 font-mono" fontSize={6}>
                  ephemeral :{c.eport}
                </text>
              </g>
            )
          })}

          {/* Active connection arrow (during connect phases) */}
          {s.showArrow !== null && (() => {
            const i = s.showArrow
            const cy = 40 + i * 70 + 15
            return (
              <line x1={CLIENT_X + CLIENT_W} y1={cy}
                x2={SERVER_X} y2={listenY + 15}
                className="stroke-amber-500/50 stroke-[2]"
                strokeDasharray="6 3" />
            )
          })()}

          {/* Legend at bottom */}
          <text x={VW / 2} y={VH - 10} textAnchor="middle"
            className="fill-muted-foreground/20" fontSize={7}>
            Well-known port = front door · 4-tuple = private room · accept() = doorman
          </text>
        </svg>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <button onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-30 hover:bg-muted">
            ← Previous
          </button>
          <button onClick={() => setStep(0)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors hover:bg-muted">
            Reset
          </button>
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-30 hover:bg-muted">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
