import Board from './components/Board'
import Hud from '../Hud'
import { TicTacToeCtxProvider } from '../TicTacToeContext'

function Game (): JSX.Element {
  return (
    <TicTacToeCtxProvider>
      <Hud />
      <Board />
    </TicTacToeCtxProvider>
  )
}

export default Game
