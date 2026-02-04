"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Canonical dimensions - all internal calculations use these
const CANONICAL_WIDTH = 400
const CANONICAL_HEIGHT = 320

export interface IOHardwareDiagramProps {
  width?: number
  height?: number
  showCPUSocket?: boolean
  showRAMSlots?: boolean
  showDiskConnector?: boolean
  connectedComponents?: ("cpu" | "ram" | "disk")[]
  highlightParts?: string[]
  showLabels?: boolean
  activePort?: string
  showDataFlow?: boolean
  dataFlowPath?: string[]
  className?: string
}

export function IOHardwareDiagram({
  width = CANONICAL_WIDTH,
  height = CANONICAL_HEIGHT,
  showCPUSocket = true,
  showRAMSlots = true,
  showDiskConnector = true,
  connectedComponents = [],
  highlightParts = [],
  showLabels = true,
  activePort,
  showDataFlow = false,
  dataFlowPath = [],
  className,
}: IOHardwareDiagramProps) {
  const [flowStep, setFlowStep] = useState(0)

  // Animate data flow
  useEffect(() => {
    if (showDataFlow && dataFlowPath.length > 0) {
      const interval = setInterval(() => {
        setFlowStep((prev) => (prev + 1) % dataFlowPath.length)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [showDataFlow, dataFlowPath])

  const isHighlighted = (part: string) => {
    if (showDataFlow && dataFlowPath.length > 0) {
      return dataFlowPath[flowStep] === part
    }
    return highlightParts.includes(part)
  }

  const isConnected = (component: "cpu" | "ram" | "disk") => 
    connectedComponents.includes(component)

  const fontSize = 10
  const padding = 12

  // Component positions using canonical dimensions
  const cpuSocketX = CANONICAL_WIDTH * 0.35
  const cpuSocketY = CANONICAL_HEIGHT * 0.55
  const cpuSocketSize = 80

  const ramSlotX = CANONICAL_WIDTH * 0.25
  const ramSlotY = padding + 20
  const ramSlotWidth = CANONICAL_WIDTH * 0.5
  const ramSlotHeight = 24

  const sataX = CANONICAL_WIDTH - 50
  const sataY = CANONICAL_HEIGHT * 0.7

  // Bus layout
  const busWidth = 6
  const mainBusY = CANONICAL_HEIGHT * 0.45

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${CANONICAL_WIDTH} ${CANONICAL_HEIGHT}`}
      className={cn("", className)}
    >
      {/* PCB Background */}
      <rect
        x={0}
        y={0}
        width={CANONICAL_WIDTH}
        height={CANONICAL_HEIGHT}
        rx={8}
        className="fill-yellow-500/10 dark:fill-yellow-500/5"
      />

      {/* PCB Edge with mounting holes */}
      <rect
        x={2}
        y={2}
        width={CANONICAL_WIDTH - 4}
        height={CANONICAL_HEIGHT - 4}
        rx={6}
        className="fill-none stroke-yellow-600/50 stroke-2 dark:stroke-yellow-500/30"
      />
      {/* Mounting holes */}
      {[[20, 20], [CANONICAL_WIDTH - 20, 20], [20, CANONICAL_HEIGHT - 20], [CANONICAL_WIDTH - 20, CANONICAL_HEIGHT - 20]].map(([x, y], i) => (
        <circle
          key={`mount-${i}`}
          cx={x}
          cy={y}
          r={6}
          className="fill-background stroke-yellow-600/50 stroke-1 dark:stroke-yellow-500/30"
        />
      ))}

      {/* Main Bus - thick horizontal line */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("bus") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={padding + 40}
          y={mainBusY - busWidth / 2}
          width={CANONICAL_WIDTH - padding * 2 - 80}
          height={busWidth}
          className={cn(
            "fill-yellow-400 stroke-yellow-600 stroke-1",
            "dark:fill-yellow-500 dark:stroke-yellow-400"
          )}
        />
        {/* Secondary bus lines */}
        <rect
          x={padding + 40}
          y={mainBusY + busWidth}
          width={CANONICAL_WIDTH - padding * 2 - 80}
          height={2}
          className="fill-yellow-300/60 dark:fill-yellow-600/60"
        />
        <rect
          x={padding + 40}
          y={mainBusY - busWidth - 2}
          width={CANONICAL_WIDTH - padding * 2 - 80}
          height={2}
          className="fill-yellow-300/60 dark:fill-yellow-600/60"
        />
        {showLabels && (
          <text
            x={CANONICAL_WIDTH / 2}
            y={mainBusY - busWidth - 8}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-yellow-700 dark:fill-yellow-300 font-semibold"
          >
            MAIN BUS
          </text>
        )}
      </g>

      {/* Vertical bus to CPU socket */}
      <rect
        x={cpuSocketX + cpuSocketSize / 2 - busWidth / 2}
        y={mainBusY + busWidth / 2}
        width={busWidth}
        height={cpuSocketY - mainBusY - busWidth / 2}
        className="fill-yellow-400 dark:fill-yellow-500"
      />

      {/* Vertical bus to RAM slots */}
      <rect
        x={ramSlotX + ramSlotWidth / 2 - busWidth / 2}
        y={ramSlotY + ramSlotHeight}
        width={busWidth}
        height={mainBusY - ramSlotY - ramSlotHeight - busWidth / 2}
        className="fill-yellow-400 dark:fill-yellow-500"
      />

      {/* CPU Socket */}
      {showCPUSocket && !isConnected("cpu") && (
        <g className={cn(
          "transition-opacity",
          isHighlighted("cpu-socket") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
        )}>
          <rect
            x={cpuSocketX}
            y={cpuSocketY}
            width={cpuSocketSize}
            height={cpuSocketSize * 0.8}
            rx={4}
            className={cn(
              "fill-background stroke-yellow-600 stroke-2 stroke-dashed",
              "dark:stroke-yellow-400"
            )}
          />
          {/* Pin holes grid */}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <circle
                key={`pin-hole-${row}-${col}`}
                cx={cpuSocketX + 12 + col * 14}
                cy={cpuSocketY + 10 + row * 14}
                r={3}
                className="fill-yellow-300/50 stroke-yellow-500 stroke-1 dark:fill-yellow-600/30"
              />
            ))
          )}
          {showLabels && (
            <text
              x={cpuSocketX + cpuSocketSize / 2}
              y={cpuSocketY + cpuSocketSize * 0.8 + fontSize + 4}
              fontSize={fontSize}
              textAnchor="middle"
              className="fill-yellow-700 dark:fill-yellow-300"
            >
              CPU Socket
            </text>
          )}
        </g>
      )}

      {/* RAM Slots */}
      {showRAMSlots && !isConnected("ram") && (
        <g className={cn(
          "transition-opacity",
          isHighlighted("ram-slots") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
        )}>
          {/* Two RAM slots */}
          {[0, 1].map((i) => (
            <g key={`ram-slot-${i}`}>
              <rect
                x={ramSlotX}
                y={ramSlotY + i * (ramSlotHeight + 4)}
                width={ramSlotWidth}
                height={ramSlotHeight - 2}
                rx={2}
                className={cn(
                  "fill-background stroke-yellow-600 stroke-2 stroke-dashed",
                  "dark:stroke-yellow-400"
                )}
              />
              {/* Slot notches */}
              <rect
                x={ramSlotX + ramSlotWidth * 0.35}
                y={ramSlotY + i * (ramSlotHeight + 4)}
                width={8}
                height={6}
                className="fill-yellow-500 dark:fill-yellow-400"
              />
              <rect
                x={ramSlotX + ramSlotWidth * 0.65}
                y={ramSlotY + i * (ramSlotHeight + 4)}
                width={8}
                height={6}
                className="fill-yellow-500 dark:fill-yellow-400"
              />
            </g>
          ))}
          {showLabels && (
            <text
              x={ramSlotX - 10}
              y={ramSlotY + ramSlotHeight}
              fontSize={fontSize * 0.9}
              textAnchor="end"
              className="fill-yellow-700 dark:fill-yellow-300"
            >
              RAM
            </text>
          )}
        </g>
      )}

      {/* DMA Chip */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("dma") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={CANONICAL_WIDTH * 0.7}
          y={mainBusY - 30}
          width={40}
          height={25}
          rx={3}
          className={cn(
            "fill-yellow-300/70 stroke-yellow-600 stroke-2",
            "dark:fill-yellow-500/50 dark:stroke-yellow-400"
          )}
        />
        {/* Bidirectional arrows */}
        <path
          d={`M${CANONICAL_WIDTH * 0.7 + 8},${mainBusY - 22} L${CANONICAL_WIDTH * 0.7 + 8},${mainBusY - 12}`}
          className="stroke-yellow-700 stroke-2 dark:stroke-yellow-300"
          markerEnd="url(#arrowhead)"
          markerStart="url(#arrowhead-reverse)"
        />
        {showLabels && (
          <text
            x={CANONICAL_WIDTH * 0.7 + 20}
            y={mainBusY - 15}
            fontSize={fontSize * 0.9}
            textAnchor="middle"
            className="fill-yellow-800 dark:fill-yellow-200 font-semibold"
          >
            DMA
          </text>
        )}
      </g>

      {/* Device Controller */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("controller") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={padding + 50}
          y={mainBusY + 20}
          width={50}
          height={30}
          rx={3}
          className={cn(
            "fill-yellow-200/70 stroke-yellow-500 stroke-1",
            "dark:fill-yellow-600/40 dark:stroke-yellow-400"
          )}
        />
        {showLabels && (
          <text
            x={padding + 75}
            y={mainBusY + 38}
            fontSize={fontSize * 0.8}
            textAnchor="middle"
            className="fill-yellow-700 dark:fill-yellow-300"
          >
            Ctrl
          </text>
        )}
      </g>

      {/* USB Port */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("usb") || activePort === "usb" ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={2}
          y={CANONICAL_HEIGHT * 0.3}
          width={20}
          height={35}
          className={cn(
            "fill-yellow-300/80 stroke-yellow-600 stroke-2",
            activePort === "usb" && "fill-yellow-400 stroke-yellow-500",
            "dark:fill-yellow-500/60 dark:stroke-yellow-400"
          )}
        />
        {/* USB port inner */}
        <rect
          x={4}
          y={CANONICAL_HEIGHT * 0.3 + 8}
          width={12}
          height={20}
          className="fill-background stroke-yellow-500 stroke-1"
        />
        {showLabels && (
          <text
            x={12}
            y={CANONICAL_HEIGHT * 0.3 - 5}
            fontSize={fontSize * 0.8}
            textAnchor="middle"
            className="fill-yellow-700 dark:fill-yellow-300"
          >
            USB
          </text>
        )}
        {/* Connection to bus */}
        <line
          x1={22}
          y1={CANONICAL_HEIGHT * 0.3 + 17}
          x2={padding + 40}
          y2={mainBusY}
          className="stroke-yellow-400 stroke-2 dark:stroke-yellow-500"
        />
      </g>

      {/* SATA Connector (for HDD) */}
      {showDiskConnector && !isConnected("disk") && (
        <g className={cn(
          "transition-opacity",
          isHighlighted("sata") || activePort === "sata" ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
        )}>
          {/* L-shaped SATA connector */}
          <path
            d={`M${sataX},${sataY} L${sataX + 30},${sataY} L${sataX + 30},${sataY + 15} L${sataX + 10},${sataY + 15} L${sataX + 10},${sataY + 8} L${sataX},${sataY + 8} Z`}
            className={cn(
              "fill-background stroke-yellow-600 stroke-2 stroke-dashed",
              "dark:stroke-yellow-400"
            )}
          />
          {showLabels && (
            <text
              x={sataX + 15}
              y={sataY + 28}
              fontSize={fontSize * 0.9}
              textAnchor="middle"
              className="fill-yellow-700 dark:fill-yellow-300"
            >
              SATA
            </text>
          )}
          {/* Connection to bus */}
          <line
            x1={sataX}
            y1={sataY + 4}
            x2={CANONICAL_WIDTH - padding - 40}
            y2={mainBusY}
            className="stroke-yellow-400 stroke-2 dark:stroke-yellow-500"
          />
        </g>
      )}

      {/* PCIe Slot */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("pcie") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={padding + 60}
          y={CANONICAL_HEIGHT - 35}
          width={100}
          height={18}
          rx={2}
          className={cn(
            "fill-yellow-200/60 stroke-yellow-500 stroke-1",
            "dark:fill-yellow-600/40 dark:stroke-yellow-400"
          )}
        />
        {/* Slot divider */}
        <rect
          x={padding + 85}
          y={CANONICAL_HEIGHT - 35}
          width={4}
          height={18}
          className="fill-yellow-500 dark:fill-yellow-400"
        />
        {showLabels && (
          <text
            x={padding + 110}
            y={CANONICAL_HEIGHT - 22}
            fontSize={fontSize * 0.8}
            textAnchor="middle"
            className="fill-yellow-700 dark:fill-yellow-300"
          >
            PCIe
          </text>
        )}
      </g>

      {/* Arrow marker definitions */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" className="fill-yellow-700 dark:fill-yellow-300" />
        </marker>
        <marker
          id="arrowhead-reverse"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto-start-reverse"
        >
          <polygon points="0 0, 6 3, 0 6" className="fill-yellow-700 dark:fill-yellow-300" />
        </marker>
      </defs>
    </svg>
  )
}
