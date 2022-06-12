import { isDefined } from './validation'

export function isObject(item?: any) {
  return item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)
}

export function removeInvalidValues<T = unknown>(obj: Record<string, any>): T {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (isDefined(value)) acc[key] = value
    return acc
  }, {} as T)
}
