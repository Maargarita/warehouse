const {User} = require('../models/models')
const {randomUUID} = require("crypto")
const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

class UserController {
    async create (request, response, next) {
        const {login, password, role} = request.body
        try {
            const candidate = await User.findOne({where: {login}})
            if (candidate) {
                return next(ApiError.conflict('Пользователь с таким логином уже существует'))
            }
            
            const hashPassword = await bcrypt.hash(password, 5)
            const createdUser = await User.create({ id: randomUUID(), login, password: hashPassword, role })

            return response.json(createdUser)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getAll (request, response, next) {
        let {limit, offset} = request.query
        try {
            const users = await User.findAndCountAll({attributes: ['id', 'login', 'role', 'createdAt', 'updatedAt'], limit, offset})
            return response.json(users)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getOne (request, response, next) {
        const {id} = request.params
        try {
            const user = await User.findOne({attributes: ['id', 'login', 'role', 'createdAt', 'updatedAt'], where: {id}})
            
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'))
            }

            return response.json(user)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async login (request, response, next) {
        const {login, password} = request.body
        try {
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
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async edit (request, response, next) {
        const {id} = request.params
        try {
            const candidate = await User.findOne({where: {id: {[Op.not]: request.body.id}, login: request.body.login}})
            if (candidate) {
                return next(ApiError.conflict('Пользователь с таким логином уже существует'))
            }

            const user = await User.update(request.body, {where: {id}, returning: true})
            
            if (!user[1][0]) {
                return next(ApiError.notFound('Пользователь не найден'))
            }

            return response.json(user[1][0])
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async delete (request, response, next) {
        const {id} = request.params
        try {
            const user = await User.findOne({where: {id}})

            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'))
            }

            await User.destroy({where: {id}})
            return response.status(204).json({message: ""})
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }
}

module.exports = new UserController()