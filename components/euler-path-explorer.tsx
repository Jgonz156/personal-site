"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface EulerNode {
  id: string
  label: string
  x?: number
  y?: number
}

interface EulerEdge {
  id: string
  from: string
  to: string
}

interface Preset {
  name: string
  description: string
  nodes: EulerNode[]
  edges: EulerEdge[]
}

const KONIGSBERG_PRESET: Preset = {
  name: "Königsberg (1736)",
  description:
    "The original seven bridges. All four vertices have odd degree — no Euler trail exists.",
  nodes: [
    { id: "A", label: "Island", x: 0, y: 0 },
    { id: "B", label: "South", x: 0, y: 150 },
    { id: "C", label: "North", x: 0, y: -150 },
    { id: "D", label: "East", x: 200, y: 0 },
  ],
  edges: [
    { id: "e1", from: "A", to: "B" },
    { id: "e2", from: "A", to: "B" },
    { id: "e3", from: "A", to: "C" },
    { id: "e4", from: "A", to: "C" },
    { id: "e5", from: "A", to: "D" },
    { id: "e6", from: "B", to: "D" },
    { id: "e7", from: "C", to: "D" },
  ],
}

const KALININGRAD_PRESET: Preset = {
  name: "Kaliningrad (Modern)",
  description:
    "Eight bridges remain. Exactly two vertices have odd degree (Island and North) — an Euler trail exists!",
  nodes: [
    { id: "A", label: "Island", x: 0, y: 0 },
    { id: "B", label: "South", x: 0, y: 150 },
    { id: "C", label: "North", x: 0, y: -150 },
    { id: "D", label: "East", x: 200, y: 0 },
  ],
  edges: [
    { id: "e1", from: "A", to: "B" },
    { id: "e2", from: "A", to: "C" },
    { id: "e3", from: "A", to: "D" },
    { id: "e4", from: "B", to: "D" },
    { id: "e5", from: "B", to: "D" },
    { id: "e6", from: "B", to: "D" },
    { id: "e7", from: "C", to: "D" },
    { id: "e8", from: "C", to: "D" },
  ],
}

const PRESETS: Preset[] = [KONIGSBERG_PRESET, KALININGRAD_PRESET]

interface EulerPathExplorerProps {
  presetIndex?: number
  height?: string
}

