import vine from '@vinejs/vine'

export const createBuyerValidator = vine.compile(
  vine.object({
    p_id: vine.number(),

    p_name: vine.string().minLength(2).maxLength(100),

    bought_by: vine.number(),

    comments: vine.object({
      all_cmts: vine.array(vine.string().minLength(1)),
    }),

    user_count: vine.number().min(1).max(999).optional(),
  })
)

export const updateBuyerValidator = vine.compile(
  vine.object({
    p_name: vine.string().minLength(2).maxLength(100).optional(),

    comments: vine
      .object({
        all_cmts: vine.array(vine.string().minLength(1)),
      })
      .optional(),

    user_count: vine.number().min(1).max(999).optional(),
  })
)
