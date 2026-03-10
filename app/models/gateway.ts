import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Gateway extends BaseModel {
  @column({ isPrimary: true })
  public id!: number;

  @column()
  public name!: string;

  @column()
  public is_active!: boolean;

  @column()
  public priority!: number;
}