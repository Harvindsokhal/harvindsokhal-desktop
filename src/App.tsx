import { Topbar, Taskbar, Bin } from './components'
import './App.scss'

const App = () => {
  return (
    <div className='container'>
      <Topbar />
      <Bin />
      <Taskbar />
    </div>
  )
}

export default App
