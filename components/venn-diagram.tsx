"use client"

import { useMemo, useId, JSX } from "react"

// ============================================================================
// Types
// ============================================================================

export interface VennDiagramProps {
  variables?: 1 | 2 | 3 // Number of circles (1, 2, or 3 only)
  labels?: string[] // Variable names
  formula?: string // Expression to shade
  regions?: number[] // Manual region indices to shade
  showLabels?: boolean // Show variable labels
  showRegionLabels?: boolean // Show region numbers (for teaching)
  height?: string // CSS height
  width?: string // CSS width
  caption?: string // Optional caption below
  className?: string
}

// ============================================================================
// Expression Parser
// ============================================================================

type Token =
  | { type: "VAR"; value: string }
  | { type: "NOT" }
  | { type: "AND" }
  | { type: "OR" }
  | { type: "IMPLIES" }
  | { type: "IFF" }
  | { type: "LPAREN" }
  | { type: "RPAREN" }
  | { type: "TRUE" }
  | { type: "FALSE" }

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  const s = input.replace(/\s+/g, "")

  while (i < s.length) {
    // Check for multi-character tokens first
    if (s.slice(i, i + 2) === "->") {
      tokens.push({ type: "IMPLIES" })
      i += 2
      continue
    }
    if (s.slice(i, i + 3) === "<->") {
      tokens.push({ type: "IFF" })
      i += 3
      continue
    }
    if (s.slice(i, i + 4).toLowerCase() === "true") {
      tokens.push({ type: "TRUE" })
      i += 4
      continue
    }
    if (s.slice(i, i + 5).toLowerCase() === "false") {
      tokens.push({ type: "FALSE" })
      i += 5
      continue
    }

    const c = s[i]

    // Single character tokens
    if (c === "(" || c === "[") {
      tokens.push({ type: "LPAREN" })
    } else if (c === ")" || c === "]") {
      tokens.push({ type: "RPAREN" })
    } else if (c === "¬" || c === "!" || c === "~") {
      tokens.push({ type: "NOT" })
    } else if (c === "∧" || c === "&" || c === "·") {
      tokens.push({ type: "AND" })
    } else if (c === "∨" || c === "|" || c === "+") {
      tokens.push({ type: "OR" })
    } else if (c === "→" || c === "⇒") {
      tokens.push({ type: "IMPLIES" })
    } else if (c === "↔" || c === "⇔") {
      tokens.push({ type: "IFF" })
    } else if (c === "0") {
      tokens.push({ type: "FALSE" })
    } else if (c === "1") {
      tokens.push({ type: "TRUE" })
    } else if (/[A-Za-z]/.test(c)) {
      // Variable - collect consecutive letters
      let varName = c
      while (i + 1 < s.length && /[A-Za-z0-9_]/.test(s[i + 1])) {
        i++
        varName += s[i]
      }
      tokens.push({ type: "VAR", value: varName.toUpperCase() })
    }
    i++
  }

  return tokens
}

type ASTNode =
  | { type: "VAR"; name: string }
  | { type: "NOT"; operand: ASTNode }
  | { type: "AND"; left: ASTNode; right: ASTNode }
  | { type: "OR"; left: ASTNode; right: ASTNode }
  | { type: "IMPLIES"; left: ASTNode; right: ASTNode }
  | { type: "IFF"; left: ASTNode; right: ASTNode }
  | { type: "TRUE" }
  | { type: "FALSE" }

// Recursive descent parser
// Grammar (precedence low to high):
// expr     → iff
// iff      → implies (('↔' | '<->') implies)*
// implies  → or (('→' | '->') or)*
// or       → and (('∨' | '|') and)*
// and      → unary (('∧' | '&') unary)*
// unary    → ('¬' | '!') unary | primary
// primary  → VAR | TRUE | FALSE | '(' expr ')'

