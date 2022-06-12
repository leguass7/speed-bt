export const isServer = typeof window === 'undefined'

export const wait = (timeout: number): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export function round(number: number, precision = 4): number {
  if (!number || (number && number === 0)) return 0
  const factor = Math.pow(10, precision)
  const tempNumber = number * factor
  const roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export function hostSocket() {
  if (isServer) return ''
  const hostname = window?.location?.hostname
  if (['localhost'].includes(hostname)) {
    return `http://${hostname}:3000`
  }
  return `https://${hostname}`
}
