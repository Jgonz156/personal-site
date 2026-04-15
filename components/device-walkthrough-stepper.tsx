"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 700
const VH = 420
const BOUNDARY_Y = 90

const STRACE_X = 70
const KERNEL_X = 440
const COL_W = 140
const NODE_H = 30
const NODE_GAP = 8

interface StepDef {
  title: string
  description: string
  straceHighlight: string[]
  kernelHighlight: string[]
  strace?: string
  concept: string
  invisible?: boolean
}

const steps: StepDef[] = [
  {
    title: "Overview",
    description: "dd reads 16 bytes from /dev/urandom. The left column shows what strace reveals — the syscalls crossing the user/kernel boundary. The right column shows what happens invisibly inside the kernel between those crossings. Each kernel node corresponds to a real function you can find in drivers/char/random.c.",
    straceHighlight: ["openat", "read_call", "write_call", "close_call"],
    kernelHighlight: ["vfs", "devnode", "driver", "generate", "copy", "memzero"],
    concept: "The full U-bend",
  },
  {
    title: "openat(\"/dev/urandom\")",
    description: "dd calls openat() to open /dev/urandom. The kernel resolves the path through VFS, finds the device node with major:minor 1:9, locates the registered driver, and returns file descriptor 3.",
    straceHighlight: ["openat"],
    kernelHighlight: ["vfs", "devnode"],
    strace: "openat(AT_FDCWD, \"/dev/urandom\", O_RDONLY) = 3",
    concept: "VFS + device dispatch (LN18)",
  },
  {
    title: "read() enters the kernel",
    description: "dd calls read(3, buf, 16). The CPU traps into kernel mode — the left side of the U-bend descending through the syscall boundary. The kernel looks up fd 3 and dispatches to urandom_fops.read_iter, which is urandom_read_iter() in drivers/char/random.c.",
    straceHighlight: ["read_call"],
    kernelHighlight: ["driver"],
    strace: "read(3, ..., 16)  →  entering kernel",
    concept: "Syscall boundary (LN19)",
  },
  {
    title: "urandom_read_iter() → crng_make_state()",
    description: "urandom_read_iter() calls get_random_bytes_user(), which calls crng_make_state() to initialize a ChaCha20 cipher state from the kernel's entropy pool. This is where the random bytes are generated — the deepest point of the U-bend.",
    straceHighlight: [],
    kernelHighlight: ["driver", "generate"],
    concept: "Crypto RNG (drivers/char/random.c)",
    invisible: true,
  },
  {
    title: "copy_to_iter() → user buffer",
    description: "Our read is 16 bytes (≤ 32), so get_random_bytes_user() takes the short path: it copies the bytes directly from the ChaCha state into dd's user-space buffer with copy_to_iter(). The data crosses back over the user/kernel boundary — the right side of the U ascending.",
    straceHighlight: [],
    kernelHighlight: ["copy"],
    concept: "Kernel → user data transfer (LN19)",
    invisible: true,
  },
  {
    title: "memzero_explicit() — forward secrecy",
    description: "Before returning, the kernel calls memzero_explicit() to erase the ChaCha state from memory. Even if an attacker later reads kernel memory, they cannot reconstruct the random bytes. This is forward secrecy — the \"code is lava\" principle from LN19 in action.",
    straceHighlight: [],
    kernelHighlight: ["memzero"],
    concept: "Defensive cleanup (LN19)",
    invisible: true,
  },
  {
    title: "read() returns",
    description: "The read() syscall returns 16 — the number of bytes successfully read. dd now holds 16 random bytes in its buffer. Between the read() entering the kernel and this return, four invisible operations occurred: dispatch, generate, copy, and cleanup.",
    straceHighlight: ["read_call"],
    kernelHighlight: [],
    strace: "read(3, \"\\xad\\xb8\\x45...\", 16) = 16",
    concept: "U-bend completion (LN19)",
  },
  {
    title: "write() to stdout",
    description: "dd writes the 16 bytes to stdout (fd 1), which is piped to xxd. This is another syscall — another boundary crossing — but for output rather than device input.",
    straceHighlight: ["write_call"],
    kernelHighlight: [],
    strace: "write(1, \"\\xad\\xb8\\x45...\", 16) = 16",
    concept: "Everything is a syscall",
  },
  {
    title: "close() releases the fd",
    description: "dd calls close(3) to release the file descriptor for /dev/urandom. The kernel decrements the reference count on the underlying file structure. The full lifecycle — open, read, write, close — mirrors the U-bend we traced in LN19.",
    straceHighlight: ["close_call"],
    kernelHighlight: [],
    strace: "close(3) = 0",
    concept: "fd lifecycle (LN18)",
  },
]

