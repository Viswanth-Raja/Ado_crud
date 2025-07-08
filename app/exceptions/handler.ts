// app/exceptions/handler.ts
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default class Handler {
  /**
   * Report exception for logging, etc.
   */
  async report(error: Exception, _ctx: HttpContext) {
    // You can log to a service like Sentry here
    console.error(error)
  }

  /**
   * Handle exception and return appropriate response
   */
  async handle(error: { status: number; message: string }, ctx: HttpContext) {
    const { response } = ctx

    if (error instanceof errors.E_VALIDATION_ERROR) {
      return response.status(422).send(error.messages)
    }

    // if (error.code === 'E_ROW_NOT_FOUND') {
    //   return response.status(404).send({
    //     message: 'Resource not found',
    //   })
    // }

    // if (error instanceof SyntaxError && error.message.includes('JSON')) {
    //   return response.status(400).send({
    //     message: 'Invalid JSON format in request body',
    //   })
    // }

    // if (error.code === 'E_VALIDATION_FAILURE') {
    //   return response.status(422).send({
    //     message: 'Validation failed',
    //     errors: error.message,
    //   })
    // }

    // Fallback for all unhandled errors
    return response.status(error.status || 500).send({
      message: error.message || 'Internal Server Error',
    })
  }
}
