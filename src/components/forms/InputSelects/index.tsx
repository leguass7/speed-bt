import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { useField } from '@unform/core'

import { VariantColorsTypes } from '~/components/AppThemeProvider/types'
import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'

import { Label, Container } from '../InputText/styles'
import { FlexContainer } from './styles'

export type CategoryOption = {
  id: string
  label: string
}

type CategoryId = CategoryOption['id']

type Props<T extends CategoryOption> = {
  name: string
  label?: string
  themeColor?: VariantColorsTypes
  disabled?: boolean
  options: T[]
  defaultSelected?: CategoryId
}
export const InputSelects: React.FC<Props<any>> = ({ name, themeColor = 'primary', label, disabled, options, defaultSelected }) => {
  const { fieldName, defaultValue, registerField } = useField(name)
  const { theme } = useAppTheme()
  const [category, setCategory] = useState<CategoryId>(defaultValue || defaultSelected)

  const handleChange = (value: CategoryId) => {
    return () => {
      setCategory(value)
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return category
      }
    })
  }, [fieldName, registerField, category])

  useEffect(() => {
    if (defaultSelected && !category) setCategory(defaultSelected)
  }, [defaultSelected, category])

  return (
    <Container labelColor={theme.colors[themeColor]} disabled={disabled}>
      {label ? <Label>{label}</Label> : null}
      <FlexContainer>
        {options.map(cat => {
          const variant = cat.id === category ? 'contained' : 'outlined'
          return (
            <Button id={`cat-${fieldName}-${cat.id}`} variant={variant} key={`cat-${cat.id}`} onClick={handleChange(cat.id)}>
              {cat.label}
            </Button>
          )
        })}
      </FlexContainer>
    </Container>
  )
}
