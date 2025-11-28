export enum Operator {
  AND = '&&',
  OR = '||',
  NOT = '!',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  EQ = '==',
  NEQ = '!=',
  PLUS = '+',
  MINUS = '-',
  MUL = '*',
  DIV = '/',
}
export const OperatorRegex = {
  [Operator.AND]: '&&',
  [Operator.OR]: '\\|\\|',
  [Operator.NOT]: '!',
  [Operator.GT]: '>',
  [Operator.GTE]: '>=',
  [Operator.LT]: '<',
  [Operator.LTE]: '<=',
  [Operator.EQ]: '==',
  [Operator.NEQ]: '!=',
  [Operator.PLUS]: '\\+',
  [Operator.MINUS]: '-',
  [Operator.MUL]: '\\*',
  [Operator.DIV]: '\/',
}

export const UnaryOperators = [Operator.NOT]
