"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

function MathBlock({ formula }: { formula: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)
    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })
    return () => {
      mounted = false
    }
  }, [formula])

  return (
    <div className="relative overflow-x-auto text-center">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$$${formula}$$`}
      </div>
    </div>
  )
}

function modPow(base: number, exp: number, mod: number): number {
  let result = 1
  base = base % mod
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod
    exp = Math.floor(exp / 2)
    base = (base * base) % mod
  }
  return result
}

interface RSAStep {
  formula: string
  description: string
}

const STEPS: RSAStep[] = [
  {
    formula: "p = 3, \\quad q = 11",
    description: "Choose two prime numbers p and q. In real RSA, these are 1024+ bits each. We use small primes to see the math clearly.",
  },
  {
    formula: "n = p \\times q = 33, \\qquad \\phi(n) = (p-1)(q-1) = 2 \\times 10 = 20",
    description: "Compute n (the public modulus) and Euler's totient φ(n). Anyone can know n, but factoring it back into p and q is the hard part.",
  },
  {
    formula: "e = 7, \\qquad d = 3 \\qquad \\text{since } 7 \\times 3 = 21 \\equiv 1 \\pmod{20}",
    description: "Choose public exponent e (coprime to φ(n)), then compute private exponent d such that e·d ≡ 1 (mod φ(n)). The pair (n, e) is public; d is secret.",
  },
  {
    formula: "\\text{Encrypt: } c = m^e \\bmod n = 4^7 \\bmod 33 = 16384 \\bmod 33 = 16",
    description: "To encrypt message m = 4, raise it to the public exponent e modulo n. Anyone with the public key (n, e) can do this.",
  },
  {
    formula: "\\text{Decrypt: } m = c^d \\bmod n = 16^3 \\bmod 33 = 4096 \\bmod 33 = 4",
    description: "To decrypt ciphertext c = 16, raise it to the secret exponent d modulo n. Only the holder of d can recover the original message.",
  },
  {
    formula: "m \\;\\xrightarrow{\\;e\\;} \\;c \\;\\xrightarrow{\\;d\\;} \\;m \\qquad 4 \\to 16 \\to 4 \\quad \\checkmark",
    description: "The cycle works: encrypt then decrypt returns the original message. This holds for every m from 0 to n-1, guaranteed by Euler's theorem.",
  },
]

const P = 3
const Q = 11
const N = P * Q
const E = 7
const D = 3

export function RSAStepper() {
  const [stepIdx, setStepIdx] = useState(0)
  const [tryMsg, setTryMsg] = useState("")

  const step = STEPS[stepIdx]
  const parsedMsg = parseInt(tryMsg, 10)
  const validMsg = !isNaN(parsedMsg) && parsedMsg >= 0 && parsedMsg < N

  const encrypted = validMsg ? modPow(parsedMsg, E, N) : null
  const decrypted = encrypted !== null ? modPow(encrypted, D, N) : null

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">RSA Encryption Stepper</span>
        <span className="text-xs text-muted-foreground">
          Step {stepIdx + 1} of {STEPS.length}
        </span>
      </div>

      <div className="px-4 py-5 min-h-[100px]">
        <MathBlock key={stepIdx} formula={step.formula} />
        <p className="text-sm text-muted-foreground italic text-center mt-3">
          {step.description}
        </p>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepIdx(stepIdx - 1)}
          disabled={stepIdx === 0}
        >
          ← Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === stepIdx
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepIdx(stepIdx + 1)}
          disabled={stepIdx === STEPS.length - 1}
        >
          Next →
        </Button>
      </div>

      {/* Try it yourself */}
      <div className="px-4 py-4 border-t bg-muted/10">
        <div className="text-xs font-medium text-muted-foreground mb-2">Try it yourself</div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">m =</label>
            <input
              type="number"
              min={0}
              max={N - 1}
              value={tryMsg}
              onChange={(e) => setTryMsg(e.target.value)}
              placeholder="0–32"
              className="w-20 px-2 py-1 text-sm border rounded bg-background"
            />
          </div>
          {validMsg && encrypted !== null && decrypted !== null && (
            <div className="flex items-center gap-2 text-sm font-mono flex-wrap">
              <span className="text-muted-foreground">→ encrypt:</span>
              <span className="font-semibold">{encrypted}</span>
              <span className="text-muted-foreground">→ decrypt:</span>
              <span className="font-semibold">{decrypted}</span>
              <span className={decrypted === parsedMsg ? "text-green-500" : "text-red-500"}>
                {decrypted === parsedMsg ? "✓" : "✗"}
              </span>
            </div>
          )}
          {tryMsg !== "" && !validMsg && (
            <span className="text-xs text-muted-foreground">Enter a number from 0 to {N - 1}</span>
          )}
        </div>
      </div>
    </div>
  )
}
