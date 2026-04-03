"use client"

import { useEffect, useRef, useState } from "react"
import { waitForMathJax, MathShimmer } from "@/components/math"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function AxiomFormula({ formula }: { formula: string }) {
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
    <div className="relative overflow-x-auto py-2">
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

interface ZFCAxiom {
  name: string
  informal: string
  formal: string
}

const AXIOMS: ZFCAxiom[] = [
  {
    name: "Extensionality",
    informal:
      "Two sets are equal if and only if they have the same elements.",
    formal:
      "\\forall A,\\, B.\\; (\\forall x.\\; x \\in A \\iff x \\in B) \\implies A = B",
  },
  {
    name: "Empty Set",
    informal: "There exists a set with no elements.",
    formal: "\\exists\\, E.\\; \\forall x.\\; x \\notin E",
  },
  {
    name: "Pairing",
    informal:
      "For any two sets, there exists a set containing exactly those two.",
    formal:
      "\\forall a,\\, b.\\; \\exists\\, P.\\; \\forall x.\\; x \\in P \\iff (x = a \\lor x = b)",
  },
  {
    name: "Union",
    informal:
      "For any set of sets, there exists a set containing all their elements.",
    formal:
      "\\forall\\, \\mathcal{F}.\\; \\exists\\, U.\\; \\forall x.\\; x \\in U \\iff \\exists A.\\; (A \\in \\mathcal{F} \\land x \\in A)",
  },
  {
    name: "Power Set",
    informal:
      "For any set, there exists a set of all its subsets.",
    formal:
      "\\forall A.\\; \\exists\\, P.\\; \\forall S.\\; S \\in P \\iff S \\subseteq A",
  },
  {
    name: "Infinity",
    informal:
      "There exists an infinite set (the natural numbers).",
    formal:
      "\\exists\\, I.\\; \\emptyset \\in I \\;\\land\\; \\forall x.\\; (x \\in I \\implies x \\cup \\{x\\} \\in I)",
  },
  {
    name: "Replacement",
    informal:
      "Applying a definable function to every element of a set produces a set.",
    formal:
      "\\forall A.\\; \\forall F\\text{ (functional)}.\\; \\exists\\, B.\\; \\forall y.\\; y \\in B \\iff \\exists x \\in A.\\; F(x) = y",
  },
  {
    name: "Foundation (Regularity)",
    informal:
      "Every non-empty set contains an element disjoint from itself.",
    formal:
      "\\forall A.\\; (A \\neq \\emptyset \\implies \\exists x \\in A.\\; x \\cap A = \\emptyset)",
  },
  {
    name: "Choice",
    informal:
      "For any collection of non-empty sets, you can simultaneously pick one element from each.",
    formal:
      "\\forall\\, \\mathcal{F}.\\; (\\forall A \\in \\mathcal{F}.\\; A \\neq \\emptyset) \\implies \\exists\\, f\\!: \\mathcal{F} \\to \\bigcup \\mathcal{F}.\\; \\forall A \\in \\mathcal{F}.\\; f(A) \\in A",
  },
]

export function ZFCAxiomExplorer() {
  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">
          The ZFC Axioms
        </span>
        <a
          href="https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          Wikipedia: ZFC →
        </a>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs text-muted-foreground mb-3">
          Click any axiom to reveal its formal first-order logic definition.
        </p>
        <Accordion type="multiple">
          {AXIOMS.map((axiom) => (
            <AccordionItem key={axiom.name} value={axiom.name}>
              <AccordionTrigger className="text-sm py-3">
                <div className="flex flex-col items-start text-left gap-0.5 pr-4">
                  <span className="font-semibold">{axiom.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {axiom.informal}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AxiomFormula formula={axiom.formal} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
