import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TransactionProduct extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'transaction_id' })
  public transactionId!: number

  @column({ columnName: 'product_id' })
  public productId!: number

  @column()
  public quantity!: number
}
