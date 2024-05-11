import { useState } from 'react'
import {
  Topbar,
  Dock,
  Bin,
  Notes,
  Appstore,
  Safari,
  Message,
} from './components'
import { IShow } from './interfaces/app_interfaces'
import './App.scss'

const App = () => {
  const [show, setShow] = useState<IShow>({
    notes: false,
    bin: false,
    appstore: false,
    safari: false,
    message: true,
  })

  return (
    <div className="container">
      <Topbar />
      {show.message ? <Message /> : ''}
      {show.notes ? <Notes setShow={setShow} /> : ''}
      {show.bin ? <Bin setShow={setShow} /> : ''}
      {show.appstore ? <Appstore setShow={setShow} /> : ''}
      {show.safari ? <Safari setShow={setShow} /> : ''}
      <Dock setShow={setShow} />
    </div>
  )
}

export default App
