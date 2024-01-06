import { Topbar, Taskbar } from './components'
import './App.scss'

const App = () => {
  return (
    <div className='container'>
      <Topbar />
      <div id='router'>
        <div id='body'>
          <div id='wifi'>
            <div className='signal' />
            <div className='signal' />
            <div className='signal' />
          </div>
        </div>
      </div>
      <Taskbar />
    </div>
  )
}

export default App
