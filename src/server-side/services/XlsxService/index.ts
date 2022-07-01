import { celebrate, Joi, Segments } from 'celebrate'
import { Parser } from 'json2csv'
import xlsxNode, { WorkSheet } from 'node-xlsx'

import { makeArray } from '~/helpers/array'

export const resourcesTypes = {
  json: 'application/json',
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

export class XlsxService<D = any> {
  constructor() {
    //
  }

  getMimeType(type: ResourceType) {
    return resourcesTypes[type] || null
  }

  sheetFrom(dataJson: D[]) {
    const header = Object.keys(makeArray(dataJson)[0]).map(k => k)
    return [header, ...makeArray(dataJson).map(d => Object.values(d))]
  }

  toXLSXBase64(name: string, dataJson: D[]) {
    const data = this.sheetFrom(dataJson)
    const sheet: WorkSheet = { name, data, options: {} }
    const buffer = xlsxNode.build([sheet], { writeOptions: { type: 'base64', Props: { Company: 'CIS Assessment' } } })
    return buffer
  }

  toJSON(dataJson: D[]) {
    return JSON.stringify(dataJson)
  }

  toCSV(dataJson: D[]) {
    const json2csv = new Parser({ delimiter: ';' })
    const csv = json2csv.parse(dataJson)
    return csv
  }

  toCSVBase64(dataJson: D[]) {
    const data = this.toCSV(dataJson)
    return Buffer.from(data, 'base64')
  }

  async createDownloadResource<In = Obj, Out = Obj>(type: ResourceType, inputData: In[], dto?: ResourceDto<In, Out>): Promise<ReturnResourceDto> {
    const data = dto ? dto(inputData) : defaultDto(inputData)
    const result: ReturnResourceDto = { mimeType: resourcesTypes[type], encode: 'utf-8' }

    if (type === 'xlsx') {
      result.resource = this.toXLSXBase64('sheet', data)
      result.encode = 'base64'
    }
    if (type === 'csv') result.resource = this.toCSV(data)
    if (type === 'json') result.resource = this.toJSON(data)
    return result
  }
}

type Obj = Record<string, any>
export type ResourceType = keyof typeof resourcesTypes
export type ResourceDto<I, O> = (inputDto: I[]) => O[]

function defaultDto<I = any, O = any>(d: I[]): O[] {
  return d.map(f => ({ ...f } as any))
}

export interface ReturnResourceDto {
  resource?: Buffer | string
  encode?: BufferEncoding
  mimeType: string
}

export function factoryXlsxService<T = any>() {
  return new XlsxService<T>()
}
export type FactoryXlsxService = typeof factoryXlsxService

export const getDownloadSchema = celebrate(
  {
    [Segments.PARAMS]: {
      type: Joi.string().valid('json', 'csv', 'xlsx').optional()
    }
  },
  { abortEarly: true, stripUnknown: true }
)
