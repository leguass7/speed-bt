import { celebrate, Joi, Segments } from 'celebrate'

export const listAllSubscriptionSchema = celebrate(
  {
    [Segments.QUERY]: {
      categoryId: Joi.number().allow('').min(1),
      gender: Joi.valid('F', 'M').allow('')
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const deleteSubscriptionSchema = celebrate(
  {
    [Segments.QUERY]: {
      id: Joi.number().min(1).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const createSubscriptionSchema = celebrate(
  {
    [Segments.BODY]: {
      categoryId: Joi.number().min(1).required(),
      partner: Joi.object().required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

// const partner = Joi.object({
//   id: Joi.string().required()
// })
//   .required()
//   .options({ stripUnknown: true })

// const category = Joi.object({
//   id: Joi.number().min(1).required()
// })
//   .required()
//   .options({ stripUnknown: true })

const subscription = Joi.object({
  id: Joi.number().allow(null),
  categoryId: Joi.number().min(1).required(),
  partnerId: Joi.string().required(),
  value: Joi.number().required()
  // partner,
  // category
}).options({ stripUnknown: true })

export const createBulkSubscriptionSchema = celebrate(
  {
    [Segments.BODY]: {
      data: Joi.array().items(subscription).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
