import prisma from '~/server-side/database'

async function getDash() {
  const totalUsers = await prisma.user.count()
  const totalSubscriptions = await prisma.subscription.count({ where: { actived: true } })
  return {
    totalUsers,
    totalSubscriptions
  }
}

export const DashboardService = {
  getDash
}

export type IDashboardService = typeof DashboardService
