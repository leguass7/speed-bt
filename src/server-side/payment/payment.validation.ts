import { celebrate, Joi, Segments } from 'celebrate'

export const checkPaymentSchema = celebrate(
  {
    [Segments.PARAMS]: {
      paymentId: Joi.number().min(1).required()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
