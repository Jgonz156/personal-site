"use client"

import { useEffect, useRef, useState } from "react"

interface OperationPhase {
  label: string
  description: string
  nodes: { id: string; label: string; color?: string }[]
  edges: { from: string; to: string; color?: string; width?: number }[]
}

interface GraphOperationStepperProps {
  title: string
  phases: OperationPhase[]
  height?: string
}

export function GraphOperationStepper({
  title,
  phases,
  height = "300px",
}: GraphOperationStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const phase = phases[currentPhase]

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error
    import("vis-network/styles/vis-network.css")
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    let network: any = null

    const initNetwork = async () => {
      const { Network } = await import("vis-network")
      const { DataSet } = await import("vis-data")

      if (!containerRef.current) return

      const nodesDataSet = new DataSet(
        phase.nodes.map((n) => ({
          id: n.id,
          label: n.label,
          color: n.color
            ? {
                border: n.color,
                background: n.color + "40",
                highlight: { border: n.color, background: n.color + "60" },
              }
            : {
                border: "#16a34a",
                background: "#86efac",
                highlight: { border: "#15803d", background: "#bbf7d0" },
              },
          shape: "circle",
          size: 30,
          font: { size: 14, color: "#000000", align: "center" as const, vadjust: 0 },
          borderWidth: 2,
        })) as any
      )

      const edgesDataSet = new DataSet(
        phase.edges.map((e, i) => ({
          id: `e${i}`,
          from: e.from,
          to: e.to,
          width: e.width || 2,
          color: {
            color: e.color || "#848484",
            highlight: "#16a34a",
          },
          smooth: false,
        })) as any
      )

      network = new Network(
        containerRef.current,
        { nodes: nodesDataSet, edges: edgesDataSet } as any,
        {
          physics: {
            enabled: true,
            forceAtlas2Based: {
              gravitationalConstant: -60,
              centralGravity: 0.005,
              springLength: 120,
              springConstant: 0.08,
              damping: 0.4,
              avoidOverlap: 1,
            },
            solver: "forceAtlas2Based",
            stabilization: { enabled: true, iterations: 100 },
          },
          interaction: {
            dragNodes: true,
            dragView: true,
            zoomView: true,
            hover: true,
          },
          nodes: {
            shape: "circle",
            size: 30,
            font: { size: 14, align: "center", vadjust: 0 },
            borderWidth: 2,
          },
          edges: { width: 2, smooth: false },
        } as any
      )
      networkRef.current = network
    }

    initNetwork()

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [mounted, currentPhase])

  if (!mounted) {
    return (
      <div
        className="border rounded-lg bg-muted/30 flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="my-6">
      <h4 className="font-semibold text-base mb-2">{title}</h4>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
          disabled={currentPhase === 0}
          className="px-3 py-1.5 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Phase {currentPhase + 1} of {phases.length}
        </span>
        <button
          onClick={() =>
            setCurrentPhase(Math.min(phases.length - 1, currentPhase + 1))
          }
          disabled={currentPhase === phases.length - 1}
          className="px-3 py-1.5 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <p className="text-sm font-semibold mb-1">{phase.label}</p>
      <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>

      <div
        ref={containerRef}
        className="border-2 border-primary/30 rounded-lg bg-background"
        style={{ height, width: "100%" }}
      />
    </div>
  )
}
