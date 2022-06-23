import { celebrate, Joi, Segments } from 'celebrate'

export const paginationSchema = celebrate(
  {
    [Segments.QUERY]: {
      size: Joi.number().min(1).allow(''),
      page: Joi.number().min(1).allow(''),
      orderby: Joi.string().allow(''),
      order: Joi.string().allow('')
    }
  },
  { abortEarly: true, stripUnknown: true }
)
