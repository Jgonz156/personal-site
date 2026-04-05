"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

export type HighlightPath = "hdmi" | "usb-keyboard" | "sata" | "usb-flash" | null

export interface SystemInterconnectDiagramProps {
  width?: number
  height?: number
  highlightPath?: HighlightPath
  showLabels?: boolean
  interactive?: boolean
  className?: string
}

const CW = 900
const CH = 520

interface PathDef {
  id: HighlightPath
  color: string
  activeColor: string
  label: string
}

const paths: Record<string, PathDef> = {
  hdmi: { id: "hdmi", color: "stroke-border", activeColor: "stroke-rose-500 dark:stroke-rose-400", label: "HDMI" },
  "usb-keyboard": { id: "usb-keyboard", color: "stroke-border", activeColor: "stroke-sky-500 dark:stroke-sky-400", label: "USB" },
  sata: { id: "sata", color: "stroke-border", activeColor: "stroke-orange-500 dark:stroke-orange-400", label: "SATA" },
  "usb-flash": { id: "usb-flash", color: "stroke-border", activeColor: "stroke-emerald-500 dark:stroke-emerald-400", label: "USB" },
}

function ControllerBlock({
  x, y, w, h, label, highlighted, accentClass,
}: { x: number; y: number; w: number; h: number; label: string; highlighted: boolean; accentClass?: string }) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={4}
        className={cn(
          "stroke-2 transition-all duration-200",
          highlighted
            ? cn("fill-primary/15", accentClass || "stroke-primary")
            : "fill-muted/80 stroke-border"
        )}
      />
      <text
        x={x + w / 2} y={y + h / 2 + 4}
        textAnchor="middle"
        className={cn("font-semibold transition-colors", highlighted ? "fill-foreground" : "fill-muted-foreground")}
        fontSize={9}
      >
        {label}
      </text>
    </g>
  )
}

function DeviceBody({
  x, y, w, h, label, highlighted,
}: { x: number; y: number; w: number; h: number; label: string; highlighted: boolean }) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={6}
        className={cn(
          "stroke-2 transition-all duration-200",
          highlighted ? "fill-muted stroke-foreground/60" : "fill-muted/50 stroke-border"
        )}
      />
      <text
        x={x + w / 2} y={y + h / 2 + 4}
        textAnchor="middle"
        className={cn("font-medium transition-colors", highlighted ? "fill-foreground" : "fill-muted-foreground")}
        fontSize={10}
      >
        {label}
      </text>
    </g>
  )
}

function Wire({
  x1, y1, x2, y2, highlighted, accentClass, label, labelX, labelY,
}: {
  x1: number; y1: number; x2: number; y2: number
  highlighted: boolean; accentClass?: string
  label?: string; labelX?: number; labelY?: number
}) {
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={cn(
          "transition-all duration-200",
          highlighted
            ? cn("stroke-[3]", accentClass || "stroke-primary")
            : "stroke-border stroke-2"
        )}
      />
      {label && labelX !== undefined && labelY !== undefined && (
        <text
          x={labelX} y={labelY}
          textAnchor="middle"
          className={cn(
            "font-bold transition-colors",
            highlighted ? "fill-foreground" : "fill-muted-foreground/70"
          )}
          fontSize={9}
        >
          {label}
        </text>
      )}
    </g>
  )
}

