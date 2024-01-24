import { useState } from "react";
import { Topbar, Taskbar, Bin, Notes } from "./components";
import { IShow } from "./interfaces/app_interfaces";
import "./App.scss";

const App = () => {
  const [show, setShow] = useState<IShow>({
    notes: false,
    bin: false,
  });

  return (
    <div className="container">
      <Topbar />
      {show.notes ? <Notes setShow={setShow} /> : ""}
      {show.bin ? <Bin setShow={setShow} /> : ""}
      <Taskbar setShow={setShow} />
    </div>
  );
};

export default App;
