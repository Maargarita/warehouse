const {Storekeeper, User, Warehouse} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")
const { Sequelize } = require('../db')
const { Op } = require('sequelize')

class StorekeeperController {
    async create (request, response, next) {
        const {surname, name, patronymic, phone, userId, warehouseId} = request.body
        try {
            if (userId) {
                const user = await User.findOne({where: {id: userId}})
                if (!user) {
                    return next(ApiError.notFound('Пользователь не найден'))
                }
            }

            if (warehouseId) {
                const warehouse = await Warehouse.findOne({where: {id: warehouseId}})
                if (!warehouse) {
                    return next(ApiError.notFound('Склад не найден'))
                }
            }

            const candidate = await Storekeeper.findOne({where: {phone}})
            if (candidate) {
                return next(ApiError.conflict('Кладовщик с таким номером телефона уже существует'))
            }
            
            const createdStorekeeper = await Storekeeper.create({ id: randomUUID(), surname, name, patronymic, phone, userId, warehouseId})
            const storekeeper = await Storekeeper.findOne({where: {id: createdStorekeeper.id},
                include: [
                    { 
                        model: User,
                        attributes: [],
                        required: false,
                    }, 
                    { 
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('user.login'), "user_login"], 
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                }   
            })

            return response.json(storekeeper)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getAll (request, response, next) {
        let {limit, offset, field, order} = request.query
        try {
            const storekeepers = await Storekeeper.findAndCountAll({limit, offset,
                include: [
                    { 
                        model: User,
                        attributes: [],
                        required: false,
                    }, 
                    { 
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('user.login'), "user_login"], 
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                },
                order: [
                    [field, order]
                ] 
            })
            return response.json(storekeepers)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async edit (request, response, next) {
        const {id} = request.params
        try {
            const storekeeper = await Storekeeper.findOne({where: {id}})
            if (!storekeeper) {
                return next(ApiError.notFound('Кладовщик не найден'))
            }

            if (request.body.userId) {
                const user = await User.findOne({where: {id: request.body.userId}})
                if (!user) {
                    return next(ApiError.notFound('Пользователь не найден'))
                }
            }

            if (request.body.warehouseId) {
                const warehouse = await Warehouse.findOne({where: {id: request.body.warehouseId}})
                if (!warehouse) {
                    return next(ApiError.notFound('Склад не найден'))
                }
            }

            const candidate = await Storekeeper.findOne({where: {id: {[Op.not]: request.body.id}, phone: request.body.phone}})
            if (candidate) {
                return next(ApiError.conflict('Кладовщик с таким номером телефона уже существует'))
            }

            await Storekeeper.update(request.body, {where: {id}})
            const newStorekeeper = await Storekeeper.findOne({where: {id},
                include: [
                    { 
                        model: User,
                        attributes: [],
                        required: false,
                    }, 
                    { 
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('user.login'), "user_login"], 
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                }   
            })

            return response.json(newStorekeeper)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async delete (request, response, next) {
        const {id} = request.params
        try {
            const storekeeper = await Storekeeper.findOne({where: {id}})
            if (!storekeeper) {
                return next(ApiError.notFound('Кладовщик не найден'))
            }

            await Storekeeper.destroy({where: {id}})
            return  response.status(204).json({message: ""})
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }
}

module.exports = new StorekeeperController()