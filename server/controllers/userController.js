const {User} = require('../models/models')
const {randomUUID} = require("crypto")
const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async create (request, response, next) {
        const {login, password, roleId} = request.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.conflict('Пользователь с таким логином уже существует'))
        }
        
        const hashPassword = await bcrypt.hash(password, 5)
        const createdUser = await User.create({ id: randomUUID(), login, password: hashPassword, roleId })

        return response.json(createdUser)
    }

    async getAll (request, response) {
        let {limit, offset} = request.query
        const users = await User.findAndCountAll({limit, offset})
        return response.json(users)
    }

    async getOne (request, response) {
        const {id} = request.params
        const user = await User.findOne({where: {id}})
        return response.json(user)
    }

    async login (request, response, next) {
        const {login, password} = request.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.notFound('Пользователь не найден'))
        }

        let comparePassowrd = bcrypt.compareSync(password, user.password)
        if (!comparePassowrd) {
            return next(ApiError.unauthorized('Указан неверный пароль'))
        }

        const token = jwt.sign({id: user.id, login, role: user.roleId}, process.env.SECRET_KEY, {expiresIn: '24h'})
        return response.json({token})
    }
}

module.exports = new UserController()