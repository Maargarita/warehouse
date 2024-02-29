const jwt = require('jsonwebtoken')

class AuthController {
    async auth (request, response, next) {
        const token = jwt.sign(
            {id: request.user.id, login: request.user.login, role: request.user.roleId}, 
            process.env.SECRET_KEY, 
            {expiresIn: '24h'}
        )
        return response.json({token})
    }
}

module.exports = new AuthController()