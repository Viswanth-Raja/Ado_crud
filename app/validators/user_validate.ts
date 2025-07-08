import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    u_name: vine.string().maxLength(30),
    p_word: vine.string().maxLength(16).alphaNumeric(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    u_name: vine.string().maxLength(30).optional(),
    p_word: vine.string().maxLength(16).alphaNumeric().optional(),
  })
)

export const PasswordValidator = vine.compile(
  vine.object({
    p_word: vine.string().maxLength(15).alphaNumeric(),
  })
)
