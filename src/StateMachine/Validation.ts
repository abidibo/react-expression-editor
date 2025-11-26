import { Token, TokenType } from '../Tokenizer'
import { MachineState } from './States'
import ExpectOperand from './States/ExpectOperand'
import ExpectOperator from './States/ExpectOperator'

export interface ValidationResult {
  isValid: boolean
  error: string | null
  errorToken?: Token
  errorTokenIndex?: number
  errorCharPosition?: number
  state?: MachineState
}
export const validate = (tokens: Token[], variables: string[], constraintVariables: boolean): ValidationResult => {
  // At the beginning of the string we are expecting a value, a unary operator or a parenthesis
  let state = MachineState.EXPECT_OPERAND
  let parenDepth = 0
  let currentPosition = 0
  let error = null

  // Iterate tokens
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === TokenType.SPACE) {
      currentPosition = currentPosition + token.value.length
      continue
    }
    if (constraintVariables && token.type === TokenType.VAR && !variables.includes(token.value)) {
      return {
        isValid: false,
        error: `Unknown variable "${token.value}"`,
        errorToken: token,
        errorTokenIndex: i,
        errorCharPosition: currentPosition,
        state,
      }
    }
    switch (state) {
      case MachineState.EXPECT_OPERAND:
        ;({ state, parenDepth, error } = ExpectOperand.manageToken(token, parenDepth))
        break
      case MachineState.EXPECT_OPERATOR:
        ;({ state, parenDepth, error } = ExpectOperator.manageToken(token, parenDepth))
        break
    }

    if (error) {
      return { isValid: false, error, errorToken: token, errorTokenIndex: i, errorCharPosition: currentPosition }
    }

    currentPosition = currentPosition + token.value.length
  }

  if (parenDepth !== 0) {
    return { isValid: false, error: 'Unbalanced parentheses', errorCharPosition: currentPosition, state }
  }

  // if we end in EXPECT_OPERAND, it means we have a dangling operator (e.g., "v1 &&")
  if (state === MachineState.EXPECT_OPERAND && tokens.filter((t) => t.type !== TokenType.SPACE).length > 0) {
    return {
      isValid: false,
      error: 'Expression cannot end with an operator',
      errorCharPosition: currentPosition,
      state,
    }
  }

  return { isValid: true, error: null, state }
}
