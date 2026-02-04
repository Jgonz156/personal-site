"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { CPUDiagram } from "./cpu-diagram"
import { RAMDiagram } from "./ram-diagram"
import { IOHardwareDiagram } from "./io-hardware-diagram"
import { HDDDiagram } from "./hdd-diagram"

// Canonical dimensions
const CANONICAL_WIDTH = 400
const CANONICAL_HEIGHT = 320

// Canonical child component sizes (from their own canonical dimensions)
const CPU_CANONICAL = { width: 200, height: 160 }
const RAM_CANONICAL = { width: 260, height: 70 }
const HDD_CANONICAL = { width: 160, height: 120 }

export interface MotherboardDiagramProps {
  width?: number
  height?: number
  showComponents?: ("cpu" | "ram" | "io" | "disk")[]
  highlightComponent?: "cpu" | "ram" | "io" | "disk"
  showLabels?: boolean
  interactive?: boolean
  onComponentClick?: (component: "cpu" | "ram" | "io" | "disk") => void
  animateAssembly?: boolean
  className?: string
}

export function MotherboardDiagram({
  width = CANONICAL_WIDTH,
  height = CANONICAL_HEIGHT,
  showComponents = ["cpu", "ram", "io", "disk"],
  highlightComponent,
  showLabels = true,
  interactive = false,
  onComponentClick,
  animateAssembly = false,
  className,
}: MotherboardDiagramProps) {
  // Calculate scale factors
  const scaleX = width / CANONICAL_WIDTH
  const scaleY = height / CANONICAL_HEIGHT
  const scale = Math.min(scaleX, scaleY)

  const [assemblyStep, setAssemblyStep] = useState(animateAssembly ? 0 : 4)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  // Animation for assembly
  useEffect(() => {
    if (animateAssembly && assemblyStep < 4) {
      const timer = setTimeout(() => {
        setAssemblyStep((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [animateAssembly, assemblyStep])

  const showCPU = showComponents.includes("cpu") && assemblyStep >= 1
  const showRAM = showComponents.includes("ram") && assemblyStep >= 2
  const showDisk = showComponents.includes("disk") && assemblyStep >= 3

  // Calculate child component sizes proportionally
  const cpuWidth = CPU_CANONICAL.width * scale * 0.5
  const cpuHeight = CPU_CANONICAL.height * scale * 0.5
  
  const ramWidth = RAM_CANONICAL.width * scale * 0.5
  const ramHeight = RAM_CANONICAL.height * scale * 0.5
  
  const hddWidth = HDD_CANONICAL.width * scale * 0.4
  const hddHeight = HDD_CANONICAL.height * scale * 0.4

  // Component positions aligned with IOHardwareDiagram sockets
  // CPU socket in IO is at x=0.35, y=0.55 (canonical 400x320)
  // RAM slot in IO is at x=0.25, y~0.10
  // SATA in IO is at x=0.875 (width-50)/400, y=0.70
  
  const cpuPosition = {
    x: width * 0.35 - cpuWidth * 0.1,  // Align with CPU socket
    y: height * 0.55 - cpuHeight * 0.1, // Align with CPU socket
  }

  const ramPosition = {
    x: width * 0.25,  // Align with RAM slot
    y: height * 0.10, // Align with RAM slot
  }

  const hddPosition = {
    x: width * 0.72,  // Align near SATA connector
    y: height * 0.58,
  }

  const handleClick = (component: "cpu" | "ram" | "io" | "disk") => {
    if (interactive && onComponentClick) {
      onComponentClick(component)
    }
  }

  const getOpacity = (component: string) => {
    if (highlightComponent) {
      return component === highlightComponent ? "opacity-100" : "opacity-30"
    }
    if (hoveredComponent && interactive) {
      return component === hoveredComponent ? "opacity-100" : "opacity-60"
    }
    return "opacity-100"
  }

  return (
    <div 
      className={cn(
        "relative",
        interactive && "cursor-pointer",
        className
      )}
      style={{ width, height }}
    >
      {/* Base layer: I/O Hardware (PCB with buses and sockets) */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          getOpacity("io")
        )}
        onClick={() => handleClick("io")}
        onMouseEnter={() => interactive && setHoveredComponent("io")}
        onMouseLeave={() => setHoveredComponent(null)}
      >
        <IOHardwareDiagram
          width={width}
          height={height}
          showCPUSocket={!showCPU}
          showRAMSlots={!showRAM}
          showDiskConnector={!showDisk}
          connectedComponents={[
            ...(showCPU ? ["cpu" as const] : []),
            ...(showRAM ? ["ram" as const] : []),
            ...(showDisk ? ["disk" as const] : []),
          ]}
          showLabels={showLabels && scale > 0.5}
          highlightParts={highlightComponent === "io" ? ["bus", "dma", "controller", "usb", "pcie"] : []}
        />
      </div>

      {/* CPU - snaps into CPU socket */}
      {showCPU && (
        <div
          className={cn(
            "absolute transition-all duration-500",
            animateAssembly && assemblyStep === 1 && "animate-bounce",
            getOpacity("cpu")
          )}
          style={{
            left: cpuPosition.x,
            top: cpuPosition.y,
          }}
          onClick={() => handleClick("cpu")}
          onMouseEnter={() => interactive && setHoveredComponent("cpu")}
          onMouseLeave={() => setHoveredComponent(null)}
        >
          <CPUDiagram
            width={cpuWidth}
            height={cpuHeight}
            showLabels={showLabels && scale > 0.5}
            highlightParts={highlightComponent === "cpu" ? ["registers", "alu", "cu", "ring", "mmu", "interrupt"] : []}
          />
        </div>
      )}

      {/* RAM - snaps into RAM slots */}
      {showRAM && (
        <div
          className={cn(
            "absolute transition-all duration-500",
            animateAssembly && assemblyStep === 2 && "animate-bounce",
            getOpacity("ram")
          )}
          style={{
            left: ramPosition.x,
            top: ramPosition.y,
          }}
          onClick={() => handleClick("ram")}
          onMouseEnter={() => interactive && setHoveredComponent("ram")}
          onMouseLeave={() => setHoveredComponent(null)}
        >
          <RAMDiagram
            width={ramWidth}
            height={ramHeight}
            showLabels={showLabels && scale > 0.5}
            highlightParts={highlightComponent === "ram" ? ["nand", "controller"] : []}
          />
        </div>
      )}

      {/* HDD - connects to SATA */}
      {showDisk && (
        <div
          className={cn(
            "absolute transition-all duration-500",
            animateAssembly && assemblyStep === 3 && "animate-bounce",
            getOpacity("disk")
          )}
          style={{
            left: hddPosition.x,
            top: hddPosition.y,
          }}
          onClick={() => handleClick("disk")}
          onMouseEnter={() => interactive && setHoveredComponent("disk")}
          onMouseLeave={() => setHoveredComponent(null)}
        >
          <HDDDiagram
            width={hddWidth}
            height={hddHeight}
            showLabels={showLabels && scale > 0.5}
            highlightParts={highlightComponent === "disk" ? ["platter", "arm", "controller", "sata"] : []}
            animateArm={highlightComponent === "disk"}
          />
        </div>
      )}

      {/* Component labels when highlighted */}
      {highlightComponent && showLabels && scale > 0.6 && (
        <div className="absolute top-2 left-2 bg-background/80 px-2 py-1 rounded text-sm font-semibold">
          {highlightComponent === "cpu" && (
            <span className="text-purple-600 dark:text-purple-400">CPU - Central Processing Unit</span>
          )}
          {highlightComponent === "ram" && (
            <span className="text-cyan-600 dark:text-cyan-400">RAM - Random Access Memory</span>
          )}
          {highlightComponent === "io" && (
            <span className="text-yellow-600 dark:text-yellow-400">I/O - Input/Output Bus & Ports</span>
          )}
          {highlightComponent === "disk" && (
            <span className="text-rose-600 dark:text-rose-400">HDD - Hard Disk Drive</span>
          )}
        </div>
      )}

      {/* Legend */}
      {showLabels && !highlightComponent && scale > 0.6 && (
        <div className="absolute bottom-2 right-2 flex gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-purple-500/50 border border-purple-500" />
            <span className="text-muted-foreground">CPU</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-cyan-500/50 border border-cyan-500" />
            <span className="text-muted-foreground">RAM</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500/50 border border-yellow-500" />
            <span className="text-muted-foreground">I/O</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-rose-500/50 border border-rose-500" />
            <span className="text-muted-foreground">Disk</span>
          </div>
        </div>
      )}
    </div>
  )
}
