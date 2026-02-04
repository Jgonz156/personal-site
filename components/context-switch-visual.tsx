"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MotherboardDiagram } from "@/components/hardware"

export interface ContextSwitchVisualProps {
  autoPlay?: boolean
  speed?: "slow" | "normal" | "fast"
  showLabels?: boolean
  processAName?: string
  processBName?: string
  showCycleCount?: boolean
  className?: string
}

const steps = [
  {
    id: "running-a",
    title: "Running Process A",
    description: "Process A is mapped to the real hardware and executing",
    activeProcess: "a",
    phase: "running",
  },
  {
    id: "interrupt",
    title: "Timer Interrupt!",
    description: "Hardware timer fires, triggering a context switch",
    activeProcess: "a",
    phase: "interrupt",
  },
  {
    id: "save-a",
    title: "Save Process A State",
    description: "CPU registers saved to Process A's PCB",
    activeProcess: "a",
    phase: "saving",
  },
  {
    id: "switch",
    title: "Switching...",
    description: "Process A unmapped, Process B being loaded",
    activeProcess: null,
    phase: "switching",
  },
  {
    id: "load-b",
    title: "Load Process B State",
    description: "CPU registers loaded from Process B's PCB",
    activeProcess: "b",
    phase: "loading",
  },
  {
    id: "running-b",
    title: "Running Process B",
    description: "Process B is now mapped to the real hardware",
    activeProcess: "b",
    phase: "running",
  },
]

const speedMs = {
  slow: 2000,
  normal: 1200,
  fast: 600,
}

// Base dimensions for scaling calculations
const BASE_WIDTH = 700 // Design width
const BASE_HARDWARE_SIZE = { width: 220, height: 175 }
const BASE_PROCESS_SIZE = { width: 180, height: 145 }

