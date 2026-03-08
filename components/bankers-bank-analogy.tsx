"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface Customer {
  name: string
  deposit: number
  creditLimit: number
}

interface TraceStep {
  customer: string
  loanNeeded: number
  cashBefore: number
  cashAfter: number
}

function computeBankSafety(
  customers: Customer[],
  bankCash: number
): { safe: boolean; sequence: string[]; steps: TraceStep[] } {
  const cash = { value: bankCash }
  const finished = new Array(customers.length).fill(false)
  const sequence: string[] = []
  const steps: TraceStep[] = []

  let found = true
  while (found) {
    found = false
    for (let i = 0; i < customers.length; i++) {
      if (finished[i]) continue
      const needed = customers[i].creditLimit - customers[i].deposit
      if (needed <= cash.value) {
        const before = cash.value
        cash.value += customers[i].deposit
        steps.push({
          customer: customers[i].name,
          loanNeeded: needed,
          cashBefore: before,
          cashAfter: cash.value,
        })
        finished[i] = true
        sequence.push(customers[i].name)
        found = true
      }
    }
  }

  return { safe: finished.every(Boolean), sequence, steps }
}

function fmt(n: number): string {
  return `$${n.toLocaleString()}`
}

interface BankersBankAnalogyProps {
  className?: string
}

