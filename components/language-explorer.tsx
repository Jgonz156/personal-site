"use client"

import { useState } from "react"

export type LensId = "operational" | "denotational" | "axiomatic"

export interface LanguageEntry {
  id: string
  name: string
  /** Family label, e.g. "Imperative" or "Pure functional". */
  family: string
  /** Short code snippet (one-language sample). */
  snippet: string
  /**
   * Intensity per lens, on a 0-4 scale. Higher = more central to the
   * language's idiomatic style of reasoning.
   */
  intensities: Record<LensId, number>
  /** One-line description of how a programmer in this language would read the snippet through each lens. */
  readings: Record<LensId, string>
  /** Pithy default reading — what mode of thought the language nudges you into first. */
  defaultReading: string
}

export interface LanguageExplorerProps {
  title?: string
  languages: LanguageEntry[]
}

const LENS_META: Record<
  LensId,
  { label: string; tint: string; bar: string }
> = {
  operational: {
    label: "Operational",
    tint: "text-blue-700 dark:text-blue-300",
    bar: "bg-blue-500",
  },
  denotational: {
    label: "Denotational",
    tint: "text-emerald-700 dark:text-emerald-300",
    bar: "bg-emerald-500",
  },
  axiomatic: {
    label: "Axiomatic",
    tint: "text-amber-700 dark:text-amber-300",
    bar: "bg-amber-500",
  },
}

const LENS_ORDER: LensId[] = ["operational", "denotational", "axiomatic"]

function IntensityBar({
  lensId,
  value,
}: {
  lensId: LensId
  value: number
}) {
  const meta = LENS_META[lensId]
  const clamped = Math.max(0, Math.min(4, value))
  const pct = (clamped / 4) * 100
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-semibold w-24 ${meta.tint}`}>
        {meta.label}
      </span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${meta.bar} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-muted-foreground tabular-nums w-6 text-right">
        {clamped}/4
      </span>
    </div>
  )
}

export function LanguageExplorer({ title, languages }: LanguageExplorerProps) {
  const [selectedId, setSelectedId] = useState(languages[0]?.id ?? "")
  const selected =
    languages.find((l) => l.id === selectedId) ?? languages[0]

  if (!selected) return null

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🧭 ${title}` : "🧭 Language Explorer"}
        </span>
        <span className="text-xs text-muted-foreground">
          {languages.length} languages
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,180px)_1fr] border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Languages
            </span>
          </div>
          <div className="p-2 flex flex-wrap md:flex-col gap-1">
            {languages.map((lang) => {
              const isActive = lang.id === selected.id
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setSelectedId(lang.id)}
                  className={`text-left px-3 py-1.5 rounded text-sm transition-colors border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 hover:bg-muted border-transparent"
                  }`}
                >
                  <div className="font-medium">{lang.name}</div>
                  <div
                    className={`text-[11px] ${
                      isActive
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {lang.family}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-4 py-3 space-y-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Sample
            </div>
            <pre className="bg-muted/30 rounded px-3 py-2 font-mono text-xs leading-5 overflow-x-auto">
              {selected.snippet}
            </pre>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Semantic centre of gravity
            </div>
            <div className="space-y-1.5">
              {LENS_ORDER.map((lensId) => (
                <IntensityBar
                  key={lensId}
                  lensId={lensId}
                  value={selected.intensities[lensId]}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              How a {selected.name} programmer reads the sample
            </div>
            <div className="space-y-1.5">
              {LENS_ORDER.map((lensId) => {
                const meta = LENS_META[lensId]
                return (
                  <div key={lensId} className="text-sm">
                    <span className={`font-semibold ${meta.tint} mr-1.5`}>
                      {meta.label}:
                    </span>
                    <span className="text-foreground/80">
                      {selected.readings[lensId]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Default reading
            </div>
            <p className="text-sm italic">{selected.defaultReading}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
