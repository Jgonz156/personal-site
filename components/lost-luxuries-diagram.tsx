"use client"

import { cn } from "@/lib/utils"

const VW = 600
const VH = 200

function LocalPanel() {
  const cx = VW / 4
  return (
    <g>
      <text x={cx} y={18} textAnchor="middle"
        className="fill-blue-700 dark:fill-blue-300 font-bold" fontSize={11}>Local IPC</text>

      {/* Kernel boundary — one big region */}
      <rect x={20} y={55} width={cx * 2 - 40} height={110} rx={10}
        className="fill-emerald-500/10 stroke-emerald-500/40 stroke-[1.5]" />
      <text x={cx} y={172} textAnchor="middle"
        className="fill-emerald-600/60 dark:fill-emerald-400/50 font-semibold" fontSize={8}>
        One Kernel
      </text>

      {/* Process A */}
      <rect x={40} y={70} width={70} height={36} rx={5}
        className="fill-blue-500/15 stroke-blue-500/50 stroke-[1.5]" />
      <text x={75} y={92} textAnchor="middle"
        className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={9}>Process A</text>

      {/* Process B */}
      <rect x={cx * 2 - 110} y={70} width={70} height={36} rx={5}
        className="fill-purple-500/15 stroke-purple-500/50 stroke-[1.5]" />
      <text x={cx * 2 - 75} y={92} textAnchor="middle"
        className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={9}>Process B</text>

      {/* Kernel mediator block */}
      <rect x={cx - 35} y={115} width={70} height={30} rx={5}
        className="fill-emerald-500/20 stroke-emerald-500/50 stroke-[1.5]" />
      <text x={cx} y={134} textAnchor="middle"
        className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize={8}>Kernel</text>

      {/* Connections */}
      <line x1={75} y1={106} x2={cx - 20} y2={122}
        className="stroke-emerald-500/50 stroke-[1.5]" />
      <line x1={cx * 2 - 75} y1={106} x2={cx + 20} y2={122}
        className="stroke-emerald-500/50 stroke-[1.5]" />

      {/* Shared labels */}
      <text x={cx} y={40} textAnchor="middle"
        className="fill-emerald-600/50 dark:fill-emerald-400/40" fontSize={7}>
        shared memory · shared scheduler · shared kernel
      </text>
    </g>
  )
}

function RemotePanel() {
  const ox = VW / 2
  const cx = VW * 3 / 4
  return (
    <g>
      <text x={cx} y={18} textAnchor="middle"
        className="fill-amber-700 dark:fill-amber-300 font-bold" fontSize={11}>Remote Communication</text>

      {/* Machine A boundary */}
      <rect x={ox + 10} y={55} width={105} height={110} rx={8}
        className="fill-blue-500/5 stroke-blue-500/30 stroke-1" />
      <text x={ox + 62} y={172} textAnchor="middle"
        className="fill-blue-600/50 dark:fill-blue-400/40" fontSize={7}>Machine A</text>

      {/* Process A */}
      <rect x={ox + 25} y={68} width={70} height={30} rx={5}
        className="fill-blue-500/15 stroke-blue-500/50 stroke-[1.5]" />
      <text x={ox + 60} y={87} textAnchor="middle"
        className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={9}>Process A</text>

      {/* Kernel A */}
      <rect x={ox + 30} y={112} width={60} height={24} rx={4}
        className="fill-emerald-500/15 stroke-emerald-500/40 stroke-1" />
      <text x={ox + 60} y={128} textAnchor="middle"
        className="fill-emerald-700 dark:fill-emerald-400 font-semibold" fontSize={7}>Kernel A</text>

      <line x1={ox + 60} y1={98} x2={ox + 60} y2={112}
        className="stroke-blue-500/40 stroke-1" />

      {/* Machine B boundary */}
      <rect x={VW - 115} y={55} width={105} height={110} rx={8}
        className="fill-purple-500/5 stroke-purple-500/30 stroke-1" />
      <text x={VW - 62} y={172} textAnchor="middle"
        className="fill-purple-600/50 dark:fill-purple-400/40" fontSize={7}>Machine B</text>

      {/* Process B */}
      <rect x={VW - 100} y={68} width={70} height={30} rx={5}
        className="fill-purple-500/15 stroke-purple-500/50 stroke-[1.5]" />
      <text x={VW - 65} y={87} textAnchor="middle"
        className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={9}>Process B</text>

      {/* Kernel B */}
      <rect x={VW - 95} y={112} width={60} height={24} rx={4}
        className="fill-emerald-500/15 stroke-emerald-500/40 stroke-1" />
      <text x={VW - 65} y={128} textAnchor="middle"
        className="fill-emerald-700 dark:fill-emerald-400 font-semibold" fontSize={7}>Kernel B</text>

      <line x1={VW - 65} y1={98} x2={VW - 65} y2={112}
        className="stroke-purple-500/40 stroke-1" />

      {/* Untrusted link */}
      <line x1={ox + 115} y1={124} x2={VW - 115} y2={124}
        className="stroke-red-500/50 stroke-[1.5]" strokeDasharray="4 3" />
      <text x={cx} y={120} textAnchor="middle"
        className="fill-red-500/70 dark:fill-red-400/60 font-bold" fontSize={7}>
        ? untrusted link ?
      </text>

      {/* Lost labels */}
      <text x={cx} y={40} textAnchor="middle"
        className="fill-red-500/50 dark:fill-red-400/40" fontSize={7}>
        no shared memory · no shared scheduler · no shared view
      </text>
    </g>
  )
}

export function LostLuxuriesDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Local IPC vs Remote Communication</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          IPC enjoys a shared kernel. Networking begins where those luxuries vanish.
        </p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          {/* Divider */}
          <line x1={VW / 2} y1={10} x2={VW / 2} y2={VH - 10}
            className="stroke-border" strokeDasharray="3 3" />

          <LocalPanel />
          <RemotePanel />
        </svg>
      </div>
    </div>
  )
}