function parse(tokens: Token[]): ASTNode | null {
  let pos = 0

  function peek(): Token | undefined {
    return tokens[pos]
  }

  function consume(): Token | undefined {
    return tokens[pos++]
  }

  function parseExpr(): ASTNode | null {
    return parseIff()
  }

  function parseIff(): ASTNode | null {
    let left = parseImplies()
    if (!left) return null

    while (peek()?.type === "IFF") {
      consume()
      const right = parseImplies()
      if (!right) return null
      left = { type: "IFF", left, right }
    }
    return left
  }

  function parseImplies(): ASTNode | null {
    let left = parseOr()
    if (!left) return null

    while (peek()?.type === "IMPLIES") {
      consume()
      const right = parseOr()
      if (!right) return null
      left = { type: "IMPLIES", left, right }
    }
    return left
  }

  function parseOr(): ASTNode | null {
    let left = parseAnd()
    if (!left) return null

    while (peek()?.type === "OR") {
      consume()
      const right = parseAnd()
      if (!right) return null
      left = { type: "OR", left, right }
    }
    return left
  }

  function parseAnd(): ASTNode | null {
    let left = parseUnary()
    if (!left) return null

    while (peek()?.type === "AND") {
      consume()
      const right = parseUnary()
      if (!right) return null
      left = { type: "AND", left, right }
    }
    return left
  }

  function parseUnary(): ASTNode | null {
    if (peek()?.type === "NOT") {
      consume()
      const operand = parseUnary()
      if (!operand) return null
      return { type: "NOT", operand }
    }
    return parsePrimary()
  }

  function parsePrimary(): ASTNode | null {
    const token = peek()
    if (!token) return null

    if (token.type === "VAR") {
      consume()
      return { type: "VAR", name: token.value }
    }
    if (token.type === "TRUE") {
      consume()
      return { type: "TRUE" }
    }
    if (token.type === "FALSE") {
      consume()
      return { type: "FALSE" }
    }
    if (token.type === "LPAREN") {
      consume()
      const expr = parseExpr()
      if (peek()?.type === "RPAREN") {
        consume()
      }
      return expr
    }
    return null
  }

  return parseExpr()
}

function evaluate(
  ast: ASTNode,
  assignment: Record<string, boolean>
): boolean {
  switch (ast.type) {
    case "VAR":
      return assignment[ast.name] ?? false
    case "TRUE":
      return true
    case "FALSE":
      return false
    case "NOT":
      return !evaluate(ast.operand, assignment)
    case "AND":
      return evaluate(ast.left, assignment) && evaluate(ast.right, assignment)
    case "OR":
      return evaluate(ast.left, assignment) || evaluate(ast.right, assignment)
    case "IMPLIES":
      return !evaluate(ast.left, assignment) || evaluate(ast.right, assignment)
    case "IFF":
      return evaluate(ast.left, assignment) === evaluate(ast.right, assignment)
  }
}

// ============================================================================
// Region Computation
// ============================================================================

// For n variables, there are 2^n regions
// Each region corresponds to a truth assignment
// Region index is the binary encoding: bit i = 1 means variable i is true

function getRegionsToShade(
  formula: string,
  variableNames: string[]
): number[] {
  const tokens = tokenize(formula)
  const ast = parse(tokens)
  if (!ast) return []

  const numVars = variableNames.length
  const numRegions = Math.pow(2, numVars)
  const shadedRegions: number[] = []

  for (let region = 0; region < numRegions; region++) {
    // Build assignment from region index
    const assignment: Record<string, boolean> = {}
    for (let i = 0; i < numVars; i++) {
      // Bit i represents variable i
      assignment[variableNames[i]] = ((region >> i) & 1) === 1
    }

    if (evaluate(ast, assignment)) {
      shadedRegions.push(region)
    }
  }

  return shadedRegions
}

// ============================================================================
// SVG Path Computation
// ============================================================================

// SVG viewBox dimensions
const VIEW_WIDTH = 400
const VIEW_HEIGHT = 300

