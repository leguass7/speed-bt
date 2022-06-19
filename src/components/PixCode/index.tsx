import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import CheckIcon from '@mui/icons-material/Check'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolltip from '@mui/material/Tooltip'

import { checkPayment } from '~/service/api/payment'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { CircleLoading } from '../CircleLoading'
import { FlexContainer, Paragraph, Title } from '../styled'
import { PixContainer, QrcodeContainer, QrCodeHeader, QrcodeImage } from './styles'

type Props = {
  stringQRCode?: string
  base64QRCode?: string
  purchaseId?: number
  paymentId?: number
  txid?: string
  onClose?: () => void
  onReceivedPay?: (paid?: boolean) => void
}

export const PixCode: React.FC<Props> = ({ base64QRCode, stringQRCode, paymentId, onClose, onReceivedPay }) => {
  const { theme } = useAppTheme()
  const [tipOpen, setTipOpen] = useState(false)
  const [receivedPay, setReceivedPay] = useState(false)

  useEffect(() => {
    let invervalId: any
    if (paymentId && !receivedPay) {
      invervalId = setInterval(() => {
        checkPayment(paymentId).then(res => {
          setReceivedPay(!!res?.paid)
          if (onReceivedPay) onReceivedPay(!!res?.paid)
        })
      }, 10000)
    }

    return () => {
      clearInterval(invervalId)
    }
  }, [paymentId, receivedPay, onReceivedPay])

  const handleClickCopy = () => {
    if (stringQRCode) navigator?.clipboard?.writeText(stringQRCode)
    setTipOpen(true)
  }

  const handleClose = () => {
    if (onClose) onClose()
    setTipOpen(false)
  }

  return (
    <PixContainer>
      <QrcodeContainer>
        {onClose ? (
          <QrCodeHeader>
            <IconButton onClick={handleClose}>
              <IoClose />
            </IconButton>
          </QrCodeHeader>
        ) : null}
        {!receivedPay ? (
          <>
            <Paragraph align="center" size={14} verticalSpaced>
              QRCode para pagamento via PIX
            </Paragraph>
            {base64QRCode ? (
              <>
                <QrcodeImage src={base64QRCode} alt="QRCODE" />
                {stringQRCode ? (
                  <FlexContainer justify="center" verticalPad={10}>
                    <Toolltip
                      open={!!tipOpen}
                      title="Código copiado. Agora cole no seu aplicativo de pagamento"
                      placement="bottom"
                      arrow
                      onMouseLeave={() => setTipOpen(false)}
                    >
                      <Button variant="outlined" onClick={handleClickCopy}>
                        COPIA E COLA
                      </Button>
                    </Toolltip>
                  </FlexContainer>
                ) : null}
              </>
            ) : (
              <>
                <Paragraph align="center" size={10} verticalSpaced>
                  Aguardando informações
                </Paragraph>
                <CircleLoading />
              </>
            )}
          </>
        ) : (
          <>
            <Title weight="normal" textColor={theme.colors.primary} textSize={16}>
              <CheckIcon /> PAGAMENTO REALIZADO
            </Title>
            <Paragraph align="center" size={18} verticalSpaced>
              Inscrição concluída com sucesso. Até já{' '}
              <span role="img" aria-label="sheep">
                👍
              </span>
            </Paragraph>
          </>
        )}
      </QrcodeContainer>
    </PixContainer>
  )
}
