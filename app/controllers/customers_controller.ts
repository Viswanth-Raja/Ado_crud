import type { HttpContext } from '@adonisjs/core/http'
import ProdRepo from '../Repositories/operations.js'
import buyerRepo from '../Repositories/buyersOperations.js'
import { PasswordValidator } from '#validators/user_validate'
import { createValidator } from '#validators/create_product'
import { createBuyerValidator, updateBuyerValidator } from '#validators/BuyerValidator'

const Operations = new ProdRepo()
const buyerOperations = new buyerRepo()
export default class CustomersController {
  public async sell({ request, response }: HttpContext) {
    const U_id = Number(request.qs().u_id)
    const { p_word } = await request.validateUsing(PasswordValidator)
    const data = await createValidator.validate(request.only(['p_name', 'comments', 'user_count']))
    return response.ok(await Operations.sell(U_id, p_word, data))
  }

  public async store({ request, response }: HttpContext) {
    const Buyer = await request.validateUsing(createBuyerValidator)
    return response.ok(await buyerOperations.create_Buyer(Buyer))
  }

  public async showAll({ request, response }: HttpContext) {
    const id = Number(request.qs().b_id)
    if (id) {
      return response.ok(await buyerOperations.b_id(id))
    }
    return response.ok(await buyerOperations.b_all())
  }

  public async fullUpdate({ request, response }: HttpContext) {
    const b_id = Number(request.qs().b_id)
    const Buyer = await request.validateUsing(createBuyerValidator)
    return response.ok(await buyerOperations.update(b_id, Buyer))
  }

  public async partialUpdate({ request, response }: HttpContext) {
    const b_id = Number(request.qs().b_id)
    const Buyer = await request.validateUsing(updateBuyerValidator)
    return response.ok(await buyerOperations.update(b_id, Buyer))
  }

  public async destroy({ request, response }: HttpContext) {
    const b_id = Number(request.qs().b_id)
    return response.ok(await buyerOperations.delete_Buyer(b_id))
  }
}
