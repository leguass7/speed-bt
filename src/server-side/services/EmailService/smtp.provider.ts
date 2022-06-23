import { createTransport } from 'nodemailer'

import type { EmailServiceResponse, EmailServiceSender } from './send.dto'

export interface ISmtpConfig {
  host: string
  port: number
  secure?: boolean
  auth: {
    user: string
    pass: string
  }
}

export function createTransporterSMTP(config: ISmtpConfig): EmailServiceSender {
  if (!config?.auth?.user || !config?.auth?.pass || !config?.host) {
    throw new Error('invalid_smtp_config')
  }
  const sender: EmailServiceSender = async ({ from, html, subject, to }) => {
    try {
      let transporter = createTransport(config)
      const response = await transporter.sendMail({ from, to, subject, html })
      transporter = null
      return { ...response, method: 'smtp' } as EmailServiceResponse
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('createTransporterSMTP', error?.message, error)
      return null
    }
  }
  return sender
}
