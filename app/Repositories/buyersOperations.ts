import buyers from '../models/buyers_log.js'

export default class buyerRepo {
  async b_id(id: number) {
    const Buyer = await buyers.find(id)
    if (!Buyer) {
      return 'Buyer not found'
    }
    return Buyer
  }

  async b_all() {
    return await buyers.all()
  }

  async create_Buyer(data: any) {
    await buyers.create(data)
    return 'Buyer Added'
  }

  async update(id: number, data: any) {
    const Buyer = await buyers.find(id)
    if (!Buyer) {
      return 'ID not found'
    }

    Buyer.merge(data)
    Buyer.save()
    return 'Buyer Info Updated'
  }

  async delete_Buyer(id: number) {
    const Buyer = await buyers.find(id)
    if (Buyer) {
      await Buyer.delete()
      return 'Buyer Deleted!'
    }
    return 'Buyerr Not found'
  }
}
