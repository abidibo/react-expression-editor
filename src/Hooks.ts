import { Dispatch, MutableRefObject, RefObject, SetStateAction, useState } from 'react'

import { EditorClasses } from './Components/Editor'
import { generateHighlightHtml, getCursorXY } from './Components/Editor/Helpers'
import { Operator } from './Config/Operators'
import { validate, ValidationResult } from './StateMachine/Validation'
import { getActiveToken, tokenize, TokenType } from './Tokenizer'

export const useAutocomplete = (
  updateHtml: (plainText: string) => void,
  variables: string[],
  cursorRef: MutableRefObject<number>,
  editorRef: RefObject<HTMLDivElement>,
  text: string,
  setText: (text: string) => void,
  classes?: EditorClasses,
) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const AUTOCOMPLETE_POOL = [...variables, ...Object.values(Operator)]

  const updateSuggestions = (plainText: string, caretPosition: number) => {
    // Check what is under the cursor
    const token = getActiveToken(plainText, caretPosition)
    if (!token.type) return

    // Triggers: Variables (VAR), Operators (OP), or Unknown/Partial words
    // We do NOT trigger on Numbers or Spaces (unless you want to)
    const validTrigger = [TokenType.VAR, TokenType.BINARY_OP, TokenType.UNKNOWN].includes(token.type)

    if (validTrigger && token.value.trim().length > 0) {
      const matchText = token.value.toLowerCase()

      const matches = AUTOCOMPLETE_POOL.filter(
        (item) => item.toLowerCase().startsWith(matchText) && item !== token.value,
      )

      if (matches.length > 0) {
        const coords = getCursorXY()
        if (coords) {
          setMenuPos(coords)
          setSuggestions(matches)
          setSelectedIndex(0)
          setShowMenu(true)
          return // Exit, menu is open
        }
      }
    }

    setShowMenu(false)
  }

  const insertSuggestion = (suggestion: string) => {
    // find the token we're currently on
    const cursorPos = cursorRef.current || 0
    const token = getActiveToken(text, cursorPos)

    // replace partial token with full suggestion
    const beforeToken = text.slice(0, token.start)
    const afterToken = text.slice(token.end)

    // add a space after if it's a variable
    const suffix = Object.values(Operator).includes(suggestion as Operator) ? '' : ' '
    const newText = beforeToken + suggestion + suffix + afterToken

    // update
    setText(newText)
    updateHtml(newText)

    // move the cursor to the end of inserted word + suffix
    cursorRef.current = token.start + suggestion.length + suffix.length

    setShowMenu(false)

    // Force focus back to editor
    editorRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (showMenu) {
      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % suggestions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        insertSuggestion(suggestions[selectedIndex])
      } else if (e.key === 'Escape') {
        setShowMenu(false)
      }
    }
  }

  return {
    updateSuggestions,
    showMenu,
    suggestions,
    menuPos,
    selectedIndex,
    setShowMenu,
    setSelectedIndex,
    insertSuggestion,
    handleKeyDown,
  }
}

export const useValidateHtml = (
  initialValue: string,
  variables: string[],
  constraintVariables: boolean,
  classes?: EditorClasses,
) => {
  const [html, setHtml] = useState(
    generateHighlightHtml(tokenize(initialValue), variables, constraintVariables, classes).html,
  )
  const [validation, setValidation] = useState<ValidationResult | null>(null)

  const updateHtml = (plainText: string) => {
    const tokens = tokenize(plainText)
    const validation = validate(tokens, variables, constraintVariables)
    const html = generateHighlightHtml(tokens, validation, classes)
    setHtml(html)
    setValidation(validation)
  }

  return {
    html,
    validation,
    updateHtml,
  }
}
