import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import Draggable from 'react-draggable'
import './Notes.scss'

interface IProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const Notes: FunctionComponent<IProps> = ({ show, setShow }) => {
  return (
    <Draggable>
      <div className='notes-container'>
        <div className='notes-taskbar'>
          <div
            id='dot-one'
            className='browser-dot'
            onClick={() => setShow(!show)}
          />
          <div id='dot-two' className='browser-dot' />
          <div id='dot-three' className='browser-dot' />
          <p id='notes-title'>Notes</p>
        </div>
      </div>
    </Draggable>
  )
}

export default Notes
