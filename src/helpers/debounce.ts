interface IFn {
  (...args: any[]): void
}

export function debounceEvent(fn: IFn, wait = 500, time?: any) {
  return (...args: any[]): void => {
    clearTimeout(time)
    time = setTimeout(fn, wait, ...args)
  }
}
