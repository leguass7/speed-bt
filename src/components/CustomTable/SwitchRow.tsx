import React, { useState, useRef, useCallback, memo } from 'react'

import { Switch, SwitchProps } from '@mui/material'

import { useIsMounted } from '~/hooks/useIsMounted'

export type HandlerSwitchRowChange = (_id: string | number, _actived: boolean) => Promise<{ actived: boolean } | undefined | void | null>

interface Props extends Omit<SwitchProps, 'id' | 'onChange' | 'checked'> {
  tableName?: string
  actived?: boolean
  id: string | number
  disabled?: boolean
  onChange?: HandlerSwitchRowChange
}

const SwitchRow: React.FC<Props> = ({ id, actived = false, tableName = 'table', onChange, disabled, ...rest }) => {
  const [checked, setChecked] = useState(!!actived)
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()
  const ref = useRef<HTMLButtonElement>(null)

  const handleChange = useCallback(
    async (event: any, check: boolean) => {
      if (onChange) {
        setLoading(true)
        const response = await onChange(id, check)
        if (isMounted.current) {
          setLoading(false)
          if (response) setChecked(!!response?.actived)
        }
      }
      setChecked(old => !old)
    },
    [id, isMounted, onChange]
  )

  return (
    <Switch ref={ref} checked={!!checked} onChange={handleChange} name={`switch-${tableName}-${id}`} disabled={!!loading || disabled} {...rest} />
  )
}

export default memo(SwitchRow) as typeof SwitchRow
