import { useRef, useLayoutEffect } from 'react'

import { Operator } from '../../Config/Operators'
import { useAutocomplete, useValidateHtml } from '../../Hooks'
import AutoCompleteMenu from '../AutoCompleteMenu'
import styles from './Editor.module.css'
import { cssClass, getCaretIndex, setCaretIndex } from './Helpers'

export type EditorClasses = {
  root?: string // The outer wrapper
  editor?: string // The contentEditable area
  validation?: string // The validation error message
  menu?: string // The autocomplete dropdown ul
  menuItem?: string // The li items
  menuItemActive?: string // The highlighted li item

  // Token Highlighting slots
  tokenVar?: string // Variables
  tokenBinaryOp?: string // Binary operators (&&, ||)
  tokenUnaryOp?: string // Unary operators (!)
  tokenValue?: string // Numbers
  tokenUnknown?: string // Errors
  tokenError?: string // Errors
}

type EditorProps = {
  value: string
  onChange: (value: string) => void
  variables?: string[]
  operators?: Operator[]
  constraintVariables?: boolean
  showValidationText?: boolean
  maxSuggestions?: number
  classes?: EditorClasses
}
const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  showValidationText,
  variables = [],
  operators = [],
  constraintVariables = false,
  maxSuggestions = 10,
  classes,
}) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const { html, validation, updateHtml } = useValidateHtml(value, variables, operators, constraintVariables, classes)

  // store the cursor position in a ref (doesn't trigger re-renders)
  const cursorRef = useRef<number>(0)

  // autocomplete
  const { updateSuggestions, showMenu, menuPos, suggestions, selectedIndex, handleKeyDown, insertSuggestion } =
    useAutocomplete(updateHtml, variables, operators, cursorRef, editorRef, value, onChange, maxSuggestions)

  const handleInput = () => {
    if (!editorRef.current) return

    // get raw text and Current Cursor Pos
    const plainText = editorRef.current.innerText
    cursorRef.current = getCaretIndex(editorRef.current)

    // generate new Colorful HTML and validate
    updateHtml(plainText)

    // propagate to parent
    onChange(plainText)

    // autocomplete
    updateSuggestions(plainText, cursorRef.current)
  }

  // This fires synchronously after the DOM updates from 'setHtml'
  useLayoutEffect(() => {
    if (editorRef.current) {
      // We need to restore the cursor position after the DOM updates, otherwise it will always be at the beginning
      setCaretIndex(editorRef.current, cursorRef.current)
    }
  }, [html, showMenu, selectedIndex]) // ahould run every time the editable content is rendered

  return (
    <div style={{ position: 'relative' }} className={cssClass(styles.root, classes?.root)}>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true} // react warns about this, we silence it
        dangerouslySetInnerHTML={{ __html: html }}
        className={cssClass(styles.editor, classes?.editor)}
      />
      {showMenu && (
        <AutoCompleteMenu
          suggestions={suggestions}
          menuPos={menuPos}
          selectedIndex={selectedIndex}
          insertSuggestion={insertSuggestion}
          classes={classes}
        />
      )}
      {showValidationText && (
        <div className={cssClass(styles.validation, classes?.validation)}>
          {validation?.error && `${validation.error} at character ${validation.errorCharPosition}`}
        </div>
      )}
    </div>
  )
}

export default Editor