// Circle parameters for different variable counts
const CIRCLE_CONFIGS = {
  1: {
    circles: [{ cx: 200, cy: 150, r: 80 }],
    labelPositions: [{ x: 200, y: 50 }],
  },
  2: {
    circles: [
      { cx: 160, cy: 150, r: 80 },
      { cx: 240, cy: 150, r: 80 },
    ],
    labelPositions: [
      { x: 100, y: 80 },
      { x: 300, y: 80 },
    ],
  },
  3: {
    circles: [
      { cx: 160, cy: 130, r: 70 },
      { cx: 240, cy: 130, r: 70 },
      { cx: 200, cy: 200, r: 70 },
    ],
    labelPositions: [
      { x: 100, y: 60 },
      { x: 300, y: 60 },
      { x: 200, y: 280 },
    ],
  },
}

// Region label positions (approximate centers of each region)
const REGION_LABEL_POSITIONS = {
  1: [
    { x: 330, y: 150 }, // Region 0: outside circle
    { x: 200, y: 150 }, // Region 1: inside circle
  ],
  2: [
    { x: 60, y: 150 }, // Region 0: outside both (00)
    { x: 130, y: 150 }, // Region 1: X only (01)
    { x: 270, y: 150 }, // Region 2: Y only (10)
    { x: 200, y: 150 }, // Region 3: both (11)
  ],
  3: [
    { x: 50, y: 260 }, // Region 0: outside all (000)
    { x: 130, y: 100 }, // Region 1: X only (001)
    { x: 270, y: 100 }, // Region 2: Y only (010)
    { x: 200, y: 95 }, // Region 3: X ∧ Y only (011)
    { x: 200, y: 250 }, // Region 4: Z only (100)
    { x: 155, y: 195 }, // Region 5: X ∧ Z only (101)
    { x: 245, y: 195 }, // Region 6: Y ∧ Z only (110)
    { x: 200, y: 160 }, // Region 7: all three (111)
  ],
}

