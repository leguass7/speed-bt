import React from 'react'

export const Filter: React.FC = () => {
  // const { push } = useRouter()
  // const { isMobile } = useAppTheme()
  // const { enqueueSnackbar } = useSnackbar()

  // const { setFilter } = useCustomTableFilter()

  // const handleClickNew = () => push(`/company/employees/new`)
  // const handleClickImport = () => push(`/company/employees/import`)
  // const handleFilterChange = (search: any) => setFilter(search)

  // const onFetchFile: RequestFileHandler = useCallback(
  //   async (type, params) => {
  //     const file = await getFileByDownload(`/company/employee/download/${type}`, { ...params, page: 1, size: 30000 })
  //     if (file) return file
  //     enqueueSnackbar('Erro no arquivo', { variant: 'error' })
  //     return null
  //   },
  //   [enqueueSnackbar]
  // )

  return (
    <>
      <div></div>
    </>
    // <CommonFilter hideFilter fileFetchHandler={onFetchFile} onFilterChange={handleFilterChange} onClickImport={handleClickImport}>
    //   {isMobile ? (
    //     <IconButton onClick={handleClickNew} color="primary">
    //       <PersonAdd />
    //     </IconButton>
    //   ) : (
    //     <Button variant="contained" color="primary" size="small" startIcon={<PersonAdd fontSize="small" />} onClick={handleClickNew}>
    //       Novo colaborador
    //     </Button>
    //   )}
    // </CommonFilter>
  )
}
