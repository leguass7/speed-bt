import nc from 'next-connect'

import { CategoryService } from '~/server-side/category/category.service'
import { ncConfig } from '~/server-side/services/ErrorApi'

const handler = nc(ncConfig).get(async (req, res) => {
  const categories = await CategoryService.list()
  return res.status(200).send({ success: true, categories: categories || [] })
})
export default handler
