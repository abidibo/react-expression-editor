import { EditorClasses } from '.'
import { ValidationResult } from '../../StateMachine/Validation'
import { Token, TokenType } from '../../Tokenizer'
import styles from './Editor.module.css'

export const cssClass = (dft: string, custom?: string) => (custom ? custom : dft)

// escape HTML for attributes
export const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c)

// generate HTML from tokens
export const generateHighlightHtml = (tokens: Token[], validation: ValidationResult, classes?: EditorClasses) => {
  const html = tokens
    .map((t, i) => {
      let className = ''
      let withError = validation.errorTokenIndex === i
      switch (t.type) {
        case TokenType.VAR:
          className = cssClass(styles.token_VAR, classes?.tokenVar)
          break
        case TokenType.VALUE:
          className = cssClass(styles.token_VALUE, classes?.tokenValue)
          break
        case TokenType.BINARY_OP:
          className = cssClass(styles.token_BINARY_OP, classes?.tokenBinaryOp)
          break
        case TokenType.UNARY_OP:
          className = cssClass(styles.token_UNARY_OP, classes?.tokenUnaryOp)
          break
        case TokenType.UNKNOWN:
          className = cssClass(styles.token_UNKNOWN, classes?.tokenUnknown)
          break
        default:
          className = ''
      }
      // We strictly escape HTML to prevent XSS, though we are generating spans
      return `<span title="${escapeHtml(validation.error ?? '')}" class="${className} ${withError ? cssClass(styles.token_ERROR, classes?.tokenError) : ''}">${t.value}</span>`
    })
    .join('')
  return html
}

// get the caret position inside an element
export const getCaretIndex = (element: HTMLElement) => {
  let position = 0
  // get the current selection (even if no text is selected but a caret is present the selection object is populated)
  const selection = window.getSelection()
  // if actually there i a selection or a caret go on
  if (selection && selection.rangeCount > 0) {
    // get the first range
    const range = selection.getRangeAt(0)
    // clone the range in order to manipulate without changing the original
    const preCaretRange = range.cloneRange()
    // select all the content inside the element
    preCaretRange.selectNodeContents(element)
    // set the end of the range as the position of the original caret
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    // count the number of characters in the selection
    position = preCaretRange.toString().length
  }
  return position
}

// set the caret position inside an element
export const setCaretIndex = (element: HTMLElement, index: number) => {
  // create a range (a dom fragment where we can place the caret)
  const range = document.createRange()
  const selection = window.getSelection()

  // how many characters we have traversed so far
  let currentPos = 0
  // start from the first child
  let node = element.firstChild

  // Traverse the DOM nodes (text and spans) to find the right spot
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // number of chars in this node
      const length = node.textContent?.length || 0
      // if adding this chars number to our current position is greater than the index we are looking for
      if (currentPos + length >= index) {
        // set the caret position inside this text node in the right position
        range.setStart(node, index - currentPos)
        // we don't need a selection, only a caret
        range.collapse(true)
        // remove the old selection if there was one
        selection?.removeAllRanges()
        // add the new selection
        selection?.addRange(range)
        return
      }
      currentPos += length
    } else {
      // if it's a span, go deeper
      if (node.childNodes.length > 0) {
        // we don't need recursion, we now that we just wrap text in span's
        const innerNode = node.firstChild
        // as we did with the text nodes
        if (innerNode) {
          const length = innerNode.textContent?.length || 0
          if (currentPos + length >= index) {
            range.setStart(innerNode, index - currentPos)
            range.collapse(true)
            selection?.removeAllRanges()
            selection?.addRange(range)
            return
          }
          currentPos += length
        }
      }
    }
    node = node.nextSibling
  }
}

// get the coordinates of the cursor
export const getCursorXY = () => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null

  const range = selection.getRangeAt(0)

  // getBoundingClientRect returns the physical position of the cursor line
  const rect = range.getBoundingClientRect()

  // If the cursor is at the start of a line, rect.left might be 0 or off.
  // We return coordinates relative to the viewport
  return {
    top: rect.bottom, // Place menu right below the line
    left: rect.left,
  }
}
