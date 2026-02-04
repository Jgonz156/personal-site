"use client"

import { cn } from "@/lib/utils"

export interface PCBPanelProps {
  processId?: number
  processName?: string
  state?: "running" | "ready" | "blocked"
  programCounter?: string
  registers?: string[]
  highlightField?: string
  compact?: boolean
  className?: string
}

export function PCBPanel({
  processId = 1234,
  processName = "Process A",
  state = "running",
  programCounter = "0x7fff5678",
  registers = ["RAX", "RBX", "RCX", "RDX"],
  highlightField,
  compact = false,
  className,
}: PCBPanelProps) {
  const stateColors = {
    running: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500",
    ready: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500",
    blocked: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500",
  }

  const isHighlighted = (field: string) => highlightField === field

  const Field = ({ 
    label, 
    value, 
    fieldName 
  }: { 
    label: string
    value: React.ReactNode
    fieldName: string 
  }) => (
    <div
      className={cn(
        "flex justify-between items-center py-1 px-2 rounded transition-colors",
        isHighlighted(fieldName) && "bg-primary/20 ring-1 ring-primary"
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono">{value}</span>
    </div>
  )

  return (
    <div
      className={cn(
        "border rounded-lg bg-card p-3",
        compact ? "text-xs" : "text-sm",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm">Process Control Block</h4>
        <span className="text-xs text-muted-foreground font-mono">PCB</span>
      </div>

      <div className="space-y-1">
        <Field 
          label="Process ID (PID)" 
          value={processId} 
          fieldName="pid" 
        />
        <Field 
          label="Process Name" 
          value={processName} 
          fieldName="name" 
        />
        <Field
          label="State"
          value={
            <span className={cn("px-2 py-0.5 rounded border text-xs", stateColors[state])}>
              {state.toUpperCase()}
            </span>
          }
          fieldName="state"
        />
        <Field 
          label="Program Counter" 
          value={programCounter} 
          fieldName="pc" 
        />
        
        {!compact && (
          <>
            <div
              className={cn(
                "py-1 px-2 rounded transition-colors",
                isHighlighted("registers") && "bg-primary/20 ring-1 ring-primary"
              )}
            >
              <span className="text-xs text-muted-foreground block mb-1">CPU Registers (saved)</span>
              <div className="flex flex-wrap gap-1">
                {registers.map((reg) => (
                  <span
                    key={reg}
                    className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>

            <Field 
              label="Memory Info" 
              value="Page Table Ptr" 
              fieldName="memory" 
            />
            <Field 
              label="Open Files" 
              value="3 handles" 
              fieldName="files" 
            />
            <Field 
              label="Priority" 
              value="Normal (20)" 
              fieldName="priority" 
            />
          </>
        )}
      </div>
    </div>
  )
}
