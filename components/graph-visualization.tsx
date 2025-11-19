"use client"

import { useEffect, useRef, useState } from "react"

// TypeScript interfaces for graph data
export interface GraphNode {
  id: string
  label?: string
  color?: string
  shape?: string
  [key: string]: unknown
}

export interface GraphEdge {
  from: string
  to: string
  label?: string
  arrows?: string
  [key: string]: unknown
}

interface GraphVisualizationProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  interactive?: boolean // Allow dragging nodes
  allowEdit?: boolean // Allow adding/removing nodes and edges
  directed?: boolean // Show arrows on edges
  height?: string // CSS height value (e.g., "400px", "50vh")
  width?: string // CSS width value
  className?: string
}

export function GraphVisualization({
  nodes,
  edges,
  interactive = true,
  allowEdit = false,
  directed = false,
  height = "400px",
  width = "100%",
  className = "",
}: GraphVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Import CSS dynamically on client side only
    // @ts-expect-error
    import("vis-network/styles/vis-network.css")
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    let network: any = null

    // Dynamically import vis-network and vis-data (client-side only)
    const initNetwork = async () => {
      const { Network } = await import("vis-network")
      const { DataSet } = await import("vis-data")

      if (!containerRef.current) return

      // Create DataSets for nodes and edges
      const nodesDataSet = new DataSet(nodes as any)
      const edgesDataSet = new DataSet(
        edges.map((edge) => ({
          ...edge,
          arrows: directed ? edge.arrows || "to" : undefined,
        })) as any
      )

      const data = {
        nodes: nodesDataSet,
        edges: edgesDataSet,
      }

      // Configure vis-network options
      const options = {
        nodes: {
          shape: "circle",
          size: 25,
          font: {
            size: 16,
            color: "#000000",
            align: "center",
            vadjust: 0,
          },
          borderWidth: 2,
          borderWidthSelected: 3,
          color: {
            border: "#16a34a",
            background: "#86efac",
            highlight: {
              border: "#15803d",
              background: "#bbf7d0",
            },
            hover: {
              border: "#15803d",
              background: "#bbf7d0",
            },
          },
        },
        edges: {
          width: 2,
          color: {
            color: "#848484",
            highlight: "#16a34a",
            hover: "#16a34a",
          },
          smooth: false,
          font: {
            size: 14,
            align: "middle",
          },
        },
        physics: {
          enabled: true,
          forceAtlas2Based: {
            gravitationalConstant: -50,
            centralGravity: 0.001,
            springLength: 100,
            springConstant: 0.08,
            damping: 0.4,
            avoidOverlap: 1,
          },
          maxVelocity: 50,
          solver: "forceAtlas2Based",
          stabilization: {
            enabled: true,
            iterations: 100,
            updateInterval: 25,
          },
        },
        interaction: {
          dragNodes: interactive,
          dragView: true,
          zoomView: true,
          hover: true,
          tooltipDelay: 100,
          keyboard: {
            enabled: false,
          },
        },
        manipulation: allowEdit
          ? {
              enabled: true,
              addNode: function (
                nodeData: GraphNode,
                callback: (data: GraphNode | null) => void
              ) {
                // Simple prompt for node label
                const label = prompt("Enter node label:", nodeData.id || "")
                if (label !== null) {
                  nodeData.label = label
                  nodeData.id = label
                  callback(nodeData)
                } else {
                  callback(null)
                }
              },
              addEdge: function (
                edgeData: GraphEdge,
                callback: (data: GraphEdge | null) => void
              ) {
                if (edgeData.from === edgeData.to) {
                  alert("Cannot connect a node to itself!")
                  callback(null)
                } else {
                  callback(edgeData)
                }
              },
              editEdge: false,
            }
          : {
              enabled: false,
            },
      }

      // Initialize network
      network = new Network(containerRef.current, data as any, options as any)
      networkRef.current = network

      // Optional: Add event listeners
      network.on("click", function (params: any) {
        if (params.nodes.length > 0) {
          console.log("Node clicked:", params.nodes[0])
        }
        if (params.edges.length > 0) {
          console.log("Edge clicked:", params.edges[0])
        }
      })
    }

    initNetwork()

    // Cleanup
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [nodes, edges, interactive, allowEdit, directed, mounted])

  if (!mounted) {
    return (
      <div
        className={`border rounded-lg bg-muted/30 flex items-center justify-center ${className}`}
        style={{ height, width }}
      >
        <p className="text-muted-foreground">Loading graph...</p>
      </div>
    )
  }

  return (
    <div className={`my-6 ${className}`}>
      <div
        ref={containerRef}
        className="border-2 border-primary/30 rounded-lg bg-background"
        style={{ height, width }}
      />
      {allowEdit && (
        <div className="mt-2 text-sm text-muted-foreground">
          <p>
            <strong>Edit Mode:</strong> Click and drag nodes. Use the controls
            in the top-left to add nodes/edges or delete elements.
          </p>
        </div>
      )}
    </div>
  )
}
