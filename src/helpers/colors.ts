import chroma from 'chroma-js'

type ModeType = 'rgb' | 'rgba' | 'auto'
export function darken(color = '#fff', alpha = 0.5, mode: ModeType = 'rgba'): string {
  return chroma(color).darken(alpha).hex(mode)
}

export function alpha(color: string, alpha = 0.5, mode: ModeType = 'rgba'): string {
  return chroma(color).alpha(alpha).hex(mode)
}

export function brighten(color: string, alpha = 2, mode: ModeType = 'rgb'): string {
  return chroma(color).brighten(alpha).hex(mode)
}
