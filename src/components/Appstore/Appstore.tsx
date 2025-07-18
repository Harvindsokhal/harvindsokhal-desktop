import Draggable from 'react-draggable'
import { appStoreAssets } from '../../assets'
import { FunctionComponent } from 'react'
import { IShow, IShowProps } from '../../interfaces/app_interfaces'
import './Appstore.scss'

const Appstore: FunctionComponent<IShowProps> = ({ setShow }) => {
  const handlePokeMiniToggle = () => {
    setShow((prevState) => {
      const nextState = {} as IShow
      Object.keys(prevState).forEach((key) => {
        if (key === 'pokeMini') {
          nextState[key as keyof IShow] = !prevState.pokeMini
        } else {
          nextState[key as keyof IShow] = false
        }
      })
      return nextState
    })
  }

  const handleSnakeGameToggle = () => {
    setShow((prevState) => {
      const nextState = {} as IShow
      Object.keys(prevState).forEach((key) => {
        if (key === 'snakeGame') {
          nextState[key as keyof IShow] = !prevState.snakeGame
        } else {
          nextState[key as keyof IShow] = false
        }
      })
      return nextState
    })
  }

  return (
    <Draggable>
      <div className="app-store-main">
        <div>
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
        <div className="main-content">
          <div className="intro">
            <p>Develop</p>
          </div>
          <div className="highlights">
            <div className="highlights-left">
              <p className="text1">PRO TIP</p>
              <p className="text2">3 Things to Love About Things 3</p>
              <p className="text3">Seamless task management.</p>
              <img src={appStoreAssets.highlight1} alt="highlight1" />
            </div>
            <div className="highlights-right">
              <p className="text1">LIFE HACK</p>
              <p className="text2">Quick Workflow Tips</p>
              <p className="text3">Because every second counts.</p>
              <img src={appStoreAssets.highlight2} alt="highlight2" />
            </div>
          </div>
          <div className="projects">
            <p>Past Projects</p>
            <div className="row one">
              <div className="app">
                <img alt="flappy-icon" src={appStoreAssets.flappyBirdIcon} />
                <div className="text-container top">
                  <p id="des1">AI Flappy Bird</p>
                  <p id="des2">AI Bot Plays Flappy Bird</p>
                  <div className="open-app">
                    <p>Open</p>
                  </div>
                </div>
              </div>
              <div className="app">
                <img alt="flappy-icon" src={appStoreAssets.oculusIcon} />
                <div className="text-container top">
                  <p id="des1">Water Aid VR Game</p>
                  <p id="des2">A Custom Game With VR</p>
                  <div className="open-app">
                    <p>Open</p>
                  </div>
                </div>
              </div>
              <div className="app">
                <img alt="flappy-icon" src={appStoreAssets.pokemonIcon} />
                <div className="text-container top">
                  <p id="des1">Pokemini</p>
                  <p id="des2">A Custom Pokemon game</p>
                  <div className="open-app" onClick={handlePokeMiniToggle}>
                    <p>Open</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row two">
              <div className="app">
                <img alt="flappy-icon" src={appStoreAssets.scrapperIcon} />
                <div className="text-container">
                  <p id="des1">Auto Poster</p>
                  <p id="des2">Facts social media poster</p>
                  <div className="open-app">
                    <p>Open</p>
                  </div>
                </div>
              </div>
              <div className="app">
                <img alt="flappy-icon" src={appStoreAssets.musicIcon} />
                <div className="text-container">
                  <p id="des1">Party Music Player</p>
                  <p id="des2">Full Stack Music Player</p>
                  <div className="open-app">
                    <p>Open</p>
                  </div>
                </div>
              </div>
              <div className="app">
                <img alt="flappy-icon" src={appStoreAssets.snakeIcon} />
                <div className="text-container">
                  <p id="des1">Snake Game</p>
                  <p id="des2">A JSX Snake Game</p>
                  <div className="open-app" onClick={handleSnakeGameToggle}>
                    <p>Open</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Appstore
