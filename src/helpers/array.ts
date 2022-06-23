export function makeArray<T = unknown>(value: T | T[]): T[] {
  return !Array.isArray(value) ? [value] : value
}

export function compareValues(key: string, order = 'asc') {
  return function innerSort(a: any, b: any) {
    if (!(key in a) || !(key in b)) return 0
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}
