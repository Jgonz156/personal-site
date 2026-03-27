"use client"

import { useEffect, useRef, useState } from "react"

interface CountingStep {
  description: string
  sumDisplay: string
  nodes: { id: string; label: string }[]
  edges: { from: string; to: string; isNew?: boolean }[]
}

interface EdgeCountingStepperProps {
  title?: string
  steps: CountingStep[]
  height?: string
}

export function EdgeCountingStepper({
  title = "Counting Edges",
  steps,
  height = "300px",
}: EdgeCountingStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]

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
        step.nodes.map((n) => ({
          id: n.id,
          label: n.label,
          color: {
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
        step.edges.map((e, i) => ({
          id: `e${i}`,
          from: e.from,
          to: e.to,
          width: e.isNew ? 4 : 2,
          color: {
            color: e.isNew ? "#f59e0b" : "#848484",
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
  }, [mounted, currentStep])

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
      {title && (
        <h4 className="font-semibold text-base mb-2">{title}</h4>
      )}

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-3 py-1.5 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          disabled={currentStep === steps.length - 1}
          className="px-3 py-1.5 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <p className="text-sm mb-1">{step.description}</p>
      <p className="text-sm font-mono font-semibold text-primary mb-2">
        {step.sumDisplay}
      </p>

      <div
        ref={containerRef}
        className="border-2 border-primary/30 rounded-lg bg-background"
        style={{ height, width: "100%" }}
      />
    </div>
  )
}
