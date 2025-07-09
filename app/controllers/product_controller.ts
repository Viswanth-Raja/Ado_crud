import type { HttpContext } from '@adonisjs/core/http'
import ProdRepo from '../Repositories/operations.js'
import { createValidator, updateValidator } from '#validators/create_product'
import { queryParamValidator } from '#validators/query_parameter'

const Operations = new ProdRepo()

export default class MpsController {
  public async showAll({ request, response }: HttpContext) {
    const query = await request.validateUsing(queryParamValidator, {
      data: request.qs(),
    })

    if (query.postId) {
      return response.ok(await Operations.p_id(query.postId))
    }

    return response.ok(await Operations.p_all())
  }

  public async store({ request, response }: HttpContext) {
    const item = await request.validateUsing(createValidator)
    return response.ok(await Operations.create(item))
  }

  public async fullUpdate({ request, response }: HttpContext) {
    const id = Number(request.qs().postId)
    const item = await createValidator.validate(request.only(['p_name', 'comments', 'user_count']))
    return response.ok(await Operations.update(id, item))
  }

  public async partialUpdate({ request, response }: HttpContext) {
    const id = Number(request.qs().postId)
    const item = await request.validateUsing(updateValidator)
    return response.ok(await Operations.update(id, item))
  }

  public async destroy({ request, response }: HttpContext) {
    const id = Number(request.qs().postId)
    return response.ok(await Operations.delete(id))
  }
}
