import { useTicTacToeCtx } from '../TicTacToeContext'
import { classesBuddy } from '../../classes-buddy'
import './Hud.css'

function Hud (): JSX.Element {
  const { isGameOver, isThinking, resetGameClicked } = useTicTacToeCtx()
  const signClasses = classesBuddy('status', { 'game-over': isGameOver })
  const hudClasses = classesBuddy('hud', { 'is-thinking': isThinking })
  const turn = isGameOver ? 'Game Over' : isThinking ? '' : 'YOUR TURN 🫵🏼'
  return (
    <div className={hudClasses}>
      <div className={signClasses}>{turn}</div>
      <button className='reset-btn' onClick={resetGameClicked}>
        Reset
      </button>
      <a className='github' href='https://github.com/yogsky/tictacyog' target='_blank' rel="noreferrer">Repo</a>
    </div>
  )
}

export default Hud

// interface User {
//   id: string
//   name: string
// }

// interface Vendor {
//   id: string
//   name: string
//   description: string
//   location: string
//   userId: User['id']
// }

// interface Specialty {
//   id: string
//   name: string
//   description: string
// }

// interface VendorSpecialties {
//   vendorId: Vendor['id'] // PK is combination of vendorId and specialtyId, but we also index by vendorId
//   specialtyId: Specialty['id']
// }

// interface AvailableAppointments {
//   id: string
//   vendorId: Vendor['id'] // index by vendorId
//   date: string // index by date
//   time: string
// }

// interface BookedAppointments {
//   id: string
//   appointmentId: AvailableAppointments['id'] // index by appointmentId
//   userId: User['id'] // index by userId
//   specialtyId: Specialty['id']
//   status: 'scheduled' | 'completed' | 'cancelled'

// }
