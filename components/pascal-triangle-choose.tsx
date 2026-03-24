"use client"

import { useState, useMemo } from "react"

function generateTriangle(rows: number): number[][] {
  const tri: number[][] = [[1]]
  for (let r = 1; r < rows; r++) {
    const prev = tri[r - 1]
    const row = [1]
    for (let k = 1; k < r; k++) {
      row.push(prev[k - 1] + prev[k])
    }
    row.push(1)
    tri.push(row)
  }
  return tri
}

interface PascalTriangleChooseProps {
  className?: string
  rows?: number
}

export function PascalTriangleChoose({
  className = "",
  rows = 7,
}: PascalTriangleChooseProps) {
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const triangle = useMemo(() => generateTriangle(rows), [rows])

  const handleClick = (r: number, k: number) => {
    if (r < 2) return
    if (k === 0 || k === r) {
      setSelected(null)
      return
    }
    if (selected && selected[0] === r && selected[1] === k) {
      setSelected(null)
    } else {
      setSelected([r, k])
    }
  }

  const isSelected = (r: number, k: number) =>
    selected !== null && selected[0] === r && selected[1] === k

  const isParent = (r: number, k: number) => {
    if (!selected) return false
    const [sr, sk] = selected
    return r === sr - 1 && (k === sk - 1 || k === sk)
  }

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">
          Pascal&apos;s Triangle as C(n, k)
        </span>
        <span className="text-xs text-muted-foreground">
          Click any interior cell to see Pascal&apos;s Rule
        </span>
      </div>

      <div className="px-4 py-6 flex flex-col items-center gap-2 overflow-x-auto">
        {triangle.map((row, r) => (
          <div key={r} className="flex items-center justify-center gap-2">
            {row.map((val, k) => {
              const sel = isSelected(r, k)
              const par = isParent(r, k)
              const clickable = r >= 2 && k > 0 && k < r

              let bg = ""
              if (sel) bg = "bg-primary text-primary-foreground ring-2 ring-primary"
              else if (par) bg = "bg-primary/20 ring-2 ring-primary/50"

              return (
                <button
                  key={k}
                  onClick={() => handleClick(r, k)}
                  disabled={!clickable && !sel}
                  className={`flex flex-col items-center justify-center rounded-lg px-2 py-1 min-w-[3.5rem] transition-all ${bg} ${
                    clickable
                      ? "cursor-pointer hover:bg-muted/60"
                      : "cursor-default"
                  }`}
                >
                  <span className="text-sm font-mono font-bold">{val}</span>
                  <span
                    className={`text-[10px] font-medium ${
                      sel
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    C({r},{k})
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {selected && (
        <div className="px-4 py-3 border-t bg-muted/20 text-center">
          <p className="text-sm font-mono">
            <span className="text-primary font-semibold">
              C({selected[0] - 1},{selected[1] - 1})
            </span>
            {" + "}
            <span className="text-primary font-semibold">
              C({selected[0] - 1},{selected[1]})
            </span>
            {" = "}
            <span className="font-semibold">
              {triangle[selected[0] - 1][selected[1] - 1]}
            </span>
            {" + "}
            <span className="font-semibold">
              {triangle[selected[0] - 1][selected[1]]}
            </span>
            {" = "}
            <span className="text-primary font-bold">
              {triangle[selected[0]][selected[1]]}
            </span>
            {" = "}
            <span className="text-primary font-bold">
              C({selected[0]},{selected[1]})
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
