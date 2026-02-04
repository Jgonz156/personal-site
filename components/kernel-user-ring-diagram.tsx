"use client"

import { cn } from "@/lib/utils"

export interface KernelUserRingDiagramProps {
  size?: "sm" | "md" | "lg"
  currentRing?: 0 | 3
  showLabels?: boolean
  showSystemCall?: boolean
  className?: string
}

const sizeConfig = {
  sm: { width: 140, height: 140, fontSize: 9 },
  md: { width: 200, height: 200, fontSize: 11 },
  lg: { width: 280, height: 280, fontSize: 13 },
}

export function KernelUserRingDiagram({
  size = "md",
  currentRing = 3,
  showLabels = true,
  showSystemCall = false,
  className,
}: KernelUserRingDiagramProps) {
  const config = sizeConfig[size]
  const { width, height, fontSize } = config

  const centerX = width / 2
  const centerY = height / 2
  const outerRadius = Math.min(width, height) * 0.45
  const middleRadius = outerRadius * 0.65
  const innerRadius = outerRadius * 0.35

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("", className)}
    >
      {/* Ring 3 (User Space) - Outermost */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius}
        className={cn(
          "fill-green-500/20 stroke-green-600 stroke-2",
          currentRing === 3 && "fill-green-500/40",
          "dark:fill-green-500/10 dark:stroke-green-400"
        )}
      />
      
      {/* Ring 0 (Kernel Space) - Inner */}
      <circle
        cx={centerX}
        cy={centerY}
        r={middleRadius}
        className={cn(
          "fill-red-500/20 stroke-red-600 stroke-2",
          currentRing === 0 && "fill-red-500/40",
          "dark:fill-red-500/10 dark:stroke-red-400"
        )}
      />
      
      {/* Hardware Core - Center */}
      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        className={cn(
          "fill-slate-500/30 stroke-slate-600 stroke-2",
          "dark:fill-slate-500/20 dark:stroke-slate-400"
        )}
      />

      {/* System Call Arrow (if shown) */}
      {showSystemCall && (
        <g>
          {/* Arrow from Ring 3 to Ring 0 */}
          <path
            d={`M ${centerX + outerRadius * 0.8} ${centerY - 10}
                L ${centerX + middleRadius * 0.8} ${centerY - 10}`}
            className="stroke-yellow-500 stroke-2 dark:stroke-yellow-400"
            markerEnd="url(#syscall-arrow)"
          />
          {/* "syscall" label */}
          <text
            x={centerX + outerRadius * 0.7}
            y={centerY - 18}
            fontSize={fontSize * 0.8}
            textAnchor="middle"
            className="fill-yellow-600 dark:fill-yellow-400 font-mono"
          >
            syscall
          </text>
          {/* Return arrow */}
          <path
            d={`M ${centerX + middleRadius * 0.8} ${centerY + 10}
                L ${centerX + outerRadius * 0.8} ${centerY + 10}`}
            className="stroke-yellow-500 stroke-2 stroke-dashed dark:stroke-yellow-400"
            markerEnd="url(#syscall-arrow)"
          />
        </g>
      )}

      {/* Labels */}
      {showLabels && (
        <>
          {/* Ring 3 label */}
          <text
            x={centerX}
            y={centerY - outerRadius + fontSize + 8}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-green-700 dark:fill-green-300 font-semibold"
          >
            Ring 3
          </text>
          <text
            x={centerX}
            y={centerY - outerRadius + fontSize * 2 + 10}
            fontSize={fontSize * 0.85}
            textAnchor="middle"
            className="fill-green-600 dark:fill-green-400"
          >
            User Space
          </text>

          {/* Ring 0 label */}
          <text
            x={centerX}
            y={centerY - innerRadius - fontSize - 4}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-red-700 dark:fill-red-300 font-semibold"
          >
            Ring 0
          </text>
          <text
            x={centerX}
            y={centerY - innerRadius - 2}
            fontSize={fontSize * 0.85}
            textAnchor="middle"
            className="fill-red-600 dark:fill-red-400"
          >
            Kernel
          </text>

          {/* Hardware label */}
          <text
            x={centerX}
            y={centerY + fontSize / 3}
            fontSize={fontSize * 0.9}
            textAnchor="middle"
            className="fill-slate-700 dark:fill-slate-300 font-semibold"
          >
            HW
          </text>
        </>
      )}

      {/* Current ring indicator */}
      <circle
        cx={centerX + (currentRing === 0 ? middleRadius * 0.5 : outerRadius * 0.85)}
        cy={centerY + 25}
        r={8}
        className={cn(
          "stroke-2",
          currentRing === 0
            ? "fill-red-500 stroke-red-600 dark:fill-red-400 dark:stroke-red-300"
            : "fill-green-500 stroke-green-600 dark:fill-green-400 dark:stroke-green-300"
        )}
      />
      <text
        x={centerX + (currentRing === 0 ? middleRadius * 0.5 : outerRadius * 0.85)}
        y={centerY + 25 + fontSize / 3}
        fontSize={fontSize * 0.8}
        textAnchor="middle"
        className="fill-white font-bold"
      >
        {currentRing}
      </text>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="syscall-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto"
        >
          <polygon 
            points="0 0, 8 4, 0 8" 
            className="fill-yellow-500 dark:fill-yellow-400" 
          />
        </marker>
      </defs>
    </svg>
  )
}
