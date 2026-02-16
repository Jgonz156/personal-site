"use client"

import { cn } from "@/lib/utils"

export interface ISAComparisonDiagramProps {
  className?: string
}

export function ISAComparisonDiagram({ className }: ISAComparisonDiagramProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 my-6", className)}>
      {/* CISC Side */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-red-500/10 border-b px-3 py-2 text-center">
          <span className="text-sm font-bold text-red-700 dark:text-red-300">
            CISC
          </span>
          <span className="text-xs text-muted-foreground ml-1.5">
            (x86, VAX)
          </span>
        </div>
        <div className="p-3 flex justify-center">
          <svg width="180" height="140" viewBox="0 0 180 140">
            {/* CPU Shell */}
            <rect
              x={2} y={2} width={176} height={136} rx={6}
              className="fill-red-500/5 stroke-red-400/40 stroke-1 dark:fill-red-500/10"
            />

            {/* Dense grid of varied blocks - "busy" interior */}
            {/* Row 1 - large complex instruction blocks */}
            <rect x={10} y={10} width={38} height={16} rx={2}
              className="fill-red-400/40 stroke-red-500/60 stroke-1 dark:fill-red-400/30" />
            <rect x={52} y={10} width={22} height={16} rx={2}
              className="fill-red-300/50 stroke-red-500/60 stroke-1 dark:fill-red-300/30" />
            <rect x={78} y={10} width={50} height={16} rx={2}
              className="fill-red-400/40 stroke-red-500/60 stroke-1 dark:fill-red-400/30" />
            <rect x={132} y={10} width={38} height={16} rx={2}
              className="fill-red-300/50 stroke-red-500/60 stroke-1 dark:fill-red-300/30" />

            {/* Row 2 */}
            <rect x={10} y={30} width={28} height={12} rx={2}
              className="fill-red-300/40 stroke-red-400/50 stroke-1 dark:fill-red-300/25" />
            <rect x={42} y={30} width={46} height={12} rx={2}
              className="fill-red-400/50 stroke-red-500/60 stroke-1 dark:fill-red-400/35" />
            <rect x={92} y={30} width={18} height={12} rx={2}
              className="fill-red-300/40 stroke-red-400/50 stroke-1 dark:fill-red-300/25" />
            <rect x={114} y={30} width={32} height={12} rx={2}
              className="fill-red-400/40 stroke-red-500/50 stroke-1 dark:fill-red-400/30" />
            <rect x={150} y={30} width={20} height={12} rx={2}
              className="fill-red-300/50 stroke-red-400/50 stroke-1 dark:fill-red-300/30" />

            {/* Row 3 */}
            <rect x={10} y={46} width={52} height={14} rx={2}
              className="fill-red-400/45 stroke-red-500/60 stroke-1 dark:fill-red-400/30" />
            <rect x={66} y={46} width={16} height={14} rx={2}
              className="fill-red-300/40 stroke-red-400/50 stroke-1 dark:fill-red-300/25" />
            <rect x={86} y={46} width={42} height={14} rx={2}
              className="fill-red-400/50 stroke-red-500/60 stroke-1 dark:fill-red-400/35" />
            <rect x={132} y={46} width={38} height={14} rx={2}
              className="fill-red-300/45 stroke-red-500/50 stroke-1 dark:fill-red-300/30" />

            {/* Row 4 */}
            <rect x={10} y={64} width={24} height={10} rx={2}
              className="fill-red-300/40 stroke-red-400/50 stroke-1 dark:fill-red-300/25" />
            <rect x={38} y={64} width={36} height={10} rx={2}
              className="fill-red-400/40 stroke-red-500/50 stroke-1 dark:fill-red-400/30" />
            <rect x={78} y={64} width={20} height={10} rx={2}
              className="fill-red-300/50 stroke-red-400/50 stroke-1 dark:fill-red-300/30" />
            <rect x={102} y={64} width={44} height={10} rx={2}
              className="fill-red-400/45 stroke-red-500/60 stroke-1 dark:fill-red-400/30" />
            <rect x={150} y={64} width={20} height={10} rx={2}
              className="fill-red-300/40 stroke-red-400/50 stroke-1 dark:fill-red-300/25" />

            {/* Row 5 */}
            <rect x={10} y={78} width={40} height={14} rx={2}
              className="fill-red-400/50 stroke-red-500/60 stroke-1 dark:fill-red-400/35" />
            <rect x={54} y={78} width={30} height={14} rx={2}
              className="fill-red-300/40 stroke-red-400/50 stroke-1 dark:fill-red-300/25" />
            <rect x={88} y={78} width={48} height={14} rx={2}
              className="fill-red-400/40 stroke-red-500/50 stroke-1 dark:fill-red-400/30" />
            <rect x={140} y={78} width={30} height={14} rx={2}
              className="fill-red-300/50 stroke-red-500/50 stroke-1 dark:fill-red-300/30" />

            {/* Complex interconnecting lines */}
            <line x1={48} y1={26} x2={52} y2={30}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={74} y1={26} x2={42} y2={30}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={128} y1={26} x2={114} y2={30}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={88} y1={42} x2={66} y2={46}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={62} y1={60} x2={38} y2={64}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={146} y1={42} x2={132} y2={46}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={170} y1={60} x2={150} y2={64}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={38} y1={74} x2={10} y2={78}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />
            <line x1={110} y1={74} x2={88} y2={78}
              className="stroke-red-400/40 stroke-1 dark:stroke-red-400/30" />

            {/* Label */}
            <text x={90} y={112} fontSize={9} textAnchor="middle"
              className="fill-red-600/70 dark:fill-red-400/70 italic">
              Many specialized instructions
            </text>
            <text x={90} y={124} fontSize={9} textAnchor="middle"
              className="fill-red-600/70 dark:fill-red-400/70 italic">
              Variable sizes, complex wiring
            </text>
          </svg>
        </div>
      </div>

      {/* RISC Side */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-blue-500/10 border-b px-3 py-2 text-center">
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
            RISC
          </span>
          <span className="text-xs text-muted-foreground ml-1.5">
            (ARM, RISC-V)
          </span>
        </div>
        <div className="p-3 flex justify-center">
          <svg width="180" height="140" viewBox="0 0 180 140">
            {/* CPU Shell */}
            <rect
              x={2} y={2} width={176} height={136} rx={6}
              className="fill-blue-500/5 stroke-blue-400/40 stroke-1 dark:fill-blue-500/10"
            />

            {/* Clean uniform blocks - pipeline stages */}
            {/* Stage 1: Fetch */}
            <rect x={14} y={14} width={152} height={20} rx={4}
              className="fill-blue-400/30 stroke-blue-500/60 stroke-1.5 dark:fill-blue-400/20" />
            <text x={90} y={27} fontSize={8} textAnchor="middle"
              className="fill-blue-700 dark:fill-blue-300 font-semibold">
              FETCH
            </text>

            {/* Arrow */}
            <line x1={90} y1={34} x2={90} y2={40}
              className="stroke-blue-400/60 stroke-1.5 dark:stroke-blue-400/50" />
            <polygon points="86,38 90,44 94,38"
              className="fill-blue-400/60 dark:fill-blue-400/50" />

            {/* Stage 2: Decode */}
            <rect x={14} y={44} width={152} height={20} rx={4}
              className="fill-blue-400/30 stroke-blue-500/60 stroke-1.5 dark:fill-blue-400/20" />
            <text x={90} y={57} fontSize={8} textAnchor="middle"
              className="fill-blue-700 dark:fill-blue-300 font-semibold">
              DECODE
            </text>

            {/* Arrow */}
            <line x1={90} y1={64} x2={90} y2={70}
              className="stroke-blue-400/60 stroke-1.5 dark:stroke-blue-400/50" />
            <polygon points="86,68 90,74 94,68"
              className="fill-blue-400/60 dark:fill-blue-400/50" />

            {/* Stage 3: Execute */}
            <rect x={14} y={74} width={152} height={20} rx={4}
              className="fill-blue-400/30 stroke-blue-500/60 stroke-1.5 dark:fill-blue-400/20" />
            <text x={90} y={87} fontSize={8} textAnchor="middle"
              className="fill-blue-700 dark:fill-blue-300 font-semibold">
              EXECUTE
            </text>

            {/* Label */}
            <text x={90} y={112} fontSize={9} textAnchor="middle"
              className="fill-blue-600/70 dark:fill-blue-400/70 italic">
              Few uniform instructions
            </text>
            <text x={90} y={124} fontSize={9} textAnchor="middle"
              className="fill-blue-600/70 dark:fill-blue-400/70 italic">
              Clean pipeline, simple wiring
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
