"use client"

import { useState } from "react"

interface TableData {
  name: string
  columns: string[]
  rows: string[][]
}

interface QueryExample {
  label: string
  sql: string
  setNotation: string
  description: string
  resultRows: string[][]
  highlightA?: number[]
  highlightB?: number[]
}

interface SQLSetVisualizerProps {
  tableA: TableData
  tableB: TableData
  queries: QueryExample[]
  className?: string
}

export function SQLSetVisualizer({
  tableA,
  tableB,
  queries,
  className = "",
}: SQLSetVisualizerProps) {
  const [activeQuery, setActiveQuery] = useState(0)
  const query = queries[activeQuery]

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">SQL ↔ Set Operations</span>
      </div>

      <div className="flex overflow-x-auto border-b bg-muted/20">
        {queries.map((q, i) => (
          <button
            key={i}
            onClick={() => setActiveQuery(i)}
            className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
              i === activeQuery
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <MiniTable
            data={tableA}
            highlightRows={query.highlightA}
            highlightColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <MiniTable
            data={tableB}
            highlightRows={query.highlightB}
            highlightColor="bg-amber-100 dark:bg-amber-900/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded p-3 bg-muted/10">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              SQL Query
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
              {query.sql}
            </pre>
          </div>
          <div className="border rounded p-3 bg-muted/10">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Set Operation
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
              {query.setNotation}
            </pre>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          {query.description}
        </p>

        {query.resultRows.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Result
            </div>
            <div className="border rounded overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  {query.resultRows.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0 ? "bg-green-50 dark:bg-green-900/20" : ""
                      }
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-1.5 border-b">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MiniTable({
  data,
  highlightRows,
  highlightColor,
}: {
  data: TableData
  highlightRows?: number[]
  highlightColor?: string
}) {
  const highlights = new Set(highlightRows ?? [])

  return (
    <div className="border rounded overflow-hidden">
      <div className="px-3 py-1.5 bg-muted/30 border-b text-xs font-semibold">
        {data.name}
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/10">
            {data.columns.map((col, i) => (
              <th
                key={i}
                className="px-3 py-1.5 text-left font-medium border-b"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className={highlights.has(i) ? highlightColor : ""}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-1.5 border-b">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
