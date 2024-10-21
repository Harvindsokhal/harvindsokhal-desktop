import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import getDropdownContent from '../../utils/getDropdownContent'
import './Dropdown.scss'

const Dropdown = () => {
  const dropdownState = useSelector((state: RootState) => state.dropdown)
  const content = getDropdownContent(dropdownState)

  return (
    <div className="dropdown-menu">
      {content.map((item, i) =>
        item.name === 'divider' ? (
          <div key={i} className="divider" />
        ) : (
          <div
            key={i}
            className={`dropdown-item ${item.available ? 'selectable' : 'unselectable'}`}
            style={{
              color: item.available ? 'white' : 'rgba(255, 255, 255, 0.55)',
            }}
          >
            {item.name}
          </div>
        )
      )}
    </div>
  )
}

export default Dropdown
