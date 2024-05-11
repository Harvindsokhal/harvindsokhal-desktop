import Draggable from 'react-draggable'
import { messageAssets } from '../../assets'
import './Message.scss'

const Message = () => {
  return (
    <Draggable>
      <div className="message-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="dots-container">
              <div id="dot-one" className="browser-dot" />
              <div id="dot-two" className="browser-dot" />
              <div id="dot-three" className="browser-dot" />
            </div>
            <img alt="edit-icon" src={messageAssets.editIcon} />
          </div>
          <div className="sidebar-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="sidebar-chats">
            <div className="chat active">
              <div className="chat-icon">
                <p>H</p>
              </div>
              <div className="text-container">
                <p>Harvind Sokhal</p>
                <p id="message-preview">Get in touch</p>
              </div>
              <p id="message-date">Today 20:46</p>
            </div>
            <div className="chat">
              <div className="chat-icon">
                <p>D</p>
              </div>
              <div className="text-container">
                <p>Dentist</p>
                <p id="message-preview">Confirm appointment</p>
              </div>
              <p id="message-date">Yesterday</p>
            </div>
            <div className="chat">
              <div className="chat-icon">
                <p>T</p>
              </div>
              <div className="text-container">
                <p>Three</p>
                <p id="message-preview">Hi there,</p>
              </div>
              <p id="message-date">11/05/2024</p>
            </div>
            <div className="chat last">
              <div className="chat-icon">
                <p>F</p>
              </div>
              <div className="text-container">
                <p>Facebook</p>
                <p id="message-preview">Your reset code is</p>
              </div>
              <p id="message-date">22/04/2024</p>
            </div>
          </div>
        </div>
        <div className="message-content-container">
          <div className="message-content-header">
            <p>From:</p>
            <input type="email" />
            <img alt="add-icon" src={messageAssets.addIcon} />
          </div>
          <div className="message-content"></div>
          <div className="message-input-section">
            <textarea placeholder="iMessage" />
            <button>
              <img alt="send-icon" src={messageAssets.sendIcon} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Message
