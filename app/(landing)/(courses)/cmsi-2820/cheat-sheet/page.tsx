export default function CheatSheet() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">
        CMSI 2820: Algorithm Design Cheat Sheet
      </h1>

      <div className="space-y-8">
        {/* Logic Section */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Logic & Propositions</h2>
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
                      <td className="py-2 px-4">True only if both are true</td>
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
                  <span className="font-mono">¬(¬p) ≡ p</span> (Double Negation)
                </li>
                <li>
                  <span className="font-mono">p ∧ q ≡ q ∧ p</span> (Commutative)
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

        {/* Number Theory Section */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Number Theory</h2>
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
                  <span className="font-mono">a ≡ b (mod m)</span> means m | (a
                  - b)
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

        {/* Set Theory Section */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Set Theory</h2>
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
                      <td className="py-2 px-4">Elements in A but not in B</td>
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

        {/* Functions Section */}
        <section className="border rounded-lg p-6 bg-muted/30">
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

        {/* Combinatorics Section */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Combinatorics</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2 px-4">Complexity</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Example Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">O(1)</td>
                  <td className="py-2 px-4">Constant</td>
                  <td className="py-2 px-4">Array access, hash table lookup</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">O(log n)</td>
                  <td className="py-2 px-4">Logarithmic</td>
                  <td className="py-2 px-4">
                    Binary search, balanced tree operations
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">O(n)</td>
                  <td className="py-2 px-4">Linear</td>
                  <td className="py-2 px-4">Linear search, array traversal</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4">Linearithmic</td>
                  <td className="py-2 px-4">
                    Merge sort, heap sort, quick sort (avg)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4">Quadratic</td>
                  <td className="py-2 px-4">
                    Bubble sort, insertion sort, selection sort
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">O(n³)</td>
                  <td className="py-2 px-4">Cubic</td>
                  <td className="py-2 px-4">Matrix multiplication (naive)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono">O(2ⁿ)</td>
                  <td className="py-2 px-4">Exponential</td>
                  <td className="py-2 px-4">
                    Recursive fibonacci, backtracking
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sorting Algorithms */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Sorting Algorithms</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2 px-4">Algorithm</th>
                  <th className="text-left py-2 px-4">Best</th>
                  <th className="text-left py-2 px-4">Average</th>
                  <th className="text-left py-2 px-4">Worst</th>
                  <th className="text-left py-2 px-4">Space</th>
                  <th className="text-left py-2 px-4">Stable</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-semibold">Bubble Sort</td>
                  <td className="py-2 px-4 font-mono">O(n)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(1)</td>
                  <td className="py-2 px-4">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-semibold">Insertion Sort</td>
                  <td className="py-2 px-4 font-mono">O(n)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(1)</td>
                  <td className="py-2 px-4">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-semibold">Selection Sort</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(1)</td>
                  <td className="py-2 px-4">No</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-semibold">Merge Sort</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n)</td>
                  <td className="py-2 px-4">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-semibold">Quick Sort</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n²)</td>
                  <td className="py-2 px-4 font-mono">O(log n)</td>
                  <td className="py-2 px-4">No</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Heap Sort</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(n log n)</td>
                  <td className="py-2 px-4 font-mono">O(1)</td>
                  <td className="py-2 px-4">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Data Structures */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Data Structures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Array</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono">Access:</span> O(1)
                </li>
                <li>
                  <span className="font-mono">Search:</span> O(n)
                </li>
                <li>
                  <span className="font-mono">Insert:</span> O(n)
                </li>
                <li>
                  <span className="font-mono">Delete:</span> O(n)
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Linked List</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono">Access:</span> O(n)
                </li>
                <li>
                  <span className="font-mono">Search:</span> O(n)
                </li>
                <li>
                  <span className="font-mono">Insert:</span> O(1)
                </li>
                <li>
                  <span className="font-mono">Delete:</span> O(1)
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Hash Table</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono">Access:</span> N/A
                </li>
                <li>
                  <span className="font-mono">Search:</span> O(1)*
                </li>
                <li>
                  <span className="font-mono">Insert:</span> O(1)*
                </li>
                <li>
                  <span className="font-mono">Delete:</span> O(1)*
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Binary Search Tree</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono">Access:</span> O(log n)*
                </li>
                <li>
                  <span className="font-mono">Search:</span> O(log n)*
                </li>
                <li>
                  <span className="font-mono">Insert:</span> O(log n)*
                </li>
                <li>
                  <span className="font-mono">Delete:</span> O(log n)*
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Heap</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono">Find Min/Max:</span> O(1)
                </li>
                <li>
                  <span className="font-mono">Insert:</span> O(log n)
                </li>
                <li>
                  <span className="font-mono">Delete Min/Max:</span> O(log n)
                </li>
                <li>
                  <span className="font-mono">Heapify:</span> O(n)
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Graph (Adjacency List)</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono">Space:</span> O(V + E)
                </li>
                <li>
                  <span className="font-mono">Add Vertex:</span> O(1)
                </li>
                <li>
                  <span className="font-mono">Add Edge:</span> O(1)
                </li>
                <li>
                  <span className="font-mono">Check Adjacent:</span> O(V)
                </li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            * Average case; worst case may differ
          </p>
        </section>

        {/* Graph Algorithms */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Graph Algorithms</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Breadth-First Search (BFS)</h3>
              <p className="text-sm text-muted-foreground">
                Time: O(V + E) | Space: O(V)
              </p>
              <p className="text-sm mt-1">
                Use for: Shortest path in unweighted graphs, level-order
                traversal
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Depth-First Search (DFS)</h3>
              <p className="text-sm text-muted-foreground">
                Time: O(V + E) | Space: O(V)
              </p>
              <p className="text-sm mt-1">
                Use for: Topological sort, cycle detection, strongly connected
                components
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">Dijkstra's Algorithm</h3>
              <p className="text-sm text-muted-foreground">
                Time: O((V + E) log V) | Space: O(V)
              </p>
              <p className="text-sm mt-1">
                Use for: Shortest path in weighted graphs with non-negative
                weights
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold">Bellman-Ford Algorithm</h3>
              <p className="text-sm text-muted-foreground">
                Time: O(VE) | Space: O(V)
              </p>
              <p className="text-sm mt-1">
                Use for: Shortest path with negative weights, detects negative
                cycles
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold">Prim's Algorithm</h3>
              <p className="text-sm text-muted-foreground">
                Time: O(E log V) | Space: O(V)
              </p>
              <p className="text-sm mt-1">Use for: Minimum spanning tree</p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="font-semibold">Kruskal's Algorithm</h3>
              <p className="text-sm text-muted-foreground">
                Time: O(E log E) | Space: O(V)
              </p>
              <p className="text-sm mt-1">Use for: Minimum spanning tree</p>
            </div>
          </div>
        </section>

        {/* Algorithm Paradigms */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Algorithm Paradigms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Divide and Conquer</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Break problem into subproblems, solve recursively, combine
                solutions
              </p>
              <p className="text-xs font-semibold">Examples:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                <li>Merge Sort</li>
                <li>Quick Sort</li>
                <li>Binary Search</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Dynamic Programming</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Solve by combining solutions to overlapping subproblems
              </p>
              <p className="text-xs font-semibold">Examples:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                <li>Fibonacci Sequence</li>
                <li>Knapsack Problem</li>
                <li>Longest Common Subsequence</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Greedy Algorithms</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Make locally optimal choice at each step
              </p>
              <p className="text-xs font-semibold">Examples:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                <li>Huffman Coding</li>
                <li>Dijkstra's Algorithm</li>
                <li>Activity Selection</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Backtracking</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Build solution incrementally, abandon when constraints violated
              </p>
              <p className="text-xs font-semibold">Examples:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                <li>N-Queens Problem</li>
                <li>Sudoku Solver</li>
                <li>Subset Sum</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="border rounded-lg p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Quick Tips</h2>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Always consider time and space trade-offs</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                Test edge cases: empty input, single element, duplicates
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                For optimization problems, consider greedy first, then DP
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                Use appropriate data structures (hash maps for O(1) lookup)
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                Master patterns: two pointers, sliding window, binary search
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
