/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import numeral from 'numeral'
import * as React from 'react'
import {
  InputAccessoryView,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInputKeyPressEventData,
} from 'react-native'
import styled from 'styled-components/native'

interface IProps {
  placeholder?: string
  placeholderTextColor?: string
  borderColor?: string
  backgroundColor?: string
  textColor?: string
  allowDecimals?: boolean
  numberOfDecimals?: number
  value?: string
  onChangeText: (value: string) => void
  editable?: boolean
  borderRadius?: number
  onBlur?: (e: any) => void
  onFocus?: () => void
  allowNegatives?: boolean
  thousandSeparatorCharacter?: boolean
  maxLength?: number
  fontFamily?: string
  lockWidth?: boolean
  height?: number | string
  width?: number | string
  negativeSymbolColor?: string
}
interface IInputProps {
  editable?: boolean
  borderRadius?: number
  borderColor?: string
  backgroundColor?: string
  textColor?: string
  height?: number | string
  width?: number | string
}

interface IWrapper {
  backgroundColor?: string
}

const Wrapper = styled.View<IWrapper>`
  background-color: transparent;
`

const Input = styled.TextInput`
  flex-grow: 1;
  width: 90%;
  align-self: stretch;
  background-color: ${(props: IInputProps) => props.backgroundColor};
  color: ${(props: IInputProps) => props.textColor};
  font-size: 16px;
`

const NegativeIcon = styled.TouchableOpacity`
  align-self: flex-start;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ffff;
  justify-content: center;
  align-items: center;
`

const AccessoryContainer = styled.View`
  padding: 8px;
  background-color: #d6d8dd;
`

const InputContainer = styled.View<IInputProps>`
  background-color: ${(props: IInputProps) =>
    props.editable ? props.backgroundColor : '#E0E0E0'};
  padding: 5px;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  height: ${(props: IInputProps) =>
    typeof props.height === 'number' ? `${props.height}px` : props.height};
  width: ${(props: IInputProps) =>
    typeof props.width === 'number' ? `${props.width}px` : props.width};
  border-color: ${(props: IInputProps) => props.borderColor};
  border-width: 1px;
  border-radius: ${(props: IInputProps) => props.borderRadius}px;
`

function NumericInput({
  onChangeText,
  allowDecimals = false,
  numberOfDecimals = 2,
  value,
  editable = true,
  borderRadius = 10,
  onBlur,
  onFocus,
  allowNegatives = false,
  thousandSeparatorCharacter = true,
  placeholder = '',
  placeholderTextColor = '#CAD0D6',
  maxLength = 255,
  borderColor = '#CAD0D6',
  backgroundColor = '#FFFFFF',
  lockWidth = false,
  fontFamily,
  textColor = '#000',
  height = 60,
  width = '100%',
  negativeSymbolColor = '#000',
}: IProps): React.ReactElement {
  const [maxWidth, setMaxWidth] = React.useState<number | null>(null)
  const [isNegative, setIsNegative] = React.useState<boolean>(
    (value && value?.startsWith('-')) || false
  )
  const inputAccessoryViewID = Math.random().toString(36).substring(7)
  const [localValue, setLocalValue] = React.useState<string | undefined>()

  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (!maxWidth && lockWidth) {
        setMaxWidth(event.nativeEvent.layout.width)
      }
    },
    [maxWidth]
  )

  const negativeButtonPressed = React.useCallback(() => {
    setIsNegative(!isNegative)
  }, [isNegative])

  const handleChangeText = React.useCallback(
    (maskedText: string) => {
      if (maskedText) {
        const text = maskedText.replace(/[^0-9|\.]/g, '')
        const [integral, decimal] = text.split('.')
        const integralWithThousands = thousandSeparatorCharacter
          ? numeral(integral).format('0,0')
          : integral
        let aux = integralWithThousands
        let parentText = integral
        if (allowDecimals) {
          if (!decimal) {
            // localValue = text;
            aux = integralWithThousands
            aux += text.includes('.') ? '.' : ''
          } else {
            aux = `${integralWithThousands}.${decimal.substring(
              0,
              numberOfDecimals
            )}`
            parentText = `${integral}.${decimal.substring(0, numberOfDecimals)}`
          }
        }

        setLocalValue(aux)
        onChangeText(
          `${isNegative && parentText ? '-' : ''}${parentText.replace(
            /[^0-9.]/g,
            ''
          )}`
        )
      } else {
        // When the text is empty we assign it directly
        setLocalValue(maskedText)
        onChangeText(maskedText)
      }
    },
    [
      allowDecimals,
      isNegative,
      numberOfDecimals,
      onChangeText,
      thousandSeparatorCharacter,
    ]
  )

  // if you press the negative key on android change the value between negative and positive
  const onNegativePressedAndroid = React.useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === '-' && allowNegatives) {
        negativeButtonPressed()
      }
    },
    [allowNegatives, negativeButtonPressed]
  )

  React.useEffect(() => {
    onChangeText(
      `${isNegative && value ? '-' : ''}${
        value && value.replace(/[^0-9.]/g, '')
      }`
    )
  }, [isNegative])

  return (
    <Wrapper>
      {/* add the negative button to ios */}
      {Platform.OS === 'ios' && allowNegatives && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <AccessoryContainer>
            <NegativeIcon onPress={negativeButtonPressed}>
              <Text>-</Text>
            </NegativeIcon>
          </AccessoryContainer>
        </InputAccessoryView>
      )}
      <InputContainer
        borderColor={borderColor}
        borderRadius={borderRadius}
        editable={editable}
        backgroundColor={backgroundColor}
        width={width}
        height={height}
      >
        {isNegative && <Text style={{ color: negativeSymbolColor }}>-</Text>}
        <Input
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType='numeric'
          inputAccessoryViewID={inputAccessoryViewID}
          editable={editable}
          value={localValue}
          onBlur={onBlur}
          backgroundColor={backgroundColor}
          textColor={textColor}
          style={{
            maxWidth: maxWidth || undefined,
            fontFamily: fontFamily || undefined,
            backgroundColor: backgroundColor,
          }}
          onKeyPress={onNegativePressedAndroid}
          onFocus={onFocus}
          onLayout={onLayout}
          maxLength={maxLength}
        />
      </InputContainer>
    </Wrapper>
  )
}

export default React.memo(NumericInput)
