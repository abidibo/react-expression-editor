import Editor from './Editor'

const variables = ['pippo', 'pluto', 'var1', 'cazzo']

const ExpressionEditor = () => {
  const handleChange = (value: string) => {
    console.log('Value', value)
  }
  return <Editor onChange={handleChange} variables={variables} />
}

export default ExpressionEditor
