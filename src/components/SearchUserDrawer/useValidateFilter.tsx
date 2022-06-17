import { useCallback, useMemo, useState } from 'react'

import { object, string } from 'yup'

import { validateFormData } from '~/helpers/validation'

export type Filter = { email?: string; search?: string; categoryId?: number }

export function useValidateFilter(): [string, (data: Filter) => Promise<Record<keyof Filter, string>>] {
  const [error, setError] = useState<string>(null)

  const searchSchema = useMemo(
    () =>
      object().shape({
        email: string().email('e-mail inválido').optional(),
        name: string().optional(),
        cpf: string().optional()
      }),
    []
  )

  const validateFilter = useCallback(
    async (data: Filter) => {
      let firstError = ''
      const invalid = await validateFormData(searchSchema, data)
      if (invalid) {
        firstError = Object.values(invalid).find(f => !!f)
      }
      setError(firstError || null)
      return invalid
    },
    [searchSchema]
  )

  return [error, validateFilter]
}
