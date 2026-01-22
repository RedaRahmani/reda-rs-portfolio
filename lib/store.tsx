'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import type {
  AppState,
  AppAction,
  ClusterState,
  TowerState,
  TpuPipelineState,
  RpcTraceEvent,
  KernelLogEvent,
  DefiEvent,
  DexType,
  DefiFlag,
  ActivityEvent,
} from './types'

// Initial cluster state - simulates a Solana validator
const initialClusterState: ClusterState = {
  epoch: 625,
  slot: 280_000_000,
  blockHeight: 265_000_000,
  root: 279_999_968,
  confirmedSlot: 279_999_990,
  finalizedSlot: 279_999_968,
  leader: 'VAL1...xyz',
  skippedSlots: 0,
  transactionCount: 0,
  tps: 3500,
  health: 'healthy',
}

const initialTowerState: TowerState = {
  lastVoteSlot: 280_000_000,
  towerHeight: 32,
  lockoutDepth: 31,
  forkChoiceId: 'FORK_A',
  stakeWeight: 67.5,
  rootDistance: 32,
}

const initialTpuPipeline: TpuPipelineState = {
  fetch: { name: 'fetch', queueDepth: 150, throughput: 4200, status: 'active' },
  sigverify: { name: 'sigverify', queueDepth: 80, throughput: 4100, status: 'active' },
  banking: { name: 'banking', queueDepth: 45, throughput: 3800, status: 'active' },
  broadcast: { name: 'broadcast', queueDepth: 20, throughput: 3500, status: 'active' },
}

