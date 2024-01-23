import { FunctionComponent } from 'react'
import { IShowProps } from '../../interfaces/app_interfaces'
import Draggable from 'react-draggable'
import './Notes.scss'

const Notes: FunctionComponent<IShowProps> = ({ show, setShow }) => {
  return (
    <Draggable>
      <div className='notes-container'>
        <div className='notes-taskbar'>
          <div
            id='dot-one'
            className='browser-dot'
            onClick={() => setShow({ ...show, notes: !show.notes })}
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
