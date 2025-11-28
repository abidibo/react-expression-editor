import { MutableRefObject, RefObject, useState } from 'react'

import { EditorClasses } from './Components/Editor'
import { generateHighlightHtml, getCursorXY } from './Components/Editor/Helpers'
import { Operator, UnaryOperators } from './Config/Operators'
import { MachineState } from './StateMachine/States'
import { validate, ValidationResult } from './StateMachine/Validation'
import { getActiveToken, tokenize, TokenType } from './Tokenizer'

export const useAutocomplete = (
  updateHtml: (plainText: string) => void,
  variables: string[],
  operators: Operator[],
  cursorRef: MutableRefObject<number>,
  editorRef: RefObject<HTMLDivElement>,
  text: string,
  setText: (text: string) => void,
  maxSuggestions: number,
) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const availableOperators = operators.length > 0 ? operators : Object.values(Operator)
  const AUTOCOMPLETE_POOL = [...variables, ...availableOperators]

  const updateSuggestions = (plainText: string, caretPosition: number) => {
    // Check what is under the cursor
    const token = getActiveToken(plainText, availableOperators, caretPosition)
    if (!token.type) return

    // Triggers: Variables (VAR), Operators (OP), or Unknown/Partial words
    // We do NOT trigger on Numbers or Spaces (unless you want to)
    const validTrigger = [TokenType.VAR, TokenType.BINARY_OP, TokenType.UNKNOWN].includes(token.type)

    if (validTrigger && token.value.trim().length > 0) {
      const matchText = token.value.toLowerCase()

      // get matches that start with the current token
      const matches = AUTOCOMPLETE_POOL.filter(
        (item) => item.toLowerCase().startsWith(matchText) && item !== token.value,
      )
      if (matches.length < maxSuggestions) {
        // get matches that contain the current token
        matches.push(
          ...AUTOCOMPLETE_POOL.filter((item) => item.toLowerCase().includes(matchText) && item !== token.value),
        )
      }

      if (matches.length > 0) {
        const coords = getCursorXY() // coordinates relative to the viewport
        if (coords) {
          // convert coordintates to those relative to the editor
          const rect = editorRef.current!.getBoundingClientRect()
          coords.left = coords.left - rect.left
          coords.top = coords.top - rect.top
          setMenuPos(coords)
          setSuggestions([...new Set(matches.slice(0, maxSuggestions))])
          setSelectedIndex(0)
          setShowMenu(true)
          return // Exit, menu is open
        }
      }
    }

    setShowMenu(false)
  }

  const showStateSuggestions = (plainText: string) => {
    // Check what is under the cursor
    const { state } = validate(tokenize(plainText, availableOperators), variables, false)

    const matches =
      state == MachineState.EXPECT_OPERAND
        ? [...variables, ...UnaryOperators]
        : availableOperators.filter((op) => !UnaryOperators.includes(op))

    if (matches.length > 0) {
      const coords = getCursorXY()
      if (coords) {
        const rect = editorRef.current!.getBoundingClientRect()
        coords.left = coords.left === 0 && coords.top === 0 ? 0 : coords.left - rect.left
        coords.top = coords.top === 0 && coords.left === 0 ? 26 : coords.top - rect.top
        setMenuPos(coords)
        setSuggestions([...new Set(matches.slice(0, maxSuggestions))])
        setSelectedIndex(0)
        setShowMenu(true)
        return // Exit, menu is open
      }
    }

    setShowMenu(false)
  }

  const insertSuggestion = (suggestion: string) => {
    // find the token we're currently on
    const cursorPos = cursorRef.current || 0
    const token = getActiveToken(text, availableOperators, cursorPos)

    // replace partial token with full suggestion
    const beforeToken = text.slice(0, token.start)
    const afterToken = text.slice(token.end)

    // add a space after if it's a variable
    const suffix = UnaryOperators.includes(suggestion as Operator) ? '' : ' '
    const prefix = token.type === TokenType.SPACE ? ' ' : ''
    const newText = beforeToken + prefix + suggestion + suffix + afterToken

    // update
    setText(newText)
    updateHtml(newText)

    // move the cursor to the end of inserted word + suffix
    cursorRef.current = token.start + prefix.length + suggestion.length + suffix.length

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
    } else {
      if (e.key === 'Tab') {
        e.preventDefault()
        showStateSuggestions(editorRef.current?.innerText || '')
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
  operators: Operator[],
  constraintVariables: boolean,
  classes?: EditorClasses,
) => {
  const availableOperators = operators.length > 0 ? operators : Object.values(Operator)
  const tokens = tokenize(initialValue, availableOperators)
  const [validation, setValidation] = useState<ValidationResult>(validate(tokens, variables, constraintVariables))
  const [html, setHtml] = useState(
    generateHighlightHtml(tokenize(initialValue, availableOperators), validation, classes),
  )

  const updateHtml = (plainText: string) => {
    const tokens = tokenize(plainText, availableOperators)
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
