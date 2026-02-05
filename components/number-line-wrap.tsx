"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

// ============================================================================
// Types
// ============================================================================

export interface NumberLineWrapProps {
  modulus: number // The ring size (e.g., 5)
  maxDisplay?: number // How many "laps" to show (default: 3)
  animationDuration?: number // Total animation time in ms
  caption?: string
  className?: string
}

type AnimationPhase = "initial" | "curving" | "collapsing" | "complete"

// ============================================================================
// Component
// ============================================================================

export function NumberLineWrap({
  modulus,
  maxDisplay = 3,
  animationDuration = 4000,
  caption,
  className = "",
}: NumberLineWrapProps) {
  const [phase, setPhase] = useState<AnimationPhase>("initial")
  const [progress, setProgress] = useState(0)

  const totalNumbers = modulus * maxDisplay
  const svgWidth = 500
  const svgHeight = 400
  const centerX = svgWidth / 2
  const centerY = svgHeight / 2 + 30
  const ringRadius = 100
  const pointRadius = 10

  // Animation timing
  const phaseDurations = {
    initial: 0,
    curving: animationDuration * 0.4,
    collapsing: animationDuration * 0.4,
    complete: animationDuration * 0.2,
  }

  const resetAnimation = useCallback(() => {
    setPhase("initial")
    setProgress(0)
  }, [])

  const playAnimation = useCallback(() => {
    resetAnimation()
    setTimeout(() => {
      setPhase("curving")
      setProgress(0)
    }, 100)
  }, [resetAnimation])

  // Animate progress within each phase
  useEffect(() => {
    if (phase === "initial" || phase === "complete") return

    const duration = phaseDurations[phase]
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(1, elapsed / duration)
      setProgress(newProgress)

      if (newProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Transition to next phase
        if (phase === "curving") {
          setPhase("collapsing")
          setProgress(0)
        } else if (phase === "collapsing") {
          setPhase("complete")
          setProgress(1)
        }
      }
    }

    requestAnimationFrame(animate)
  }, [phase])

  // Calculate point position based on animation phase
  const getPointPosition = (index: number) => {
    const ringPosition = index % modulus
    const lap = Math.floor(index / modulus)

    // Easing function
    const ease = (t: number) => t * t * (3 - 2 * t) // smoothstep

    if (phase === "initial") {
      // Linear number line
      const spacing = 35
      const startX = 30
      return {
        x: startX + index * spacing,
        y: 50,
        opacity: 1,
        scale: 1,
      }
    }

    if (phase === "curving") {
      // Transition from line to spiral
      const t = ease(progress)

      // Start position (linear)
      const spacing = 35
      const startX = 30
      const lineX = startX + index * spacing
      const lineY = 50

      // End position (spiral around ring)
      const angle = (ringPosition / modulus) * 2 * Math.PI - Math.PI / 2
      const spiralRadius = ringRadius + lap * 25
      const ringX = centerX + spiralRadius * Math.cos(angle)
      const ringY = centerY + spiralRadius * Math.sin(angle)

      return {
        x: lineX + (ringX - lineX) * t,
        y: lineY + (ringY - lineY) * t,
        opacity: 1,
        scale: 1,
      }
    }

    if (phase === "collapsing" || phase === "complete") {
      // Collapse all laps onto the ring
      const t = phase === "complete" ? 1 : ease(progress)

      const angle = (ringPosition / modulus) * 2 * Math.PI - Math.PI / 2

      // Start: spiral position
      const startRadius = ringRadius + lap * 25
      const startX = centerX + startRadius * Math.cos(angle)
      const startY = centerY + startRadius * Math.sin(angle)

      // End: all on the ring
      const endX = centerX + ringRadius * Math.cos(angle)
      const endY = centerY + ringRadius * Math.sin(angle)

      // Fade out duplicates slightly
      const opacity = lap === 0 ? 1 : 1 - t * 0.6

      return {
        x: startX + (endX - startX) * t,
        y: startY + (endY - startY) * t,
        opacity,
        scale: lap === 0 ? 1 : 1 - t * 0.3,
      }
    }

    return { x: 0, y: 0, opacity: 1, scale: 1 }
  }

  // Get color for each lap
  const lapColors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
  ]

  // Generate points data
  const points = Array.from({ length: totalNumbers }, (_, i) => ({
    index: i,
    value: i,
    lap: Math.floor(i / modulus),
    ringPosition: i % modulus,
    ...getPointPosition(i),
  }))

  return (
    <div className={`my-6 ${className}`}>
      <div className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full"
          style={{ height: "350px" }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background ring (visible during and after animation) */}
          {(phase === "collapsing" || phase === "complete") && (
            <circle
              cx={centerX}
              cy={centerY}
              r={ringRadius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="text-foreground/20"
            />
          )}

          {/* Phase label */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 20}
            textAnchor="middle"
            className="text-sm fill-foreground/60 font-medium"
          >
            {phase === "initial" && "Infinite number line: 0, 1, 2, 3, ..."}
            {phase === "curving" && "Wrapping around..."}
            {phase === "collapsing" && "Equivalence classes collapsing..."}
            {phase === "complete" &&
              `mod ${modulus}: Each position represents infinitely many numbers!`}
          </text>

          {/* Number points */}
          {points.map((point) => (
            <g
              key={point.index}
              style={{
                opacity: point.opacity,
                transform: `translate(${point.x}px, ${point.y}px) scale(${point.scale})`,
                transformOrigin: "center",
              }}
            >
              <circle
                cx={0}
                cy={0}
                r={pointRadius}
                fill={lapColors[point.lap % lapColors.length]}
                stroke="#fff"
                strokeWidth={1}
              />
              <text
                x={0}
                y={0}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-bold fill-white"
              >
                {point.value}
              </text>
            </g>
          ))}

          {/* Equivalence labels when complete */}
          {phase === "complete" &&
            Array.from({ length: modulus }, (_, i) => {
              const angle = (i / modulus) * 2 * Math.PI - Math.PI / 2
              const labelRadius = ringRadius + 35
              const x = centerX + labelRadius * Math.cos(angle)
              const y = centerY + labelRadius * Math.sin(angle)

              // Show equivalence class
              const equivalents = Array.from(
                { length: maxDisplay },
                (_, lap) => i + lap * modulus
              )

              return (
                <text
                  key={`equiv-${i}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs fill-foreground/70 font-mono"
                >
                  {equivalents.join(" ≡ ")} ...
                </text>
              )
            })}

          {/* Center modulus label when complete */}
          {phase === "complete" && (
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-xl font-bold fill-primary"
            >
              ℤ/{modulus}ℤ
            </text>
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <Button onClick={playAnimation} size="sm" variant="outline">
          ▶ Play Animation
        </Button>
        <Button onClick={resetAnimation} size="sm" variant="ghost">
          Reset
        </Button>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}
