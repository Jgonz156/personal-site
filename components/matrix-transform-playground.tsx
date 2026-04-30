"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Mat3 = [number, number, number, number, number, number, number, number, number]

function identity(): Mat3 {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1]
}

function multiply(a: Mat3, b: Mat3): Mat3 {
  const r: number[] = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let s = 0
      for (let k = 0; k < 3; k++) s += a[i * 3 + k] * b[k * 3 + j]
      r.push(s)
    }
  }
  return r as Mat3
}

function rotation(angleDeg: number): Mat3 {
  const r = (angleDeg * Math.PI) / 180
  const c = Math.cos(r)
  const s = Math.sin(r)
  return [c, -s, 0, s, c, 0, 0, 0, 1]
}

function scale(sx: number, sy: number): Mat3 {
  return [sx, 0, 0, 0, sy, 0, 0, 0, 1]
}

function translate(tx: number, ty: number): Mat3 {
  return [1, 0, tx, 0, 1, ty, 0, 0, 1]
}

function shear(kx: number): Mat3 {
  return [1, kx, 0, 0, 1, 0, 0, 0, 1]
}

function applyToPoint(m: Mat3, p: [number, number]): [number, number] {
  const x = m[0] * p[0] + m[1] * p[1] + m[2]
  const y = m[3] * p[0] + m[4] * p[1] + m[5]
  return [x, y]
}

const TRIANGLE: [number, number][] = [
  [0, -1],
  [0.866, 0.5],
  [-0.866, 0.5],
]

const W = 360
const H = 280
const ORIGIN_X = W / 2
const ORIGIN_Y = H / 2
const UNIT = 50

function toScreen(p: [number, number]): [number, number] {
  return [ORIGIN_X + p[0] * UNIT, ORIGIN_Y + p[1] * UNIT]
}

export function MatrixTransformPlayground() {
  const [angle, setAngle] = useState(0)
  const [sx, setSx] = useState(1)
  const [sy, setSy] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [kx, setKx] = useState(0)

  // Composition order: T · R · K · S — i.e. scale first, then shear, then rotate, then translate.
  const M = multiply(
    translate(tx, ty),
    multiply(rotation(angle), multiply(shear(kx), scale(sx, sy))),
  )

  const transformed = TRIANGLE.map((p) => applyToPoint(M, p))

  const triangleSvg = (pts: [number, number][], fill: string, stroke: string) => {
    const sp = pts.map(toScreen)
    return (
      <polygon
        points={sp.map((p) => `${p[0]},${p[1]}`).join(" ")}
        fill={fill}
        fillOpacity={0.35}
        stroke={stroke}
        strokeWidth={1.75}
      />
    )
  }

  const reset = () => {
    setAngle(0)
    setSx(1)
    setSy(1)
    setTx(0)
    setTy(0)
    setKx(0)
  }

  const cellFmt = (v: number) => v.toFixed(2)

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          2D Matrix Transforms — the heart of every render pipeline
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs"
          onClick={reset}
        >
          Reset
        </Button>
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-0">
        <div className="p-4 border-b md:border-b-0 md:border-r">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-muted/20 rounded border">
            {/* grid */}
            {Array.from({ length: 9 }).map((_, i) => {
              const x = (i / 8) * W
              return (
                <line
                  key={`vx-${i}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={H}
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                />
              )
            })}
            {Array.from({ length: 7 }).map((_, i) => {
              const y = (i / 6) * H
              return (
                <line
                  key={`hy-${i}`}
                  x1={0}
                  y1={y}
                  x2={W}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                />
              )
            })}
            {/* axes */}
            <line x1={0} y1={ORIGIN_Y} x2={W} y2={ORIGIN_Y} stroke="#9ca3af" strokeWidth={1} />
            <line x1={ORIGIN_X} y1={0} x2={ORIGIN_X} y2={H} stroke="#9ca3af" strokeWidth={1} />

            {/* original */}
            {triangleSvg(TRIANGLE, "#9ca3af", "#6b7280")}
            {/* transformed */}
            {triangleSvg(transformed, "#16a34a", "#15803d")}
          </svg>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Gray = original triangle · Green = after transform
          </p>
        </div>

        <div className="p-4 space-y-3 min-w-[260px]">
          <div>
            <p className="text-xs font-semibold mb-2">Composed matrix M</p>
            <div className="font-mono text-xs bg-muted/40 border rounded p-2 grid grid-cols-3 gap-x-2 gap-y-1 text-center">
              {(M as number[]).map((v, i) => (
                <span
                  key={i}
                  className={
                    Math.abs(v) < 0.005
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }
                >
                  {cellFmt(v)}
                </span>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              M = T · R · K · S (right-to-left composition)
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-muted-foreground">rotate θ</span>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={angle}
                onChange={(e) => setAngle(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono w-10 text-right">{angle}°</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-muted-foreground">scale x</span>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={sx}
                onChange={(e) => setSx(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono w-10 text-right">{sx.toFixed(2)}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-muted-foreground">scale y</span>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={sy}
                onChange={(e) => setSy(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono w-10 text-right">{sy.toFixed(2)}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-muted-foreground">shear kx</span>
              <input
                type="range"
                min={-1.5}
                max={1.5}
                step={0.05}
                value={kx}
                onChange={(e) => setKx(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono w-10 text-right">{kx.toFixed(2)}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-muted-foreground">tx</span>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={tx}
                onChange={(e) => setTx(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono w-10 text-right">{tx.toFixed(2)}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-muted-foreground">ty</span>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={ty}
                onChange={(e) => setTy(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono w-10 text-right">{ty.toFixed(2)}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 text-xs leading-relaxed text-muted-foreground">
        Every vertex of every model in your favorite game gets multiplied by a
        chain of these matrices on its way to the screen — model → world → view
        → projection → viewport. CMSI 3710 has you write each one in raw GLSL,
        compose them in the right order (right-to-left!), and discover{" "}
        <em>why</em> rotating around an arbitrary point requires a
        translate-rotate-translate sandwich.
      </div>
    </div>
  )
}
