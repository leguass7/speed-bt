import React from 'react'

import { Checkbox } from '@mui/material'
import styled from 'styled-components'

import { formatPrice } from '~/helpers'
import { ICategory } from '~/server-side/category/category.dto'

import { ItemContainer } from './styles'

const ItemText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  flex-flow: column nowrap;
  text-align: left;
  h1,
  h2,
  h3,
  h4,
  p {
    text-align: left !important;
    width: 100%;
    max-width: 100%;
  }

  h4 {
    font-weight: bold;
  }
  p {
    font-weight: normal;
  }
`

const ItemCheck = styled.div`
  margin: 0;
`

type Props = ICategory & {
  selected?: boolean
  onSelect?: (id: number, checked: boolean) => void
  disabled?: boolean
}
export const SelectItem: React.FC<Props> = ({ id, title, price, onSelect, selected, disabled }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (onSelect) onSelect(id, checked)
  }

  return (
    <ItemContainer disabled={disabled}>
      <ItemCheck>
        <Checkbox onChange={handleSelect} checked={!!selected} disabled={disabled} />
      </ItemCheck>
      <ItemText>
        <h4>{title}</h4>
        <p>{formatPrice(price)}</p>
      </ItemText>
    </ItemContainer>
  )
}
