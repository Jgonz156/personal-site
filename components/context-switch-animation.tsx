"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export interface ContextSwitchAnimationProps {
  autoPlay?: boolean
  showCycles?: boolean
  processAName?: string
  processBName?: string
  className?: string
}

const steps = [
  {
    title: "Running Process A",
    description: "Process A is executing on the CPU",
    processA: "running",
    processB: "ready",
    action: null,
  },
  {
    title: "Timer Interrupt!",
    description: "Hardware timer fires, interrupting execution",
    processA: "interrupted",
    processB: "ready",
    action: "interrupt",
  },
  {
    title: "Save Process A State",
    description: "CPU registers saved to Process A's PCB",
    processA: "saving",
    processB: "ready",
    action: "save",
  },
  {
    title: "Load Process B State",
    description: "CPU registers loaded from Process B's PCB",
    processA: "ready",
    processB: "loading",
    action: "load",
  },
  {
    title: "Resume Process B",
    description: "Process B now executing on the CPU",
    processA: "ready",
    processB: "running",
    action: null,
  },
]

export function ContextSwitchAnimation({
  autoPlay = false,
  showCycles = true,
  processAName = "Process A",
  processBName = "Process B",
  className,
}: ContextSwitchAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep])

  const step = steps[currentStep]

  const getProcessStyle = (state: string, isA: boolean) => {
    const baseColor = isA ? "blue" : "green"
    switch (state) {
      case "running":
        return `bg-${baseColor}-500/40 border-${baseColor}-500 ring-2 ring-${baseColor}-400`
      case "ready":
        return `bg-${baseColor}-500/20 border-${baseColor}-500/50`
      case "interrupted":
        return `bg-red-500/30 border-red-500 animate-pulse`
      case "saving":
        return `bg-yellow-500/30 border-yellow-500`
      case "loading":
        return `bg-yellow-500/30 border-yellow-500`
      default:
        return `bg-${baseColor}-500/20 border-${baseColor}-500/50`
    }
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">Context Switch Animation</h4>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)}
          >
            ◀ Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
          >
            Next ▶
          </Button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center gap-1 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === currentStep ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Animation area */}
      <div className="relative h-48 border rounded bg-muted/30">
        {/* CPU in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-16 bg-purple-500/30 border-2 border-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">CPU</span>
        </div>

        {/* Process A */}
        <div
          className={cn(
            "absolute top-4 left-4 w-24 h-16 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300",
            step.processA === "running" && "bg-blue-500/40 border-blue-500 ring-2 ring-blue-400",
            step.processA === "ready" && "bg-blue-500/20 border-blue-500/50",
            step.processA === "interrupted" && "bg-red-500/30 border-red-500 animate-pulse",
            step.processA === "saving" && "bg-yellow-500/30 border-yellow-500"
          )}
        >
          <span className="text-xs font-semibold">{processAName}</span>
          <span className="text-xs text-muted-foreground capitalize">{step.processA}</span>
        </div>

        {/* Process A's PCB */}
        <div className="absolute bottom-4 left-4 w-20 h-12 bg-blue-500/10 border border-blue-500/30 rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">PCB A</span>
        </div>

        {/* Process B */}
        <div
          className={cn(
            "absolute top-4 right-4 w-24 h-16 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300",
            step.processB === "running" && "bg-green-500/40 border-green-500 ring-2 ring-green-400",
            step.processB === "ready" && "bg-green-500/20 border-green-500/50",
            step.processB === "loading" && "bg-yellow-500/30 border-yellow-500"
          )}
        >
          <span className="text-xs font-semibold">{processBName}</span>
          <span className="text-xs text-muted-foreground capitalize">{step.processB}</span>
        </div>

        {/* Process B's PCB */}
        <div className="absolute bottom-4 right-4 w-20 h-12 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">PCB B</span>
        </div>

        {/* Action arrows */}
        {step.action === "interrupt" && (
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2">
            <span className="text-yellow-500 text-2xl animate-pulse">⚡</span>
          </div>
        )}
        {step.action === "save" && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <path
              d="M 70 60 Q 70 100 70 130"
              fill="none"
              className="stroke-yellow-500 stroke-2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-down)"
            />
          </svg>
        )}
        {step.action === "load" && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <path
              d="M 320 130 Q 320 100 320 60"
              fill="none"
              className="stroke-yellow-500 stroke-2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-up)"
            />
          </svg>
        )}

        {/* Arrow markers */}
        <svg width="0" height="0">
          <defs>
            <marker id="arrow-down" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" className="fill-yellow-500" />
            </marker>
            <marker id="arrow-up" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" className="fill-yellow-500" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Step description */}
      <div className="mt-4 text-center">
        <h5 className="font-semibold">{step.title}</h5>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>

      {/* Cycle cost */}
      {showCycles && (
        <div className="mt-2 text-center text-xs text-muted-foreground">
          Context switch overhead: ~1,000-10,000 CPU cycles
        </div>
      )}
    </div>
  )
}
