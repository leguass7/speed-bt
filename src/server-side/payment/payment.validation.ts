import { celebrate, Joi, Segments } from 'celebrate'

export const checkPaymentSchema = celebrate(
  {
    [Segments.PARAMS]: {
      paymentId: Joi.number().min(1).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)

export const manualPaymentSchema = celebrate(
  {
    [Segments.PARAMS]: {
      paymentId: Joi.number().min(1).required()
    },
    [Segments.BODY]: {
      e2eId: Joi.string().min(32).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
