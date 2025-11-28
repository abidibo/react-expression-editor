import { Operator, OperatorRegex, UnaryOperators } from '../Config/Operators'

export enum TokenType {
  VAR = 'variable', // temperature, engine.transmission.speed
  VALUE = 'number', // 1, 2.5
  UNARY_OP = 'unary operator', // !
  BINARY_OP = 'binary operator', // &&, ||, ==, >=, <=, !=, >, <, +, -, *, /
  OPEN_P = 'open parenthesis', // (
  CLOSE_P = 'close parenthesis', // )
  SPACE = 'space',
  UNKNOWN = 'unknown',
}

// order matters!
export const Patterns = (operators: Operator[]) => {
  const sortedOperators = operators
    .filter((op) => !UnaryOperators.includes(op))
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
  const binaryOpRegex = new RegExp(`^(${sortedOperators.map((op) => OperatorRegex[op]).join('|')})`)

  return [
    { type: TokenType.SPACE, regex: /^\s+/ },
    { type: TokenType.VALUE, regex: /^(?:\d+(?:\.\d*)?|\.\d+|true|false)/ },
    { type: TokenType.BINARY_OP, regex: binaryOpRegex },
    { type: TokenType.UNARY_OP, regex: /^!/ },
    { type: TokenType.OPEN_P, regex: /^\(/ },
    { type: TokenType.CLOSE_P, regex: /^\)/ },
    { type: TokenType.VAR, regex: /^[a-zA-Z_][\w.]*/ },
  ]
}

export interface Token {
  type: TokenType
  value: string
  start: number
  end: number
}

// take the input and return an array of tokens
export const tokenize = (input: string, availableOperators: Operator[]): Token[] => {
  const operators = availableOperators.length > 0 ? availableOperators : Object.values(Operator)
  let tokens: Token[] = []
  let cursor: number = 0

  while (cursor < input.length) {
    let matchFound = false
    const remainingInput = input.slice(cursor)

    // Try to match the current text against our patterns
    for (const { type, regex } of Patterns(operators)) {
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
  availableOperators: Operator[],
  cursorPosition: number,
): Omit<Token, 'type'> & { type: TokenType | null } => {
  const tokens = tokenize(input, availableOperators)

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
