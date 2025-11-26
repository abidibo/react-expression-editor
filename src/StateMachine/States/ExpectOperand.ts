import { MachineState } from '.'
import { Token, TokenType } from '../../Tokenizer'

const ExpectOperand = {
  manageToken: (token: Token, parenDepth: number) => {
    let nextState: MachineState = MachineState.EXPECT_OPERAND
    let error: string | null = null

    switch (token.type) {
      case TokenType.UNKNOWN:
        error = `Invalid character: "${token.value}"`
        break
      // if we got a value, perfect, then we expect an operator
      case TokenType.VAR:
      case TokenType.NUM:
        nextState = MachineState.EXPECT_OPERATOR
        break
      // if we got a parenthesis we stay in the same state but we increase the depth of parenthesis
      case TokenType.OPEN_P:
        parenDepth++
        break
      // if we got a unary operator, we stay in the same state, because after that we expect an operand
      case TokenType.UNARY_OP:
        break
      // If we got a binary operator, we have an error
      case TokenType.BINARY_OP:
        error = `Unexpected operator "${token.value}" at start of expression`
      // If we got a closing parenthesis, we have an error
      case TokenType.CLOSE_P:
        error = 'Unexpected closing parenthesis'
      default:
        error = `Expected value, found "${token.value}"`
    }

    return {
      state: nextState,
      parenDepth,
      error,
    }
  },
}

export default ExpectOperand
