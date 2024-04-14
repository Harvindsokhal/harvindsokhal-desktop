import Draggable from 'react-draggable'
import './Appstore.scss'

const Appstore = () => {
  return (
    <Draggable>
      <div className="app-store-main">
        <div className="app-store-taskbar">
          <div className="dots-container">
            <div id="dot-one" className="browser-dot" />
            <div id="dot-two" className="browser-dot" />
            <div id="dot-three" className="browser-dot" />
          </div>
        </div>
        <div className="side-bar-content">
          <div className="searchbox-container">
            <input type="text" size={40} placeholder="Search..." />
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Appstore
