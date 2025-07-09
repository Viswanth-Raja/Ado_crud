import vine from '@vinejs/vine'

export const queryParamValidator = vine.compile(
  vine.object({
    postId: vine.number().positive().optional(),
    u_id: vine.number().positive().optional(),
    b_id: vine.number().positive().optional(),
  })
)
