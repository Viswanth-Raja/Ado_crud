import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    p_name: vine.string().trim().maxLength(25),
    comments: vine.string().maxLength(100),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    p_name: vine.string().maxLength(25).trim().optional(),
    comments:
      vine.array(vine.string().maxLength(100).trim()).optional() ||
      vine.string().maxLength(100).trim().optional(),
    user_count: vine.number().optional(),
  })
)
