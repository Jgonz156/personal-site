"use client"

import { useEffect } from "react"
import { DateTime } from "luxon"
import { useNavbar } from "@/components/navbar-context"
import { courseEvents } from "@/lib/course-data"

// Define the course standards in order
const STANDARDS = [
  { id: 1, name: "Logic", sectionId: "logic" },
  { id: 2, name: "Numbers", sectionId: "numbers" },
  { id: 3, name: "Collections", sectionId: "collections" },
  { id: 4, name: "Functions", sectionId: "functions" },
  { id: 5, name: "Combinatorics", sectionId: "combinatorics" },
  { id: 6, name: "Graph Theory", sectionId: "graph-theory" },
  { id: 7, name: "Set Theory", sectionId: "set-theory" },
]

export default function CheatSheet() {
  const { setPageSections } = useNavbar()

  // Determine which standards should be unlocked (homework becomes available)
  const today = DateTime.now().startOf("day")

  const isStandardUnlocked = (standardName: string) => {
    // Find the homework event for this standard
    const homeworkEvent = courseEvents.find(
      (event) =>
        event.courseId === "cmsi-2820" &&
        event.standard === standardName &&
        event.type === "homework"
    )

    if (!homeworkEvent) return false

    // Unlock on the day the homework becomes available (or date if availableDate not set)
    const releaseDate = homeworkEvent.availableDate || homeworkEvent.date
    return releaseDate.startOf("day") <= today
  }

  const unlockedStandards = STANDARDS.filter((standard) =>
    isStandardUnlocked(standard.name)
  )

  useEffect(() => {
    // Clear sections immediately to prevent stale data from previous pages
    setPageSections([])

    // Set page sections for navigation (only for unlocked standards)
    const sections = unlockedStandards.map((standard) => ({
      id: standard.sectionId,
      title: standard.name,
      level: 1,
    }))

    setPageSections(sections)

    return () => {
      setPageSections([])
    }
  }, [setPageSections, unlockedStandards.length])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">
        CMSI 2820: Discrete Mathematics Cheat Sheet
      </h1>
      <p className="text-muted-foreground mb-6">
        Quick reference guide for course material. Sections unlock when homework
        is assigned.
      </p>

      {unlockedStandards.length === 0 && (
        <div className="border rounded-lg p-8 bg-muted/30 text-center">
          <p className="text-lg text-muted-foreground">
            📚 No cheat sheet sections available yet!
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Cheat sheet sections unlock when homework is assigned. Check back on
            homework release days!
          </p>
        </div>
      )}

      <div className="space-y-8">
        {/* Logic Section */}
        {unlockedStandards.some((s) => s.name === "Logic") && (
          <section id="logic" className="border rounded-lg p-6 bg-muted/30">
            <h2 className="text-2xl font-semibold mb-4">Logic</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Logical Operators</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left py-2 px-4">Operator</th>
                        <th className="text-left py-2 px-4">Symbol</th>
                        <th className="text-left py-2 px-4">Meaning</th>
                        <th className="text-left py-2 px-4">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Negation</td>
                        <td className="py-2 px-4 font-mono">¬p or ~p</td>
                        <td className="py-2 px-4">NOT p</td>
                        <td className="py-2 px-4">If p is true, ¬p is false</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Conjunction</td>
                        <td className="py-2 px-4 font-mono">p ∧ q</td>
                        <td className="py-2 px-4">p AND q</td>
                        <td className="py-2 px-4">
                          True only if both are true
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Disjunction</td>
                        <td className="py-2 px-4 font-mono">p ∨ q</td>
                        <td className="py-2 px-4">p OR q</td>
                        <td className="py-2 px-4">
                          True if at least one is true
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Implication</td>
                        <td className="py-2 px-4 font-mono">p → q</td>
                        <td className="py-2 px-4">If p then q</td>
                        <td className="py-2 px-4">
                          False only if p is true and q is false
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Biconditional</td>
                        <td className="py-2 px-4 font-mono">p ↔ q</td>
                        <td className="py-2 px-4">p if and only if q</td>
                        <td className="py-2 px-4">
                          True if both have same truth value
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Key Logical Equivalences</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    <span className="font-mono">¬(¬p) ≡ p</span> (Double
                    Negation)
                  </li>
                  <li>
                    <span className="font-mono">p ∧ q ≡ q ∧ p</span>{" "}
                    (Commutative)
                  </li>
                  <li>
                    <span className="font-mono">¬(p ∧ q) ≡ ¬p ∨ ¬q</span> (De
                    Morgan's Laws)
                  </li>
                  <li>
                    <span className="font-mono">p → q ≡ ¬p ∨ q</span>{" "}
                    (Implication)
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Numbers Section */}
        {unlockedStandards.some((s) => s.name === "Numbers") && (
          <section id="numbers" className="border rounded-lg p-6 bg-muted/30">
            <h2 className="text-2xl font-semibold mb-4">Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Divisibility Rules</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>2: Last digit is even</li>
                  <li>3: Sum of digits divisible by 3</li>
                  <li>5: Last digit is 0 or 5</li>
                  <li>9: Sum of digits divisible by 9</li>
                  <li>10: Last digit is 0</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Modular Arithmetic</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    <span className="font-mono">a ≡ b (mod m)</span> means m |
                    (a - b)
                  </li>
                  <li>
                    <span className="font-mono">
                      (a + b) mod m = ((a mod m) + (b mod m)) mod m
                    </span>
                  </li>
                  <li>
                    <span className="font-mono">
                      (a × b) mod m = ((a mod m) × (b mod m)) mod m
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Collections Section */}
        {unlockedStandards.some((s) => s.name === "Collections") && (
          <section
            id="collections"
            className="border rounded-lg p-6 bg-muted/30"
          >
            <h2 className="text-2xl font-semibold mb-4">Collections</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Set Operations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left py-2 px-4">Operation</th>
                        <th className="text-left py-2 px-4">Symbol</th>
                        <th className="text-left py-2 px-4">Definition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Union</td>
                        <td className="py-2 px-4 font-mono">A ∪ B</td>
                        <td className="py-2 px-4">
                          Elements in A or B (or both)
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Intersection</td>
                        <td className="py-2 px-4 font-mono">A ∩ B</td>
                        <td className="py-2 px-4">Elements in both A and B</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Difference</td>
                        <td className="py-2 px-4 font-mono">A - B</td>
                        <td className="py-2 px-4">
                          Elements in A but not in B
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-4">Complement</td>
                        <td className="py-2 px-4 font-mono">A'</td>
                        <td className="py-2 px-4">Elements not in A</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Cartesian Product</td>
                        <td className="py-2 px-4 font-mono">A × B</td>
                        <td className="py-2 px-4">All ordered pairs (a, b)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Functions Section */}
        {unlockedStandards.some((s) => s.name === "Functions") && (
          <section id="functions" className="border rounded-lg p-6 bg-muted/30">
            <h2 className="text-2xl font-semibold mb-4">Functions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Injective (One-to-One)</h3>
                <p className="text-sm text-muted-foreground">
                  f(a) = f(b) implies a = b
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Each output has at most one input
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Surjective (Onto)</h3>
                <p className="text-sm text-muted-foreground">
                  Every element in codomain is mapped
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Range equals codomain
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Bijective</h3>
                <p className="text-sm text-muted-foreground">
                  Both injective and surjective
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  One-to-one correspondence
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Combinatorics Section */}
        {unlockedStandards.some((s) => s.name === "Combinatorics") && (
          <section
            id="combinatorics"
            className="border rounded-lg p-6 bg-muted/30"
          >
            <h2 className="text-2xl font-semibold mb-4">Combinatorics</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key Formulas</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    <span className="font-mono">P(n,r) = n!/(n-r)!</span> -
                    Permutations (order matters)
                  </li>
                  <li>
                    <span className="font-mono">C(n,r) = n!/(r!(n-r)!)</span> -
                    Combinations (order doesn't matter)
                  </li>
                  <li>
                    <span className="font-mono">Sum Rule:</span> If A and B are
                    disjoint, |A ∪ B| = |A| + |B|
                  </li>
                  <li>
                    <span className="font-mono">Product Rule:</span> |A × B| =
                    |A| × |B|
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Common Patterns</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Permutations with repetition: n^r</li>
                  <li>Combinations with repetition: C(n+r-1, r)</li>
                  <li>
                    Pigeonhole Principle: If n+1 objects in n holes, at least
                    one hole has 2+ objects
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Graph Theory Section */}
        {unlockedStandards.some((s) => s.name === "Graph Theory") && (
          <section
            id="graph-theory"
            className="border rounded-lg p-6 bg-muted/30"
          >
            <h2 className="text-2xl font-semibold mb-4">Graph Theory</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Graph Properties</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    <span className="font-mono">Handshaking Lemma:</span> Sum of
                    all vertex degrees = 2|E|
                  </li>
                  <li>
                    <span className="font-mono">Complete Graph K_n:</span> Has
                    n(n-1)/2 edges
                  </li>
                  <li>
                    <span className="font-mono">Tree:</span> Connected acyclic
                    graph with n-1 edges (n vertices)
                  </li>
                  <li>
                    <span className="font-mono">Euler Path:</span> Visits every
                    edge exactly once
                  </li>
                  <li>
                    <span className="font-mono">Hamiltonian Path:</span> Visits
                    every vertex exactly once
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Graph Types</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    Bipartite: Vertices divided into 2 sets, edges only between
                    sets
                  </li>
                  <li>
                    Complete Bipartite K(m,n): All possible edges between two
                    sets
                  </li>
                  <li>Planar: Can be drawn without edge crossings</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Set Theory Section */}
        {unlockedStandards.some((s) => s.name === "Set Theory") && (
          <section
            id="set-theory"
            className="border rounded-lg p-6 bg-muted/30"
          >
            <h2 className="text-2xl font-semibold mb-4">Set Theory</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Proof Techniques</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    <span className="font-mono">Direct Proof:</span> Start with
                    hypothesis, use logic to reach conclusion
                  </li>
                  <li>
                    <span className="font-mono">Proof by Contradiction:</span>{" "}
                    Assume negation, derive contradiction
                  </li>
                  <li>
                    <span className="font-mono">Proof by Induction:</span> Base
                    case + inductive step
                  </li>
                  <li>
                    <span className="font-mono">Proof by Contrapositive:</span>{" "}
                    Prove ¬q → ¬p instead of p → q
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Set Identities</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    De Morgan's Laws: (A ∪ B)' = A' ∩ B', (A ∩ B)' = A' ∪ B'
                  </li>
                  <li>Distributive: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</li>
                  <li>Absorption: A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
