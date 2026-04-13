"use client"

import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState } from "react"

const VW = 640
const VH = 310
const CLIENT_CX = 120
const SERVER_CX = 520
const NODE_W = 60
const NODE_H = 28
const WIRE_L = CLIENT_CX + NODE_W / 2 + 8
const WIRE_R = SERVER_CX - NODE_W / 2 - 8
const UDP_Y = 50
const TCP_Y = 160
const DFA_Y = 215

const SPEED = 0.04
const RETRANSMIT_WAIT = 16
const DROP_LINGER = 8
const TICK_MS = 50
const MAX_RETRANSMITS = 20

const C_STATES = ["CLOSED", "SYN_SENT", "ESTAB", "SENT", "DONE"]
const S_STATES = ["LISTEN", "SYN_RCVD", "ESTAB", "RCVD", "DONE"]

interface Pkt {
  label: string; dir: "right" | "left"
  progress: number; dropped: boolean; dropAt: number
  dead: boolean; deadTicks: number
}

function makePkt(label: string, dir: "right" | "left", dr: number): Pkt {
  const dropped = Math.random() * 100 < dr
  return { label, dir, progress: 0, dropped, dropAt: dropped ? 0.25 + Math.random() * 0.5 : 2, dead: false, deadTicks: 0 }
}

function pktX(p: Pkt): number {
  const t = Math.min(p.progress, p.dropped ? p.dropAt : 1)
  return p.dir === "right" ? WIRE_L + (WIRE_R - WIRE_L) * t : WIRE_R - (WIRE_R - WIRE_L) * t
}

type TcpStep = "idle" | "syn" | "syn_ack" | "ack" | "data" | "reply" | "done"

interface Sim {
  phase: "idle" | "running" | "done"; dropRate: number
  uPkt: Pkt | null; uReply: Pkt | null; uResult: "pending" | "ok" | "fail"
  tStep: TcpStep; tCSt: number; tSSt: number; tPkt: Pkt | null
  tWait: number; tRetransmits: number; tResult: "pending" | "ok"
  log: string[]
}

const init = (dr: number): Sim => ({
  phase: "idle", dropRate: dr,
  uPkt: null, uReply: null, uResult: "pending",
  tStep: "idle", tCSt: 0, tSSt: 0, tPkt: null, tWait: 0, tRetransmits: 0, tResult: "pending",
  log: [],
})

function log(s: Sim, m: string) { s.log = [...s.log.slice(-19), m] }

function advancePkt(p: Pkt): Pkt {
  if (p.dead) return { ...p, deadTicks: p.deadTicks + 1 }
  const next = { ...p, progress: p.progress + SPEED }
  if (next.dropped && next.progress >= next.dropAt) return { ...next, dead: true, deadTicks: 0 }
  return next
}

