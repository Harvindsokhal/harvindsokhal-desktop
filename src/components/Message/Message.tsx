import Draggable from 'react-draggable'
import { messageAssets } from '../../assets'
import { FunctionComponent, useState } from 'react'
import emailjs from '@emailjs/browser'
import './Message.scss'
import { IShowProps } from '../../interfaces/app_interfaces'

const Message: FunctionComponent<IShowProps> = ({ setShow }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeMessage(e.target.value)
    setMessage(e.target.value)
  }

  const handleSubmit = async () => {
    const serviceId: string = process.env.REACT_APP_EMAIL_SERVICE_ID as string
    const templateId: string = process.env.REACT_APP_EMAIL_TEMPLATE_ID as string
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        message: message,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSent(true)
      setTypeMessage('')
    }
  }

  return (
    <Draggable>
      <div className="message-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="dots-container">
              <div
                id="dot-one"
                className="browser-dot"
                onClick={() =>
                  setShow((prevState) => {
                    return { ...prevState, message: !prevState.message }
                  })
                }
              />
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
            <input
              className={name.length > 1 ? 'content' : ''}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <img alt="add-icon" src={messageAssets.addIcon} />
          </div>
          <div className="message-content">
            <div className={`${sent ? 'message' : 'hidden'}`}>
              <p>{message}</p>
            </div>
          </div>
          <div className="message-input-section">
            <img
              id="appstore-icon"
              src={messageAssets.messageAppstoreIcon}
              alt="appstore-icon"
            />
            <input
              value={typeMessage}
              disabled={sent}
              id="message-text"
              placeholder="iMessage"
              onChange={handleChange}
            />
            <button onClick={handleSubmit} disabled={sent}>
              <img alt="send-icon" src={messageAssets.sendIcon} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Message