interface VisNode {
  id: string
  label: string
  sub?: string
  x: number
  yIdx: number
  accent: { fill: string; stroke: string; text: string }
}

const straceNodes: VisNode[] = [
  { id: "openat", label: "openat()", sub: "\"/dev/urandom\" → fd 3", x: STRACE_X, yIdx: 0,
    accent: { fill: "fill-green-500/15", stroke: "stroke-green-500/50", text: "fill-green-700 dark:fill-green-300" } },
  { id: "read_call", label: "read(3, buf, 16)", sub: "→ returns 16 bytes", x: STRACE_X, yIdx: 1,
    accent: { fill: "fill-blue-500/15", stroke: "stroke-blue-500/50", text: "fill-blue-700 dark:fill-blue-300" } },
  { id: "write_call", label: "write(1, buf, 16)", sub: "data → stdout", x: STRACE_X, yIdx: 2,
    accent: { fill: "fill-cyan-500/15", stroke: "stroke-cyan-500/50", text: "fill-cyan-700 dark:fill-cyan-300" } },
  { id: "close_call", label: "close(3)", sub: "release fd", x: STRACE_X, yIdx: 3,
    accent: { fill: "fill-emerald-500/15", stroke: "stroke-emerald-500/50", text: "fill-emerald-700 dark:fill-emerald-300" } },
]

const kernelNodes: VisNode[] = [
  { id: "vfs", label: "VFS Lookup", sub: "resolve path → inode", x: KERNEL_X, yIdx: 0,
    accent: { fill: "fill-purple-500/15", stroke: "stroke-purple-500/50", text: "fill-purple-700 dark:fill-purple-300" } },
  { id: "devnode", label: "/dev/urandom", sub: "char 1:9 → mem driver", x: KERNEL_X, yIdx: 1,
    accent: { fill: "fill-amber-500/15", stroke: "stroke-amber-500/50", text: "fill-amber-700 dark:fill-amber-300" } },
  { id: "driver", label: "urandom_read_iter()", sub: "urandom_fops dispatch", x: KERNEL_X, yIdx: 2,
    accent: { fill: "fill-orange-500/15", stroke: "stroke-orange-500/50", text: "fill-orange-700 dark:fill-orange-300" } },
  { id: "generate", label: "crng_make_state()", sub: "entropy → ChaCha20", x: KERNEL_X, yIdx: 3,
    accent: { fill: "fill-red-500/15", stroke: "stroke-red-500/50", text: "fill-red-700 dark:fill-red-300" } },
  { id: "copy", label: "copy_to_iter()", sub: "kernel buf → user buf", x: KERNEL_X, yIdx: 4,
    accent: { fill: "fill-rose-500/15", stroke: "stroke-rose-500/50", text: "fill-rose-700 dark:fill-rose-300" } },
  { id: "memzero", label: "memzero_explicit()", sub: "erase key material", x: KERNEL_X, yIdx: 5,
    accent: { fill: "fill-slate-500/15", stroke: "stroke-slate-500/50", text: "fill-slate-700 dark:fill-slate-300" } },
]

function nodeY(idx: number): number {
  return BOUNDARY_Y + 30 + idx * (NODE_H + NODE_GAP)
}

