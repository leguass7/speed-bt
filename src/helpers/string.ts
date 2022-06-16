// import { baseUrlApi } from '~/config'

import { isDefined } from './validation'

export function normalizeImageSrc(src = '', defaultImage?: string): string {
  if (!src) return defaultImage || ''
  if (src.startsWith('blob') || src.startsWith('data')) return src
  return src
  // return src.startsWith('http') ? src : `${baseUrlApi}${src}`
}

export function querystring(_str?: Record<string, any>): string
export function querystring(_str?: string): Record<string, string>
export function querystring(_str?: any): any {
  if (typeof _str === 'string') {
    const keys = `${_str}`.split('&') // ['key=value']
    const obj = keys.reduce((acc: Record<string, string>, keyValue) => {
      const [k, v] = `${keyValue}`.split('=') // [key, value]
      if (k) {
        acc[k] = v || ''
      }
      return acc
    }, {})
    return obj
  } else if (typeof _str === 'object') {
    return Object.keys(_str)
      .map(k => {
        return `${k}=${_str[k]}`
      })
      .join('&')
  }
}

export function toBool(value: string | number): boolean | undefined {
  const valids = [
    [true, '1', 1, 'true'],
    [false, '0', 0, '', 'false']
  ]
  const found = valids.find(f => f.includes(value))
  if (typeof value === 'number' && value <= 0) return false

  //@ts-ignore
  return Boolean(isDefined(found) && found[0]) || undefined
}

export function stringToColor(string: string) {
  let hash = 0
  let i: number

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export function stringAvatar(name: string) {
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
}

export function replaceAll(str = '', needle: string, replacement: string) {
  if (!str) return ''
  if (Array.isArray(needle)) {
    let rtn = `${str}`
    for (let i = 0; i < needle.length; i++) {
      rtn = replaceAll(rtn, needle[i], replacement)
    }
    return rtn
  }
  return str.split(needle).join(replacement)
}

export const defaultForbidenChars = "'@#$%¨&*()_+{}?^:><|¹²³£¢¬§ªº°;.,~´`=-"
export function removeAll(str = '', chars = defaultForbidenChars, replacement = '') {
  if (!str) return ''
  if (Array.isArray(str)) return str.map(r => removeAll(r, chars, replacement))
  const c = Array.isArray(chars) ? chars : chars.split('')
  let result = str
  for (let i = 0; i < c.length; i++) result = replaceAll(result, c[i], replacement)
  return result
}