// Generate SVG clip paths and region paths for the diagram
// idPrefix ensures unique IDs when multiple diagrams are on the same page
function generateSVGElements(
  numVars: 1 | 2 | 3,
  shadedRegions: number[],
  idPrefix: string
): { clipPaths: JSX.Element[]; regionPaths: JSX.Element[] } {
  const config = CIRCLE_CONFIGS[numVars]
  const clipPaths: JSX.Element[] = []
  const regionPaths: JSX.Element[] = []

  // Helper to create prefixed IDs
  const id = (name: string) => `${idPrefix}-${name}`
  const url = (name: string) => `url(#${id(name)})`

  // For 1 variable: 2 regions (outside, inside)
  if (numVars === 1) {
    const c = config.circles[0]
    const isRegion0Shaded = shadedRegions.includes(0) // outside
    const isRegion1Shaded = shadedRegions.includes(1) // inside

    if (isRegion0Shaded) {
      // Outside the circle - use SVG path with even-odd rule
      regionPaths.push(
        <path
          key="region-0"
          d={`M 0 0 H ${VIEW_WIDTH} V ${VIEW_HEIGHT} H 0 Z M ${c.cx} ${c.cy - c.r} A ${c.r} ${c.r} 0 1 0 ${c.cx} ${c.cy + c.r} A ${c.r} ${c.r} 0 1 0 ${c.cx} ${c.cy - c.r} Z`}
          fill="var(--venn-shade)"
          fillRule="evenodd"
        />
      )
    }
    if (isRegion1Shaded) {
      regionPaths.push(
        <circle
          key="region-1"
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="var(--venn-shade)"
        />
      )
    }
  }

  // For 2 variables: 4 regions
  if (numVars === 2) {
    const [c1, c2] = config.circles

    // Define clip paths with unique IDs
    clipPaths.push(
      <clipPath key="clip-c1" id={id("clip-c1")}>
        <circle cx={c1.cx} cy={c1.cy} r={c1.r} />
      </clipPath>,
      <clipPath key="clip-c2" id={id("clip-c2")}>
        <circle cx={c2.cx} cy={c2.cy} r={c2.r} />
      </clipPath>,
      <clipPath key="clip-not-c1" id={id("clip-not-c1")}>
        <path
          d={`M 0 0 H ${VIEW_WIDTH} V ${VIEW_HEIGHT} H 0 Z M ${c1.cx} ${c1.cy - c1.r} A ${c1.r} ${c1.r} 0 1 0 ${c1.cx} ${c1.cy + c1.r} A ${c1.r} ${c1.r} 0 1 0 ${c1.cx} ${c1.cy - c1.r} Z`}
          fillRule="evenodd"
        />
      </clipPath>,
      <clipPath key="clip-not-c2" id={id("clip-not-c2")}>
        <path
          d={`M 0 0 H ${VIEW_WIDTH} V ${VIEW_HEIGHT} H 0 Z M ${c2.cx} ${c2.cy - c2.r} A ${c2.r} ${c2.r} 0 1 0 ${c2.cx} ${c2.cy + c2.r} A ${c2.r} ${c2.r} 0 1 0 ${c2.cx} ${c2.cy - c2.r} Z`}
          fillRule="evenodd"
        />
      </clipPath>
    )

    // Region 0: outside both (¬X ∧ ¬Y)
    if (shadedRegions.includes(0)) {
      regionPaths.push(
        <g key="region-0" clipPath={url("clip-not-c1")}>
          <rect
            x={0}
            y={0}
            width={VIEW_WIDTH}
            height={VIEW_HEIGHT}
            fill="var(--venn-shade)"
            clipPath={url("clip-not-c2")}
          />
        </g>
      )
    }

    // Region 1: X only (X ∧ ¬Y)
    if (shadedRegions.includes(1)) {
      regionPaths.push(
        <g key="region-1" clipPath={url("clip-c1")}>
          <rect
            x={0}
            y={0}
            width={VIEW_WIDTH}
            height={VIEW_HEIGHT}
            fill="var(--venn-shade)"
            clipPath={url("clip-not-c2")}
          />
        </g>
      )
    }

    // Region 2: Y only (¬X ∧ Y)
    if (shadedRegions.includes(2)) {
      regionPaths.push(
        <g key="region-2" clipPath={url("clip-not-c1")}>
          <circle cx={c2.cx} cy={c2.cy} r={c2.r} fill="var(--venn-shade)" />
        </g>
      )
    }

    // Region 3: both (X ∧ Y)
    if (shadedRegions.includes(3)) {
      regionPaths.push(
        <g key="region-3" clipPath={url("clip-c1")}>
          <circle cx={c2.cx} cy={c2.cy} r={c2.r} fill="var(--venn-shade)" />
        </g>
      )
    }
  }

  // For 3 variables: 8 regions
  if (numVars === 3) {
    const [c1, c2, c3] = config.circles

    // Define clip paths with unique IDs
    clipPaths.push(
      <clipPath key="clip-c1" id={id("clip-c1")}>
        <circle cx={c1.cx} cy={c1.cy} r={c1.r} />
      </clipPath>,
      <clipPath key="clip-c2" id={id("clip-c2")}>
        <circle cx={c2.cx} cy={c2.cy} r={c2.r} />
      </clipPath>,
      <clipPath key="clip-c3" id={id("clip-c3")}>
        <circle cx={c3.cx} cy={c3.cy} r={c3.r} />
      </clipPath>,
      <clipPath key="clip-not-c1" id={id("clip-not-c1")}>
        <path
          d={`M 0 0 H ${VIEW_WIDTH} V ${VIEW_HEIGHT} H 0 Z M ${c1.cx} ${c1.cy - c1.r} A ${c1.r} ${c1.r} 0 1 0 ${c1.cx} ${c1.cy + c1.r} A ${c1.r} ${c1.r} 0 1 0 ${c1.cx} ${c1.cy - c1.r} Z`}
          fillRule="evenodd"
        />
      </clipPath>,
      <clipPath key="clip-not-c2" id={id("clip-not-c2")}>
        <path
          d={`M 0 0 H ${VIEW_WIDTH} V ${VIEW_HEIGHT} H 0 Z M ${c2.cx} ${c2.cy - c2.r} A ${c2.r} ${c2.r} 0 1 0 ${c2.cx} ${c2.cy + c2.r} A ${c2.r} ${c2.r} 0 1 0 ${c2.cx} ${c2.cy - c2.r} Z`}
          fillRule="evenodd"
        />
      </clipPath>,
      <clipPath key="clip-not-c3" id={id("clip-not-c3")}>
        <path
          d={`M 0 0 H ${VIEW_WIDTH} V ${VIEW_HEIGHT} H 0 Z M ${c3.cx} ${c3.cy - c3.r} A ${c3.r} ${c3.r} 0 1 0 ${c3.cx} ${c3.cy + c3.r} A ${c3.r} ${c3.r} 0 1 0 ${c3.cx} ${c3.cy - c3.r} Z`}
          fillRule="evenodd"
        />
      </clipPath>
    )

    // Region 0: outside all (¬X ∧ ¬Y ∧ ¬Z)
    if (shadedRegions.includes(0)) {
      regionPaths.push(
        <g key="region-0" clipPath={url("clip-not-c1")}>
          <g clipPath={url("clip-not-c2")}>
            <rect
              x={0}
              y={0}
              width={VIEW_WIDTH}
              height={VIEW_HEIGHT}
              fill="var(--venn-shade)"
              clipPath={url("clip-not-c3")}
            />
          </g>
        </g>
      )
    }

    // Region 1: X only (X ∧ ¬Y ∧ ¬Z)
    if (shadedRegions.includes(1)) {
      regionPaths.push(
        <g key="region-1" clipPath={url("clip-c1")}>
          <g clipPath={url("clip-not-c2")}>
            <rect
              x={0}
              y={0}
              width={VIEW_WIDTH}
              height={VIEW_HEIGHT}
              fill="var(--venn-shade)"
              clipPath={url("clip-not-c3")}
            />
          </g>
        </g>
      )
    }

    // Region 2: Y only (¬X ∧ Y ∧ ¬Z)
    if (shadedRegions.includes(2)) {
      regionPaths.push(
        <g key="region-2" clipPath={url("clip-not-c1")}>
          <g clipPath={url("clip-c2")}>
            <rect
              x={0}
              y={0}
              width={VIEW_WIDTH}
              height={VIEW_HEIGHT}
              fill="var(--venn-shade)"
              clipPath={url("clip-not-c3")}
            />
          </g>
        </g>
      )
    }

    // Region 3: X ∧ Y only (X ∧ Y ∧ ¬Z)
    if (shadedRegions.includes(3)) {
      regionPaths.push(
        <g key="region-3" clipPath={url("clip-c1")}>
          <g clipPath={url("clip-c2")}>
            <rect
              x={0}
              y={0}
              width={VIEW_WIDTH}
              height={VIEW_HEIGHT}
              fill="var(--venn-shade)"
              clipPath={url("clip-not-c3")}
            />
          </g>
        </g>
      )
    }

    // Region 4: Z only (¬X ∧ ¬Y ∧ Z)
    if (shadedRegions.includes(4)) {
      regionPaths.push(
        <g key="region-4" clipPath={url("clip-not-c1")}>
          <g clipPath={url("clip-not-c2")}>
            <circle cx={c3.cx} cy={c3.cy} r={c3.r} fill="var(--venn-shade)" />
          </g>
        </g>
      )
    }

    // Region 5: X ∧ Z only (X ∧ ¬Y ∧ Z)
    if (shadedRegions.includes(5)) {
      regionPaths.push(
        <g key="region-5" clipPath={url("clip-c1")}>
          <g clipPath={url("clip-not-c2")}>
            <circle cx={c3.cx} cy={c3.cy} r={c3.r} fill="var(--venn-shade)" />
          </g>
        </g>
      )
    }

    // Region 6: Y ∧ Z only (¬X ∧ Y ∧ Z)
    if (shadedRegions.includes(6)) {
      regionPaths.push(
        <g key="region-6" clipPath={url("clip-not-c1")}>
          <g clipPath={url("clip-c2")}>
            <circle cx={c3.cx} cy={c3.cy} r={c3.r} fill="var(--venn-shade)" />
          </g>
        </g>
      )
    }

    // Region 7: all three (X ∧ Y ∧ Z)
    if (shadedRegions.includes(7)) {
      regionPaths.push(
        <g key="region-7" clipPath={url("clip-c1")}>
          <g clipPath={url("clip-c2")}>
            <circle cx={c3.cx} cy={c3.cy} r={c3.r} fill="var(--venn-shade)" />
          </g>
        </g>
      )
    }
  }

  return { clipPaths, regionPaths }
}

