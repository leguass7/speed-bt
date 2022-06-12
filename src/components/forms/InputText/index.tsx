import React, { useEffect, useRef, useState } from 'react'
import { ReactInputMask, Props as InputMaskProps } from 'react-input-mask'

import Fade from '@mui/material/Fade'
import Tooltip from '@mui/material/Tooltip'
import { useField } from '@unform/core'

import { VariantColorsTypes } from '~/components/AppThemeProvider/types'
import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'

import { Container, Input, Label, Field, InputFeedback } from './styles'

type InputText = {
  name: string
  label?: string
  themeColor?: VariantColorsTypes
  placeholder?: string
  disabled?: boolean
}
export const InputText: React.FC<InputText> = ({ themeColor = 'primary', name, label, placeholder, disabled }) => {
  const { theme } = useAppTheme()
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, error, defaultValue } = useField(name)

  const id = `input-text-${fieldName}`

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current?.value || ''
      }
    })
  }, [fieldName, registerField])

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  return (
    <Container labelColor={theme.colors[themeColor]} disabled={disabled} hasError={!!error}>
      <Input
        ref={inputRef}
        id={id}
        type={'text'}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      {error ? (
        <Tooltip open={!!error && !focused} title={error} arrow placement="bottom-start" TransitionComponent={Fade}>
          <InputFeedback />
        </Tooltip>
      ) : null}
    </Container>
  )
}

type MaskProps = InputText & InputMaskProps
export const InputMask: React.FC<MaskProps> = ({ themeColor = 'primary', name, label, disabled, ...rest }) => {
  const inputRef = useRef<ReactInputMask>(null)
  const [focused, setFocused] = useState(false)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  const { theme } = useAppTheme()

  const id = `input-mask-${fieldName}`

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current?.value || ''
      }
    })
  }, [fieldName, registerField])

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  return (
    <Container labelColor={theme.colors[themeColor]} disabled={disabled} hasError={!!error}>
      <Field
        ref={inputRef}
        id={id}
        type={'text'}
        defaultValue={defaultValue}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      {error ? (
        <Tooltip open={!!error && !focused} title={error} arrow placement="bottom-start" TransitionComponent={Fade}>
          <InputFeedback />
        </Tooltip>
      ) : null}
    </Container>
  )
}
