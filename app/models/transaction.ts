import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'client_id' })
  public clientId!: number

  @column({ columnName: 'gateway_id' })
  public gatewayId!: number

  @column({ columnName: 'external_id' })
  public externalId!: string

  @column()
  public status!: string

  @column()
  public amount!: number

  @column({ columnName: 'card_last_numbers' })
  public cardLastNumbers!: string

  @belongsTo(() => Client, {
    foreignKey: 'clientId'
  })
  declare client: BelongsTo<typeof Client>
}