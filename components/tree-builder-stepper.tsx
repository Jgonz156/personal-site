"use client"

import { useEffect, useRef, useState } from "react"

interface TreeStep {
  description: string
  nodes: { id: string; label: string; color?: string }[]
  edges: {
    from: string
    to: string
    color?: string
    dashes?: boolean
    label?: string
    width?: number
  }[]
}

interface TreeBuilderStepperProps {
  title?: string
  cuttingSteps: TreeStep[]
  buildingSteps: TreeStep[]
  height?: string
}

export function TreeBuilderStepper({
  title = "Two Intuitions for Building Trees",
  cuttingSteps,
  buildingSteps,
  height = "350px",
}: TreeBuilderStepperProps) {
  const cuttingRef = useRef<HTMLDivElement>(null)
  const buildingRef = useRef<HTMLDivElement>(null)
  const cuttingNetRef = useRef<any>(null)
  const buildingNetRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [cuttingStep, setCuttingStep] = useState(0)
  const [buildingStep, setBuildingStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error
    import("vis-network/styles/vis-network.css")
  }, [])

  const renderNetwork = async (
    container: HTMLDivElement,
    step: TreeStep,
    netRef: React.MutableRefObject<any>
  ) => {
    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (netRef.current) {
      netRef.current.destroy()
      netRef.current = null
    }

    const nodesDataSet = new DataSet(
      step.nodes.map((n) => ({
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
        size: 25,
        font: { size: 14, color: "#000000", align: "center", vadjust: 0 },
        borderWidth: 2,
      })) as any
    )

    const edgesDataSet = new DataSet(
      step.edges.map((e, i) => ({
        id: `e${i}`,
        from: e.from,
        to: e.to,
        width: e.width || 2,
        color: { color: e.color || "#848484", highlight: "#16a34a" },
        dashes: e.dashes || false,
        label: e.label,
        smooth: false,
        font: { size: 12, align: "middle" },
      })) as any
    )

    const options = {
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
    }

    const network = new Network(
      container,
      { nodes: nodesDataSet, edges: edgesDataSet } as any,
      options as any
    )
    netRef.current = network
  }

  useEffect(() => {
    if (!mounted || !cuttingRef.current) return
    renderNetwork(cuttingRef.current, cuttingSteps[cuttingStep], cuttingNetRef)
    return () => {
      if (cuttingNetRef.current) {
        cuttingNetRef.current.destroy()
        cuttingNetRef.current = null
      }
    }
  }, [mounted, cuttingStep, cuttingSteps])

  useEffect(() => {
    if (!mounted || !buildingRef.current) return
    renderNetwork(
      buildingRef.current,
      buildingSteps[buildingStep],
      buildingNetRef
    )
    return () => {
      if (buildingNetRef.current) {
        buildingNetRef.current.destroy()
        buildingNetRef.current = null
      }
    }
  }, [mounted, buildingStep, buildingSteps])

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
      {title && <h4 className="font-semibold text-base mb-3">{title}</h4>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">
            Cutting Down (from K₅)
          </p>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setCuttingStep(Math.max(0, cuttingStep - 1))}
              disabled={cuttingStep === 0}
              className="px-2 py-1 text-xs rounded border bg-muted/50 hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <span className="text-xs text-muted-foreground">
              {cuttingStep + 1}/{cuttingSteps.length}
            </span>
            <button
              onClick={() =>
                setCuttingStep(
                  Math.min(cuttingSteps.length - 1, cuttingStep + 1)
                )
              }
              disabled={cuttingStep === cuttingSteps.length - 1}
              className="px-2 py-1 text-xs rounded border bg-muted/50 hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {cuttingSteps[cuttingStep].description}
          </p>
          <div
            ref={cuttingRef}
            className="border-2 border-primary/30 rounded-lg bg-background"
            style={{ height, width: "100%" }}
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">
            Building Up (from isolated vertices)
          </p>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setBuildingStep(Math.max(0, buildingStep - 1))}
              disabled={buildingStep === 0}
              className="px-2 py-1 text-xs rounded border bg-muted/50 hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <span className="text-xs text-muted-foreground">
              {buildingStep + 1}/{buildingSteps.length}
            </span>
            <button
              onClick={() =>
                setBuildingStep(
                  Math.min(buildingSteps.length - 1, buildingStep + 1)
                )
              }
              disabled={buildingStep === buildingSteps.length - 1}
              className="px-2 py-1 text-xs rounded border bg-muted/50 hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {buildingSteps[buildingStep].description}
          </p>
          <div
            ref={buildingRef}
            className="border-2 border-primary/30 rounded-lg bg-background"
            style={{ height, width: "100%" }}
          />
        </div>
      </div>
    </div>
  )
}
