import { celebrate, Joi, Segments } from 'celebrate'

export const createSubscriptionSchema = celebrate(
  {
    [Segments.BODY]: {
      categoryId: Joi.number().min(1).required(),
      partner: Joi.object().required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

const partner = Joi.object({
  id: Joi.string().required()
})
  .required()
  .options({ stripUnknown: true })

const category = Joi.object({
  id: Joi.number().min(1).required()
})
  .required()
  .options({ stripUnknown: true })

const subscription = Joi.object({
  id: Joi.number().allow(null),
  categoryId: Joi.number().min(1).required(),
  value: Joi.number().required(),
  partner,
  category
}).options({ stripUnknown: true })

export const createBulkSubscriptionSchema = celebrate(
  {
    [Segments.BODY]: {
      data: Joi.array().items(subscription).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
