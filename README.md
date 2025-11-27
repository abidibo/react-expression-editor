# React Expression Editor

This is a React component which provides a controlled editor for writing logical expressions like

```
(myVar == 3 || (myVar2 >= 4 && !myVar3)) && myVar4 != 6
```

It provides:

- semantic highlighting and validation
- auto-completion
- custom styling

Autocomplete:

- it activates on keydown
- it can be manually activated with tab even if no characters have been typed
- it can be manually deactivated with escape
- navigate the suggestions with arrow keys, accept with enter, and cancel with escape

[Demo](https://abidibo.github.io/react-expression-editor)

## Getting Started

Install the package:

```
npm install @abidibo/react-expression-editor
```

Use it

```jsx
import { ExpressionEditor } from '@abidibo/react-expression-editor'

function App() {
  const [expression, setExpression] = useState('')
  const allowedVariables = ['myVar', 'myVar2', 'myVar3', 'myVar4']
  return (
    <div>
      <ExpressionEditor
        value={expression}
        onChange={setExpression}
        allowedVariables={allowedVariables}
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
| `value`               | `string`        |               | The expression                                                                         |
| `onChange`            | `function`      |               | A function to call when the expression changes                                         |
| `allowedVariables`    | `string[]`      |               | An array of variable names that can be used in the expression                          |
| `maxSuggestions`      | `number`        | 10            | The maximum number of suggestions to show                                              |
| `constraintVariables` | `boolean`       | false         | If true, the expression will be validated against the allowed variables                |
| `showValidationText`  | `boolean`       | false         | If true, a validation message is always shown under the editor                         |
| `classes`             | `EditorClasses` |               | A set of classes to apply to the editor and other elements to customize the appearance |

```ts
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
  tokenNum?: string // Numbers
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
