import { useState } from 'react'
import { Topbar, Taskbar, Bin, Notes, Appstore } from './components'
import { IShow } from './interfaces/app_interfaces'
import './App.scss'

const App = () => {
  const [show, setShow] = useState<IShow>({
    notes: false,
    bin: false,
    appstore: true,
  })

  return (
    <div className="container">
      <Topbar />
      {show.notes ? <Notes setShow={setShow} /> : ''}
      {show.bin ? <Bin setShow={setShow} /> : ''}
      {show.appstore ? <Appstore /> : ''}
      <Taskbar setShow={setShow} />
    </div>
  )
}

export default App
