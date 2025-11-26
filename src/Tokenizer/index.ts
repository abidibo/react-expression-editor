export enum TokenType {
  VAR = 'variable', // temperature, engine.transmission.speed
  NUM = 'number', // 1, 2.5
  UNARY_OP = 'unary operator', // !
  BINARY_OP = 'binary operator', // &&, ||, ==, >=, <=, !=, >, <
  OPEN_P = 'open parenthesis', // (
  CLOSE_P = 'close parenthesis', // )
  SPACE = 'space',
  UNKNOWN = 'unknown',
}

// order matters!
export const Patterns = [
  { type: TokenType.SPACE, regex: /^\s+/ },
  { type: TokenType.NUM, regex: /^(?:\d+(\.\d*)?|\.\d+)/ },
  { type: TokenType.BINARY_OP, regex: /^(==|!=|>=|<=|&&|\|\||>|<)/ },
  { type: TokenType.UNARY_OP, regex: /^!/ },
  { type: TokenType.OPEN_P, regex: /^\(/ },
  { type: TokenType.CLOSE_P, regex: /^\)/ },
  { type: TokenType.VAR, regex: /^[a-zA-Z_]\w*/ },
]

export interface Token {
  type: TokenType
  value: string
  start: number
  end: number
}

// take the input and return an array of tokens
export const tokenize = (input: string): Token[] => {
  let tokens: Token[] = []
  let cursor: number = 0

  while (cursor < input.length) {
    let matchFound = false
    const remainingInput = input.slice(cursor)

    // Try to match the current text against our patterns
    for (const { type, regex } of Patterns) {
      const match = remainingInput.match(regex)

      if (match) {
        const value = match[0]
        tokens.push({
          type,
          value,
          start: cursor,
          end: cursor + value.length,
        })

        cursor += value.length
        matchFound = true
        break
      }
    }

    // If no pattern matched, we have an invalid character
    if (!matchFound) {
      tokens.push({
        type: TokenType.UNKNOWN,
        value: remainingInput[0],
        start: cursor,
        end: cursor + 1,
      })
      cursor++
    }
  }

  return tokens
}

// get the token that the cursor is currently on
export const getActiveToken = (
  input: string,
  cursorPosition: number,
): Omit<Token, 'type'> & { type: TokenType | null } => {
  const tokens = tokenize(input)

  // Find the token that contains the cursor
  // Note: We check if cursor is >= start AND <= end.
  // Being at the very end of a word (v1|) counts as being "on" that word.
  const activeToken = tokens.find((t) => cursorPosition >= t.start && cursorPosition <= t.end)

  // Special Case: New Input
  // If we are in empty space or at the very end of string with no token,
  // we might be starting a new token.
  if (!activeToken) {
    return { type: null, value: '', start: cursorPosition, end: cursorPosition }
  }

  return activeToken
}
