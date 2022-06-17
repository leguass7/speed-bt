import prisma from '~/server-side/database'

async function getDash() {
  const totalUsers = await prisma.user.count()
  return {
    totalUsers
  }
}

export const DashboardService = {
  getDash
}

export type IDashboardService = typeof DashboardService
