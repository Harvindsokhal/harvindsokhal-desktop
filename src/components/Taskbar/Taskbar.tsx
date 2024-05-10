import { FunctionComponent } from 'react'
import { IShow, IShowProps } from '../../interfaces/app_interfaces'
import { assets } from '../../assets'
import './Taskbar.scss'

const Taskbar: FunctionComponent<IShowProps> = ({ setShow }) => {
  return (
    <div className="task-bar">
      <div className="task-bar-items">
        <input type="image" src={assets.messageIcon} alt="message-icon" />
        <input type="image" src={assets.newsIcon} alt="news-icon" />
        <input
          type="image"
          src={assets.appStoreIcon}
          alt="appstore-icon"
          onClick={() =>
            setShow((prevState) => {
              const nextState = {} as IShow
              Object.keys(prevState).forEach((key) => {
                if (key === 'appstore') {
                  nextState[key as keyof IShow] = !prevState.appstore
                } else {
                  nextState[key as keyof IShow] = false
                }
              })
              return nextState
            })
          }
        />
        <input
          onClick={() =>
            setShow((prevState) => {
              const nextState = {} as IShow
              Object.keys(prevState).forEach((key) => {
                if (key === 'notes') {
                  nextState[key as keyof IShow] = !prevState.notes
                } else {
                  nextState[key as keyof IShow] = false
                }
              })
              return nextState
            })
          }
          type="image"
          src={assets.notesIcon}
          alt="notes-icon"
        />
        <input
          onClick={() =>
            setShow((prevState) => {
              const nextState = {} as IShow
              Object.keys(prevState).forEach((key) => {
                if (key === 'safari') {
                  nextState[key as keyof IShow] = !prevState.notes
                } else {
                  nextState[key as keyof IShow] = false
                }
              })
              return nextState
            })
          }
          type="image"
          src={assets.safariIcon}
          alt="safari-icon"
        />
        <input type="image" src={assets.folderIcon} alt="folder-icon" />
        <input
          onClick={() =>
            setShow((prevState) => {
              const nextState = {} as IShow
              Object.keys(prevState).forEach((key) => {
                if (key === 'bin') {
                  nextState[key as keyof IShow] = !prevState.bin
                } else {
                  nextState[key as keyof IShow] = false
                }
              })
              return nextState
            })
          }
          type="image"
          src={assets.binIcon}
          alt="bin-icon"
        />
      </div>
    </div>
  )
}

export default Taskbar
