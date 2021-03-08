# react-native-ultimate-numeric-input

Why should you use this component?

- Negative numbers on Android and iOS
- Thousand comma separator.
- Decimal numbers

## Props

|           Props            | Type             |
| :------------------------: | ---------------- |
|        placeholder         | string           |
|    placeholderTextColor    | string           |
|        borderColor         | number           |
|      backgroundColor       | string           |
|         textColor          | string           |
|       allowDecimals        | boolean          |
|      numberOfDecimals      | number           |
|           value            | string           |
|        onChangeText        | function         |
|          editable          | boolean          |
|        borderRadius        | number           |
|           onBlur           | function         |
|          onFocus           | function         |
|       allowNegatives       | boolean          |
| thousandSeparatorCharacter | boolean          |
|         maxLength          | number           |
|         fontFamily         | string           |
|         lockWidth          | boolean          |
|           height           | number \| string |
|           width            | number \| string |

# Example

```javascript
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
```

# Image

![Example](https://i.ibb.co/G5xkVXQ/Simulator-Screen-Shot-i-Phone-12-mini-2021-03-05-at-13-00-57.png)
