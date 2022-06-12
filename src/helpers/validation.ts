import { FormHandles } from '@unform/core'
import { ObjectSchema, ValidationError } from 'yup'

export async function validateFormData<T = any>(
  schema: ObjectSchema<any>,
  data: T,
  formRef?: FormHandles | null
): Promise<Record<keyof T, string> | null> {
  try {
    if (formRef) formRef.setErrors({})
    await schema.validate(data, { abortEarly: false })
    return null
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors: any = {}
      error.inner.forEach(({ path, message }: ValidationError) => {
        if (path) validationErrors[path] = message
      })
      if (formRef) {
        formRef.setErrors(validationErrors)
      }

      return validationErrors as Record<keyof T, string>
    }
    return null
  }
}

export function isDefined(v: any): boolean {
  return !!(v !== null && typeof v !== 'undefined' && v !== undefined)
}

export function isObject(value: any): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof RegExp) &&
    !(value instanceof Error) &&
    !(value instanceof Date) &&
    !Array.isArray(value)
  )
}
