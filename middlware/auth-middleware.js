const ErrorApi = require('../handlers/error-api')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
	
	const authHeader = req.headers.authorization
	
	if (!authHeader) return next(ErrorApi.UnathorizedError())

	const accessToken = authHeader.split(' ')[1]
	if (!accessToken) return next(ErrorApi.UnathorizedError())

	const userData = tokenService.validateAccessToken(accessToken)
	
	if (!userData) return next(ErrorApi.UnathorizedError())
	
	req.user = { id: userData.id, email: userData.email, name: userData.name, role: userData.role }
	next()
}
