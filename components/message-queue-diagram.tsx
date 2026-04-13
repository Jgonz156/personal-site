"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface MessageDef {
  type: number
  label: string
  color: string
}

interface StepDef {
  description: string
  queue: MessageDef[]
  senderState: "active" | "idle"
  receiverState: "active" | "idle" | "waiting"
  sending?: MessageDef
  receiving?: boolean
}

const MSG_COLORS: Record<number, string> = {
  1: "fill-blue-500/30 stroke-blue-500/60",
  2: "fill-purple-500/30 stroke-purple-500/60",
  3: "fill-orange-500/30 stroke-orange-500/60",
}
const MSG_TEXT: Record<number, string> = {
  1: "fill-blue-700 dark:fill-blue-300",
  2: "fill-purple-700 dark:fill-purple-300",
  3: "fill-orange-700 dark:fill-orange-300",
}

const steps: StepDef[] = [
  {
    description: "The message queue is empty. Receiver calls mq_receive() — it blocks until a message arrives.",
    queue: [],
    senderState: "idle",
    receiverState: "waiting",
  },
  {
    description: "Sender sends a Type 1 message (\"compress\"). The kernel stores the complete message with its boundaries intact.",
    queue: [{ type: 1, label: "compress", color: "blue" }],
    senderState: "active",
    receiverState: "waiting",
    sending: { type: 1, label: "compress", color: "blue" },
  },
  {
    description: "Sender sends two more messages — a Type 2 (\"archive\") and a Type 3 (\"notify\"). Each is a discrete unit, never merged.",
    queue: [
      { type: 1, label: "compress", color: "blue" },
      { type: 2, label: "archive", color: "purple" },
      { type: 3, label: "notify", color: "orange" },
    ],
    senderState: "active",
    receiverState: "waiting",
  },
  {
    description: "Receiver reads from the queue. It receives exactly one complete message — \"compress\" — with boundaries preserved by the kernel.",
    queue: [
      { type: 2, label: "archive", color: "purple" },
      { type: 3, label: "notify", color: "orange" },
    ],
    senderState: "idle",
    receiverState: "active",
    receiving: true,
  },
  {
    description: "Receiver reads the next message. Each mq_receive() returns one intact message — no framing, no parsing, no off-by-one errors.",
    queue: [
      { type: 3, label: "notify", color: "orange" },
    ],
    senderState: "idle",
    receiverState: "active",
    receiving: true,
  },
]

const VW = 580
const VH = 180
const QUEUE_X = 170
const QUEUE_Y = 35
const QUEUE_W = 240
const QUEUE_H = 80
const SLOT_W = 70

export function MessageQueueDiagram({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <h4 className="text-sm font-semibold">Message Queue: Discrete Messages with Boundaries</h4>
        <span className="text-xs text-muted-foreground font-mono">Step {step + 1} / {steps.length}</span>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          <defs>
            <marker id="mq-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
          </defs>

          {/* Sender */}
          <rect x={10} y={40} width={80} height={50} rx={6}
            className={cn("stroke-2 transition-all",
              current.senderState === "active"
                ? "fill-green-500/20 stroke-green-500"
                : "fill-muted/30 stroke-border"
            )} />
          <text x={50} y={62} textAnchor="middle"
            className="fill-foreground font-semibold" fontSize={11}>Sender</text>
          <text x={50} y={78} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={7}>mq_send()</text>

          {current.sending && (
            <line x1={90} y1={65} x2={QUEUE_X - 4} y2={65}
              className="stroke-primary stroke-2" markerEnd="url(#mq-arr)" />
          )}

          {/* Kernel queue wrapper */}
          <rect x={QUEUE_X - 10} y={QUEUE_Y - 14} width={QUEUE_W + 20} height={QUEUE_H + 32} rx={8}
            className="fill-blue-500/5 stroke-blue-500/20 stroke-1" strokeDasharray="4 3" />
          <text x={QUEUE_X + QUEUE_W / 2} y={QUEUE_Y - 2} textAnchor="middle"
            className="fill-blue-600/50 dark:fill-blue-400/40 font-semibold" fontSize={8}>Kernel Message Queue</text>

          {/* Queue slots */}
          <rect x={QUEUE_X} y={QUEUE_Y} width={QUEUE_W} height={QUEUE_H} rx={4}
            className="fill-muted/20 stroke-border/30 stroke-1" />

          {current.queue.map((msg, i) => {
            const mx = QUEUE_X + 6 + i * (SLOT_W + 4)
            return (
              <g key={`${step}-${i}`}>
                <rect x={mx} y={QUEUE_Y + 6} width={SLOT_W} height={QUEUE_H - 12} rx={4}
                  className={cn("stroke-1 transition-all duration-300", MSG_COLORS[msg.type])} />
                <text x={mx + SLOT_W / 2} y={QUEUE_Y + 34} textAnchor="middle"
                  className={cn("font-semibold", MSG_TEXT[msg.type])} fontSize={10}>
                  {msg.label}
                </text>
                <text x={mx + SLOT_W / 2} y={QUEUE_Y + 50} textAnchor="middle"
                  className="fill-muted-foreground/40" fontSize={7}>
                  Type {msg.type}
                </text>
                {/* Boundary lines */}
                {i > 0 && (
                  <line x1={mx - 2} y1={QUEUE_Y + 8} x2={mx - 2} y2={QUEUE_Y + QUEUE_H - 8}
                    className="stroke-border/50 stroke-1" strokeDasharray="2 2" />
                )}
              </g>
            )
          })}

          {current.queue.length === 0 && (
            <text x={QUEUE_X + QUEUE_W / 2} y={QUEUE_Y + QUEUE_H / 2 + 4} textAnchor="middle"
              className="fill-muted-foreground/25 italic" fontSize={10}>empty</text>
          )}

          {/* Read arrow */}
          {current.receiving && (
            <line x1={QUEUE_X + QUEUE_W + 14} y1={65} x2={490 - 4} y2={65}
              className="stroke-primary stroke-2" markerEnd="url(#mq-arr)" />
          )}

          {/* Receiver */}
          <rect x={490} y={40} width={80} height={50} rx={6}
            className={cn("stroke-2 transition-all",
              current.receiverState === "active"
                ? "fill-green-500/20 stroke-green-500"
                : current.receiverState === "waiting"
                ? "fill-red-500/10 stroke-red-500/40"
                : "fill-muted/30 stroke-border"
            )}
            strokeDasharray={current.receiverState === "waiting" ? "4 3" : undefined}
          />
          <text x={530} y={62} textAnchor="middle"
            className="fill-foreground font-semibold" fontSize={11}>Receiver</text>
          <text x={530} y={78} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={7}>mq_receive()</text>
          {current.receiverState === "waiting" && (
            <text x={530} y={100} textAnchor="middle"
              className="fill-red-500/50 font-semibold" fontSize={7}>blocked</text>
          )}

          {/* Boundary emphasis */}
          <text x={QUEUE_X + QUEUE_W / 2} y={QUEUE_Y + QUEUE_H + 18} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={8}>
            messages arrive intact — never merged or split
          </text>
        </svg>

        <p className="text-sm text-muted-foreground mt-2 mb-3">{current.description}</p>

        <div className="flex items-center gap-3">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors">Back</button>
          <button onClick={() => setStep(0)}
            className="px-3 py-1 rounded border text-sm font-medium hover:bg-muted transition-colors">Reset</button>
          <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}
