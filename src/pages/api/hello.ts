import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const response = await apiPixService.createCob({
  //   calendario: { expiracao: 3600 },
  //   devedor: { cpf: '94271564656', nome: 'Gorbadock Oldbuck' },
  //   valor: { original: '123.45' },
  //   chave: 'lesbr3@gmail.com',
  //   solicitacaoPagador: 'NUMERO PEDIDO',
  //   infoAdicionais: [
  //     {
  //       nome: 'Pagamento',
  //       valor: 'NOME DO SEU ESTABELECIMENTO'
  //     }
  //   ]
  // })

  return res.status(200).json({ success: true })
}
