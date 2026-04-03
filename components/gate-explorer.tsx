"use client"

import { useState } from "react"

interface GateTab {
  name: string
  expression: string
  headers: string[]
  rows: number[][]
  gateRenderer: () => React.ReactNode
  note?: string
}

function AndGate() {
  return (
    <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: "100px" }}>
      <text x="18" y="42" className="text-xs fill-muted-foreground" textAnchor="end">a</text>
      <text x="18" y="82" className="text-xs fill-muted-foreground" textAnchor="end">b</text>
      <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <line x1="20" y1="80" x2="60" y2="80" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <path d="M60,25 L60,95 L100,95 A40,35 0 0,0 100,25 Z" fill="none" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <line x1="140" y1="60" x2="180" y2="60" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <text x="185" y="63" className="text-xs fill-muted-foreground" textAnchor="start">a AND b</text>
    </svg>
  )
}

function OrGate() {
  return (
    <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: "100px" }}>
      <text x="18" y="42" className="text-xs fill-muted-foreground" textAnchor="end">a</text>
      <text x="18" y="82" className="text-xs fill-muted-foreground" textAnchor="end">b</text>
      <line x1="20" y1="40" x2="65" y2="40" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <line x1="20" y1="80" x2="65" y2="80" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <path d="M50,25 Q70,60 50,95 Q100,95 140,60 Q100,25 50,25 Z" fill="none" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <line x1="140" y1="60" x2="180" y2="60" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <text x="185" y="63" className="text-xs fill-muted-foreground" textAnchor="start">a OR b</text>
    </svg>
  )
}

function NotGate() {
  return (
    <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: "100px" }}>
      <text x="18" y="62" className="text-xs fill-muted-foreground" textAnchor="end">a</text>
      <line x1="20" y1="60" x2="60" y2="60" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <polygon points="60,30 60,90 130,60" fill="none" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <circle cx="137" cy="60" r={6} fill="none" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <line x1="143" y1="60" x2="180" y2="60" stroke="currentColor" className="text-foreground" strokeWidth={2} />
      <text x="185" y="63" className="text-xs fill-muted-foreground" textAnchor="start">NOT a</text>
    </svg>
  )
}

function DeMorganGate() {
  return (
    <svg viewBox="0 0 300 140" className="w-full" style={{ maxHeight: "120px" }}>
      <text x="10" y="46" className="text-[10px] fill-muted-foreground" textAnchor="start">a</text>
      <text x="10" y="100" className="text-[10px] fill-muted-foreground" textAnchor="start">b</text>
      {/* AND gate */}
      <line x1="25" y1="44" x2="70" y2="44" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
      <line x1="25" y1="98" x2="70" y2="98" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
      <path d="M70,30 L70,112 L105,112 A35,41 0 0,0 105,30 Z" fill="none" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
      {/* NOT bubble on output */}
      <circle cx="147" cy="71" r={5} fill="none" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
      <line x1="140" y1="71" x2="142" y2="71" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
      {/* Output */}
      <line x1="152" y1="71" x2="180" y2="71" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
      <text x="185" y="65" className="text-[9px] fill-muted-foreground" textAnchor="start">NOT(a AND b)</text>
      <text x="185" y="80" className="text-[9px] fill-muted-foreground" textAnchor="start">= NOT a OR NOT b</text>
    </svg>
  )
}

const TABS: GateTab[] = [
  {
    name: "AND",
    expression: "a × b",
    headers: ["a", "b", "a AND b"],
    rows: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    gateRenderer: () => <AndGate />,
  },
  {
    name: "OR",
    expression: "a + b",
    headers: ["a", "b", "a OR b"],
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    gateRenderer: () => <OrGate />,
  },
  {
    name: "NOT",
    expression: "ā",
    headers: ["a", "NOT a"],
    rows: [
      [0, 1],
      [1, 0],
    ],
    gateRenderer: () => <NotGate />,
  },
  {
    name: "DeMorgan",
    expression: "NOT(a AND b) = NOT a OR NOT b",
    headers: ["a", "b", "a AND b", "NOT(a AND b)", "NOT a OR NOT b"],
    rows: [
      [0, 0, 0, 1, 1],
      [0, 1, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 1, 1, 0, 0],
    ],
    gateRenderer: () => <DeMorganGate />,
    note: "Columns 4 and 5 are identical — DeMorgan's Law holds for all inputs.",
  },
]

export function GateExplorer() {
  const [tabIdx, setTabIdx] = useState(0)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const tab = TABS[tabIdx]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">Gate Explorer</span>
        <div className="flex gap-1">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => { setTabIdx(i); setHoveredRow(null) }}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                i === tabIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gate diagram */}
          <div className="flex flex-col items-center justify-center border rounded p-3 bg-muted/10">
            <div className="text-xs text-muted-foreground mb-1 font-medium">{tab.expression}</div>
            {tab.gateRenderer()}
          </div>

          {/* Truth table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {tab.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 text-left border-b font-medium text-muted-foreground text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tab.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    onMouseEnter={() => setHoveredRow(ri)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`transition-colors cursor-default ${
                      hoveredRow === ri ? "bg-primary/10" : ""
                    }`}
                  >
                    {row.map((val, ci) => (
                      <td key={ci} className="px-3 py-1.5 border-b font-mono text-sm">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {tab.note && (
              <p className="text-xs text-muted-foreground italic mt-2">{tab.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