export function EulerPathExplorer({
  presetIndex = 0,
  height = "420px",
}: EulerPathExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [activePreset, setActivePreset] = useState(presetIndex)
  const [usedEdges, setUsedEdges] = useState<string[]>([])
  const [currentNode, setCurrentNode] = useState<string | null>(null)
  const [visitedPath, setVisitedPath] = useState<string[]>([])
  const [status, setStatus] = useState<
    "idle" | "walking" | "success" | "stuck"
  >("idle")

  const preset = PRESETS[activePreset]

  const getDegrees = useCallback((): Record<string, number> => {
    const degrees: Record<string, number> = {}
    for (const node of preset.nodes) {
      degrees[node.id] = 0
    }
    for (const edge of preset.edges) {
      degrees[edge.from] = (degrees[edge.from] || 0) + 1
      degrees[edge.to] = (degrees[edge.to] || 0) + 1
    }
    return degrees
  }, [preset])

  const getAvailableEdges = useCallback(
    (nodeId: string, used: string[]): EulerEdge[] => {
      return preset.edges.filter(
        (e) =>
          !used.includes(e.id) &&
          (e.from === nodeId || e.to === nodeId)
      )
    },
    [preset]
  )

  const resetWalk = useCallback(() => {
    setUsedEdges([])
    setCurrentNode(null)
    setVisitedPath([])
    setStatus("idle")
  }, [])

  useEffect(() => {
    resetWalk()
  }, [activePreset, resetWalk])

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

      const degrees = getDegrees()

      const nodesDataSet = new DataSet(
        preset.nodes.map((n) => ({
          id: n.id,
          label: `${n.label}\n(deg ${degrees[n.id]})`,
          x: n.x,
          y: n.y,
          fixed: { x: true, y: true },
          color:
            currentNode === n.id
              ? {
                  border: "#2563eb",
                  background: "#93c5fd",
                  highlight: { border: "#1d4ed8", background: "#bfdbfe" },
                }
              : degrees[n.id] % 2 === 1
                ? {
                    border: "#dc2626",
                    background: "#fca5a5",
                    highlight: { border: "#b91c1c", background: "#fecaca" },
                  }
                : {
                    border: "#16a34a",
                    background: "#86efac",
                    highlight: { border: "#15803d", background: "#bbf7d0" },
                  },
          shape: "circle",
          size: 35,
          font: { size: 12, color: "#000000", multi: "html" },
          borderWidth: currentNode === n.id ? 4 : 2,
        })) as any
      )

      const edgesDataSet = new DataSet(
        preset.edges.map((e, i) => {
          const isUsed = usedEdges.includes(e.id)
          const sameEndpointEdges = preset.edges.filter(
            (other) =>
              (other.from === e.from && other.to === e.to) ||
              (other.from === e.to && other.to === e.from)
          )
          const idx = sameEndpointEdges.indexOf(e)
          const count = sameEndpointEdges.length

          let smooth: any = false
          if (count === 2) {
            smooth = { type: idx === 0 ? "curvedCW" : "curvedCCW", roundness: 0.3 }
          } else if (count === 3) {
            if (idx === 0) smooth = false
            else if (idx === 1) smooth = { type: "curvedCW", roundness: 0.3 }
            else smooth = { type: "curvedCCW", roundness: 0.3 }
          } else if (count > 3) {
            const pair = Math.ceil(idx / 2)
            const roundness = pair * 0.2
            if (idx === 0) smooth = false
            else if (idx % 2 === 1) smooth = { type: "curvedCW", roundness }
            else smooth = { type: "curvedCCW", roundness }
          }

          return {
            id: e.id,
            from: e.from,
            to: e.to,
            width: isUsed ? 4 : 2,
            color: {
              color: isUsed ? "#16a34a" : "#848484",
              highlight: isUsed ? "#16a34a" : "#2563eb",
              hover: "#2563eb",
            },
            dashes: isUsed ? [5, 5] : false,
            smooth,
            label: isUsed
              ? `${usedEdges.indexOf(e.id) + 1}`
              : undefined,
            font: { size: 14, color: "#16a34a", strokeWidth: 3, strokeColor: "#ffffff" },
          }
        }) as any
      )

      const options = {
        physics: { enabled: false },
        interaction: {
          dragNodes: false,
          dragView: false,
          zoomView: false,
          hover: true,
          tooltipDelay: 100,
        },
        nodes: {
          shape: "circle",
          size: 35,
          font: { size: 12, align: "center", vadjust: 0 },
          borderWidth: 2,
        },
        edges: {
          width: 2,
          font: { size: 14, align: "middle" },
          chosen: true,
        },
      }

      network = new Network(
        containerRef.current,
        { nodes: nodesDataSet, edges: edgesDataSet } as any,
        options as any
      )
      networkRef.current = network

      network.on("click", (params: any) => {
        if (params.edges.length === 0) return
        const clickedEdgeId = params.edges[0]
        const edge = preset.edges.find((e) => e.id === clickedEdgeId)
        if (!edge || usedEdges.includes(clickedEdgeId)) return

        if (status === "idle") {
          const startNode = edge.from
          const endNode = edge.to
          setCurrentNode(endNode)
          setUsedEdges([clickedEdgeId])
          setVisitedPath([startNode, endNode])
          setStatus("walking")
          return
        }

        if (status !== "walking" || !currentNode) return

        if (edge.from !== currentNode && edge.to !== currentNode) return

        const nextNode =
          edge.from === currentNode ? edge.to : edge.from
        const newUsed = [...usedEdges, clickedEdgeId]
        const newPath = [...visitedPath, nextNode]

        setUsedEdges(newUsed)
        setCurrentNode(nextNode)
        setVisitedPath(newPath)

        if (newUsed.length === preset.edges.length) {
          setStatus("success")
        } else if (getAvailableEdges(nextNode, newUsed).length === 0) {
          setStatus("stuck")
        }
      })
    }

    initNetwork()

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [
    mounted,
    preset,
    usedEdges,
    currentNode,
    status,
    getDegrees,
    getAvailableEdges,
    visitedPath,
  ])

  const degrees = getDegrees()
  const oddCount = Object.values(degrees).filter((d) => d % 2 === 1).length

  if (!mounted) {
    return (
      <div
        className="border rounded-lg bg-muted/30 flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-muted-foreground">Loading explorer...</p>
      </div>
    )
  }

  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePreset(i)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              activePreset === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 border-border hover:bg-muted"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-2">
        {preset.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-3 text-sm">
        <span>
          Edges: <strong>{usedEdges.length}/{preset.edges.length}</strong>
        </span>
        <span>
          Odd-degree vertices:{" "}
          <strong className={oddCount > 2 ? "text-red-600" : oddCount === 0 ? "text-green-600" : "text-amber-600"}>
            {oddCount}
          </strong>
        </span>
        {currentNode && (
          <span>
            Current: <strong>{currentNode}</strong>
          </span>
        )}
        <span className="text-muted-foreground">
          <span
            className="inline-block w-3 h-3 rounded-full mr-1"
            style={{ backgroundColor: "#fca5a5", border: "1px solid #dc2626" }}
          />{" "}
          Odd degree{" "}
          <span
            className="inline-block w-3 h-3 rounded-full mr-1 ml-2"
            style={{ backgroundColor: "#86efac", border: "1px solid #16a34a" }}
          />{" "}
          Even degree
        </span>
      </div>

      <div
        ref={containerRef}
        className="border-2 border-primary/30 rounded-lg bg-background"
        style={{ height, width: "100%" }}
      />

      <div className="mt-3 flex flex-wrap gap-2 items-center">
        {status === "idle" && (
          <p className="text-sm text-muted-foreground">
            Click any edge to begin walking. Try to cross every bridge exactly
            once.
          </p>
        )}
        {status === "walking" && (
          <p className="text-sm text-muted-foreground">
            Path: {visitedPath.join(" → ")}. Click an adjacent unused edge to
            continue.
          </p>
        )}
        {status === "success" && (
          <p className="text-sm font-semibold text-green-600">
            You crossed every bridge exactly once! Path:{" "}
            {visitedPath.join(" → ")}
          </p>
        )}
        {status === "stuck" && (
          <p className="text-sm font-semibold text-red-600">
            Stuck! No unused edges are available from {currentNode}. Path:{" "}
            {visitedPath.join(" → ")} ({usedEdges.length}/{preset.edges.length}{" "}
            edges used)
          </p>
        )}
        <button
          onClick={resetWalk}
          className="ml-auto px-3 py-1.5 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
