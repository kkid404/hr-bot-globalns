const User = require('../models/user.model')

const UserService = {
    
    // добавление пользователя
    async addUSer(userData) {
        const user = new User(userData)
        await user.save()
        return user;
    },

    // получение пользователя по telegram id
    async getByTgIdUser(tgId) {
        return await User.findOne({ tg_id: tgId })
    },

    // получение пользователя по id
    async getByIdUser(id) {
        return await User.findOne({ _id: id })
    },

    // получение пользователя по юзернейму
    async getByUsernameUser(username) {
        return await User.findOne({ username: username })
    },


    // изменение пользователя
    async updateUser(tgId, updateData) {
        return await User.findOneAndUpdate({ tg_id: tgId }, updateData, { new: true })
    },

    // удаление пользователя
    async deleteUser(tgId) {
        return await User.findOneAndDelete({ tg_id: tgId })
    },

}

module.exports = UserService;
