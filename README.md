# React Expression Editor

This is a React component which provides a controlled editor for writing logical expressions like

```
(myVar == 3 || (myVar2 >= 4 && !myVar3)) && myVar4 != 6 && myVar5 == true
```

[Try the Demo](https://abidibo.github.io/react-expression-editor)

It provides:

- semantic highlighting and validation
- auto-completion
- custom styling

Autocomplete:

- it activates automatically when the user types a character
- it can be manually activated with tab even if no characters have been typed
- it can be manually deactivated with escape
- navigate the suggestions with arrow keys, accept with enter, and cancel with escape

Available operators:

| Operator | Description              | Type   |
| -------- | ------------------------ | ------ |
| `==`     | equal                    | Binary |
| `!=`     | not equal                | Binary |
| `>`      | greater than             | Binary |
| `<`      | less than                | Binary |
| `>=`     | greater than or equal to | Binary |
| `<=`     | less than or equal to    | Binary |
| `&&`     | and                      | Binary |
| `\|\|`   | or                       | Binary |
| `!`      | not                      | Unary  |
| `+`      | addition                 | Binary |
| `-`      | subtraction              | Binary |
| `*`      | multiplication           | Binary |
| `/`      | division                 | Binary |

## Getting Started

Install the package:

```
npm install @abidibo/react-expression-editor
```

Use it

```jsx
import { ExpressionEditor, Operator } from '@abidibo/react-expression-editor'

function App() {
  const [expression, setExpression] = useState('')
  const allowedVariables = ['myVar', 'myVar2', 'myVar3', 'myVar4']
  // all allowed if empty or undefined
  const allowedOperators = [Operator.AND, Operator.OR, Operator.NOT]
  return (
    <div>
      <ExpressionEditor
        value={expression}
        onChange={setExpression}
        variables={allowedVariables}
        operators={allowedOperators}
        constraintVariables
      />
    </div>
  )
}
```

## Props

The component accepts the following props:

| Name                  | Type            | Default Value | Description                                                                            |
| --------------------- | --------------- | ------------- | -------------------------------------------------------------------------------------- |
| `value`               | `string`        |               | The expression (Required)                                                              |
| `onChange`            | `function`      |               | A function to call when the expression changes (Required)                              |
| `variables`           | `string[]`      | []            | An array of variable names that can be used in the expression                          |
| `operators`           | `Operator[]`    | []            | An array of operators that can be used in the expression (all if empty)                |
| `maxSuggestions`      | `number`        | 10            | The maximum number of suggestions to show                                              |
| `constraintVariables` | `boolean`       | false         | If true, the expression will be validated against the allowed variables                |
| `showValidationText`  | `boolean`       | false         | If true, a validation message is always shown under the editor                         |
| `classes`             | `EditorClasses` |               | A set of classes to apply to the editor and other elements to customize the appearance |

```ts
enum Operator {
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

type EditorClasses = {
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
```

## Development

After cloning the repository and install dependencies (`yarn install`), you can run the following commands:

| Command          | Description           |
| ---------------- | --------------------- |
| `yarn clean`     | Clean the dist folder |
| `yarn build`     | Build the library     |
| `yarn storybook` | Run storybook         |

In order to start developing just run the storybook, then make changes to code and the storybook will be updated.
