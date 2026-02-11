export interface TeamStageScore {
  count: number
  role?: "data" | "task" // AC1 only: Data Parallel vs Task Parallel
  /** For stages with defined endings (e.g. AC3 Character, Network):
   *  time to complete in minutes. Omit if team didn't finish - count is more representative. */
  timeToCompleteMinutes?: number
}

export interface StageResult {
  stageNumber: number
  stageLabel: string // "Sanbou-box" | "Batch" | "Block Devices" | etc.
  teams: TeamStageScore[]
  /** How long the stage ran (minutes). Varies by semester (15 vs 20 min, etc.).
   *  Enables "X in 15 min" vs "Y in 20 min" comparisons and per-minute normalization. */
  durationMinutes?: number
}

export interface ActivityClassResult {
  semester: string
  studentCount: number
  totalProduction: number
  stages?: StageResult[]
}

export interface ActivityLeaderboardData {
  activityTitle?: string
  results: ActivityClassResult[]
  /** When true, show Data/Task role in breakdown - AC1 only */
  showRole?: boolean
}
