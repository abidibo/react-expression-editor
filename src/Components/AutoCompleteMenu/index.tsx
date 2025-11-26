import { Operator } from '../../Config/Operators'
import { EditorClasses } from '../Editor'
import { cssClass } from '../Editor/Helpers'
import styles from './AutoCompleteMenu.module.css'

type AutoCompleteMenuProps = {
  suggestions: string[]
  menuPos: { top: number; left: number }
  selectedIndex: number
  insertSuggestion: (suggestion: string) => void
  classes?: EditorClasses
}
const AutoCompleteMenu: React.FC<AutoCompleteMenuProps> = ({
  suggestions,
  menuPos,
  selectedIndex,
  insertSuggestion,
  classes,
}) => {
  return (
    <ul
      className={cssClass(styles.menu, classes?.menu)}
      style={{
        top: menuPos.top,
        left: menuPos.left,
      }}
    >
      {suggestions.map((item, index) => (
        <li
          key={item}
          onMouseDown={(e) => {
            // Prevent blur event on editor when clicking menu
            e.preventDefault()
            insertSuggestion(item)
          }}
          className={`${cssClass(styles.menuItem, classes?.menuItem)} ${index === selectedIndex ? cssClass(styles.menuItemActive, classes?.menuItemActive) : ''}`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default AutoCompleteMenu
