import Draggable from 'react-draggable'
import { appStoreAssets } from '../../assets'
import { FunctionComponent } from 'react'
import { IShowProps } from '../../interfaces/app_interfaces'
import './Appstore.scss'

const Appstore: FunctionComponent<IShowProps> = ({ setShow }) => {
  return (
    <Draggable>
      <div className="app-store-main">
        <div className="app-store-taskbar">
          <div className="dots-container">
            <div
              id="dot-one"
              className="browser-dot"
              onClick={() =>
                setShow((prevState) => {
                  return { ...prevState, appstore: !prevState.appstore }
                })
              }
            />
            <div id="dot-two" className="browser-dot" />
            <div id="dot-three" className="browser-dot" />
          </div>
        </div>
        <div className="side-bar-content">
          <div className="searchbox-container">
            <input type="text" size={40} placeholder="Search..." />
          </div>
          <div className="catagories-left">
            <p>
              <img
                id="catagories-icon"
                src={appStoreAssets.discoverIcon}
                alt="discover-logo"
              />{' '}
              Disover
            </p>
            <p>
              <img
                id="catagories-icon"
                src={appStoreAssets.createIcon}
                alt="create-logo"
              />{' '}
              Create
            </p>
            <p>
              <img
                id="catagories-icon"
                src={appStoreAssets.workIcon}
                alt="work-logo"
              />{' '}
              Work
            </p>
            <p>
              <img
                id="catagories-icon"
                src={appStoreAssets.playIcon}
                alt="play-logo"
              />{' '}
              Play
            </p>
            <p>
              <img
                id="catagories-icon"
                src={appStoreAssets.developIcon}
                alt="develop-logo"
              />{' '}
              Develop
            </p>
            <p>
              <img
                id="catagories-icon"
                src={appStoreAssets.categoriesIcon}
                alt="catagories-logo"
              />{' '}
              Catagories
            </p>
            <div className="update-sidebar">
              <p>
                <img
                  id="catagories-icon"
                  src={appStoreAssets.updateIcon}
                  alt="updates-logo"
                />{' '}
                Updates
              </p>
              <p className="update-pill">2</p>
            </div>
            <div className="profile-left">
              <img src={appStoreAssets.profileIcon} alt="profile-icon" />
              <div className="profile-text-container">
                <p>Harvind Sokhal</p>
                <p>£9999.99 Credit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Appstore
