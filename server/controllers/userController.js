const {User} = require('../models/models')
const {randomUUID} = require("crypto")
const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async create (request, response, next) {
        const {login, password, role} = request.body

        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.conflict('Пользователь с таким логином уже существует'))
        }
        
        const hashPassword = await bcrypt.hash(password, 5)
        const createdUser = await User.create({ id: randomUUID(), login, password: hashPassword, role })

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
        let comparePassowrd = false
        if (user) {
            comparePassowrd = bcrypt.compareSync(password, user.password)
        }

        if (!user || !comparePassowrd) {
            return next(ApiError.unauthorized('Некорректный логин или пароль'))
        }

        const token = jwt.sign({id: user.id, login, role: user.role}, process.env.SECRET_KEY, {expiresIn: '24h'})
        return response.json({token})
    }
}

module.exports = new UserController()