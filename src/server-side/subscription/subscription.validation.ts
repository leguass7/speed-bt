import { celebrate, Joi, Segments } from 'celebrate'

// export const updateMeSchema = celebrate(
//   {
//     [Segments.BODY]: {
//       name: Joi.string(),
//       email: Joi.string().email(),
//       birday: Joi.date().allow(''),
//       gender: Joi.valid('F', 'M').allow(''),
//       phone: Joi.string().allow(''),
//       category: Joi.string().allow(''),
//       cpf: Joi.string().allow(''),
//       shirtSize: Joi.valid('PP', 'P', 'M', 'G', 'GG').allow('')
//     }
//   },
//   { abortEarly: true, stripUnknown: true }
// )

export const createSubscriptionSchema = celebrate(
  {
    [Segments.BODY]: {
      categoryId: Joi.number().min(1).required(),
      partner: Joi.object().required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
