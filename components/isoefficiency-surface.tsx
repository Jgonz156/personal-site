"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// Dynamically import Plotly to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Plot: ComponentType<any> = dynamic(
  () => import("react-plotly.js"),
  { ssr: false }
)

interface OverheadModel {
  name: string
  label: string
  description: string
  isoefficiency: string
  fn: (p: number) => number
}

const overheadModels: OverheadModel[] = [
  {
    name: "linear",
    label: "Linear: T_o = P",
    description:
      "Embarrassingly parallel — overhead grows linearly with processors. Isoefficiency: W = O(P). Best scalability.",
    isoefficiency: "W = O(P)",
    fn: (p: number) => p,
  },
  {
    name: "loglinear",
    label: "Log-Linear: T_o = P·log₂(P)",
    description:
      "Good scalability — e.g., parallel sum on a hypercube. Isoefficiency: W = O(P·log P). Problem size grows slightly faster than processor count.",
    isoefficiency: "W = O(P·log P)",
    fn: (p: number) => p * Math.log2(Math.max(p, 1)),
  },
  {
    name: "quadratic",
    label: "Quadratic: T_o = P²",
    description:
      "Poor scalability — overhead grows quadratically. Isoefficiency: W = O(P²). Problem must grow much faster than processor count.",
    isoefficiency: "W = O(P²)",
    fn: (p: number) => p * p,
  },
]

function computeSurface(overheadFn: (p: number) => number) {
  // P values: 1 to 64
  const pValues: number[] = []
  for (let p = 1; p <= 64; p += 1) {
    pValues.push(p)
  }

  // n values: log scale from 1 to 100000
  const nValues: number[] = []
  const nMin = 1
  const nMax = 100000
  const nSteps = 60
  for (let i = 0; i < nSteps; i++) {
    const n = nMin * Math.pow(nMax / nMin, i / (nSteps - 1))
    nValues.push(Math.round(n))
  }

  // Compute efficiency surface: E(p, n) = n / (n + T_o(p))
  const z: number[][] = []
  for (let ni = 0; ni < nValues.length; ni++) {
    const row: number[] = []
    for (let pi = 0; pi < pValues.length; pi++) {
      const n = nValues[ni]
      const p = pValues[pi]
      const overhead = overheadFn(p)
      const efficiency = n / (n + overhead)
      row.push(Math.round(efficiency * 1000) / 1000)
    }
    z.push(row)
  }

  return { pValues, nValues, z }
}

export function IsoefficiencySurface() {
  const [activeModel, setActiveModel] = useState(1) // default to log-linear
  const model = overheadModels[activeModel]

  const { pValues, nValues, z } = useMemo(
    () => computeSurface(model.fn),
    [activeModel]
  )

  return (
    <div className="border rounded-lg p-4 bg-card my-6">
      <h4 className="font-semibold text-sm mb-1">
        Isoefficiency Surface — Efficiency E(P, n)
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        How efficiency varies with processor count (P) and problem size (n).
        Contour lines trace constant efficiency — the isoefficiency curves.
      </p>

      {/* Model selector */}
      <div className="flex flex-wrap gap-1 mb-3">
        {overheadModels.map((m, i) => (
          <Button
            key={m.name}
            variant={activeModel === i ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveModel(i)}
            className="text-xs"
          >
            {m.label}
          </Button>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-2 italic">
        {model.description}
      </p>

      {/* 3D Surface Plot */}
      <div className="w-full rounded-md overflow-hidden bg-background border">
        <Plot
          data={[
            {
              type: "surface",
              x: pValues,
              y: nValues,
              z: z,
              colorscale: [
                [0, "#EF4444"],
                [0.25, "#F59E0B"],
                [0.5, "#EAB308"],
                [0.75, "#22C55E"],
                [1, "#3B82F6"],
              ],
              cmin: 0,
              cmax: 1,
              colorbar: {
                title: { text: "Efficiency", font: { size: 11 } },
                tickvals: [0, 0.25, 0.5, 0.75, 1.0],
                ticktext: ["0%", "25%", "50%", "75%", "100%"],
                len: 0.6,
              },
              contours: {
                z: {
                  show: true,
                  usecolormap: true,
                  highlightcolor: "#ffffff",
                  project: { z: false },
                  start: 0.1,
                  end: 0.9,
                  size: 0.1,
                },
              },
              hovertemplate:
                "Processors: %{x}<br>Problem Size: %{y}<br>Efficiency: %{z:.1%}<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,
            height: 480,
            margin: { l: 0, r: 0, t: 30, b: 0 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            scene: {
              xaxis: {
                title: { text: "Processors (P)", font: { size: 11 } },
                type: "linear",
              },
              yaxis: {
                title: { text: "Problem Size (n)", font: { size: 11 } },
                type: "log",
              },
              zaxis: {
                title: { text: "Efficiency (E)", font: { size: 11 } },
                range: [0, 1],
                tickvals: [0, 0.25, 0.5, 0.75, 1.0],
                ticktext: ["0%", "25%", "50%", "75%", "100%"],
              },
              camera: {
                eye: { x: 1.8, y: -1.5, z: 0.8 },
              },
            },
            font: {
              family: "system-ui, sans-serif",
              size: 10,
            },
          }}
          config={{
            displayModeBar: true,
            modeBarButtonsToRemove: [
              "toImage",
              "sendDataToCloud",
              "editInChartStudio",
              "lasso2d",
              "select2d",
            ],
            displaylogo: false,
            responsive: true,
          }}
          useResizeHandler
          style={{ width: "100%", height: "480px" }}
        />
      </div>

      {/* Interpretation guide */}
      <div className="mt-3 text-xs text-muted-foreground space-y-1">
        <p>
          <strong>Reading the surface:</strong> High efficiency (blue) means
          processors are well-utilized. Low efficiency (red) means overhead
          dominates. Drag to orbit, scroll to zoom.
        </p>
        <p>
          <strong>Isoefficiency curves:</strong> The contour lines on the
          surface trace paths of constant efficiency. Following one shows how
          problem size must grow as processors increase to maintain that
          efficiency — this growth rate is the{" "}
          <strong>isoefficiency function</strong>:{" "}
          <code className="bg-muted px-1 rounded">{model.isoefficiency}</code>.
        </p>
      </div>
    </div>
  )
}
