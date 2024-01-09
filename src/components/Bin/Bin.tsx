import Draggable from 'react-draggable'
import './Bin.scss'

const Bin = () => {
  return (
    <Draggable>
      <div className='bin-container'>
        <div className='bin-taskbar'></div>
      </div>
    </Draggable>
  )
}

export default Bin
