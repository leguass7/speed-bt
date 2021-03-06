import type { NextApiResponse } from 'next'

import type { Prisma as PrismaTypes } from '.prisma/client'

import { ApiError } from 'next/dist/server/api-utils'

import { createApiPix } from '~/server-side/api-pix.service'
import { IAppConfigService } from '~/server-side/app-config/app-config.service'
import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import type { ICategoryService } from '~/server-side/category/category.service'
import type { IPaymentService } from '~/server-side/payment/payment.service'
import type { FactoryXlsxService } from '~/server-side/services/XlsxService'
import {
  ISubscriptionService,
  RequestGeneratePartnerSubscription,
  RequestUpdateSubCategory,
  subscriptionToSheetDto
} from '~/server-side/subscription'
import type { IUserService } from '~/server-side/users'

function listAll(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const categoryId = +req?.query?.categoryId || undefined
    const gender = (req?.query?.gender as 'F' | 'M') || undefined

    let where: PrismaTypes.SubscriptionWhereInput = { actived: true }
    if (categoryId) where.categoryId = categoryId
    if (gender) where = { ...where, user: { gender } }

    const subscriptions = await subService.list(where)
    return res.status(200).send({ success: true, subscriptions })
  }
}

function updateCategory(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth } = req
    const { categoryId, subscriptionId } = req.body as RequestUpdateSubCategory

    await subService.updateMany({ id: { in: subscriptionId } }, { categoryId, updatedBy: auth.userId })
    return res.status(200).json({ success: true })
  }
}

function createPartnerSubscription(
  subService: ISubscriptionService,
  categoryService: ICategoryService,
  paymentService: IPaymentService,
  userService: IUserService,
  appConfigService: IAppConfigService
) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth, body } = req
    const { categoryId, partnerId, userId } = body as RequestGeneratePartnerSubscription

    const hasSub = await subService.findOne({ categoryId, userId, partnerId, actived: true })
    if (hasSub) throw new ApiError(400, 'Inscri????o j?? existe')

    const hasSubUser = await subService.findOne({ categoryId, userId, actived: true })
    if (hasSubUser) throw new ApiError(400, 'Inscri????o j?? existe na categoria')

    const category = await categoryService.findOne({ id: categoryId })
    if (!category) throw new ApiError(400, 'Categoria n??o encontrada')

    // 1. verificar quantas inscri????es o usu??rio tem
    const qtdeSubs = await subService.find({ where: { actived: true, userId } })
    if (qtdeSubs?.length >= 2) throw new ApiError(400, 'Usu??rio j?? possui 2 inscri????es')

    // 2. determinar valor da inscri????o
    const value = qtdeSubs?.length >= 1 ? 50 : category?.price || 81

    // 3. incluir inscri????o
    const subscriptionId = await subService.create({ categoryId, partnerId, userId, value, actived: true, createdBy: auth.userId, paid: false })
    if (!subscriptionId) throw new ApiError(500, 'Erro ao criar inscri????o')

    // 4. criar pagamento
    const paymentId = await paymentService.create({ actived: true, method: 'PIX', paid: false, value, createdBy: auth.userId, userId: auth.userId })
    if (!paymentId) throw new ApiError(500, 'Erro ao criar pagamento')

    // 5. Salvar id do pagamento
    await subService.update(subscriptionId, { paymentId })

    // 6. Adquiri usu??rio para pagamento
    const user = await userService.findOneToPayment(userId)
    if (!user) throw new ApiError(403, 'Usu??rio n??o identificado')
    if (!user?.cpf) throw new ApiError(403, 'CPF n??o informado')

    // 7. Gerar pix
    const apiPix = await createApiPix(appConfigService)
    const cob = await paymentService.generate(apiPix, { user, value, paymentId })

    return res.status(201).json({ success: true, imageQrcode: cob.imagemQrcode, qrcode: cob.qrcode, paymentId, txid: cob?.txid })
  }
}

function deleteSubscription(subService: ISubscriptionService, _paymentService: IPaymentService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const subscriptionId = +req?.query?.id

    const deleted = await subService.remove(subscriptionId, true)
    return res.status(200).json({ success: true, subscriptionId, deleted })
  }
}

function downloadSubscriptions(subService: ISubscriptionService, factoryXlsxService: FactoryXlsxService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const sheet = factoryXlsxService()

    const subscriptions = await subService.list({ actived: true }, [{ category: { id: 'asc' } }, { user: { gender: 'asc' } }])

    const data = subscriptions.map(subscriptionToSheetDto)
    if (!data?.length) throw new ApiError(404, 'Arquivo vazio')

    const result = await sheet.createDownloadResource('xlsx', data)

    const stream = typeof result.resource === 'string' ? Buffer.from(result.resource, result.encode) : result.resource

    res.writeHead(200, {
      'Content-Type': result.mimeType,
      'Content-Length': stream.length
    })
    return res.end(stream)
  }
}

export function factoryAdminSubscriptionController(
  subService: ISubscriptionService,
  categoryService: ICategoryService,
  paymentService: IPaymentService,
  userService: IUserService,
  appConfigService: IAppConfigService,
  factoryXlsxService: FactoryXlsxService
) {
  return {
    listAll: listAll(subService),
    updateCategory: updateCategory(subService),
    createPartnerSubscription: createPartnerSubscription(subService, categoryService, paymentService, userService, appConfigService),
    deleteSubscription: deleteSubscription(subService, paymentService),
    downloadSubscriptions: downloadSubscriptions(subService, factoryXlsxService)
  }
}
