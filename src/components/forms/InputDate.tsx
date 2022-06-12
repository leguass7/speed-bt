import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MobileDatePicker } from '@mui/x-date-pickers'
import { useField } from '@unform/core'

import { VariantColorsTypes } from '../AppThemeProvider/types'
import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { Container, Input, Label } from './InputText/styles'

type Props = {
  name: string
  label: string
  clearable?: boolean
  fullWidth?: boolean
  themeColor?: VariantColorsTypes
  disabled?: boolean
  maxDate?: Date
  minDate?: Date
}
export const InputDate: React.FC<Props> = ({ name, label, themeColor = 'primary', disabled, maxDate, minDate }) => {
  const [actived, setActived] = useState(false)
  const { theme } = useAppTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField } = useField(name)
  const [dates, setDates] = useState<string>(defaultValue || null)

  const id = `input-text-${fieldName}`

  const handleOpen = () => setActived(true)
  const handleClose = () => setActived(false)

  const handleChange = useCallback((d: any) => {
    if (d instanceof Date) {
      setDates(d.toJSON())
    } else {
      setDates(d)
    }
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: () => {
        return dates || ''
      }
    })
  }, [fieldName, registerField, dates])

  return (
    <MobileDatePicker
      inputRef={inputRef}
      renderInput={({ inputRef, inputProps }) => (
        <Container labelColor={theme.colors[themeColor]} disabled={disabled}>
          <Input id={id} ref={inputRef} {...inputProps} className={'calendar'} />
          {label ? (
            <Label htmlFor={id} actived={actived}>
              {label}
            </Label>
          ) : null}
        </Container>
      )}
      toolbarTitle={label}
      value={dates || null}
      onChange={handleChange}
      onAccept={handleChange}
      maxDate={maxDate}
      minDate={minDate}
      onOpen={handleOpen}
      onClose={handleClose}
      // DialogProps={{
      //   PaperProps: {
      //     sx: { backgroundColor: '#f1f1f1' }
      //   }
      // }}
    />
  )
}
