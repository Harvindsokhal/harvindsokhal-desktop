import { FunctionComponent } from 'react'
import { IShowProps } from '../../interfaces/app_interfaces'
import { notesAssets } from '../../assets'
import Draggable from 'react-draggable'
import './Notes.scss'

const Notes: FunctionComponent<IShowProps> = ({ setShow }) => {
  return (
    <Draggable>
      <div className="notes-app">
        <div className="notes-taskbar">
          <div className="small-section">
            <div className="dots-container">
              <div
                id="dot-one"
                className="browser-dot"
                onClick={() =>
                  setShow((prevState) => {
                    return { ...prevState, notes: !prevState.notes }
                  })
                }
              />
              <div id="dot-two" className="browser-dot" />
              <div id="dot-three" className="browser-dot" />
            </div>
            <img
              src={notesAssets.smallSectionIcons}
              alt="small-section-icons"
            />
          </div>
          <div className="large-section">
            <img
              src={notesAssets.largeSectionIcons}
              alt="large-section-icons"
            />
          </div>
        </div>
        <div className="notes-content">
          <div className="sidenotes-content">
            <div className="sidenotes-sub-title">
              <p>Today</p>
            </div>

            <div className="main-note-card">
              <div className="main-note-content">
                <p className="main-note-title">My skills</p>
                <div className="main-note-text">
                  <p className="main-note-title">Today</p>
                  <p className="main-note-subtext">Programming languages</p>
                </div>
              </div>
            </div>

            <div className="subnotes-date"> 2024</div>
            <div className="note-card">
              <div className="main-note-content">
                <p className="main-note-title">To-do</p>
                <div className="main-note-text">
                  <p className="main-note-title">Yesterday</p>
                  <p className="main-note-subtext">Grocery shopping</p>
                </div>
              </div>
            </div>

            <div className="note-card">
              <div className="main-note-content">
                <p className="main-note-title">Movies</p>
                <div className="main-note-text">
                  <p className="main-note-title">16/01/2024</p>
                  <p className="main-note-subtext">Pulp fiction</p>
                </div>
              </div>
            </div>

            <div className="note-card">
              <div className="main-note-content">
                <p className="main-note-title">Appointments</p>
                <div className="main-note-text">
                  <p className="main-note-title">12/01/2024</p>
                  <p className="main-note-subtext">Dentist @2pm</p>
                </div>
              </div>
            </div>
            <div className="subnotes-date"> 2023</div>
            <div className="note-card">
              <div className="main-note-content">
                <p className="main-note-title">Anime</p>
                <div className="main-note-text">
                  <p className="main-note-title">28/12/2023</p>
                  <p className="main-note-subtext">Jujitsu Kaisen</p>
                </div>
              </div>
            </div>
            <div className="note-card">
              <div className="main-note-content">
                <p className="main-note-title">Bank details</p>
                <div className="main-note-text">
                  <p className="main-note-title">16/11/2023</p>
                  <p className="main-note-subtext">Acc number: 20</p>
                </div>
              </div>
            </div>
          </div>
          <div className="big-note">
            <h2>My Skills</h2>
            <h3>Programming languages</h3>
            <ul>
              <li>
                Typescript{' '}
                <img src={notesAssets.typescriptIcon} alt="typescript-icon" />
              </li>
              <li>
                HTML/CSS
                <img src={notesAssets.htmlIcon} alt="htmlcss-icon" />
                <img src={notesAssets.cssIcon} alt="css-icon" />
              </li>
              <li>
                Kotlin {''}
                <img src={notesAssets.kotlinIcon} alt="kotlin-icon" />
              </li>
              <li>
                Python{''}
                <img src={notesAssets.pythonIcon} alt="python-icon" />
              </li>
              <li>
                Scala{''}
                <img src={notesAssets.scalaIcon} alt="scala-icon" />
              </li>
              <li>
                Java{''}
                <img src={notesAssets.javaIcon} alt="java-icon" />
              </li>
            </ul>
            <h3>Frameworks</h3>
            <ul>
              <li>
                React
                <img src={notesAssets.reactIcon} alt="react-icon" />
              </li>
              <li>
                GraphQL
                <img src={notesAssets.graphqlIcon} alt="graphql-icon" />
              </li>
              <li>
                NestJs
                <img src={notesAssets.nestIcon} alt="nestjs-icon" />
              </li>
              <li>
                Jest
                <img src={notesAssets.jestIcon} alt="jest-icon" />
              </li>
              <li>
                Storybook
                <img src={notesAssets.storybookIcon} alt="storybook-icon" />
              </li>
              <li>
                Spring
                <img src={notesAssets.springIcon} alt="spring-icon" />
              </li>
            </ul>
            <h3>Misc</h3>
            <ul>
              <li>
                Jira
                <img src={notesAssets.jiraIcon} alt="jira-icon" />
              </li>
              <li>
                Prettier
                <img src={notesAssets.prettierIcon} alt="prettier-icon" />
              </li>
              <li>
                ESLint
                <img src={notesAssets.eslintIcon} alt="eslint-icon" />
              </li>
              <li>
                Git
                <img src={notesAssets.gitIcon} alt="git-icon" />
              </li>
              <li>
                Docker
                <img src={notesAssets.dockerIcon} alt="docker-icon" />
              </li>
              <li>
                Kubernetes
                <img src={notesAssets.kubernetesIcon} alt="kubernetes-icon" />
              </li>
              <li>
                CircleCi
                <img src={notesAssets.circleciIcon} alt="circleci-icon" />
              </li>

              <li>
                Datadog
                <img src={notesAssets.datadogIcon} alt="datadog-icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Notes
