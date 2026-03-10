import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public client_id!: number

  @column()
  public gateway_id!: number

  @column()
  public external_id!: string

  @column()
  public status!: string

  @column()
  public amount!: number

  @column()
  public card_last_numbers!: string
}
