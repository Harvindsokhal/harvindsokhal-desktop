import { FunctionComponent } from "react";
import { IShowProps } from "../../interfaces/app_interfaces";
import Draggable from "react-draggable";
import "./Notes.scss";

const Notes: FunctionComponent<IShowProps> = ({ setShow }) => {
  return (
    <Draggable>
      <div className="notes-container">
        <div className="notes-taskbar">
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
          <p id="notes-title">Notes</p>
        </div>
        <div className="notes-content ">Notes</div>
      </div>
    </Draggable>
  );
};

export default Notes;
