import users from '../models/user.js'

export default class UserRepo {
  async u_id(id: number) {
    const User = await users.findOrFail(id)
    return User
  }

  async u_all() {
    return await users.all()
  }

  async create_User(data: any) {
    await users.create(data)
    return 'User Added'
  }

  async update(id: number, data: any) {
    const User = await users.findOrFail(id)
    User.merge(data)
    User.save()
    return 'User Info Updated'
  }

  async delete_User(id: number) {
    const User = await users.findOrFail(id)
    await User.delete()
    return 'User Deleted!'
  }
}
