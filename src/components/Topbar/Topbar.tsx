import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { assets } from '../../assets'
import Wifi from './Wifi'
import './Topbar.scss'

const Topbar = () => {
  const [date, setDate] = useState(new Date())
  const [isDropdown, setIsDropdown] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<{
    left: number
    top: number
  } | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownTriggerRef = useRef<HTMLParagraphElement>(null)

  const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(intervalId)
  }, [])

  useLayoutEffect(() => {
    if (isDropdown && dropdownTriggerRef.current) {
      const { left, top, height } =
        dropdownTriggerRef.current.getBoundingClientRect()
      setDropdownPosition({ left, top: top + height })
    }
  }, [isDropdown])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(e.target as Node)
      ) {
        setIsDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const showDropdown = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation()
    setIsDropdown(!isDropdown)
  }

  return (
    <div className="Top-bar">
      <div className="Top-items-left">
        <img src={assets.appleLogo} alt="AppleLogo" className="apple-icon" />
        <p className="Finder">Finder</p>
        <p onClick={showDropdown} ref={dropdownTriggerRef}>
          File
        </p>
        <p>Edit</p>
        <p>View</p>
        <p>Go</p>
        <p>Window</p>
        <p>Help</p>

        {isDropdown && dropdownPosition && (
          <div
            className="dropdown-menu"
            style={{
              left: dropdownPosition.left + 'px',
              top: dropdownPosition.top + 'px',
            }}
            ref={dropdownRef}
          >
            <ul>
              <li>New Finder Window</li>
              <li>New Folder</li>
              <li>New Folder with Selection</li>
              <li>New Smart Folder</li>
              <li>New tab</li>
              <li>Open</li>
              <li>Open With</li>
              <li>Print</li>
              <li>Close Window</li>
              <li>Get Info</li>
              <li>Rename</li>
              <li>Compress</li>
              <li>Duplicate</li>
              <li>Make Alias</li>
              <li>Show Original</li>
              <li>Add to Sidebar</li>
              <li>Move to Trash</li>
              <li>Eject</li>
              <li>Find</li>
              <li>Tags...</li>
            </ul>
          </div>
        )}
      </div>

      <div className="Top-items-right">
        <Wifi />
        <img src={assets.airplayIcon} alt="airplay-logo" />

        <img src={assets.batteryIcon} alt="battery-logo" />
        <img src={assets.searchIcon} alt="search-logo" />
        <p>{weekday[date.getDay()]}</p>
        <p>{date.getDate()}</p>
        <p>{month[date.getMonth()]}</p>
        <p className="time">
          {date.getHours() < 1 ? '0' + date.getHours() : date.getHours()}:
          {date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}
        </p>
      </div>
    </div>
  )
}

export default Topbar
