import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const role = ctx.request.header('role')
    const password = ctx.request.header('password')
    const serv_passw = '1234'

    if (role === 'admin' && password === serv_passw) {
      console.log('Login Successful')
      next()
    } else {
      console.log('Login Failure! Only Admin has access')
      next()
    }
  }
}
