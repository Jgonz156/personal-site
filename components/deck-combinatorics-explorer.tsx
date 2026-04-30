"use client"

import { useMemo, useState } from "react"

function logFact(n: number): number {
  let s = 0
  for (let i = 2; i <= n; i++) s += Math.log(i)
  return s
}

function logChoose(n: number, k: number): number {
  if (k < 0 || k > n) return -Infinity
  return logFact(n) - logFact(k) - logFact(n - k)
}

function choose(n: number, k: number): number {
  return Math.exp(logChoose(n, k))
}

function fmtBig(n: number): string {
  if (!isFinite(n)) return "∞"
  if (n < 1) return n.toExponential(2)
  if (n < 1e6) return Math.round(n).toLocaleString()
  if (n < 1e15) return Math.round(n).toLocaleString()
  return n.toExponential(2)
}

export function DeckCombinatoricsExplorer() {
  const [deckSize, setDeckSize] = useState(60)
  const [handSize, setHandSize] = useState(7)
  const [specials, setSpecials] = useState(8)

  const distribution = useMemo(() => {
    const dist: { kSpecials: number; prob: number }[] = []
    const totalLog = logChoose(deckSize, handSize)
    const maxK = Math.min(specials, handSize)
    for (let k = 0; k <= maxK; k++) {
      const num = logChoose(specials, k) + logChoose(deckSize - specials, handSize - k)
      const p = Math.exp(num - totalLog)
      dist.push({ kSpecials: k, prob: p })
    }
    return dist
  }, [deckSize, handSize, specials])

  const totalHands = choose(deckSize, handSize)
  const pAtLeastOne =
    distribution.length === 0 ? 0 : 1 - (distribution[0]?.prob ?? 0)

  const maxProb = Math.max(...distribution.map((d) => d.prob))

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">
          Deck Combinatorics — opening hands and the binomial coefficient
        </span>
      </div>

      <div className="px-4 py-3 border-b grid sm:grid-cols-3 gap-3">
        <label className="text-xs flex items-center gap-2">
          <span className="w-20 shrink-0 text-muted-foreground">deck N</span>
          <input
            type="range"
            min={20}
            max={100}
            step={1}
            value={deckSize}
            onChange={(e) => {
              const v = parseInt(e.target.value)
              setDeckSize(v)
              if (handSize > v) setHandSize(v)
              if (specials > v) setSpecials(v)
            }}
            className="flex-1"
          />
          <span className="font-mono w-10 text-right">{deckSize}</span>
        </label>
        <label className="text-xs flex items-center gap-2">
          <span className="w-20 shrink-0 text-muted-foreground">hand n</span>
          <input
            type="range"
            min={1}
            max={Math.min(15, deckSize)}
            step={1}
            value={handSize}
            onChange={(e) => setHandSize(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono w-10 text-right">{handSize}</span>
        </label>
        <label className="text-xs flex items-center gap-2">
          <span className="w-20 shrink-0 text-muted-foreground">specials s</span>
          <input
            type="range"
            min={0}
            max={Math.min(40, deckSize)}
            step={1}
            value={specials}
            onChange={(e) => setSpecials(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono w-10 text-right">{specials}</span>
        </label>
      </div>

      <div className="px-4 py-4 grid md:grid-cols-[1fr_240px] gap-4 items-start">
        <div>
          <p className="text-xs font-semibold mb-2">
            P(exactly k specials in opening hand)
          </p>
          <div className="space-y-1">
            {distribution.map((d) => {
              const widthPct = maxProb === 0 ? 0 : (d.prob / maxProb) * 100
              return (
                <div key={d.kSpecials} className="flex items-center gap-2 text-xs">
                  <span className="w-6 font-mono text-right">{d.kSpecials}</span>
                  <div className="flex-1 h-4 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${widthPct}%`,
                        background:
                          d.kSpecials === 0
                            ? "#dc2626"
                            : d.kSpecials === 1
                              ? "#f59e0b"
                              : "#16a34a",
                      }}
                    />
                  </div>
                  <span className="w-16 text-right font-mono text-muted-foreground">
                    {(d.prob * 100).toFixed(2)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-xs space-y-2 border rounded p-3 bg-muted/20">
          <p className="font-semibold text-sm">Hypergeometric draw</p>
          <p className="font-mono text-[11px] leading-relaxed">
            P(K = k) ={" "}
            <span className="whitespace-nowrap">
              C(s, k) · C(N−s, n−k) / C(N, n)
            </span>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Total possible hands{" "}
            <span className="font-mono">C({deckSize}, {handSize}) = </span>
            <strong className="text-foreground">{fmtBig(totalHands)}</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            P(at least one special) ={" "}
            <strong className="text-foreground">
              {(pAtLeastOne * 100).toFixed(2)}%
            </strong>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Game designers tune deck size, hand size, and rare-card counts to
            hit a target opening-hand variance. CMSI 3751 makes you defend
            those numbers with{" "}
            <em>exactly</em> the binomial coefficients from LN16–17.
          </p>
        </div>
      </div>
    </div>
  )
}
