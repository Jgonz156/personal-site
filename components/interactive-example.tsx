"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

// Example interactive component for MDX lectures
export function InteractiveExample() {
  const [count, setCount] = useState(0)

  return (
    <div className="my-6 p-6 border rounded-lg bg-muted/30">
      <h4 className="font-semibold mb-4">Interactive Demo</h4>
      <p className="mb-4">
        This is an example of an interactive component you can embed in your MDX
        lecture notes!
      </p>
      <div className="flex items-center gap-4">
        <Button onClick={() => setCount(count + 1)}>Click me: {count}</Button>
        <Button variant="outline" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    </div>
  )
}

// Truth Table Generator
export function TruthTableDemo() {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="my-6 p-6 border rounded-lg bg-blue-500/10">
      <h4 className="font-semibold mb-4">🧮 Truth Table Practice</h4>
      <p className="mb-4">
        Try to complete this truth table for: <code>(P ∨ Q) ∧ ¬R</code>
      </p>
      <Button onClick={() => setShowAnswer(!showAnswer)} size="sm">
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </Button>
      {showAnswer && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2">P</th>
                <th className="border p-2">Q</th>
                <th className="border p-2">R</th>
                <th className="border p-2">P ∨ Q</th>
                <th className="border p-2">¬R</th>
                <th className="border p-2">(P ∨ Q) ∧ ¬R</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center font-bold">F</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center font-bold">T</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center font-bold">F</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center font-bold">T</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center font-bold">F</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center font-bold">T</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center font-bold">F</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">F</td>
                <td className="border p-2 text-center">T</td>
                <td className="border p-2 text-center font-bold">F</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// Toggle-able definition box
export function DefinitionBox({
  term,
  children,
}: {
  term: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-4 border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left bg-muted/50 hover:bg-muted transition-colors flex items-center justify-between"
      >
        <span className="font-semibold">📖 Definition: {term}</span>
        <span className="text-muted-foreground">{isOpen ? "▼" : "▶"}</span>
      </button>
      {isOpen && <div className="p-4 bg-background">{children}</div>}
    </div>
  )
}
