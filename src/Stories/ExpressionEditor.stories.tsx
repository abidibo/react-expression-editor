/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import Editor from '../Components/Editor'

type EditorProps = React.ComponentProps<typeof Editor>
const meta: Meta<EditorProps> = {
  title: 'Expression Editor',
  component: Editor,
  decorators: [
    (Story, context) => {
      return (
        <div style={{ maxWidth: '1000px' }}>
          <h2>react-expression-editor</h2>
          <Story />
        </div>
      )
    },
  ],
  args: {
    variables: ['engine.transmission.speed', 'temperature', 'var1'],
    constraintVariables: true,
    showValidationText: true,
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // argTypes: {
  //   themeMode: {
  //     options: ['light', 'dark'], // iterator
  //     mapping: ['light', 'dark'],
  //     control: {
  //       type: 'select',
  //       labels: ['light', 'dark']
  //     },
  //   }
  // }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState('')
    console.log('Current value', value)

    return (
      <div style={{ maxWidth: '100%', width: '600px' }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {},
}

export const NoVariableConstraint: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState('')
    console.log('Current value', value)

    return (
      <div style={{ maxWidth: '100%', width: '600px' }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    constraintVariables: false,
  },
}

export const NoValidationMessage: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState('')
    console.log('Current value', value)

    return (
      <div style={{ maxWidth: '100%', width: '600px' }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    showValidationText: false,
  },
}

export const InitialValue: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState('(engine.transmission.speed > 100) || !temperature')
    console.log('Current value', value)

    return (
      <div style={{ maxWidth: '100%', width: '600px' }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    showValidationText: false,
  },
}
