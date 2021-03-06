import { celebrate, Joi, Segments } from 'celebrate'

export const createPartnerSubscriptionSchema = celebrate(
  {
    [Segments.BODY]: {
      categoryId: Joi.number().min(1).required(),
      userId: Joi.string().required(),
      partnerId: Joi.string().required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const deleteAdminSubscriptionSchema = celebrate(
  {
    [Segments.QUERY]: {
      id: Joi.number().min(1).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