export function ContextSwitchVisual({
  autoPlay = false,
  speed = "normal",
  showLabels = true,
  processAName = "Process A",
  processBName = "Process B",
  showCycleCount = true,
  className,
}: ContextSwitchVisualProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [containerWidth, setContainerWidth] = useState(BASE_WIDTH)
  const containerRef = useRef<HTMLDivElement>(null)

  const step = steps[currentStep]

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
      }, speedMs[speed])
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep, speed])

  // Calculate scale factor based on container width
  const scale = Math.min(1, containerWidth / BASE_WIDTH)
  
  // Scaled sizes
  const hardwareSize = {
    width: Math.floor(BASE_HARDWARE_SIZE.width * scale),
    height: Math.floor(BASE_HARDWARE_SIZE.height * scale),
  }
  const processSize = {
    width: Math.floor(BASE_PROCESS_SIZE.width * scale),
    height: Math.floor(BASE_PROCESS_SIZE.height * scale),
  }

  // Check if process A should be overlapping hardware
  const isAOverlapping = 
    (step.phase === "running" && step.activeProcess === "a") ||
    step.phase === "interrupt" ||
    step.phase === "saving"

  // Check if process B should be overlapping hardware
  const isBOverlapping = 
    (step.phase === "running" && step.activeProcess === "b") ||
    step.phase === "loading"

  // Hide side panels on very small screens
  const showSidePanels = scale > 0.6

  return (
    <div 
      ref={containerRef}
      className={cn("border rounded-lg bg-card overflow-hidden w-full", className)}
    >
      {/* Header with controls */}
      <div className="p-2 sm:p-3 border-b bg-muted/30 flex items-center justify-between">
        <h4 className="font-semibold text-xs sm:text-sm">Context Switch</h4>
        <div className="flex gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0 sm:h-8 sm:w-8"
            onClick={() => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)}
          >
            ◀
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0 sm:h-8 sm:w-8"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸" : "▶"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0 sm:h-8 sm:w-8"
            onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
          >
            ▶
          </Button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center gap-1 py-2 border-b">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === currentStep ? "bg-primary scale-125" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Main content area - scales with container */}
      <div className="p-2 sm:p-4">
        {/* TOP ROW: Real Hardware with optional side text */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          {/* Left side - Step info (hidden on small screens) */}
          {showSidePanels && (
            <div className="flex-1 text-right hidden sm:block">
              <div className={cn(
                "inline-block px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all text-left",
                step.activeProcess === "a" && "bg-blue-500/10 border border-blue-500/30",
                step.activeProcess === "b" && "bg-green-500/10 border border-green-500/30",
                step.activeProcess === null && "bg-muted"
              )}>
                <h5 className="font-semibold text-xs sm:text-sm">{step.title}</h5>
                <p className="text-xs text-muted-foreground max-w-[120px] sm:max-w-[150px]">{step.description}</p>
              </div>
            </div>
          )}

          {/* Center - Real Hardware with overlay area */}
          <div className="relative flex-shrink-0">
            {/* Real Hardware base */}
            <div className={cn(
              "p-1 sm:p-2 rounded-lg border-2 transition-all",
              step.phase === "interrupt" && "border-yellow-500 ring-2 ring-yellow-500/50",
              step.phase !== "interrupt" && "border-slate-400 dark:border-slate-600"
            )}>
              <MotherboardDiagram 
                width={hardwareSize.width} 
                height={hardwareSize.height} 
                showLabels={false} 
              />
            </div>
            
            {/* Label */}
            {showLabels && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-semibold text-muted-foreground bg-background px-1 sm:px-2 py-0.5 rounded border">
                  Real Hardware
                </span>
              </div>
            )}

            {/* Process A overlay */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-in-out",
                isAOverlapping ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
              )}
            >
              <div className={cn(
                "p-1 sm:p-2 rounded-lg border-2 h-full",
                "border-blue-500 bg-blue-500/20"
              )}>
                <MotherboardDiagram 
                  width={hardwareSize.width} 
                  height={hardwareSize.height} 
                  showLabels={false} 
                />
              </div>
            </div>

            {/* Process B overlay */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-in-out",
                isBOverlapping ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
              )}
            >
              <div className={cn(
                "p-1 sm:p-2 rounded-lg border-2 h-full",
                "border-green-500 bg-green-500/20"
              )}>
                <MotherboardDiagram 
                  width={hardwareSize.width} 
                  height={hardwareSize.height} 
                  showLabels={false} 
                />
              </div>
            </div>

            {/* Interrupt indicator */}
            {step.phase === "interrupt" && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="text-3xl sm:text-5xl animate-pulse">⚡</div>
              </div>
            )}
          </div>

          {/* Right side - Cycle count (hidden on small screens) */}
          {showSidePanels && showCycleCount && (
            <div className="flex-1 hidden sm:block">
              <div className="inline-block px-2 py-1 sm:px-3 sm:py-2 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Overhead:</p>
                <p className="text-xs sm:text-sm font-mono font-semibold">~1K-10K cycles</p>
              </div>
            </div>
          )}
        </div>

        {/* Step info for small screens (shown below hardware) */}
        {!showSidePanels && (
          <div className="text-center mb-4">
            <h5 className="font-semibold text-sm">{step.title}</h5>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        )}

        {/* Arrow indicator between rows */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className={cn(
            "flex flex-col items-center transition-all",
            (isAOverlapping || isBOverlapping) ? "text-primary" : "text-muted-foreground"
          )}>
            <span className="text-xl sm:text-2xl">↑</span>
            <span className="text-xs">Maps to</span>
          </div>
        </div>

        {/* BOTTOM ROW: Process motherboards side by side */}
        <div className="flex justify-center gap-4 sm:gap-8">
          {/* Process A */}
          <div className="flex flex-col items-center">
            <div className={cn(
              "px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold mb-1 sm:mb-2 transition-all",
              step.activeProcess === "a" 
                ? "bg-blue-500 text-white" 
                : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
            )}>
              {processAName}
              {step.activeProcess === "a" && step.phase === "running" && (
                <span className="ml-1">●</span>
              )}
            </div>
            <div className={cn(
              "p-1 sm:p-2 rounded-lg border-2 transition-all",
              step.activeProcess === "a" 
                ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30" 
                : "border-blue-400/30 bg-blue-500/5",
              isAOverlapping && "ring-2 ring-blue-500 ring-offset-2"
            )}>
              <MotherboardDiagram 
                width={processSize.width} 
                height={processSize.height} 
                showLabels={false} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2 text-center max-w-[100px] sm:max-w-[150px]">
              {isAOverlapping ? "On hardware" : "Waiting"}
            </p>
          </div>

          {/* Process B */}
          <div className="flex flex-col items-center">
            <div className={cn(
              "px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold mb-1 sm:mb-2 transition-all",
              step.activeProcess === "b"
                ? "bg-green-500 text-white"
                : "bg-green-500/20 text-green-600 dark:text-green-400"
            )}>
              {processBName}
              {step.activeProcess === "b" && step.phase === "running" && (
                <span className="ml-1">●</span>
              )}
            </div>
            <div className={cn(
              "p-1 sm:p-2 rounded-lg border-2 transition-all",
              step.activeProcess === "b" 
                ? "border-green-500 bg-green-500/10 ring-2 ring-green-500/30" 
                : "border-green-400/30 bg-green-500/5",
              isBOverlapping && "ring-2 ring-green-500 ring-offset-2"
            )}>
              <MotherboardDiagram 
                width={processSize.width} 
                height={processSize.height} 
                showLabels={false} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2 text-center max-w-[100px] sm:max-w-[150px]">
              {isBOverlapping ? "On hardware" : "Waiting"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
