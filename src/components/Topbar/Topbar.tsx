import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { assets } from '../../assets'
import Dropdown from '../Dropdown/Dropdown'
import Wifi from './Wifi'
import './Topbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setSection } from '../../store/dropdownSlice'

const Topbar = () => {
  const [date, setDate] = useState(new Date())
  const [dropdownPosition, setDropdownPosition] = useState<{
    left: number
    top: number
  } | null>(null)

  const [activeTriggerRef, setActiveTriggerRef] =
    useState<HTMLParagraphElement | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const dropdownSection = useSelector(
    (state: RootState) => state.dropdown.section
  )

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
    if (dropdownSection && activeTriggerRef) {
      const { left, top, height } = activeTriggerRef.getBoundingClientRect()
      setDropdownPosition({ left, top: top + height })
    }
  }, [dropdownSection, activeTriggerRef])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        activeTriggerRef &&
        !activeTriggerRef.contains(e.target as Node)
      ) {
        dispatch(setSection(null))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch, activeTriggerRef])

  const handleMenuClick = (
    section: string | null,
    ref: React.RefObject<HTMLParagraphElement>
  ) => {
    dispatch(setSection(section))
    setActiveTriggerRef(ref.current)
  }

  const logoRef = useRef<HTMLImageElement>(null)
  const finderRef = useRef<HTMLParagraphElement>(null)
  const fileRef = useRef<HTMLParagraphElement>(null)
  const editRef = useRef<HTMLParagraphElement>(null)
  const viewRef = useRef<HTMLParagraphElement>(null)
  const goRef = useRef<HTMLParagraphElement>(null)
  const windowRef = useRef<HTMLParagraphElement>(null)
  const helpRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className="Top-bar">
      <div className="Top-items-left">
        <img
          src={assets.appleLogo}
          alt="AppleLogo"
          className={`apple-icon ${dropdownSection === 'logo' ? 'active' : ''} `}
          onClick={() => handleMenuClick('logo', logoRef)}
          ref={logoRef}
        />
        <p
          className={`Finder ${dropdownSection === 'finder' ? 'active' : ''}`}
          onClick={() => handleMenuClick('finder', finderRef)}
          ref={finderRef}
        >
          Finder
        </p>
        <p
          className={dropdownSection === 'file' ? 'active' : ''}
          onClick={() => handleMenuClick('file', fileRef)}
          ref={fileRef}
        >
          File
        </p>
        <p
          className={dropdownSection === 'edit' ? 'active' : ''}
          onClick={() => handleMenuClick('edit', editRef)}
          ref={editRef}
        >
          Edit
        </p>
        <p
          className={dropdownSection === 'view' ? 'active' : ''}
          onClick={() => handleMenuClick('view', viewRef)}
          ref={viewRef}
        >
          View
        </p>
        <p
          className={dropdownSection === 'go' ? 'active' : ''}
          onClick={() => handleMenuClick('go', goRef)}
          ref={goRef}
        >
          Go
        </p>
        <p
          className={dropdownSection === 'window' ? 'active' : ''}
          onClick={() => handleMenuClick('window', windowRef)}
          ref={windowRef}
        >
          Window
        </p>
        <p
          className={dropdownSection === 'help' ? 'active' : ''}
          onClick={() => handleMenuClick('help', helpRef)}
          ref={helpRef}
        >
          Help
        </p>

        {dropdownSection?.length && dropdownPosition && (
          <div
            className="dropdown-container"
            style={{
              left: dropdownPosition.left + 'px',
              top: dropdownPosition.top + 'px',
            }}
            ref={dropdownRef}
          >
            <Dropdown />
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
