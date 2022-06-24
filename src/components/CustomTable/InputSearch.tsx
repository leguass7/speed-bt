import React from 'react'

import { Search } from '@mui/icons-material'
import { TextField, InputAdornment } from '@mui/material'

interface InputSearchProps {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>
  value?: string | number
  label?: string
  name?: string
  className?: string
  style?: React.CSSProperties
}

const InputSearch: React.FC<InputSearchProps> = props => {
  const { name, label, value, className, onChange, onKeyUp, style = {} } = props
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      size="small"
      onChange={onChange}
      className={className}
      style={{ padding: 0, ...style }}
      InputProps={{
        style: { padding: 0, paddingLeft: 6 },
        startAdornment: (
          <InputAdornment position="start">
            <Search color="primary" />
          </InputAdornment>
        )
      }}
      onKeyUp={onKeyUp}
    />
  )
}

export default InputSearch
