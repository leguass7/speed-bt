import React, { useCallback, useRef, useState } from 'react'

import { Search, Close } from '@mui/icons-material'

import { debounceEvent } from '~/helpers/debounce'

import { SearchContainer, SearchWrapper, SearchInput, SearchIcon, TextError, VariantType } from './styles'
export type SearchVarProps = {
  defaultValue?: string
  onClear?: () => void
  onChangeText?: (text?: string) => void
  debounce?: number
  placeholder?: string
  hasError?: boolean
  messageError?: string
  disabled?: boolean
  variant?: VariantType
}

export const SearchBar: React.FC<SearchVarProps> = ({
  onChangeText,
  onClear,
  debounce = 500,
  placeholder = 'pesquisar',
  variant = 'default',
  hasError,
  messageError,
  disabled
}) => {
  const inputRef = useRef<any>()
  const [hasText, setHasText] = useState(false)

  const emitText = useCallback(
    (text?: string) => {
      if (onChangeText) onChangeText(text)
      setHasText(!!text)
      if (onClear && !text) onClear()
    },
    [onChangeText, onClear]
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const newText = event?.target?.value ?? ''
      emitText(newText)
    },
    [emitText]
  )

  const handleSearchClick = useCallback(() => {
    if (hasText && inputRef.current) {
      inputRef.current.value = ''
      emitText('')
    } else {
      emitText(inputRef?.current?.value || '')
    }
  }, [inputRef, hasText, emitText])

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(() => {
    //
  }, [])

  return (
    <SearchContainer disabled={!!disabled}>
      <SearchWrapper hasError={!!hasError} variant={variant}>
        <SearchInput>
          <input
            disabled={!!disabled}
            ref={inputRef}
            placeholder={placeholder}
            onChange={debounceEvent(handleChange, debounce)}
            onKeyDown={handleKeyDown}
          />
        </SearchInput>
        <SearchIcon>
          <button type="button" onClick={handleSearchClick} disabled={!!disabled}>
            {hasText ? <Close fontSize="small" /> : <Search fontSize="small" />}
          </button>
        </SearchIcon>
      </SearchWrapper>
      {hasError && messageError ? <TextError>{messageError}</TextError> : null}
    </SearchContainer>
  )
}
