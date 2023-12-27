import './Topbar.scss'
import AppleLogo from '../../assets/apple-logo.png'
import Wifi from '../../assets/wifi.png'
import Airplay from '../../assets/wifi.png'
import Battery from '../../assets/battery.png'
import Search from '../../assets/search.png'

const Topbar = () => {
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
        <img src={Wifi} alt='wifi-logo' id='topright-icon' />
        <img src={Airplay} alt='airplay-logo' id='topright-icon' />
        <img src={Battery} alt='battery-logo' id='topright-icon' />
        <div className='date'>9:33</div>
        <img src={Search} alt='search-logo' id='topright-icon' />
      </div>
    </div>
  )
}

export default Topbar