function tick(s: Sim): Sim {
  const n: Sim = { ...s, log: [...s.log] }

  // ── UDP ──
  if (n.uPkt) {
    n.uPkt = advancePkt(n.uPkt)
    if (n.uPkt.dead && n.uPkt.deadTicks === 0) { log(n, "UDP  ✗  request dropped"); n.uResult = "fail" }
    if (n.uPkt.dead && n.uPkt.deadTicks > DROP_LINGER) n.uPkt = null
    if (n.uPkt && !n.uPkt.dead && !n.uPkt.dropped && n.uPkt.progress >= 1) {
      log(n, "UDP  →  request arrived"); n.uPkt = null
      n.uReply = makePkt('"42 C"', "left", n.dropRate)
    }
  }
  if (n.uReply) {
    n.uReply = advancePkt(n.uReply)
    if (n.uReply.dead && n.uReply.deadTicks === 0) { log(n, "UDP  ✗  reply dropped"); n.uResult = "fail" }
    if (n.uReply.dead && n.uReply.deadTicks > DROP_LINGER) n.uReply = null
    if (n.uReply && !n.uReply.dead && !n.uReply.dropped && n.uReply.progress >= 1) {
      log(n, 'UDP  ✓  reply received — done'); n.uReply = null; n.uResult = "ok"
    }
  }

  // ── TCP ──
  if (n.tPkt) {
    n.tPkt = advancePkt(n.tPkt)
    if (n.tPkt.dead && n.tPkt.deadTicks === 0) {
      log(n, `TCP  ✗  ${n.tPkt.label} dropped — retransmit pending`); n.tWait = RETRANSMIT_WAIT
    }
    if (n.tPkt.dead && n.tPkt.deadTicks > DROP_LINGER) n.tPkt = null
    if (n.tPkt && !n.tPkt.dead && !n.tPkt.dropped && n.tPkt.progress >= 1) {
      log(n, `TCP  →  ${n.tPkt.label} arrived`)
      n.tPkt = null
      switch (n.tStep) {
        case "syn":     n.tSSt = 1; n.tStep = "syn_ack"; n.tPkt = makePkt("SYN-ACK", "left", n.dropRate); break
        case "syn_ack": n.tCSt = 2; n.tStep = "ack";     n.tPkt = makePkt("ACK", "right", n.dropRate); break
        case "ack":     n.tSSt = 2; n.tCSt = 3; n.tStep = "data"; n.tPkt = makePkt("DATA", "right", n.dropRate); log(n, "TCP  ●  connection established"); break
        case "data":    n.tSSt = 3; n.tStep = "reply";   n.tPkt = makePkt("ACK+REPLY", "left", n.dropRate); break
        case "reply":   n.tCSt = 4; n.tSSt = 4; n.tStep = "done"; n.tResult = "ok"; log(n, "TCP  ✓  conversation complete"); break
      }
    }
  }

  // TCP retransmit timer
  if (n.tStep !== "done" && n.tStep !== "idle" && !n.tPkt && n.tWait > 0) {
    n.tWait--
    if (n.tWait === 0) {
      if (n.tRetransmits >= MAX_RETRANSMITS) {
        n.tStep = "done"; n.tResult = "ok"; log(n, "TCP  ⚠  max retransmits — ending sim")
      } else {
        n.tRetransmits++
        const info = { syn: ["SYN","right"], syn_ack: ["SYN-ACK","left"], ack: ["ACK","right"], data: ["DATA","right"], reply: ["ACK+REPLY","left"] }[n.tStep]
        if (info) {
          n.tPkt = makePkt(info[0], info[1] as "right"|"left", n.dropRate)
          log(n, `TCP  ↻  retransmit ${info[0]}`)
        }
      }
    }
  }

  const uDone = n.uResult !== "pending" && !n.uPkt && !n.uReply
  const tDone = n.tStep === "done"
  if (uDone && tDone) n.phase = "done"

  return n
}

function PktVis({ pkt, y }: { pkt: Pkt; y: number }) {
  const x = pktX(pkt)
  if (pkt.dead) {
    const opacity = Math.max(0, 1 - pkt.deadTicks / DROP_LINGER)
    return (
      <g style={{ opacity }}>
        <text x={x} y={y + 4} textAnchor="middle"
          className="fill-red-500 font-bold" fontSize={14}>✗</text>
        <text x={x} y={y + 16} textAnchor="middle"
          className="fill-red-500/60" fontSize={6}>{pkt.label}</text>
      </g>
    )
  }
  const isCtrl = ["SYN", "SYN-ACK", "ACK"].includes(pkt.label)
  return (
    <g>
      <rect x={x - 18} y={y - 8} width={36} height={16} rx={3}
        className={cn("stroke-1", isCtrl ? "fill-slate-500/15 stroke-slate-500/30" : "fill-emerald-500/20 stroke-emerald-500/40")} />
      <text x={x} y={y + 3} textAnchor="middle"
        className={cn("font-bold", isCtrl ? "fill-slate-600 dark:fill-slate-300" : "fill-emerald-700 dark:fill-emerald-300")}
        fontSize={6}>{pkt.label}</text>
    </g>
  )
}

function DfaRow({ states, current, cx, y, accentFill, accentStroke, accentText }: {
  states: string[]; current: number; cx: number; y: number
  accentFill: string; accentStroke: string; accentText: string
}) {
  const R = 9
  const SPACING = 24
  const sx = cx - ((states.length - 1) * SPACING) / 2

  return (
    <g>
      {states.map((s, i) => {
        const x = sx + i * SPACING
        const isCurrent = i === current
        const isPast = i < current
        return (
          <g key={s}>
            <circle cx={x} cy={y} r={R}
              className={cn("stroke-[1.5] transition-all duration-300",
                isCurrent ? `${accentFill} ${accentStroke}` :
                isPast ? "fill-muted-foreground/5 stroke-muted-foreground/15" :
                "fill-slate-500/5 stroke-slate-500/15"
              )} />
            <text x={x} y={y + 3} textAnchor="middle"
              className={cn("font-bold transition-all", isCurrent ? accentText : "fill-muted-foreground/25")}
              fontSize={5}>{i === states.length - 1 ? "✓" : String(i)}</text>

            {/* State label below */}
            <text x={x} y={y + R + 10} textAnchor="middle"
              className={cn("transition-all", isCurrent ? accentText : "fill-muted-foreground/20")}
              fontSize={4}>{s}</text>

            {/* Arrow to next */}
            {i < states.length - 1 && (
              <line x1={x + R + 1} y1={y} x2={x + SPACING - R - 1} y2={y}
                className={cn("stroke-1", isPast || isCurrent ? "stroke-muted-foreground/20" : "stroke-muted-foreground/5")}
                markerEnd="url(#dfa-arr)" />
            )}
          </g>
        )
      })}
    </g>
  )
}

