import {
  profile,
  skills,
  projects,
  openSourceOrgs,
  proofStats,
  socialLinks,
  writing,
  experience,
  education,
  keyAchievements,
  aboutHighlights,
  certificates,
} from '@/content/content'
import type {
  MemoryRegion,
  SectionConfig,
  ProcessThread,
  ClusterHudSnapshot,
  RpcHealthCheck,
} from './types'

// Canonical content (kept here for backwards-compatible named exports)
export const SOCIAL_LINKS = socialLinks
export const PROOF_STATS = proofStats
export const FEATURED_PROJECTS = projects
export const OPEN_SOURCE_ORGS = openSourceOrgs
export const WRITING = writing
export const PROFILE = profile
export const SKILLS = skills
export const EXPERIENCE = experience
export const EDUCATION = education
export const KEY_ACHIEVEMENTS = keyAchievements
export const ABOUT_HIGHLIGHTS = aboutHighlights
export const CERTIFICATES = certificates

export const CLUSTER_HUD_BASE: ClusterHudSnapshot = {
  network: 'mainnet',
  epochProgress: 0.62,
  slot: 280_000_000,
  tps: 3200,
  latencyMs: { p50: 22, p95: 68 },
  note: 'Demo console (simulated)',
}

export const RPC_HEALTH_BASE: RpcHealthCheck[] = [
  { method: 'getLatestBlockhash', latencyMs: 41, status: 'ok', detail: 'finalized' },
  { method: 'getBlockHeight', latencyMs: 55, status: 'ok', detail: 'height synced' },
  { method: 'getSignaturesForAddress', latencyMs: 132, status: 'warn', detail: 'cached, rate-limited' },
]

export const MEMORY_REGIONS: Record<string, MemoryRegion> = {
  hero: {
    name: 'BOOT',
    segment: '.rodata',
    baseAddr: '0x0000_0000',
    size: '0x0000_0800',
    perms: 'r--',
    checksum: '0xB00T',
    description: 'Bootstrap and initialization',
  },
  projects: {
    name: 'PROJECTS',
    segment: '.text',
    baseAddr: '0x0000_1000',
    size: '0x0000_3000',
    perms: 'r-x',
    checksum: '0xPROJ',
    description: 'Featured work',
  },
  'open-source': {
    name: 'OSS',
    segment: '.data',
    baseAddr: '0x0000_4000',
    size: '0x0000_1000',
    perms: 'rw-',
    checksum: '0x0SS0',
    description: 'Open source contributions',
  },
  writing: {
    name: 'WRITING',
    segment: '.stack',
    baseAddr: '0x0000_5000',
    size: '0x0000_1000',
    perms: 'rw-',
    checksum: '0xWR1T',
    description: 'Notes & posts',
  },
  about: {
    name: 'ABOUT',
    segment: '.rodata',
    baseAddr: '0x0000_0800',
    size: '0x0000_0800',
    perms: 'r--',
    checksum: '0xAB0T',
    description: 'Profile metadata',
  },
  contact: {
    name: 'CONTACT',
    segment: '.heap',
    baseAddr: '0x0000_6800',
    size: '0x0000_0400',
    perms: 'rw-',
    checksum: '0xC0NT',
    description: 'Communication endpoints',
  },
  experience: {
    name: 'RUNLOG',
    segment: '.bss',
    baseAddr: '0x0000_5400',
    size: '0x0000_0800',
    perms: 'rw-',
    checksum: '0xRUN0',
    description: 'Deployment history',
  },
  education: {
    name: 'COHORTS',
    segment: '.data',
    baseAddr: '0x0000_5C00',
    size: '0x0000_0800',
    perms: 'rw-',
    checksum: '0xC0H0',
    description: 'Education & cohorts',
  },
  certificates: {
    name: 'CERTS',
    segment: '.rodata',
    baseAddr: '0x0000_6400',
    size: '0x0000_0400',
    perms: 'r--',
    checksum: '0xC3RT',
    description: 'Signed attestations',
  },
}

export const SECTIONS: SectionConfig[] = [
  { id: 'projects', label: 'Projects', segment: '.text', memoryRegion: MEMORY_REGIONS.projects, addressLabel: '0x1000_PROJECTS' },
  { id: 'open-source', label: 'Open Source', segment: '.data', memoryRegion: MEMORY_REGIONS['open-source'], addressLabel: '0x2000_OSS' },
  { id: 'writing', label: 'Writing', segment: '.stack', memoryRegion: MEMORY_REGIONS.writing, addressLabel: '0x3000_WRITING' },
  { id: 'experience', label: 'Experience', segment: '.bss', memoryRegion: MEMORY_REGIONS.experience, addressLabel: '0x3500_RUNLOG' },
  { id: 'education', label: 'Education', segment: '.data', memoryRegion: MEMORY_REGIONS.education, addressLabel: '0x3800_EDU' },
  { id: 'certificates', label: 'Certificates', segment: '.rodata', memoryRegion: MEMORY_REGIONS.certificates, addressLabel: '0x3C00_CERTS' },
  { id: 'about', label: 'About', segment: '.rodata', memoryRegion: MEMORY_REGIONS.about, addressLabel: '0x4000_ABOUT' },
  { id: 'contact', label: 'Contact', segment: '.heap', memoryRegion: MEMORY_REGIONS.contact, addressLabel: '0x5000_CONTACT' },
]

export const PROCESSES: ProcessThread[] = [
  { id: 'proc-indexer', name: 'indexer_main', status: 'running', cpu: 45, memory: '1.2GB', description: 'Main indexer process' },
  { id: 'proc-geyser', name: 'geyser_client', status: 'running', cpu: 23, memory: '512MB', description: 'Geyser subscription client' },
  { id: 'proc-decoder', name: 'tx_decoder', status: 'sleeping', cpu: 2, memory: '128MB', description: 'Transaction decoder worker' },
  { id: 'proc-mev', name: 'mev_detector', status: 'running', cpu: 38, memory: '768MB', description: 'MEV pattern detector' },
]

export const RPC_METHODS = {
  getLatestBlockhash: { category: 'slot_info', sample: '{ commitment: "finalized" }' },
  getBlockHeight: { category: 'slot_info', sample: '{}' },
  getSignaturesForAddress: { category: 'tx_info', sample: '{ address: "...", limit: 100 }' },
  getTransaction: { category: 'tx_info', sample: '{ signature: "...", encoding: "jsonParsed" }' },
  getProgramAccounts: { category: 'account_info', sample: '{ programId: "..." }' },
} as const
