"use client"

import { useState, useMemo } from "react"

interface LanguageBuilderProps {
  title?: string
  alphabet: string[]
  maxLength: number
  languageName: string
  members: string[]
  description?: string
}

function generateAllStrings(alphabet: string[], maxLen: number): string[] {
  const result: string[] = ["ε"]
  if (maxLen === 0) return result
  let current = alphabet.map((c) => c)
  result.push(...current)
  for (let len = 2; len <= maxLen; len++) {
    const next: string[] = []
    for (const s of current) {
      for (const c of alphabet) {
        next.push(s + c)
      }
    }
    result.push(...next)
    current = next
  }
  return result
}

export function LanguageBuilder({
  title,
  alphabet,
  maxLength,
  languageName,
  members,
  description,
}: LanguageBuilderProps) {
  const [showNonMembers, setShowNonMembers] = useState(true)

  const allStrings = useMemo(
    () => generateAllStrings(alphabet, maxLength),
    [alphabet, maxLength]
  )

  const memberSet = useMemo(() => new Set(members), [members])

  const grouped = useMemo(() => {
    const groups: { length: number; label: string; strings: string[] }[] = []
    let i = 0
    for (let len = 0; len <= maxLength; len++) {
      const superscript = len
        .toString()
        .split("")
        .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(d)])
        .join("")
      const group: string[] = []
      while (i < allStrings.length) {
        const s = allStrings[i]
        const sLen = s === "ε" ? 0 : s.length
        if (sLen !== len) break
        group.push(s)
        i++
      }
      groups.push({ length: len, label: `Σ${superscript}`, strings: group })
    }
    return groups
  }, [allStrings, maxLength])

  const memberCount = members.length
  const totalShown = allStrings.length

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔍 ${title}` : "🔍 Language Builder"}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {memberCount} of {totalShown} strings in {languageName}
          </span>
          <button
            onClick={() => setShowNonMembers(!showNonMembers)}
            className="text-xs px-2 py-1 rounded border border-border hover:bg-muted/50 transition-colors"
          >
            {showNonMembers ? "Hide" : "Show"} non-members
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground text-center italic">
            {description}
          </p>
        )}

        {grouped.map((group) => {
          const visibleStrings = showNonMembers
            ? group.strings
            : group.strings.filter((s) => memberSet.has(s))

          if (visibleStrings.length === 0) return null

          return (
            <div key={group.length}>
              <div className="text-xs font-mono text-muted-foreground mb-1.5">
                {group.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {visibleStrings.map((s) => {
                  const isMember = memberSet.has(s)
                  return (
                    <span
                      key={s}
                      className={`
                        inline-flex items-center px-2 py-0.5 rounded text-sm font-mono
                        border transition-all duration-200
                        ${
                          isMember
                            ? "border-green-500/50 bg-green-500/15 text-green-700 dark:text-green-400 font-semibold"
                            : "border-border/50 bg-muted/20 text-muted-foreground/50"
                        }
                      `}
                    >
                      {s}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-4 py-2 border-t bg-muted/20">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-green-500/50 bg-green-500/15" />
            In {languageName}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-border/50 bg-muted/20" />
            Not in {languageName}
          </span>
        </div>
      </div>
    </div>
  )
}
