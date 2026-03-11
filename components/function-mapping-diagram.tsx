"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface FunctionMappingStep {
  description: string
  mappingsRevealed: number
}

interface FunctionMappingDiagramProps {
  lambda: string
  typeSignature: [string, string]
  domainLabel: string
  codomainLabel: string
  domainElements: string[]
  codomainElements: string[]
  mappings: [number, number][]
  steps: FunctionMappingStep[]
  domainColor?: string
  codomainColor?: string
  domainFinite?: boolean
  codomainFinite?: boolean
}

const DOMAIN_COLOR_DEFAULT = "#3b82f6"
const CODOMAIN_COLOR_DEFAULT = "#22c55e"

const BOX_W = 140
const BOX_PAD_TOP = 36
const BOX_PAD_BOTTOM = 12
const ELEM_H = 28
const ELEM_GAP = 4
const ELLIPSIS_H = 20
const GAP = 180
const SVG_PAD = 16

function boxHeight(count: number, finite: boolean) {
  const elemsH = count * ELEM_H + (count - 1) * ELEM_GAP
  const ellipsesH = finite ? 0 : ELLIPSIS_H * 2
  return BOX_PAD_TOP + ellipsesH / 2 + elemsH + ellipsesH / 2 + BOX_PAD_BOTTOM
}

