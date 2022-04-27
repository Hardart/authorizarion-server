const UserModel = require('../models/user-model')
const bcrypt = require('bcryptjs')
const tokenService = require('../service/token-service')
const ErrorApi = require('../handlers/error-api')

class UserService {
	async registration(email, password, name = 'Гость', role = ['customer', 'auditor']) {
		const candidate = await UserModel.findOne({ email })
		if (candidate) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} уже существует`)
		const hashPassword = await bcrypt.hash(password, 5)

		const { _id } = await UserModel.create({ email, password: hashPassword, name, role })
		const tokens = tokenService.generateTokens({ id: _id, email, name })
		await tokenService.saveRefreshToken(_id, tokens.refreshToken)

		return { ...tokens, user: { id: _id, email, name, role } }
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email })
		if (!user) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} не найден`)

		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) throw ErrorApi.BadRequest(`Неверный пароль`)

		const { _id, name, role } = user
		const tokens = tokenService.generateTokens({ id: _id, email, name, role })
		await tokenService.saveRefreshToken(_id, tokens.refreshToken)

		return { ...tokens, user: { id: _id, email, name, role } }
	}

	async logout(refreshToken) {
		const token = tokenService.clearToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw ErrorApi.UnathorizedError()
		const userData = tokenService.validateRefreshToken(refreshToken) // проверяем валидность refresh token
		const tokenData = await tokenService.getToken(refreshToken) // проверяем этот token в БД
		if (!userData || !tokenData) throw ErrorApi.UnathorizedError()
		const user = await UserModel.findById(userData.id)
		
		const { _id, email, name, role } = user
		const tokens = tokenService.generateTokens({ id: _id, email, name, role })
		await tokenService.saveRefreshToken(_id, tokens.refreshToken)
		return { ...tokens, user: { id: _id, email, name, role } }
	}

	async getAll() {
		try {
			const users = await UserModel.find()
			return users
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new UserService()
