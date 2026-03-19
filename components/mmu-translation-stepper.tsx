"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Scenario = "normal" | "pagefault"

interface StepState {
  label: string
  cpuText: string
  mmuText: string
  ramText: string
  hddText: string
  busHighlight: ("cpu-mmu" | "mmu-ram" | "mmu-hdd" | "ram-hdd")[]
  dataDirection: "right" | "left" | "none"
  activeBlock: ("cpu" | "mmu" | "ram" | "hdd")[]
}

const NORMAL_STEPS: StepState[] = [
  {
    label: "CPU needs data at logical address 13",
    cpuText: "Running code...\nNeed data at\nline 13",
    mmuText: "Idle",
    ramText: "...\n[1447]: \"cat\"\n...",
    hddText: "Storage",
    busHighlight: [],
    dataDirection: "none",
    activeBlock: ["cpu"],
  },
  {
    label: "CPU sends request to MMU: \"What's at line 13?\"",
    cpuText: "Requesting\naddr 13",
    mmuText: "Received\nlogical: 13",
    ramText: "...\n[1447]: \"cat\"\n...",
    hddText: "Storage",
    busHighlight: ["cpu-mmu"],
    dataDirection: "right",
    activeBlock: ["cpu", "mmu"],
  },
  {
    label: "MMU translates: logical 13 → physical 1447",
    cpuText: "Waiting...",
    mmuText: "Page table:\n13 → 1447\nFrame found!",
    ramText: "...\n[1447]: \"cat\"\n...",
    hddText: "Storage",
    busHighlight: [],
    dataDirection: "none",
    activeBlock: ["mmu"],
  },
  {
    label: "MMU fetches data from RAM at physical address 1447",
    cpuText: "Waiting...",
    mmuText: "Fetching\naddr 1447",
    ramText: "Reading\n[1447]...\n→ \"cat\"",
    hddText: "Storage",
    busHighlight: ["mmu-ram"],
    dataDirection: "right",
    activeBlock: ["mmu", "ram"],
  },
  {
    label: "MMU returns to CPU: \"Line 13 contains 'cat'\"",
    cpuText: "Received!\nline 13 = \"cat\"",
    mmuText: "Done!\nReturning\n\"cat\"",
    ramText: "...\n[1447]: \"cat\"\n...",
    hddText: "Storage",
    busHighlight: ["cpu-mmu"],
    dataDirection: "left",
    activeBlock: ["cpu", "mmu"],
  },
]

const PAGEFAULT_STEPS: StepState[] = [
  {
    label: "CPU needs data at logical address 13",
    cpuText: "Running code...\nNeed data at\nline 13",
    mmuText: "Idle",
    ramText: "[frames full]",
    hddText: "Storage\n[page has\naddr 13 data]",
    busHighlight: [],
    dataDirection: "none",
    activeBlock: ["cpu"],
  },
  {
    label: "CPU sends request to MMU",
    cpuText: "Requesting\naddr 13",
    mmuText: "Received\nlogical: 13",
    ramText: "[frames full]",
    hddText: "Storage\n[page has\naddr 13 data]",
    busHighlight: ["cpu-mmu"],
    dataDirection: "right",
    activeBlock: ["cpu", "mmu"],
  },
  {
    label: "MMU page table lookup — page NOT in RAM! Page Fault!",
    cpuText: "Waiting...",
    mmuText: "PAGE FAULT!\nPage for 13\nnot loaded!",
    ramText: "[frames full]",
    hddText: "Storage\n[page has\naddr 13 data]",
    busHighlight: [],
    dataDirection: "none",
    activeBlock: ["mmu"],
  },
  {
    label: "MMU selects victim page in RAM to evict",
    cpuText: "Waiting...",
    mmuText: "Selecting\nvictim page\nin frame 3",
    ramText: "Frame 3\nselected for\neviction",
    hddText: "Storage",
    busHighlight: ["mmu-ram"],
    dataDirection: "right",
    activeBlock: ["mmu", "ram"],
  },
  {
    label: "Victim page swapped out: RAM → HDD",
    cpuText: "Waiting...",
    mmuText: "Swapping\nout...",
    ramText: "Writing\nframe 3\nto HDD",
    hddText: "Receiving\nvictim page",
    busHighlight: ["ram-hdd"],
    dataDirection: "right",
    activeBlock: ["ram", "hdd"],
  },
  {
    label: "Needed page swapped in: HDD → RAM",
    cpuText: "Waiting...",
    mmuText: "Swapping\nin...",
    ramText: "Loading\nneeded page\ninto frame 3",
    hddText: "Sending\nneeded page",
    busHighlight: ["ram-hdd"],
    dataDirection: "left",
    activeBlock: ["ram", "hdd"],
  },
  {
    label: "MMU retries: logical 13 → physical 1447 (now in RAM)",
    cpuText: "Waiting...",
    mmuText: "Retry!\n13 → 1447\nFrame ready",
    ramText: "...\n[1447]: \"cat\"\n...",
    hddText: "Storage",
    busHighlight: ["mmu-ram"],
    dataDirection: "right",
    activeBlock: ["mmu", "ram"],
  },
  {
    label: "MMU returns data to CPU: \"Line 13 contains 'cat'\"",
    cpuText: "Received!\nline 13 = \"cat\"",
    mmuText: "Done!\nReturning\n\"cat\"",
    ramText: "...\n[1447]: \"cat\"\n...",
    hddText: "Storage",
    busHighlight: ["cpu-mmu"],
    dataDirection: "left",
    activeBlock: ["cpu", "mmu"],
  },
]

