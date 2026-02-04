"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Canonical dimensions - all internal calculations use these
const CANONICAL_WIDTH = 160
const CANONICAL_HEIGHT = 120
const CANONICAL_FONT_SIZE = 9
const CANONICAL_PADDING = 8

export interface HDDDiagramProps {
  width?: number
  height?: number
  highlightParts?: string[]
  showLabels?: boolean
  armPosition?: number // 0-100, position of the arm
  activeSector?: number // Which sector is being accessed
  animateArm?: boolean
  className?: string
  onClick?: () => void
}

export function HDDDiagram({
  width = CANONICAL_WIDTH,
  height = CANONICAL_HEIGHT,
  highlightParts = [],
  showLabels = true,
  armPosition = 50,
  activeSector,
  animateArm = false,
  className,
  onClick,
}: HDDDiagramProps) {
  // Use canonical dimensions for all internal calculations
  const fontSize = CANONICAL_FONT_SIZE
  const padding = CANONICAL_PADDING

  const [currentArmPosition, setCurrentArmPosition] = useState(armPosition)

  // Animate arm movement
  useEffect(() => {
    if (animateArm) {
      const interval = setInterval(() => {
        setCurrentArmPosition((prev) => {
          const newPos = prev + (Math.random() - 0.5) * 30
          return Math.max(10, Math.min(90, newPos))
        })
      }, 800)
      return () => clearInterval(interval)
    } else {
      setCurrentArmPosition(armPosition)
    }
  }, [animateArm, armPosition])

  const isHighlighted = (part: string) => highlightParts.includes(part)

  // Component dimensions using canonical values
  const driveWidth = CANONICAL_WIDTH - padding * 2
  const driveHeight = CANONICAL_HEIGHT - padding * 2

  // Platter (disk) dimensions
  const platterCenterX = padding + driveWidth * 0.45
  const platterCenterY = padding + driveHeight * 0.5
  const platterRadius = Math.min(driveWidth, driveHeight) * 0.38

  // Controller position
  const ctrlWidth = driveWidth * 0.2
  const ctrlHeight = driveHeight * 0.35
  const ctrlX = padding + driveWidth - ctrlWidth - 8
  const ctrlY = padding + 8

  // SATA connector position (left edge for puzzle piece connection)
  const sataWidth = 12
  const sataHeight = 20

  // Arm calculations
  const armPivotX = padding + driveWidth * 0.8
  const armPivotY = padding + driveHeight * 0.7
  const armLength = platterRadius * 1.1
  // Convert armPosition (0-100) to angle (pointing into platter)
  const armAngle = -45 + (currentArmPosition / 100) * 60 // -45 to 15 degrees
  const armEndX = armPivotX + Math.cos((armAngle * Math.PI) / 180) * armLength * -1
  const armEndY = armPivotY + Math.sin((armAngle * Math.PI) / 180) * armLength * -1

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${CANONICAL_WIDTH} ${CANONICAL_HEIGHT}`}
      className={cn("cursor-pointer transition-transform hover:scale-105", className)}
      onClick={onClick}
    >
      {/* Drive enclosure */}
      <rect
        x={padding}
        y={padding}
        width={driveWidth}
        height={driveHeight}
        rx={6}
        className={cn(
          "fill-rose-500/20 stroke-rose-600 stroke-2",
          "dark:fill-rose-500/30 dark:stroke-rose-400"
        )}
      />

      {/* Platter (disk) with concentric rings */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("platter") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        {/* Outer platter */}
        <circle
          cx={platterCenterX}
          cy={platterCenterY}
          r={platterRadius}
          className={cn(
            "fill-rose-200/60 stroke-rose-400 stroke-2",
            "dark:fill-rose-600/40 dark:stroke-rose-400"
          )}
        />
        {/* Concentric track rings */}
        {[0.85, 0.7, 0.55, 0.4].map((ratio, i) => (
          <circle
            key={`track-${i}`}
            cx={platterCenterX}
            cy={platterCenterY}
            r={platterRadius * ratio}
            className={cn(
              "fill-none stroke-rose-400/50 stroke-1",
              activeSector !== undefined && Math.floor(activeSector / 25) === i && "stroke-rose-500 stroke-2",
              "dark:stroke-rose-500/50"
            )}
          />
        ))}
        {/* Center spindle */}
        <circle
          cx={platterCenterX}
          cy={platterCenterY}
          r={platterRadius * 0.15}
          className={cn(
            "fill-rose-400 stroke-rose-600 stroke-1",
            "dark:fill-rose-500 dark:stroke-rose-400"
          )}
        />
        {/* Active sector highlight */}
        {activeSector !== undefined && (
          <path
            d={`M ${platterCenterX} ${platterCenterY} 
                L ${platterCenterX + platterRadius * Math.cos((activeSector * 3.6 * Math.PI) / 180)} ${platterCenterY + platterRadius * Math.sin((activeSector * 3.6 * Math.PI) / 180)}
                A ${platterRadius} ${platterRadius} 0 0 1 ${platterCenterX + platterRadius * Math.cos(((activeSector + 10) * 3.6 * Math.PI) / 180)} ${platterCenterY + platterRadius * Math.sin(((activeSector + 10) * 3.6 * Math.PI) / 180)}
                Z`}
            className="fill-rose-400/50 dark:fill-rose-500/50"
          />
        )}
        {showLabels && (
          <text
            x={platterCenterX}
            y={platterCenterY + platterRadius + fontSize + 4}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-rose-700 dark:fill-rose-300"
          >
            Platter
          </text>
        )}
      </g>

      {/* Read/Write Arm */}
      <g className={cn(
        "transition-all duration-300",
        isHighlighted("arm") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        {/* Arm pivot */}
        <circle
          cx={armPivotX}
          cy={armPivotY}
          r={6}
          className={cn(
            "fill-rose-400 stroke-rose-600 stroke-2",
            "dark:fill-rose-500 dark:stroke-rose-400"
          )}
        />
        {/* Arm */}
        <line
          x1={armPivotX}
          y1={armPivotY}
          x2={armEndX}
          y2={armEndY}
          className={cn(
            "stroke-rose-500 stroke-3",
            "dark:stroke-rose-400"
          )}
          strokeLinecap="round"
        />
        {/* Read/write head */}
        <circle
          cx={armEndX}
          cy={armEndY}
          r={4}
          className={cn(
            "fill-rose-600 stroke-rose-700 stroke-1",
            "dark:fill-rose-400 dark:stroke-rose-300"
          )}
        />
        {showLabels && (
          <text
            x={armPivotX}
            y={armPivotY + 16}
            fontSize={fontSize * 0.85}
            textAnchor="middle"
            className="fill-rose-700 dark:fill-rose-300"
          >
            Arm
          </text>
        )}
      </g>

      {/* Disk Controller */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("controller") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={ctrlX}
          y={ctrlY}
          width={ctrlWidth}
          height={ctrlHeight}
          rx={3}
          className={cn(
            "fill-rose-300/60 stroke-rose-500 stroke-2",
            "dark:fill-rose-500/50 dark:stroke-rose-400"
          )}
        />
        {/* Controller chip details */}
        <rect
          x={ctrlX + 4}
          y={ctrlY + 4}
          width={ctrlWidth - 8}
          height={ctrlHeight * 0.4}
          rx={2}
          className="fill-rose-400/50 dark:fill-rose-600/50"
        />
        {showLabels && (
          <text
            x={ctrlX + ctrlWidth / 2}
            y={ctrlY + ctrlHeight - 6}
            fontSize={fontSize * 0.8}
            textAnchor="middle"
            className="fill-rose-700 dark:fill-rose-300"
          >
            Ctrl
          </text>
        )}
      </g>

      {/* SATA Port (left edge for puzzle piece connection) */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("sata") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        {/* L-shaped SATA connector */}
        <path
          d={`M ${padding - 2} ${CANONICAL_HEIGHT * 0.4}
              L ${padding + sataWidth} ${CANONICAL_HEIGHT * 0.4}
              L ${padding + sataWidth} ${CANONICAL_HEIGHT * 0.4 + sataHeight * 0.6}
              L ${padding + sataWidth * 0.6} ${CANONICAL_HEIGHT * 0.4 + sataHeight * 0.6}
              L ${padding + sataWidth * 0.6} ${CANONICAL_HEIGHT * 0.4 + sataHeight}
              L ${padding - 2} ${CANONICAL_HEIGHT * 0.4 + sataHeight}
              Z`}
          className={cn(
            "fill-rose-400/80 stroke-rose-600 stroke-2",
            "dark:fill-rose-500/60 dark:stroke-rose-400"
          )}
        />
        {showLabels && (
          <text
            x={padding + sataWidth / 2}
            y={CANONICAL_HEIGHT * 0.4 - 4}
            fontSize={fontSize * 0.75}
            textAnchor="middle"
            className="fill-rose-700 dark:fill-rose-300"
          >
            SATA
          </text>
        )}
      </g>

      {/* Connection line from controller to platter */}
      <line
        x1={ctrlX}
        y1={ctrlY + ctrlHeight / 2}
        x2={platterCenterX + platterRadius * 0.5}
        y2={platterCenterY - platterRadius * 0.3}
        className="stroke-rose-300/50 stroke-1 stroke-dashed dark:stroke-rose-500/50"
      />
    </svg>
  )
}