// ============================================================================
// Component
// ============================================================================

export function VennDiagram({
  variables = 2,
  labels,
  formula,
  regions,
  showLabels = true,
  showRegionLabels = false,
  height = "300px",
  width = "100%",
  caption,
  className = "",
}: VennDiagramProps) {
  // Generate unique ID prefix for this component instance
  const idPrefix = useId().replace(/:/g, "")

  // Determine variable names
  const defaultLabels = {
    1: ["X"],
    2: ["X", "Y"],
    3: ["X", "Y", "Z"],
  }
  const variableNames = labels?.slice(0, variables) ?? defaultLabels[variables]

  // Calculate which regions to shade
  const shadedRegions = useMemo(() => {
    if (regions !== undefined) {
      return regions
    }
    if (formula) {
      return getRegionsToShade(formula, variableNames)
    }
    return []
  }, [formula, regions, variableNames])

  // Generate SVG elements with unique IDs
  const { clipPaths, regionPaths } = useMemo(
    () => generateSVGElements(variables, shadedRegions, idPrefix),
    [variables, shadedRegions, idPrefix]
  )

  const config = CIRCLE_CONFIGS[variables]
  const regionLabelPositions = REGION_LABEL_POSITIONS[variables]

  return (
    <div className={`my-6 ${className}`}>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        style={{ height, width, maxWidth: "100%" }}
        className="border-2 border-primary/30 rounded-lg bg-background"
      >
        <style>
          {`
            :root {
              --venn-shade: rgba(34, 197, 94, 0.4);
              --venn-stroke: #16a34a;
            }
            @media (prefers-color-scheme: dark) {
              :root {
                --venn-shade: rgba(34, 197, 94, 0.3);
              }
            }
          `}
        </style>

        {/* Definitions */}
        <defs>{clipPaths}</defs>

        {/* Universe rectangle background */}
        <rect
          x={0}
          y={0}
          width={VIEW_WIDTH}
          height={VIEW_HEIGHT}
          fill="transparent"
          stroke="var(--venn-stroke)"
          strokeWidth={2}
        />

        {/* Shaded regions */}
        {regionPaths}

        {/* Circle outlines */}
        {config.circles.map((c, i) => (
          <circle
            key={`outline-${i}`}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="none"
            stroke="var(--venn-stroke)"
            strokeWidth={2}
          />
        ))}

        {/* Variable labels */}
        {showLabels &&
          config.labelPositions.map((pos, i) => (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground font-semibold text-lg"
              style={{ fontSize: "18px" }}
            >
              {variableNames[i] || defaultLabels[variables][i]}
            </text>
          ))}

        {/* Region labels (for teaching) */}
        {showRegionLabels &&
          regionLabelPositions.map((pos, i) => (
            <text
              key={`region-label-${i}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-sm"
              style={{ fontSize: "12px" }}
            >
              {i}
            </text>
          ))}
      </svg>

      {/* Caption */}
      {caption && (
        <p className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </p>
      )}
    </div>
  )
}
