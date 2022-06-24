// import useIsMounted from '@/components/common/useIsMounted'
// import InputSearch from '@/components/Table/InputSearch'
// import { Add, ArrowBack, FilterList, Refresh } from '@mui/icons-material'
// import { Button, Container, IconButton, Toolbar } from '@mui/material'
// import React, { useCallback, useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'

// // import { debounceEvent } from '@/helpers'
// import PaperTitle from '../PaperTitle'
// import { useCustomTableFilter } from './hooks'

// interface IFilter {
//   name?: string
//   label?: string
//   stateId?: number
// }

// interface TableFilterProps {
//   inputValue?: string
//   fetchData?: <T>(_filter?: IFilter & T) => void
//   debounce?: number
//   onAdd?: () => void
//   reload?: boolean
//   filter?: boolean
//   loading?: boolean
//   initialFilterMode?: boolean
//   searchFields?: (keyof IFilter)[] | keyof IFilter
//   onPrev?: () => void
//   title?: string
//   onSelect?: () => void
//   disableSelect?: boolean
// }

// const TableFilter: React.FC<TableFilterProps> = ({
//   inputValue,
//   // debounce = 500,
//   fetchData,
//   onAdd,
//   reload = false,
//   children,
//   loading,
//   initialFilterMode = false,
//   searchFields = 'name',
//   onPrev,
//   onSelect,
//   disableSelect,
//   title,
//   filter
// }) => {
//   const isMounted = useIsMounted()
//   const [filterMode, setFilterMode] = useState(initialFilterMode)
//   const { setFilter, emitFetch, clearFilter } = useCustomTableFilter<IFilter>()
//   const { go } = useHistory()

//   const handleReload = useCallback(() => {
//     if (fetchData) fetchData()
//     else if (emitFetch) emitFetch()
//   }, [fetchData, emitFetch])

//   const updateFilter = useCallback(
//     (data: Partial<IFilter>) => {
//       if (isMounted.current) {
//         setFilter(old => ({ ...old, ...data }))
//       }
//     },
//     [isMounted, setFilter]
//   )

//   const handleFilterClick = useCallback(() => {
//     setFilterMode(old => !old)
//   }, [])

//   useEffect(() => {
//     if (!filterMode && clearFilter) clearFilter()
//   }, [clearFilter, filterMode])

//   const handleSearch = useCallback(
//     e => {
//       const name = e && e.target ? e.target.value || '' : ''
//       const data: any = {}
//       forceArray(searchFields).forEach(field => {
//         data[field] = name
//       })

//       updateFilter({ ...data })
//     },
//     [updateFilter, searchFields]
//   )

//   const handleKeyUp = useCallback(
//     e => {
//       if (e.code === 'Enter') handleSearch(e)
//       if (e.target.value === '') handleSearch(e)
//     },
//     [handleSearch]
//   )

//   const handleBack = useCallback(() => {
//     if (onPrev) onPrev()
//     else go(-1)
//   }, [onPrev, go])

//   return (
//     <>
//       <PaperTitle>{title}</PaperTitle>
//       <Container>
//         <IconButton color="primary" onClick={handleBack}>
//           <ArrowBack />
//         </IconButton>

//         {onAdd ? (
//           <IconButton color="primary" onClick={onAdd}>
//             <Add />
//           </IconButton>
//         ) : null}

//         {reload ? (
//           <IconButton color="primary" onClick={handleReload}>
//             <Refresh />
//           </IconButton>
//         ) : null}

//         {filter ? (
//           <IconButton onClick={handleFilterClick} color={filterMode ? 'secondary' : 'primary'} disabled={!!loading}>
//             <FilterList />
//           </IconButton>
//         ) : null}

//         {onSelect ? (
//           <Button variant="contained" type="button" color="primary" onClick={onSelect} disabled={!!disableSelect}>
//             Selecionar
//           </Button>
//         ) : null}
//       </Container>
//       <Toolbar style={{ flexFlow: 'row wrap' }}>
//         <InputSearch
//           label="Pesquisa"
//           className="search-input"
//           value={inputValue}
//           // onChange={debounceEvent(handleSearch, debounce)}
//           onKeyUp={handleKeyUp}
//         />
//         {filterMode ? children : null}
//       </Toolbar>
//     </>
//   )
// }
// export default TableFilter

export {}
