import { createHash } from 'crypto'

import { isDefined, isObject } from './validation'

export function removeInvalidValues<T = unknown>(obj: Record<string, any>): T {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (isDefined(value)) acc[key] = value
    return acc
  }, {} as T)
}

/**
 * Deep merge two objects.
 */
export function mergeDeep<T = any>(target: Partial<T>, ...sources: Partial<T>[]): T {
  if (!sources.length) return target as T
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

export function tryJson<T = any>(obj: string): T {
  try {
    if (typeof obj === 'string') return JSON.parse(obj)
    else if (isObject(obj)) return Object.assign({}, obj) as T
    return null
  } catch {
    return null
  }
}

export function hashObject<T = Record<string, any>>(obj: T): string {
  return createHash('md5')
    .update(JSON.stringify(sortProperties(obj)))
    .digest('hex')
}

export function sortProperties<T = Record<string, any>>(obj: T): T {
  const a = Object.keys(obj)
    .sort()
    .reduce((acc, k) => {
      if (obj[k]) acc[k] = obj[k]
      return acc
    }, {})
  return a as T
}
