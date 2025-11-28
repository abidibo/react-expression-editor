import { MachineState } from '.'
import { Token, TokenType } from '../../Tokenizer'

const ExpectOperator = {
  manageToken: (token: Token, parenDepth: number) => {
    let nextState: MachineState = MachineState.EXPECT_OPERATOR
    let error: string | null = null

    switch (token.type) {
      case TokenType.UNKNOWN:
        error = `Invalid character: "${token.value}"`
        break
      // if we got a binary operator, we return the EXPECT_OPERAND state
      case TokenType.BINARY_OP:
        nextState = MachineState.EXPECT_OPERAND
        break
      // we can have a closing parenthesis but only if we have a matching opening parenthesis, and we then still expect an operator
      case TokenType.CLOSE_P:
        parenDepth--
        if (parenDepth < 0) {
          error = 'Too many closing parentheses'
        }
        break
      case TokenType.VAR:
      case TokenType.VALUE:
        error = `Expected operator, found "${token.value}"`
      case TokenType.OPEN_P:
        error = 'Implicit multiplication not allowed. Use an operator like && or ||'
      default:
        error = `Expected operator, found "${token.value}"`
    }

    return {
      state: nextState,
      parenDepth,
      error,
    }
  },
}

export default ExpectOperator
