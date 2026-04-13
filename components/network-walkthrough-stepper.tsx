"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 680
const VH = 320

interface StepDef {
  title: string
  description: string
  serverHighlight: string[]
  clientHighlight: string[]
  wire: boolean
  strace?: string
  concept: string
  side: "server" | "client" | "both"
}

const steps: StepDef[] = [
  {
    title: "Overview",
    description: "A minimal TCP exchange over loopback: nc listens on port 4000, another nc connects and sends \"GET_TEMP\". The full socket lifecycle from LN22 plays out — observable through strace and ss.",
    serverHighlight: ["socket", "bind", "listen", "accept", "read", "data"],
    clientHighlight: ["socket_c", "connect", "write"],
    wire: true, concept: "Full socket lifecycle", side: "both",
  },
  {
    title: "Server: socket()",
    description: "The server process calls socket(AF_INET, SOCK_STREAM, 0) to create a TCP endpoint. The kernel allocates a socket structure and returns a file descriptor — the same handle abstraction from LN18, now backed by the transport layer.",
    serverHighlight: ["socket"],
    clientHighlight: [],
    wire: false, strace: "socket(AF_INET, SOCK_STREAM, 0) = 3",
    concept: "Socket as handle (LN22)", side: "server",
  },
  {
    title: "Server: bind()",
    description: "bind() attaches the socket to port 4000 on all interfaces (0.0.0.0). This reserves the port for this process — the naming step that lets clients find the server.",
    serverHighlight: ["socket", "bind"],
    clientHighlight: [],
    wire: false, strace: "bind(3, {sin_port=htons(4000)}, 16) = 0",
    concept: "Port-based naming (LN22)", side: "server",
  },
  {
    title: "Server: listen()",
    description: "listen() marks the socket as passive — it will accept incoming connections rather than initiate them. The kernel begins maintaining a connection queue for this socket.",
    serverHighlight: ["socket", "bind", "listen"],
    clientHighlight: [],
    wire: false, strace: "listen(3, 1) = 0",
    concept: "Well-known port discovery (LN22)", side: "server",
  },
  {
    title: "Server: accept() blocks",
    description: "accept() blocks the server process — it sleeps until a client connection arrives. This is the same blocking I/O pattern from our scheduling and waiting discussions: the process yields the CPU and the kernel will wake it when there is work to do.",
    serverHighlight: ["socket", "bind", "listen", "accept"],
    clientHighlight: [],
    wire: false, strace: "accept(3, ...) = [blocked, sleeping]",
    concept: "Blocking I/O (LN22, LN10)", side: "server",
  },
  {
    title: "Client: socket() + connect()",
    description: "The client creates its own socket and calls connect() to initiate the TCP three-way handshake with 127.0.0.1:4000. The kernel exchanges SYN, SYN-ACK, and ACK packets through the loopback interface — the full network stack runs even on localhost.",
    serverHighlight: ["socket", "bind", "listen", "accept"],
    clientHighlight: ["socket_c", "connect"],
    wire: true, strace: "connect(3, {sin_port=htons(4000), sin_addr=\"127.0.0.1\"}, 16) = 0",
    concept: "TCP handshake (LN22)", side: "client",
  },
  {
    title: "accept() returns — new connected socket",
    description: "The handshake wakes the server. accept() returns a new file descriptor (fd 4) representing the connected conversation. The listening socket (fd 3) remains open for future clients — the same accept() pattern from the port-accept visual in LN22.",
    serverHighlight: ["socket", "bind", "listen", "accept", "connected"],
    clientHighlight: ["socket_c", "connect"],
    wire: true, strace: "accept(3, {sin_port=htons(54321)}, ...) = 4",
    concept: "Accept returns new fd (LN22)", side: "both",
  },
  {
    title: "Client: write() sends data",
    description: "The client calls write(fd, \"GET_TEMP\", 9). The kernel wraps the data in TCP and IP headers, builds a loopback frame, and delivers it through the protocol stack — the same layering from LN21, just short-circuiting the NIC.",
    serverHighlight: ["accept", "connected"],
    clientHighlight: ["socket_c", "connect", "write"],
    wire: true, strace: "write(3, \"GET_TEMP\\n\", 9) = 9",
    concept: "Transport layer + packet path (LN21/22)", side: "client",
  },
  {
    title: "Server: read() receives data",
    description: "The server calls read() on the connected socket (fd 4) and receives \"GET_TEMP\". The kernel stripped the transport and network headers, delivering only the application payload — the same decapsulation from the receive path in LN21.",
    serverHighlight: ["connected", "read", "data"],
    clientHighlight: ["write"],
    wire: true, strace: "read(4, \"GET_TEMP\\n\", 1024) = 9",
    concept: "Receive path + decapsulation (LN21)", side: "server",
  },
]

