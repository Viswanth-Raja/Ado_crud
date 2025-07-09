// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import ProdRepo from '../Repositories/operations.js'
import {
  createUserValidator,
  updateUserValidator,
  PasswordValidator,
} from '#validators/user_validate'
import UserRepo from '../Repositories/userOperations.js'
import { queryParamValidator } from '#validators/query_parameter'

const Operations = new ProdRepo()
const userOperations = new UserRepo()

export default class UsersController {
  public async buy_product({ request, response }: HttpContext) {
    const id = Number(request.qs().postId)
    const U_id = Number(request.qs().u_id)
    const { p_word } = await request.validateUsing(PasswordValidator)
    return response.ok(await Operations.buy(id, U_id, p_word))
  }

  public async store({ request, response }: HttpContext) {
    const User = await request.validateUsing(createUserValidator)
    return response.ok(await userOperations.create_User(User))
  }

  public async showAll({ request, response }: HttpContext) {
    const query = await request.validateUsing(queryParamValidator, {
      data: request.qs(),
    })

    if (query.u_id) {
      return response.ok(await Operations.p_id(query.u_id))
    }

    return response.ok(await Operations.p_all())
  }

  public async fullUpdate({ request, response }: HttpContext) {
    const U_id = Number(request.qs().u_id)
    const User = await request.validateUsing(createUserValidator)
    return response.ok(await userOperations.update(U_id, User))
  }

  public async partialUpdate({ request, response }: HttpContext) {
    const U_id = Number(request.qs().u_id)
    const User = await request.validateUsing(updateUserValidator)
    return response.ok(await userOperations.update(U_id, User))
  }

  public async destroy({ request, response }: HttpContext) {
    const U_id = Number(request.qs().u_id)
    return response.ok(await userOperations.delete_User(U_id))
  }
}
