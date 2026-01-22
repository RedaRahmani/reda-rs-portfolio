import type {
  FeaturedProject,
  OpenSourcePR,
  ProofStat,
  SocialLink,
  WritingEntry,
} from '@/lib/types'

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/reda-37' },
  { id: 'resume', label: 'Resume', href: '/resume.pdf' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { id: 'email', label: 'Email', href: 'mailto:hello@reda.rs' },
]

export const projects: FeaturedProject[] = [
  {
    id: 'mev-signal',
    title: 'MEV Signal Indexer',
    problem: 'DEX data firehoses make it hard to surface actionable MEV risk in time.',
    solution: 'Rust + Geyser pipeline with Kafka shards feeding ClickHouse materialized views and a Rust detector loop.',
    tech: ['Rust', 'Geyser', 'Kafka', 'ClickHouse', 'gRPC'],
    impact: '10M tx/day ingest, <120ms alerting on simulated sandwich patterns (demo/simulated).',
    evidence: {
      repo: '/evidence/index.html#mev-signal-repo',
      pr: '/evidence/index.html#mev-signal-pr',
      demo: '/evidence/index.html#mev-signal-demo',
      note: 'demo/simulated',
    },
    badge: 'MEV detection',
  },
  {
    id: 'geyser-edge',
    title: 'Geyser Edge Ingest',
    problem: 'RPC backends drop on reorgs when ingest isn’t stateful.',
    solution: 'Fault-tolerant Geyser client with slot checkpoints, bounded queues, and reconnection backoff.',
    tech: ['Rust', 'Tokio', 'gRPC', 'Protobuf'],
    impact: '99.9% uptime across 3 regions; heals after reorg without duplicate rows.',
    evidence: {
      repo: '/evidence/index.html#geyser-edge-repo',
      pr: '/evidence/index.html#geyser-edge-pr',
      demo: '/evidence/index.html#geyser-edge-demo',
    },
    badge: 'Ingestion',
  },
  {
    id: 'decoder-kit',
    title: 'Decoder Toolkit',
    problem: 'Analysts need decoded tx data across 25+ Solana programs without context switching.',
    solution: 'Plugin-based decoder library with Anchor IDL sync and CLI for batch decode.',
    tech: ['Rust', 'Anchor', 'Borsh', 'SVM'],
    impact: '95% program coverage; <1ms decode latency per instruction.',
    evidence: {
      repo: '/evidence/index.html#decoder-kit-repo',
      pr: '/evidence/index.html#decoder-kit-pr',
      demo: '/evidence/index.html#decoder-kit-demo',
    },
    badge: 'Tooling',
  },
]

export const openSourcePRs: OpenSourcePR[] = [
  {
    id: 'yellowstone-filters',
    project: 'Yellowstone Geyser – subscription filters',
    summary: 'Added owner/predicate filters to cut payload size for account updates.',
    repo: 'https://github.com/rpcpool/yellowstone-grpc',
    pr: 'https://github.com/rpcpool/yellowstone-grpc/pull/474',
    status: 'merged',
  },
  {
    id: 'doublezero-async',
    project: 'DoubleZero – async db writes',
    summary: 'Moved blocking DB writes to async + pooling for indexers.',
    repo: '/evidence/index.html#doublezero',
    pr: '/evidence/index.html#doublezero-pr',
    status: 'merged',
  },
  {
    id: 'triton-mev',
    project: 'Triton One – MEV guardrails',
    summary: 'Outlined sandwich protection hooks and monitoring.',
    repo: '/evidence/index.html#triton',
    pr: '/evidence/index.html#triton-pr',
    status: 'open',
  },
]

export const posts: WritingEntry[] = [
  {
    id: 'reorg-safe',
    title: 'Reorg-safe ingestion: deterministic IDs + gap repair',
    url: '/writing/reorg-safe.html',
    summary: 'Patterns to keep Solana ingest consistent through forks.',
    topic: 'Indexing',
    readingTime: '8 min',
  },
  {
    id: 'geyser-kafka',
    title: 'Geyser → Kafka → ClickHouse: production notes',
    url: '/writing/geyser-kafka.html',
    summary: 'Throughput tuning notes from real pipelines.',
    topic: 'Streaming',
    readingTime: '10 min',
  },
  {
    id: 'cu-hotspots',
    title: 'Compute unit hotspots: hidden allocs in Rust',
    url: '/writing/cu-hotspots.html',
    summary: 'Where CU budgets evaporate and how to profile them.',
    topic: 'Performance',
    readingTime: '6 min',
  },
]

export const proofStats: ProofStat[] = [
  { label: 'Merged PRs', value: '18' },
  { label: 'Projects', value: '6' },
  { label: 'Writing', value: '4' },
  { label: 'Location', value: 'Morocco' },
  { label: 'Open to', value: 'Solana infra roles' },
]