function HardwareBlock({
  id,
  label,
  text,
  active,
  colorClass,
}: {
  id: string
  label: string
  text: string
  active: boolean
  colorClass: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 p-3 text-center transition-all min-w-[90px]",
        active ? cn(colorClass, "shadow-md") : "border-muted bg-muted/10 opacity-60"
      )}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider mb-1">{label}</div>
      <pre className="text-[9px] font-mono whitespace-pre leading-tight text-muted-foreground">
        {text}
      </pre>
    </div>
  )
}

function Bus({ active, direction }: { active: boolean; direction: "right" | "left" | "none" }) {
  return (
    <div className={cn(
      "flex items-center justify-center h-6 transition-colors",
      active ? "text-amber-500" : "text-muted-foreground/20"
    )}>
      <div className={cn(
        "flex-1 border-t-2 border-dashed mx-1",
        active ? "border-amber-500" : "border-muted-foreground/20"
      )} />
      {active && direction !== "none" && (
        <span className="text-[10px] font-bold">
          {direction === "right" ? "→" : "←"}
        </span>
      )}
    </div>
  )
}

export function MMUTranslationStepper({ className }: { className?: string }) {
  const [scenario, setScenario] = useState<Scenario>("normal")
  const [step, setStep] = useState(0)

  const steps = scenario === "normal" ? NORMAL_STEPS : PAGEFAULT_STEPS
  const current = steps[step]

  function switchScenario(s: Scenario) {
    setScenario(s)
    setStep(0)
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">MMU in Action — Address Translation</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Watch how the MMU translates logical addresses for the CPU, and what happens when a page fault occurs.
      </p>

      {/* Scenario toggle */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={scenario === "normal" ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", scenario === "normal" && "bg-green-600 hover:bg-green-700")}
          onClick={() => switchScenario("normal")}
        >
          Normal Translation
        </Button>
        <Button
          variant={scenario === "pagefault" ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", scenario === "pagefault" && "bg-red-600 hover:bg-red-700")}
          onClick={() => switchScenario("pagefault")}
        >
          Page Fault Path
        </Button>
      </div>

      {/* Step label */}
      <div className={cn(
        "mb-4 p-2 rounded text-xs font-semibold text-center",
        scenario === "pagefault" && current.mmuText.includes("PAGE FAULT")
          ? "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-400/30"
          : "bg-muted/30"
      )}>
        Step {step + 1}/{steps.length}: {current.label}
      </div>

      {/* Motherboard diagram */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {/* CPU */}
        <HardwareBlock
          id="cpu"
          label="CPU"
          text={current.cpuText}
          active={current.activeBlock.includes("cpu")}
          colorClass="border-blue-400 bg-blue-500/10"
        />

        {/* CPU ↔ MMU bus */}
        <div className="w-12">
          <Bus
            active={current.busHighlight.includes("cpu-mmu")}
            direction={current.busHighlight.includes("cpu-mmu") ? current.dataDirection : "none"}
          />
        </div>

        {/* MMU */}
        <HardwareBlock
          id="mmu"
          label="MMU"
          text={current.mmuText}
          active={current.activeBlock.includes("mmu")}
          colorClass="border-amber-400 bg-amber-500/10"
        />

        {/* MMU ↔ RAM bus */}
        <div className="w-12">
          <Bus
            active={current.busHighlight.includes("mmu-ram")}
            direction={current.busHighlight.includes("mmu-ram") ? current.dataDirection : "none"}
          />
        </div>

        {/* RAM + HDD stacked */}
        <div className="flex flex-col gap-2">
          <HardwareBlock
            id="ram"
            label="RAM"
            text={current.ramText}
            active={current.activeBlock.includes("ram")}
            colorClass="border-green-400 bg-green-500/10"
          />
          <div className="flex items-center justify-center">
            <div className={cn(
              "h-5 border-l-2 border-dashed",
              current.busHighlight.includes("ram-hdd") ? "border-amber-500" : "border-muted-foreground/20"
            )} />
            {current.busHighlight.includes("ram-hdd") && (
              <span className="text-[10px] font-bold text-amber-500 ml-1">
                {current.dataDirection === "right" ? "↓" : "↑"}
              </span>
            )}
          </div>
          <HardwareBlock
            id="hdd"
            label="HDD"
            text={current.hddText}
            active={current.activeBlock.includes("hdd")}
            colorClass="border-gray-400 bg-gray-500/10"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step <= 0} onClick={() => setStep(step - 1)}>
          ← Prev
        </Button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i === step
                  ? (scenario === "normal" ? "bg-green-500" : "bg-red-500")
                  : i < step ? "bg-primary/40" : "bg-muted"
              )}
              onClick={() => setStep(i)}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step >= steps.length - 1} onClick={() => setStep(step + 1)}>
          Next →
        </Button>
      </div>
    </div>
  )
}
