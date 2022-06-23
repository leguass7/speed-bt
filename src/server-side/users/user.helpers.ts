import { User } from '@prisma/client'

import { isDefined } from '~/helpers/validation'

export function checkCompleteData(userData: User): boolean {
  const excludeFileds = ['id', 'emailVerified', 'password', 'createdAt', 'updatedAt', 'actived', 'completed', 'category', 'image']
  const fields = Object.entries(userData).filter(([key, value]) => {
    if (excludeFileds.includes(key)) {
      return false
    }
    const result = !value || !isDefined(value)
    return result
  })
  return !fields?.length
}
