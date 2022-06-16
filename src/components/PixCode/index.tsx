import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolltip from '@mui/material/Tooltip'

import { FlexContainer, Paragraph } from '../styled'
import { PixContainer, QrcodeContainer, QrCodeHeader, QrcodeImage } from './styles'

type Props = {
  stringQRCode?: string
  base64QRCode?: string
  purchaseId?: number
  paymentId?: number
  onClose?: () => void
}

export const PixCode: React.FC<Props> = ({ base64QRCode, paymentId, purchaseId, onClose }) => {
  const [tipOpen, setTipOpen] = useState(false)

  const handleClickCopy = () => {
    setTipOpen(true)
  }

  const handleClose = () => {
    if (onClose) onClose()
    setTipOpen(false)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const paymentCode = purchaseId && paymentId ? `PAGAMENTO ${paymentId}` : null
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
        {/* {paymentCode ? (
          <Paragraph align="center" bold>
            {paymentCode}
          </Paragraph>
        ) : null} */}
        <Paragraph align="center" size={14} verticalSpaced>
          QRCode para pagamento via PIX
        </Paragraph>
        {base64QRCode ? (
          <>
            <QrcodeImage src={base64QRCode} alt="QRCODE" />
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
          </>
        ) : (
          <Paragraph align="center" size={10} verticalSpaced>
            Aguardando informações
          </Paragraph>
        )}
      </QrcodeContainer>
    </PixContainer>
  )
}
