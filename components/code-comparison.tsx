"use client"

interface CodePanel {
  title: string
  code: string
}

interface Annotation {
  label: string
  color: string
}

interface CodeComparisonProps {
  left: CodePanel
  right: CodePanel
  annotations?: Annotation[]
  caption?: string
}

export function CodeComparison({
  left,
  right,
  annotations,
  caption,
}: CodeComparisonProps) {
  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left panel */}
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-4 py-2 bg-muted/50 border-b">
            <span className="font-semibold text-sm">{left.title}</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: left.code }} />
            </pre>
          </div>
        </div>

        {/* Right panel */}
        <div>
          <div className="px-4 py-2 bg-muted/50 border-b">
            <span className="font-semibold text-sm">{right.title}</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: right.code }} />
            </pre>
          </div>
        </div>
      </div>

      {/* Annotation legend */}
      {annotations && annotations.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/20 flex flex-wrap gap-4">
          {annotations.map((a, i) => (
            <span key={i} className="text-xs flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: a.color }}
              />
              {a.label}
            </span>
          ))}
        </div>
      )}

      {/* Caption */}
      {caption && (
        <div className="px-4 py-2 border-t">
          <p className="text-sm text-muted-foreground italic text-center">
            {caption}
          </p>
        </div>
      )}
    </div>
  )
}
