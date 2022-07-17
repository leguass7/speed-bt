import type { User } from '@prisma/client'

export const selectSearchFields = ['actived', 'birday', 'completed', 'completed', 'email', 'emailVerified', 'gender', 'id', 'image', 'name'] as const

type UserSearchFields = typeof selectSearchFields[number]
type UserSearchData = Pick<User, UserSearchFields> & { verified: boolean }

type UserSubsCount = { _count: { subscriptions: number } }

export type ResultSearchUser = UserSearchData & UserSubsCount

export function findUserDto(user: ResultSearchUser): Partial<Partial<User>> & { subscriptionsCount: number } {
  const { completed, _count, ...data } = user
  const subscriptionsCount = _count?.subscriptions || 0
  return { subscriptionsCount, verified: !!(completed && subscriptionsCount), completed, ...data }
}
