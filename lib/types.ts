// ============================================================================
// Solana Validator Memory Inspector - Type Definitions
// ============================================================================

// Memory Region Types - Maps portfolio sections to memory segments
export interface MemoryRegion {
  name: string
  segment: '.text' | '.data' | '.bss' | '.stack' | '.heap' | '.rodata'
  baseAddr: string
  size: string
  perms: 'r--' | 'rw-' | 'r-x' | 'rwx'
  checksum: string
  description: string
}

// RPC Trace Event - Simulated JSON-RPC calls
export interface RpcTraceEvent {
  id: string
  ts: number
  method: string
  paramsSummary: string
  correlationId?: string
  duration?: number
  status: 'pending' | 'success' | 'error'
}

// Kernel Log Event - Low-level system logs
export interface KernelLogEvent {
  id: string
  ts: number
  level: 'debug' | 'info' | 'warn' | 'error' | 'trace'
  source: 'mem' | 'alloc' | 'dealloc' | 'inspect' | 'syscall' | 'validator'
  msg: string
}

// Cluster State - Solana validator state simulation
export interface ClusterState {
  epoch: number
  slot: number
  blockHeight: number
  root: number
  confirmedSlot: number
  finalizedSlot: number
  leader: string
  skippedSlots: number
  transactionCount: number
  tps: number
  health: 'healthy' | 'behind' | 'delinquent'
}

// TPU Pipeline Stage
export interface TpuStage {
  name: 'fetch' | 'sigverify' | 'banking' | 'broadcast'
  queueDepth: number
  throughput: number // tx/s
  status: 'active' | 'idle' | 'congested'
}

// TPU Pipeline State
export interface TpuPipelineState {
  fetch: TpuStage
  sigverify: TpuStage
  banking: TpuStage
  broadcast: TpuStage
}

// Tower / Consensus State
export interface TowerState {
  lastVoteSlot: number
  towerHeight: number
  lockoutDepth: number
  forkChoiceId: string
  stakeWeight: number // percentage
  rootDistance: number
}

// DeFi Event Types
export type DexType = 'raydium' | 'orca' | 'phoenix' | 'jupiter' | 'meteora'
export type SwapType = 'swap' | 'add_liquidity' | 'remove_liquidity' | 'route'
export type DefiFlag = 'large_impact' | 'arb_candidate' | 'sandwich_risk' | 'whale' | 'new_token'

export interface DefiEvent {
  id: string
  ts: number
  slot: number
  dex: DexType
  signature: string
  type: SwapType
  fields: {
    tokenIn: string
    tokenOut: string
    amountIn: string
    amountOut: string
    priceImpact?: number
    route?: string[]
  }
  flags: DefiFlag[]
}

// Validator Internal Stage References
export type ValidatorStage = 
  | 'gossip'
  | 'tpu'
  | 'sigverify'
  | 'banking'
  | 'accounts_db'
  | 'replay'
  | 'rpc'
  | 'snapshot'
  | 'ledger'

// RPC Method Categories
export type RpcMethodCategory = 
  | 'slot_info'     // getSlot, getEpochInfo, getBlockHeight
  | 'block_info'    // getBlock, getBlocks, getBlockTime
  | 'account_info'  // getAccountInfo, getBalance, getProgramAccounts
  | 'tx_info'       // getTransaction, getSignatureStatuses, getSignaturesForAddress
  | 'subscription'  // accountSubscribe, programSubscribe, logsSubscribe
  | 'node_info'     // getHealth, getVersion, getClusterNodes

// Portfolio Item - Enhanced with Solana metaphors
export interface PortfolioItem {
  id: string
  kind: 'project' | 'oss' | 'writeup'
  title: string
  description: string
  tags: string[]
  
  // Memory mapping
  memoryRegion: MemoryRegion
  
  // Solana relationships
  relatedRpcMethods: string[]
  relatedValidatorStages: ValidatorStage[]
  relatedDefiConcepts?: string[]
  
  // Project-specific
  stack?: string[]
  metrics?: { label: string; value: string; simulated?: boolean }[]
  architecture?: string
  whatBuilt?: string
  lessons?: string
  links?: { github?: string; demo?: string; article?: string }
  
  // DeFi-specific (for relevant projects)
  decodedInstruction?: {
    program: string
    name: string
    accounts: { name: string; pubkey: string }[]
    data: Record<string, unknown>
  }
}

