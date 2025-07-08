import users from '../models/user.js'

export default class UserRepo {
  async u_id(id: number) {
    const User = await users.find(id)
    if (!User) {
      return 'User not found'
    }
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
    const User = await users.find(id)
    if (!User) {
      return 'ID not found'
    }

    User.merge(data)
    User.save()
    return 'User Info Updated'
  }

  async delete_User(id: number) {
    const User = await users.find(id)
    if (User) {
      await User.delete()
      return 'User Deleted!'
    }
    return 'User Not found'
  }
}
