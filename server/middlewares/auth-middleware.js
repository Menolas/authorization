const ApiError = require('../exeptions/api-errors')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        console.log(authorizationHeader + "   authorizationHeader!!!")
        if (!authorizationHeader) {
            console.log(authorizationHeader + "authorizationHeader!!!")
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        console.log(accessToken + "  accessToken!!!")
        if (!accessToken) {
            console.log(accessToken + "accessToken!!!")
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            console.log(userData + "  userData !!!!")
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}