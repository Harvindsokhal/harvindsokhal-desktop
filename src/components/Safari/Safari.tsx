import { FunctionComponent, useState } from 'react'
import Draggable from 'react-draggable'
import { safariAssets } from '../../assets'
import './Safari.scss'
import { IShowProps } from '../../interfaces/app_interfaces'

const Safari: FunctionComponent<IShowProps> = ({ setShow }) => {
  const [showSocial, setSocialShow] = useState({
    x: true,
    linkedin: false,
    threads: false,
  })

  return (
    <Draggable>
      <div className="safari-app">
        <div className="safari-taskbar">
          <div className="dots-container">
            <div
              id="dot-one"
              className="browser-dot"
              onClick={() =>
                setShow((prevState) => {
                  return { ...prevState, safari: !prevState.safari }
                })
              }
            />
            <div id="dot-two" className="browser-dot" />
            <div id="dot-three" className="browser-dot" />
          </div>
          <div className="icons-left">
            <img alt="sidebar-icon" src={safariAssets.sidebarIcon} />
            <img alt="Backarrow-icon" src={safariAssets.backarrowIcon} />
            <img alt="Frontarrow-icon" src={safariAssets.frontarrowIcon} />
            <img id="shield" alt="shield-icon" src={safariAssets.shieldIcon} />
          </div>
          <div className="url">
            <img id="lock" alt="lock-icon" src={safariAssets.lockIcon} />
            <p>
              {showSocial.x
                ? 'twitter.com'
                : showSocial.linkedin
                ? 'linkedin.com'
                : 'threads.net'}
            </p>
            <img
              id="refresh"
              alt="refresh-icon"
              src={safariAssets.refreshIcon}
            />
          </div>
          <div className="icons-right">
            <img id="cloud" alt="cloud-icon" src={safariAssets.cloudIcon} />
            <img id="share" alt="share-icon" src={safariAssets.shareIcon} />
            <img id="plus" alt="plus-icon" src={safariAssets.plusIcon} />
            <img id="tabs" alt="tabs-icon" src={safariAssets.tabsIcon} />
          </div>
        </div>
        <div className="tabs">
          <div
            className={`tab ${showSocial.x ? 'active' : ''}`}
            onClick={() =>
              setSocialShow({ x: true, linkedin: false, threads: false })
            }
          >
            <img alt="x-icon" src={safariAssets.xIcon} />
            <p>Home / X</p>
          </div>
          <div
            className={`tab ${showSocial.linkedin ? 'active' : ''}`}
            onClick={() =>
              setSocialShow({ x: false, linkedin: true, threads: false })
            }
          >
            <img alt="linkedin-icon" src={safariAssets.linkedinIcon} />
            <p>(5) Feed | LinkedIn</p>
          </div>
          <div
            className={`tab ${showSocial.threads ? 'active' : ''}`}
            onClick={() =>
              setSocialShow({ x: false, linkedin: false, threads: true })
            }
          >
            <img alt="threads-icon" src={safariAssets.threadsIcon} />
            <p>(1) Threads</p>
          </div>
        </div>
        <div className="socials">
          {showSocial.x ? (
            <a
              href="https://twitter.com/harvind__sokhal"
              rel="noreferrer"
              target="_blank"
            >
              <img alt="x-screenshot" src={safariAssets.xScreenshot} />{' '}
            </a>
          ) : (
            ''
          )}
          {showSocial.linkedin ? (
            <a
              href="https://www.linkedin.com/in/harvind-sokhal/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="linkedin-screenshot"
                src={safariAssets.linkedinScreenshot}
              />
            </a>
          ) : (
            ''
          )}
          {showSocial.threads ? (
            <a
              href="https://www.threads.net/@harviii.s"
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="threads-screenshot"
                src={safariAssets.threadsScreenshot}
              />
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default Safari