export function SystemInterconnectDiagram({
  width,
  height,
  highlightPath: controlledHighlight,
  showLabels = true,
  interactive = true,
  className,
}: SystemInterconnectDiagramProps) {
  const [hoveredPath, setHoveredPath] = useState<HighlightPath>(null)
  const active = controlledHighlight ?? hoveredPath

  const isActive = (id: string) => active === id
  const accent = (id: string) => {
    const p = paths[id]
    return p ? p.activeColor : "stroke-primary"
  }

  const handleHover = (id: HighlightPath) => {
    if (interactive && controlledHighlight === undefined) setHoveredPath(id)
  }
  const clearHover = () => {
    if (interactive && controlledHighlight === undefined) setHoveredPath(null)
  }

  // --- Motherboard region ---
  const mbX = 280, mbY = 100, mbW = 340, mbH = 300

  // --- CPU/MMU on motherboard ---
  const cpuX = mbX + 40, cpuY = mbY + 20, cpuW = 100, cpuH = 70

  // --- RAM slots on motherboard ---
  const ramX = mbX + 180, ramY = mbY + 20, ramW = 120, ramH = 50

  // --- DMA chip ---
  const dmaX = mbX + 180, dmaY = mbY + 90, dmaW = 60, dmaH = 30

  // --- Controllers on motherboard ---
  const hdmiCtrlX = mbX + 20, hdmiCtrlY = mbY + 130, ctrlW = 70, ctrlH = 36
  const usbCtrlX = mbX + 110, usbCtrlY = mbY + 200, usbCtrlW = 120, usbCtrlH = 36
  const sataCtrlX = mbX + 250, sataCtrlY = mbY + 130, sataCtrlW = 70, sataCtrlH = 36

  // --- Main bus ---
  const busY = mbY + 105

  // --- External devices ---
  // Monitor (top-left)
  const monBodyX = 20, monBodyY = 30, monBodyW = 140, monBodyH = 100
  const monCtrlX = 170, monCtrlY = 65, monCtrlW = 60, monCtrlH = 30

  // Keyboard (bottom)
  const kbBodyX = 180, kbBodyY = CH - 80, kbBodyW = 180, kbBodyH = 55
  const kbCtrlX = 370, kbCtrlY = CH - 66, kbCtrlW = 50, kbCtrlH = 26

  // HDD (right)
  const hddBodyX = CW - 150, hddBodyY = 120, hddBodyW = 110, hddBodyH = 90
  const hddCtrlX = CW - 180, hddCtrlY = 150, hddCtrlW = 28, hddCtrlH = 40

  // Flash drive (bottom-right)
  const flashBodyX = CW - 120, flashBodyY = CH - 80, flashBodyW = 80, flashBodyH = 40
  const flashCtrlX = CW - 150, flashCtrlY = CH - 72, flashCtrlW = 28, flashCtrlH = 26

  return (
    <div className={cn("w-full my-6 flex justify-center", className)}>
      <svg
        width={width || "100%"}
        height={height}
        viewBox={`0 0 ${CW} ${CH}`}
        className="max-w-4xl border rounded-lg bg-card"
      >
        {/* ===== MOTHERBOARD PCB ===== */}
        <rect x={mbX} y={mbY} width={mbW} height={mbH} rx={8}
          className="fill-yellow-500/8 dark:fill-yellow-500/5 stroke-yellow-600/40 dark:stroke-yellow-500/25 stroke-2" />
        {showLabels && (
          <text x={mbX + mbW / 2} y={mbY + mbH - 8} textAnchor="middle" className="fill-yellow-700/60 dark:fill-yellow-400/40 font-semibold" fontSize={11}>
            MOTHERBOARD
          </text>
        )}

        {/* Main Bus */}
        <rect x={mbX + 15} y={busY - 3} width={mbW - 30} height={6} rx={2}
          className="fill-yellow-400/60 dark:fill-yellow-500/40" />
        {showLabels && (
          <text x={mbX + mbW / 2} y={busY - 8} textAnchor="middle" className="fill-yellow-700/70 dark:fill-yellow-400/50 font-semibold" fontSize={8}>
            SYSTEM BUS
          </text>
        )}

        {/* CPU/MMU */}
        <rect x={cpuX} y={cpuY} width={cpuW} height={cpuH} rx={5}
          className="fill-purple-500/15 dark:fill-purple-500/20 stroke-purple-500/50 stroke-2" />
        <text x={cpuX + cpuW / 2} y={cpuY + 28} textAnchor="middle" className="fill-purple-700 dark:fill-purple-300 font-bold" fontSize={12}>CPU</text>
        <text x={cpuX + cpuW / 2} y={cpuY + 44} textAnchor="middle" className="fill-purple-600/70 dark:fill-purple-400/70 font-medium" fontSize={9}>MMU + Registers</text>
        {/* Bus connection */}
        <line x1={cpuX + cpuW / 2} y1={cpuY + cpuH} x2={cpuX + cpuW / 2} y2={busY}
          className="stroke-yellow-500/60 stroke-2" />

        {/* RAM */}
        <rect x={ramX} y={ramY} width={ramW} height={ramH} rx={4}
          className="fill-cyan-500/15 dark:fill-cyan-500/20 stroke-cyan-500/50 stroke-[1.5]" />
        <text x={ramX + ramW / 2} y={ramY + 30} textAnchor="middle" className="fill-cyan-700 dark:fill-cyan-300 font-bold" fontSize={11}>RAM</text>
        <line x1={ramX + ramW / 2} y1={ramY + ramH} x2={ramX + ramW / 2} y2={busY}
          className="stroke-yellow-500/60 stroke-2" />

        {/* DMA */}
        <rect x={dmaX} y={dmaY} width={dmaW} height={dmaH} rx={3}
          className="fill-amber-500/15 dark:fill-amber-500/20 stroke-amber-500/50 stroke-[1.5]" />
        <text x={dmaX + dmaW / 2} y={dmaY + 19} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 font-semibold" fontSize={9}>DMA</text>

        {/* ===== HDMI PATH ===== */}
        <g
          onMouseEnter={() => handleHover("hdmi")}
          onMouseLeave={clearHover}
          className="cursor-pointer"
        >
          {/* HDMI controller on MB */}
          <ControllerBlock x={hdmiCtrlX} y={hdmiCtrlY} w={ctrlW} h={ctrlH} label="HDMI Ctrl" highlighted={isActive("hdmi")} accentClass={accent("hdmi")} />
          <line x1={hdmiCtrlX + ctrlW / 2} y1={hdmiCtrlY} x2={hdmiCtrlX + ctrlW / 2} y2={busY + 3} className="stroke-yellow-500/60 stroke-[1.5]" />

          {/* Wire MB → Monitor controller */}
          <Wire x1={hdmiCtrlX} y1={hdmiCtrlY + ctrlH / 2} x2={monCtrlX + monCtrlW} y2={monCtrlY + monCtrlH / 2}
            highlighted={isActive("hdmi")} accentClass={accent("hdmi")}
            label="HDMI" labelX={210} labelY={hdmiCtrlY - 10} />

          {/* Monitor controller (electronic) */}
          <ControllerBlock x={monCtrlX} y={monCtrlY} w={monCtrlW} h={monCtrlH} label="HDMI Rx" highlighted={isActive("hdmi")} accentClass={accent("hdmi")} />

          {/* Wire controller → device body */}
          <line x1={monCtrlX} y1={monCtrlY + monCtrlH / 2} x2={monBodyX + monBodyW} y2={monBodyY + monBodyH / 2}
            className={cn("stroke-2 transition-all", isActive("hdmi") ? accent("hdmi") : "stroke-border")} />

          {/* Monitor body (mechanical) */}
          <DeviceBody x={monBodyX} y={monBodyY} w={monBodyW} h={monBodyH} label="Display Panel" highlighted={isActive("hdmi")} />
          {/* Screen detail */}
          <rect x={monBodyX + 10} y={monBodyY + 10} width={monBodyW - 20} height={monBodyH - 30} rx={3}
            className={cn("stroke-[1.5] transition-colors", isActive("hdmi") ? "fill-rose-500/10 stroke-rose-500/40" : "fill-background stroke-border/50")} />
        </g>

        {/* ===== USB KEYBOARD PATH ===== */}
        <g
          onMouseEnter={() => handleHover("usb-keyboard")}
          onMouseLeave={clearHover}
          className="cursor-pointer"
        >
          {/* USB controller on MB */}
          <ControllerBlock x={usbCtrlX} y={usbCtrlY} w={usbCtrlW} h={usbCtrlH} label="USB Controller" highlighted={isActive("usb-keyboard") || isActive("usb-flash")} accentClass="stroke-sky-500 dark:stroke-sky-400" />
          <line x1={usbCtrlX + usbCtrlW / 2} y1={usbCtrlY} x2={usbCtrlX + usbCtrlW / 2} y2={busY + 3} className="stroke-yellow-500/60 stroke-[1.5]" />

          {/* Wire MB → Keyboard controller */}
          <Wire x1={usbCtrlX + 30} y1={usbCtrlY + usbCtrlH} x2={kbCtrlX + kbCtrlW / 2} y2={kbCtrlY}
            highlighted={isActive("usb-keyboard")} accentClass={accent("usb-keyboard")}
            label="USB" labelX={usbCtrlX - 10} labelY={usbCtrlY + usbCtrlH + 40} />

          {/* Keyboard controller (electronic) */}
          <ControllerBlock x={kbCtrlX} y={kbCtrlY} w={kbCtrlW} h={kbCtrlH} label="USB Ctrl" highlighted={isActive("usb-keyboard")} accentClass={accent("usb-keyboard")} />

          {/* Wire controller → device body */}
          <line x1={kbCtrlX} y1={kbCtrlY + kbCtrlH / 2} x2={kbBodyX + kbBodyW} y2={kbBodyY + kbBodyH / 2}
            className={cn("stroke-2 transition-all", isActive("usb-keyboard") ? accent("usb-keyboard") : "stroke-border")} />

          {/* Keyboard body (mechanical) */}
          <DeviceBody x={kbBodyX} y={kbBodyY} w={kbBodyW} h={kbBodyH} label="Key Matrix" highlighted={isActive("usb-keyboard")} />
          {/* Key details */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={kbBodyX + 15 + i * 20} y={kbBodyY + 10} width={15} height={12} rx={2}
              className={cn("stroke-1 transition-colors", isActive("usb-keyboard") ? "fill-sky-500/10 stroke-sky-500/40" : "fill-background stroke-border/50")} />
          ))}
        </g>

        {/* ===== SATA / HDD PATH ===== */}
        <g
          onMouseEnter={() => handleHover("sata")}
          onMouseLeave={clearHover}
          className="cursor-pointer"
        >
          {/* SATA controller on MB */}
          <ControllerBlock x={sataCtrlX} y={sataCtrlY} w={sataCtrlW} h={sataCtrlH} label="SATA Ctrl" highlighted={isActive("sata")} accentClass={accent("sata")} />
          <line x1={sataCtrlX + sataCtrlW / 2} y1={sataCtrlY} x2={sataCtrlX + sataCtrlW / 2} y2={busY + 3} className="stroke-yellow-500/60 stroke-[1.5]" />

          {/* Wire MB → HDD controller */}
          <Wire x1={sataCtrlX + sataCtrlW} y1={sataCtrlY + sataCtrlH / 2} x2={hddCtrlX} y2={hddCtrlY + hddCtrlH / 2}
            highlighted={isActive("sata")} accentClass={accent("sata")}
            label="SATA" labelX={(sataCtrlX + sataCtrlW + hddCtrlX) / 2} labelY={sataCtrlY + sataCtrlH / 2 - 10} />

          {/* HDD controller (electronic) */}
          <ControllerBlock x={hddCtrlX} y={hddCtrlY} w={hddCtrlW} h={hddCtrlH} label="SATA" highlighted={isActive("sata")} accentClass={accent("sata")} />

          {/* Wire controller → device body */}
          <line x1={hddCtrlX + hddCtrlW} y1={hddCtrlY + hddCtrlH / 2} x2={hddBodyX} y2={hddBodyY + hddBodyH / 2}
            className={cn("stroke-2 transition-all", isActive("sata") ? accent("sata") : "stroke-border")} />

          {/* HDD body (mechanical) */}
          <DeviceBody x={hddBodyX} y={hddBodyY} w={hddBodyW} h={hddBodyH} label="Platter + Arm" highlighted={isActive("sata")} />
          {/* Platter circle */}
          <circle cx={hddBodyX + hddBodyW / 2} cy={hddBodyY + 38} r={25}
            className={cn("fill-none stroke-2 transition-colors", isActive("sata") ? "stroke-orange-500/50" : "stroke-border/40")} />
          <circle cx={hddBodyX + hddBodyW / 2} cy={hddBodyY + 38} r={6}
            className={cn("transition-colors", isActive("sata") ? "fill-orange-500/30 stroke-orange-500/50" : "fill-muted stroke-border/40")} />
        </g>

        {/* ===== USB FLASH DRIVE PATH ===== */}
        <g
          onMouseEnter={() => handleHover("usb-flash")}
          onMouseLeave={clearHover}
          className="cursor-pointer"
        >
          {/* Wire MB USB controller → Flash controller */}
          <Wire x1={usbCtrlX + usbCtrlW - 10} y1={usbCtrlY + usbCtrlH} x2={flashCtrlX + flashCtrlW / 2} y2={flashCtrlY}
            highlighted={isActive("usb-flash")} accentClass={accent("usb-flash")}
            label="USB" labelX={flashCtrlX + flashCtrlW + 30} labelY={usbCtrlY + usbCtrlH + 40} />

          {/* Flash controller (electronic) */}
          <ControllerBlock x={flashCtrlX} y={flashCtrlY} w={flashCtrlW} h={flashCtrlH} label="USB" highlighted={isActive("usb-flash")} accentClass={accent("usb-flash")} />

          {/* Wire controller → device body */}
          <line x1={flashCtrlX + flashCtrlW} y1={flashCtrlY + flashCtrlH / 2} x2={flashBodyX} y2={flashBodyY + flashBodyH / 2}
            className={cn("stroke-2 transition-all", isActive("usb-flash") ? accent("usb-flash") : "stroke-border")} />

          {/* Flash body (mechanical) */}
          <DeviceBody x={flashBodyX} y={flashBodyY} w={flashBodyW} h={flashBodyH} label="Flash Memory" highlighted={isActive("usb-flash")} />
        </g>

        {/* ===== LEGEND ===== */}
        {showLabels && (
          <g>
            <rect x={10} y={CH - 30} width={CW - 20} height={24} rx={4} className="fill-muted/50" />
            <text x={20} y={CH - 14} className="fill-muted-foreground font-semibold" fontSize={9}>
              Hover a device to trace its data path. Each device shows: Controller (host interface) → Functional Hardware
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
