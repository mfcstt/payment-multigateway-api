import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Client extends BaseModel{
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public email!: string
}