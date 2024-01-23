import { FunctionComponent } from 'react'
import { IShowProps } from '../../interfaces/app_interfaces'
import Draggable from 'react-draggable'
import assets from '../../assets'
import './Bin.scss'



const Bin: FunctionComponent<IShowProps> = ({ show, setShow }) => {
  return (
    <Draggable>
      <div className='bin-container'>
        <div className='bin-taskbar'>
          <div
            onClick={() => setShow({...show, bin: !show.bin})}
            id='dot-one'
            className='browser-dot'
          />
          <div id='dot-two' className='browser-dot' />
          <div id='dot-three' className='browser-dot' />
          <p id='bin-title'>Trash</p>
        </div>
        <div className='cv-container'>
          <a href={assets.cv} rel='noopener noreferrer' target='_blank'>
            <img id='pdf-image' src={assets.pdfIcon} alt='Pdf-logo' />
          </a>
          <p>Harvind Sokhal CV.pdf</p>
        </div>
      </div>
    </Draggable>
  )
}

export default Bin