const SERVER_X = 80
const CLIENT_X = 490
const COL_W = 130
const NODE_H = 28
const NODE_GAP = 6

interface VisNode {
  id: string
  label: string
  x: number
  yIdx: number
  accent: { fill: string; stroke: string; text: string }
}

const serverNodes: VisNode[] = [
  { id: "socket",    label: "socket()",   x: SERVER_X, yIdx: 0,
    accent: { fill: "fill-blue-500/15",    stroke: "stroke-blue-500/50",    text: "fill-blue-700 dark:fill-blue-300" } },
  { id: "bind",      label: "bind(:4000)", x: SERVER_X, yIdx: 1,
    accent: { fill: "fill-purple-500/15",  stroke: "stroke-purple-500/50",  text: "fill-purple-700 dark:fill-purple-300" } },
  { id: "listen",    label: "listen()",   x: SERVER_X, yIdx: 2,
    accent: { fill: "fill-amber-500/15",   stroke: "stroke-amber-500/50",   text: "fill-amber-700 dark:fill-amber-300" } },
  { id: "accept",    label: "accept()",   x: SERVER_X, yIdx: 3,
    accent: { fill: "fill-orange-500/15",  stroke: "stroke-orange-500/50",  text: "fill-orange-700 dark:fill-orange-300" } },
  { id: "connected", label: "fd 4 (conn)", x: SERVER_X, yIdx: 4,
    accent: { fill: "fill-teal-500/15",    stroke: "stroke-teal-500/50",    text: "fill-teal-700 dark:fill-teal-300" } },
  { id: "read",      label: "read(fd4)",  x: SERVER_X, yIdx: 5,
    accent: { fill: "fill-cyan-500/15",    stroke: "stroke-cyan-500/50",    text: "fill-cyan-700 dark:fill-cyan-300" } },
  { id: "data",      label: "\"GET_TEMP\"", x: SERVER_X, yIdx: 6,
    accent: { fill: "fill-emerald-500/15", stroke: "stroke-emerald-500/50", text: "fill-emerald-700 dark:fill-emerald-300" } },
]

const clientNodes: VisNode[] = [
  { id: "socket_c", label: "socket()",   x: CLIENT_X, yIdx: 0,
    accent: { fill: "fill-blue-500/15",   stroke: "stroke-blue-500/50",   text: "fill-blue-700 dark:fill-blue-300" } },
  { id: "connect",  label: "connect()",  x: CLIENT_X, yIdx: 1,
    accent: { fill: "fill-green-500/15",  stroke: "stroke-green-500/50",  text: "fill-green-700 dark:fill-green-300" } },
  { id: "write",    label: "write()",    x: CLIENT_X, yIdx: 2,
    accent: { fill: "fill-rose-500/15",   stroke: "stroke-rose-500/50",   text: "fill-rose-700 dark:fill-rose-300" } },
]

function nodeY(idx: number): number {
  return 50 + idx * (NODE_H + NODE_GAP)
}