export function BankersBankAnalogy({ className }: BankersBankAnalogyProps) {
  const [customers, setCustomers] = useState<Customer[]>([
    { name: "Alice", deposit: 1000, creditLimit: 4000 },
    { name: "Bob", deposit: 2000, creditLimit: 5000 },
    { name: "Charlie", deposit: 1500, creditLimit: 3000 },
  ])
  const [bankCash, setBankCash] = useState(2000)
  const [showTrace, setShowTrace] = useState(false)

  const result = useMemo(
    () => computeBankSafety(customers, bankCash),
    [customers, bankCash]
  )

  const totalDeposited = customers.reduce((s, c) => s + c.deposit, 0)
  const totalLoaned = totalDeposited
  const totalCreditLimits = customers.reduce((s, c) => s + c.creditLimit, 0)

  const updateDeposit = (i: number, val: number) => {
    setCustomers((prev) =>
      prev.map((c, j) => (j === i ? { ...c, deposit: Math.max(0, val) } : c))
    )
  }

  const updateCreditLimit = (i: number, val: number) => {
    setCustomers((prev) =>
      prev.map((c, j) =>
        j === i ? { ...c, creditLimit: Math.max(0, val) } : c
      )
    )
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
        <span className="text-lg">🏦</span>
        {"Dijkstra's Bank — The Original Analogy"}
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        {"You are the bank manager. Each customer has deposited some money and has a credit limit (the max they'll ever need). Your job: never loan out so much cash that you can't guarantee every customer gets their full credit limit eventually."}
      </p>

      {/* Bank vault */}
      <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              Bank Vault (Cash on Hand)
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Total deposited by customers: {fmt(totalLoaned)} &middot;
              Total credit limits: {fmt(totalCreditLimits)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black font-mono text-amber-700 dark:text-amber-300">$</span>
            <input
              type="number"
              min={0}
              step={500}
              value={bankCash}
              onChange={(e) => setBankCash(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 h-9 text-center text-base font-bold border rounded bg-background font-mono"
            />
          </div>
        </div>
      </div>

      {/* Customer cards */}
      <div className="grid gap-3 mb-4">
        {customers.map((c, i) => {
          const loanNeeded = c.creditLimit - c.deposit
          const invalid = loanNeeded < 0
          return (
            <div
              key={i}
              className={cn(
                "border rounded-lg p-3 transition-all",
                invalid && "border-red-400 bg-red-500/5"
              )}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <div className="font-semibold text-sm min-w-[70px]">{c.name}</div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Deposited:</span>
                  <div className="flex items-center">
                    <span className="text-xs font-mono text-muted-foreground mr-0.5">$</span>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={c.deposit}
                      onChange={(e) => updateDeposit(i, parseInt(e.target.value) || 0)}
                      className="w-20 h-7 text-center text-xs border rounded bg-background font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Credit Limit:</span>
                  <div className="flex items-center">
                    <span className="text-xs font-mono text-muted-foreground mr-0.5">$</span>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={c.creditLimit}
                      onChange={(e) => updateCreditLimit(i, parseInt(e.target.value) || 0)}
                      className="w-20 h-7 text-center text-xs border rounded bg-background font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Still needs:</span>
                  <span
                    className={cn(
                      "text-xs font-mono font-bold px-1.5 py-0.5 rounded",
                      invalid
                        ? "text-red-600 bg-red-500/15"
                        : loanNeeded === 0
                          ? "text-emerald-600 bg-emerald-500/15"
                          : "text-amber-700 dark:text-amber-300 bg-amber-500/15"
                    )}
                  >
                    {invalid ? "INVALID" : fmt(loanNeeded)}
                  </span>
                </div>

                {/* Visual bar */}
                <div className="flex-1 min-w-[120px]">
                  <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500/60 transition-all"
                      style={{ width: c.creditLimit > 0 ? `${(c.deposit / c.creditLimit) * 100}%` : "0%" }}
                      title={`Deposited: ${fmt(c.deposit)}`}
                    />
                    <div
                      className="h-full bg-amber-500/40 transition-all"
                      style={{ width: c.creditLimit > 0 ? `${Math.max(0, loanNeeded) / c.creditLimit * 100}%` : "0%" }}
                      title={`Still needs: ${fmt(Math.max(0, loanNeeded))}`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span>$0</span>
                    <span>{fmt(c.creditLimit)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Verdict */}
      <div
        className={cn(
          "rounded-lg border-2 p-4 transition-all",
          result.safe
            ? "border-emerald-500 bg-emerald-500/10"
            : "border-red-500 bg-red-500/10"
        )}
      >
        <div
          className={cn(
            "text-lg font-black mb-1",
            result.safe
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          )}
        >
          {result.safe ? "SAFE — Loans can be honored!" : "UNSAFE — Risk of deadlock!"}
        </div>

        {result.safe ? (
          <div className="text-xs text-muted-foreground">
            <p className="mb-2">
              {"The bank can serve all customers by processing them in this order. Each customer finishes their business and returns their deposit, replenishing the vault for the next:"}
            </p>
            <div className="flex items-center gap-1 font-mono flex-wrap mb-2">
              {result.sequence.map((name, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                    {name}
                  </span>
                  {i < result.sequence.length - 1 && (
                    <span className="text-muted-foreground">{"→"}</span>
                  )}
                </span>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => setShowTrace(!showTrace)}
            >
              {showTrace ? "Hide step-by-step" : "Show step-by-step"}
            </Button>
            {showTrace && (
              <div className="mt-2 pt-2 border-t border-emerald-500/20 space-y-1.5">
                {result.steps.map((s, i) => (
                  <div key={i} className="text-xs font-mono flex items-start gap-2 flex-wrap">
                    <span className="font-bold text-muted-foreground">{i + 1}.</span>
                    <span className="px-1 rounded bg-muted font-semibold">{s.customer}</span>
                    <span>needs {fmt(s.loanNeeded)} loan</span>
                    <span className="text-muted-foreground">|</span>
                    <span>vault has {fmt(s.cashBefore)}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{"✓ granted"}</span>
                    <span className="text-muted-foreground">|</span>
                    <span>customer finishes, returns deposit {"→"} vault now {fmt(s.cashAfter)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-red-700 dark:text-red-300">
            {"The bank doesn't have enough cash to guarantee it can serve everyone. If it loans out more money now, a customer could come asking for their full credit limit and the bank would be stuck — a deadlock!"}
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500/60" />
          <span>Already deposited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-500/40" />
          <span>Still needs (loan remaining)</span>
        </div>
      </div>
    </div>
  )
}
