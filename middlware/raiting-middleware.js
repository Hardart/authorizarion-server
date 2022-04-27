const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
	const authHeader = req.headers.authorization
	if (!authHeader) {
      req.user = false
      return next()
   }
	const accessToken = authHeader.split(' ')[1]
	if (!accessToken) {
      req.user = false
      return next()
   }
	const userData = tokenService.validateAccessToken(accessToken)
   if(!userData) {
      req.user = false
      return next()
   }
	req.user = {id: userData.id}
	next()
}