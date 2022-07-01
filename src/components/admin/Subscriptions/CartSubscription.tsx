import React, { useState } from 'react'
import { toast } from 'react-toastify'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SaveIcon from '@mui/icons-material/Save'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styled from 'styled-components'

import type { ResultSubscription } from '~/server-side/subscription'
import { updateAdminSubCategory } from '~/service/api/admin'

import { ItemAddSubscriptions } from './ItemAddSubscription'
import { ItemSubscription, ItemSubscriptionProps } from './ItemSubscription'

const SelectContainer = styled.div<{ edit?: boolean }>`
  padding-right: 10px;
  border: 0;
  padding: ${({ edit }) => (edit ? 0 : 8)}px;
  padding-right: 8px;
  max-width: 160px;
`

const options = [
  { id: 1, label: 'infantil' },
  { id: 2, label: 'Iniciante' },
  { id: 3, label: 'Intermediária' },
  { id: 4, label: 'Open' },
  { id: 5, label: '50+' }
]

export type CardSubscriptionProps = ResultSubscription & {
  pair?: ResultSubscription
  onClickPix?: ItemSubscriptionProps['onClickPix']
  updateListHandler: ItemSubscriptionProps['updateListHandler']
  manualPaidHandler?: ItemSubscriptionProps['manualPaidHandler']
}

export const CardSubscription: React.FC<CardSubscriptionProps> = ({ category, pair, updateListHandler, manualPaidHandler, onClickPix, ...rest }) => {
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [cat, setCat] = React.useState(`${category?.id || ''}`)

  const handleChange = (event: SelectChangeEvent) => {
    setCat(event.target.value as string)
  }

  const handleEdit = () => setEdit(old => !old)

  const handleSave = async () => {
    setLoading(true)
    const response = await updateAdminSubCategory({
      subscriptionId: [rest.id, pair?.id].filter(f => !!f),
      categoryId: Number(cat)
    })
    if (response?.success) {
      toast.success('Inscrição atualizada')
      updateListHandler()
    } else {
      toast.error(response?.message || 'Erro ao atualizar')
    }
    setLoading(false)
    handleEdit()
  }

  const renderTitle = () => {
    return (
      <SelectContainer edit={!!edit}>
        {edit ? (
          <Select value={cat} onChange={handleChange} fullWidth size="small" disabled={!!loading}>
            {options.map(option => {
              return (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              )
            })}
          </Select>
        ) : (
          <>{category?.title}</>
        )}
      </SelectContainer>
    )
  }
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card sx={{ minHeight: 220 }}>
        <CardHeader
          subheader={renderTitle()}
          action={
            <IconButton disabled={!!loading} onClick={edit ? handleSave : handleEdit}>
              {edit ? <SaveIcon /> : <ModeEditIcon />}
            </IconButton>
          }
        />
        <CardContent sx={{ padding: 1 }}>
          <ItemSubscription {...rest} updateListHandler={updateListHandler} onClickPix={onClickPix} manualPaidHandler={manualPaidHandler} />
          {pair ? (
            <ItemSubscription {...pair} updateListHandler={updateListHandler} onClickPix={onClickPix} manualPaidHandler={manualPaidHandler} />
          ) : (
            <ItemAddSubscriptions
              partner={rest.partner}
              userId={rest?.user?.id || rest.userId}
              categoryId={rest.categoryId}
              updateListHandler={updateListHandler}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}
