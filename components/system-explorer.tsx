"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MotherboardDiagram } from "@/components/hardware"
import { KernelUserRingDiagram } from "@/components/kernel-user-ring-diagram"
import { 
  HistoricalTimeline, 
  hardwareEvolutionTimeline, 
  processEvolutionTimeline,
  memoryEvolutionTimeline,
  threadEvolutionTimeline 
} from "@/components/historical-timeline"
import { PCBPanel } from "@/components/pcb-panel"
import { TCBPanel } from "@/components/tcb-panel"
import { MemoryLayoutDiagram } from "@/components/memory-layout-diagram"
import { ContextSwitchVisual } from "@/components/context-switch-visual"

export interface SystemExplorerProps {
  initialLayer?: number
  className?: string
}

const layerInfo = [
  {
    title: "Layer 0: Physical Hardware",
    subtitle: "The Foundation",
    description: "This is the actual hardware — there's only one of each component. The OS kernel has privileged access; user programs must ask permission via system calls.",
    color: "purple",
  },
  {
    title: "Layer 1: Virtualized Processes",
    subtitle: "The Illusion of Isolation",
    description: "Each process has a virtualized view of the hardware. The PCB stores everything the OS needs to pause and resume a process.",
    color: "blue",
  },
  {
    title: "Layer 2: Process Memory",
    subtitle: "Virtual Memory",
    description: "Virtual memory lets each process think it has its own private address space. Page tables translate virtual addresses to physical ones.",
    color: "green",
  },
  {
    title: "Layer 3: Threads",
    subtitle: "Lightweight Concurrency",
    description: "Threads are lightweight — they share most resources but have their own execution context. This makes them fast to create and switch between.",
    color: "orange",
  },
]

const processColors = [
  { name: "Process A", bg: "bg-blue-500/20", border: "border-blue-500", text: "text-blue-600 dark:text-blue-400" },
  { name: "Process B", bg: "bg-green-500/20", border: "border-green-500", text: "text-green-600 dark:text-green-400" },
  { name: "Process C", bg: "bg-orange-500/20", border: "border-orange-500", text: "text-orange-600 dark:text-orange-400" },
]

