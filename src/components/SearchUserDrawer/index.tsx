import React, { useCallback, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { CircleLoading } from '~/components/CircleLoading'
import { SearchBar } from '~/components/SearchBar'
import type { IUser } from '~/server-side/users'
import { findPartner } from '~/service/api/user'

import { FoundList } from './FoundList'
import { ButtonClose, Container, ContentLimit } from './styles'
import { Filter, useValidateFilter } from './useValidateFilter'

export type { Filter }
function hasValues(filter: Filter) {
  return Object.values({ ...filter }).find(f => !!f) || null
}

type Props = {
  open?: boolean
  onClose?: () => void
  onSelect?: (userId: IUser['id'], data?: IUser) => void
  fixedFilter?: { categoryId: number }
  message?: string
  notFoundMessage?: string
}
export const SearchUserDrawer: React.FC<Props> = ({ open, onClose, onSelect, fixedFilter, message, notFoundMessage }) => {
  const [loading, setLoading] = useState(false)
  const [searchStarted, setSearchStarted] = useState(false)
  const [filter, setFilter] = useState<Filter>({})
  const [data, setData] = useState<IUser[]>([])
  const [error, validateFilter] = useValidateFilter()

  const handleClose = useCallback(() => {
    setData([])
    setFilter({})
    setSearchStarted(false)
    if (onClose) onClose()
  }, [onClose])

  const updateFilter = useCallback((data: Filter) => {
    setFilter({ ...data })
    if (!hasValues(data)) setData([])
  }, [])

  const handleChangeType = useCallback(
    async (event: React.SyntheticEvent, key: keyof Filter) => {
      const value = Object.values({ ...filter }).find(f => !!f) || ''
      updateFilter({ [key]: value })
    },
    [filter, updateFilter]
  )

  const handleChangeText = useCallback(
    async (value: string) => {
      const key = Object.keys({ ...filter }).find(f => !!f) || 'search'
      updateFilter({ [key]: value })
    },
    [filter, updateFilter]
  )

  const fetchData = useCallback(async () => {
    const hasFilter = Object.values(filter).find(f => !!f)
    const invalid = await validateFilter(filter)
    if (hasFilter && !invalid) {
      setLoading(true)
      const response = await findPartner({ ...filter, ...fixedFilter })
      setLoading(false)

      if (response?.success) {
        setData(response?.users || [])
        setSearchStarted(true)
      }
    }
  }, [filter, validateFilter, fixedFilter])

  const handleClickItem = useCallback(
    (userId: IUser['id']) => {
      if (onSelect)
        onSelect(
          userId,
          data.find(f => f.id === userId)
        )
      handleClose()
    },
    [handleClose, onSelect, data]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Drawer open={open} onClose={handleClose} anchor="top">
      <Container>
        <ContentLimit>
          <RadioGroup row aria-labelledby="pesquisar-por" name="position" defaultValue="search" onChange={handleChangeType} defaultChecked>
            <FormControlLabel defaultChecked value="search" control={<Radio />} label="Busca" labelPlacement="end" />
          </RadioGroup>
          <SearchBar
            onChangeText={handleChangeText}
            variant="outline"
            hasError={!!error}
            messageError={error}
            placeholder={'buscar parceiro(a)'}
            onClear={() => setSearchStarted(false)}
          />
          <Divider />
          {loading ? (
            <div style={{ position: 'relative' }}>
              <CircleLoading minheight={100} />
            </div>
          ) : (
            <FoundList
              list={data}
              onClickItem={handleClickItem}
              searchStarted={searchStarted}
              registeredGroups={[]}
              message={message}
              notFoundMessage={notFoundMessage}
            />
          )}
          <ButtonClose color="primary" onClick={handleClose}>
            <CloseIcon />
          </ButtonClose>
        </ContentLimit>
      </Container>
    </Drawer>
  )
}
