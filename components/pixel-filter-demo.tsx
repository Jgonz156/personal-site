"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type Kernel = number[][]

const KERNELS: Record<string, { kernel: Kernel; divisor: number; bias: number; description: string }> = {
  identity: {
    kernel: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    divisor: 1,
    bias: 0,
    description: "Pass-through — every pixel maps to itself.",
  },
  blur: {
    kernel: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    divisor: 9,
    bias: 0,
    description: "Box blur — average of the 3×3 neighborhood. Smooths noise; loses detail.",
  },
  sharpen: {
    kernel: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    divisor: 1,
    bias: 0,
    description: "Sharpen — boost the center, subtract neighbors. Enhances edges by accentuating local contrast.",
  },
  edge: {
    kernel: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
    divisor: 1,
    bias: 0,
    description: "Edge detect — high response where neighbors disagree; flat regions vanish to zero.",
  },
  emboss: {
    kernel: [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2],
    ],
    divisor: 1,
    bias: 128,
    description: "Emboss — directional gradient gives a 3-D illusion. Bias of 128 keeps mid-gray as 'flat'.",
  },
}

const W = 24
const H = 24

function makeImage(): number[][] {
  const img: number[][] = []
  for (let y = 0; y < H; y++) {
    const row: number[] = []
    for (let x = 0; x < W; x++) {
      // Concentric "lens" pattern with a diagonal stripe for variety
      const cx = W / 2
      const cy = H / 2
      const dx = x - cx
      const dy = y - cy
      const r = Math.sqrt(dx * dx + dy * dy)
      let v = Math.round(128 + 90 * Math.sin(r * 0.9))
      if ((x + y) % 6 === 0) v = Math.max(0, v - 50)
      if (x < 3 || y < 3 || x >= W - 3 || y >= H - 3) v = 230
      v = Math.max(0, Math.min(255, v))
      row.push(v)
    }
    img.push(row)
  }
  return img
}

function applyKernel(
  img: number[][],
  kernel: Kernel,
  divisor: number,
  bias: number,
): number[][] {
  const out: number[][] = []
  for (let y = 0; y < H; y++) {
    const row: number[] = []
    for (let x = 0; x < W; x++) {
      let acc = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const sx = Math.min(W - 1, Math.max(0, x + dx))
          const sy = Math.min(H - 1, Math.max(0, y + dy))
          acc += img[sy][sx] * kernel[dy + 1][dx + 1]
        }
      }
      let v = acc / divisor + bias
      v = Math.max(0, Math.min(255, v))
      row.push(Math.round(v))
    }
    out.push(row)
  }
  return out
}

const PIXEL = 12

function ImageGrid({
  img,
  highlight,
  onHover,
}: {
  img: number[][]
  highlight: { x: number; y: number } | null
  onHover?: (p: { x: number; y: number } | null) => void
}) {
  return (
    <svg
      viewBox={`0 0 ${W * PIXEL} ${H * PIXEL}`}
      className="border rounded bg-muted/20"
      style={{ imageRendering: "pixelated", width: "100%", maxWidth: 320 }}
      onMouseLeave={() => onHover?.(null)}
    >
      {img.map((row, y) =>
        row.map((v, x) => {
          const isHL =
            highlight &&
            x >= highlight.x - 1 &&
            x <= highlight.x + 1 &&
            y >= highlight.y - 1 &&
            y <= highlight.y + 1
          return (
            <rect
              key={`${x}-${y}`}
              x={x * PIXEL}
              y={y * PIXEL}
              width={PIXEL}
              height={PIXEL}
              fill={`rgb(${v},${v},${v})`}
              stroke={isHL ? "#f59e0b" : "none"}
              strokeWidth={isHL ? 1.5 : 0}
              onMouseEnter={() => onHover?.({ x, y })}
            />
          )
        }),
      )}
    </svg>
  )
}

export function PixelFilterDemo() {
  const [kernelKey, setKernelKey] = useState<keyof typeof KERNELS>("edge")
  const [hover, setHover] = useState<{ x: number; y: number } | null>({ x: 12, y: 12 })

  const baseImg = useMemo(() => makeImage(), [])
  const filtered = useMemo(() => {
    const k = KERNELS[kernelKey]
    return applyKernel(baseImg, k.kernel, k.divisor, k.bias)
  }, [baseImg, kernelKey])

  const k = KERNELS[kernelKey]

  // Compute the highlighted output cell math
  let mathDetail: React.ReactNode = null
  if (hover) {
    const x = hover.x
    const y = hover.y
    const terms: number[] = []
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const sx = Math.min(W - 1, Math.max(0, x + dx))
        const sy = Math.min(H - 1, Math.max(0, y + dy))
        terms.push(baseImg[sy][sx] * k.kernel[dy + 1][dx + 1])
      }
    }
    const sum = terms.reduce((s, t) => s + t, 0)
    const out = Math.max(0, Math.min(255, Math.round(sum / k.divisor + k.bias)))
    mathDetail = (
      <div className="text-[10px] font-mono leading-relaxed">
        sum = {terms.filter((t) => t !== 0).join(" + ") || "0"}
        <br />
        out = ({sum} / {k.divisor}) + {k.bias} = <strong>{out}</strong>
      </div>
    )
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          Pixel Filter — convolution kernels are matrix math on images
        </span>
      </div>

      <div className="px-4 py-3 border-b flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground mr-1">Kernel:</span>
        {(Object.keys(KERNELS) as (keyof typeof KERNELS)[]).map((key) => (
          <Button
            key={key}
            size="sm"
            variant={kernelKey === key ? "default" : "outline"}
            className="h-7 text-xs capitalize"
            onClick={() => setKernelKey(key)}
          >
            {key}
          </Button>
        ))}
      </div>

      <div className="p-4 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-start">
        <div>
          <p className="text-xs font-semibold mb-1">Input</p>
          <ImageGrid img={baseImg} highlight={hover} onHover={setHover} />
        </div>
        <div>
          <p className="text-xs font-semibold mb-1">Output</p>
          <ImageGrid img={filtered} highlight={hover} />
        </div>
        <div className="text-xs space-y-2 min-w-[180px]">
          <div>
            <p className="font-semibold mb-1">Kernel</p>
            <div className="grid grid-cols-3 gap-1 font-mono text-[11px] bg-muted/40 border rounded p-2 text-center w-fit">
              {k.kernel.flat().map((v, i) => (
                <span
                  key={i}
                  className={
                    v === 0
                      ? "text-muted-foreground"
                      : v > 0
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400"
                  }
                >
                  {v}
                </span>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              ÷{k.divisor} + bias {k.bias}
            </p>
          </div>
          <p className="text-muted-foreground leading-snug">{k.description}</p>
          {hover && (
            <div className="border rounded bg-muted/30 p-2">
              <p className="font-semibold mb-1">
                Pixel ({hover.x}, {hover.y})
              </p>
              {mathDetail}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 text-xs leading-relaxed text-muted-foreground">
        Hover any pixel to see exactly which 9 neighbors were combined.
        Convolution is just <em>matrix multiplication slid over an image</em> —
        the same operation that appears in Photoshop filters, JPEG compression,
        and the convolutional layers of neural networks. CMSI 3710 has you
        write this loop in a fragment shader running in parallel for millions
        of pixels per frame.
      </div>
    </div>
  )
}
