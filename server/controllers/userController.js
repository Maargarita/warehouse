const {User} = require('../models/models')
const {randomUUID} = require("crypto")
const ApiError = require("../error/ApiError")

class UserController {
    async create (request, response) {
        const user = {
            id: randomUUID(), 
            login: request.body.login, 
            password: request.body.password, 
        }
        
        const createdUser = await User.create(user)

        return response.json(createdUser)
    }

    async getAll (request, response) {
        let {limit, offset} = request.query
        const users = await User.findAndCountAll({limit, offset})
        return response.json(users)
    }

    async getOne (request, response) {
        
    }

    async login (request, response) {

    }

    async check (request, response, next) {
        const {id} = request.query
        if (!id) {
            return next(ApiError.badRequest('Не задан id'))
        }
        response.json(id)
    }
}

module.exports = new UserController()