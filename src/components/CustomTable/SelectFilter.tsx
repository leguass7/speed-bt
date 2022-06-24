import React, { useCallback } from 'react'

import { FormControl, InputLabel, Select } from '@mui/material'

export interface ItemOptions {
  id: string | number
  title: string
  slug?: string
  selected?: boolean
}

interface ObjectChanged {
  [x: string]: number
}

interface SelectProps {
  name: string
  onChange?: (_value?: number, _changed?: ObjectChanged) => void
  optionList?: ItemOptions[]
  disabled?: boolean
  label: string
  firstOption?: string
  width?: number
  style?: React.CSSProperties
}

const SelectFilter: React.FC<SelectProps> = props => {
  const { width = null, name, onChange, disabled, label, firstOption, optionList = [], style = {} } = props
  const handleChange = useCallback(
    e => {
      const value = parseInt(e.target.value, 10) || 0
      if (onChange) onChange(value, { [name]: value })
    },
    [onChange, name]
  )

  return (
    <FormControl variant="outlined" size="small" style={{ marginLeft: 4, width: `${width}px`, ...style }}>
      <InputLabel htmlFor={`outlined-${name}-native-simple`}>{label}</InputLabel>
      <Select
        disabled={!!disabled}
        native
        label={label}
        inputProps={{
          name: name,
          id: `outlined-${name}-native-simple`,
          style: { paddingLeft: 6 }
        }}
        onChange={handleChange}
      >
        {firstOption ? <option aria-label={firstOption} value=""></option> : null}
        {optionList.map(({ id, title }) => {
          return (
            <option key={`option-${name}-${id}`} value={id}>
              {title}
            </option>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectFilter
