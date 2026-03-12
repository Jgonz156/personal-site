"use client"

interface GrammarFormalizationProps {
  title?: string
  informal: string
  variables: string
  alphabet: string
  rules: string
  startSymbol: string
}

export function GrammarFormalization({
  title,
  informal,
  variables,
  alphabet,
  rules,
  startSymbol,
}: GrammarFormalizationProps) {
  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-3 bg-muted/50 border-b">
          <span className="font-semibold text-sm">{title}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Informal Grammar
          </h4>
          <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed bg-muted/30 rounded-md p-3">
            {informal.split("\n").map((line, i) => {
              const arrowIdx = line.indexOf("→")
              if (arrowIdx === -1) return <span key={i}>{line}{"\n"}</span>
              const lhs = line.substring(0, arrowIdx).trim()
              const rhs = line.substring(arrowIdx + 1).trim()
              return (
                <span key={i}>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold italic">{lhs}</span>
                  <span className="text-muted-foreground"> → </span>
                  {rhs.split("").map((ch, j) => {
                    if (ch === ch.toUpperCase() && /[A-Z]/.test(ch)) {
                      return <span key={j} className="text-blue-600 dark:text-blue-400 italic">{ch}</span>
                    }
                    if (ch === "ε") {
                      return <span key={j} className="text-amber-500">{ch}</span>
                    }
                    if (ch === "|") {
                      return <span key={j} className="text-muted-foreground/60"> | </span>
                    }
                    return <span key={j}>{ch}</span>
                  })}
                  {"\n"}
                </span>
              )
            })}
          </pre>
        </div>

        <div className="p-4 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Formal 4-Tuple
          </h4>
          <div className="space-y-3 text-sm font-mono bg-muted/30 rounded-md p-3">
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5 font-sans">Variables</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{variables}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5 font-sans">Alphabet</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">{alphabet}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5 font-sans">Rules</span>
              <span className="text-foreground">{rules}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5 font-sans">Start</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold italic">{startSymbol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
