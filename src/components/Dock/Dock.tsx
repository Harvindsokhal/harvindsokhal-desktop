import { FunctionComponent } from 'react'
import { IShow, IShowProps } from '../../interfaces/app_interfaces'
import { assets } from '../../assets'
import './Dock.scss'

const Dock: FunctionComponent<IShowProps> = ({ show, setShow }) => {
  return (
    <div className="dock">
      <div className="dock-items">
        <div className="dock-item">
          <input
            type="image"
            src={assets.messageIcon}
            alt="message-icon"
            onClick={() =>
              setShow((prevState) => {
                const nextState = {} as IShow
                Object.keys(prevState).forEach((key) => {
                  if (key === 'message') {
                    nextState[key as keyof IShow] = !prevState.message
                  } else {
                    nextState[key as keyof IShow] = false
                  }
                })
                return nextState
              })
            }
          />
          <span className="tooltip">Messages</span>
          {show?.message && <div className="indicator-dot"></div>}
        </div>

        <div className="dock-item">
          <input type="image" src={assets.newsIcon} alt="news-icon" />
          <span className="tooltip">News</span>
        </div>
        <div className="dock-item">
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
          <span className="tooltip">App Store</span>
          {show?.appstore && <div className="indicator-dot"></div>}
        </div>
        <div className="dock-item">
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
          <span className="tooltip">Notes</span>
          {show?.notes && <div className="indicator-dot"></div>}
        </div>
        <div className="dock-item">
          <input
            onClick={() =>
              setShow((prevState) => {
                const nextState = {} as IShow
                Object.keys(prevState).forEach((key) => {
                  if (key === 'safari') {
                    nextState[key as keyof IShow] = !prevState.safari
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
          <span className="tooltip">Safari</span>
          {show?.safari && <div className="indicator-dot"></div>}
        </div>
        <div className="dock-item">
          <input type="image" src={assets.folderIcon} alt="folder-icon" />
          <span className="tooltip">Folder</span>
        </div>
        <div className="dock-item">
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
          <span className="tooltip">Bin</span>
          {show?.bin && <div className="indicator-dot"></div>}
        </div>
      </div>
    </div>
  )
}

export default Dock
