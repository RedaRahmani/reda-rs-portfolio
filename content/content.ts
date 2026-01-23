import type {
  CertificateEntry,
  EducationEntry,
  ExperienceEntry,
  FeaturedProject,
  OpenSourceOrg,
  Profile,
  ProofStat,
  SocialLink,
  WritingEntry,
} from '@/lib/types'

export const profile: Profile = {
  name: 'Mohamed Reda RAHMANI',
  brand: 'reda.rs',
  headline: 'Smart Contract Engineer + SVM Engineer (Rust)',
  subHeadline: 'Validator-adjacent systems · Observability-first',
  mastery: ['Anchor', 'Pinocchio'],
  location: 'Morocco',
  tagline: 'I build validator-adjacent pipelines, bundlers, and observability that keep Solana data teams ahead of cluster churn.',
  availability: 'Open to Solana infra roles',
  proofLinks: [
    { label: 'Superteam Earn profile', href: 'https://earn.superteam.fun/t/mohamed-reda-partial-81' },
  ],
}

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/RedaRahmani' },
  { id: 'resume', label: 'Resume', href: '/resume.pdf' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-reda-rahmani/' },
  { id: 'x', label: 'X', href: 'https://x.com/MEDRedaRAHMANI' },
  { id: 'email', label: 'Email', href: 'mailto:redarahmani1937@gmail.com' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/RedaRahmani37' },
  { id: 'superteam', label: 'Superteam Earn', href: 'https://earn.superteam.fun/t/mohamed-reda-partial-81' },
]

export const skills: string[] = [
  'Rust',
  'Anchor',
  'Pinocchio (zkSNARKs)',
  'Solana SVM',
  'Geyser/Yellowstone',
  'Kafka',
  'ClickHouse',
  'gRPC',
  'LangChain/LangGraph',
  'RAG',
]

export const keyAchievements: string[] = [
  'ChainSensors: 4th prize in Helius + Light Protocol bounty',
  'Accepted into Arcium Fellowship (ChainSensors)',
  'Superteam Earn bounties completed (proof profile linked)',
  'Rektoff Solana Rust Security Bootcamp (Cohort #3) – ongoing',
]

export const aboutHighlights = [
  { title: 'Rust-first systems', body: 'Validator-adjacent pipelines, bundlers, and SVM tooling built in Rust with guardrails for reorgs.' },
  { title: 'Mastery: Anchor + Pinocchio', body: 'Anchor for on-chain programs; Pinocchio/zk for proof-driven rollups and compression where relevant.' },
  { title: 'Operator empathy', body: 'Runbooks, observability, and safe deploy paths so teams can operate without hand-holding.' },
]

export const projects: FeaturedProject[] = [
  {
    id: 'rlock',
    title: 'RLock',
    problem: 'Complex Solana DeFi flows fail and burn fees when shipped as separate transactions during congestion.',
    whatBuilt: 'An intent-aware bundler that uses a DAG planner with MagicBlock Ephemeral Rollups and L1 fallback to execute bundled flows reliably.',
    tech: ['Rust', 'Anchor', 'Pinocchio', 'Ephemeral Rollups', 'MagicBlock', 'Sealevel'],
    io: 'Intents → Planner → ER/L1 → Settlement',
    impact: 'Open-source bundler with a deep-dive architecture article; built to cut retries for multi-step flows.',
    evidence: {
      repo: 'https://github.com/RedaRahmani/RLock',
      article: 'https://medium.com/@redarahmani1937/rlock-revolutionizing-solana-transactions-with-ephemeral-rollups-and-smart-bundling-c878d3609f66',
    },
    badge: 'Bundling',
  },
  {
    id: 'solana-dex-mev-indexer',
    title: 'Solana DEX MEV Indexer',
    problem: 'MEV and DEX activity is hard to monitor without normalized, low-latency ingest.',
    whatBuilt: 'Rust ingestion + decoding pipeline that streams Yellowstone/Geyser data into Kafka and ClickHouse for MEV/DEX signal extraction.',
    tech: ['Rust', 'Yellowstone gRPC', 'Geyser', 'Kafka', 'ClickHouse', 'gRPC'],
    io: 'RPC/Geyser → Stream → Kafka → ClickHouse → Query/Alerts',
    impact: 'Validator-adjacent indexing ready for real-time dashboards and alerting.',
    evidence: {
      repo: 'https://github.com/RedaRahmani/solana-dex-mev-indexer',
    },
    badge: 'Indexer',
  },
  {
    id: 'chainsensors',
    title: 'ChainSensors (DePIN)',
    problem: 'IoT sensor owners lack a secure marketplace to monetize data with on-chain proofs and low fees.',
    whatBuilt: 'Solana-based IoT data marketplace using Anchor contracts, zk-compression, Walrus storage, and web stack for sensor onboarding and listings.',
    tech: ['Rust', 'Anchor', 'zk-Compression', 'Walrus', 'Next.js', 'NestJS'],
    io: 'Devices → Walrus → Anchor program → Marketplace UI',
    impact: 'Won 4th prize in Helius + Light Protocol bounty; accepted into Arcium Fellowship.',
    evidence: {
      repo: 'https://github.com/RedaRahmani/ChainSensors-V1',
    },
    badge: 'DePIN',
  },
]

export const openSourceOrgs: OpenSourceOrg[] = [
  {
    name: 'DoubleZero',
    order: 1,
    viewAllUrl: 'https://github.com/pulls?q=is%3Apr+org%3Adoublezerofoundation+author%3ARedaRahmani',
    description: 'PRs to DoubleZero Foundation repos (observability and infra tooling).',
  },
  {
    name: 'MalbecLabs',
    order: 2,
    viewAllUrl: 'https://github.com/pulls?q=is%3Apr+author%3ARedaRahmani+org%3Amalbeclabs',
    description: 'Contributions to MalbecLabs codebases.',
  },
  {
    name: 'Triton One',
    order: 3,
    viewAllUrl: 'https://github.com/pulls?q=is%3Apr+org%3Arpcpool+author%3ARedaRahmani',
    description: 'RPCPool / Triton One performance and tooling PRs.',
  },
  {
    name: 'Blueshift',
    order: 4,
    viewAllUrl: 'https://github.com/pulls?q=is%3Apr+org%3Ablueshift-gg+author%3ARedaRahmani',
    description: 'Blueshift Solana ecosystem contributions.',
  },
  {
    name: 'Turbin3',
    order: 5,
    viewAllUrl: 'https://github.com/pulls?q=is%3Apr+org%3ATurbin3+author%3ARedaRahmani',
    description: 'Turbin3 cohort-related Solana PRs.',
  },
]

export const writing: WritingEntry[] = [
  {
    id: 'rlock-article',
    title: 'RLock: Revolutionizing Solana transactions with ephemeral rollups and smart bundling',
    url: 'https://medium.com/@redarahmani1937/rlock-revolutionizing-solana-transactions-with-ephemeral-rollups-and-smart-bundling-c878d3609f66',
    summary: 'Architecture deep dive on intent bundling, DAG planning, and MagicBlock Ephemeral Rollups for Solana.',
    topic: 'PERFORMANCE / SVM / TRANSACTIONS',
    date: '2025-11-06',
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: 'niloom',
    role: 'AI/ML / Backend Developer',
    company: 'Niloom AI',
    location: 'New York · Remote',
    start: 'June 2024',
    end: 'Present',
    bullets: [
      'Integrated multiple LLMs (Claude, Mistral, LLaMA) using LangChain and LangGraph to power AI-driven systems.',
      'Employed vector embeddings for similarity search in a 3D model database, improving retrieval efficiency.',
      'Developed autonomous workflows using advanced chaining and prompt engineering for dynamic task orchestration.',
      'Applied RAG techniques to optimize LLM responses, reducing average response time.',
      'Created and ran unit tests to ensure reliability of AI models and API integrations.',
    ],
  },
  {
    id: 'arkx',
    role: 'MERN Stack Developer (Bootcamp)',
    company: 'Ark X',
    location: 'Remote',
    start: 'January 2024',
    end: 'June 2024',
    bullets: [
      'Built full-stack web applications using MongoDB, Express.js, React, Node.js (MERN) through an intensive bootcamp.',
      'Designed scalable database schemas, improving query performance.',
      'Developed high-performance server-side applications and integrated real-time data processing.',
      'Created interactive user interfaces with React, enhancing user engagement.',
    ],
  },
  {
    id: 'alx',
    role: 'Software Engineer (Bootcamp)',
    company: 'ALX Africa',
    location: 'Remote',
    start: 'February 2023',
    end: 'April 2024',
    bullets: [
      'Developed full-stack web applications using HTML, CSS, JavaScript, React, Next.js, Node.js, Express.js.',
      'Built and deployed server-side applications with Python and Java frameworks (Boot / Django, Flask).',
      'Designed and maintained SQL and NoSQL databases, optimizing performance.',
      'Gained critical thinking, problem-solving, and communication skills through team-based projects.',
    ],
  },
  {
    id: 'pentester',
    role: 'Junior Pentester (Internship)',
    company: 'Security Internship',
    location: 'Remote',
    start: 'April 2023',
    end: 'July 2023',
    bullets: [
      'Conducted penetration tests and vulnerability scans, identifying security issues.',
      'Helped build an IPS/IDS to proactively detect and block threats.',
      'Recommended and implemented remediation measures, reducing vulnerabilities.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'alx-edu',
    program: 'Software Engineering Program',
    org: 'ALX Africa',
    start: 'February 2023',
    end: 'April 2024',
    status: 'completed',
  },
  {
    id: 'est-oujda',
    program: 'Bachelor in Engineering and Security of Networks',
    org: 'EST Oujda',
    start: 'August 2022',
    end: 'July 2023',
    status: 'completed',
  },
  {
    id: 'iest-oujda',
    program: 'DUT: Administrator of Networks and Systems',
    org: 'IEST Oujda',
    start: 'August 2020',
    end: 'July 2022',
    status: 'completed',
  },
  {
    id: 'turbin3-builders',
    program: 'Builders Cohort',
    org: 'Turbin3',
    status: 'completed',
  },
  {
    id: 'turbin3-advanced-svm',
    program: 'Advanced SVM Cohort',
    org: 'Turbin3',
    status: 'completed',
  },
  {
    id: 'blueshift',
    program: 'Solana Ecosystem Cohort / Training',
    org: 'Blueshift',
    status: 'completed',
  },
  {
    id: 'rektoff',
    program: 'Solana Rust Security Bootcamp (Cohort No. 3)',
    org: 'Rektoff',
    status: 'ongoing',
    detail: 'Focus: low-level Rust, Solana smart contracts, security, auditing skills',
    proofUrl: 'https://x.com/MEDRedaRAHMANI/status/2011150732091933008',
  },
]

export const proofStats: ProofStat[] = [
  { label: 'Projects', value: projects.length.toString() },
  { label: 'Writing', value: writing.length.toString() },
  { label: 'Open Source Orgs', value: openSourceOrgs.length.toString() },
  { label: 'Location', value: profile.location },
  { label: 'Open to', value: profile.availability },
]

export const certificates: CertificateEntry[] = [
  {
    id: 'ccna-intro',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco / Credly',
    verifyUrl: 'https://www.credly.com/badges/0141b8cb-afe4-4ed5-9924-1d5c22b2ad93/linked_in_profile',
  },
  {
    id: 'ccna-security',
    title: 'CCNA: Network Security',
    issuer: 'Cisco / Credly',
    verifyUrl: 'https://www.credly.com/badges/9f9b6f35-4eb8-4459-a2c6-a362153a3092/linked_in_profile',
  },
  {
    id: 'ccna-switching',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco / Credly',
    verifyUrl: 'https://www.credly.com/badges/86195ce1-bab3-4a28-997f-d5177a9015ab/linked_in_profile',
  },
  {
    id: 'ccna-enterprise',
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco / Credly',
    verifyUrl: 'https://www.credly.com/badges/37f82ef5-39ff-492c-8f77-fac47b861429/linked_in_profile',
  },
]
