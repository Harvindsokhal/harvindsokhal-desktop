import { useState, useEffect } from 'react'
import './Topbar.scss'
import assets from '../../assets'
import Wifi from './Wifi'

const Topbar = () => {
  const [date, setDate] = useState(new Date())

  const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000)
  }, [])

  return (
    <div className='Top-bar'>
      <div className='Top-items-left'>
        <img src={assets.appleLogo} alt='AppleLogo' className='apple-icon' />
        <p className='Finder'>Finder</p>
        <p>File</p>
        <p>Edit</p>
        <p>View</p>
        <p>Go</p>
        <p>Window</p>
        <p>Help</p>
      </div>

      <div className='Top-items-right'>
        <Wifi />
        <img src={assets.airplayIcon} alt='airplay-logo' />
        <img src={assets.batteryIcon} alt='battery-logo' />
        <p className='date'>{weekday[date.getDay()]}</p>
        <p className='date'>
          {date.getHours()}:{date.getMinutes()}
        </p>
        <img src={assets.searchIcon} alt='search-logo' />
      </div>
    </div>
  )
}

export default Topbar
