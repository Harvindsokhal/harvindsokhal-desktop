import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import './Taskbar.scss'
import assets from '../../assets'

interface IProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const Taskbar: FunctionComponent<IProps> = ({ show, setShow }) => {
  return (
    <div className='task-bar'>
      <div className='task-bar-items'>
        <input type='image' src={assets.messageIcon} alt='message-icon' />
        <input type='image' src={assets.newsIcon} alt='news-icon' />
        <input type='image' src={assets.appStoreIcon} alt='appstore-icon' />
        <input type='image' src={assets.notesIcon} alt='notes-icon' />
        <input type='image' src={assets.safariIcon} alt='safari-icon' />
        <input type='image' src={assets.folderIcon} alt='folder-icon' />
        <input
          onClick={() => setShow(!show)}
          type='image'
          src={assets.binIcon}
          alt='bin-icon'
        />
      </div>
    </div>
  )
}

export default Taskbar
