import product from '../models/product.js'
import users from '../models/user.js'
import BuyersLog from '../models/buyers_log.js'

export default class ProdRepo {
  async p_all() {
    return await product.all()
  }

  async p_id(id: number) {
    const item = await product.findOrFail(id)
    return item
  }

  async create(data: any) {
    data['status'] = 'available'
    data['user_count'] = 1

    if (typeof data.comments === 'string') {
      data.comments = { all_cmts: [data.comments] }
    }
    data.comments = JSON.stringify(data.comments)

    await product.create({
      ...data,
      comments: JSON.parse(data.comments),
    })
    return 'Product Added'
  }

  async update(id: number, data: any) {
    const item = await product.findOrFail(id)
    item.comments.all_cmts.push(data.comments)
    item.merge(data)
    await item.save()
    return 'Product Updated'
  }

  async delete(id: number) {
    const item = await product.findOrFail(id)
    await item.delete()
    return 'Product Deleted!'
  }

  async buy(id: number, u_id: number, passw: any) {
    const item = await product.findOrFail(id)
    const user = await users.findOrFail(u_id)

    if (user.p_word !== passw) {
      return 'Password Mismatch'
    }

    await BuyersLog.create({
      p_id: item.p_id,
      p_name: item.p_name,
      bought_by: u_id,
      user_count: Number(item.user_count) + 1,
      comments: item.comments,
    })

    item['status'] = 'bought'
    await item.merge(item)
    item.save()
    return 'Product Bought!'
  }

  async sell(u_id: number, passw: string, data: any) {
    const user = await users.findOrFail(u_id)

    if (user.p_word !== passw) return 'Password Mismatch'

    const buyerEntry = await BuyersLog.query()
      .whereILike('p_name', data.p_name)
      .andWhere('bought_by', Number(u_id))
      .first()

    if (buyerEntry) {
      await buyerEntry.delete()

      const item = await product.findOrFail(buyerEntry.p_id)

      item.comments.all_cmts.push(data.comments)
      item['status'] = 'available'
      item['user_count'] = Number(item['user_count']) + 1

      await item.save()
      return 'Product Sold Successfully'
    }

    await product.create({
      p_name: data.p_name,
      status: 'available',
      user_count: 1,
      comments: { all_cmts: [data.comments] },
    })

    return 'Product Sold Successfully'
  }
}
