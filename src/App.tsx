import { useState } from 'react'
import { Topbar, Taskbar, Bin, Notes } from './components'
import './App.scss'

const App = () => {
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [showBin, setShowBin] = useState<boolean>(false)

  return (
    <div className='container'>
      <Topbar />
      {showNotes ? <Notes show={showNotes} setShow={setShowNotes} /> : ''}
      {showBin ? <Bin show={showBin} setShow={setShowBin} /> : ''}
      <Taskbar show={showBin} setShow={setShowBin} />
    </div>
  )
}

export default App
