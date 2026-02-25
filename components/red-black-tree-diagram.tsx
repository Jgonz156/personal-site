"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface RBTNode {
  id: string
  label: string
  vruntime: number
  isRed: boolean
  isLeftmost: boolean
}

interface RBTEdge {
  from: string
  to: string
}

const exampleNodes: RBTNode[] = [
  { id: "n1", label: "P3", vruntime: 12, isRed: false, isLeftmost: false },
  { id: "n2", label: "P1", vruntime: 5, isRed: true, isLeftmost: false },
  { id: "n3", label: "P5", vruntime: 22, isRed: false, isLeftmost: false },
  { id: "n4", label: "P7", vruntime: 3, isRed: false, isLeftmost: true },
  { id: "n5", label: "P4", vruntime: 9, isRed: false, isLeftmost: false },
  { id: "n6", label: "P2", vruntime: 18, isRed: true, isLeftmost: false },
  { id: "n7", label: "P6", vruntime: 30, isRed: true, isLeftmost: false },
]

const exampleEdges: RBTEdge[] = [
  { from: "n1", to: "n2" },
  { from: "n1", to: "n3" },
  { from: "n2", to: "n4" },
  { from: "n2", to: "n5" },
  { from: "n3", to: "n6" },
  { from: "n3", to: "n7" },
]

export interface RedBlackTreeDiagramProps {
  className?: string
}

export function RedBlackTreeDiagram({ className }: RedBlackTreeDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<unknown>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    let network: { destroy: () => void } | null = null

    const initNetwork = async () => {
      const { Network } = await import("vis-network")
      const { DataSet } = await import("vis-data")

      if (!containerRef.current) return

      const nodes = new DataSet(
        exampleNodes.map((n) => ({
          id: n.id,
          label: `${n.label}\nvrt=${n.vruntime}`,
          color: {
            background: n.isLeftmost
              ? "#22C55E"
              : n.isRed
                ? "#EF4444"
                : "#374151",
            border: n.isLeftmost
              ? "#16A34A"
              : n.isRed
                ? "#DC2626"
                : "#1F2937",
            highlight: {
              background: n.isLeftmost ? "#4ADE80" : n.isRed ? "#F87171" : "#4B5563",
              border: n.isLeftmost ? "#16A34A" : n.isRed ? "#DC2626" : "#1F2937",
            },
          },
          font: {
            color: "#FFFFFF",
            size: 13,
            face: "monospace",
            multi: "md",
          },
          shape: "circle",
          size: 28,
          borderWidth: n.isLeftmost ? 4 : 2,
          borderWidthSelected: n.isLeftmost ? 5 : 3,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })) as any
      )

      const edges = new DataSet(
        exampleEdges.map((e) => ({
          from: e.from,
          to: e.to,
          color: { color: "#6B7280", highlight: "#9CA3AF" },
          width: 2,
          smooth: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })) as any
      )

      const options = {
        layout: {
          hierarchical: {
            enabled: true,
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 70,
            nodeSpacing: 100,
          },
        },
        physics: { enabled: false },
        interaction: {
          dragNodes: false,
          dragView: false,
          zoomView: false,
          selectable: false,
        },
        edges: {
          arrows: { to: { enabled: false } },
        },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      network = new Network(containerRef.current, { nodes, edges } as any, options as any)
      networkRef.current = network
    }

    initNetwork()

    return () => {
      if (networkRef.current) {
        (networkRef.current as { destroy: () => void }).destroy()
        networkRef.current = null
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div
        className={cn(
          "border rounded-lg bg-muted/30 flex items-center justify-center h-[300px]",
          className
        )}
      >
        <p className="text-muted-foreground text-sm">Loading tree...</p>
      </div>
    )
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        CFS Red-Black Tree — Virtual Runtime
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        CFS stores all runnable processes in a red-black tree keyed by vruntime.
        The leftmost node (lowest vruntime, highlighted green) is always
        selected next — O(log n).
      </p>

      <div
        ref={containerRef}
        className="border rounded bg-background"
        style={{ height: "300px", width: "100%" }}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#374151] border-2 border-[#1F2937]" />
          <span>Black node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#EF4444] border-2 border-[#DC2626]" />
          <span>Red node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#22C55E] border-[3px] border-[#16A34A]" />
          <span>Leftmost — next to schedule</span>
        </div>
      </div>
    </div>
  )
}