export function NetworkWalkthroughStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]
  const serverSet = new Set(s.serverHighlight)
  const clientSet = new Set(s.clientHighlight)

  const sideColor = s.side === "server"
    ? "text-blue-600 dark:text-blue-400"
    : s.side === "client"
    ? "text-green-600 dark:text-green-400"
    : "text-foreground/60"

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold">{s.title}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-medium text-muted-foreground">
              {s.concept}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
          {step === 0 ? "Overview" : `${step} / ${steps.length - 1}`}
        </span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          <defs>
            <marker id="nw-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary/60" />
            </marker>
          </defs>

          {/* Column headers */}
          <text x={SERVER_X + COL_W / 2} y={28} textAnchor="middle"
            className={cn("font-bold transition-all duration-300",
              s.side === "server" || s.side === "both" ? "fill-blue-700 dark:fill-blue-300" : "fill-muted-foreground/30"
            )} fontSize={11}>
            Server (nc -l 4000)
          </text>
          <text x={CLIENT_X + COL_W / 2} y={28} textAnchor="middle"
            className={cn("font-bold transition-all duration-300",
              s.side === "client" || s.side === "both" ? "fill-green-700 dark:fill-green-300" : "fill-muted-foreground/30"
            )} fontSize={11}>
            Client (nc 127.0.0.1 4000)
          </text>

          {/* Server nodes */}
          {serverNodes.map((n) => {
            const lit = serverSet.has(n.id)
            const y = nodeY(n.yIdx)
            return (
              <g key={n.id} className="transition-all duration-300">
                <rect x={n.x} y={y} width={COL_W} height={NODE_H} rx={5}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    lit ? n.accent.fill : "fill-muted/20",
                    lit ? n.accent.stroke : "stroke-border/10",
                  )} />
                <text x={n.x + COL_W / 2} y={y + NODE_H / 2 + 4} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    lit ? n.accent.text : "fill-muted-foreground/15"
                  )} fontSize={9}>
                  {n.label}
                </text>
              </g>
            )
          })}

          {/* Server flow arrows */}
          {serverNodes.slice(0, -1).map((n, i) => {
            const fromLit = serverSet.has(n.id)
            const toLit = serverSet.has(serverNodes[i + 1].id)
            const lit = fromLit && toLit && step !== 0
            const y1 = nodeY(n.yIdx) + NODE_H
            const y2 = nodeY(n.yIdx + 1)
            return (
              <line key={`sa-${i}`} x1={n.x + COL_W / 2} y1={y1}
                x2={n.x + COL_W / 2} y2={y2}
                className={cn("stroke-1 transition-all duration-300",
                  lit ? "stroke-primary/40" : "stroke-border/10"
                )}
                markerEnd={lit ? "url(#nw-arr)" : undefined}
              />
            )
          })}

          {/* Client nodes */}
          {clientNodes.map((n) => {
            const lit = clientSet.has(n.id)
            const y = nodeY(n.yIdx)
            return (
              <g key={n.id} className="transition-all duration-300">
                <rect x={n.x} y={y} width={COL_W} height={NODE_H} rx={5}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    lit ? n.accent.fill : "fill-muted/20",
                    lit ? n.accent.stroke : "stroke-border/10",
                  )} />
                <text x={n.x + COL_W / 2} y={y + NODE_H / 2 + 4} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    lit ? n.accent.text : "fill-muted-foreground/15"
                  )} fontSize={9}>
                  {n.label}
                </text>
              </g>
            )
          })}

          {/* Client flow arrows */}
          {clientNodes.slice(0, -1).map((n, i) => {
            const fromLit = clientSet.has(n.id)
            const toLit = clientSet.has(clientNodes[i + 1].id)
            const lit = fromLit && toLit && step !== 0
            const y1 = nodeY(n.yIdx) + NODE_H
            const y2 = nodeY(n.yIdx + 1)
            return (
              <line key={`ca-${i}`} x1={n.x + COL_W / 2} y1={y1}
                x2={n.x + COL_W / 2} y2={y2}
                className={cn("stroke-1 transition-all duration-300",
                  lit ? "stroke-primary/40" : "stroke-border/10"
                )}
                markerEnd={lit ? "url(#nw-arr)" : undefined}
              />
            )
          })}

          {/* Wire / loopback connection */}
          {(() => {
            const wireY = nodeY(1) + NODE_H / 2
            const lit = s.wire && step !== 0
            return (
              <g>
                <line x1={SERVER_X + COL_W} y1={wireY}
                  x2={CLIENT_X} y2={wireY}
                  className={cn("transition-all duration-300",
                    lit ? "stroke-amber-500/50 stroke-[2]" : "stroke-border/10 stroke-1"
                  )}
                  strokeDasharray={lit ? "6 4" : "4 3"}
                />
                {lit && (
                  <text x={(SERVER_X + COL_W + CLIENT_X) / 2} y={wireY - 8}
                    textAnchor="middle"
                    className="fill-amber-600/50 dark:fill-amber-400/40" fontSize={7}>
                    loopback (127.0.0.1)
                  </text>
                )}
                {!lit && step === 0 && (
                  <text x={(SERVER_X + COL_W + CLIENT_X) / 2} y={wireY - 8}
                    textAnchor="middle"
                    className="fill-muted-foreground/15" fontSize={7}>
                    loopback (127.0.0.1)
                  </text>
                )}
              </g>
            )
          })()}

          {/* Data flow arrow (write → read) */}
          {step >= 7 && (
            <g>
              <path
                d={`M ${CLIENT_X} ${nodeY(2) + NODE_H / 2} Q ${(SERVER_X + COL_W + CLIENT_X) / 2} ${nodeY(4)}, ${SERVER_X + COL_W} ${nodeY(5) + NODE_H / 2}`}
                fill="none"
                className="stroke-emerald-500/50 stroke-[1.5] transition-all duration-300"
                strokeDasharray="5 3"
                markerEnd="url(#nw-arr)"
              />
              <text
                x={(SERVER_X + COL_W + CLIENT_X) / 2}
                y={nodeY(3) + NODE_H / 2 + 15}
                textAnchor="middle"
                className="fill-emerald-600/40 dark:fill-emerald-400/30" fontSize={7}>
                &quot;GET_TEMP&quot; over TCP
              </text>
            </g>
          )}

          {/* Sleeping indicator on accept */}
          {step === 4 && (
            <text x={SERVER_X + COL_W + 10} y={nodeY(3) + NODE_H / 2 + 4}
              className="fill-red-500/60 font-semibold" fontSize={8}>
              💤 blocked
            </text>
          )}

          {/* ss output hint */}
          {(step === 3 || step === 4) && (
            <g>
              <rect x={220} y={VH - 40} width={240} height={26} rx={4}
                className="fill-slate-500/5 stroke-slate-500/15 stroke-1" />
              <text x={340} y={VH - 23} textAnchor="middle"
                className="fill-muted-foreground/40 font-mono" fontSize={7}>
                ss -tlnp → LISTEN 0.0.0.0:4000
              </text>
            </g>
          )}
          {step >= 6 && (
            <g>
              <rect x={200} y={VH - 40} width={280} height={26} rx={4}
                className="fill-slate-500/5 stroke-slate-500/15 stroke-1" />
              <text x={340} y={VH - 23} textAnchor="middle"
                className="fill-muted-foreground/40 font-mono" fontSize={7}>
                ss -tnp → ESTAB 127.0.0.1:4000 ↔ 127.0.0.1:54321
              </text>
            </g>
          )}
        </svg>

        {/* strace callout */}
        {s.strace && (
          <div className="mt-2 px-3 py-1.5 rounded bg-muted/50 border border-border/50 text-xs font-mono text-muted-foreground">
            <span className={cn("font-semibold mr-1.5", sideColor)}>
              {s.side === "both" ? "strace:" : s.side === "server" ? "server strace:" : "client strace:"}
            </span>
            {s.strace}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 rounded-md text-xs font-medium border disabled:opacity-30 hover:bg-muted transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => setStep(0)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-muted transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1.5 rounded-md text-xs font-medium border disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
