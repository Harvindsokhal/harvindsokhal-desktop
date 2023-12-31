import { useState, useEffect } from 'react'
import './Topbar.scss'
import AppleLogo from '../../assets/apple-logo.png'
import Wifi from '../../assets/wifi.png'
import Airplay from '../../assets/airplay.png'
import Battery from '../../assets/battery.png'
import Search from '../../assets/search.png'

const Topbar = () => {
  const [date, setDate] = useState(new Date())

  const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000)
  }, [])

  return (
    <div className='Top-bar'>
      <div className='Top-items-left'>
        <img src={AppleLogo} alt='AppleLogo' className='apple-icon' />
        <p className='Finder'>Finder</p>
        <p>File</p>
        <p>Edit</p>
        <p>View</p>
        <p>Go</p>
        <p>Window</p>
        <p>Help</p>
      </div>

      <div className='Top-items-right'>
        <img src={Wifi} alt='wifi-logo' />
        <img src={Airplay} alt='airplay-logo' />
        <img src={Battery} alt='battery-logo' />
        <a className='date'>{weekday[date.getDay()]}</a>
        <a className='date'>
          {date.getHours()}:{date.getMinutes()}
        </a>
        <img src={Search} alt='search-logo' />
      </div>
    </div>
  )
}

export default Topbar
