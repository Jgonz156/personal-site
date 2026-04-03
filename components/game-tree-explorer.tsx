"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"

type CellValue = "X" | "O" | ""
type Board = CellValue[]

interface TreeNode {
  board: Board
  move: number
  turn: "X" | "O"
  score: number
  children: TreeNode[]
  isTerminal: boolean
  winner: "X" | "O" | "draw" | null
}

function checkWinner(board: Board): "X" | "O" | "draw" | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a] as "X" | "O"
    }
  }
  if (board.every((c) => c !== "")) return "draw"
  return null
}

function buildTree(board: Board, turn: "X" | "O", move: number, maxDepth: number, depth = 0): TreeNode {
  const winner = checkWinner(board)
  if (winner || depth >= maxDepth) {
    let score = 0
    if (winner === "X") score = 1
    else if (winner === "O") score = -1
    return { board: [...board], move, turn, score, children: [], isTerminal: true, winner }
  }

  const children: TreeNode[] = []
  const nextTurn = turn === "X" ? "O" : "X"

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      const next = [...board]
      next[i] = turn
      children.push(buildTree(next, nextTurn, i, maxDepth, depth + 1))
    }
  }

  let score: number
  if (turn === "X") {
    score = Math.max(...children.map((c) => c.score))
  } else {
    score = Math.min(...children.map((c) => c.score))
  }

  return { board: [...board], move, turn, score, children, isTerminal: false, winner: null }
}

function MiniBoard({ board, size = 60, highlight }: { board: Board; size?: number; highlight?: number }) {
  const cellSize = size / 3
  return (
    <svg width={size} height={size} className="border border-border rounded-sm bg-background">
      {[1, 2].map((i) => (
        <g key={`grid-${i}`}>
          <line x1={cellSize * i} y1={0} x2={cellSize * i} y2={size} stroke="currentColor" strokeWidth={0.5} className="text-border" />
          <line x1={0} y1={cellSize * i} x2={size} y2={cellSize * i} stroke="currentColor" strokeWidth={0.5} className="text-border" />
        </g>
      ))}
      {board.map((cell, idx) => {
        const row = Math.floor(idx / 3)
        const col = idx % 3
        const cx = col * cellSize + cellSize / 2
        const cy = row * cellSize + cellSize / 2
        const isHighlight = idx === highlight
        if (cell === "X") {
          const d = cellSize * 0.28
          return (
            <g key={idx}>
              <line x1={cx - d} y1={cy - d} x2={cx + d} y2={cy + d} stroke={isHighlight ? "#3b82f6" : "#ef4444"} strokeWidth={isHighlight ? 2.5 : 1.5} strokeLinecap="round" />
              <line x1={cx + d} y1={cy - d} x2={cx - d} y2={cy + d} stroke={isHighlight ? "#3b82f6" : "#ef4444"} strokeWidth={isHighlight ? 2.5 : 1.5} strokeLinecap="round" />
            </g>
          )
        }
        if (cell === "O") {
          return <circle key={idx} cx={cx} cy={cy} r={cellSize * 0.28} fill="none" stroke={isHighlight ? "#3b82f6" : "#22c55e"} strokeWidth={isHighlight ? 2.5 : 1.5} />
        }
        return null
      })}
    </svg>
  )
}

interface GameTreeExplorerProps {
  initialBoard?: Board
  maxDepth?: number
  className?: string
}

export function GameTreeExplorer({
  initialBoard,
  maxDepth = 3,
  className = "",
}: GameTreeExplorerProps) {
  const startBoard: Board = initialBoard ?? ["X", "O", "", "", "X", "", "", "", "O"]
  const tree = useMemo(() => buildTree(startBoard, "X", -1, maxDepth), [maxDepth])
  const [path, setPath] = useState<number[]>([])

  const currentNode = useMemo(() => {
    let node = tree
    for (const idx of path) {
      if (idx < node.children.length) {
        node = node.children[idx]
      }
    }
    return node
  }, [tree, path])

  const handleChildClick = useCallback((childIdx: number) => {
    setPath((p) => [...p, childIdx])
  }, [])

  const handleBack = useCallback(() => {
    setPath((p) => p.slice(0, -1))
  }, [])

  const handleReset = useCallback(() => {
    setPath([])
  }, [])

  const scoreLabel = (score: number) => {
    if (score === 1) return "+1 (X wins)"
    if (score === -1) return "−1 (O wins)"
    return "0 (draw)"
  }

  const scoreColor = (score: number) => {
    if (score === 1) return "text-red-500"
    if (score === -1) return "text-green-500"
    return "text-muted-foreground"
  }

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">Game Tree Explorer</span>
        <span className="text-xs text-muted-foreground">
          Depth {path.length} · Minimax score: <span className={scoreColor(currentNode.score)}>{scoreLabel(currentNode.score)}</span>
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="text-xs text-muted-foreground mb-1 font-medium">
              {currentNode.isTerminal
                ? currentNode.winner === "draw"
                  ? "Game Over: Draw"
                  : `Game Over: ${currentNode.winner} wins!`
                : `${currentNode.turn}'s turn`}
            </div>
            <MiniBoard board={currentNode.board} size={90} />
          </div>
          <div className="text-sm text-muted-foreground flex-1">
            <p className="mb-2">
              {currentNode.isTerminal
                ? "This is a leaf node — the game ended here."
                : `Click a child board below to explore that move. ${currentNode.turn === "X" ? "X maximizes" : "O minimizes"} the score.`}
            </p>
            <p className="text-xs">
              <strong>Minimax value:</strong>{" "}
              <span className={scoreColor(currentNode.score)}>
                {scoreLabel(currentNode.score)}
              </span>
              {!currentNode.isTerminal && (
                <> — {currentNode.turn === "X" ? "max" : "min"} of children</>
              )}
            </p>
          </div>
        </div>

        {currentNode.children.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Possible moves ({currentNode.children.length})
            </div>
            <div className="flex flex-wrap gap-3">
              {currentNode.children.map((child, i) => (
                <button
                  key={i}
                  onClick={() => handleChildClick(i)}
                  className="group flex flex-col items-center gap-1 p-1.5 rounded-lg border border-transparent hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <MiniBoard board={child.board} size={54} highlight={child.move} />
                  <span className={`text-[10px] font-mono ${scoreColor(child.score)}`}>
                    {child.score > 0 ? "+" : ""}{child.score}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleBack} disabled={path.length === 0}>
          ← Back
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset} disabled={path.length === 0}>
          Reset to Root
        </Button>
        <span className="text-xs text-muted-foreground ml-auto">
          Path depth: {path.length}
        </span>
      </div>
    </div>
  )
}