// Section Configuration
export interface SectionConfig {
  id: string
  label: string
  segment: string
  memoryRegion: MemoryRegion
  addressLabel?: string
}

// Process / Thread simulation
export interface ProcessThread {
  id: string
  name: string
  status: 'running' | 'sleeping' | 'blocked' | 'zombie'
  cpu: number
  memory: string
  description: string
}

// Global App State
export interface AppState {
  activeSection: string
  hoveredItem: string | null
  selectedItem: PortfolioItem | null
  inspectorOpen: boolean
  
  // Cluster simulation
  cluster: ClusterState
  tower: TowerState
  tpuPipeline: TpuPipelineState
  
  // Logs
  rpcTrace: RpcTraceEvent[]
  kernelLogs: KernelLogEvent[]
  defiEvents: DefiEvent[]
  activity: ActivityEvent[]
  
  // UI state
  consoleTab: 'clock' | 'tpu' | 'tower' | 'rpc' | 'defi'
  hexdumpGoToAddress: string | null
  highlightedMemoryRange: { start: string; end: string } | null
}

// Action types for state management
export type AppAction =
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_HOVERED_ITEM'; payload: string | null }
  | { type: 'SET_SELECTED_ITEM'; payload: PortfolioItem | null }
  | { type: 'SET_INSPECTOR_OPEN'; payload: boolean }
  | { type: 'UPDATE_CLUSTER'; payload: Partial<ClusterState> }
  | { type: 'UPDATE_TOWER'; payload: Partial<TowerState> }
  | { type: 'UPDATE_TPU'; payload: Partial<TpuPipelineState> }
  | { type: 'ADD_RPC_TRACE'; payload: RpcTraceEvent }
  | { type: 'ADD_KERNEL_LOG'; payload: KernelLogEvent }
  | { type: 'ADD_DEFI_EVENT'; payload: DefiEvent }
  | { type: 'ADD_ACTIVITY'; payload: ActivityEvent }
  | { type: 'CLEAR_LOGS' }
  | { type: 'SET_CONSOLE_TAB'; payload: AppState['consoleTab'] }
  | { type: 'HIGHLIGHT_MEMORY'; payload: { start: string; end: string } | null }
  | { type: 'GOTO_ADDRESS'; payload: string | null }
  | { type: 'TICK_SLOT' }

export interface SocialLink {
  id: 'github' | 'linkedin' | 'resume' | 'email' | 'x' | 'telegram' | 'superteam'
  label: string
  href: string
}

export interface ProofStat {
  label: string
  value: string
  hint?: string
}

export interface ProjectEvidence {
  repo: string
  article?: string
  website?: string
  docs?: string
  demo?: string
  note?: string
}

export interface FeaturedProject {
  id: string
  title: string
  problem: string
  whatBuilt: string
  tech: string[]
  io: string
  impact: string
  evidence: ProjectEvidence
  badge?: string
  owned?: string
}

export interface OpenSourcePR {
  id: string
  project: string
  summary: string
  repo: string
  pr: string
  status: 'merged' | 'open' | 'draft'
}

export interface WritingEntry {
  id: string
  title: string
  url: string
  summary: string
  topic: string
  readingTime?: string
  date?: string
}

export interface Profile {
  name: string
  brand?: string
  headline: string
  subHeadline?: string
  mastery: string[]
  location: string
  tagline: string
  availability: string
  proofLinks?: { label: string; href: string }[]
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  bullets: string[]
}

export interface EducationEntry {
  id: string
  program: string
  org: string
  start?: string
  end?: string
  detail?: string
  proofUrl?: string
  status?: 'completed' | 'ongoing'
}

export interface OpenSourceOrg {
  name: string
  order: number
  viewAllUrl: string
  description: string
  highlights?: { label: string; url: string }[]
}

export interface OpenSourceHighlight {
  id: string
  org: string
  summary: string
  url: string
}

export interface CertificateEntry {
  id: string
  title: string
  issuer: string
  verifyUrl: string
}

export interface ClusterHudSnapshot {
  network: 'mainnet' | 'devnet'
  epochProgress: number
  slot: number
  tps: number
  latencyMs: { p50: number; p95: number }
  note?: string
}

export interface RpcHealthCheck {
  method: string
  latencyMs: number
  status: 'ok' | 'warn' | 'error'
  detail: string
}

export interface ActivityEvent {
  id: string
  ts: number
  kind: 'nav' | 'mode' | 'action'
  message: string
}
