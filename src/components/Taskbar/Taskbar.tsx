import './Taskbar.scss'
import assets from '../../assets'

const Taskbar = () => {
  return (
    <div className='task-bar'>
      <div className='task-bar-items'>
        <img src={assets.messageIcon} alt='message-icon' />
        <img src={assets.newsIcon} alt='news-icon' />
        <img src={assets.appStoreIcon} alt='appstore-icon' />
        <img src={assets.notesIcon} alt='notes-icon' />
        <img src={assets.safariIcon} alt='safari-icon' />
        <img src={assets.folderIcon} alt='folder-icon' />
        <img src={assets.binIcon} alt='bin-icon' />
      </div>
    </div>
  )
}

export default Taskbar
