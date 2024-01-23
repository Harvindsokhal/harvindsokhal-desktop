import { useState } from 'react'
import { Topbar, Taskbar, Bin, Notes } from './components'
import { IShow } from './interfaces/app_interfaces'
import './App.scss'

const App = () => {

 const [show, setShow] = useState<IShow>({
  notes: true,
  bin: false
 })

  return (
    <div className='container'>
      <Topbar />
      {show.notes ? <Notes show={show} setShow={setShow} /> : ''}
      {show.bin ? <Bin show={show} setShow={setShow} /> : ''}
      <Taskbar show={show} setShow={setShow} />
    </div>
  )
}

export default App
