import React, { useEffect } from 'react'
import NumericInput from 'react-native-ultimate-numeric-input'

const App = () => {
  const onChangeText = React.useCallback((text) => {
    console.log(text)
  }, [])

  return (
    <NumericInput onChangeText={onChangeText} allowDecimals allowNegatives />
  )
}

export default App