export function SystemExplorer({
  initialLayer = 0,
  className,
}: SystemExplorerProps) {
  const [layer, setLayer] = useState(initialLayer)
  const [selectedProcess, setSelectedProcess] = useState(0)
  const [showContextSwitch, setShowContextSwitch] = useState(false)

  const canZoomIn = layer < 3
  const canZoomOut = layer > 0

  const currentInfo = layerInfo[layer]

  return (
    <div className={cn("border rounded-xl bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{currentInfo.title}</h3>
            <p className="text-sm text-muted-foreground">{currentInfo.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLayer((l) => l - 1)}
              disabled={!canZoomOut}
            >
              ◀ Zoom Out
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLayer((l) => l + 1)}
              disabled={!canZoomIn}
            >
              Zoom In ▶
            </Button>
          </div>
        </div>
        
        {/* Layer indicator */}
        <div className="flex gap-2 mt-3">
          {[0, 1, 2, 3].map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={cn(
                "flex-1 h-2 rounded-full transition-all",
                l === layer ? "bg-primary" : "bg-muted hover:bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="p-4 min-h-[500px]">
        {/* Layer 0: Physical Hardware */}
        {layer === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Motherboard */}
              <div className="flex flex-col items-center">
                <MotherboardDiagram 
                  width={500} 
                  height={400}
                  showLabels 
                  interactive
                  onComponentClick={(c) => console.log("Clicked:", c)}
                />
              </div>
              
              {/* Kernel/User Ring Diagram */}
              <div className="flex flex-col items-center">
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Privilege Levels</h4>
                <KernelUserRingDiagram size="lg" showSystemCall />
                <p className="text-xs text-muted-foreground mt-2 text-center max-w-xs">
                  User programs (Ring 3) must use system calls to access kernel services (Ring 0)
                </p>
              </div>
            </div>
            
            {/* Historical Timeline */}
            <div className="pt-4 border-t">
              <HistoricalTimeline 
                events={hardwareEvolutionTimeline}
                title="Hardware Evolution"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Hardware got faster, but the fundamental components remained the same
              </p>
            </div>
          </div>
        )}

        {/* Layer 1: Virtualized Processes */}
        {layer === 1 && (
          <div className="space-y-6">
            {/* 3 Mini Motherboards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {processColors.map((proc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedProcess(i)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all",
                    proc.bg,
                    proc.border,
                    selectedProcess === i && "ring-2 ring-offset-2 ring-primary"
                  )}
                >
                  <h4 className={cn("font-semibold text-sm mb-2", proc.text)}>{proc.name}</h4>
                  <MotherboardDiagram width={160} height={130} showLabels={false} />
                  <p className="text-xs text-muted-foreground mt-2">
                    &quot;I have my own hardware!&quot;
                  </p>
                </button>
              ))}
            </div>

            {/* PCB Panel for selected process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PCBPanel
                processId={1000 + selectedProcess}
                processName={processColors[selectedProcess].name}
                state={selectedProcess === 0 ? "running" : "ready"}
              />
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowContextSwitch(!showContextSwitch)}
                >
                  {showContextSwitch ? "Hide" : "Show"} Context Switch Animation
                </Button>
                
                {showContextSwitch && (
                  <ContextSwitchVisual 
                    processAName={processColors[0].name}
                    processBName={processColors[1].name}
                    showCycleCount
                  />
                )}
              </div>
            </div>

            {/* Historical Timeline */}
            <div className="pt-4 border-t">
              <HistoricalTimeline 
                events={processEvolutionTimeline}
                title="Process Management Evolution"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Each step added more illusion of &quot;owning&quot; the machine
              </p>
            </div>
          </div>
        )}

        {/* Layer 2: Process Memory Layout */}
        {layer === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Memory Layout */}
              <div className="flex flex-col items-center">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                  {processColors[selectedProcess].name}&apos;s Virtual Memory
                </h4>
                <MemoryLayoutDiagram 
                  width={200}
                  height={350}
                  showAddresses
                  showLabels
                />
              </div>

              {/* Virtual Memory Translation */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground">Virtual → Physical Translation</h4>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded border bg-blue-500/10">
                    <div className="font-mono text-sm">0x1000</div>
                    <div className="text-muted-foreground">Virtual</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="p-3 rounded border bg-green-500/10">
                    <div className="font-mono text-sm">0x5A00</div>
                    <div className="text-muted-foreground">Physical</div>
                  </div>
                </div>

                <div className="p-3 rounded border bg-muted/30">
                  <h5 className="font-semibold text-sm mb-2">Page Table</h5>
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span>Page 0</span>
                      <span>→ Frame 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page 1</span>
                      <span>→ Frame 12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page 2</span>
                      <span>→ Frame 3</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>...</span>
                      <span>...</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded border bg-yellow-500/10">
                  <p className="text-xs">
                    <strong>Key insight:</strong> Two processes can have the same virtual address 
                    (e.g., 0x1000) pointing to different physical memory!
                  </p>
                </div>
              </div>
            </div>

            {/* Historical Timeline */}
            <div className="pt-4 border-t">
              <HistoricalTimeline 
                events={memoryEvolutionTimeline}
                title="Memory Management Evolution"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Each step gave processes more protection and the illusion of unlimited memory
              </p>
            </div>
          </div>
        )}

        {/* Layer 3: Threads */}
        {layer === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thread visualization */}
              <div>
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                  Threads in {processColors[selectedProcess].name}
                </h4>
                
                <div className="space-y-3">
                  {/* Shared resources */}
                  <div className="p-3 rounded-lg border bg-muted/30">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2">Shared (Process-level)</h5>
                    <div className="flex flex-wrap gap-2">
                      {["Code", "Data", "Heap", "Files", "PID"].map((item) => (
                        <span key={item} className="text-xs px-2 py-1 rounded bg-muted">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Individual threads */}
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((tid) => (
                      <div 
                        key={tid}
                        className="p-3 rounded-lg border-2 border-orange-500/50 bg-orange-500/10"
                      >
                        <h5 className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                          Thread {tid}
                        </h5>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">TID:</span>
                            <span className="font-mono">{1000 + tid}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stack:</span>
                            <span className="font-mono">Own</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Registers:</span>
                            <span className="font-mono">Own</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TCB Panel */}
              <div className="space-y-4">
                <TCBPanel
                  threadId={1001}
                  parentPid={1000 + selectedProcess}
                />

                {/* Process vs Thread switch comparison */}
                <div className="p-3 rounded border bg-muted/30">
                  <h5 className="font-semibold text-sm mb-3">Context Switch Comparison</h5>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">Process Switch</div>
                      <ul className="mt-1 space-y-0.5 text-muted-foreground">
                        <li>• Save/restore PCB</li>
                        <li>• Flush page tables</li>
                        <li>• TLB invalidation</li>
                        <li className="font-semibold text-foreground">~10,000 cycles</li>
                      </ul>
                    </div>
                    <div className="p-2 rounded bg-green-500/10 border border-green-500/30">
                      <div className="font-semibold text-green-600 dark:text-green-400">Thread Switch</div>
                      <ul className="mt-1 space-y-0.5 text-muted-foreground">
                        <li>• Save/restore TCB</li>
                        <li>• Same address space!</li>
                        <li>• No TLB flush</li>
                        <li className="font-semibold text-foreground">~1,000 cycles</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Thread switches are ~10x faster!
                  </p>
                </div>
              </div>
            </div>

            {/* Historical Timeline */}
            <div className="pt-4 border-t">
              <HistoricalTimeline 
                events={threadEvolutionTimeline}
                title="Thread Evolution"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Threads emerged to make concurrency cheaper than spawning processes
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer description */}
      <div className="p-4 border-t bg-muted/20">
        <p className="text-sm text-muted-foreground text-center">
          {currentInfo.description}
        </p>
      </div>
    </div>
  )
}
