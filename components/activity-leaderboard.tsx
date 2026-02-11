"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Trophy } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type {
  ActivityLeaderboardData,
  ActivityClassResult,
  TeamStageScore,
} from "@/lib/courses/cmsi-3510/activity-leaderboard-types"

interface ActivityLeaderboardProps {
  data: ActivityLeaderboardData
}

type RankBy = "total" | "perStudent"

function formatTeamScore(
  team: TeamStageScore,
  teamIndex: number,
  showRole: boolean
): string {
  const roleLabel = showRole && team.role ? ` (${team.role === "data" ? "Data" : "Task"})` : ""
  const base = `Team ${teamIndex + 1}${roleLabel}: ${team.count}`
  if (team.timeToCompleteMinutes != null) {
    return `${base} in ${team.timeToCompleteMinutes} min`
  }
  return base
}

function LeaderboardRow({
  result,
  isChampion,
  showRole,
  isExpanded,
  onExpandedChange,
}: {
  result: ActivityClassResult
  isChampion: boolean
  showRole: boolean
  isExpanded: boolean
  onExpandedChange: (open: boolean) => void
}) {
  const perStudent =
    result.studentCount > 0
      ? (result.totalProduction / result.studentCount).toFixed(1)
      : "—"
  const hasStages = result.stages && result.stages.length > 0

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden",
        isChampion && "ring-2 ring-orange-500/50"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 p-3 sm:p-4",
          isChampion ? "bg-orange-500/10" : "bg-muted/30"
        )}
      >
        <Collapsible open={isExpanded} onOpenChange={onExpandedChange}>
          <div className="flex flex-1 flex-wrap items-center gap-3 gap-y-2">
            {hasStages && (
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex size-6 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={isExpanded ? "Collapse breakdown" : "Expand breakdown"}
                >
                  {isExpanded ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>
              </CollapsibleTrigger>
            )}
            <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{result.semester}</span>
                {isChampion && (
                  <span className="inline-flex items-center gap-1 rounded bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300">
                    <Trophy className="size-3" />
                    Champion
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {result.studentCount} students
              </span>
              <span className="text-sm font-medium">{result.totalProduction}</span>
              <span className="text-sm text-muted-foreground">
                {perStudent}/student
              </span>
            </div>
          </div>
          {hasStages && (
            <CollapsibleContent>
              <div className="border-t bg-background/50 px-4 py-3">
                <div className="space-y-2 text-sm">
                  {result.stages!.map((stage) => (
                    <div
                      key={stage.stageNumber}
                      className="flex flex-wrap gap-x-4 gap-y-1"
                    >
                      <span className="font-medium">
                        Stage {stage.stageNumber} ({stage.stageLabel})
                        {stage.durationMinutes != null && (
                          <span className="ml-1 font-normal text-muted-foreground">
                            ({stage.durationMinutes} min)
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground">
                        {stage.teams
                          .map((t, i) =>
                            formatTeamScore(t, i, showRole ?? false)
                          )
                          .join(" | ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    </div>
  )
}

export function ActivityLeaderboard({ data }: ActivityLeaderboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rankBy, setRankBy] = useState<RankBy>("total")
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const sortedResults = useMemo(() => {
    const results = [...data.results]
    if (rankBy === "total") {
      results.sort((a, b) => b.totalProduction - a.totalProduction)
    } else {
      results.sort((a, b) => {
        const aPer = a.studentCount > 0 ? a.totalProduction / a.studentCount : 0
        const bPer = b.studentCount > 0 ? b.totalProduction / b.studentCount : 0
        return bPer - aPer
      })
    }
    return results
  }, [data.results, rankBy])

  if (data.results.length === 0) {
    return (
      <div className="mb-6 rounded-lg border-2 border-orange-500/30 bg-orange-500/5 p-6">
        <p className="text-center text-muted-foreground">
          Be the first to set the record!
        </p>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Complete this activity and add your class stats to the leaderboard.
        </p>
      </div>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="mb-6 rounded-lg border-2 border-orange-500/30 bg-orange-500/5 overflow-hidden">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-orange-500/10 transition-colors"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse leaderboard" : "Expand leaderboard"}
          >
            <span className="font-semibold">
              See how past classes performed
            </span>
            {isOpen ? (
              <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-orange-500/20 p-4 space-y-4">
            {data.activityTitle && (
              <h3 className="text-lg font-semibold">{data.activityTitle}</h3>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-muted-foreground">Rank by:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRankBy("total")}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    rankBy === "total"
                      ? "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  Total
                </button>
                <button
                  type="button"
                  onClick={() => setRankBy("perStudent")}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    rankBy === "perStudent"
                      ? "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  Per Student
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {sortedResults.map((result, index) => (
                <LeaderboardRow
                  key={result.semester}
                  result={result}
                  isChampion={index === 0}
                  showRole={data.showRole ?? false}
                  isExpanded={expandedIndex === index}
                  onExpandedChange={(open) =>
                    setExpandedIndex(open ? index : null)
                  }
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