export function FunctionMappingDiagram({
  lambda,
  typeSignature,
  domainLabel,
  codomainLabel,
  domainElements,
  codomainElements,
  mappings,
  steps,
  domainColor = DOMAIN_COLOR_DEFAULT,
  codomainColor = CODOMAIN_COLOR_DEFAULT,
  domainFinite = false,
  codomainFinite = false,
}: FunctionMappingDiagramProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = steps[currentStep]
  const revealed = step.mappingsRevealed

  const domainH = boxHeight(domainElements.length, domainFinite)
  const codomainH = boxHeight(codomainElements.length, codomainFinite)
  const maxH = Math.max(domainH, codomainH)

  const headerH = 48
  const svgW = SVG_PAD + BOX_W + GAP + BOX_W + SVG_PAD
  const svgH = headerH + maxH + SVG_PAD

  const domainX = SVG_PAD
  const domainY = headerH + (maxH - domainH) / 2
  const codomainX = SVG_PAD + BOX_W + GAP
  const codomainY = headerH + (maxH - codomainH) / 2

  const domainEllipsisOffset = domainFinite ? 0 : ELLIPSIS_H
  const codomainEllipsisOffset = codomainFinite ? 0 : ELLIPSIS_H

  function elemY(boxY: number, idx: number, ellipsisOff: number) {
    return boxY + BOX_PAD_TOP + ellipsisOff + idx * (ELEM_H + ELEM_GAP) + ELEM_H / 2
  }

  const { preimage, image } = useMemo(() => {
    const pre = new Set<string>()
    const img = new Set<string>()
    for (let i = 0; i < revealed && i < mappings.length; i++) {
      const [dIdx, cIdx] = mappings[i]
      pre.add(domainElements[dIdx])
      img.add(codomainElements[cIdx])
    }
    return { preimage: pre, image: img }
  }, [revealed, mappings, domainElements, codomainElements])

  const goToStep = (next: number) => {
    if (next < 0 || next >= steps.length) return
    setCurrentStep(next)
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          🗺️ Function Mapping: {lambda}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* SVG Diagram */}
      <div className="px-4 py-4 flex justify-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          width="100%"
          style={{ maxWidth: svgW, minWidth: 320 }}
          className="select-none"
        >
          {/* Type signature header */}
          <text
            x={svgW / 2}
            y={20}
            textAnchor="middle"
            className="fill-current"
            fontSize="14"
            fontWeight="600"
          >
            <tspan>f = {lambda}</tspan>
          </text>
          <text
            x={svgW / 2}
            y={38}
            textAnchor="middle"
            fontSize="13"
          >
            <tspan fill={domainColor} fontWeight="600">{typeSignature[0]}</tspan>
            <tspan className="fill-current" opacity="0.5"> → </tspan>
            <tspan fill={codomainColor} fontWeight="600">{typeSignature[1]}</tspan>
          </text>

          {/* Domain box */}
          <rect
            x={domainX}
            y={domainY}
            width={BOX_W}
            height={domainH}
            rx={10}
            ry={10}
            fill="none"
            stroke={domainColor}
            strokeWidth={2}
            opacity={0.6}
          />
          <text
            x={domainX + BOX_W / 2}
            y={domainY + 22}
            textAnchor="middle"
            fill={domainColor}
            fontSize="12"
            fontWeight="600"
          >
            {domainLabel}
          </text>

          {/* Domain top ellipsis */}
          {!domainFinite && (
            <text
              x={domainX + BOX_W - 24}
              y={domainY + BOX_PAD_TOP + ELLIPSIS_H / 2}
              textAnchor="middle"
              fontSize="14"
              className="fill-current"
              opacity={0.4}
            >
              ⋮
            </text>
          )}

          {/* Domain elements */}
          {domainElements.map((el, i) => {
            const cy = elemY(domainY, i, domainEllipsisOffset)
            const highlighted = preimage.has(el)
            return (
              <g key={`d-${i}`}>
                <circle
                  cx={domainX + BOX_W - 24}
                  cy={cy}
                  r={10}
                  fill={highlighted ? domainColor + "30" : "transparent"}
                  stroke={highlighted ? domainColor : "currentColor"}
                  strokeWidth={1.5}
                  opacity={highlighted ? 1 : 0.3}
                />
                <text
                  x={domainX + BOX_W - 24}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="11"
                  className="fill-current"
                  fontFamily="monospace"
                  opacity={highlighted ? 1 : 0.5}
                >
                  {el}
                </text>
              </g>
            )
          })}

          {/* Domain bottom ellipsis */}
          {!domainFinite && (
            <text
              x={domainX + BOX_W - 24}
              y={elemY(domainY, domainElements.length - 1, domainEllipsisOffset) + ELEM_H / 2 + ELLIPSIS_H / 2 + 4}
              textAnchor="middle"
              fontSize="14"
              className="fill-current"
              opacity={0.4}
            >
              ⋮
            </text>
          )}

          {/* Codomain box */}
          <rect
            x={codomainX}
            y={codomainY}
            width={BOX_W}
            height={codomainH}
            rx={10}
            ry={10}
            fill="none"
            stroke={codomainColor}
            strokeWidth={2}
            opacity={0.6}
          />
          <text
            x={codomainX + BOX_W / 2}
            y={codomainY + 22}
            textAnchor="middle"
            fill={codomainColor}
            fontSize="12"
            fontWeight="600"
          >
            {codomainLabel}
          </text>

          {/* Codomain top ellipsis */}
          {!codomainFinite && (
            <text
              x={codomainX + 24}
              y={codomainY + BOX_PAD_TOP + ELLIPSIS_H / 2}
              textAnchor="middle"
              fontSize="14"
              className="fill-current"
              opacity={0.4}
            >
              ⋮
            </text>
          )}

          {/* Codomain elements */}
          {codomainElements.map((el, i) => {
            const cy = elemY(codomainY, i, codomainEllipsisOffset)
            const highlighted = image.has(el)
            return (
              <g key={`c-${i}`}>
                <circle
                  cx={codomainX + 24}
                  cy={cy}
                  r={10}
                  fill={highlighted ? codomainColor + "30" : "transparent"}
                  stroke={highlighted ? codomainColor : "currentColor"}
                  strokeWidth={1.5}
                  opacity={highlighted ? 1 : 0.3}
                />
                <text
                  x={codomainX + 24}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="11"
                  className="fill-current"
                  fontFamily="monospace"
                  opacity={highlighted ? 1 : 0.5}
                >
                  {el}
                </text>
              </g>
            )
          })}

          {/* Codomain bottom ellipsis */}
          {!codomainFinite && (
            <text
              x={codomainX + 24}
              y={elemY(codomainY, codomainElements.length - 1, codomainEllipsisOffset) + ELEM_H / 2 + ELLIPSIS_H / 2 + 4}
              textAnchor="middle"
              fontSize="14"
              className="fill-current"
              opacity={0.4}
            >
              ⋮
            </text>
          )}

          {/* Arrows */}
          {mappings.slice(0, revealed).map(([dIdx, cIdx], i) => {
            const y1 = elemY(domainY, dIdx, domainEllipsisOffset)
            const y2 = elemY(codomainY, cIdx, codomainEllipsisOffset)
            const x1 = domainX + BOX_W - 14
            const x2 = codomainX + 14
            const midX = (x1 + x2) / 2
            const curveOffset = (y2 - y1) * 0.15
            const isLatest = i === revealed - 1
            return (
              <g key={`a-${i}`}>
                <path
                  d={`M ${x1} ${y1} C ${midX} ${y1 + curveOffset}, ${midX} ${y2 - curveOffset}, ${x2} ${y2}`}
                  fill="none"
                  stroke={isLatest ? "#f59e0b" : "currentColor"}
                  strokeWidth={isLatest ? 2 : 1.5}
                  opacity={isLatest ? 0.9 : 0.35}
                  markerEnd={isLatest ? "url(#arrowActive)" : "url(#arrow)"}
                />
              </g>
            )
          })}

          {/* Arrow markers */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 7"
              refX="9"
              refY="3.5"
              markerWidth="8"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" opacity="0.35" />
            </marker>
            <marker
              id="arrowActive"
              viewBox="0 0 10 7"
              refX="9"
              refY="3.5"
              markerWidth="8"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" opacity="0.9" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Description */}
      <div className="px-4 pb-2">
        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      {/* Pre-image and Image sets */}
      <div className="px-4 pb-3 flex flex-wrap justify-center gap-6 text-xs">
        <div>
          <span className="font-semibold" style={{ color: domainColor }}>
            Pre-image:{" "}
          </span>
          <span className="font-mono">
            {preimage.size === 0
              ? "∅"
              : `{${Array.from(preimage).join(", ")}}`}
          </span>
        </div>
        <div>
          <span className="font-semibold" style={{ color: codomainColor }}>
            Image:{" "}
          </span>
          <span className="font-mono">
            {image.size === 0
              ? "∅"
              : `{${Array.from(image).join(", ")}}`}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>

        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