export function UDPTCPComparisonDiagram({ className }: { className?: string }) {
  const [state, setState] = useState<Sim>(init(35))
  const [dropRate, setDropRate] = useState(35)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fire = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    const s = init(dropRate)
    s.phase = "running"
    s.uPkt = makePkt('"GET_TEMP"', "right", dropRate)
    s.tStep = "syn"; s.tCSt = 1
    s.tPkt = makePkt("SYN", "right", dropRate)
    log(s, "── Fire Request ──")
    log(s, 'UDP  →  sending "GET_TEMP"')
    log(s, "TCP  →  sending SYN")
    setState(s)
    timerRef.current = setInterval(() => {
      setState(prev => prev.phase === "done" ? prev : tick(prev))
    }, TICK_MS)
  }, [dropRate])

  useEffect(() => {
    if (state.phase === "done" && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [state.phase])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const logContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
  }, [state.log.length])

  const s = state

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">UDP vs TCP — Live Comparison</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Both protocols attempt the same task over the same unreliable link. Watch what happens when packets drop.
        </p>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          <defs>
            <marker id="dfa-arr" markerWidth="4" markerHeight="4" refX="4" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4" className="fill-muted-foreground/15" />
            </marker>
          </defs>

          {/* ══════ UDP ROW ══════ */}
          <text x={20} y={UDP_Y - 22} className="fill-amber-700 dark:fill-amber-300 font-bold" fontSize={11}>
            UDP — No State Machine
          </text>
          {s.uResult === "ok" && <text x={VW - 20} y={UDP_Y - 22} textAnchor="end" className="fill-emerald-600 dark:fill-emerald-400 font-bold" fontSize={9}>✓ Success</text>}
          {s.uResult === "fail" && <text x={VW - 20} y={UDP_Y - 22} textAnchor="end" className="fill-red-500 font-bold" fontSize={9}>✗ Lost — no retry</text>}

          {/* Client */}
          <rect x={CLIENT_CX - NODE_W / 2} y={UDP_Y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={5}
            className="fill-blue-500/10 stroke-blue-500/40 stroke-[1.5]" />
          <text x={CLIENT_CX} y={UDP_Y + 4} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={8}>Client</text>

          {/* Server */}
          <rect x={SERVER_CX - NODE_W / 2} y={UDP_Y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={5}
            className="fill-purple-500/10 stroke-purple-500/40 stroke-[1.5]" />
          <text x={SERVER_CX} y={UDP_Y + 4} textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={8}>Server</text>

          {/* Wire */}
          <line x1={WIRE_L} y1={UDP_Y} x2={WIRE_R} y2={UDP_Y}
            className="stroke-muted-foreground/10 stroke-[1.5]" strokeDasharray="4 3" />

          {/* Packets */}
          {s.uPkt && <PktVis pkt={s.uPkt} y={UDP_Y} />}
          {s.uReply && <PktVis pkt={s.uReply} y={UDP_Y} />}

          {/* Label */}
          <text x={VW / 2} y={UDP_Y + 26} textAnchor="middle"
            className="fill-muted-foreground/20" fontSize={7}>
            one shot — fire and forget
          </text>

          {/* ══════ DIVIDER ══════ */}
          <line x1={20} y1={108} x2={VW - 20} y2={108}
            className="stroke-border/30" strokeDasharray="3 3" />
          <text x={VW / 2} y={105} textAnchor="middle"
            className="fill-muted-foreground/15 font-bold" fontSize={7}>same IP layer underneath</text>

          {/* ══════ TCP ROW ══════ */}
          <text x={20} y={TCP_Y - 25} className="fill-blue-700 dark:fill-blue-300 font-bold" fontSize={11}>
            TCP — Coordinating State Machines
          </text>
          {s.tResult === "ok" && <text x={VW - 20} y={TCP_Y - 25} textAnchor="end" className="fill-emerald-600 dark:fill-emerald-400 font-bold" fontSize={9}>✓ Complete</text>}
          {s.tRetransmits > 0 && s.tResult !== "ok" && (
            <text x={VW - 20} y={TCP_Y - 25} textAnchor="end" className="fill-amber-600 dark:fill-amber-400 font-mono" fontSize={8}>
              retransmits: {s.tRetransmits}
            </text>
          )}

          {/* Client */}
          <rect x={CLIENT_CX - NODE_W / 2} y={TCP_Y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={5}
            className="fill-blue-500/10 stroke-blue-500/40 stroke-[1.5]" />
          <text x={CLIENT_CX} y={TCP_Y + 4} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={8}>Client</text>

          {/* Server */}
          <rect x={SERVER_CX - NODE_W / 2} y={TCP_Y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={5}
            className="fill-purple-500/10 stroke-purple-500/40 stroke-[1.5]" />
          <text x={SERVER_CX} y={TCP_Y + 4} textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={8}>Server</text>

          {/* Wire */}
          <line x1={WIRE_L} y1={TCP_Y} x2={WIRE_R} y2={TCP_Y}
            className="stroke-muted-foreground/10 stroke-[1.5]" strokeDasharray="4 3" />

          {/* Retransmit timer indicator */}
          {s.tWait > 0 && !s.tPkt && (
            <text x={VW / 2} y={TCP_Y + 4} textAnchor="middle"
              className="fill-amber-500 font-mono animate-pulse" fontSize={8}>
              ⏱ retransmit in {s.tWait}...
            </text>
          )}

          {/* Packets */}
          {s.tPkt && <PktVis pkt={s.tPkt} y={TCP_Y} />}

          {/* ── DFA States ── */}
          <text x={CLIENT_CX} y={DFA_Y - 16} textAnchor="middle"
            className="fill-muted-foreground/25 font-semibold" fontSize={6}>Client State</text>
          <DfaRow states={C_STATES} current={s.tCSt} cx={CLIENT_CX} y={DFA_Y}
            accentFill="fill-blue-500/20" accentStroke="stroke-blue-500/50" accentText="fill-blue-700 dark:fill-blue-300" />

          <text x={SERVER_CX} y={DFA_Y - 16} textAnchor="middle"
            className="fill-muted-foreground/25 font-semibold" fontSize={6}>Server State</text>
          <DfaRow states={S_STATES} current={s.tSSt} cx={SERVER_CX} y={DFA_Y}
            accentFill="fill-purple-500/20" accentStroke="stroke-purple-500/50" accentText="fill-purple-700 dark:fill-purple-300" />

          {/* Step label */}
          <text x={VW / 2} y={DFA_Y} textAnchor="middle"
            className="fill-muted-foreground/20 font-semibold" fontSize={7}>
            {s.tStep === "idle" ? "waiting to start" :
             s.tStep === "done" ? "conversation complete" :
             `phase: ${s.tStep.replace("_", "-")}`}
          </text>

          {/* Shared IP base */}
          <rect x={60} y={VH - 22} width={VW - 120} height={16} rx={4}
            className="fill-slate-500/5 stroke-slate-500/10 stroke-1" />
          <text x={VW / 2} y={VH - 11} textAnchor="middle"
            className="fill-muted-foreground/20 font-semibold" fontSize={7}>
            IP Layer — shared by both protocols
          </text>
        </svg>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button onClick={fire}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-semibold border transition-colors",
              s.phase === "running"
                ? "bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-300"
                : "bg-primary/10 border-primary/40 text-primary hover:bg-primary/20"
            )}>
            {s.phase === "running" ? "Running..." : s.phase === "done" ? "Fire Again" : "Fire Request"}
          </button>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground font-medium">Drop rate:</label>
            <input type="range" min={0} max={80} value={dropRate}
              onChange={e => setDropRate(Number(e.target.value))}
              className="w-24 accent-rose-500" />
            <span className="text-xs font-mono text-muted-foreground w-8">{dropRate}%</span>
          </div>
        </div>

        {/* Event Log */}
        {s.log.length > 0 && (
          <div ref={logContainerRef} className="mt-3 border rounded-md bg-muted/30 max-h-32 overflow-y-auto">
            <div className="px-3 py-2 space-y-0.5">
              {s.log.map((l, i) => (
                <div key={i} className={cn("text-xs font-mono",
                  l.includes("✓") ? "text-emerald-600 dark:text-emerald-400" :
                  l.includes("✗") ? "text-red-500" :
                  l.includes("↻") || l.includes("retransmit") ? "text-amber-600 dark:text-amber-400" :
                  l.includes("──") ? "text-foreground/60 font-bold" :
                  "text-muted-foreground"
                )}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
