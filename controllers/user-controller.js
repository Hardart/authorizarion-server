const userService = require('../service/user-service')
const { validationResult } = require('express-validator')
const ErrorApi = require('../handlers/error-api')

class UserController {
	async registration(req, res, next) {
		try {
			const validErrors = validationResult(req)
			if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
			const { email, password, name } = req.body
			const { accessToken } = await userService.registration(email, password, name)
			// res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.status(200).json({ accessToken })
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const validErrors = validationResult(req)
			if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
			const { email, password } = req.body
			const { accessToken, refreshToken } = await userService.login(email, password)
			res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.status(200).json({ accessToken, refreshToken })
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			return res.status(200).json(token)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			console.log('REQUEST TO REFRESH')
			console.log(req.cookies)
			const { refreshToken } = req.cookies
			const tokenData = await userService.refresh(refreshToken)		
			res.cookie('refreshToken', tokenData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.status(200).json({ accessToken: tokenData.accessToken, refreshToken: tokenData.refreshToken })
		} catch (error) {
			next(error)
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAll()
			res.status(200).json(users)
		} catch (error) {
			next(error)
		}
	}

	async check(req, res, next) {
		try {
			console.log('REQUEST TO CHECK')
			if (!req.user) return next(ErrorApi.UnathorizedError())
			return res.status(200).json({ user: req.user })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
