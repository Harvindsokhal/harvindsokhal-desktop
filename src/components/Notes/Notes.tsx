import { FunctionComponent } from "react";
import { IShowProps } from "../../interfaces/app_interfaces";
import { notesAssets } from "../../assets";
import Draggable from "react-draggable";
import "./Notes.scss";

const Notes: FunctionComponent<IShowProps> = ({ setShow }) => {
  return (
    <Draggable>
      <div className="notes-container">
        <div className="notes-taskbar">
          <div className="small-section">
            <div className="dots-container">
              <div
                id="dot-one"
                className="browser-dot"
                onClick={() =>
                  setShow((prevState) => {
                    return { ...prevState, notes: !prevState.notes };
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
        <div className="notes-content ">
          <div className="notes-sub-title">
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
      </div>
    </Draggable>
  );
};

export default Notes;
