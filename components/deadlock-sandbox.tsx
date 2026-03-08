"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface SandboxNode {
  id: string
  label: string
  type: "process" | "resource"
}

interface SandboxEdge {
  id: string
  from: string
  to: string
}

function detectCycles(
  nodes: SandboxNode[],
  edges: SandboxEdge[]
): Set<string> {
  const adj: Record<string, string[]> = {}
  nodes.forEach((n) => (adj[n.id] = []))
  edges.forEach((e) => {
    if (adj[e.from]) adj[e.from].push(e.to)
  })

  const cycleNodes = new Set<string>()
  const visited = new Set<string>()
  const recStack = new Set<string>()
  const parent = new Map<string, string>()

  function dfs(node: string): boolean {
    visited.add(node)
    recStack.add(node)
    for (const neighbor of adj[node] || []) {
      if (!visited.has(neighbor)) {
        parent.set(neighbor, node)
        if (dfs(neighbor)) return true
      } else if (recStack.has(neighbor)) {
        let cur = node
        cycleNodes.add(neighbor)
        while (cur !== neighbor) {
          cycleNodes.add(cur)
          cur = parent.get(cur) || neighbor
        }
        return true
      }
    }
    recStack.delete(node)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id)
    }
  }
  return cycleNodes
}

export function DeadlockSandbox({ className }: { className?: string }) {
  const [nodes, setNodes] = useState<SandboxNode[]>([])
  const [edges, setEdges] = useState<SandboxEdge[]>([])
  const [addMode, setAddMode] = useState<"process" | "resource" | null>(null)
  const [edgeMode, setEdgeMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<{ destroy: () => void } | null>(null)
  const [mounted, setMounted] = useState(false)
  const processCounter = useRef(0)
  const resourceCounter = useRef(0)
  const [edgeFrom, setEdgeFrom] = useState<string | null>(null)

  const edgeModeRef = useRef(edgeMode)
  const deleteModeRef = useRef(deleteMode)
  const edgeFromRef = useRef(edgeFrom)
  const nodesRef = useRef(nodes)
  const edgesRef = useRef(edges)

  edgeModeRef.current = edgeMode
  deleteModeRef.current = deleteMode
  edgeFromRef.current = edgeFrom
  nodesRef.current = nodes
  edgesRef.current = edges

  const cycleNodes = detectCycles(nodes, edges)
  const hasCycle = cycleNodes.size > 0

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const renderGraph = useCallback(async () => {
    if (!mounted || !containerRef.current) return

    if (networkRef.current) {
      networkRef.current.destroy()
      networkRef.current = null
    }

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const processColors = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6"]

    const visNodes = new DataSet(
      nodes.map((n, i) => {
        const inCycle = cycleNodes.has(n.id)
        const isProcess = n.type === "process"
        const color = isProcess
          ? processColors[i % processColors.length]
          : "#6B7280"

        return {
          id: n.id,
          label: n.label,
          shape: isProcess ? "circle" : "box",
          size: isProcess ? 28 : 20,
          color: {
            background: inCycle
              ? "#FCA5A5"
              : isProcess
                ? color + "40"
                : "#D1D5DB",
            border: inCycle ? "#EF4444" : color,
            highlight: {
              background: inCycle ? "#FCA5A5" : isProcess ? color + "60" : "#E5E7EB",
              border: inCycle ? "#EF4444" : color,
            },
          },
          font: {
            color: inCycle ? "#DC2626" : isProcess ? color : "#374151",
            size: 13,
            face: "monospace",
          },
          borderWidth: inCycle ? 4 : 2,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )

    const cycleEdgeIds = new Set<string>()
    edges.forEach((e) => {
      if (cycleNodes.has(e.from) && cycleNodes.has(e.to)) {
        cycleEdgeIds.add(e.id)
      }
    })

    const visEdges = new DataSet(
      edges.map((e) => {
        const inCycle = cycleEdgeIds.has(e.id)
        return {
          id: e.id,
          from: e.from,
          to: e.to,
          arrows: "to",
          width: inCycle ? 4 : 2,
          color: {
            color: inCycle ? "#EF4444" : "#6B7280",
            highlight: inCycle ? "#EF4444" : "#3B82F6",
          },
          smooth: { type: "curvedCW", roundness: 0.15 },
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )

    const options = {
      physics: {
        enabled: true,
        forceAtlas2Based: {
          gravitationalConstant: -60,
          centralGravity: 0.005,
          springLength: 100,
          springConstant: 0.06,
          damping: 0.5,
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
    }

    const network = new Network(
      containerRef.current,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { nodes: visNodes, edges: visEdges } as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options as any
    )

    network.on("click", (params: { nodes?: string[]; edges?: string[] }) => {
      if (deleteModeRef.current) {
        if (params.nodes && params.nodes.length > 0) {
          const nodeId = params.nodes[0]
          setNodes((prev) => prev.filter((n) => n.id !== nodeId))
          setEdges((prev) =>
            prev.filter((e) => e.from !== nodeId && e.to !== nodeId)
          )
        } else if (params.edges && params.edges.length > 0) {
          const edgeId = params.edges[0]
          setEdges((prev) => prev.filter((e) => e.id !== edgeId))
        }
        return
      }

      if (edgeModeRef.current && params.nodes && params.nodes.length > 0) {
        const clicked = params.nodes[0]
        const currentFrom = edgeFromRef.current
        if (!currentFrom) {
          setEdgeFrom(clicked)
        } else {
          if (clicked !== currentFrom) {
            const existing = edgesRef.current.find(
              (e) => e.from === currentFrom && e.to === clicked
            )
            if (!existing) {
              const id = `e-${currentFrom}-${clicked}`
              setEdges((prev) => [...prev, { id, from: currentFrom, to: clicked }])
            }
          }
          setEdgeFrom(null)
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    networkRef.current = network as any
  }, [mounted, nodes, edges, cycleNodes])

  useEffect(() => {
    renderGraph()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderGraph])

  const addNode = (type: "process" | "resource") => {
    const counter = type === "process" ? processCounter : resourceCounter
    const prefix = type === "process" ? "P" : "R"
    const id = `${prefix}${counter.current}`
    counter.current++
    setNodes((prev) => [
      ...prev,
      { id, label: id, type },
    ])
  }

  const handleEdgeClick = () => {
    if (edgeMode) {
      setEdgeMode(false)
      setEdgeFrom(null)
    } else {
      setEdgeMode(true)
      setDeleteMode(false)
      setAddMode(null)
    }
  }

  const clearAll = () => {
    setNodes([])
    setEdges([])
    processCounter.current = 0
    resourceCounter.current = 0
    setEdgeFrom(null)
    setEdgeMode(false)
    setDeleteMode(false)
    setAddMode(null)
  }

  const loadExample = () => {
    clearAll()
    processCounter.current = 3
    resourceCounter.current = 3
    setNodes([
      { id: "P0", label: "P0", type: "process" },
      { id: "P1", label: "P1", type: "process" },
      { id: "P2", label: "P2", type: "process" },
      { id: "R0", label: "R0", type: "resource" },
      { id: "R1", label: "R1", type: "resource" },
      { id: "R2", label: "R2", type: "resource" },
    ])
    setEdges([
      { id: "e-R0-P0", from: "R0", to: "P0" },
      { id: "e-P0-R1", from: "P0", to: "R1" },
      { id: "e-R1-P1", from: "R1", to: "P1" },
      { id: "e-P1-R2", from: "P1", to: "R2" },
      { id: "e-R2-P2", from: "R2", to: "P2" },
      { id: "e-P2-R0", from: "P2", to: "R0" },
    ])
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Build Your Own Deadlock
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Add processes and resources, draw edges (request/assignment), and watch
        for cycles. Directed edge from Process to Resource = request. From
        Resource to Process = assignment.
      </p>

      {/* Toolbar */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={() => addNode("process")}
        >
          + Process
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={() => addNode("resource")}
        >
          + Resource
        </Button>
        <Button
          variant={edgeMode ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", edgeMode && "bg-amber-600 hover:bg-amber-700")}
          onClick={handleEdgeClick}
        >
          {edgeMode
            ? edgeFrom
              ? `Edge from ${edgeFrom} → click target...`
              : "Edge mode ON — click source node"
            : "Draw Edge"}
        </Button>
        <Button
          variant={deleteMode ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", deleteMode && "bg-red-600 hover:bg-red-700")}
          onClick={() => {
            setDeleteMode(!deleteMode)
            setEdgeMode(false)
            setAddMode(null)
          }}
        >
          {deleteMode ? "Delete mode ON" : "Delete"}
        </Button>
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={loadExample}
        >
          Load Example
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={clearAll}
        >
          Clear All
        </Button>
      </div>

      {/* Graph */}
      <div
        ref={containerRef}
        className={cn(
          "border rounded bg-background transition-all",
          hasCycle && "border-red-500/50 ring-1 ring-red-500/20"
        )}
        style={{ height: "400px", width: "100%" }}
      />

      {/* Status */}
      <div
        className={cn(
          "mt-3 p-3 rounded-lg border-2 text-center transition-all",
          hasCycle
            ? "border-red-500 bg-red-500/10"
            : nodes.length > 0
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-muted bg-muted/30"
        )}
      >
        {nodes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Add some processes and resources to get started!
          </p>
        ) : hasCycle ? (
          <>
            <div className="text-xl font-black text-red-600 dark:text-red-400 animate-pulse">
              CYCLE DETECTED — DEADLOCK!
            </div>
            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
              Nodes in cycle:{" "}
              {Array.from(cycleNodes).join(", ")}. Remove an edge to break it.
            </p>
          </>
        ) : (
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            No cycle — system is safe
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-blue-500/30 border-2 border-blue-500" />
          <span>Process</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded-sm bg-gray-300 border-2 border-gray-500" />
          <span>Resource</span>
        </div>
        <span className="text-muted-foreground/50">|</span>
        <span>Process → Resource = Request</span>
        <span>Resource → Process = Assignment</span>
      </div>
    </div>
  )
}
