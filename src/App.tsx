import { useState, useEffect } from 'react'
import {
  Topbar,
  Dock,
  Bin,
  Notes,
  Appstore,
  Safari,
  Message,
  PokeMini,
  SnakeGame,
} from './components'
import { IShow } from './interfaces/app_interfaces'
import emailjs from '@emailjs/browser'
import './App.scss'

const App = () => {
  const emailjsPulicKey: string = process.env
    .REACT_APP_EMAIL_PUBLIC_KEY as string

  useEffect(() => emailjs.init(emailjsPulicKey))

  const [show, setShow] = useState<IShow>({
    notes: false,
    bin: false,
    appstore: false,
    safari: false,
    message: false,
    pokeMini: false,
    snakeGame: false,
  })

  return (
    <div className="container">
      <Topbar />
      {show.snakeGame ? <SnakeGame setShow={setShow} /> : ''}
      {show.pokeMini ? <PokeMini setShow={setShow} /> : ''}
      {show.message ? <Message setShow={setShow} /> : ''}
      {show.notes ? <Notes setShow={setShow} /> : ''}
      {show.bin ? <Bin setShow={setShow} /> : ''}
      {show.appstore ? <Appstore setShow={setShow} /> : ''}
      {show.safari ? <Safari setShow={setShow} /> : ''}
      <Dock show={show} setShow={setShow} />
    </div>
  )
}

export default App
