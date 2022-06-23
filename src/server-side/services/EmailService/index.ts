import { smtpConfig } from '~/server-side/config'

import { EmailServiceSender, SendPayloadDto } from './send.dto'
import { createTransporterSMTP } from './smtp.provider'

export type { SendPayloadDto }

export type MailServiceProvider = 'smtp' | 'sendgrid'

export class MailService {
  public sender: EmailServiceSender

  constructor() {
    this.sender = createTransporterSMTP(smtpConfig)
    return this
  }

  async send(payload: SendPayloadDto) {
    const from = payload?.from || smtpConfig?.auth?.user
    if (!from) throw new Error('invalid_mail_from')
    const response = await this.sender({ from, ...payload })
    return response
  }
}

export const mailService = new MailService()