const initialState: AppState = {
  activeSection: 'projects',
  hoveredItem: null,
  selectedItem: null,
  inspectorOpen: false,
  cluster: initialClusterState,
  tower: initialTowerState,
  tpuPipeline: initialTpuPipeline,
  rpcTrace: [],
  kernelLogs: [],
  defiEvents: [],
  activity: [],
  consoleTab: 'clock',
  hexdumpGoToAddress: null,
  highlightedMemoryRange: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload }
    case 'SET_HOVERED_ITEM':
      return { ...state, hoveredItem: action.payload }
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload }
    case 'SET_INSPECTOR_OPEN':
      return { ...state, inspectorOpen: action.payload }
    case 'UPDATE_CLUSTER':
      return { ...state, cluster: { ...state.cluster, ...action.payload } }
    case 'UPDATE_TOWER':
      return { ...state, tower: { ...state.tower, ...action.payload } }
    case 'UPDATE_TPU':
      return { ...state, tpuPipeline: { ...state.tpuPipeline, ...action.payload } }
    case 'ADD_RPC_TRACE':
      return {
        ...state,
        rpcTrace: [action.payload, ...state.rpcTrace].slice(0, 100), // Keep last 100
      }
    case 'ADD_KERNEL_LOG':
      return {
        ...state,
        kernelLogs: [action.payload, ...state.kernelLogs].slice(0, 100),
      }
    case 'ADD_DEFI_EVENT':
      return {
        ...state,
        defiEvents: [action.payload, ...state.defiEvents].slice(0, 50),
      }
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activity: [action.payload, ...state.activity].slice(0, 80),
      }
    case 'CLEAR_LOGS':
      return { ...state, rpcTrace: [], kernelLogs: [], defiEvents: [] }
    case 'SET_CONSOLE_TAB':
      return { ...state, consoleTab: action.payload }
    case 'HIGHLIGHT_MEMORY':
      return { ...state, highlightedMemoryRange: action.payload }
    case 'GOTO_ADDRESS':
      return { ...state, hexdumpGoToAddress: action.payload }
    case 'TICK_SLOT': {
      const newSlot = state.cluster.slot + 1
      const shouldSkip = Math.random() < 0.02 // 2% skip rate
      return {
        ...state,
        cluster: {
          ...state.cluster,
          slot: newSlot,
          blockHeight: shouldSkip ? state.cluster.blockHeight : state.cluster.blockHeight + 1,
          root: newSlot > state.cluster.root + 32 ? state.cluster.root + 1 : state.cluster.root,
          confirmedSlot: Math.max(state.cluster.confirmedSlot, newSlot - 10),
          finalizedSlot: Math.max(state.cluster.finalizedSlot, newSlot - 32),
          skippedSlots: shouldSkip ? state.cluster.skippedSlots + 1 : state.cluster.skippedSlots,
          transactionCount: state.cluster.transactionCount + Math.floor(Math.random() * 500 + 200),
          tps: Math.floor(3000 + Math.random() * 1500),
          epoch: Math.floor(newSlot / 432_000),
        },
        tower: {
          ...state.tower,
          lastVoteSlot: newSlot,
          rootDistance: newSlot - state.cluster.root,
        },
      }
    }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Helper functions
  addRpcTrace: (method: string, params?: string) => void
  addKernelLog: (level: KernelLogEvent['level'], source: KernelLogEvent['source'], msg: string) => void
  addDefiEvent: (dex: DexType, type: DefiEvent['type'], fields: DefiEvent['fields'], flags?: DefiFlag[]) => void
  highlightMemory: (start: string, end: string) => void
  clearHighlight: () => void
  addActivity: (kind: ActivityEvent['kind'], message: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const idCounterRef = useRef(0)

  // Helper callbacks defined up front for use in effects
  const addRpcTrace = useCallback((method: string, params?: string) => {
    const event: RpcTraceEvent = {
      id: `rpc-${++idCounterRef.current}`,
      ts: Date.now(),
      method,
      paramsSummary: params || '{}',
      status: 'success',
      duration: Math.floor(Math.random() * 50 + 5),
    }
    dispatch({ type: 'ADD_RPC_TRACE', payload: event })
  }, [])

  const addKernelLog = useCallback((
    level: KernelLogEvent['level'],
    source: KernelLogEvent['source'],
    msg: string
  ) => {
    const event: KernelLogEvent = {
      id: `log-${++idCounterRef.current}`,
      ts: Date.now(),
      level,
      source,
      msg,
    }
    dispatch({ type: 'ADD_KERNEL_LOG', payload: event })
  }, [])

  const addDefiEvent = useCallback((
    dex: DexType,
    type: DefiEvent['type'],
    fields: DefiEvent['fields'],
    eventFlags: DefiFlag[] = []
  ) => {
    const event: DefiEvent = {
      id: `defi-${++idCounterRef.current}`,
      ts: Date.now(),
      slot: state.cluster.slot,
      dex,
      signature: `${Math.random().toString(36).substring(2, 10)}...`,
      type,
      fields,
      flags: eventFlags,
    }
    dispatch({ type: 'ADD_DEFI_EVENT', payload: event })
  }, [state.cluster.slot])

  const addActivity = useCallback((kind: ActivityEvent['kind'], message: string) => {
    const event: ActivityEvent = {
      id: `act-${++idCounterRef.current}`,
      ts: Date.now(),
      kind,
      message,
    }
    dispatch({ type: 'ADD_ACTIVITY', payload: event })
  }, [])

  const highlightMemory = useCallback((start: string, end: string) => {
    dispatch({ type: 'HIGHLIGHT_MEMORY', payload: { start, end } })
  }, [])

  const clearHighlight = useCallback(() => {
    dispatch({ type: 'HIGHLIGHT_MEMORY', payload: null })
  }, [])

  // Slot tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK_SLOT' })
    }, 400) // ~400ms slot time (slightly faster for visual effect)

    return () => clearInterval(interval)
  }, [])

  // Random TPU queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_TPU',
        payload: {
          fetch: {
            ...state.tpuPipeline.fetch,
            queueDepth: Math.floor(100 + Math.random() * 100),
            throughput: Math.floor(3800 + Math.random() * 800),
          },
          sigverify: {
            ...state.tpuPipeline.sigverify,
            queueDepth: Math.floor(50 + Math.random() * 80),
            throughput: Math.floor(3600 + Math.random() * 800),
          },
          banking: {
            ...state.tpuPipeline.banking,
            queueDepth: Math.floor(30 + Math.random() * 50),
            throughput: Math.floor(3200 + Math.random() * 800),
          },
          broadcast: {
            ...state.tpuPipeline.broadcast,
            queueDepth: Math.floor(10 + Math.random() * 30),
            throughput: Math.floor(3000 + Math.random() * 800),
          },
        },
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [state.tpuPipeline])

  // Random DeFi events
  useEffect(() => {
    const dexes: DexType[] = ['raydium', 'orca', 'phoenix', 'jupiter', 'meteora']
    const tokens = ['SOL', 'USDC', 'USDT', 'JUP', 'RAY', 'ORCA', 'BONK', 'WIF', 'JTO']
    const flags: DefiFlag[] = ['large_impact', 'arb_candidate', 'sandwich_risk', 'whale', 'new_token']

    const interval = setInterval(() => {
      const tokenIn = tokens[Math.floor(Math.random() * tokens.length)]
      let tokenOut = tokens[Math.floor(Math.random() * tokens.length)]
      while (tokenOut === tokenIn) {
        tokenOut = tokens[Math.floor(Math.random() * tokens.length)]
      }
      
      const amount = Math.floor(Math.random() * 10000) + 100
      const eventFlags: DefiFlag[] = Math.random() > 0.7 
        ? [flags[Math.floor(Math.random() * flags.length)]] 
        : []

      addDefiEvent(
        dexes[Math.floor(Math.random() * dexes.length)],
        'swap',
        {
          tokenIn,
          tokenOut,
          amountIn: amount.toString(),
          amountOut: (amount * (0.95 + Math.random() * 0.1)).toFixed(2),
          priceImpact: Math.random() * 2,
        },
        eventFlags
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [state.cluster.slot, addDefiEvent])

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addRpcTrace,
        addKernelLog,
        addDefiEvent,
        addActivity,
        highlightMemory,
        clearHighlight,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export function useCluster() {
  const { state } = useApp()
  return state.cluster
}

export function useTower() {
  const { state } = useApp()
  return state.tower
}

export function useTpuPipeline() {
  const { state } = useApp()
  return state.tpuPipeline
}

export function useRpcTrace() {
  const { state } = useApp()
  return state.rpcTrace
}

export function useKernelLogs() {
  const { state } = useApp()
  return state.kernelLogs
}

export function useDefiEvents() {
  const { state } = useApp()
  return state.defiEvents
}