export function DeviceWalkthroughStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]
  const straceSet = new Set(s.straceHighlight)
  const kernelSet = new Set(s.kernelHighlight)

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
            <marker id="dw-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary/60" />
            </marker>
          </defs>

          {/* Boundary line */}
          <line x1={40} y1={BOUNDARY_Y} x2={VW - 40} y2={BOUNDARY_Y}
            className="stroke-muted-foreground/20 stroke-1" strokeDasharray="6 4" />
          <text x={STRACE_X + COL_W / 2} y={BOUNDARY_Y - 8} textAnchor="middle"
            className="fill-green-600/40 dark:fill-green-400/30 font-semibold" fontSize={8}>
            User Space
          </text>
          <text x={KERNEL_X + COL_W / 2} y={BOUNDARY_Y - 8} textAnchor="middle"
            className="fill-red-600/40 dark:fill-red-400/30 font-semibold" fontSize={8}>
            Kernel Space
          </text>

          {/* Column headers */}
          <text x={STRACE_X + COL_W / 2} y={30} textAnchor="middle"
            className={cn("font-bold transition-all duration-300",
              s.straceHighlight.length > 0 || step === 0
                ? "fill-blue-700 dark:fill-blue-300"
                : "fill-muted-foreground/30"
            )} fontSize={11}>
            strace (observable)
          </text>
          <text x={KERNEL_X + COL_W / 2} y={30} textAnchor="middle"
            className={cn("font-bold transition-all duration-300",
              s.kernelHighlight.length > 0 || step === 0
                ? "fill-orange-700 dark:fill-orange-300"
                : "fill-muted-foreground/30"
            )} fontSize={11}>
            Inside the kernel
          </text>

          {/* Subtitle under column headers */}
          <text x={STRACE_X + COL_W / 2} y={44} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={7}>
            boundary crossings you can see
          </text>
          <text x={KERNEL_X + COL_W / 2} y={44} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={7}>
            real functions in drivers/char/random.c
          </text>

          {/* Strace nodes */}
          {straceNodes.map((n) => {
            const lit = straceSet.has(n.id)
            const y = nodeY(n.yIdx)
            return (
              <g key={n.id} className="transition-all duration-300">
                <rect x={n.x} y={y} width={COL_W} height={NODE_H} rx={5}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    lit ? n.accent.fill : "fill-muted/20",
                    lit ? n.accent.stroke : "stroke-border/10",
                  )} />
                <text x={n.x + COL_W / 2} y={y + (n.sub ? NODE_H / 2 - 2 : NODE_H / 2 + 4)} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    lit ? n.accent.text : "fill-muted-foreground/15"
                  )} fontSize={9}>
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x + COL_W / 2} y={y + NODE_H / 2 + 9} textAnchor="middle"
                    className={cn("transition-all duration-300",
                      lit ? "fill-muted-foreground/50" : "fill-muted-foreground/10"
                    )} fontSize={7}>
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}

          {/* Strace flow arrows */}
          {straceNodes.slice(0, -1).map((n, i) => {
            const fromLit = straceSet.has(n.id)
            const toLit = straceSet.has(straceNodes[i + 1].id)
            const lit = fromLit && toLit && step !== 0
            const y1 = nodeY(n.yIdx) + NODE_H
            const y2 = nodeY(n.yIdx + 1)
            return (
              <line key={`sa-${i}`} x1={n.x + COL_W / 2} y1={y1}
                x2={n.x + COL_W / 2} y2={y2}
                className={cn("stroke-1 transition-all duration-300",
                  lit ? "stroke-primary/40" : "stroke-border/10"
                )}
                markerEnd={lit ? "url(#dw-arr)" : undefined}
              />
            )
          })}

          {/* Kernel nodes */}
          {kernelNodes.map((n) => {
            const lit = kernelSet.has(n.id)
            const y = nodeY(n.yIdx)
            return (
              <g key={n.id} className="transition-all duration-300">
                <rect x={n.x} y={y} width={COL_W} height={NODE_H} rx={5}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    lit ? n.accent.fill : "fill-muted/20",
                    lit ? n.accent.stroke : "stroke-border/10",
                  )} />
                <text x={n.x + COL_W / 2} y={y + (n.sub ? NODE_H / 2 - 2 : NODE_H / 2 + 4)} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    lit ? n.accent.text : "fill-muted-foreground/15"
                  )} fontSize={9}>
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x + COL_W / 2} y={y + NODE_H / 2 + 9} textAnchor="middle"
                    className={cn("transition-all duration-300",
                      lit ? "fill-muted-foreground/50" : "fill-muted-foreground/10"
                    )} fontSize={7}>
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}

          {/* Kernel flow arrows */}
          {kernelNodes.slice(0, -1).map((n, i) => {
            const fromLit = kernelSet.has(n.id)
            const toLit = kernelSet.has(kernelNodes[i + 1].id)
            const lit = fromLit && toLit && step !== 0
            const y1 = nodeY(n.yIdx) + NODE_H
            const y2 = nodeY(n.yIdx + 1)
            return (
              <line key={`ka-${i}`} x1={n.x + COL_W / 2} y1={y1}
                x2={n.x + COL_W / 2} y2={y2}
                className={cn("stroke-1 transition-all duration-300",
                  lit ? "stroke-primary/40" : "stroke-border/10"
                )}
                markerEnd={lit ? "url(#dw-arr)" : undefined}
              />
            )
          })}

          {/* Cross-column dispatch arrows */}
          {/* openat → VFS (step 1) */}
          {(step === 1 || step === 0) && (() => {
            const lit = step === 1
            const y1 = nodeY(0) + NODE_H / 2
            const y2 = nodeY(0) + NODE_H / 2
            return (
              <line x1={STRACE_X + COL_W} y1={y1} x2={KERNEL_X} y2={y2}
                className={cn("transition-all duration-300",
                  lit ? "stroke-purple-500/50 stroke-[2]" : "stroke-border/10 stroke-1"
                )}
                strokeDasharray={lit ? "6 4" : "4 3"}
                markerEnd={lit ? "url(#dw-arr)" : undefined}
              />
            )
          })()}

          {/* read → driver (steps 2-3) */}
          {(step === 2 || step === 3 || step === 0) && (() => {
            const lit = step === 2 || step === 3
            const y1 = nodeY(1) + NODE_H / 2
            const y2 = nodeY(2) + NODE_H / 2
            return (
              <path
                d={`M ${STRACE_X + COL_W} ${y1} Q ${(STRACE_X + COL_W + KERNEL_X) / 2} ${(y1 + y2) / 2}, ${KERNEL_X} ${y2}`}
                fill="none"
                className={cn("transition-all duration-300",
                  lit ? "stroke-orange-500/50 stroke-[2]" : "stroke-border/10 stroke-1"
                )}
                strokeDasharray={lit ? "6 4" : "4 3"}
                markerEnd={lit ? "url(#dw-arr)" : undefined}
              />
            )
          })()}

          {/* copy_to_iter → read returns (step 6) */}
          {(step === 6 || step === 0) && (() => {
            const lit = step === 6
            const y1 = nodeY(4) + NODE_H / 2
            const y2 = nodeY(1) + NODE_H / 2
            return (
              <path
                d={`M ${KERNEL_X} ${y1} Q ${(STRACE_X + COL_W + KERNEL_X) / 2} ${(y1 + y2) / 2}, ${STRACE_X + COL_W} ${y2}`}
                fill="none"
                className={cn("transition-all duration-300",
                  lit ? "stroke-emerald-500/50 stroke-[2]" : "stroke-border/10 stroke-1"
                )}
                strokeDasharray={lit ? "6 4" : "4 3"}
                markerEnd={lit ? "url(#dw-arr)" : undefined}
              />
            )
          })()}

          {/* "invisible to strace" badge on steps 3-5 */}
          {(step === 3 || step === 4 || step === 5) && (
            <g>
              <rect x={(STRACE_X + COL_W + KERNEL_X) / 2 - 60} y={nodeY(3) + 5} width={120} height={20} rx={4}
                className="fill-red-500/10 stroke-red-500/20 stroke-1" />
              <text x={(STRACE_X + COL_W + KERNEL_X) / 2} y={nodeY(3) + 19} textAnchor="middle"
                className="fill-red-600/60 dark:fill-red-400/50 font-semibold" fontSize={7}>
                invisible to strace
              </text>
            </g>
          )}

          {/* Boundary crossing dots */}
          {(step === 1 || step === 2 || step === 0) && (
            <circle cx={STRACE_X + COL_W / 2} cy={BOUNDARY_Y} r={4}
              className={cn("transition-all duration-300",
                step !== 0 ? "fill-yellow-500" : "fill-yellow-500/30"
              )} />
          )}
          {(step === 6 || step === 0) && (
            <circle cx={KERNEL_X + COL_W / 2} cy={BOUNDARY_Y} r={4}
              className={cn("transition-all duration-300",
                step !== 0 ? "fill-yellow-500" : "fill-yellow-500/30"
              )} />
          )}

          {/* Boundary direction labels */}
          {step === 2 && (
            <text x={STRACE_X + COL_W / 2} y={BOUNDARY_Y + 14}
              textAnchor="middle"
              className="fill-yellow-600/50 dark:fill-yellow-400/40 font-semibold" fontSize={7}>
              ↓ descending into kernel
            </text>
          )}
          {step === 6 && (
            <text x={KERNEL_X + COL_W / 2} y={BOUNDARY_Y + 14}
              textAnchor="middle"
              className="fill-yellow-600/50 dark:fill-yellow-400/40 font-semibold" fontSize={7}>
              ↑ returning to user space
            </text>
          )}
        </svg>

        {/* strace callout */}
        {s.strace && (
          <div className={cn(
            "mt-2 px-3 py-1.5 rounded border text-xs font-mono text-muted-foreground",
            s.invisible
              ? "bg-red-500/5 border-red-500/20"
              : "bg-muted/50 border-border/50"
          )}>
            <span className={cn("font-semibold mr-1.5",
              s.invisible
                ? "text-red-600/60 dark:text-red-400/50"
                : "text-foreground/60"
            )}>
              {s.invisible ? "no strace output:" : "strace:"}
            </span>
            {s.invisible
              ? "this happens inside the kernel between read() entry and read() return"
              : s.strace
            }
          </div>
        )}

        {/* Invisible step indicator (for steps without strace but still invisible) */}
        {s.invisible && !s.strace && (
          <div className="mt-2 px-3 py-1.5 rounded border border-red-500/20 bg-red-500/5 text-xs font-mono text-muted-foreground">
            <span className="text-red-600/60 dark:text-red-400/50 font-semibold mr-1.5">no strace output:</span>
            this happens inside the kernel between read() entry and read() return
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
