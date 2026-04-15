"use client"

import { cn } from "@/lib/utils"

function TerminalLine({ prompt, command, dim }: { prompt: string; command: string; dim?: boolean }) {
  return (
    <div className={cn("font-mono text-[11px] leading-relaxed", dim && "opacity-50")}>
      <span className="text-muted-foreground">{prompt}</span>
      <span className="ml-1">{command}</span>
    </div>
  )
}

export function MultipassDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("my-6", className)}>
      {/* Host machine */}
      <div className="border-2 border-green-500/30 rounded-xl bg-green-500/[0.03] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wide">
            Your Machine
          </span>
          <span className="text-[10px] text-muted-foreground">(macOS / Windows / Linux)</span>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {/* Host terminal */}
          <div className="flex-1 border border-border/60 rounded-lg bg-card p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
              <span className="text-[10px] text-muted-foreground ml-1.5 font-medium">Terminal</span>
            </div>
            <TerminalLine prompt="$" command="multipass launch --name ln23 lts" dim />
            <TerminalLine prompt="$" command="multipass shell ln23" />
            <div className="text-[10px] text-muted-foreground mt-2 italic">
              Your keystrokes and screen output are forwarded through a local socket to the VM.
            </div>
          </div>

          {/* Arrow */}
          <div className="flex md:flex-col items-center justify-center gap-1 py-1 md:py-0 md:px-1">
            <div className="hidden md:block text-[9px] text-muted-foreground/60 font-medium text-center leading-tight">
              stdin<br />stdout<br />stderr
            </div>
            <div className="md:hidden text-[9px] text-muted-foreground/60 font-medium">stdin / stdout / stderr</div>
            <svg className="w-6 h-6 md:w-5 md:h-8 text-muted-foreground/40 rotate-90 md:rotate-0" viewBox="0 0 20 32" fill="none">
              <path d="M10 2 L10 26 M4 20 L10 28 L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Hypervisor + VM */}
          <div className="flex-[1.3] border-2 border-blue-500/25 rounded-lg bg-blue-500/[0.03] p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500/60" />
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Hypervisor
              </span>
              <span className="text-[10px] text-muted-foreground">(Multipass / QEMU)</span>
            </div>

            <div className="text-[10px] text-muted-foreground mb-2">
              Allocates CPU, memory, and virtual hardware for the VM. Isolates it from the host.
            </div>

            {/* VM */}
            <div className="border-2 border-amber-500/25 rounded-lg bg-amber-500/[0.03] p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                  Ubuntu VM &quot;ln23&quot;
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Own kernel</span> — independent of your host
                </div>
                <div className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Own filesystem</span> — /dev, /proc, /sys
                </div>
                <div className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground/70">No GUI</span> — terminal access only
                </div>
                <div className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Fully isolated</span> — crashes stay here
                </div>
              </div>

              {/* VM terminal */}
              <div className="border border-border/40 rounded bg-card/80 p-2">
                <TerminalLine prompt="ubuntu@ln23:~/ln23-demo$" command="strace dd if=/dev/urandom ..." />
                <TerminalLine prompt="ubuntu@ln23:~/ln23-demo$" command="sudo grep urandom_fops /proc/kallsyms" />
                <div className="text-[10px] text-amber-700/60 dark:text-amber-400/40 mt-1.5 font-medium">
                  All lecture commands run here — inside the VM, not on your host.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
