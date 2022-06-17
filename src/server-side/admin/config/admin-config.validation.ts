import { celebrate, Joi, Segments } from 'celebrate'

export const storeOtherConfigSchema = celebrate(
  {
    [Segments.BODY]: {
      clientId: Joi.string(),
      clientSecret: Joi.string(),
      dev: Joi.object({
        clientId: Joi.string(),
        clientSecret: Joi.string()
      })
    }
  },
  { abortEarly: true, stripUnknown: true }
)
