"use client"

import { useState } from "react"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function shiftChar(ch: string, k: number): string {
  if (ch >= "A" && ch <= "Z") {
    const i = ch.charCodeAt(0) - 65
    return ALPHABET[((i + k) % 26 + 26) % 26]
  }
  if (ch >= "a" && ch <= "z") {
    const i = ch.charCodeAt(0) - 97
    return ALPHABET[((i + k) % 26 + 26) % 26].toLowerCase()
  }
  return ch
}

function caesarTransform(text: string, k: number): string {
  return text
    .split("")
    .map((ch) => shiftChar(ch, k))
    .join("")
}

export function CaesarPlayground() {
  const [shift, setShift] = useState(3)
  const [plaintextEnc, setPlaintextEnc] = useState("HELLO")
  const [ciphertextDec, setCiphertextDec] = useState("KHOOR")

  const encrypted = caesarTransform(plaintextEnc, shift)
  const decrypted = caesarTransform(ciphertextDec, -shift)

  const usedLetters = new Set(
    (plaintextEnc + ciphertextDec)
      .toUpperCase()
      .split("")
      .filter((c) => c >= "A" && c <= "Z")
  )

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">🔐 Caesar Cipher Playground</span>
        <span className="text-xs text-muted-foreground font-mono">
          E_k(x) = (x + k) mod 26
        </span>
      </div>

      {/* Shift slider */}
      <div className="px-4 py-3 border-b bg-muted/10">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm font-medium whitespace-nowrap">
            Shift <span className="font-mono">k</span> =
          </label>
          <input
            type="range"
            min={0}
            max={25}
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="flex-1 min-w-[150px] accent-primary"
          />
          <span className="font-mono font-semibold text-sm w-8 text-right">
            {shift}
          </span>
        </div>
      </div>

      {/* Alphabet mapping */}
      <div className="px-4 py-3 border-b overflow-x-auto">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Alphabet Mapping (highlighted letters appear in your input)
        </div>
        <div className="flex items-center gap-0.5 min-w-fit">
          {ALPHABET.split("").map((ch, i) => {
            const mapped = ALPHABET[(i + shift) % 26]
            const isUsed = usedLetters.has(ch)
            return (
              <div
                key={i}
                className={`flex flex-col items-center min-w-[22px] py-1 rounded transition-colors ${
                  isUsed ? "bg-primary/15" : ""
                }`}
              >
                <span
                  className={`text-xs font-mono ${
                    isUsed
                      ? "font-bold text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {ch}
                </span>
                <span className="text-[9px] text-muted-foreground/60">↓</span>
                <span
                  className={`text-xs font-mono ${
                    isUsed ? "font-bold text-primary" : ""
                  }`}
                >
                  {mapped}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Encrypt channel */}
      <div className="px-4 py-3 border-b">
        <div className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">
          ✉️ Encrypt: shift each letter forward by k
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Plaintext (input)
            </label>
            <input
              type="text"
              value={plaintextEnc}
              onChange={(e) => setPlaintextEnc(e.target.value.toUpperCase())}
              className="w-full px-2 py-1.5 text-sm font-mono border rounded bg-background tracking-wider"
              placeholder="Type a message..."
            />
          </div>
          <div className="text-center text-muted-foreground text-xs hidden md:block">
            → +{shift} →
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Ciphertext (output)
            </label>
            <div className="px-2 py-1.5 text-sm font-mono border rounded bg-green-500/5 min-h-[34px] tracking-wider font-semibold text-green-700 dark:text-green-400">
              {encrypted || (
                <span className="text-muted-foreground/50 italic font-normal">
                  (empty)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decrypt channel */}
      <div className="px-4 py-3 border-b">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          🔓 Decrypt: shift each letter backward by k
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Ciphertext (input)
            </label>
            <input
              type="text"
              value={ciphertextDec}
              onChange={(e) => setCiphertextDec(e.target.value.toUpperCase())}
              className="w-full px-2 py-1.5 text-sm font-mono border rounded bg-background tracking-wider"
              placeholder="Type a ciphertext..."
            />
          </div>
          <div className="text-center text-muted-foreground text-xs hidden md:block">
            → −{shift} →
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Plaintext (output)
            </label>
            <div className="px-2 py-1.5 text-sm font-mono border rounded bg-blue-500/5 min-h-[34px] tracking-wider font-semibold text-blue-700 dark:text-blue-400">
              {decrypted || (
                <span className="text-muted-foreground/50 italic font-normal">
                  (empty)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="px-4 py-3 bg-muted/20">
        <p className="text-xs text-muted-foreground italic">
          Notice: <strong>the same key k</strong> encrypts and decrypts (with
          the sign reversed). This makes Caesar a <strong>symmetric</strong>{" "}
          cipher. With only 26 possible keys, an attacker can brute-force every
          one in microseconds — try setting <span className="font-mono">k=0</span>{" "}
          to see plaintext = ciphertext (the "identity cipher"), then notice
          that any other shift is undone by simply trying all 26 alternatives.
        </p>
      </div>
    </div>
  )
}
