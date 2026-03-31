"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PipelineStage {
  name: string
  lecture: string
  content: string
  description: string
}

interface FullPipelineVisualizerProps {
  title?: string
  source: string
  stages: PipelineStage[]
  interpreterResult?: string
  transpilerResult?: string
}

export function FullPipelineVisualizer({
  title,
  source,
  stages,
  interpreterResult,
  transpilerResult,
}: FullPipelineVisualizerProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [execMode, setExecMode] = useState<"interpreter" | "transpiler">("interpreter")

  const stage = stages[currentStage]
  const isFirst = currentStage === 0
  const isLast = currentStage === stages.length - 1

  const showExecToggle = isLast && interpreterResult && transpilerResult

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔧 ${title}` : "🔧 Full Pipeline Visualizer"}
        </span>
        <span className="text-xs text-muted-foreground">
          Stage {currentStage + 1} of {stages.length}
        </span>
      </div>

      <div className="px-4 py-2 border-b bg-muted/10 overflow-x-auto">
        <div className="flex items-center justify-center gap-1 min-w-max">
          {stages.map((s, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => setCurrentStage(i)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap ${
                  i === currentStage
                    ? "bg-primary text-primary-foreground"
                    : i < currentStage
                      ? "bg-green-500/15 text-green-700 dark:text-green-400"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s.name}
              </button>
              {i < stages.length - 1 && (
                <span className="mx-1 text-muted-foreground text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Input</span>
            <span className="text-xs text-muted-foreground">{currentStage === 0 ? "Source" : stages[currentStage - 1]?.name}</span>
          </div>
          <div className="p-3 font-mono text-sm bg-zinc-950 text-zinc-300 min-h-[120px] overflow-x-auto whitespace-pre">
            {currentStage === 0 ? source : stages[currentStage - 1]?.content || source}
          </div>
        </div>

        <div>
          <div className="px-3 py-1.5 bg-muted/30 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Output</span>
            <span className="text-xs text-blue-600 dark:text-blue-400">{stage.lecture}</span>
          </div>
          <div className="p-3 font-mono text-sm bg-zinc-950 text-zinc-300 min-h-[120px] overflow-x-auto whitespace-pre">
            {stage.content}
          </div>
        </div>
      </div>

      {showExecToggle && (
        <div className="px-4 py-2 border-b bg-muted/10 flex items-center justify-center gap-4">
          <span className="text-xs text-muted-foreground">Execution path:</span>
          <div className="flex gap-2">
            <Button
              variant={execMode === "interpreter" ? "default" : "outline"}
              size="sm"
              onClick={() => setExecMode("interpreter")}
            >
              Interpreter (LN 11)
            </Button>
            <Button
              variant={execMode === "transpiler" ? "default" : "outline"}
              size="sm"
              onClick={() => setExecMode("transpiler")}
            >
              Transpiler (LN 12)
            </Button>
          </div>
        </div>
      )}

      {showExecToggle && (
        <div className="px-4 py-3 border-b bg-zinc-950">
          <div className="text-xs text-muted-foreground mb-1">
            {execMode === "interpreter" ? "Interpreter output:" : "Transpiled JavaScript:"}
          </div>
          <div className="font-mono text-sm text-green-400 whitespace-pre">
            {execMode === "interpreter" ? interpreterResult : transpilerResult}
          </div>
        </div>
      )}

      {stage.description && (
        <div className="px-4 py-2 border-b bg-muted/20">
          <p className="text-sm text-muted-foreground italic text-center">
            {stage.description}
          </p>
        </div>
      )}

      <div className="px-4 py-3 bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStage((s) => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStage(0)}
          disabled={isFirst}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentStage((s) => Math.min(stages.length - 1, s + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
