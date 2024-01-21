import { useState } from 'react'
import { Topbar, Taskbar, Bin } from './components'
import './App.scss'

const App = () => {
  const [show, setShow] = useState(false)

  return (
    <div className='container'>
      <Topbar />
      {show ? <Bin show={show} setShow={setShow} /> : ''}
      <Taskbar show={show} setShow={setShow} />
    </div>
  )
}

export default App
