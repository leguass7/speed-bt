import { celebrate, Joi, Segments } from 'celebrate'

export const updateMeSchema = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      birday: Joi.date().allow(''),
      gender: Joi.valid('F', 'M').allow(''),
      phone: Joi.string().allow(''),
      password: Joi.string(),
      category: Joi.string().allow(''),
      cpf: Joi.string().allow(''),
      shirtSize: Joi.valid('PP', 'P', 'M', 'G', 'GG').allow('')
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const checkUserSchema = celebrate(
  {
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const forgotPassSchema = celebrate(
  {
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const createUserSchema = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      birday: Joi.date().allow(''),
      gender: Joi.valid('F', 'M').allow(''),
      phone: Joi.string().allow(''),
      password: Joi.string().required(),
      category: Joi.string().allow(''),
      cpf: Joi.string().allow(''),
      shirtSize: Joi.valid('PP', 'P', 'M', 'G', 'GG').allow('')
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const searchUserSchema = celebrate(
  {
    [Segments.QUERY]: {
      search: Joi.string().allow(''),
      categoryId: Joi.number().allow(null)
    }
  },
  { abortEarly: true, stripUnknown: true }
)
