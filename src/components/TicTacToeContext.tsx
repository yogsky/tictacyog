import { createContext, useContext } from 'react'
import { useTicTacToe, type TicTacToeHook } from './useTicTacToe'

export const TicTacToeCtx = createContext<TicTacToeHook | null>(null)

export function useTicTacToeCtx (): TicTacToeHook {
  const ctx = useContext(TicTacToeCtx)
  if (ctx === null) throw new Error('useTicTacToeCtx must be used within a TicTacToeCtx.Provider')
  return ctx
}

export function TicTacToeCtxProvider ({ children }: { children: React.ReactNode }) {
  const value = useTicTacToe()
  return (
    <TicTacToeCtx.Provider value={value}>
      {children}
    </TicTacToeCtx.Provider>
  )
}
