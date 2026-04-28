"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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

const P = 3
const Q = 11
const N = P * Q // 33
const PHI = (P - 1) * (Q - 1) // 20
const E = 7
const D = 3

export function RSAPlayground() {
  const [encryptInput, setEncryptInput] = useState("4")
  const [decryptInput, setDecryptInput] = useState("16")

  const m = parseInt(encryptInput, 10)
  const c = parseInt(decryptInput, 10)
  const validM = !isNaN(m) && m >= 0 && m < N
  const validC = !isNaN(c) && c >= 0 && c < N

  // Show the unreduced power as a "this is the hard step" intermediate.
  // Both fit safely in a JS Number for our small parameters.
  const mPowE = validM ? Math.pow(m, E) : null
  const ciphertext = validM ? modPow(m, E, N) : null
  const cPowD = validC ? Math.pow(c, D) : null
  const plaintext = validC ? modPow(c, D, N) : null

  const sendCiphertextToDecrypt = () => {
    if (ciphertext !== null) setDecryptInput(String(ciphertext))
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">🔐 RSA Playground</span>
        <span className="text-xs text-muted-foreground font-mono">
          (n, e) public · d private
        </span>
      </div>

      {/* Parameters panel */}
      <div className="px-4 py-3 border-b bg-muted/10">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Key Parameters
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-sm font-mono">
          <div className="px-2 py-1 border rounded bg-red-500/5">
            <span className="text-[10px] text-red-700 dark:text-red-300 uppercase block">
              secret
            </span>
            <span className="text-muted-foreground">p =</span>{" "}
            <span className="font-bold">{P}</span>
          </div>
          <div className="px-2 py-1 border rounded bg-red-500/5">
            <span className="text-[10px] text-red-700 dark:text-red-300 uppercase block">
              secret
            </span>
            <span className="text-muted-foreground">q =</span>{" "}
            <span className="font-bold">{Q}</span>
          </div>
          <div className="px-2 py-1 border rounded bg-red-500/5">
            <span className="text-[10px] text-red-700 dark:text-red-300 uppercase block">
              secret
            </span>
            <span className="text-muted-foreground">d =</span>{" "}
            <span className="font-bold">{D}</span>
          </div>
          <div className="px-2 py-1 border rounded bg-emerald-500/5">
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase block">
              public
            </span>
            <span className="text-muted-foreground">n = p·q =</span>{" "}
            <span className="font-bold">{N}</span>
          </div>
          <div className="px-2 py-1 border rounded bg-emerald-500/5">
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase block">
              public
            </span>
            <span className="text-muted-foreground">e =</span>{" "}
            <span className="font-bold">{E}</span>
          </div>
          <div className="px-2 py-1 border rounded bg-amber-500/5">
            <span className="text-[10px] text-amber-700 dark:text-amber-300 uppercase block">
              derived
            </span>
            <span className="text-muted-foreground">φ(n) =</span>{" "}
            <span className="font-bold">{PHI}</span>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground italic mt-2">
          The world sees only the public values. To compute{" "}
          <span className="font-mono">d</span>, an attacker first needs{" "}
          <span className="font-mono">φ(n) = (p−1)(q−1)</span>, which requires
          factoring <span className="font-mono">n</span> back into{" "}
          <span className="font-mono">p</span> and{" "}
          <span className="font-mono">q</span>. <strong>That's the hard part.</strong>
        </p>
      </div>

      {/* Encrypt channel */}
      <div className="px-4 py-4 border-b">
        <div className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3">
          ✉️ Encrypt: c = m^e mod n
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <label className="text-sm font-mono">m =</label>
          <input
            type="number"
            min={0}
            max={N - 1}
            value={encryptInput}
            onChange={(e) => setEncryptInput(e.target.value)}
            className="w-20 px-2 py-1 text-sm font-mono border rounded bg-background"
          />
          <span className="text-xs text-muted-foreground">
            (any integer 0–{N - 1})
          </span>
        </div>
        {validM && mPowE !== null && ciphertext !== null && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center text-sm">
            <div className="px-3 py-2 border rounded bg-muted/20 text-center">
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
                Input
              </div>
              <div className="font-mono font-bold text-base">m = {m}</div>
            </div>
            <div className="text-center text-muted-foreground text-xs">
              → raise to <span className="font-mono">e = {E}</span> →
            </div>
            <div className="px-3 py-2 border rounded bg-amber-500/10 text-center">
              <div className="text-[10px] uppercase text-amber-700 dark:text-amber-300 tracking-wider">
                The hard math
              </div>
              <div className="font-mono font-bold break-all">
                {m}
                <sup>{E}</sup> = {mPowE.toLocaleString()}
              </div>
            </div>
            <div className="text-center text-muted-foreground text-xs">
              → mod <span className="font-mono">{N}</span> →
            </div>
            <div className="px-3 py-2 border rounded bg-green-500/10 text-center">
              <div className="text-[10px] uppercase text-green-700 dark:text-green-300 tracking-wider">
                Ciphertext
              </div>
              <div className="font-mono font-bold text-base text-green-700 dark:text-green-400">
                c = {ciphertext}
              </div>
            </div>
          </div>
        )}
        {validM && ciphertext !== null && (
          <div className="mt-3 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={sendCiphertextToDecrypt}
            >
              Send c = {ciphertext} to decrypt ↓
            </Button>
          </div>
        )}
        {!validM && encryptInput !== "" && (
          <div className="text-xs text-red-500">
            Enter an integer between 0 and {N - 1}
          </div>
        )}
      </div>

      {/* Decrypt channel */}
      <div className="px-4 py-4 border-b">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
          🔓 Decrypt: m = c^d mod n
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <label className="text-sm font-mono">c =</label>
          <input
            type="number"
            min={0}
            max={N - 1}
            value={decryptInput}
            onChange={(e) => setDecryptInput(e.target.value)}
            className="w-20 px-2 py-1 text-sm font-mono border rounded bg-background"
          />
          <span className="text-xs text-muted-foreground">
            (any integer 0–{N - 1})
          </span>
        </div>
        {validC && cPowD !== null && plaintext !== null && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center text-sm">
            <div className="px-3 py-2 border rounded bg-muted/20 text-center">
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
                Input
              </div>
              <div className="font-mono font-bold text-base">c = {c}</div>
            </div>
            <div className="text-center text-muted-foreground text-xs">
              → raise to <span className="font-mono">d = {D}</span> →
            </div>
            <div className="px-3 py-2 border rounded bg-amber-500/10 text-center">
              <div className="text-[10px] uppercase text-amber-700 dark:text-amber-300 tracking-wider">
                The hard math
              </div>
              <div className="font-mono font-bold break-all">
                {c}
                <sup>{D}</sup> = {cPowD.toLocaleString()}
              </div>
            </div>
            <div className="text-center text-muted-foreground text-xs">
              → mod <span className="font-mono">{N}</span> →
            </div>
            <div className="px-3 py-2 border rounded bg-blue-500/10 text-center">
              <div className="text-[10px] uppercase text-blue-700 dark:text-blue-300 tracking-wider">
                Plaintext
              </div>
              <div className="font-mono font-bold text-base text-blue-700 dark:text-blue-400">
                m = {plaintext}
              </div>
            </div>
          </div>
        )}
        {!validC && decryptInput !== "" && (
          <div className="text-xs text-red-500">
            Enter an integer between 0 and {N - 1}
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="px-4 py-3 bg-muted/20">
        <p className="text-xs text-muted-foreground italic">
          <strong>Why is this hard to break?</strong> Both encrypt and decrypt
          are easy <em>if you know the right exponent</em>. But an attacker who
          intercepts <span className="font-mono">c</span> and only knows the
          public key <span className="font-mono">(n, e)</span> would need to
          compute <span className="font-mono">d</span> — which requires{" "}
          <span className="font-mono">φ(n)</span> — which requires factoring{" "}
          <span className="font-mono">n</span>. For our toy{" "}
          <span className="font-mono">n = {N}</span> you can factor it in your
          head. For real RSA with 2048-bit{" "}
          <span className="font-mono">n</span>, the best known factoring
          algorithm would take longer than the age of the universe. Encryption
          is a one-way street unless you hold the key.
        </p>
      </div>
    </div>
  )
}
