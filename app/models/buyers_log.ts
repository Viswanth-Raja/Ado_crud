import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class BuyersLog extends BaseModel {
  @column({ isPrimary: true })
  declare log_id: number

  @column()
  declare p_id: number

  @column()
  declare p_name: string

  @column()
  declare bought_by: number

  @column()
  declare comments: { all_cmts: string[] }

  @column()
  declare user_count: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
