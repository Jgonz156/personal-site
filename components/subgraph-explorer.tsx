"use client"

import { useEffect, useRef, useState } from "react"

interface SubgraphStep {
  label: string
  description: string
  subNodes: string[]
  subEdges: { from: string; to: string }[]
}

interface SubgraphExplorerProps {
  parentNodes: { id: string; label: string }[]
  parentEdges: { from: string; to: string }[]
  steps: SubgraphStep[]
  height?: string
}

export function SubgraphExplorer({
  parentNodes,
  parentEdges,
  steps,
  height = "300px",
}: SubgraphExplorerProps) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftNetworkRef = useRef<any>(null)
  const rightNetworkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]
  const activeNodeSet = new Set(step.subNodes)
  const activeEdgeSet = new Set(
    step.subEdges.map((e) => `${e.from}-${e.to}`)
  )

  const isActiveEdge = (from: string, to: string) =>
    activeEdgeSet.has(`${from}-${to}`) || activeEdgeSet.has(`${to}-${from}`)

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error
    import("vis-network/styles/vis-network.css")
  }, [])

  useEffect(() => {
    if (!mounted) return

    const initNetworks = async () => {
      const { Network } = await import("vis-network")
      const { DataSet } = await import("vis-data")

      if (leftRef.current) {
        if (leftNetworkRef.current) leftNetworkRef.current.destroy()

        const nodes = new DataSet(
          parentNodes.map((n) => ({
            id: n.id,
            label: n.label,
            color: activeNodeSet.has(n.id)
              ? {
                  border: "#16a34a",
                  background: "#86efac",
                  highlight: { border: "#15803d", background: "#bbf7d0" },
                }
              : {
                  border: "#9ca3af",
                  background: "#e5e7eb",
                  highlight: { border: "#6b7280", background: "#d1d5db" },
                },
            shape: "circle",
            size: 25,
            font: {
              size: 14,
              color: activeNodeSet.has(n.id) ? "#000000" : "#9ca3af",
              align: "center" as const,
              vadjust: 0,
            },
            borderWidth: 2,
          })) as any
        )

        const edges = new DataSet(
          parentEdges.map((e, i) => ({
            id: `e${i}`,
            from: e.from,
            to: e.to,
            width: isActiveEdge(e.from, e.to) ? 3 : 1,
            color: {
              color: isActiveEdge(e.from, e.to) ? "#16a34a" : "#d1d5db",
              highlight: "#16a34a",
            },
            smooth: false,
          })) as any
        )

        leftNetworkRef.current = new Network(
          leftRef.current,
          { nodes, edges } as any,
          {
            physics: {
              enabled: true,
              forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.005,
                springLength: 100,
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
              size: 25,
              font: { size: 14, align: "center", vadjust: 0 },
              borderWidth: 2,
            },
            edges: { width: 2, smooth: false },
          } as any
        )
      }

      if (rightRef.current) {
        if (rightNetworkRef.current) rightNetworkRef.current.destroy()

        const subNodesFiltered = parentNodes.filter((n) =>
          activeNodeSet.has(n.id)
        )
        const subEdgesFiltered = parentEdges.filter((e) =>
          isActiveEdge(e.from, e.to)
        )

        const nodes = new DataSet(
          subNodesFiltered.map((n) => ({
            id: n.id,
            label: n.label,
            color: {
              border: "#16a34a",
              background: "#86efac",
              highlight: { border: "#15803d", background: "#bbf7d0" },
            },
            shape: "circle",
            size: 25,
            font: { size: 14, color: "#000000", align: "center" as const, vadjust: 0 },
            borderWidth: 2,
          })) as any
        )

        const edges = new DataSet(
          subEdgesFiltered.map((e, i) => ({
            id: `se${i}`,
            from: e.from,
            to: e.to,
            width: 2,
            color: { color: "#16a34a", highlight: "#16a34a" },
            smooth: false,
          })) as any
        )

        rightNetworkRef.current = new Network(
          rightRef.current,
          { nodes, edges } as any,
          {
            physics: {
              enabled: true,
              forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.005,
                springLength: 100,
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
              size: 25,
              font: { size: 14, align: "center", vadjust: 0 },
              borderWidth: 2,
            },
            edges: { width: 2, smooth: false },
          } as any
        )
      }
    }

    initNetworks()

    return () => {
      if (leftNetworkRef.current) {
        leftNetworkRef.current.destroy()
        leftNetworkRef.current = null
      }
      if (rightNetworkRef.current) {
        rightNetworkRef.current.destroy()
        rightNetworkRef.current = null
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

      <p className="text-sm font-semibold mb-1">{step.label}</p>
      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1 text-center font-medium">
            G (parent graph)
          </p>
          <div
            ref={leftRef}
            className="border-2 border-primary/30 rounded-lg bg-background"
            style={{ height, width: "100%" }}
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 text-center font-medium">
            Subgraph
          </p>
          <div
            ref={rightRef}
            className="border-2 border-primary/30 rounded-lg bg-background"
            style={{ height, width: "100%" }}
          />
        </div>
      </div>
    </div>
  )
}
