import { useState } from 'react'
import { Topbar, Taskbar, Bin, Notes, Appstore, Safari } from './components'
import { IShow } from './interfaces/app_interfaces'
import './App.scss'

const App = () => {
  const [show, setShow] = useState<IShow>({
    notes: false,
    bin: false,
    appstore: false,
    safari: true,
  })

  return (
    <div className="container">
      <Topbar />
      {show.notes ? <Notes setShow={setShow} /> : ''}
      {show.bin ? <Bin setShow={setShow} /> : ''}
      {show.appstore ? <Appstore setShow={setShow} /> : ''}
      {show.safari ? <Safari setShow={setShow} /> : ''}
      <Taskbar setShow={setShow} />
    </div>
  )
}

export default App
